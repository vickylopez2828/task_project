import api from "@/lib/axios";
import { dashboardProjectSchema, Project, ProjectFormData} from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData){
    try {
        const { data } = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllProjects(){
    try {
        const { data } = await api('/projects')
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id: Project['_id']){
    try {
        const { data } = await api(`/projects/${id}`)
        // const response = projectSchema.safeParse(data)
        // if(response.success){
        //     return response.data
        // }
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData
    idProject: Project['_id']
}

export async function updateProject({formData, idProject}: ProjectAPIType){
    try {
        const { data } = await api.put<string>(`/projects/${idProject}`, formData)
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(idProject:Project['_id']){
    try {
        const { data } = await api.delete<string>(`/projects/${idProject}`)
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}