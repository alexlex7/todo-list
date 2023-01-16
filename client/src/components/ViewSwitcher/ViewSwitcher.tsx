import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { GridView, List } from '@mui/icons-material';

interface Props {
  view: string;
  handleChangeView(event: React.MouseEvent<HTMLElement>, nextView: string): void;
  itemsOnPage: string;
  setItemsOnPage(event: SelectChangeEvent): void;
}

export default function ViewSwitcher({
  view,
  handleChangeView,
  setItemsOnPage,
  itemsOnPage,
}: Props) {
  return (
    <>
      <Box sx={{ minWidth: 100, mr: 2 }}>
        <FormControl fullWidth color="secondary" sx={{ m: 1 }} size="small">
          <InputLabel id="demo-simple-select-label">Todo on page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={itemsOnPage}
            label="Todo on page"
            onChange={setItemsOnPage}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ToggleButtonGroup
        orientation="horizontal"
        value={view}
        exclusive
        onChange={handleChangeView}
        size="small"
        color="secondary"
        sx={{ border: 'none' }}
      >
        <ToggleButton
          value="list"
          aria-label="list"
          sx={{
            border: 'none',
            '&.Mui-selected': {
              bgcolor: 'common.white',
            },
          }}
        >
          <List />
        </ToggleButton>
        <ToggleButton
          value="card"
          aria-label="card"
          sx={{
            border: 'none',
            '&.Mui-selected': {
              bgcolor: 'common.white',
            },
          }}
        >
          <GridView />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
