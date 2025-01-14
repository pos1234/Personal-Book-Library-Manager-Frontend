import { postApi } from "@/config/api-config";
import { CredentialProps } from "@/types/user.interface";

export const signUp = async ({ data }: CredentialProps) => {
  try {
    const response = await postApi(`/auth/signup`, data, "POST");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
      data: [],
    };
  }
};

export const signIn = async ({ data }: CredentialProps) => {
  try {
    const response = await postApi(`/auth/signin`, data, "POST");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
      data: [],
    };
  }
};
