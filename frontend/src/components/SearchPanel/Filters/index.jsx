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
import { useFormik } from 'formik'
import RangeSliderSelection from './RangeSliderSelection';
import InputField from '../../../UI/InputField';
import { diet, manglik, martial_status, complexion, weight_category } from '../../../data/selectionData'


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

const initialValues = { manglik: 'Any', martial_status: 'Any', diet: 'Any', complexion: 'Any', weight_category: 'Any' }

function FilterBlock({ sx }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const filter_open = searchParams.get('filter') === 'open'
    const { isLoggedIn } = useSelector(state => state.user)
    const values = { ...initialValues }

    const handleChange = (event) => {
        const { name, value } = event.target
        setSearchParams((searchParams) => {
            if (value === 'Any') searchParams.delete(name)
            else searchParams.set(name, value)
            return searchParams
        })
    }

    Object.keys(initialValues).forEach((key) => {
        values[key] = searchParams.get(key) || values[key]
    })

    const filterInputPropsList = [
        { label: 'Manglik', type: 'select', menuItems: ['Any', ...manglik] },
        { label: 'Martial Status', type: 'select', menuItems: ['Any', ...martial_status] },
        { label: 'Diet', type: 'select', menuItems: ['Any', ...diet] },
        { label: 'Complexion', type: 'select', menuItems: ['Any', ...complexion] },
        { label: 'Weight Category', type: 'select', menuItems: ['Any', ...weight_category] }
    ]

    // useEffect(() => {
    //     const newValues = { ...initialValues }
    //     Object.keys(initialValues).forEach((key) => {
    //         if (searchParams.get(key)) {
    //             newValues[key] = searchParams.get(key)
    //         }
    //     })
    //     setValues(newValues)
    // }, [searchParams])

    return (
        <Block
            p={filter_open ? 2 : 0}
            gap={2}
            sx={{
                overflowY: 'auto',
                width: filter_open ? '280px' : '0px',
                overflow: 'auto',
                transition: 'ease-out width 0.35s',
                // flex: 1,
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
            <RangeSliderSelection title='income' min={1} max={100} format={(value) => `${value} lakhs`} />
            {filterInputPropsList.map((props) => (
                <Stack key={props.label} alignItems={'center'} gap={2}>
                    <Typography variant='h5' fontSize={'1rem'} fontWeight={700} sx={{ opacity: 0.6, textTransform: 'uppercase' }} >
                        {props.label}
                    </Typography>
                    <InputField key={props.label} {...props} hideLabel formikState={{ handleChange, values }} />
                </Stack>
            ))}
        </Block >
    )
}

export default function Filters() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filter_open = searchParams.get('filter') === 'open'




    const toggleFilterHandler = () => {
        setSearchParams((searchParams) => {
            const filter_open = searchParams.get('filter') === 'open'
            if (filter_open) searchParams.delete('filter')
            else searchParams.set('filter', 'open')
            return searchParams
        })
    }

    return (
        <Fragment>
            <FilterBlock sx={{ display: { xs: 'none', md: 'flex' } }} />
            <CustomModal sx={{ display: { md: 'none' } }} open={filter_open} onClose={toggleFilterHandler}>
                <FilterBlock sx={{ width: '100%' }} />
            </CustomModal>
        </Fragment>
    )
}
