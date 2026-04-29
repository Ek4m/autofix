export interface ICategory {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  subcategories?: ICategory[];
}
