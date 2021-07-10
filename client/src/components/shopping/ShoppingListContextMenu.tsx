import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, ListItemIcon } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface ShoppingListContextMenuProps {
    deleteList(): void
}

export default function ShoppingListContextMenu({ deleteList }: ShoppingListContextMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteParentList = () => {
        deleteList();
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}>

                <MenuItem onClick={deleteParentList}>
                    <ListItemIcon className="context-menu-icon">
                        <DeleteIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    Delete List
                </MenuItem>
            </Menu>
        </div>
    );
}
