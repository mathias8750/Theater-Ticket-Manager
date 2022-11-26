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


const TicketSelectorSidebar = ({event, selectedSeats}) => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const onPriceEditClick = () => {
    toggleDialog();
  }

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  }

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
