import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";

import CardMedia from "@material-ui/core/CardMedia";

import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";



const useStyles = makeStyles(theme => ({
  root: {
    position:'relative', top:-21,
  },
  avatar: {
    padding: theme.spacing(2),
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      height: "90vh"
    },
    [theme.breakpoints.up("md")]: {
      width: "280px",
      height: "90%"
    }
  },
  stepper: {
    marginTop: theme.spacing(-2.5),
      backgroundColor: 'white',
    maxWidth: 300,
    // flexGrow: 1,
    padding:0,
    [theme.breakpoints.down("sm")]: {
        maxWidth: 160,
      },
  },
  sliderBtn: {
    //   maxWidth: 30,
    padding: theme.spacing(1)
  },
  mediaCard: {
    // position:'relative', top:-21,
    // marginBottom: theme.spacing(-2),
    height: 415,
    width: 300,
    boxSizing: "border-box",
    objectFit: "scale-up",
    [theme.breakpoints.down("sm")]: {
      height: 220,
      width: 160,
      left: 0,
    },

    borderColor: "#FFE600"
  },
}));

function SwipeableCarrousel(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const classes = useStyles();


  const handleClickProduct = id => {
        if(props.redirect) {
          return props.history.push(`/produto?produto=${id}`);
        }
  };
  const renderImg = img => {
    return (                 
           <CardMedia
           key={`${img}`}
           onClick={() => handleClickProduct(props.id)}
          className={classes.mediaCard}
          image={img}
          title="Produto"
        />)

  };

  const renderStepper = () => {
    if (props.stepper) {
      return (
        <MobileStepper
          variant="dots"
          steps={props.photos.length}
          className={classes.stepper}
          position="static"
          activeStep={activeStep}
          nextButton={

            <IconButton
            
              onClick={() => setActiveStep(activeStep + 1)}
              disabled={activeStep + 1 >= props.photos.length}
              className={classes.sliderBtn}
            >
              <KeyboardArrowRight />
            </IconButton>

          }
          backButton={
            <IconButton
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={activeStep === 0}
              className={classes.sliderBtn}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      );
    }
    return null;
  };

  return (
    <>
      <SwipeableViews
      className={classes.root}
      style={{margin:0, padding:0,border:0}}
        index={activeStep}
        enableMouseEvents
        onChangeIndex={index => setActiveStep(index)}
      >
        {props.photos.map(img => renderImg(img))}
      </SwipeableViews>
      {renderStepper()}
    </>
  );
}
const wrapperComponent = withRouter(SwipeableCarrousel)
SwipeableCarrousel.propTypes = {
  photos: PropTypes.array.isRequired,
  Component: PropTypes.func,
  stepper: PropTypes.bool
};

export default wrapperComponent
