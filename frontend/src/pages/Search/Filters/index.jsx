import { Box, Button, ButtonGroup, IconButton, Modal, Slider, Stack, TextField, Typography, useTheme } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React, { Fragment, useEffect, useState } from 'react'
import chroma from 'chroma-js';
import Block from '../../../UI/Block';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { heightFormat } from '../../../utils';
import { searchActions } from '../../../store/SearchSlice';
import CustomModal from '../../../UI/CustomModal';

function FilterAccordionLabel({ children }) {
    return (
        <FormControlLabel
            control={<Checkbox />}
            label={
                <Typography variant='body1' fontSize={'1rem'}>
                    {children}
                </Typography>
            }
        />
    )
}

function FilterAccordion({ children, title }) {
    return (
        <Accordion
            sx={{
                backgroundColor: 'rgb(50, 50, 50, 0.1)',
                borderRadius: '5px',
                '&:before': {
                    display: 'none',
                }
            }}
            disableGutters
        >
            <AccordionSummary
                sx={{ backgroundColor: 'transparent' }}
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <Typography variant='h5' fontSize={'1rem'} fontWeight={600} sx={{ opacity: 0.6 }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {children}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    )
}

function RangeSliderSelection({ title, min, max, format = (data) => data }) {
    const minParam = `min_${title}`, maxParam = `max_${title}`
    const [searchParams, setSearchParams] = useSearchParams()
    const min_value = searchParams.get(minParam) || min
    const max_value = searchParams.get(maxParam) || max
    const value = [min_value, max_value]

    const handleRangeChange = (event, newValue) => {
        setSearchParams((searchParams) => {
            searchParams.set(minParam, newValue[0])
            searchParams.set(maxParam, newValue[1])
            return searchParams
        })
    }
    return (
        <Stack direction='column' gap={0} alignItems={'center'}>
            <Typography variant='h5' fontSize={'1rem'} fontWeight={700} sx={{ opacity: 0.6, textTransform: 'uppercase' }} >
                {title}
            </Typography>
            <Stack sx={{ flex: 1, width: '90%' }}>
                <Slider
                    // valueLabelFormat={value => undefined}
                    valueLabelFormat={value => <Typography color='white' fontSize={'0.9rem'}>{format(value)}</Typography>}
                    min={min}
                    max={max}
                    getAriaLabel={() => `${title} Range`}
                    value={value}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value) => value}
                    marks={[
                        {
                            value: min_value,
                            label: format(min_value)
                        },
                        {
                            value: max_value,
                            label: format(max_value)
                        },
                    ]}
                />
            </Stack>
        </Stack>
    )
}

function GenderButton({ gender }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const genderSearch = (searchParams.get('gender') || '').toLowerCase()

    const genderSelectHandler = () => {
        setSearchParams((searchParams) => {
            searchParams.set('gender', gender)
            return searchParams
        })
    }
    return (
        <Button variant={gender === genderSearch ? 'contained' : 'outlined'} onClick={genderSelectHandler}>
            {gender}
        </Button>
    )
}

function FilterBlock({ sx }) {
    const { filter_open } = useSelector(state => state.search)
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <Block
            p={filter_open ? 2 : 0}
            gap={2}
            sx={{
                overflowY: 'auto',
                width: filter_open ? '280px' : '0px',
                overflow: 'auto',
                transition: 'ease-out width 0.35s',
                ...sx,
            }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant='h3' fontSize={'1.2rem'} fontWeight={700} sx={{ opacity: 0.6, pb: 1 }} >
                    FILTERS
                </Typography>
            </Stack>
            {!isLoggedIn && <ButtonGroup fullWidth>
                <GenderButton gender='men' />
                <GenderButton gender='women' />
            </ButtonGroup>}
            <RangeSliderSelection title='age' min={18} max={50} />
            <RangeSliderSelection title='height' min={48} max={76} format={(value) => heightFormat(value)} />
            <RangeSliderSelection title='income' min={1} max={100} format={(value) => value < 100 ? `${value} lakhs` : 'above'} />
            {/* <FilterAccordion title='Caste'>
                <FilterAccordionLabel>All</FilterAccordionLabel>
                <FilterAccordionLabel>Brahmin</FilterAccordionLabel>
                <FilterAccordionLabel>Agarwal</FilterAccordionLabel>
            </FilterAccordion> */}
        </Block >
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // minWidth: 450,
    minWidth: { xs: '90%', md: 450 },
    maxWidth: '100%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function Filters() {
    const { filter_open } = useSelector(state => state.search)
    const dispatch = useDispatch()

    const toggleFilterHandler = () => {
        dispatch(searchActions.toggleFilter())
    }

    return (
        <Fragment>
            <FilterBlock sx={{ display: { xs: 'none', md: 'flex' } }} />
            <CustomModal sx={{ display: { md: 'none' } }} open={filter_open} onClose={toggleFilterHandler}>
                <FilterBlock />
            </CustomModal>
        </Fragment>
    )
}
