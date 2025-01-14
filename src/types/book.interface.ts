import { ReactNode } from "react";
import { BookArrayAction } from "./util.interface";
import { userDataProp } from "./user.interface";

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
}

export interface BookFormProps {
  formData: Partial<BookData>;
  userData?: userDataProp;
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
  userData?: userDataProp;
  handleChange: HandleChangeFn;
}

export interface EditBookFormatProps extends BookFormProps {
  triggerButton:ReactNode;
  handleChange: HandleChangeFn;
}

export interface BookCardProps {
  bookData: BookData;
  userData?: userDataProp;
  handleChange: HandleChangeFn;
}