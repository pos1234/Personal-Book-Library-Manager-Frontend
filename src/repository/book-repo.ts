import { fetchApi, postApi } from "@/config/api-config";

interface BookFormat {
  docs:{
    title: string;
    author_name: any[];
    isbn: string[];
    cover_i: any;
    key:string
  }[],
  numFound?: number,
  start?:number,
  numFoundExact?: boolean,
  num_found: number,
  q?: string,
  offset?: number
}

export interface BookDataFormat{
    author: string;
    isbn?: string;
    key: string;
    notes?: string;
    readStatus?: boolean;
    title?: string;
    rating?: number; 
}
export const getUserData = ()=>{
  const token = "kajldskjf"
  const userId = 1
  return {token,userId}
}

export const fetchBooks = async (
  query?: string,
  page?: number,
  limit?: number
) => {
  const queryString = query? `q=${query}&` : 'q=bestsellers&'
  const maxLimit = limit || 8;
  const currentPage = page || 1
  const url = `${process.env.OPEN_API_URL}?${queryString}fields=title,author_name,isbn,key,cover_i&limit=${maxLimit}&page=${currentPage}`;

  try {
    // Fetch data from the Open Library API
    const response = await fetch(url);
    const data = await response.json();

    // Check if books were found
    if (data.docs && data.docs.length > 0) {            
      return data as BookFormat;
    } else {
      console.log('No books found');
      return
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
};

export const addBookmark = async (data?:BookDataFormat)=>{
  const {token,userId} = getUserData()  
 const response = await postApi(`/bookmarks/user/${userId}`, data, 'POST',token) 
 return response
}

export const fetchBookmarks = async ()=>{
  const {token,userId} = getUserData();
  const urlParamsObject={
    page:1,
    limit:1
  }
 const response = await fetchApi(`/bookmarks/user/${userId}`,token,urlParamsObject) 
 return response
}


