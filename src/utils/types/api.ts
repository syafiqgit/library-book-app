/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response<T = any> = {
  message: string;
  payload: T;
};

export type PayloadPagination<T = any> = {
  totalItems: number;
  datas: T;
  totalPages: number;
  currentPage: number;
};

export interface Request {
  path?: string;
  query?: string;
  sort?: "new" | "popular";
  filter?: string;
  limit?: string | number;
  page?: string | number;
}

export interface Meta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
