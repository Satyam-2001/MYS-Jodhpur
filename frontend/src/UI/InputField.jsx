import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import PasswordInput from './PasswordInput';


function InputField(props) {
    const { label, formikState, hideLabel, ...prop } = props
    const { values, handleChange, handleBlur = () => { }, errors = {}, touched = {}, setFieldValue = () => { } } = formikState
    const type = props.type || 'text'
    const name = label.toLowerCase().replaceAll(' ', '_')
    let InputFieldComponent;
    switch (type) {
        case 'password': {
            InputFieldComponent = <PasswordInput
                required
                label={label}
                placeholder={label}
                fullWidth
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors[name] && touched[name]}
            />
            break;
        }
        case 'select': {
            InputFieldComponent = <FormControl fullWidth>
                {!hideLabel && <InputLabel id={`label-${name}`} error={errors[name] && touched[name]}>{label}</InputLabel>}
                <Select
                    id={name}
                    label={hideLabel ? undefined : label}
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors[name] && touched[name]}
                >
                    {props.menuItems.map((item) => {
                        let value = item, name = item;
                        if (typeof item === 'object') {
                            value = item.value
                            name = item.name
                        }
                        return <MenuItem key={value} value={value}>{name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            break;
        }
        case 'time': {
            InputFieldComponent = <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker
                        sx={{ width: '100%' }}
                        label={label}
                        name={name}
                        value={dayjs(values[name])}
                        onChange={(value) => setFieldValue(name, value)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            break;
        }
        case 'date': {
            InputFieldComponent = <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        sx={{ width: '100%' }}
                        label={label}
                        name={name}
                        value={dayjs(values[name])}
                        onChange={(value) => setFieldValue(name, value)}
                        format="DD-MM-YYYY"
                    />
                </DemoContainer>
            </LocalizationProvider>
            break;
        }
        default: {
            InputFieldComponent = <TextField
                variant='outlined'
                type={type}
                label={label}
                placeholder={label}
                fullWidth
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors[name] && touched[name]}
                {...prop}
            />
        }
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