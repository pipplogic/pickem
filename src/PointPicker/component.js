import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Lock from "@material-ui/icons/Lock";
import React from "react";

function PointPicker({ className, pick, options, handlePointChange }) {
  return (
    <FormControl className={className}>
      <Select
        value={pick.score || ""}
        onChange={handlePointChange}
        IconComponent={pick.locked ? Lock : undefined}
        disabled={pick.locked}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PointPicker;
