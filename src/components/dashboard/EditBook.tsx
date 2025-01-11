"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookForm from "./BookForm";
import {updateBookmark } from "@/repository/book-repo";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";
interface BookFormat {
  formData: {
    id?:number;
    title?: string;
    author?: string;
    ISBN?: string;
    coverId?: number;
    key?:string;
  };
  triggerButton?:any
}
const EditBook = ({ formData,triggerButton }: BookFormat) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async (data: any) => {
    const bookData = {
       key: formData?.key || "",
       coverId:formData?.coverId,
       ISBN:formData?.ISBN, 
       author:formData?.author || "",
      title:formData?.title,
      readStatus:data?.readStatus,
      rating:data?.rating,
      notes:data?.notes};
    
      setLoading(true)
      try {
      const response = await updateBookmark(bookData,formData?.id);
      console.log(">>> log response",response);
      
      // Close the dialog on successful submission
      if (!response?.error) {
        setDialogOpen(false);
        toast({
          title: "",
          description: "Book updated",
          className: cn(
            'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-green-200'
          ),
        })
      }else{
        setLoading(false)
        toast({
          title: "",
          description: "Book not updated",
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
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
      {triggerButton}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-fit overflow-y-auto thinScrollBar">
        <DialogTitle>Edit book from library</DialogTitle>
        <BookForm data={formData} submit={handleSubmit} loadingState={loading}/>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
