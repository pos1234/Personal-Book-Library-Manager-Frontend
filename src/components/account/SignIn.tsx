"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleFormSubmit, showToast } from "@/lib/utils";
import { signIn } from "@/repository/user-repo";
import { setUserDataCookie } from "@/lib/cookies";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    handleFormSubmit(email, password, setError, async (email, password) => {
      const credendtial = {
        data: {
          email,
          password,
        },
      };
      setLoading(true)
      const response = await signIn(credendtial);
      if (!response?.error) {
        showToast("Signed in Successfully", "Success");
        if (typeof window !== undefined) {
          setUserDataCookie(JSON.stringify(response));
          router.push("/dashboard/add");
        }
      } else {
        setLoading(false);
        showToast("Signin failed please try again", "Error");
      }
    });
  };

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
      <CardFooter className="max-sm:flex-wrap flex justify-between">
        <Button disabled={loading} variant={"secondary"} onClick={handleClear}>
          Clear
        </Button>
        <Button
          disabled={loading}
          variant={loading ? "secondary" : "default"}
          onClick={handleSubmit}
        >
          Signin
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
