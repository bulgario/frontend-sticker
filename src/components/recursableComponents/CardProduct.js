import "date-fns";
import React from "react";
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import SwipeableCarrousel from "./SwipeableViews";
import UTILS from "../../imageUrl";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  cardOpacity: {
    cursor: "pointer",
    minHeight: 560,
    maxWidth: 300,
    maxHeight: 560,
    minWidth: 300,
    margin: theme.spacing(0.6),
    // padding: theme.spacing(0.6),
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      minHeight: 380,
      maxWidth: 160,
      maxHeight: 380,
      minWidth: 160,
      margin: theme.spacing(0.6),
      marginBottom: theme.spacing(4)
    },
    opacity: 0.4,
    boxSizing: "border-box"
  },
  desc_produto: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9"
    }
  },
  card: {
    cursor: "pointer",
    minHeight: 560,
    maxWidth: 300,
    maxHeight: 560,
    minWidth: 300,
    margin: theme.spacing(0.6),
    // padding: theme.spacing(0.6),
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      minHeight: 380,
      maxWidth: 160,
      maxHeight: 380,
      minWidth: 160,
      margin: theme.spacing(0.6),
      marginBottom: theme.spacing(4)
    },
    boxSizing: "border-box"
  },
  badge: {
    position: "relative",
    top: 5,
    left: 285,
    [theme.breakpoints.down("sm")]: {
      // top: 180,
      left: 140
    }
  },
  greenIcon: {
    backgroundColor: "#25d64c"
  },
  yellowIcon: {
    backgroundColor: "#ebf918"
  },
  redIcon: {
    backgroundColor: "#ff491b"
  }
});

const ProductCard = props => {
  const { classes, productToRender } = props;

  const chooseBalls = ({ distribuicao, validBasedinSchedule }) => {
    const { classes } = props;

    if (distribuicao === true) {
      return [classes.greenIcon, "Produto recebido"];
    } else if (validBasedinSchedule === true) {
      return [
        classes.yellowIcon,
        "Produto pode não ser recebido na data de recebimento desejada"
      ];
    } else {
      return [
        classes.redIcon,
        "Produto não será recebido na data de recebimento desejada"
      ];
    }
  };

  const {
    produto,
    desc_produto,
    cor_produto,
    qtde_programada,
    desc_cor_produto,
    preco_varejo_original
    // id_produto
  } = productToRender;
  const [color, text] = chooseBalls(productToRender);
  const image = UTILS.imagesFromProducts(
    220,
    320,
    productToRender.produto,
    productToRender.cor_produto
  );
  productToRender.image = image;
  return (  
    <Grid 
      item
      className=""
      xs={props.gridSize && props.gridSize != null ? props.gridSize : 0}
    >
      <Card
        // {...props}
        className={props.cardOpacity ? classes.cardOpacity : classes.card}
        onClick={() => props.handleClickProduct(productToRender.id)}
      >
        {props.showBadges && (<Tooltip title={text} className={classes.badge}>
          <Badge badgeContent={""} classes={{ badge: color }}></Badge>
        </Tooltip> )}

        <SwipeableCarrousel
        redirect={props.redirect}
          photos={
            productToRender.nome_arquivo
              ? [...productToRender.nome_arquivo.slice(0, 3)]
              : [productToRender.image.slice(0, 3)]
          }
          stepper={window.innerWidth >= 555 ? true : false}
          id={productToRender.id}
        ></SwipeableCarrousel>
        <Grid
          style={{ marginLeft: 10 }}
          container
          alignItems="flex-start"
          direction="column"
        >
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.desc_produto}
          >
            {UTILS.formatToMaxCaractersAllowed(
              desc_produto,
              window.innerWidth >= 555 ? 32 : 16
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Ref ${produto}`}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {`${cor_produto} - ${UTILS.formatToMaxCaractersAllowed(
              desc_cor_produto,
              window.innerWidth >= 555 ? 26 : 10
            )} `}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {`R$${preco_varejo_original},00`}
          </Typography>
    {qtde_programada &&       <Typography variant="body2" color="textSecondary">
            {`Qtde programada:  ${qtde_programada}`}
          </Typography>}
        </Grid>
      </Card>
    </Grid>
  );
};



function mapStateToProps(state) {
  return {
    gridSize: state.gridItemsSize
  }
}

const wrapperComponent = withStyles(styles)(withSnackbar(ProductCard));

export default connect(mapStateToProps)(wrapperComponent);
