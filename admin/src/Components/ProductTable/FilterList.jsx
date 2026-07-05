import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * FilterList — category filter dropdown for the product table.
 *
 * Props:
 *  - categories: Array<{ _id, name, children[] }>  — root categories from store
 *  - value: string  — currently selected catName (empty = All)
 *  - onChange: (catName: string) => void  — called when selection changes
 */
export default function FilterList({ categories = [], value = "", onChange }) {
  const handleChange = (event) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, pl: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
        <InputLabel id="filter-category-label">All Categories</InputLabel>
        <Select
          labelId="filter-category-label"
          id="filter-category-select"
          value={value}
          label="All Categories"
          onChange={handleChange}
        >
          {/* "All" resets the filter */}
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>

          {categories.length === 0 ? (
            <MenuItem disabled value="">
              Loading…
            </MenuItem>
          ) : (
            categories.map((cat) => [
              /* Level 1 — root category */
              <MenuItem key={cat._id} value={cat.name}>
                {cat.name}
              </MenuItem>,

              /* Level 2 — sub categories (indented) */
              ...(cat.children || []).map((sub) => [
                <MenuItem
                  key={sub._id}
                  value={sub.name}
                  sx={{ pl: 4, fontSize: "0.85rem", color: "text.secondary" }}
                >
                  ↳ {sub.name}
                </MenuItem>,

                /* Level 3 — third-level categories (more indent) */
                ...(sub.children || []).map((third) => (
                  <MenuItem
                    key={third._id}
                    value={third.name}
                    sx={{ pl: 6, fontSize: "0.8rem", color: "text.disabled" }}
                  >
                    ↳↳ {third.name}
                  </MenuItem>
                )),
              ]),
            ])
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
