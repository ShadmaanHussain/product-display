import type { Product } from "../types/product";
import { formatCurrency } from "../utils/format";
import { Button } from "./ui/button";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductCardGrid({ products, onEdit, onDelete }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-10">No products found</div>
      ) : (
        products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-muted-foreground">{p.category}</p>
            <p className="mt-3">{p.description}</p>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <p>{formatCurrency(p.price)}</p>
                <small className="text-muted-foreground">
                  Stock: {p.stock ?? 0}
                </small>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => onEdit(p)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(p.id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
