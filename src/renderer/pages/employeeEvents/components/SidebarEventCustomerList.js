import {Button, Card, CardHeader, Typography, Grid} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";
import CustomerListItem from "./CustomerListItem";


const SidebarEventCustomerList = ({customers, onCustomerClick}) => {

  return (
    <>
        <Grid container direction={'column'} style={{height: '100%'}}>      
        <Grid item style={{
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '100%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {customers.map((ticket) => {
                return (
                  <CustomerListItem customer={ticket} onCustomerClick={onCustomerClick} />
                )
              })}
            </div>
          </div>
        </Grid>
        </Grid>
      </>
  )
}

export default SidebarEventCustomerList;