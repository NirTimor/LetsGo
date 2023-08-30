import React, { useState } from "react";
import { MenuItem, Select, Checkbox, ListItemIcon, ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    variant: "menu"
  };

const MultiSelect = ({ options, onChange }) => {
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    onChange(event);
    const value = event.target.value;
    setSelected(value);
  };

  return (
      <Select
        multiple
        fullWidth
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        size="small"
        multiline
        sx={{ maxWidth: '380px' }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
  );
}

export default MultiSelect;
