import {Grid, TextField, Button} from "@mui/material";
import SidebarEventFromOrgItem from "../../../components/SidebarEventFromOrgItem";
import { OrganizationContext } from "renderer/context/Context";
import { useContext } from "react";

const ScrollableSidebar = ({ events, onEventClick, onAddClick }) => {

  const {state} = useContext(OrganizationContext);

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
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '75%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {events.map((event) => {
                if (state.selectedOrg.organizationID == event.organizationID)
                return (
                  <SidebarEventFromOrgItem event={event} onEventClick={onEventClick}/>
                )
              })}
            </div>
          </div>

        </Grid>
        <Grid item style={{height: '10%'}}>
          <Button
            color='primary'
            size='large'
            onClick={onAddClick}
            >
              Add Event
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
