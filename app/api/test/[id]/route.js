import { requestToBodyStream } from "next/dist/server/body-streams"

export async function GET(request, { params }){
  const requestHeaders = new Headers(request.Headers)
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  console.log(requestHeaders)
  console.log(query)
  return Response.json({
    name: 'witty',
    id: params.id
  })
}