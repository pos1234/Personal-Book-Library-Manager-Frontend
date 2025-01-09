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