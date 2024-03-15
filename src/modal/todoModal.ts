import mongoose from "mongoose";

const Add = new mongoose.Schema({
    title: { type: "string", required: true }
    , image: { type: "string", required: true },
    release_date: { type: "string", required: true },
})


const todoModal = mongoose.model("Todos", Add);


export default todoModal