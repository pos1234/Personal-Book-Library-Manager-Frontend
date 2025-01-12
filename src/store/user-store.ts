import {create} from 'zustand';

interface Store {
  userData: any | null;
  bookmarkedBooks: any[];

  // Actions
  setUserData: (data: any) => void;
  clearUserData: () => void;

  addBookmarkedBook: (book: any) => void;
  removeBookmarkedBook: (bookId: string) => void;
}

export const useStore = create<Store>((set) => ({
  userData: null,
  bookmarkedBooks: [],

  // Set user data
  setUserData: (data: any) => set({ userData: data }),

  // Clear user data
  clearUserData: () => set({ userData: null }),

  // Add a book to bookmarked books
  addBookmarkedBook: (book: any) =>
    set((state) => ({
      bookmarkedBooks: [...state.bookmarkedBooks, book],
    })),

  // Remove a book from bookmarked books by id
  removeBookmarkedBook: (bookId: string) =>
    set((state) => ({
      bookmarkedBooks: state.bookmarkedBooks.filter(
        (book) => book.id !== bookId
      ),
    })),


}));