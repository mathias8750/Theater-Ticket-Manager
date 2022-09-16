import '../css/Login.css'
import {Card, CardContent, Grid} from "@mui/material";
import {useState} from "react";


const Login = ({}) => {

  const [toggle, setToggle] = useState(false)


  return (
    <div className={"login-view"}>
      <Grid container direction={'column'} spacing={1} className={"grid-container"}>

        <Grid item className={`grid-item-organization-table ${toggle ? 'toggled' : ''}`}>
          <Card className={'card-organization-table'}>
            <CardContent onClick={() => {
              setToggle(!toggle)
            }}>
              Text
            </CardContent>
          </Card>
        </Grid>

        <Grid item className={`grid-item-organization-add ${toggle ? 'toggled' : ''}`}>
          <Card className={'card-organization-add'}>
            <CardContent onClick={() => {
              setToggle(!toggle)
            }}>
              Text
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  )
}

export default Login
