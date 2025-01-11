import { fetchBookmarks, fetchBooks } from "@/repository/book-repo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import { bookmarked, getPageNumbers } from "@/lib/utils";
import { FileImage } from "lucide-react";
import AddBook from "./AddBook";
type pageParams = {
  searchParams: { [key: string]: string };
};
const SearchBooks = async ({ searchParams }: pageParams) => {
  const page =
    typeof searchParams?.page === "string"
      ? Number(searchParams.page)
      : searchParams?.page ?? 1;
  const query = searchParams?.query || "";
  const books = await fetchBooks(query, page, 13);
  const bookmarks = await fetchBookmarks()  
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
            const formData = {
              title: book?.title || "",
              author: book?.author_name[0] || "",
              isbn: book?.isbn[0] || "",
              coverId: book?.cover_i,
            key:book?.key
            };
            return (
              <>
              { !bookmarked(bookmarks?.data,book?.key) && 
              <div className="w-full p-5 md:w-1/2 xl:w-1/3 2xl:w-1/4">
              <Card key={index}>
                <CardHeader className=" flex items-center justify-center">
                  <CardTitle className="min-h-[200px] items-center flex">
                    {coverId && (
                      <Image
                        src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
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
                  <AddBook formData={formData} />
                </CardFooter>
              </Card>
              </div>}
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
