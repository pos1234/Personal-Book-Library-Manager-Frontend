import { ReactNode } from "react";

export type searchParamProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export type TriggerButtonProps = {
  triggerButton?: ReactNode;
};

export interface searchParamWitUserDataProps {
  searchParams: { [key: string]: string };
  userData: any;
}

export interface PaginationType {
    page: number;
    pageNumbers: (string | number)[];
    totalPages: number;
    query?: string;
    path: string;
}

