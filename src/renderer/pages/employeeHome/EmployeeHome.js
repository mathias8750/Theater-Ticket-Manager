import {Typography, Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';

const EmployeeHome = ({}) => {


  let navigate = useNavigate();

  return (
    <>

      <Typography variant="h3" color="primary">
          Employee Home
      </Typography>

      
      <Button variant="text" 
              onClick={() => navigate("/employee/home/events")} 
              style={{marginLeft: 50, marginRight: 50, marginTop: 20}}>
         Create/Manage Events
      </Button>
      

      <Button variant="text" 
              onClick={() => navigate("/employee/home/seasons")}
              style={{marginLeft: 50, marginRight: 50, marginTop: 50}}>
         Create/Manage Seasons
      </Button>
    

      <Button variant="text" 
              onClick={() => navigate("/employee/home/organizations")}
              style={{marginLeft: 50, marginRight: 50, marginTop: 80}}>
         Create/Manage Organizations
      </Button>

      <Button style={{marginLeft: 350, marginRight: 50, marginTop: 120}}>
        Help
      </Button>
    </>
  )
}

export default EmployeeHome;
