import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeHome from "./pages/employeeHome/EmployeeHome";
import OrganizationSelect from "./pages/organizationSelect/OrganizationSelect";
import EmployeeLogin from "./pages/employeeLogin/EmployeeLogin";
import CustomerEvents from "./pages/customerEvents/CustomerEvents";
import CustomerHome from "./pages/customerHome/CustomerHome";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<CustomerHome/>} />
          <Route path={"/customer/events"} element={<CustomerEvents/>} />
          <Route path={"/employee/login"} element={<EmployeeLogin/>} />
          <Route path={"/employee/login/select"} element={<OrganizationSelect/>}/>
          <Route path={"/employee/home"} element={<EmployeeHome/>}/>
        </Routes>
      </Router>
    </QueryClientProvider>


  );
}
