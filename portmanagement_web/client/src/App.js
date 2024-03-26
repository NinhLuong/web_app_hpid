import React from 'react';
import "./App.scss";
import NavBar from "./components/NavBar";
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import UserManagement from "./pages/user/UserManagement/UserManagement";
import RightAssignment from "./pages/user/RightAssignment/RightAssignment";
import LayoutManagement from "./pages/port/LayoutManagement/LayoutManagement";
import PortAssignment from "./pages/port/PortAssignment/PortAssignment";
import PortScheduler from "./pages/port/PortScheduler/PortScheduler";
import Administrator from "./pages/admin/Administrator/Administrator";
import AuditLog from "./pages/admin/AuditLog";
import DeviceDetection from "./pages/admin/DeviceDetection";
import Report from "./pages/admin/Report";
// import ChangePassword from "./pages/account/ChangePassword";
import Login from "./pages/Login";
import CreateAdministrator from "./pages/admin/Administrator/CreateAdministrator";

import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user-management' element={<UserManagement />} />
          <Route path='/right-assignment' element={<RightAssignment />} />
          <Route path='/layout-management' element={<LayoutManagement />} />
          <Route path='/port-assignment' element={<PortAssignment />} />
          <Route path='/port-scheduler' element={<PortScheduler />} />
          <Route path='/administrator' element={<Administrator />} />
          <Route path='/audit-log' element={<AuditLog />} />
          <Route path='/device-detection' element={<DeviceDetection />} />
          <Route path='/report' element={<Report />} />
          {/* <Route path='/change-password' element={<ChangePassword />} /> */}
          <Route path='/login' element={<Login setToken={setToken} />} />

          <Route path='/create-administrator' element={<CreateAdministrator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
