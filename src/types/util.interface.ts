import { ReactNode } from "react";
import { userDataProp } from "./user.interface";

export type searchParamProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export type TriggerButtonProps = {
  triggerButton?: ReactNode;
};

export interface searchParamWitUserDataProps {
  searchParams: { [key: string]: string };
  userData: userDataProp;
}

export interface PaginationType {
    page: number;
    pageNumbers: (string | number)[];
    totalPages: number;
    query?: string;
    path: string;
}

export type BookArrayAction = "update" | "delete";

