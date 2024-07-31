'use client'

import { useState, useEffect } from "react"
import { submitForm } from "./action"

async function getBlogs(){
  const response = await fetch('https://66a7b17053c13f22a3d0bc6a.mockapi.io/blogs/blogs')

  if (!response.ok){
    throw new Error('cannot fetch blog')
  }

  return response.json()
}

export default function Page(){
  const [blogState, setBlogState] = useState([])

  const initBlog = async () =>{
    try {
      const result = await getBlogs()
      setBlogState(result)
    } catch (error) {
      console.log('error',error)
    }
  }

  useEffect(()=> { //useEffect ไม่รองรับ fn async/await ต้องไปสร้างตัวเรียกแยกมาใส่ใน useEffect
    initBlog()
  },[])
  // ถ้าต้องการปิดการเรียกซ้ำของ useState ให้ไปที่ next.config.mjs แล้วไปใส่ค่า
  // reactStrictMode: false //ปิดการเรียกใช้ซ้ำในส่วน client ของ useState
  console.log(blogState)  

  return (
    <div>
      Test page 2
    {
      blogState.map((blog, index)=> (
        <div key={index}>
          {blog.id} {blog.name}
        </div>
      ))
    }      

    <form action={submitForm}>
      Email <input name="email" />
      <button>Submit</button>

    </form>
    </div>
  )
}