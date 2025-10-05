"use client";
import { fetchDailyBorrows, fetchTopUsers } from "@/services/book";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TopUser = { name: string; userId: string; totalBorrows: number };
type DailyBorrow = { day: string; count: number };

export default function AnalyticsWrapper() {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [dailyBorrows, setDailyBorrows] = useState<DailyBorrow[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await fetchTopUsers();
        if (users) setTopUsers(users);

        const borrows = await fetchDailyBorrows();
        if (borrows) setDailyBorrows(borrows);
      } catch (err) {
        toast.error("Failed to load analytics data");
      }
    };
    loadData();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Top 3 Users */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Top 3 Users</h2>
        {topUsers.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Total Borrows</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((u) => (
                <tr key={u?.userId}>
                  <td className="p-2 border text-center">{u?.name}</td>
                  <td className="p-2 border text-center">{u?.totalBorrows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Daily Borrows */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Daily Borrows (Last 7 Days)
        </h2>
        {dailyBorrows.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Borrows</th>
              </tr>
            </thead>
            <tbody>
              {dailyBorrows.map((d, i) => (
                <tr key={i}>
                  <td className="p-2 border text-center">{d?.day}</td>
                  <td className="p-2 border text-center">{d?.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
