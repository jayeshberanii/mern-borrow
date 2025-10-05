require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); 

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// routes
app.use("/api/books", require("./routes/book.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/borrow", require("./routes/borrow.route"));
app.use("/api/analytics", require("./routes/analytics.route"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
