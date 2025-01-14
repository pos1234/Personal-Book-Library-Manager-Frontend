import { deleteApi, fetchApi, patchApi, postApi } from "../src/config/api-config";
import {
  addBookmark,
  deleteBookmark,
  fetchBookmarks,
  updateBookmark,
} from "@/repository/book-repo";
import { mockDataAddBookmark, mockDataFetchBookmark } from "../__fixtures__/mockDataBookmark";
jest.mock("../src/config/api-config", () => ({
  fetchApi: jest.fn(),
  postApi: jest.fn(),
  patchApi: jest.fn(),
  deleteApi: jest.fn(),
}));

describe("Bookmark Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    userData: {
      id: 1,
      createdAt: "2025-01-11T12:01:58.361Z",
      updatedAt: "2025-01-11T12:01:58.361Z",
      email: "abebe2@gmail.com",
      name: null,
    },
    token: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWJlYmUyQGdtYWlsLmNvbSIsImlhdCI6MTczNjg1MjA4MCwiZXhwIjoxNzM5NDQ0MDgwfQ.5vZf9FARuUhk4acUdLqnQFm3oYy7P7U0JfjjLLEvuLQ",
    },
  };
  const book = {
    title: "The Father",
    author: "Abebe",
    ISBN: "978-3-16-148410-0",
    coverId: 101,
    key: "book-1",
    notes: "A compelling tale of family and tradition.",
    rating: 4,
    readStatus: true,
  };
  describe("fetchBookmarks", () => {
    it("Fetches books from library", async () => {
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockDataFetchBookmark);
      const bookmark = await fetchBookmarks(1,user,'The Father',10);
      expect(bookmark).toEqual(mockDataFetchBookmark);
      expect(fetchApi).toHaveBeenCalledWith(
        "/bookmarks/user/1?title=The Father&author=The Father",
        expect.any(String),
        expect.any(Object),
        
      );
      expect(fetchApi).toHaveBeenCalledTimes(1);
    });
    it("returns error object on post failure", async () => {
      (fetchApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const bookmark = await fetchBookmarks(1,user,'The Father',10);
      expect(fetchApi).toHaveBeenCalledWith(
        "/bookmarks/user/1?title=The Father&author=The Father",
        expect.any(String),
        expect.any(Object),
      );
      expect(bookmark).toEqual({
        data: [],
      });
      expect(fetchApi).toHaveBeenCalledTimes(1);
    });
  });
  describe("addBookmark", () => {
    it("Adds books to library", async () => {
      (postApi as jest.Mock).mockResolvedValueOnce(mockDataAddBookmark);
      const bookmark = await addBookmark(book, user);
      expect(bookmark).toEqual(mockDataAddBookmark);
      expect(postApi).toHaveBeenCalledWith(
        "/bookmarks/user/1",
        expect.any(Object),
        expect.any(String),
        expect.any(String)
      );
      expect(postApi).toHaveBeenCalledTimes(1);
    });

    it("returns error object on post failure", async () => {
      (postApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const bookmark = await addBookmark(book, user);
      expect(postApi).toHaveBeenCalledWith(
        "/bookmarks/user/1",
        expect.any(Object),
        expect.any(String),
        expect.any(String)
      );
      expect(bookmark).toEqual({
        data: [],
      });
      expect(postApi).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateBookmark", () => {
    it("Updates books from library", async () => {
      (patchApi as jest.Mock).mockResolvedValueOnce(mockDataAddBookmark);
      const bookmark = await updateBookmark(book, 1, user);
      expect(bookmark).toEqual(mockDataAddBookmark);
      expect(patchApi).toHaveBeenCalledWith(
        "/bookmarks/user/1/1",
        expect.any(Object),
        expect.any(String),
        expect.any(String)
      );
      expect(patchApi).toHaveBeenCalledTimes(1);
    });

    it("returns error object on post failure", async () => {
      (patchApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const bookmark = await updateBookmark(book, 1, user);
      expect(patchApi).toHaveBeenCalledWith(
        "/bookmarks/user/1/1",
        expect.any(Object),
        expect.any(String),
        expect.any(String)
      );
      expect(bookmark).toEqual({
        data: [],
      });
      expect(patchApi).toHaveBeenCalledTimes(1);
    });
  });
  describe("deleteBookmark", () => {
    it("Deletes a book from library", async () => {
      (deleteApi as jest.Mock).mockResolvedValueOnce(mockDataAddBookmark);
      const bookmark = await deleteBookmark(1, user);
      expect(bookmark).toEqual(mockDataAddBookmark);
      expect(deleteApi).toHaveBeenCalledWith(
        "/bookmarks/user/1/1",
        expect.any(String),
        expect.any(String)
      );
      expect(deleteApi).toHaveBeenCalledTimes(1);
    });

    it("returns error object on post failure", async () => {
      (deleteApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const bookmark = await deleteBookmark(1, user);
      expect(deleteApi).toHaveBeenCalledWith(
        "/bookmarks/user/1/1",
        expect.any(String),
        expect.any(String)
      );
      expect(bookmark).toEqual({
        data: [],
      });
      expect(deleteApi).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteBookmark", () => {
    it("Deletes a book from library", async () => {
      (deleteApi as jest.Mock).mockResolvedValueOnce(mockDataAddBookmark);
      const bookmark = await deleteBookmark(1, user);
      expect(bookmark).toEqual(mockDataAddBookmark);
      expect(deleteApi).toHaveBeenCalledWith(
        "/bookmarks/user/1/1",
        expect.any(String),
        expect.any(String)
      );
      expect(deleteApi).toHaveBeenCalledTimes(1);
    });

    it("returns error object on post failure", async () => {
      (deleteApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const bookmark = await deleteBookmark(1, user);
      expect(deleteApi).toHaveBeenCalledWith(
        "/bookmarks/user/1/1",
        expect.any(String),
        expect.any(String)
      );
      expect(bookmark).toEqual({
        data: [],
      });
      expect(deleteApi).toHaveBeenCalledTimes(1);
    });
  });
});
