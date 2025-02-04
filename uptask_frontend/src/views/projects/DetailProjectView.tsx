import { getProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";


export default function DetailProjectView() {
    const navigate = useNavigate()
    const params = useParams()
    const idProject = params.idProject!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', idProject],
        queryFn: () => getProjectById(idProject),
        retry:false
      });
      
    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to='/404' />
    if (data) return (
      <>
        <h1 className="text-3xl font-black">{data.projectName}</h1>
        <p className="text-lg font-light text-gray-500 mt-4">
          {data.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 cursor-pointer px-6 py-2 text-white font-bold transition-colors"
            onClick={() => navigate('?newTask=true')}
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList
          tasks={data.tasks}
        />
        <AddTaskModal/>
        <EditTaskData/>
        <TaskModalDetails/>
      </>
    );
}
