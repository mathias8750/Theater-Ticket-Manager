import {Grid, TextField, Typography} from "@mui/material";
import OrganizationListItem from "./OrganizationListItem";

// List of org items displayed on the org select screen
const OrganizationScrollableList = ({ orgs, onOrgClick }) => {



  return (
    <>
      <div style={{height: '100%', width: '70%'}}>
        <div style={{height: '5%', paddingLeft: '5px'}}>
        <Typography variant="h6" align="center" style={{padding: '2%'}}>Select an Organization</Typography>
        </div>
        <div style={{height: '100%', paddingTop: '5%'}}>
        <Grid item style={{
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '100%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {orgs.map((org) => {
                return (
                  <OrganizationListItem org={org} onOrgClick={onOrgClick}/>
                )
              })}
            </div>
          </div>
        </Grid>
        </div>
      </div>
    </>
  )
}

export default OrganizationScrollableList;
