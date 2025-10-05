import { Book } from "@/types/common";

interface Props {
  books: Book[];
  borrowedBooks: string[]; // bookIds already borrowed by selected user
  onBorrow: (bookId: string) => void;
  canBorrow: boolean;
}

const BookList: React.FC<Props> = ({
  books,
  borrowedBooks,
  onBorrow,
  canBorrow,
}) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="">
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Author</th>
          <th className="border px-4 py-2">price</th>
          <th className="border px-4 py-2">Availability</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => {
          const alreadyBorrowed = borrowedBooks.includes(book._id);
          return (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.price ? `$${book.price}` : "-"}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => onBorrow(book._id)}
                  disabled={alreadyBorrowed || !canBorrow}
                  className={`px-2 py-1 rounded ${
                    alreadyBorrowed || !canBorrow
                      ? "bg-gray-400 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {alreadyBorrowed ? "Borrowed" : "Available"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookList;
