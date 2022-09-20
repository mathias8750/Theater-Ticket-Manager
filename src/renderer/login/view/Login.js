import '../css/Login.css'
import {Card, CardContent, Grid} from "@mui/material";
import {useState} from "react";
import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
  'https://szqedkllaitqpzsbbmcs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6cWVka2xsYWl0cXB6c2JibWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE1NDUwODYsImV4cCI6MTk3NzEyMTA4Nn0.1M2TsD1QrqN4Dnk5JauSkrpO408JcrU1dDJcniaIcPA'
)

// print data from Venues table to console
async function getVenue() {
  let{data, error} = await supabase.from('Venues').select('*');
  console.log(data);
}
getVenue();

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
