import { ReactNode } from "react";

export interface AddBookFormatProps {
  formData: {
    title?: string;
    author?: string;
    isbn?: string;
    coverId?: number;
    key?: string;
  };
  userData?: any;
}

export interface FormDataProps {
  data?: {
    title?: string;
    author?: string;
    isbn?: string;
    readStatus?: boolean;
    rating?: number;
    notes?: string;
  };
  submit: (data: any) => void;
  loadingState: boolean;
}
export interface DeleteFormatProps {
  id?: number;
  triggerButton?: ReactNode;
  userData?: any;
}

export interface EditBookFormatProps {
  formData: {
    id?: number;
    title?: string;
    author?: string;
    ISBN?: string;
    coverId?: number;
    key?: string;
  };
  triggerButton?: any;
  userData?: any;
}

export interface BookCardProps {
  bookData: {
    id?: number;
    createdAt?: string;
    updateAt?: string;
    ISBN?: string;
    coverId?: number;
    key?: string;
    title: string;
    author: string;
    notes: string;
    rating: number;
    isRead: boolean;
  };
  userData?: any;
}
