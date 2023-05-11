export interface Paginated<T> {
  pagination: {
    page: number;
    size: number;
    totalPage: number;
    totalCount: number;
  };
  content: T[];
}
