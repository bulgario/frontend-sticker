import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(theme => ({

  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    maxWidth:300,
    // [theme.breakpoints.down("sm")]: {
    //   width: "90vw",
    //   // height: "90vh"
    // },
  },
  cover: {
    width: 111,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));

function MenuCard(props) {
  const classes = useStyles();

  return (
    <Box clone pt={2} pr={1} pb={1} pl={2}>
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
          {props.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.body}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button color="primary" onClick={() => props.history.push(props.redirectTo)}>
            Acessar
          </Button>

        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPouWj9ppI_nmi3-eGoKXPWU615nsHGJG6jW2hOFZ_cR-PfW8QQ&s"
        title="Live from space album cover"
      />
    </Card>
    </Box>
  );
}

export default withRouter(MenuCard);
