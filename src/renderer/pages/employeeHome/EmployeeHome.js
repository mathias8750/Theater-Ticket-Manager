import {Typography, Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';

const EmployeeHome = ({}) => {


  let navigate = useNavigate();

  return (
    <>

      <Typography variant="h3" color="primary">
          Employee Home
      </Typography>

      
      <Button variant="text" onClick={() => navigate("/employee/home/events")}>
         Create/Manage Events
      </Button>
      

      <Button variant="text" onClick={() => navigate("/employee/home/seasons")}>
         Create/Manage Seasons
      </Button>
    

      <Button variant="text" onClick={() => navigate("/employee/home/organizations")}>
         Create/Manage Organizations
      </Button>

      <Button>
        Help
      </Button>
    </>
  )
}

export default EmployeeHome;
