require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Book = require("./models/Book");
const Borrow = require("./models/Borrow");

(async function seed() {
  await connectDB();
  try {
    await Borrow.deleteMany({});
    await User.deleteMany({});
    await Book.deleteMany({});

    const users = await User.create([
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Singh", email: "bob@example.com" },
      { name: "Charlie Kim", email: "charlie@example.com" },
    ]);

    const books = await Book.create([
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        price: "1500",
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        price: "1200",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        price: "1000",
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        price: "1100",
      },
    ]);

    // create some borrow history
    await Borrow.create({
      user: users[0]._id,
      book: books[0]._id,
      borrowedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      returnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    });
    await Borrow.create({
      user: users[0]._id,
      book: books[1]._id,
      borrowedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      returnedAt: null,
    }); // active
    await Borrow.create({
      user: users[1]._id,
      book: books[2]._id,
      borrowedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
      returnedAt: null,
    }); // active
    await Borrow.create({
      user: users[2]._id,
      book: books[3]._id,
      borrowedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      returnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    });

    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
