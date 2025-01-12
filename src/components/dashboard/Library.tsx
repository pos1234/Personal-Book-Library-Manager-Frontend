import { fetchBookmarks } from "@/repository/book-repo";
import { getPageNumbers } from "@/lib/utils";

import Link from "next/link";

import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import LibraryBookCard from "./LibraryBookCard";
import { Button } from "../ui/button";
type pageParams = {
  searchParams: { [key: string]: string };
  userData:any
};
const Library = async ({ searchParams,userData }: pageParams) => {
  const page =
    typeof searchParams?.page === "string"
      ? Number(searchParams.page)
      : searchParams?.page ?? 1;
  const query = searchParams?.query || "";
  const bookmarks = await fetchBookmarks(page,userData)  
  const pageNumbers = getPageNumbers(page, bookmarks?.totalPages);
  return (
    <main className="my-10 px-10">
      {bookmarks?.data && bookmarks?.data?.length>0 &&<div className="w-full flex justify-center pb-10">
        <div className="w-[400px]">
          <SearchInput />
        </div>
      </div>}
      {bookmarks?.data && bookmarks?.data?.length==0 && <div className="flex flex-col items-center gap-5">
        <h1 className="text-center font-bold">
        Your library is empty, add some books from here <br />
        </h1>
        <Link href={"/dashboard/add"}>
        <Button>
         Explore Books  
        </Button>
        </Link>
      </div> }
      <div className="flex flex-wrap sm:mt-5">
        {bookmarks &&
          bookmarks?.data &&
          bookmarks?.data.map((book: any, index: number) => {
            return (
                <LibraryBookCard
                bookData={book}
                key={index}
                userData={userData}
              />
            );
          })}
      </div>
      {bookmarks?.data && bookmarks?.data?.length>0 &&<Pagination
        path="dashboard/library"
        page={page}
        pageNumbers={pageNumbers}
        totalPages={bookmarks?.totalPages || 0}
        query={searchParams?.query ?? ""}
      />}
    </main>
  );
};

export default Library;






