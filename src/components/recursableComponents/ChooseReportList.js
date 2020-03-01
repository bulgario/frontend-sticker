import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { withSnackbar } from "notistack";

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme =>({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }
});

class ChooseReportList extends Component {
  state =  {
    checked: [ ],
    reportsIds: []
  }
  formatreportsIdToString() {
     const { checked } = this.state

     return checked.join()

  }
  handleToggle ({nome_relatorio,id}){
    const {reportsIds} = this.state
    if (!reportsIds.includes(nome_relatorio)) { 
      reportsIds.push(nome_relatorio)

    } else { 
      const index  = reportsIds.indexOf(nome_relatorio);
      reportsIds.splice(index, 1);

    }
    this.setState({ reportsIds})
    return this.props.handleToogleChips(nome_relatorio,id)
  };


  render() {
    return (
      <Dialog onClose={this.props.onClose}  aria-labelledby="simple-dialog-title" open={this.props.open}>
        <DialogTitle id="simple-dialog-title">Escolha os relatórios para adicionar produtos</DialogTitle>
        <List>
          {this.props.reports.map((report,index) => {
            if (!report.id) return null
            return (
            <ListItem button onClick={() => this.handleToggle(report)} key={report.id}>
           <ListItemText  primary={report.nome_relatorio} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => this.handleToggle(report)}
                checked={this.props.reportsIds.includes(report.id)}
                color="primary"
              />
            </ListItemSecondaryAction>
            </ListItem>
          )})}
  
        </List>
        {/* <MuiDialogActions>
          <Button autoFocus onClick={() => { this.addReportChip()}} color="primary" variant="contained">
            SELECIONAR
          </Button>
        </MuiDialogActions> */}
      </Dialog>
    );
  }
}




const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(ChooseReportList))
);

export default wrapperComponent;

