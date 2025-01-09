import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarNavigation from "@/components/dashboard/SidebarNavigation";
import Image from "next/image";
import { logo } from "@/lib/image-constants";
import SearchBooks from "@/components/dashboard/SearchBooks";

type pageParams = {
  params: Promise<{
    page?: string;
  }>
  searchParams: Promise<{ [key: string]: string }>;
};
const page = async ({ params, searchParams }: pageParams) => {
    const currentSearchParams = await searchParams
    const currentPage = await params
  const renderTab = () => {
    switch (currentPage?.page) {
      case "add":
        return <SearchBooks searchParams={currentSearchParams}/>;
      //   case "jobs":
      //     return <Jobs searchParams={searchParams} />;
      //   default:
      //     return <JobPost searchParams={searchParams} />;
    }
  };
  return (
    <main>
      <SidebarProvider>
        <SidebarNavigation page={currentPage?.page} />
        <SidebarInset className="relative">
          <div
            className="h-fit p-3 flex items-center justify-between md:hidden"
            title="Toggle sidebar"
          >
            <Image
              width={20}
              height={10}
              src={logo}
              alt="Fidel logo"
              className="h-10 pl-1 object-contain"
            />
            <SidebarTrigger className="" />
          </div>
          {renderTab()}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default page;
