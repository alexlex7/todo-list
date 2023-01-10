import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { GridView, List } from '@mui/icons-material';

export default function ViewSwitcher({ view, handleChangeView }) {
  return (
    <>
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

ViewSwitcher.propTypes = {
  view: PropTypes.string.isRequired,
  handleChangeView: PropTypes.func.isRequired,
};
