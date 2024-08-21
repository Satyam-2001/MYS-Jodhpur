import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Stack, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import PasswordInput from './PasswordInput';
import { ElevatedStack } from './ElevatedComponents';
import { useFormikContext } from 'formik';
import LocationInput from '../components/LocationInput';


function InputField(props) {
    const formik = useFormikContext()
    const {
        name: tempName,
        type = 'text',
        label,
        formikState = formik,
        hideLabel,
        elevation,
        sx = {},
        style = {},
        input_prop = {},
        ...prop
    } = props
    const { values = {}, handleChange, handleBlur = () => { }, errors = {}, touched = {}, setFieldValue = () => { } } = formikState || {}
    const name = tempName || label.toLowerCase().replaceAll(' ', '_')
    let InputFieldComponent;

    function commonInputProps() {
        return {
            id: name,
            name,
            label: hideLabel ? undefined : label,
            value: values[name],
            onBlur: handleBlur,
            onChange: handleChange,
            error: errors[name] && touched[name],
            fullWidth: true,
        }
    }
    switch (type) {
        case 'password': {
            InputFieldComponent = <PasswordInput
                {...commonInputProps()}
                required
                placeholder={label}
            />
            break;
        }
        case 'autocomplete': {
            function transformValue() {
                const value = values[name]
                if (!value) return input_prop.multiple ? [] : undefined
                if (!input_prop.multiple || typeof value !== 'string') {
                    if (!input_prop.getOptionLabel) return value
                    return props.menuItems.find(data => value === input_prop.getOptionLabel(data))
                }
                const array = values[name].split(',').map(s => s.trim())
                if (!input_prop.getOptionLabel) return array
                return props.menuItems.filter(data => array.includes(input_prop.getOptionLabel(data)))
            }
            function changeHandler(event, value) {
                if (!input_prop.multiple) {
                    if (!input_prop.getOptionLabel) return setFieldValue(name, value)
                    return setFieldValue(name, value && input_prop.getOptionLabel(value))
                }
                if (!input_prop.getOptionLabel) return setFieldValue(name, value.join(', '))
                setFieldValue(name, value.map(input_prop.getOptionLabel).join(', '))
            }
            InputFieldComponent = <Autocomplete
                {...commonInputProps()}
                disablePortal
                fullWidth
                options={props.menuItems || []}
                value={transformValue()}
                onChange={changeHandler}
                renderInput={(params) => <TextField {...params} label={label} />}
                {...input_prop}
            />
            break;
        }
        case 'select': {
            InputFieldComponent = <FormControl fullWidth sx={style} >
                {!hideLabel && <InputLabel id={`label-${name}`} error={errors[name] && touched[name]}>{label}</InputLabel>}
                <Select
                    {...commonInputProps()}
                    {...input_prop}
                    sx={{ borderRadius: '5px' }}
                    value={input_prop.multiple && typeof values[name] === 'string' ? (values[name] ? values[name].split(',') : []) : values[name]}
                    onChange={(event) => {
                        if (input_prop.multiple) {
                            setFieldValue(name, event.target.value.join(','))
                            return;
                        }
                        handleChange(event)
                    }}
                >
                    {props.menuItems.map((item) => {
                        let value = item, name = item;
                        if (typeof item === 'object') {
                            value = item.value
                            name = item.name
                        }
                        return <MenuItem key={value} value={value} >{name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            break;
        }
        case 'time': {
            InputFieldComponent = <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    {...commonInputProps()}
                    sx={{ width: '100%' }}
                    value={dayjs(values[name])}
                    onChange={(value) => setFieldValue(name, value)}
                />
            </LocalizationProvider>
            break;
        }
        case 'date': {
            InputFieldComponent = <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DemoContainer components={['DatePicker']}> */}
                <DatePicker
                    {...commonInputProps()}
                    sx={{ width: '100%' }}
                    value={dayjs(values[name])}
                    onChange={(value) => setFieldValue(name, value)}
                    format="DD-MM-YYYY"
                />
                {/* </DemoContainer> */}
            </LocalizationProvider>
            break;
        }
        case 'range': {
            const format = prop.format || ((v) => v)
            const value = [values[`min_${name}`] || prop.min, values[`max_${name}`] || prop.max]
            const handleRangeChange = (event, value) => {
                setFieldValue(`min_${name}`, value[0])
                setFieldValue(`max_${name}`, value[1])
            }
            InputFieldComponent =
                <Stack direction='row' gap={2} px={2} sx={{ alignItems: 'center', width: '100%' }}>
                    {!hideLabel && <Typography id={`label-${name}`} error={errors[name] && touched[name]}>{label}</Typography>}
                    <Slider
                        // valueLabelFormat={value => undefined}
                        sx={{ mx: hideLabel ? 0 : 1 }}
                        // valueLabelFormat={value => <Typography color='white' fontSize={'0.9rem'}>{format(value)}</Typography>}
                        min={prop.min}
                        max={prop.max}
                        getAriaLabel={() => `range`}
                        value={value}
                        onChange={handleRangeChange}
                        // valueLabelDisplay="auto"
                        getAriaValueText={(value) => value}
                        marks={[
                            {
                                value: value[0],
                                label: format(value[0])
                            },
                            {
                                value: value[1],
                                label: +value[1] == prop.max ? 'above' : format(value[1])
                            },
                        ]}
                    />
                </Stack>
            break;
        }
        case 'location': {
            InputFieldComponent = <LocationInput
                formikState={formikState}
                {...props}
            />
            break;
        }
        default: {
            InputFieldComponent = <TextField
                {...commonInputProps()}
                variant='outlined'
                type={type}
                placeholder={label}
                fullWidth
                {...prop}
            />
        }
    }

    if (elevation !== false) {
        InputFieldComponent = <ElevatedStack sx={{ width: '100%', borderRadius: '5px', ...sx }} elevation={elevation}>
            {InputFieldComponent}
        </ElevatedStack>
    }


    return (
        <Fragment>
            {InputFieldComponent}
            {errors[name] && touched[name] && (
                <Typography color='error'>
                    {errors[name]}
                </Typography>
            )}
        </Fragment>
    )

}

export default InputField