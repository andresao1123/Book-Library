export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  isbn: string;
  publishedYear: number;
  genre: string;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  borrowedAt: Date;
  bookData: Book;
}

export type LibraryStackParamList = {
  BookList: undefined;
  BookDetail: { book: Book };
};

export type RootTabParamList = {
  LibraryTab: undefined;
  BorrowedBooks: undefined;
};