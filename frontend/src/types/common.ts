export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  price?: string;
}

export interface BorrowedBook {
  _id: string;
  book: {
    _id: string;
    title: string;
    author: string;
  };
  borrowedAt: string;
  returnedAt?: string;
}
