import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import SelectedSeatList from "../../../components/SelectedSeatList";
import EditPricesDialog from "./EditPricesDialog";
import { useState } from "react";
// List of imported libraries and components above

// Function to account for tickets that are selected from a specific venue
const TicketSelectorSidebar = ({event, selectedSeats}) => {

  // State with respective updater 
  const [dialogOpen, setDialogOpen] = useState(false);

  // Toggle the edit prices dialog function when the Edit Prices button is clicked
  const onPriceEditClick = () => {
    toggleDialog();
  }

  // Dialog toggle function
  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  }

  // Output to the screen, containing the Edit Prices button and the list of seats that have been selected,
  // with their respective details
  return (
    <Grid direction={'column'} container item style={{height: '100%', padding: '10px'}} md={4}>

      <Grid item style={{height: '95%'}}>
        <SelectedSeatList event={event} selectedSeats={selectedSeats}/>
      </Grid>

      <Grid item style={{ height: '5%', paddingTop: '5px'}}>
        <Button
          style={{width: '100%', height: '100%'}}
          variant={'contained'}
          disabled={selectedSeats.length === 0}
          onClick={onPriceEditClick}
        >
          Edit Prices
        </Button>
      </Grid>

      <EditPricesDialog open={dialogOpen} onClose={toggleDialog} selectedSeats={selectedSeats} />

    </Grid>
  )
}

export default TicketSelectorSidebar;
