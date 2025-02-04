import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";
import { ITask } from "../models/Task";
declare global{
    namespace Express{
        interface Request{
            project: IProject
        }
    }
}

export async function validateProjectExists(req:Request, res: Response, next: NextFunction) {
    try {
        const {projectId} = req.params
        
        const project = await Project.findById(projectId)
        if(!project){
            const error = new Error("Proyecto no encontrado")
            res.status(404).json({error: error.message})
            return
        }
        req.project = project
        next()
    } catch (error) {
        console.log(error)
    }
}

