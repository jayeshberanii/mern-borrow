import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";

// Generic error handler
const handleError = (error: any) => {
  const message =
    error.response?.data?.message || error.message || "Something went wrong!";
  toast.error(message);
  throw new Error(message);
};

// Users
export const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// Books
export const fetchBooks = async () => {
  try {
    const res = await axiosInstance.get("/books");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// Borrow
export const borrowBook = async (userId: string, bookId: string) => {
  try {
    const res = await axiosInstance.post("/borrow", { userId, bookId });
    toast.success("Book borrowed successfully!");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const returnBook = async (userId: string, bookId: string) => {
  try {
    const res = await axiosInstance.post("/borrow/return", { userId, bookId });
    toast.success("Book returned successfully!");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// User borrowed books
export const fetchUserBorrowed = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/borrow/user/${userId}`);
    toast.success("User borrowed books fetched successfully!");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// Analytics
export const fetchTopUsers = async () => {
  try {
    const res = await axiosInstance.get("/analytics/top-users");
    toast.success("Top users fetched successfully!");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const fetchDailyBorrows = async () => {
  try {
    const res = await axiosInstance.get("/analytics/daily-borrows");
    toast.success("Daily borrows fetched successfully!");
    return res.data;
  } catch (err) {
    handleError(err);
  }
};