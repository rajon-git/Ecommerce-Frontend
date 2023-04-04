
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Menu from './components/nav/Menu';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './components/routes/PrivateRoute';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRoute from './components/routes/AdminRoute';
import AdminCategory from './pages/admin/Category';
import AdminProduct from './pages/admin/Product';


const App=()=> {
  return (
    <BrowserRouter>
      <Menu/>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="" element={<Dashboard/>}></Route>
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/category" element={<AdminCategory/>}/>
          <Route path="admin/product" element={<AdminProduct/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
