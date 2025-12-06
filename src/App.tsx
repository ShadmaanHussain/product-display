import { useMemo, useState } from "react";
import type { Product } from "./types/product";
import { useDebounce } from "./hooks/useDebounce";
import { Button } from "./components/ui/button";
import { ProductTable } from "./components/ProductsTable";
import { ProductCardGrid } from "./components/ProductCardGrid";
import { Pagination } from "./components/Pagination";
import { ProductForm } from "./components/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import productsData from "./mock/products.json";

export default function App() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [view, setView] = useState<"list" | "card">("list");

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 500);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      // Combine all searchable fields into one string
      const searchable = [
        p.name,
        p.category,
        p.description,
        p.price?.toString(),
        p.stock?.toString(),
        ...(p.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [products, debounced]);

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Form Modal
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setModalOpen(true);
  }

  function onSave(form: Partial<Product>) {
    if (editing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p))
      );
    } else {
      const id = Math.max(...products.map((p) => p.id), 0) + 1;
      setProducts([
        {
          ...form,
          id,
          createdAt: new Date().toISOString(),
          isActive: true,
        } as Product,
        ...products,
      ]);
    }
    setModalOpen(false);
  }

  function remove(id: number) {
    if (confirm("Delete product?"))
      setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2 items-center md:flex-row flex-col">
          <input
            className="border rounded px-3 py-2 w-full sm:w-auto flex-1 min-w-[180px]"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto"
            variant={view === "list" ? "secondary" : "ghost"}
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant={view === "card" ? "secondary" : "ghost"}
            onClick={() => setView("card")}
          >
            Cards
          </Button>
          <Button className="w-full sm:w-auto" onClick={openNew}>
            Add Product
          </Button>
        </div>
      </header>

      {view === "list" ? (
        <ProductTable
          products={paginated}
          onEdit={openEdit}
          onDelete={remove}
        />
      ) : (
        <ProductCardGrid
          products={paginated}
          onEdit={openEdit}
          onDelete={remove}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Product" : "New Product"}
            </DialogTitle>
          </DialogHeader>

          <ProductForm
            initial={editing || {}}
            onSave={onSave}
            onCancel={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
