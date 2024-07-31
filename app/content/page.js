async function getBlogs(){
  const response = await fetch('https://66a7b17053c13f22a3d0bc6a.mockapi.io/blogs/blogs',{ cache: 'force-cache' })//set option cache เป็น force-cache หรือ no-store

  if (!response.ok){
    throw new Error('cannot fetch blog')
  }

  return response.json()
}

export default async function Page(){

  const blogs = await getBlogs()
  
  return (
    <div>
      hi Witty
    {  //server render จะจำค่าที่ fetch มา แม้จะเปลี่ยนข้อมูลใน apiแล้วก็ตาม
      blogs.map((blog, index)=> (
        <div key={index}>
          {blog.id} {blog.name}
        </div>
      ))
    }
    </div>
  )
}