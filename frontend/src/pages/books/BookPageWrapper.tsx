"use client";
import { Book, BorrowedBook, User } from "@/types/common";
import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import BorrowedList from "./components/BorrowedList";
import UserSelect from "./components/UserSelect";
import {
  borrowBook,
  fetchBooks,
  fetchUserBorrowed,
  fetchUsers,
  returnBook,
} from "@/services/book";

export default function BookPageWrapper() {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [borrowed, setBorrowed] = useState<BorrowedBook[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchBooks().then(setBooks);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchUserBorrowed(selectedUser).then((data) => {
        setBorrowed(data.filter((b: BorrowedBook) => !b.returnedAt));
      });
    } else {
      setBorrowed([]);
    }
  }, [selectedUser]);

  const handleBorrow = async (bookId: string) => {
    await borrowBook(selectedUser, bookId);
    const updated = await fetchUserBorrowed(selectedUser);
    setBorrowed(updated.filter((b: BorrowedBook) => !b.returnedAt));
  };

  const handleReturn = async (bookId: string) => {
    await returnBook(selectedUser, bookId);
    const updated = await fetchUserBorrowed(selectedUser);
    setBorrowed(updated.filter((b: BorrowedBook) => !b.returnedAt));
  };

  const borrowedBookIds = borrowed.map((b) => b.book._id);
  const canBorrow = borrowed.length < 2;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Borrowing Insights</h1>
      <UserSelect
        users={users}
        selectedUser={selectedUser}
        onChange={setSelectedUser}
      />
      <BookList
        books={books}
        borrowedBooks={borrowedBookIds}
        onBorrow={handleBorrow}
        canBorrow={canBorrow && !!selectedUser}
      />
      {selectedUser && (
        <BorrowedList borrowed={borrowed} onReturn={handleReturn} />
      )}
    </div>
  );
}
