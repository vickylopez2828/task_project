import { getProjectById } from "@/api/ProjectApi"
import EditProjectForm from "@/components/projects/EditProjectForm"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"


export default function EditProjectView() {
    const params = useParams()
    const idProject = params.idProject!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', idProject],
        queryFn: () => getProjectById(idProject),
        enabled: !!idProject,
        retry:false //para q no intente varias hacer la consulta
      });
   
    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to='/404' />
    if (data) return <EditProjectForm data={data} idProject={idProject}/>
}
