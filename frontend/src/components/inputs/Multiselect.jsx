import React, { useState } from "react";
import { MenuItem, Checkbox, ListItemIcon, ListItemText, TextField } from '@mui/material';

const MultiSelect = ({ options, onChange, label, defaultValue = [] }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (event) => {
    onChange(event);
    const value = event.target.value;
    setSelected(value);
  };

  return (
    <TextField
      select
      name={label}
      id={label}
      variant="outlined"
      label={label}
      size="small"
      SelectProps={{
        multiple: true,
        renderValue: (selected) => selected.join(", "),
        value: selected,
        onChange: handleChange,
        sx: {
          minWidth: '200px'
        }
      }}
    >
      {options.map((option) => (
          <MenuItem key={option} value={option}>
              <ListItemIcon>
                  <Checkbox checked={selected.indexOf(option) > -1} />
              </ListItemIcon>
              <ListItemText primary={option} />
          </MenuItem>
        ))}
    </TextField>
  );
}

export default MultiSelect;
