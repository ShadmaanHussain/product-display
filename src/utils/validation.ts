import type { Product } from "../types/product";

export function validateProduct(input: Partial<Product>) {
  const errors: Record<string, string> = {};

  if (!input.name?.trim()) errors.name = "Name is required";

  if (input.price == null || isNaN(Number(input.price)))
    errors.price = "Valid price required";

  if (!input.category?.trim()) errors.category = "Category is required";

  if (input.stock != null && input.stock < 0)
    errors.stock = "Stock must be positive";

  return errors;
}
