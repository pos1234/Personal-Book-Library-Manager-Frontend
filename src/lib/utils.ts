"use client";
import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6; // Require at least 6 characters
};

export const handleFormSubmit = (
  email: string,
  password: string,
  setError: (arg0: { email: string; password: string }) => void,
  callback: (email: string, password: string) => void
) => {
  let isValid = true;
  const newError = { email: "", password: "" };

  if (!email) {
    newError.email = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email)) {
    newError.email = "Please enter a valid email address.";
    isValid = false;
  }

  if (!password) {
    newError.password = "Password is required.";
    isValid = false;
  } else if (!validatePassword(password)) {
    newError.password = "Password must be at least 6 characters.";
    isValid = false;
  }

  setError(newError);

  if (isValid && callback) {
    callback(email, password);
  }
};

export const getPageNumbers = (page = 1, totalPages = 1) => {
  if (totalPages === 1) {
    return []; // Return an empty array if there's only one page
  }

  const pageNumbers = [];
  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(totalPages, page + 1);

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export const bookmarked = (bookmarks: any[], bookKey: string) => {
  return bookmarks.some((book) => book?.key === bookKey);
};

export const parseToObject = (data: string) => {
  return data && JSON.parse(data);
};

type ErrorType = "Error" | "Success";
export const showToast = (
  description: string,
  type: ErrorType,
  title?: string
) => {
  const className =
    type == "Success"
      ? "top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-green-200"
      : "top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-red-200";
  toast({
    title,
    description,
    className: cn(className),
  });
};

export const removeTokenCookie = async () => {
  try {
    document.cookie = "user_data=; path=/; max-age=0; secure; sameSite=Strict";
    return { success: true };
  } catch (error: any) {
    console.error("Error removing cookie:", error);
    return { success: false, error: error.message };
  }
};

export const getCurrentPageNumber = (searchParams: any) => {
  const page =
    typeof searchParams?.page === "string"
      ? Number(searchParams.page)
      : searchParams?.page ?? 1;
  return page;
};

export const getImageUrl = (coverId?:number)=>{
  const url = process.env.NEXT_PUBLIC_IMAGE_URL || "https://covers.openlibrary.org/b/id/"
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}