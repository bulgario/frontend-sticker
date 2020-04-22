import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IconButton } from "@material-ui/core";

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Grid from "@material-ui/core/Grid";


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  itemLabel: {
    width:300
  },
};

class OrderItems extends React.Component {
  state = {
    right: false,
    checkedOrder: false
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

  handleOrderItemDispatch = async (key, value) => {
    //falta arrumar esse setState
    // await this.setState({ [option]: !this.state.checkedOrder })

    this.props.dispatch({
      type: 'ORDER_ITEMS',
      products: this.props.produtos.length > 0 ? this.props.produtos : this.props.products,
      fieldName: key
    })
  }

  render() {
    const { classes } = this.props;
    const { checkedOrder } = this.state
    console.log(this.props)

    const sideList = (
      <Grid
        container
        className={classes.list}
        xs={12}
      >
       { this.state.items && (
         Object.entries(this.state.items).map(([key, value]) => {
          const labelId = `checkbox-list-secondary-label-${key}`;
           return (
            <Grid
              item
              xs={12}
              direction="row"
              justify="space-between" 
              alignItems="flex-start" 
            >

          <ListItem 
            key={key} 
            button
            onClick={() => this.handleOrderItemDispatch(key, value)}
          >
            <ListItemText id={key} secondary={key} className={classes.itemLabel} />
            <ListItem >
              <Checkbox
                edge="start"
                // onChange={this.handleOrderItem(value)}
                checked={checkedOrder}
                inputProps={{ 'aria-labelledby': labelId }}
                color="primary"
              />
            </ListItem>
            {/* </Grid> */}
          </ListItem>
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