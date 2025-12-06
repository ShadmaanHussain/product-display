import { useState } from "react";
import type { Product } from "../types/product";
import { validateProduct } from "../utils/validation";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

interface Props {
  initial: Partial<Product>;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export function ProductForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSave() {
    const errs = validateProduct(form);
    setErrors(errs);

    if (Object.keys(errs).length === 0) onSave(form);
  }

  return (
    <div className="grid gap-4">
      <div>
        <Label>Name</Label>
        <Input
          value={form.name ?? ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={form.price ?? ""}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
      </div>

      <div>
        <Label>Category</Label>
        <Input
          value={form.category ?? ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
      </div>

      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          value={form.stock ?? ""}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
