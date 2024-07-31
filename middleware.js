import { NextResponse } from 'next/server'
import { jwtVerify, importJWK } from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log('test middleware') 
  try {
    const token = request.cookies.get('token').value
    const secretJWK = {
      kty: 'oct',
      k: process.env.JOSE_SECRET
    }    
    const secretKey = await importJWK(secretJWK,'HS256')
    const { payload } = await jwtVerify(token, secretKey)
    console.log('middleware: ',payload)    
    if (payload.email !== 'witty@test.com'){
      throw new Error('email incorrect!')
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify({ email:payload.email}))
    // console.log('header: ',requestHeaders)
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    return response//NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // return NextResponse.redirect(new URL('/', request.url))
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/content/:path*','/manage/blog/:path*'],
}