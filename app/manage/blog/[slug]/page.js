'use client'

import { useState, useEffect} from 'react'

async function getBlogs(slug){
  const response = await fetch(`https://66a7b17053c13f22a3d0bc6a.mockapi.io/blogs/blogs/${slug}`)//set option cache เป็น force-cache หรือ no-store

  if (!response.ok){
    throw new Error('cannot fetch blog')
  }

  return response.json()
}

export default function Page({ params}){
  // const [blogState, setBlogState] = useState[{
  //   name: '' 
  // }]
  const [blogState, setBlogState] = useState([])

  const initBlog = async () => {
    try {
      const result = await getBlogs(params.slug)
      setBlogState(result)
    } catch (error) {
      console.log('error ',error)
    }
  }

    const handleChange = (event)=>{
    const { name, value} = event.target
    setBlogState((prevState) => ({
      ...prevState,
      [name]: value
    })    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form Submitted ',blogState)
    try {
      const response = await fetch(`https://66a7b17053c13f22a3d0bc6a.mockapi.io/blogs/blogs/${params.slug}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',         
        },
        body: JSON.stringify(blogState)
      })
    if (!response.ok){
      throw new Error ('Network response was not ok')
    }      

      const responseData = await response.json()
      console.log('Form submitted successfully', responseData)
    } catch (error){
      console.error('There was a problem with the fetch operation:')
    }
    
  }


  useEffect (()=> {
    initBlog()
  }, [])
  return (
    <div> manage blog
      ID: { params.slug }
      <div>
        Blog Name: {blogState.name}
        <form onSubmit={handleSubmit}>
        <input name='name' type="text" value={blogState.name} onChange={handleChange}/>
        <button>Update</button>
        </form>
      </div>
      <div>
        Description: {blogState.description}
      </div>
    </div>
  )
}