import '../css/Login.css'
import {Card, CardContent, Grid} from "@mui/material";
import {useState} from "react";
import supabase from '../../Supabase.js';

// print data from Venues table to console
async function getVenue() {
  let{data, error} = await supabase.from('Venues').select('*');
  console.log('Venues:');
  data.forEach(function (item, index){
    console.log('Venue ID:  ' + item.venueID + '    Venue Name:  ' + item.venueName + '    Venue Capacity:  ' + item.venueCapacity);
  });
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
