import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from "@material-ui/core/Grid";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    color:'white'
  },
});

class Filters extends React.Component {
  state = {
    left: false,
    right: false,
    selectedOptFilter: [],
    fields: [],
    filterOptions: [],

  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


  handleSelectedItem = async (field, item) => {
    const { filterOptions } = this.state

    // HANDLE CHECKED ITENS, IS USED ONLY TO MARK NOT FOR LOGIC OF ITENS
    if(item.checked === false) {
      item.checked = true
    } else {
      item.checked = false
    }

    const filters = { 
      field: field,
      label: item.label,
      checked: item.checked 
    }

    await this.setState({ filterOptions: [...filterOptions, filters]  })
  }

  handleSelectAll = (fieldName, items) => {
    items.map(fieldItem => {
      if(fieldItem.checked === false) {
        fieldItem.checked = true
      } else {
        fieldItem.checked = false
      }
    })
  }

  handleDispatch = async (filterOptions) => {
    let obj = {}

    Object.entries(filterOptions).forEach(([key, val]) => {
      obj[val.field] = [] || []
    })

    Object.entries(filterOptions).forEach(([key, val]) => {
      let item = { label: val.label, checked: val.checked }
      obj[val.field].push(item)
    })

    await this.setState({ selectedOptFilter: obj })

    this.props.dispatch({ type: 'UPDATE_PRODUCTS', 
      products: this.props.products,
      // filterOptions: filterOptions,
      selectedFilters: this.state.selectedOptFilter 
    })

    // this.props.dispatch({ type: 'UPDATE_SELECTED_FILTERS', filterOptions: filterOptions })
  }

  render() {
    const { classes, filters } = this.props;
    const { filterOptions } = this.state;

    const sideListFilter = (
      <Grid
        container
        className={classes.list}
        xs={12}
      >
        <Grid
          item
          xs={12}
          direction="row"
          justify="space-between" 
        >
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="search-filter" label="Filtrar por" />
            <Button variant="contained" className={classes.button} color="primary">
              Buscar
            </Button>
          </form>
        </Grid>
        { filters && Object.entries(filters).map(([fieldName, items]) => {
          return (
            <Grid
              item
              xs={12}
              direction="row"
              justify="space-between" 
              alignItems="flex-start" 
            >
              <List>
              <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{fieldName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <Grid
                  container
                  item
                  direction="row"
                  justify="space-between"
                >
                <ListItem>
                  <Typography className={classes.heading}>Selecionar Todos</Typography>
                  <Checkbox
                      edge="end"
                      onClick={() => this.handleSelectAll(fieldName, items)}
                      // inputProps={{ "aria-labelledby": labelId }}
                      checked={() => this.showItemsSelected()}
                      color="primary"
                    />
                </ListItem>
                {items && items.map((item, index) => {
                  const labelId = `checkbox-list-secondary-label-${item}`;
                  return (
                  <ListItem
                  key={index}
                  button
                  >
                  <ListItemText
                    id={labelId}
                    secondary={item.label}
                    className={classes.itemLabel}
                  />
                  <ListItem>
                    <Checkbox
                      edge="end"
                      onClick={() => this.handleSelectedItem(fieldName, item)}
                      inputProps={{ "aria-labelledby": labelId }}
                      checked={item.checked}
                      color="primary"
                    />
                  </ListItem>
                </ListItem>     
                )
                }) }
                </Grid>    
                </ExpansionPanelDetails>
                </ExpansionPanel>
              </List>
            </Grid>
          )
        }) }

        <Grid container item justify="center">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={ () => this.handleDispatch(filterOptions) }
          >
            Filtrar
          </Button>
        </Grid>
      </Grid>
    );


    const sideListOrder = (
      <List dense className={classes.root}>
      {["Cor", "Preco", "Entrega Ajustada"].map(value => (
        <ListItem 
          key={value} 
          button
        >
        <ListItemText
          // id={labelId}
          secondary={value}
          className={classes.itemLabel}
            />
            <Checkbox
              edge="start"
              // onClick={() => this.handleCheckItem(field, item)}
              // inputProps={{ "aria-labelledby": labelId }}
              // checked={item.checked}
              color="primary"
            />
        </ListItem>
      ))}
       <Grid container item justify="center">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            // onClick={ () => this.handleDispatch(filterOptions) }
          >
            Ordenar
          </Button>
        </Grid>
    </List>
    );


    return (
      <Grid 
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        xs={12}
      >
        <Grid 
          item 
          md={6}
          justify="flex-start"
        >
          <Button onClick={this.toggleDrawer('left', true)}>
            <FilterListIcon/>
            Filtrar
          </Button>
        </Grid>
        <Drawer 
        //AJUSTAR ABRE E FECHA DO TOGGLE
          open={this.state.left}  
          onClose={this.toggleDrawer('left', false)}
        >
        <div
          tabIndex={0}
          role="button"
          // onClick={this.toggleDrawer('left', false)}
          // onKeyDown={this.toggleDrawer('left', false)}
        >
          {sideListFilter}
        </div>
        </Drawer>
      </Grid>
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    filters: state.filter,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Filters));