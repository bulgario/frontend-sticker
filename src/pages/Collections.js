import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import Header from "../components/recursableComponents/Header";
import ArrowBack from "@material-ui/icons/ArrowBack";

import axios from "axios";
import { BASE_URL } from "../consts";
import User from "../services/User";

const styles = theme => ({
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  select: {
    width: 160,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    paddingTop: "25px",
    paddingBottom: "18px",
  },
  leftBarLabel: {
    backgroundColor: "#FCB92C",
    width: 5,
    // height:'100%',
    marginRight: theme.spacing(4),
    position: 'absolute',
    height: '62px',
    left: '0px'
  },
  labelWrapper: {
    marginLeft: theme.spacing(-8),
    marginBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: 'white'
  },
  spacing: {
    paddingTop: theme.spacing(6)
  }
});


function Collections(props) {
  const { classes } = props;
  const [collections, setCollection] = useState([]);
  const [choosedCollection, setChoosedCollection] = useState("");

  const getCollections = () => {
    const user = new User();
    const id_marca_estilo = user.user.id_marca_estilo;

    try {
      axios.get(`${BASE_URL}/collections/getAllCollections`, {
        params: {
          id_marca_estilo
        }
      })
        .then(collections => {
          setCollection(collections.data)
        });
    } catch (err) {
      console.log("Error getting collections:", err);
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  return (
    <Fragment>
      <Header
        title="Coleções"
        rightIcon={null}
        leftIcon={
          <IconButton
            aria-label="upload picture"
            component="span"
            className={classes.whiteButton}
            onClick={() => props.history.goBack()}
          >
            <ArrowBack></ArrowBack>
          </IconButton>
        }
      />
      <Grid container
        direction="column"
        justify="space-evenly"
        alignItems="center">
        <Grid item xs={12} className={classes.spacing}>
          {collections.length > 1 ? (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Coleções</InputLabel>
              <Select
                className={classes.select}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={choosedCollection}
                onChange={e => setChoosedCollection(e.target.value)}
                label="Coleções"
              >
                {collections.map(collection => {
                  return (
                    <MenuItem key={collection} value={collection}>
                      {collection}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : null}
        </Grid>
        <Grid item xs={12} className={classes.spacing}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => props.history.push(`colecao/${choosedCollection}`)}
          >
            Buscar
          </Button></Grid>
      </Grid>

    </Fragment>
  )
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(Collections))
);
export default wrapperComponent;