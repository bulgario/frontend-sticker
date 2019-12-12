import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'

const axios = require('axios')

const styles = theme => ({
	margin: {
		margin: theme.spacing(1)
	},
	media: {
		height: 400,
		width: 280
	}
});

function Checker(props) {
	const { checked, value, onChange, label } = props;
	return (<FormControlLabel
		control={
			<Checkbox
				checked={checked}
				onChange={(e, checked) => onChange({ label: value, checked })}
				value={value}
				color="primary"
			/>
		}
		label={label}
	/>);
}

const SELECT_ALL = 'SELECIONAR TODOS';
const SELECT_ONLY = 'SELECIONAR SOMENTE';

// Strategy Pattern
class ActionMenu {
	action = null;
	setStrategy(action) {
		this.action = action;
	}
	act(item, index, items) {
		return this.action.act(item, index, items);
	}

}

class ActionsMenuFactory {
	static create({ label, type }) {
		if (type === SELECT_ONLY) {
			return new SelectOnlyAction();
		} else if (label === SELECT_ALL) {
			return new SelectAllAction();
		} else {
			return new SelectNormalAction();
		}
	}
}

class SelectAllAction {
	act(newState, index, items) {
		return items.map(item => {
			item.checked = newState.checked;
			return item;
		})
	}

}

class SelectOnlyAction {
	act(newState, index, items) {
		return items.map(item => {
			if (item.label === newState.label) {
				item.checked = newState.checked;
			} else {
				item.checked = !newState.checked;
			}
			return item;
		})
	}
}

class SelectNormalAction {
	act(item, index, items) {
		items[index].checked = !items[index].checked;
		return items;
	}

}

class MenuList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			category: [],
			anchorEl: null,
			items: [],
		}
	}

componentDiMount() {
	// this.setState({ items: this.props.list })
	const { items } = this.state;
	if (items[0].label !== SELECT_ALL) {
		items.unshift({ label: SELECT_ALL, checked: true });
		this.setState({ items });
	}
}

handleMenuClose = (e, el) => {
	this.setState({ anchorEl: null });
	if (el === 'backdropClick') {
		this.props.onClose(this.state.items.slice(1));
	}
};

handleCheckBox = (item, index) => {
	let stateCopy = Object.assign({}, this.state);
	const actionMenu = new ActionMenu();
	actionMenu.setStrategy(ActionsMenuFactory.create(item));
	stateCopy.items = actionMenu.act(item, index, stateCopy.items);
	this.setState(stateCopy);
};

handleMenuOpen = event => {
	this.setState({ anchorEl: event.currentTarget });
};


render(props) {
		const { title, icon } = this.props;
		const { anchorEl, items } = this.state;
		
return (
			<Fragment>
				<Button
					onClick={this.handleMenuOpen}
				>
					<Grid container alignItems={'center'} spacing={8}>
						<Grid item>
							{icon}
						</Grid>
						<Grid item>
							<Typography variant="button" gutterBottom>
								{title}
							</Typography>
						</Grid>
					</Grid>
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleMenuClose}
				>
					{items.map((el, index) =>
						<MenuItem
							key={index}
						>
						<Grid container alignItems={'center'}>
							<Grid item xs={6}>
								<Checker
									value={el.label}
									onChange={label => this.handleCheckBox(label, index)}
									label={el.label} checked={el.checked}
								/>
							</Grid>
							{index === 0 ? null : (
							<Grid item container justify={'flex-end'} xs={6}>
								<Typography
									variant="caption"
									onClick={e =>
										this.handleCheckBox({ label: el.label, checked: true, type: SELECT_ONLY }, index)}
										color={'textSecondary'}
								>
								</Typography>
							</Grid>
							)}
							</Grid>
						</MenuItem>)}
				</Menu>
			</Fragment>	
		)
	}
}

export default withStyles(styles)(MenuList);
