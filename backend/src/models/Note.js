import mongoose from 'mongoose'

//1- create a schema
//2- create a model based off that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, //Created at and Updated at fields will be automatically added to the schema
)

const Note = mongoose.model('Note', noteSchema)

export default Note
