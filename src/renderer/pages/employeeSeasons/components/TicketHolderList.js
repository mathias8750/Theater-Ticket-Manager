import TicketHolder from "./TicketHolder";
import { Typography, Grid } from "@mui/material";


const TicketHolderList = ({ticketHolders, onTicketHolderClick}) => {


    return (
      <>
        <Grid container direction={'column'} style={{height: '100%'}}>      
        <Grid item style={{
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '100%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {ticketHolders.map((ticketHolder) => {
                return (
                  <TicketHolder ticketHolder={ticketHolder} onTicketHolderClick={onTicketHolderClick} />
                )
              })}
            </div>
          </div>
        </Grid>
        </Grid>
      </>
    )
}

export default TicketHolderList;