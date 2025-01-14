"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateBookmark } from "@/repository/book-repo";
import { showToast } from "@/lib/utils";
import { EditBookFormatProps } from "@/types/book.interface";

import BookForm from "./BookForm";

const EditBook = ({
  formData,
  userData,
  triggerButton,
  handleChange,
}: EditBookFormatProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    const bookData = {
      key: formData?.key || "",
      coverId: formData?.coverId,
      ISBN: formData?.ISBN,
      author: formData?.author || "",
      title: formData?.title,
      readStatus: data?.readStatus,
      rating: data?.rating,
      notes: data?.notes,
    };
    const localUpdate = {
      readStatus: data?.readStatus,
      rating: data?.rating,
      notes: data?.notes,
    };
    setLoading(true);
    try {
      const response = await updateBookmark(bookData, formData?.id, userData);
      if (!response?.error) {
        showToast("Book updated", "Success");
        setDialogOpen(false);
        handleChange("update", formData?.id, localUpdate);
        setLoading(false);
      } else {
        setLoading(false);
        showToast("Book not updated", "Error");
      }
    } catch (error) {
      setLoading(false);
      showToast("Book not updated", "Error");
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-fit overflow-y-auto thinScrollBar">
        <DialogTitle>Edit book from library</DialogTitle>
        <BookForm
          data={formData}
          submit={handleSubmit}
          loadingState={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
