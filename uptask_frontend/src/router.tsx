import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashBoardView from "@/views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import DetailProjectView from "./views/projects/DetailProjectView";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    element={<AppLayout/>}
                >
                    <Route path='/' element={<DashBoardView/>} index/>
                    <Route path='/projects/create' element={<CreateProjectView/>}/>
                    <Route path='/projects/:idProject/edit' element={<EditProjectView/>}/>
                    <Route path='/projects/:idProject' element={<DetailProjectView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}