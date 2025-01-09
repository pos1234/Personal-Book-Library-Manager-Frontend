"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { dashboardNavigation } from "@/data/dashboardNavigation";
import { logo } from "@/lib/image-constants";
import { LogOut } from "lucide-react";
// import { faviIconLogo } from "@palmjobs/lib/constants/image-constants";
import Image from "next/image";
import Link from "next/link";

const SidebarNavigation = ({ page }: { page?: string }) => {
  const activePage = page;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Image
          width={20}
          height={10}
          src={logo}
          alt="Fidel logo"
          className="h-10 pl-1 object-contain"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {dashboardNavigation.map((navigation: any, index: number) => {
              return (
                <SidebarMenuItem
                  key={index}
                  className={`${
                    activePage?.toLowerCase() == navigation.title.toLowerCase()
                      ? "text-gradientFirst bg-sidebar-accent"
                      : ""
                  } `}
                >
                  <Link href={navigation?.slug}>
                    <SidebarMenuButton tooltip={navigation.title}>
                      {navigation.icon}
                      <span>{navigation.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton tooltip={"Logout"}>
          <LogOut />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
      <div>
        <SidebarTrigger className=" float-right mr-2" />
      </div>
      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarNavigation;
