export interface UserDataProp{
    token?:{
        access_token?:string;
    }
    userData:{
        createdAt?:string;
        updatedAt?:string;
        email?:string;
        id?:number;
        name?:string | null
    }
}

export interface CredentialProps{
    data:{
        email?:string;
        password?:string;
    }
}