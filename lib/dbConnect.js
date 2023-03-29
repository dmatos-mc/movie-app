import mongoose from 'mongoose'

//const URI_MONGO = process.env.URI_MONGO;
const URI_MONGO = 'mongodb://127.0.0.1:27017/NextJS'

const conectarDB = async() => {
    try {
        await mongoose.connect(URI_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
         //   bufferMaxEntries: 0,
         //   useFindAndModify: false,
         //   useCreateIndex: true
        })
        console.log('MongoDB conectado')
    } catch (error) {
        console.log(error)
        process.exit(1)  //Para cerrar la aplicacion en caso de error
    }
}

export default conectarDB;