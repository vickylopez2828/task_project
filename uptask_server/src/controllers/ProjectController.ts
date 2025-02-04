import type { Request, Response } from "express";
import Project from "../models/Project";
export class ProjectController {
    //metodos static no se deben instanciar
    static postProjects = async(req:Request, res:Response) =>{
        const project = new Project(req.body)
        try {
            await project.save()
            res.send("Proyecto creado correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects = async(req:Request, res:Response) =>{
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }
    static getProjectById = async(req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const project = await Project.findById(id).populate('tasks')
            if(!project){
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error: error.message})
                return
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async(req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const project = await Project.findById(id)
            if(!project){
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error: error.message})
                return
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.send('Proyecto actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async(req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const project = await Project.findById(id)
            if(!project){
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error: error.message})
                return
            }
            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}