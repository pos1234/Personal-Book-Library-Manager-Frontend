"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";
import { deleteBookmark } from "@/repository/book-repo";
interface BookFormat {
  id?:number;
  triggerButton?:any
}
const DeleteBook = ({ id,triggerButton }: BookFormat) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async () => {
      setLoading(true)
      try {
      const response = await deleteBookmark(id);
      console.log(">>> log response",response);
      
      // Close the dialog on successful submission
      if (!response?.error) {
        setDialogOpen(false);
        toast({
          title: "",
          description: "Book removed from library",
          className: cn(
            'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-green-200'
          ),
        })
      }else{
        setLoading(false)
        toast({
          title: "",
          description: "Book not removed from library",
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
      <DialogContent className='max-h-[80vh] overflow-y-auto thinScrollBar'>
                <DialogTitle>
                    Remove book?
                </DialogTitle>
                <p>You will not be able to recover this.</p>
                <div className='w-full flex gap-3 justify-end flex-wrap'>
                    <DialogClose asChild>
                        <Button disabled={loading} variant={"secondary"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={loading} variant={loading ? "secondary" : 'default'} type="button" onClick={handleSubmit}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
    </Dialog>
  );
};

export default DeleteBook;

