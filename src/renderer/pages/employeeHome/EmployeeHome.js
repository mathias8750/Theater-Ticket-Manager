import {Typography} from "@mui/material";


const EmployeeHome = ({}) => {

  return (
    <>

      <Typography>This is the Employee Home Page</Typography>

      <NavLink to={""}>
        <Button>
          Events
        </Button>
      </NavLink>

      <NavLink to={""}>
        <Button>
          Seasons
        </Button>
      </NavLink>

      <NavLink to={""}>
        <Button>
          Organizations
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeHome;
