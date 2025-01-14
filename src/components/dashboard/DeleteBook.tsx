"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils";
import { deleteBookmark } from "@/repository/book-repo";
import { DeleteFormatProps } from "@/types/book.interface";

const DeleteBook = ({ id,triggerButton,userData,handleChange }: DeleteFormatProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleSubmit = async () => {
      setLoading(true)
      try {
      const response = await deleteBookmark(id,userData);      
      if (!response?.error) {
        setDialogOpen(false);
        showToast("Book removed from library",'Success')    
        handleChange('delete',id)               
      }else{
        setLoading(false)
        showToast("Book not removed from library",'Error')                   
      }
    } catch (error) {
      setLoading(false)
      showToast("Book not removed from library",'Error')                   
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

