export type TproductTypes =
  | 'Notebooks'
  | 'Pens'
  | 'Pencils'
  | 'Markers'
  | 'Erasers'
  | 'Staplers'
  | 'Folders'
  | 'Calculators'
  | 'Paper'
  | 'Books'
  | 'Other'
  | 'Highlighters'
  | 'Glue'
  | 'Scissors'
  | 'Rulers'
  | 'Paper Clips'
  | 'Sticky Notes'
  | 'Tape'
  | 'Whiteboard'
  | 'Index Cards'
  | 'Sharpener'
  | 'Binder Clips'
  | 'Thumbtacks';

export type TproductStatus = 'available' | 'out_of_stock' | 'discontinued';

export type TProduct = {
  name: string;
  author?: string;
  description?: string;
  category: TproductTypes;
  price: number;
  stockQuantity: number;
  brand?: string;
  color?: string;
  size?: string;
  material?: string;
  sku: string;
  productImg?: string;
  rating?: number;
  isFeatured?: boolean;
  tags?: string[];
  discount?: {
    percentage: string;
    validUntil: Date;
  };
  status: TproductStatus;
};
