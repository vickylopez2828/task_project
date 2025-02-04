import mongoose from "mongoose";
import colors from 'colors'
import {exit} from 'node:process'

export const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar MongoDB'))
        exit(1)
    }
}