/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosConfig";
import { EditProfile, Profile } from "./types";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://hells-kitchen.onrender.com/api/v1/users"
    );
    return response.data as Response<Profile>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editProfile = async (body: EditProfile) => {
  try {
    const response = await axiosWithConfig.put(
      "https://hells-kitchen.onrender.com/api/v1/users",
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete(
      "https://hells-kitchen.onrender.com/api/v1/users"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
