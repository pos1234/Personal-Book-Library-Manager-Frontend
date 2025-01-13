import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logo } from "@/lib/image-constants";
import { searchParamProps } from "@/types/util.interface";

import Image from "next/image";
import Link from "next/link";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AccountCard = async({searchParams}:searchParamProps) => {
  const params = await searchParams
  const activeTab = params?.activeTab ?? "signin"
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        width={50}
        height={50}
        src={logo}
        alt="Fidel logo"
        className="h-fit mb-3 object-contain"
      />
      <Tabs defaultValue={activeTab} className="md:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <Link href={"/?activeTab=signin"} className="col-span-1">
          <TabsTrigger className="w-full" value="signin">Signin</TabsTrigger>
          </Link>
          <Link href={"/?activeTab=signup"} className="col-span-1">
          <TabsTrigger className="w-full" value="signup">SignUp</TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountCard;
