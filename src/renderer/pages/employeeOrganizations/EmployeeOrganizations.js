import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader";

const EmployeeOrganizations = ({}) => {

    return (
        <>
          <EmployeeHeader>
            <Typography variant="h6" align="center" style={{padding: '10px'}}>Create / Manage Seasons</Typography>
          </EmployeeHeader>
        </>
      )
}

export default EmployeeOrganizations;
