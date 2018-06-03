import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
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
