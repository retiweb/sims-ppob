"use client";

import { store } from "@/store";
import { useQuery } from "@tanstack/react-query";



const useDashboard = () => {
  const { token } = store.getState().auth;

  const getServices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json()
    return result.data;
  };

  const getBanners = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json()
    return result.data;
  };

  const { data: dataServices } = useQuery({
    queryKey: ['SERVICES'],
    queryFn: getServices,
    enabled: true
  })


  const { data: dataBanners } = useQuery({
    queryKey: ['BANNERS'],
    queryFn: getBanners,
    enabled: true
  });


  return {
    dataServices,
    dataBanners,
  }
};

export default useDashboard;
