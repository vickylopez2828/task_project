import { getTaskById } from "@/api/TaskApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"


export default function EditTaskData() {
    const params = useParams()
    const idProject = params.idProject!
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!


    // {!!}convierte un valor a tru si tiene algo o false si no lo tiene
    const { data, isError } = useQuery({
        queryKey:['task', taskId],
        queryFn: () => getTaskById({idProject, taskId}),
        enabled: !!taskId, //si es false la consulta no se hace
        retry:false
    })
    if(isError) return <Navigate to={'/404'}/>

    if(data) return <EditTaskModal data={data} taskId={taskId}/>
}
