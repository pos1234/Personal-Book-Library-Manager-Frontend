"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams: any = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    if (term) {
      params.set("query", term);
      params.set("page", "1");
    } else {
      params.delete("query");
      params.set("page", "1");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-4">
      <input
        className="w-full rounded-md px-6 py-3 h-[54px] shadow-lg"
        type="text"
        placeholder="Search ..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="cursor-pointer">
        <Search onClick={() => handleSearch(searchTerm)} />
      </div>
    </div>
  );
};

export default SearchInput;
