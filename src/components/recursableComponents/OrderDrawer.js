import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IconButton } from "@material-ui/core";




const useStyles =  makeStyles(theme =>({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
width:250
  },
  itemLabel: {
      width:300
  },
  mainLabel: {
      margin: theme.spacing(1),
  },
  button: {
      color:"white",
      marginTop: theme.spacing(2),
    //   marginRight: theme.spacing(5),
    //   marginLeft: theme.spacing(5),
      marginBottom:theme.spacing(2),
      width: 200,

  }
}));

function OrderDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const changeOrder = () =>  {
    return  props.setOrderBy(!props.orderAsc,props.orderBy)
  }
  const handleToggle = (value) => () => {
    return  props.setOrderBy(props.orderAsc,value)
  };
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
    // props.openMenu()
  };

  const renderFilterLists = () => { 
          return (     
 
     
        <List >
      {[{id:4,name:"Cor",value: 'desc_cor_produto'},{id:1,name:"Preço",value: 'preco_varejo'},{id:2,name:"Entrega ajustada",value:'entrega_ajustada'}].map(item => {
        const labelId = `checkbox-list-secondary-label-${item.value}`;
        return (
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" key={item.id}>

          <ListItem key={item.value} button onClick={handleToggle(item.value)}>
          {/* <Grid container item direction="row" justify="space-between" alignItems="flex-start"  > */}
            <ListItemText id={labelId} secondary={item.name} className={classes.itemLabel} />
            <ListItem >
              <Checkbox
                edge="start"
                onChange={handleToggle(item.value)}
                checked={props.orderBy === item.value}
                inputProps={{ 'aria-labelledby': labelId }}
                color="primary"
              />
            </ListItem>
            {/* </Grid> */}
          </ListItem>
          </Grid>

        );
      })}
    </List>)
  

  }
  const renderUserInfo = () => {
    return (
      <Grid container direction="column" >
          <Grid container item direction="row" alignItems="center">
          <Typography
        onPress={props.openMenu}
        //   align="start"
          gutterBottom
          variant="h5"
          component="h4"
          className={classes.mainLabel}
        >
          Ordenação
        </Typography>
        <IconButton onClick={changeOrder}>
            {props.orderAsc?<ExpandLessIcon></ExpandLessIcon>:<ExpandMoreIcon></ExpandMoreIcon>}
            </IconButton>
          </Grid>

        <Divider></Divider>

            {renderFilterLists()}
        <Grid container item direction="column"  alignItems="center">
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={props.openMenu}
          >
            ORDENAR
          </Button>
        </Grid>


      </Grid>

    );
  };


  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, true)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <br />

      {renderUserInfo()}

      <Divider></Divider>
      <br />

      {/* <ListIcon
        icons={menuIcons.filter(icon => icon.show)}
        onClick={handleClick}
        showText={props.open}
        showSelected
        initialIndexSelect={getIndexInitialSelectedMenu(menuIcons)}
      /> */}
    </div>
  );


  return (
    <div>

      <SwipeableDrawer
      disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={props.open}
        onClose={props.openMenu}
        onOpen={toggleDrawer("left", true)}
        className={classes.root}
        anchor="right"
      >
        {sideList("right")}
      </SwipeableDrawer>
    </div>
  );
}
export default withRouter(OrderDrawer);

