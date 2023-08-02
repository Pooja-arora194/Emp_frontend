
import React from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Edit from "./pages/edit";
import Add from "./pages/add";
 
const App= ()=> {

 return (
   <div className="App">
    
     <BrowserRouter>
       <div className="App">
         <Routes>
           <Route exact path="/" element={<Dashboard />} />
           <Route exact path="/edit/:id" element={<Edit />} />
           <Route exact path="/add" element={<Add />} />
         </Routes>
       </div>
     </BrowserRouter>
   </div>
 )
}
export default App;
