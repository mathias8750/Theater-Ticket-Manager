import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useLocation} from "react-router-dom";

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {

  const location = useLocation();


  // SUMS THE PRICES
  const sumPrices = (seats) => {
    let sum = 0;

    seats.map((seat) => {
      sum += seat.priceValue
    })

    return sum
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {location.state.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`${product.sectionNumber} Row ${product.rowNumber} Seat ${product.seatNumber}`}/>
            <Typography variant="body2">${product.priceValue}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${sumPrices(location.state).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
