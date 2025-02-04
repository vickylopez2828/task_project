import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";

const router = Router()
//ejecuta validaciones para ciertos parametrso
//todas las rutas q usen ese parametros se ejecuta ante este middleware
router.param('projectId', validateProjectExists)

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.postProjects)

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.get('/', ProjectController.getAllProjects)

router.put('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject)

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject)

//Routes tasks
//middleware q se ejecuta cuando ese parametro esta presente
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId/tasks', 
    param('projectId').isMongoId().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    
    TaskController.postTask)

router.get('/:projectId/tasks', 
    param('projectId').isMongoId().withMessage('ID no valido'),
    TaskController.getProjectTask)

router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    validateProjectExists,
    taskExists,
    TaskController.getTaskById)

router.put('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    validateProjectExists,
    taskExists,
    TaskController.updateTask)

router.post('/:projectId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('status')
        .notEmpty().withMessage('El Estado es obligatorio'),
    handleInputErrors,
    taskExists,
    TaskController.updateStatus)

router.delete('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    validateProjectExists,
    taskExists,
    TaskController.deleteTask)

export default router