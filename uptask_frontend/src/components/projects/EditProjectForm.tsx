import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { Project, ProjectFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updateProject } from "@/api/ProjectApi"
type EditProjectFormProps = {
    data: ProjectFormData
    idProject: Project['_id']
}

export default function EditProjectForm({data, idProject}: EditProjectFormProps) {

    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:{
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) =>{
            toast.error(error.message)
        }, 
        onSuccess: (data) =>{
            //hace un refresh, para tener un estado actualizado con tu servidor
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject', idProject]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            idProject
        }
      mutate(data)  
    }

    return (
    <>  
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-black">Editar Proyecto</h1>
            <p className="text-base font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>
            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-6 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                    to='/'
                >Volver a Proyectos</Link>
            </nav>
            <form
                className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate //saca las validaciones de html5
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />
                <input 
                    type="submit" 
                    value="Guardar Cambios"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                />
            </form>
        </div>
    </>
  )
}
