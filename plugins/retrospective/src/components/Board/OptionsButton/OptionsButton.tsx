import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, {Fragment} from 'react';
import {BoardData} from '@scrumedley/backstage-plugin-retrospective-common';
import {useApi} from '@backstage/core-plugin-api';
import {retroApiRef} from '../../../api';

type OptionsButtonProps = {
  board?: BoardData
  handleStartTimer: () => void;
}

const OptionsButton = ({board, handleStartTimer}: OptionsButtonProps) => {
  const retroApi = useApi(retroApiRef);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEndRetro = async () => {
    await retroApi.archiveRetro(board?.id!);
    handleClose();
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={<MenuIcon/>}
      >
        Options
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEndRetro} disableRipple>
          <MenuIcon/> End Retro
        </MenuItem>
        <MenuItem onClick={handleStartTimer} disableRipple>
          <MenuIcon/> Start Timer
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default OptionsButton;