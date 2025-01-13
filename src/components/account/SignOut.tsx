'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { removeTokenCookie, showToast } from "@/lib/utils";
import { TriggerButtonProps } from "@/types/util.interface";

import { Button } from "../ui/button";

const SignOut = ({ triggerButton }: TriggerButtonProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {
      setLoading(true)
      try {
      const response =await removeTokenCookie()
      if (response?.success) {
        setDialogOpen(false);
        showToast("Logged out successfully",'Success')                   
        router.push('/')
      }else{
        setLoading(false)
        showToast("There was an issue with logout",'Error')                  
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

