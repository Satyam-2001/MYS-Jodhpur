import React from 'react'
import { FormControl, Slider, Stack, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom';
import InputLabel from './InputLabel';

export default function RangeSliderSelection({ title, min, max, format = (data) => data }) {
    const minParam = `min_${title}`, maxParam = `max_${title}`
    const [searchParams, setSearchParams] = useSearchParams()
    const min_value = searchParams.get(minParam) || min
    const max_value = searchParams.get(maxParam) || max
    const isAbove = +max_value == max
    const value = [min_value, max_value]

    const handleRangeChange = (event, newValue) => {
        setSearchParams((searchParams) => {
            if (newValue[0] === min) searchParams.delete(minParam)
            else searchParams.set(minParam, newValue[0])
            if (newValue[1] === max) searchParams.delete(maxParam)
            else searchParams.set(maxParam, newValue[1])
            return searchParams
        })
    }

    return (
        <Stack alignItems={'center'} gap={2} direction='row'>
            <InputLabel label={title} />
            <Slider
                // valueLabelFormat={value => undefined}
                sx={{ mx: 1 }}
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
                        label: isAbove ? 'above' : format(max_value)
                    },
                ]}
            />
        </Stack>
    )
}