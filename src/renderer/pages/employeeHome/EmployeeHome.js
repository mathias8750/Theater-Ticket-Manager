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
              style={{fontSize: 20, marginLeft: 0, marginRight: 0, marginTop: 0}}>
         Create/Manage Events
      </Button>
      

      <Button variant="text" 
              onClick={() => navigate("/employee/home/seasons")}
              style={{fontSize: 20, marginLeft: -205, marginRight: 0, marginTop: 200}}>
         Create/Manage Seasons
      </Button>
    

      <Button variant="text" 
              onClick={() => navigate("/employee/home/organizations")}
              style={{fontSize: 20, marginLeft: -216, marginRight: 0, marginTop: 400}}>
         Create/Manage Organizations
      </Button>

      <Button style={{marginLeft: 350, marginRight: 50, marginTop: 120}}>
        Help
      </Button>
    </>
  )
}

export default EmployeeHome;
