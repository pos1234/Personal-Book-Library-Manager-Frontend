import { BookData, ExternalBookFormat, FetchBookFormaProps } from "@/types/book.interface";

export const mockDataExternalApi: ExternalBookFormat = {
  docs: [
    {
      title: "Book one",
      author_name: ["Abebe", "Girma"],
      ISBN: ["34567", "34567890", "56899"],
      cover_i: 34567,
      key: "/key/Wjdiu87",
    },
    {
      title: "Book two",
      author_name: ["Abebe", "Girma"],
      ISBN: ["34567", "34567890", "56899"],
      cover_i: 34567,
      key: "/key/Wjdiu456",
    },
  ],
  numFound: 2123,
  start: 1,
  numFoundExact: true,
  num_found: 234,
  q: "The father",
  offset: 10,
};

export const mockDataFetchBookmark:FetchBookFormaProps = {
  docs: [
    {
      id: 1,
      title: "The Father",
      author: "Abebe",
      ISBN: "978-3-16-148410-0",
      coverId: 101,
      key: "book-1",
      notes: "A compelling tale of family and tradition.",
      rating: 4.5,
      readStatus: true,
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-10T15:00:00Z",
      userId: 1,
    },
    {
      id: 2,
      title: "The Alcatrez",
      author: "Abebe",
      ISBN: "978-3-16-148410-0",
      coverId: 101,
      key: "book-1",
      notes: "A compelling tale of family and tradition.",
      rating: 4.5,
      readStatus: true,
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-10T15:00:00Z",
      userId: 1,
    },
  ],
};
export const mockDataAddBookmark: BookData = {
  id: 1,
  title: "The Father",
  author: "Abebe",
  ISBN: "978-3-16-148410-0",
  coverId: 101,
  key: "book-1",
  notes: "A compelling tale of family and tradition.",
  rating: 4.5,
  readStatus: true,
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-10T15:00:00Z",
};
