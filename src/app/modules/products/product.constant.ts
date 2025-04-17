import { TproductStatus, TproductTypes } from './product.interface';

export const productTypes: TproductTypes[] = [
  'Notebooks',
  'Pens',
  'Pencils',
  'Markers',
  'Erasers',
  'Staplers',
  'Folders',
  'Calculators',
  'Paper',
  'Books',
  'Other',
  'Highlighters',
  'Glue',
  'Scissors',
  'Rulers',
  'Paper Clips',
  'Sticky Notes',
  'Tape',
  'Whiteboard',
  'Index Cards',
  'Sharpener',
  'Binder Clips',
  'Thumbtacks',
];

export const productStatus: TproductStatus[] = [
  'available',
  'out_of_stock',
  'discontinued',
];

export const stationeryProductSearchableFields = [
  'name',
  'author',
  'status',
  'description',
  'category',
  'brand',
  'tags',
  'color',
  'size',
  'material',
];
