interface BookFormat {
  title: string;
  author_name: any[];
  isbn: any[];
  cover_i: any;
}
export const fetchBooks = async (
  query?: string,
  page?: number,
  limit?: number
) => {
  const url = `${process.env.OPEN_API_URL}?q=${query}&fields=title,author_name,isbn,cover_i&limit=${limit}&page=${page}`;

  try {
    // Fetch data from the Open Library API
    const response = await fetch(url);
    const data = await response.json();

    // Check if books were found
    if (data.docs && data.docs.length > 0) {
      return data;
    } else {
      console.log('No books found');
      return []
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
};
