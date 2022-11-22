import {Grid, TextField} from "@mui/material";
import SidebarEventFromOrgItem from "../../../components/SidebarEventFromOrgItem";
import { OrganizationContext } from "renderer/context/Context";
import { useContext } from "react";

const ScrollableSidebar = ({ events, onEventClick }) => {

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
          height: '90%',
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
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
