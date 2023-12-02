/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadPagination, Response } from "@/utils/types/api";
import { Book } from ".";
import axiosWithConfig from "../axiosConfig";

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

export const getAllBooks = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://hells-kitchen.onrender.com/api/v1/books"
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
