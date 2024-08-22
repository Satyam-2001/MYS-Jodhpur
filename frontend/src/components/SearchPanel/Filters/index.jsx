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
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { heightFormat, incomeFormat, max_age, max_height, max_income, min_age, min_height, min_income } from '../../../utils';
import { searchActions } from '../../../store/SearchSlice';
import CustomModal from '../../../UI/CustomModal';
import { FormikProvider, useFormik } from 'formik'
import RangeSliderSelection from './RangeSliderSelection';
import InputField from '../../../UI/InputField';
import { diet, manglik, martial_status, complexion, weight_category, language, family_status, family_type, family_values, drink, education, occupation, employed_in } from '../../../data/selectionData'
import InputLabel from './InputLabel';
import { ElevatedButton } from '../../../UI/ElevatedComponents';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../services/http';
import axios from '../../../services/axiosinstance'
import { elevation } from '../../../theme/styles';
import { preferenceSchema } from '../../../schemas/preferenceSchema';
import { initialFilterValues } from '../utils';


function GenderButton({ gender, value, setValue }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const genderSearch = (searchParams.get('gender') || '').toLowerCase()

    const genderSelectHandler = () => {
        setValue(gender)
    }
    return (
        <Button variant={gender === value?.toLowerCase() ? 'contained' : 'outlined'} onClick={genderSelectHandler}>
            {gender}
        </Button>
    )
}

const filterInputPropsList = [
    { label: 'Age', type: 'range', hideLabel: true, min: min_age, max: max_age, elevation: false },
    { label: 'Height', type: 'range', hideLabel: true, min: min_height, max: max_height, elevation: false, format: heightFormat },
    { label: 'Income', type: 'range', hideLabel: true, min: min_income, max: max_income, elevation: false, format: incomeFormat },
    { label: 'Mother Tongue', type: 'autocomplete', menuItems: language, input_prop: { multiple: true } },
    {
        label: 'Education',
        type: 'autocomplete',
        menuItems: education,
        input_prop: {
            multiple: true,
            getOptionLabel: (option) => option.label,
            groupBy: (option) => option.category,
        }
    },
    {
        label: 'Employed In',
        type: 'autocomplete',
        menuItems: employed_in,
        input_prop: {
            multiple: true,
        }
    },
    {
        label: 'Occupation',
        type: 'autocomplete',
        menuItems: occupation,
        input_prop: {
            multiple: true,
            getOptionLabel: (option) => option.label,
            groupBy: (option) => option.category,
        }
    },
    { label: 'Manglik', type: 'autocomplete', menuItems: manglik, input_prop: { multiple: true } },
    { label: 'Martial Status', type: 'autocomplete', menuItems: martial_status, input_prop: { multiple: true } },
    { label: 'Diet', type: 'autocomplete', menuItems: diet, input_prop: { multiple: true } },
    { label: 'Complexion', type: 'autocomplete', menuItems: complexion, input_prop: { multiple: true } },
    { label: 'Weight Category', type: 'autocomplete', menuItems: weight_category, input_prop: { multiple: true } },
    { label: 'Family Status', type: 'autocomplete', menuItems: family_status, input_prop: { multiple: true } },
    { label: 'Family Type', type: 'autocomplete', menuItems: family_type, input_prop: { multiple: true } },
    { label: 'Family Values', type: 'autocomplete', menuItems: family_values, input_prop: { multiple: true } },
    { label: 'Drinks', type: 'autocomplete', menuItems: drink, input_prop: { multiple: true } },
    { label: 'Smoke', type: 'autocomplete', menuItems: drink, input_prop: { multiple: true } },
]

function FilterElevatedStack({ formik, toggleFilterHandler, applyFiltersHandler }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoggedIn } = useSelector(state => state.user)
    const { mutate, isPending } = useMutation({
        mutationFn: (values) => axios.patch('/user/preference', values),
        onSuccess: () => {
            // queryClient.invalidateQueries(['users'])
        }
    })

    const { user } = useSelector(state => state.user)

    const setPreferenceHandler = () => {
        // mutate(formik.values)
        formik.setValues(user.preference)
    }

    const resetHandler = () => {
        formik.setValues(initialFilterValues)
    }

    const setGenderValue = (value) => {
        formik.setFieldValue('gender', value)
    }

    return (
        <FormikProvider value={formik}>
            <ElevatedStack
                className='hide-scroll-bar'
                p={{ xs: 1, md: 2 }}
                gap={2}
                sx={{
                    overflow: 'hidden'
                }}>
                <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                    <Typography variant='h3' fontSize={'1.2rem'} fontWeight={700} sx={{ opacity: 0.6, pb: 1 }} >
                        FILTERS
                    </Typography>
                    <Stack direction='row' sx={{ gap: { xs: 1, md: 2 } }}>
                        {isLoggedIn && <ElevatedButton variant='outlined' disabled={isPending} onClick={setPreferenceHandler}>
                            {isPending ? 'Updating...' : 'Apply Preference'}
                        </ElevatedButton>}
                        <ElevatedButton variant='outlined' disabled={isPending} onClick={resetHandler}>
                            Reset
                        </ElevatedButton>
                    </Stack>
                </Stack>
                <Stack
                    className='hide-scroll-bar'
                    gap={2}
                    sx={{
                        py: 1,
                        px: 0.5,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        maxWidth: '100%',
                    }}>

                    {!isLoggedIn && <ButtonGroup fullWidth>
                        <GenderButton gender='men' value={formik.values.gender} setValue={setGenderValue} />
                        <GenderButton gender='women' value={formik.values.gender} setValue={setGenderValue} />
                    </ButtonGroup>}
                    {filterInputPropsList.map(({ input_prop = {}, ...props }) => (
                        <Stack key={props.label} alignItems={'center'} gap={2} direction='row'>
                            <InputLabel label={props.label} />
                            <InputField {...props} hideLabel elevation={props.elevation !== undefined ? props.elevation : - 1} style={{ flex: 1 }} input_prop={{ size: 'small', sx: { borderRadius: '10px' }, ...input_prop }} />
                        </Stack>
                    ))}
                </Stack>
                <Stack gap={2} direction='row'>
                    <ElevatedButton fullWidth elevation={-1} onClick={toggleFilterHandler}>
                        Cancel
                    </ElevatedButton>
                    <ElevatedButton fullWidth variant='contained'
                        onClick={formik.handleSubmit}
                    >
                        Apply
                    </ElevatedButton>
                </Stack>
            </ElevatedStack >
        </FormikProvider>
    )
}

export default function Filters({ open, formik, toggleFilterHandler, applyFiltersHandler }) {
    return (
        <CustomModal sx={{ p: 0, width: '600px' }} open={open} onClose={toggleFilterHandler}>
            <FilterElevatedStack sx={{ width: '100%' }} formik={formik} toggleFilterHandler={toggleFilterHandler} applyFiltersHandler={applyFiltersHandler} />
        </CustomModal>
    )
}
