import React, { useState } from "react";
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  icon: {
    padding: theme.spacing(1)
  },
  listItem: {
    minWidth: 0
  }
}));

export default function ListIcon({
  icons,
  onClick,
  showText,
  showSelected = false,
  initialIndexSelect = null
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState(initialIndexSelect);

  function renderText(icon) {
    if (showText) {
      return (
        <ListItemText
          primary={icon.text}
          primaryTypographyProps={{
            color: "textSecondary",
            variant: "caption"
          }}
        />
      );
    }
    return null;
  }

  function handleClick(index, icon) {
    setSelected(index);
    onClick(icon);
  }

  function isSelected(index) {
    return selected === index && showSelected;
  }

  return (
    <List>
      {icons.map((icon, index) => (
        <ListItem
          button
          key={icon.name}
          onClick={() => handleClick(index, icon)}
          disableGutters
          selected={isSelected(index)}
        >
          <ListItemIcon className={classes.listItem}>
            <Icon
              key={icon.name}
              className={classes.icon}
              color={isSelected(index) ? "primary" : "inherit"}
            >
              {icon.name}
            </Icon>
          </ListItemIcon>
          {renderText(icon)}
        </ListItem>
      ))}
    </List>
  );
}

ListIcon.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired,
  initialIndexSelect: PropTypes.number,
  showSelected: PropTypes.bool,
  showText: PropTypes.bool,
};
