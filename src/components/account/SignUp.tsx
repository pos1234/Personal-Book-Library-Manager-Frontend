"use client";
import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, handleFormSubmit } from "@/lib/utils";
import { signUp } from "@/repository/user-repo";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { setUserDataCookie } from "@/lib/cookies";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const { toast } = useToast()
const [loading,setLoading] = useState(false)
  const router = useRouter()
  const handleSubmit =() => {
    handleFormSubmit(email, password, setError,async (email, password) => {
      const credendtial = {
        data:{
          email,
          password
        }
      }
     const response = await signUp(credendtial)     
     if (!response?.error) {
              toast({
                title: "",
                description: "Account created successfully",
                className: cn(
                  'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-green-200'
                ),
              })

              if(typeof window !== undefined){
                setUserDataCookie(JSON.stringify(response))
                router.push('/dashboard/add')
              }
            }else{
              setLoading(false)
              toast({
                title: "Account not created",
                description: response?.message,
                className: cn(
                  'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-red-200'
                ),
              })
            }
  }
)}

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setError({ email: "", password: "" });
  };
  return (
    <Card>
      <CardContent className="space-y-2 pt-5">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button disabled={loading} variant={"secondary"} onClick={handleClear}>
          Clear
        </Button>
        <Button disabled={loading} variant={loading ? "secondary" : 'default'} onClick={handleSubmit}>Signup</Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
