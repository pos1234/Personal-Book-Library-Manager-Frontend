import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Image from "next/image";
import { logo } from "@/lib/image-constants";

const AccountCard = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        width={50}
        height={50}
        src={logo}
        alt="Fidel logo"
        className="h-fit mb-3 object-contain"
      />
      <Tabs defaultValue="signin" className="md:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Signin</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
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
