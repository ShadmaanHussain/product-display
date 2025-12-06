import { Button } from "./ui/button";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{formatCurrency(p.price)}</TableCell>
                <TableCell>{p.stock ?? 0}</TableCell>
                <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => onEdit(p)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(p.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
