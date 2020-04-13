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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Button from "@material-ui/core/Button";

import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  list: {
    width: 280
  },
  fullList: {
    width: "auto"
  },
  root: {
    marginTop: theme.spacing(1),
    maxWidth: 270
    // marginRight: theme.spacing(0.7),
    // marginLeft: theme.spacing(0.7),
  },
  itemLabel: {
    width: 115,
    marginRight: theme.spacing(3)
  },
  mainLabel: {
    margin: theme.spacing(1)
  },
  button: {
    color: "white",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  selectAll: {
    marginRight: theme.spacing(2)
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

  const handleAllFilters = filterParam => async () => {
    await props.chooseFilterSelected(filterParam);

    props.unmarkAllFilters(filterParam);
  };
  const handleToggle = (value, index, filterParam) => () => {
    console.log(props.filters, filterParam)
    const newChecked = [...props.filters[filterParam]];
    value.checked = !value.checked;
    newChecked.splice(index, value);
    if (!value.checked) {
      //Dando uncheck na marra na categoria do filtro
      props.chooseFilterSelected(filterParam, true);
    }
    props.refreshFilter({ ...props.filters, [filterParam]: newChecked });
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
    const filterParams = Object.keys(props.filters);
    return filterParams.map(filterParam => {
      return (
        <ExpansionPanel className={classes.root}>
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
            <Grid container direction="column">
              <Grid container item direction="row" alignItems="center">
                <Typography    align="justify"
              
              component="h5" className={classes.selectAll} >Selecionar Todos</Typography>
                <Checkbox
                  edge="start"
                  onChange={handleAllFilters(filterParam)}
                  checked={
                    props.filterSelected[filterParam]
                  }
                  inputProps={{ "aria-labelledby": "a" }}
                  color="primary"
                />
              </Grid>
              <List>
                {props.filters[filterParam].map((item, index) => {
                  const labelId = `checkbox-list-secondary-label-${item}`;
                  return (
                    <Grid
                      container
                      item
                      direction="row"
                      justify="space-between"
                    >
                      {item.name ? (
                        <ListItem
                          key={item.name}
                          button
                          onClick={handleToggle(item, index, filterParam)}
                        >
                          {/* <Grid container item direction="row" justify="space-between" alignItems="flex-start"  > */}
                          <ListItemText
                            id={labelId}
                            secondary={item.name}
                            className={classes.itemLabel}
                          />
                          <ListItem>
                            <Checkbox
                              edge="start"
                              // onChange={handleToggle(item,index,filterParam)}
                              checked={item.checked}
                              inputProps={{ "aria-labelledby": labelId }}
                              color="primary"
                            />
                          </ListItem>
                          {/* </Grid> */}
                        </ListItem>
                      ) : null}
                    </Grid>
                  );
                })}
              </List>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };
  const renderUserInfo = () => {
    return (
      <Grid container direction="column">
        <Typography
          // onPress={props.openMenu}
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

        {/* <Button
          variant="contained"
          color="primary"
          className={classes.button}
          // onClick={props.openMenu}
        >
          Filtrar
        </Button> */}
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
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={props.open}
        onClose={props.openMenu}
        onOpen={toggleDrawer("left", true)}
        className={props.open ? classes.open : classes.close}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
}
export default withRouter(ResponsiveNavbar);
