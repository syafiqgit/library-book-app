/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadPagination, Request, Response } from "@/utils/types/api";
import { Book } from ".";
import axiosWithConfig from "../axiosConfig";
import { BookSchema } from "./types";

export const getNewBooks = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://hells-kitchen.onrender.com/api/v1/books?sort=New&limit=4"
    );
    return response.data as Response<PayloadPagination<Book[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getAllNewBooks = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://hells-kitchen.onrender.com/api/v1/books?sort=New"
    );
    return response.data as Response<PayloadPagination<Book[]>>;
  } catch (error: any) {
    throw Error(error.reponse.data.message);
  }
};

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://hells-kitchen.onrender.com/api/v1/books?limit=4"
    );
    return response.data as Response<PayloadPagination<Book[]>>;
  } catch (error: any) {
    throw Error(error.reponse.data.message);
  }
};

export const getAllBooks = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/books?${query}` : "/books";

    const response = await axiosWithConfig.get(url);

    return response.data as Response<PayloadPagination<Book[]>>;
  } catch (error: any) {
    throw Error(error.reponse.data.message);
  }
};

export const getDetailBooks = async (id_book: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://hells-kitchen.onrender.com/api/v1/books/${id_book}`
    );
    return response.data as Response<Book>;
  } catch (error: any) {
    throw Error(error.reponse.data.message);
  }
};

export const editBooks = async (body: BookSchema, id_book: number) => {
  try {
    const response = await axiosWithConfig.put(
      `https://hells-kitchen.onrender.com/api/v1/books/${id_book}`,
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
