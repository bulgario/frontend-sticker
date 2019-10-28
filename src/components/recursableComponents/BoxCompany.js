import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: 'center',
		color: theme.palette.text.primary,
		backgroundColor: '#FFE600',
		boxShadow:'1px 1px 1px 1px'
  },
}));

 const BoxCompany = () => {
	const classes = useStyles()
	
	const userData = [
		{ id: 1, companyName: 'Animale'},
		{ id: 2, companyName: 'Farm'}
	]

	const [user] = useState(userData)

  return (
    <div>
			<h2 className={classes.root}>{user[0].companyName}</h2>   
    </div>
  );
}

export default BoxCompany