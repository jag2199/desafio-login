import mongoose from "mongoose"

const productosSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})
export default productosSchema