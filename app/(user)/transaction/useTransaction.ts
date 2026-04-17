"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store"; 
import { useInfiniteQuery } from "@tanstack/react-query";

const useTransaction = (limit = 5) => { // Set limit default ke 5 sesuai permintaan
  const token = useSelector((state: RootState) => state.auth.token);

  // pageParam adalah offset yang akan otomatis bertambah
  const getTransaction = async ({ pageParam = 0 }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/history?offset=${pageParam}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );
    
    const result = await res.json();
    if (result.status !== 0) {
      throw new Error(result.message || "Gagal mengambil riwayat transaksi");
    }
    
    return result.data; // Mengembalikan { offset, limit, records }
  };

  const query = useInfiniteQuery({
    queryKey: ["TRANSACTION", token], 
    queryFn: getTransaction,
    initialPageParam: 0, // Dimulai dari offset = 0
    enabled: !!token, 
    getNextPageParam: (lastPage) => {
      // Jika jumlah record kurang dari limit, artinya data di database sudah habis
      if (lastPage.records.length < limit) {
        return undefined; 
      }
      // FORMULA: n + limit (offset saat ini ditambah limit)
      return Number(lastPage.offset) + limit;
    },
  });

  return query;
};

export default useTransaction;