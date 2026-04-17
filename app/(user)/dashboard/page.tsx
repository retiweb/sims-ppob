"use client";

import Image from "next/image";
import SaldoSection from "@/components/common/saldo-section";
import Link from "next/link";
import useDashboard from "./useDashboard";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCheckoutService } from "@/features/payment/paymentSlice";

type serviceType = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

type bannerType = {
  banner_name: string;
  banner_image: string;
  description: string;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { dataServices, dataBanners } = useDashboard();

  if (!dataBanners || !dataServices) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
        <p className="text-lg font-bold">Memuat....</p>
      </div>
    );
  }

  const handleBuy = (service: serviceType) => {
    dispatch(setCheckoutService(service));
    router.push("/payment");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-20 items-center w-full">
      <SaldoSection />
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 md:col-span-5 gap-y-6 gap-x-2 overflow-x-auto no-scrollbar snap-x">
        {dataServices.map((service: serviceType, index: number) => (
          <button
            key={index}
            onClick={() => handleBuy(service)}
            className="flex flex-col items-center justify-start group cursor-pointer bg-transparent border-none outline-none w-full"
          >
          
            <div className="w-14 h-14 md:w-16 md:h-16 relative mb-2 shrink-0">
              <Image
                src={service.service_icon}
                alt={service.service_name}
                fill
                className="object-contain transition-transform group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 56px, 64px"
              />
            </div>
            <p className="text-[10px] md:text-xs text-center font-medium text-gray-700 leading-tight w-full wrap-break-word group-hover:text-red-500 transition-colors">
              {service.service_name}
            </p>
          </button>
        ))}
      </div>
      <div className="flex flex-col space-y-4 col-span-5">
        <h4 className="font-semibold text-gray-900">Temukan promo menarik</h4>

        {/* Kontainer Scroll */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x">
          {dataBanners.map((banner: bannerType, index: number) => (
            <div
              key={index}
              className="shrink-0 w-70 md:w-[320px] h-30 relative rounded-xl overflow-hidden snap-start"
            >
              <Image
                src={banner.banner_image}
                alt={banner.banner_name}
                fill
                priority
                sizes="1"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
