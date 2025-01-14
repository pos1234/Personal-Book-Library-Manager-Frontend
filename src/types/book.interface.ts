import { ReactNode } from "react";
import { BookArrayAction } from "./util.interface";
import { UserDataProp } from "./user.interface";

export interface ExternalBookFormat {
  docs: {
    title: string;
    author_name: any[];
    ISBN: string[];
    cover_i: number;
    key: string;
  }[];
  numFound?: number;
  start?: number;
  numFoundExact?: boolean;
  num_found: number;
  q?: string;
  offset?: number;
}
export interface BookData {
  id?: number;
  title?: string;
  author?: string;
  ISBN?: string;
  coverId?: number;
  key?: string;
  notes?: string;
  rating: number;
  readStatus?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number,
}

export interface BookFormProps {
  formData: Partial<BookData>;
  userData?: UserDataProp;
}

export interface FormDataProps {
  data?: Partial<BookData>;
  submit: (data: any) => void;
  loadingState: boolean;
}

export type HandleChangeFn = (
  action: BookArrayAction,
  bookId?: number,
  updateData?: Partial<BookData>
) => void;

export interface DeleteFormatProps {
  id?: number;
  triggerButton?: ReactNode;
  userData?: UserDataProp;
  handleChange: HandleChangeFn;
}

export interface EditBookFormatProps extends BookFormProps {
  triggerButton: ReactNode;
  handleChange: HandleChangeFn;
}

export interface BookCardProps {
  bookData: BookData;
  userData?: UserDataProp;
  handleChange: HandleChangeFn;
}

export interface FetchBookFormaProps {
  docs: BookData[];
}
