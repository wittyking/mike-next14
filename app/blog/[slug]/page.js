
async function getBlogs(slug){
  const response = await fetch(`https://66a7b17053c13f22a3d0bc6a.mockapi.io/blogs/blogs/${slug}`,{ cache: 'force-cache' })//set option cache เป็น force-cache หรือ no-store

  if (!response.ok){
    throw new Error('cannot fetch blog')
  }

  return response.json()
}

export default async function Page({ params}){
  const blog = await getBlogs(params.slug)
  return (
    <div>
      ID: { params.slug }
      <div>
        Blog Name: {blog.name}
      </div>
      <div>
        Description: {blog.description}
      </div>
    </div>
  )
}