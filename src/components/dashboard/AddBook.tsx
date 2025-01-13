"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addBookmark } from "@/repository/book-repo";
import { cn, showToast } from "@/lib/utils";
import { AddBookFormatProps } from "@/types/book.interface";

import BookForm from "./BookForm";

const AddBook = ({ formData,userData }: AddBookFormatProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    const bookData = {
       key: formData?.key,
       coverId:formData?.coverId,
       ISBN:formData?.isbn, 
      ...data };
      setLoading(true)
      try {
      const response = await addBookmark(bookData,userData);
      if (!response?.error) {
        setDialogOpen(false);
        showToast("Book added to library",'Success')                   
      }else{
        setLoading(false)
        showToast("Book not added to library",'Error')                   
      }
    } catch (error) {
      setLoading(false)
      showToast("Book not added to library",'Error')                   
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="w-full" onClick={(e) => e.stopPropagation()}>
        <Button className="w-full">Add to library</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-fit overflow-y-auto thinScrollBar">
        <DialogTitle>Add book to library</DialogTitle>
        <BookForm data={formData} submit={handleSubmit} loadingState={loading}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
