export default function Page({params}){
  return (
    <div>
      {params.slug.map(p=>('param='+p+'  '))}
    </div>
  )
}