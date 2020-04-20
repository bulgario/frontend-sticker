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

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Grid from "@material-ui/core/Grid";


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class OrderItems extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


  componentDidUpdate(prevProps) {
    const { dispatch, products, orderFields } = this.props
    
    if(prevProps.products !== this.props.products) {
      // MONTA O FILTRO DE ORDENACAO COM OS ITEMS
      dispatch({
        type: 'ORDER_ITEMS_ORDER_FILTER',
        products,
        orderFields
      })
    }   
    if(prevProps.orderItems !== this.props.orderItems) {
      this.setState({ items: this.props.orderItems })
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.items)

    const sideList = (
      <Grid
        container
        className={classes.list}
        xs={12}
      >
       { this.state.items && (
         Object.entries(this.state.items).map(([key, value]) => {
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
              <Typography className={classes.heading}>{key}</Typography>
              </ExpansionPanelSummary>
              </ExpansionPanel>
              </List>

            </Grid>
           )
         })
       ) }

      </Grid>
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
          <Button onClick={this.toggleDrawer('right', true)}>
            <FormatListNumberedIcon/>
            Ordenar
          </Button>
        </Grid>

        <Drawer 
          anchor="right" 
          open={this.state.right} 
          onClose={this.toggleDrawer('right', false)}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleDrawer('right', false)}
            // onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </Grid>
    );
  }
}

OrderItems.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    produtos: state.products,
    orderItems: state.orderItems
  }
}

export default connect(mapStateToProps)(withStyles(styles)(OrderItems));