/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosWithConfig from "../apis/axiosConfig";
import { PayloadPagination, Response } from "../types/api";
import { Borrow, BorrowSchema } from "./types";

export const getHistoryBorrow = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://hells-kitchen.onrender.com/api/v1/borrows"
    );
    return response.data as Response<PayloadPagination<Borrow[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const borrowBooks = async (body: BorrowSchema) => {
  try {
    const response = await axiosWithConfig.post(
      "https://hells-kitchen.onrender.com/api/v1/borrows",
      body
    );
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};