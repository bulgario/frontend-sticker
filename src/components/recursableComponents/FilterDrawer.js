import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";



const useStyles =  makeStyles(theme =>({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    marginTop: theme.spacing(1),
    maxWidth:240,
    marginRight: theme.spacing(0.7),
    marginLeft: theme.spacing(0.7),
  },
  itemLabel: {
      width:300
  },
  mainLabel: {
      margin: theme.spacing(1),
  },
  button: {
    color:'white',
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginBottom:theme.spacing(2)

  }
}));

function ResponsiveNavbar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const filters = { 

    "Categoria" : [{id:1,name:"Tecido liso"},{id:2,name:"Tecido estampa"},{id:3,name:"Seda"},{id:4,name:"Couro"}],
    "Subcategoria" : [{id:1,name:"Tecido liso"},{id:2,name:"Tecido estampa"},{id:3,name:"Seda"},{id:4,name:"Couro"}],
    "Estampa" : [{id:1,name:"Tecido liso"},{id:2,name:"Tecido estampa"},{id:3,name:"Seda"},{id:4,name:"Couro"}]

  }
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
      const filterParams = Object.keys(props.filters)
      return filterParams.map(filterParam => {

          return (        <ExpansionPanel className={classes.root}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
        <Typography
          align="justify"
          gutterBottom
          variant="h6"
          component="h5"
        //   className={classes.login}
        >
          {filterParam}
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <List >
      {props.filters[filterParam].map(item => {
        const labelId = `checkbox-list-secondary-label-${item}`;
        return (
            <Grid container item direction="row" justify="space-between" alignItems="flex-start">

          <ListItem key={item} button onClick={handleToggle(item)}>
          {/* <Grid container item direction="row" justify="space-between" alignItems="flex-start"  > */}
            <ListItemText id={labelId} secondary={item} className={classes.itemLabel} />
            <ListItem >
              <Checkbox
                edge="start"
                onChange={handleToggle(item)}
                checked={checked.indexOf(item) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
                color="primary"
              />
            </ListItem>
            {/* </Grid> */}
          </ListItem>
          </Grid>

        );
      })}
    </List>
    </ExpansionPanelDetails>
    </ExpansionPanel>)
      })

  }
  const renderUserInfo = () => {
    return (
      <Grid container direction="column" >
        <Typography
        onPress={props.openMenu}
        //   align="start"
          gutterBottom
          variant="h5"
          component="h4"
          className={classes.mainLabel}
        >
          Filtre por
        </Typography>
        <Divider></Divider>

            {renderFilterLists()}

            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={props.openMenu}
          >
            Filtrar
          </Button>

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
        className={props.open? classes.open: classes.close}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
}
export default withRouter(ResponsiveNavbar);

