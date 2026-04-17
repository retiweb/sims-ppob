"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO SECTION */}
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/images/logo.png" 
              width={28} 
              height={28} 
              alt="Logo" 
              className="w-7 h-7"
            />
            <h1 className="text-base md:text-lg font-bold tracking-tight">
              SIMS PPOB
            </h1>
          </Link>

          {/* MENU SECTION */}
          <div className="flex items-center space-x-6 md:space-x-10">
            <Link 
              href="/top-up" 
              className={`text-sm md:text-base font-medium text-gray-700 hover:text-red-500 transition-colors ${pathname == '/top-up' ? 'text-red-500' : ''}`}
            >
              Top Up
            </Link>
            <Link 
              href="/transaction" 
              className={`text-sm md:text-base font-medium text-gray-700 hover:text-red-500 transition-colors ${pathname == '/transaction' ? 'text-red-500' : ''}`}
            >
              Transaction
            </Link>
            <Link 
              href="/account" 
              className={`text-sm md:text-base font-medium text-gray-700 hover:text-red-500 transition-colors ${pathname == '/account' ? 'text-red-500' : ''}`}
            >
              Akun
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;