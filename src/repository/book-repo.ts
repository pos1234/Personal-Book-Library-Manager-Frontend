import { deleteApi, fetchApi, patchApi, postApi } from "@/config/api-config";
import { BookData, ExternalBookFormat } from "@/types/book.interface";
import { UserDataProp } from "@/types/user.interface";

export const fetchBooks = async (
  query?: string,
  page?: number,
  limit?: number
) => {
  const queryString = query ? `q=${query}&` : "q=bestsellers&";
  const maxLimit = limit || 8;
  const currentPage = page || 1;
  const url = `${process.env.OPEN_API_URL}?${queryString}fields=title,author_name,isbn,key,cover_i&limit=${maxLimit}&page=${currentPage}`;

  try {
    // Fetch data from the Open Library API
    const response = await fetch(url);
    const data = await response.json();

    // Check if books were found
    if (data.docs && data.docs.length > 0) {
      return data as ExternalBookFormat;
    } else {
      return;
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
};

export const addBookmark = async (data?: BookData, user?: UserDataProp) => {
  const token = user?.token?.access_token;
  const userId = user?.userData?.id;
  try {
    const response = await postApi(
      `/bookmarks/user/${userId}`,
      data,
      "POST",
      token
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
      data: [],
    };
  }
};

export const updateBookmark = async (
  data?: BookData,
  id?: number,
  user?: UserDataProp
) => {
  const token = user?.token?.access_token;
  const userId = user?.userData?.id;
  try {
    const response = await patchApi(
      `/bookmarks/user/${userId}/${id}`,
      data,
      "PATCH",
      token
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
      data: [],
    };
  }
};

export const deleteBookmark = async (id?: number, user?: UserDataProp) => {
  const token = user?.token?.access_token;
  const userId = user?.userData?.id;
  try {
    const response = await deleteApi(
      `/bookmarks/user/${userId}/${id}`,
      "DELETE",
      token
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
      data: [],
    };
  }
};

export const fetchBookmarks = async (
  page?: number,
  user?: UserDataProp,
  query?: string,
  limit?: number
) => {
  const token = user?.token?.access_token;
  const userId = user?.userData?.id;
  const currentPage = page || 1;
  const maxLimit = limit || 8;
  const urlParamsObject = {
    page: currentPage,
    limit: maxLimit,
  };
  const url = query
    ? `/bookmarks/user/${userId}?title=${query}&author=${query}`
    : `/bookmarks/user/${userId}`;
  try {
    const response = await fetchApi(url, token, urlParamsObject);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
      data: [],
    };
  }
};
