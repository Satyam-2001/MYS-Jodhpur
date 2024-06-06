import { IconButton, Paper, Popover, Stack, Typography, Button } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import { Fragment, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Block from "../../../UI/Block";

const sortMenuItems = [
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
            searchParams.set('sortby', value)
            return searchParams
        })
    }

    return (
        <Button p={1}
            onClick={sortByHandler}
            sx={{
                bgcolor: 'background.paper',
                height: '40px',
                borderRadius: 0,
                textTransform: 'none',
                fontSize: '1rem',
                fontFamily: 'Lexend,sans-serif',
                color: sortby === value ? 'primary.main' : 'text.primary'
            }}>
            {label}
        </Button>
    )
}


function SortMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Fragment>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <SortIcon fontSize='large' />
            </IconButton>
            <Popover
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper elevation={2}>
                    <Stack gap={'1px'} p={'2px'}>
                        {sortMenuItems.map((props) => {
                            return <SortMenuItem key={props.label} {...props} />
                        })}
                    </Stack>
                </Paper>
            </Popover>
        </Fragment>
    )
}

export default SortMenu