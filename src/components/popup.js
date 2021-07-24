import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  time: {
    fontSize: 32
  },
  copyText: {
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#efefef"
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#cccccc",
      }
  }
}));

const timerProps = {
  isPlaying: true,
  size: 160,
  strokeWidth: 12
};

export default function Popup(props) {
  const classes = useStyles();
    
  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <b>{'\u26A0'} Click on the amount and the address to copy them! </b>
        </DialogContentText>
    </DialogContent>
    <DialogContent align="center">
        <CountdownCircleTimer
            {...timerProps}
            isPlaying
            duration={props.deadline}
            colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
            ]}
        >
            {({ remainingTime }) => (
                <div>
                    <Typography color="primary">Remaining</Typography>
                    <Typography className={classes.time}>{remainingTime}</Typography>
                    <Typography color="primary">seconds</Typography>
                </div>)}
        </CountdownCircleTimer>
    </DialogContent>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Send exactly 
        <b
            onClick={() => {navigator.clipboard.writeText(props.erg / 1000000000)}}
            className={classes.copyText}
        > {props.erg / 1000000000} </b>
        ERG to 
        <b
            onClick={() => {navigator.clipboard.writeText(props.address)}}
            className={classes.copyText}
        > {(props.address.length > 56) ? `${props.address.substring(0, 28)}...${props.address.substring(props.address.length-28)}` : props.address}</b>;
        the operation will be done automatically afterward.
        </DialogContentText>
    </DialogContent>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Your funds will be sent back to you in case of any failure. Smart contracts are being used to prevent the intermediate service from cheating!
        </DialogContentText>
    </DialogContent>
    </Dialog>
  );
}
