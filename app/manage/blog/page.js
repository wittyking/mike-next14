import { headers } from 'next/headers'
import Link from 'next/link'

async function getBlogs(){
  const response = await fetch(`https://66a7b17053c13f22a3d0bc6a.mockapi.io/blogs/blogs`)//,{ cache: 'force-cache' }set option cache เป็น force-cache หรือ no-store

  if (!response.ok){
    throw new Error('cannot fetch blog')
  }

  return response.json()
}

export default async function Page(){
  const headerRequest = headers()
  const user = JSON.parse(headerRequest.get('user'))

  const blogs = await getBlogs()
  return (
    <div>
      Manage Blog
      <div>
        {user.email}
      </div>  
      <div>
        Blog List:
        {  //server render จะจำค่าที่ fetch มา แม้จะเปลี่ยนข้อมูลใน apiแล้วก็ตาม
          blogs.map((blog, index)=> (
            <div key={index}>
              {blog.id} {blog.name}
              <Link href={`/manage/blog/${blog.id}`} className="px-4 bg-blue-400">
              Go to edit blog...
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}