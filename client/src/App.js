import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Createdog from "./views/Form/Createdog";
import Landing from "./views/Landing/landing.jsx";
import Detail from "./views/Detail/Detail.jsx";
import Error404 from "./views/Error/Error404";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/create" element={<Createdog/>}/>
          <Route exact path="/dog/:id" element={<Detail/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
