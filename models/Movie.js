import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    plot:{
        type: String,
        required: [true, "por favor ingrese el titulo amigoooooooo"]
    },
    tittle:{
        type: String,
        required: [true, "por favor ingrese el plot amigoooooooo"]
    },
})

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)
//mongoose.models.Movie ||