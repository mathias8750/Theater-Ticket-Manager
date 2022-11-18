import {Grid, TextField, Typography} from "@mui/material";
import SidebarUserItem from "./SidebarUserItem";


const AdminSidebar = ({ users, onUserClick }) => {



  return (
    <>
      <div style={{height: '100%', width: '70%'}}>
        <div style={{height: '100%'}}>
        <Grid item style={{
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '100%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {users.map((user) => {
                return (
                  <SidebarUserItem user={user} onUserClick={onUserClick}/>
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

export default AdminSidebar;
