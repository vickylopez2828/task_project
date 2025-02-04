import { request, type Request, type Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";

export class TaskController {
    //metodos static no se deben instanciar
    static postTask = async(req:Request, res:Response) =>{
        
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            //codifo q se ejecuta si todos los promises se cumplen
            await Promise.allSettled([task.save(), req.project.save()]) 
            res.send("Tarea creada correctamente")
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getProjectTask = async(req:Request, res:Response) =>{
        
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json({data: tasks})
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getTaskById = async(req:Request, res:Response) =>{
        
        try {
            res.json(req.task)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateTask = async(req:Request, res:Response) =>{
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea actualizada')
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static deleteTask = async(req:Request, res:Response) =>{
        try {
            req.project.tasks = req.project.tasks.filter( task => task.toString() != req.task.id.toString())
            await Promise.allSettled([ req.task.deleteOne(), req.project.save()])
            res.send('Tarea eliminada')
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateStatus = async(req:Request, res:Response) =>{
        try {
            
            const {status} = req.body
            req.task.status = status
            await req.task.save()
            res.send('Estado de la tarea actualizado correctamente')
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

}