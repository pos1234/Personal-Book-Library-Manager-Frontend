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
import { LogOut } from "lucide-react";
import Link from "next/link";
import SignOut from "../account/SignOut";

const SidebarNavigation = ({
  page,
  userData,
}: {
  page?: string;
  userData: any;
}) => {
  const activePage = page;
  const token = userData?.token?.access_token;
  const user = userData?.userData;
  return (
    <Sidebar collapsible="icon">
      {token && (
        <SidebarHeader>
          <span className="bg-gray-200 w-fit py-2 px-2.5 rounded-full font-bold text-[12px]">
            {user?.email.charAt(0).toUpperCase()}
            {user?.email.charAt(1).toUpperCase()}
          </span>
        </SidebarHeader>
      )}
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
          <SignOut
            triggerButton={
              <div className="flex gap-2 items-center">
                <LogOut size={15} />
                <span>Logout</span>
              </div>
            }
          />
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
