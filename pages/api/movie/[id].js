import conectarDB from "@/lib/dbConnect"
import Movie from "@/models/Movie"

export default async function handler(req, res) {

  await conectarDB()

  //GET  api/movie/:id  (obtener un id y listarlo)
  //DELETE  api/movie/:id  (elimina un documento con id)
  //PUT  api/movie/:id  (modifica un elemento con id)


  const {method, query:{id}} = req     //este req tiene una query donde viene el id
  switch(method){
    case 'PUT':
      try {
        const movie = await Movie.findByIdAndUpdate(
            id,
            req.body,
            {
              new: true,                        //que va a enviar el documento actualizado
              runValidators: true               //si esta vacio de error
            }
        ) ;   
        if (!movie){
            return res.status(404).json({success: false})
        }

        return res.json({success: true, data: movie})
      } catch (error) {
        return res.status(404).json({success: false, error})
      }
    case 'DELETE':
      try {
        const movie = await Movie.findByIdAndDelete(id)   
        if (!movie){
            return res.status(404).json({success: false})
        }

        return res.json({success: true, data: movie})
      } catch (error) {
        return res.status(404).json({success: false})
      }
    case 'GET':
      try {
        const movie = await Movie.findById(id).lean()     //el .lean() es para alivianar la carga
        if (!movie){
            return res.status(404).json({success: false})
        }

        return res.json({success: true, data: movie})
      } catch (error) {
        return res.status(404).json({success: false})
      }
    default:
      return res.status(500).json({success: false, error: 'Falla de Servidor'});
  }
}
