import {Grid, TextField} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";


const ScrollableSidebar = ({ events, onEventClick }) => {



  return (
    <>
      <Grid container direction={'column'} style={{height: '100%'}}>
        <Grid item style={{height: '10%'}}>
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>

        <Grid item style={{
          height: '90%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {events.map((event) => {
                return (
                  <SidebarEventItem event={event} onEventClick={onEventClick}/>
                )
              })}
            </div>
          </div>

        </Grid>
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
