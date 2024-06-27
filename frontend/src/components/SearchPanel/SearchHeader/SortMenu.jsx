import { IconButton, Paper, Popover, Stack, Typography, Button, Menu, MenuItem } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import { Fragment, useState } from "react";
import { useSearchParams } from "react-router-dom";

const sortMenuItems = [
    { label: 'None', value: null },
    { label: 'Income : high to low', value: '-income' },
    { label: 'Income : low to high', value: 'income' },
    { label: 'Height : high to low', value: '-height' },
    { label: 'Height : low to high', value: 'height' },
    { label: 'Age : high to low', value: 'date_of_birth' },
    { label: 'Age : low to high', value: '-date_of_birth' },
]

function SortMenuItem({ label, value }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortby = searchParams.get('sortby')

    const sortByHandler = () => {
        setSearchParams((searchParams) => {
            if (value === null) searchParams.delete('sortby')
            else searchParams.set('sortby', value)
            return searchParams
        })
    }

    return (
        <MenuItem p={1}
            selected={sortby === value}
            onClick={sortByHandler}
            sx={{
                borderRadius: 0,
                fontSize: '1rem',
                // fontFamily: 'Lexend,sans-serif',
                color: 'text.primary'
            }}>
            {label}
        </MenuItem >
    )
}


function SortMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton
                id="sort-button"
                aria-controls={open ? 'sort-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <SortIcon fontSize='large' />
            </IconButton>
            <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'sort-button',
                }}
            >
                {sortMenuItems.map((props) => {
                    return <SortMenuItem key={props.label} {...props} />
                })}
            </Menu>
        </Fragment>
    )
}

export default SortMenu