import { NextRequest, NextResponse } from "next/server";

export const middleware = async(request:NextRequest) => {

  const cookies = request.cookies.get('user_data');
  const value = cookies?.value;
  const userData = value && JSON.parse(value)
  const access_token = userData?.token?.access_token  
  if (value && access_token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If not logged in, protect dashboard route
  if (!value && !access_token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next()
}

export const config = {
  matcher:['/dashboard/:path*','/']
}

