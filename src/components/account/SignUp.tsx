"use client";
import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleFormSubmit, validateEmail, validatePassword } from "@/lib/utils";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const handleSubmit = () => {
    handleFormSubmit(email, password, setError, (email, password) => {
      console.log("Signin:", { email, password });
      // Perform signin logic here
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
      <CardFooter className="flex justify-between">
        <Button variant={"secondary"} onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleSubmit}>Signup</Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
