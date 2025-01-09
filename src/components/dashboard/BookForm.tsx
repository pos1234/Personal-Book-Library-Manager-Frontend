"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Switch } from "../ui/switch";
interface FormData {
  data?: {
    title?: string;
    author?: string;
    isbn?: string;
    readStatus?: boolean;
    userRating?: number;
    notes?: string;
  };
}
const BookForm = ({ data }: FormData) => {
  const [formData, setFormData] = React.useState({
    title: data?.title || "",
    author: data?.author || "",
    isbn: data?.isbn || "",
    readStatus: data?.readStatus || false,
    userRating: data?.userRating || 0,
    notes: data?.notes || "",
  });

  const [error, setError] = React.useState({
    title: "",
    author: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {
      title: "",
      author: "",
    };

    if (!formData.title.trim()) {
      newError.title = "Title is required.";
      isValid = false;
    }

    if (!formData.author.trim()) {
      newError.author = "Author is required.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      // Perform your submission logic here
    }
  };

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, userRating: rating }));
    setError((prev) => ({ ...prev, userRating: "" })); // Clear any existing error
  };
  const handleClear = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      readStatus: false,
      userRating: 0,
      notes: "",
    });
    setError({
      title: "",
      author: "",
    });
  };

  return (
    <div className="flex items-center justify-center w-full pt-5">
      <Card className="w-[400px]">
        <CardContent className="space-y-4 pt-5">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {error.title && (
              <p className="text-red-500 text-sm">{error.title}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
            {error.author && (
              <p className="text-red-500 text-sm">{error.author}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="readStatus">Read Status</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="readStatus"
                checked={formData.readStatus}
                onCheckedChange={(checked: any) =>
                  setFormData((prev) => ({ ...prev, readStatus: checked }))
                }
              />
              <Label htmlFor="readStatus">
                {formData.readStatus ? "Read" : "Unread"}
              </Label>
            </div>
            
          </div>
          <div className="space-y-1">
            <Label htmlFor="userRating">Rating</Label>
            <div className="flex space-x-2">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`h-6 w-6 cursor-pointer ${
                    formData.userRating > index
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(index + 1)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookForm;