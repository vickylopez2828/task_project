import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectApi";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData ={
        projectName: "",
        clientName: "",
        description: ""
    }
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialValues})
    
    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) =>{
            toast.error(error.message)
        }, 
        onSuccess: (data) =>{
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => mutate(formData)

    return (
    <>  
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-black">Crear Proyecto</h1>
            <p className="text-base font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>
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
                    value="Crear Proyecto"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                />
            </form>
        </div>
    </>
  )
}
