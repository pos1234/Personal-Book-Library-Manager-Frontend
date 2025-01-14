"use client";
import React, { useEffect, useState } from "react";
import LibraryBookCard from "./LibraryBookCard";
import { handleArrayAction } from "@/lib/utils";
import { BookArrayAction } from "@/types/util.interface";

const ListBooks = ({ bookmarks, userData }: any) => {
  const [bookmarkList, setBookmarkList] = useState(bookmarks);
  const handleChange = (
    action: BookArrayAction,
    bookId?: number,
    updateData?: any,
  ) => {
    const result = handleArrayAction(bookmarkList, action, bookId, updateData);
    setBookmarkList((prevBookmarks: any) => [...result]);
  };
  useEffect(() => {
    setBookmarkList(bookmarks);
  }, [bookmarks]);
  return (
    <div className="flex flex-wrap sm:mt-5">
      {bookmarkList.map((book: any, index: number) => {
        return (
          <LibraryBookCard
            bookData={book}
            key={index}
            userData={userData}
            handleChange={handleChange}
          />
        );
      })}
    </div>
  );
};

export default ListBooks;
