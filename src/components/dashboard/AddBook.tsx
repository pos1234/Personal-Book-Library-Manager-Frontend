"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import BookForm from "./BookForm";
interface BookFormat {
  formData: {
    title?: string;
    author?: string;
    isbn?: string;
    cover?: string;
  };
}
const AddBook = ({ formData }: BookFormat) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" onClick={(e) => e.stopPropagation()}>
        <Button className="w-full">Add to library</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-fit overflow-y-auto thinScrollBar">
        <DialogTitle>Add book to library</DialogTitle>
        <BookForm data={formData} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
