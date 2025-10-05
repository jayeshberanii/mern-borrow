// components/BorrowedList.tsx
import { BorrowedBook } from "@/types/common";
import React from "react";

interface Props {
  borrowed: BorrowedBook[];
  onReturn: (bookId: string) => void;
}

const BorrowedList: React.FC<Props> = ({ borrowed, onReturn }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Borrowed Books</h2>
      {borrowed.length === 0 ? (
        <p>No borrowed books.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Borrowed At</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowed.map((b) => (
              <tr key={b._id}>
                <td className="border px-4 py-2">{b.book.title}</td>
                <td className="border px-4 py-2">{b.book.author}</td>
                <td className="border px-4 py-2">
                  {new Date(b.borrowedAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 flex justify-center">
                  <button
                    onClick={() => onReturn(b.book._id)}
                    className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowedList;
