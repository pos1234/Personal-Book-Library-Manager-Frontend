export interface userDataProp{
    token?:{
        access_token?:string;
    }
    userData:{
        createdAt?:string;
        updatedAt?:string;
        eamil?:string;
        id?:number;
        name?:string | null
    }
}