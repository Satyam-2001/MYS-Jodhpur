import React, { useEffect, useState } from 'react'
import InputField from '../UI/InputField'
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks'
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { elevation } from '../theme/styles';


export default function LocationInput({ formikState, ...props }) {

    const name = props.name || props.label?.toLowerCase()
    const value = formikState.values[name] || ''
    const input = useDebounce(value, 500)

    const { data = [], isPending } = useQuery({
        queryKey: ['location', input],
        queryFn: ({ signal }) => axios.get(`https://nominatim.openstreetmap.org/search?q=${input}&format=json`, { signal }).then(res => res.data),
        enabled: input.length >= 1,
    })

    return (
        <Autocomplete
            disablePortal
            loading={isPending}
            fullWidth
            sx={{ boxShadow: elevation() }}
            id="location"
            options={data.map(data => data.display_name)}
            name={name}
            label={props.label}
            value={value}
            inputValue={value}
            onInputChange={(e, v) => {
                formikState.setFieldValue(name, v)
            }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    )
}
