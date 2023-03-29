import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Link from "next/link";
import { useRouter } from "next/router";

const MoviePage = ({success, error, movie}) => {
    
      const router = useRouter()

    if(!success){
      return(
        <div className="container text-center my-5">

        <h1>{error}</h1>
        
        <Link href="/" className="btn btn-success">
            Volver...
        </Link>
        </div>
        
      )
    }

    const deleteData = async(id) => {
      try {
        await fetch(`/api/movie/${id}`, {
          method: 'DELETE'
        })
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="container">
      <h1>Detalle de Peliculas</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.tittle}</h5>
          </div>
          <p className="fw-light">{movie.plot}</p>
          <Link href="/" className="btn btn-success btn-sm me-2">
            Volver...
        </Link>

        <Link href={`${movie._id}/edit`} className="btn btn-warning btn-sm me-2">
          Editar
        </Link>

        <button className="btn btn-danger btn-sm" onClick={() => deleteData(movie._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default MoviePage

export async function getServerSideProps({params}){     //params va a coger el valor del id de la carpeta [id]
    try {
      await conectarDB()
  
      const movie = await Movie.findById(params.id);  //Next recomienda usar el lean()
      
      if(!movie){
        return {props: {success: false, error: 'Pelicula no encontrada'}};
      }

      
      movie._id = `${movie._id}`
      console.log(movie._id)

      //return movie;

     // return {props: {movies}}

     // mov.JSON.parse(JSON.stringify(movie));
  
      return { props: { success: true, movie: JSON.parse(JSON.stringify(movie)) }}
      //return {props: {movie}};
    } catch (error) {
      console.log(error)
      if(error.kind==='ObjectId'){
        return {props: {success: false, error: 'id no valido'}};
      }
      return {props: {success: false, error: 'Error de Servidor'}};
      
    }
  }
  
