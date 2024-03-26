import logo from './logo.svg';
import './pages/Common.scss'
import LoginComp from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableComp from './pages/Table';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={LoginComp}/>
      <Route path="/table" Component={TableComp}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
