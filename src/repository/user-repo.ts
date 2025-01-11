import { postApi } from "@/config/api-config";

interface userDataType{
    data:{
        email?:string;
        password?:string;
    }
}
export const signUp = async ({data}:userDataType)=>{
 const response = await postApi(`/auth/signup`, data, 'POST') 
 return response
}

export const signIn = async ({data}:userDataType)=>{
 const response = await postApi(`/auth/signin`, data, 'POST') 
 return response
}

export const getUserData = ()=>{
    const token = "kajldskjf"
    const userId = 1
    return {token,userId}
  }