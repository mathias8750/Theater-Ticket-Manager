import {Typography, Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import EmployeeHeader from "../../components/EmployeeHeader"; 


const EmployeeHome = ({}) => {


  let navigate = useNavigate();

  return (
    <>
      <EmployeeHeader/>
      <Typography
          variant="h3"
          color="primary"
          style={{marginTop: -625}}>
          Employee Home
      </Typography>
      <Button variant="text"
              onClick={() => navigate("/employee/home/events")}
              style={{fontSize: 20, marginLeft: 0, marginRight: 0, marginTop: -40}}>
         Create/Manage Events
      </Button>


      <Button variant="text"
              onClick={() => navigate("/employee/home/seasons")}
              style={{fontSize: 20, marginLeft: -285, marginRight: 0, marginTop: 100}}>
         Create/Manage Seasons
      </Button>


      <Button variant="text"
              onClick={() => navigate("/employee/home/organizations")}
              style={{fontSize: 20, marginLeft: -303, marginRight: 0, marginTop: 240}}>
         Create/Manage Organizations
      </Button>
    </>
  )
}

export default EmployeeHome;
