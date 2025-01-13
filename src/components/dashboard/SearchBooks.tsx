import Image from "next/image";
import { FileImage } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  bookmarked,
  getCurrentPageNumber,
  getImageUrl,
  getPageNumbers,
} from "@/lib/utils";
import { searchParamWitUserDataProps } from "@/types/util.interface";
import { fetchBookmarks, fetchBooks } from "@/repository/book-repo";

import AddBook from "./AddBook";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";

const SearchBooks = async ({
  searchParams,
  userData,
}: searchParamWitUserDataProps) => {
  const page = getCurrentPageNumber(searchParams);
  const query = searchParams?.query || "";
  const books = await fetchBooks(query, page, 13);
  const bookmarks = await fetchBookmarks(page, userData);
  const pageNumbers = getPageNumbers(page, books?.numFound);
  return (
    <main className="my-10 px-10">
      <div className="w-full flex justify-center pb-10">
        <div className="w-[400px]">
          <SearchInput />
        </div>
      </div>
      <div className="flex flex-wrap sm:mt-5">
        {books &&
          books?.docs &&
          books?.docs.map((book: any, index: number) => {
            const coverId = book?.cover_i;
            const imageUrl = getImageUrl(book?.cover_i);
            const formData = {
              title: book?.title || "",
              author: book?.author_name[0] || "",
              isbn: book?.isbn[0] || "",
              coverId: book?.cover_i,
              key: book?.key,
            };
            return (
              <>
                {!bookmarked(bookmarks?.data, book?.key) && (
                  <div className="w-full p-5 md:w-1/2 xl:w-1/3 2xl:w-1/4">
                    <Card key={index}>
                      <CardHeader className=" flex items-center justify-center">
                        <CardTitle className="min-h-[200px] items-center flex">
                          {coverId && (
                            <Image
                              src={imageUrl}
                              alt={`${book?.title}-${index}`}
                              width={200}
                              height={200}
                              className="object-fit h-[300px] max-h-[300px]"
                            />
                          )}
                          {!coverId && <FileImage />}
                        </CardTitle>
                        <CardDescription className="px-2  text-center pt-2">
                          {book?.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>Author: {book?.author_name[0]}</CardContent>
                      <CardFooter>
                        <AddBook formData={formData} userData={userData} />
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </>
            );
          })}
      </div>
      <Pagination
        path="dashboard/add"
        page={page}
        pageNumbers={pageNumbers}
        totalPages={books?.numFound || 0}
        query={searchParams?.query ?? ""}
      />
    </main>
  );
};

export default SearchBooks;
