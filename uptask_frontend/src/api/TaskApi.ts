import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, Task, TaskFormData, TaskSchema} from "../types"

type TaskAPI = {
    formData: TaskFormData
    idProject: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}


export async function createTask({formData, idProject}: Pick<TaskAPI, 'formData' | 'idProject'>){
    try {
        const url = `/projects/${idProject}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({idProject, taskId}: Pick<TaskAPI, 'idProject' | 'taskId'>){
    try {
        const url = `/projects/${idProject}/tasks/${taskId}`
        const { data } = await api(url)
        const response = TaskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateTask({idProject, taskId, formData}: Pick<TaskAPI, 'idProject' | 'taskId' | 'formData'>){
    try {
        const url = `/projects/${idProject}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
     
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({idProject, taskId}: Pick<TaskAPI, 'idProject' | 'taskId'>){
    try {
        const url = `/projects/${idProject}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({idProject, taskId, status}: Pick<TaskAPI, 'idProject' | 'taskId' | 'status'>){
    try {
        const url = `/projects/${idProject}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, {status})
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}