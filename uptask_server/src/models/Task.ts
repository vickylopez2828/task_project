import mongoose, {Schema, Document, Types} from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus] 
//type de typescript
export interface ITask extends Document {
    name: string,
    description: string,
    project: Types.ObjectId,
    status: TaskStatus
}

//schema de moongose
const TaskSchema: Schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    project:{
        type:Types.ObjectId,
        ref: 'Project'
    },
    status:{
        type: String,
        enum: Object.values(taskStatus),
        default:taskStatus.PENDING
    }
}, {timestamps:true})

//modelo
const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task