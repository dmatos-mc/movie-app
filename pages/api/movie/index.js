import conectarDB from "@/lib/dbConnect"
import Movie from "@/models/Movie"

export default async function handler(req, res) {

  await conectarDB()

  //POST  api/movie
  const {method} = req
  switch(method){
    case 'POST':
      try {
        const movie = new Movie(req.body);
        console.log(movie)
        await movie.save()
        return res.json({success: true, movie});
      } catch (error) {
        return res.status(400).json({success: false, error: 'Falla de Servidor'});
      }
    default:
      return res.status(500).json({success: false, error: 'Falla de Servidor'});
  }
}
