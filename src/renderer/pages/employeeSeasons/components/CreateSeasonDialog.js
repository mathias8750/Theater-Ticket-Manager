import React from "react";
import {Typography, Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';

const CreateSeasonDialog = ({
                              open,
                              onClose,
                              seasonNameRef,
                              startDate,
                              setSeasonStartDate,
                              endDate,
                              setSeasonEndDate,
                              onSeasonCreate
                            }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        justifyContent: 'center',
      }}
    >
      <DialogTitle style={{paddingLeft: '30%'}}>Create Season</DialogTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '2%',
          paddingBottom: '4%',
        }}>
        <TextField
          id='newSeasonNameTextField'
          label='Season Name'
          inputRef={seasonNameRef}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '17%',
          paddingBottom: '4%',
        }}>
        <Typography>Season Start Date
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              value={startDate}
              onChange={(newValue) => {
                setSeasonStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '17%',
          paddingBottom: '4%',
        }}>
        <Typography>Season End Date
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              value={endDate}
              onChange={(newValue) => {
                setSeasonEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '2%',
          paddingBottom: '4%',
        }}>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={onSeasonCreate}
        >
          Create Season
        </Button>
      </div>
    </Dialog>
  )
}

export default CreateSeasonDialog;
