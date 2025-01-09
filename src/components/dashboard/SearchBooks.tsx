import { fetchBooks } from "@/repository/book-repo";
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
import { getPageNumbers } from "@/lib/utils";
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
  const fetchedBooks = await fetchBooks(query, page, 8);
  const pageNumbers = getPageNumbers(page, fetchedBooks?.numFound);
  return (
    <main className="my-10 px-10">
      <div className="w-full flex justify-center pb-10">
        <div className="w-[400px]">
          <SearchInput />
        </div>
      </div>
      <div className="flex flex-wrap gap-5 mt-5">
        {fetchedBooks &&
          fetchedBooks?.docs &&
          fetchedBooks?.docs.map((book: any, index: number) => {
            const coverId = book?.cover_i;
            const formData = {
              title: book?.title || "",
              author: book?.author_name[0] || "",
              isbn: book?.isbn[0] || "",
              cover: book?.cover_i,
            };
            return (
              <Card className="w-[250px]" key={index}>
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
                  <CardDescription className="px-2 text-center pt-2">
                    {book?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>Author: {book?.author_name[0]}</CardContent>
                <CardFooter>
                  <AddBook formData={formData} />
                </CardFooter>
              </Card>
            );
          })}
      </div>
      <Pagination
        path="dashboard/add"
        page={page}
        pageNumbers={pageNumbers}
        totalPages={fetchedBooks?.numFound}
        query={searchParams?.query ?? ""}
      />
    </main>
  );
};

export default SearchBooks;
