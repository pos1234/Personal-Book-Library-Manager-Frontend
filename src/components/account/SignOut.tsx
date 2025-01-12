'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
interface BookFormat {
  triggerButton?:any
}
const SignOut = ({ triggerButton }: BookFormat) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const { toast } = useToast()
  const router = useRouter()
 const removeTokenCookie=async()=> {
  try {
    document.cookie = "user_data=; path=/; max-age=0; secure; sameSite=Strict";
    return { success: true };
  } catch (error:any) {
    console.error('Error removing cookie:', error);
    return { success: false, error: error.message };
  }
  }
  const handleSubmit = async () => {
      setLoading(true)
      try {
      const response =await removeTokenCookie()
      if (response?.success) {
        setDialogOpen(false);
        toast({
          title: "",
          description: "Logged out successfully",
          className: cn(
            'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-green-200'
          ),
        })
        router.push('/')
      }else{
        setLoading(false)
        toast({
          title: "There was an issue with logout",
          description: response?.error,
          className: cn(
            'top-0 right-0 flex fixed md:max-w-fit md:top-4 md:right-4 border-green-500 bg-red-200'
          ),
        })
      }
    } catch (error) {
      setLoading(false)
      console.error("Error adding book:", error);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className='max-h-[80vh] overflow-y-auto thinScrollBar'>
                <DialogTitle>
                    Are you sure you want to leave?
                </DialogTitle>
                <div className='w-full flex gap-3 justify-end flex-wrap'>
                    <DialogClose asChild>
                        <Button disabled={loading} variant={"secondary"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={loading} variant={loading ? "secondary" : 'default'} type="button" onClick={handleSubmit}>
                        Logout
                    </Button>
                </div>
            </DialogContent>
    </Dialog>
  );
};

export default SignOut;

