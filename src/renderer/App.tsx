import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeHome from "./pages/employeeHome/EmployeeHome";
import OrganizationSelect from "./pages/organizationSelect/OrganizationSelect";
import EmployeeLogin from "./pages/employeeLogin/EmployeeLogin";
import CustomerEvents from "./pages/customerEvents/CustomerEvents";
import CustomerHome from "./pages/customerHome/CustomerHome";
import EmployeeEvents from "./pages/employeeEvents/EmployeeEvents";
import EmployeeSeasons from "./pages/employeeSeasons/EmployeeSeasons";
import EmployeeOrganizations from "./pages/employeeOrganizations/EmployeeOrganizations";
import AdminPage from './pages/adminPage/AdminPage';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { OrganizationProvider } from './context/Context';
import TicketSelector from "./pages/ticketCheckoutSystem/TicketSelector";
import TicketCheckout from "./pages/ticketCheckoutSystem/TicketCheckout";
import SeatSelector from './pages/employeeSeasons/SeatSelector';
import TicketHolderFinalization from './pages/employeeSeasons/TicketHolderFinalization';


const queryClient = new QueryClient()

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
        <OrganizationProvider>
            <Routes>
              <Route path="/" element={<CustomerHome/>} />
              <Route path={"/customer/events"} element={<CustomerEvents/>} />
              <Route path={"/employee/login"} element={<EmployeeLogin/>} />
              <Route path={"/employee/login/admin"} element={<AdminPage/>}/>
              <Route path={"/employee/login/select"} element={<OrganizationSelect/>}/>
              <Route path={"/employee/home"} element={<EmployeeHome/>}/>
              <Route path={"/employee/home/events"} element={<EmployeeEvents/>}/>
              <Route path={"/employee/home/seasons"} element={<EmployeeSeasons/>}/>
              <Route path={"/employee/home/organizations"} element={<EmployeeOrganizations/>}/>
              <Route path={"/customer/events/seat-viewer"} element={<TicketSelector/>}/>
              <Route path={"/customer/events/checkout"} element={<TicketCheckout/>}/>
              <Route path={"/employee/home/seasons/seat-selector"} element={<SeatSelector/>}/>
              <Route path={"/employee/home/seasons/seat-selector/finalize"} element={<TicketHolderFinalization/>}/>
            </Routes>
          </OrganizationProvider>
        </Router>
      </QueryClientProvider>
  );
}
