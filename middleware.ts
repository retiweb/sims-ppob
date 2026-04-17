// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ambil token dari cookies (karena middleware berjalan di server, 
  // ia tidak bisa membaca localStorage)
  const token = request.cookies.get('token')?.value

  const isAuthPage = request.nextUrl.pathname === '/auth/login' || 
                     request.nextUrl.pathname === '/auth/registration'

  // 1. Jika tidak ada token dan mencoba akses halaman terproteksi
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // 2. Jika sudah ada token dan mencoba akses halaman login/regis
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Tentukan halaman mana saja yang akan diproteksi oleh middleware ini
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/top-up/:path*', 
    '/transaction/:path*', 
    '/account/:path*',
    '/login',
    '/registration'
  ],
}