import {
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Menu,
  MenuList,
  Button,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useRef } from "react";

const Filters = ({ onFilterChange, filters }) => {
  const [sort, setSort] = useState("Last Watered");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <Paper sx={{ width: "100%", display: "flex", position: "relative" }}>
      <div
        style={{
          margin: "1% 0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Search for a plant..."
          sx={{ marginRight: "20px", width: "80% !important" }}
          fullwidth
          // onChange does not detect backspace, this does
          onKeyUp={(e) => {
            onFilterChange(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          id="outlined-basic"
          variant="outlined"
        />
        {/* <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            sx={{ display: "block" }}
            control={<Switch defaultChecked />}
            label="Need Watering"
          />
          <FormControlLabel
            sx={{ display: "block" }}
            control={<Switch />}
            label="Ok"
          />
        </FormGroup>
        <Button
          ref={anchorRef}
          onClick={() => {
            setOpen(true);
          }}
        >
          Sort By
        </Button>
        <Menu anchorEl={anchorRef.current} open={open}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <MenuList>
              <MenuItem>Last Watered</MenuItem>
              <MenuItem>Next Watering</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Menu> */}
      </div>
    </Paper>
  );
};
export default Filters;
