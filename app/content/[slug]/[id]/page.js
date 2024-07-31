export default function Page({params}){
  console.log(params)
  return (
    <div>
      Slug: {params.slug} id {params.id}
    </div>
  )
}