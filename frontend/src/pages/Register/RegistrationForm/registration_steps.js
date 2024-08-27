import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { disability, education, gender, height, manglik, occupation } from '../../../data/selectionData';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import LocationInput from '../../../components/LocationInput';
import { Component } from 'react';
import OccupationInput from '../../../components/OccupationInput';
import EducationInput from '../../../components/EducationInput';

const registration_steps = [
    {
        label: 'Basic Details',
        icon: <EditIcon />,
        initialValues: {
            name: '',
            gender: 'Men',
            date_of_birth: dayjs('2000-01-01'),
            height: '',
        },
        inputField: [
            { label: 'Name' },
            { label: 'Gender', type: 'select', menuItems: gender },
            { label: 'Date Of Birth', type: 'date' },
            { label: 'Height', type: 'select', menuItems: height },
        ],
    },
    {
        label: 'Education & Career Details',
        icon: <GroupAddIcon />,
        initialValues: {
            education: '',
            occupation: '',
            income: '',
            location: '',
        },
        inputField: [
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
                label: 'Occupation',
                type: 'autocomplete',
                menuItems: occupation,
                input_prop: {
                    getOptionLabel: (option) => option.label,
                    groupBy: (option) => option.category,
                }
            },
            { label: 'Income', type: 'number', InputProps: { endAdornment: <Typography fontWeight={500}>lakhs</Typography> } },
            { label: 'Current Location', type: 'location', name: 'location' },
        ],
    },
    // {
    //     label: 'Family Details',
    //     icon: <FamilyRestroomIcon />,
    //     initialValues: {
    //         father_name: '',
    //         father_occupation: '',
    //         mother_name: '',
    //         mother_occupation: '',
    //     },
    //     inputField: [
    //         { label: 'Father Name' },
    //         { label: 'Father Occupation' },
    //         { label: 'Mother Name' },
    //         { label: 'Mother Occupation' },
    //     ],
    // },
    {
        label: 'Authentication',
        icon: <SecurityIcon />,
        initialValues: {
            email: '',
            phone_number: '',
            password: '',
        },
        inputField: [
            { label: 'Email', type: 'email' },
            { label: 'Phone Number', type: 'tel' },
            { label: 'Password', type: 'password' },
        ]
    }
];

export default registration_steps
