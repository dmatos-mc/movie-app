import Form from "@/components/Form"
import { useRouter } from "next/router"
import useSWR from 'swr'

const fetcher = url => (
  fetch(url)
        .then(res => res.json())
        .then(json => json.data)
)



 const EditMovie = () => {

  const router = useRouter()
  const {id} = router.query
  
  const {data: movie, error} = useSWR(id ? `/api/movie/${id}` : null,fetcher)

  if(error){
    return <div>Error</div>
  }

  if(!movie){
    return(
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    )
  }

  const formData = {
    tittle: movie.tittle,
    plot: movie.plot
  }

   return (
     <div className="container">
       <h1>Editar Película</h1>
       <Form
       forNewMovie = {false}
       formData = {formData}
       ></Form>
     </div>
   )
 }

 export default EditMovie
 