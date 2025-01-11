"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import BookForm from "./BookForm";
import { addBookmark } from "@/repository/book-repo";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";
interface BookFormat {
  formData: {
    title?: string;
    author?: string;
    isbn?: string;
    coverId?: number;
    key?:string
  };
}
const AddBook = ({ formData }: BookFormat) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async (data: any) => {
    const bookData = {
       key: formData?.key,
       coverId:formData?.coverId,
       ISBN:formData?.isbn, 
      ...data };
    
      setLoading(true)
      try {
      const response = await addBookmark(bookData);
      
      // Close the dialog on successful submission
      if (response) {
        setDialogOpen(false);
        toast({
          title: "",
          description: "Book added to library",
          className: cn(
            'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-green-200'
          ),
        })
      }else{
        setLoading(false)
        toast({
          title: "",
          description: "Book not added to library",
          className: cn(
            'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-red-200'
          ),
        })
      }
    } catch (error) {
      setLoading(false)
      console.error("Error adding book:", error);
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
