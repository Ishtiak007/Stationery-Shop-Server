export type TproductTypes =
  | 'Pens'
  | 'Pencils'
  | 'Erasers'
  | 'Notebooks'
  | 'Calculators'
  | 'Paper'
  | 'Markers'
  | 'Tape'
  | 'Books'
  | 'Staplers'
  | 'Folders'
  | 'Scissors'
  | 'Glue'
  | 'Highlighters'
  | 'Rulers'
  | 'Sticky Notes'
  | 'Paper Clips'
  | 'Index Cards'
  | 'Whiteboard'
  | 'Sharpener'
  | 'Binder Clips'
  | 'Thumbtacks'
  | 'Other';

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
