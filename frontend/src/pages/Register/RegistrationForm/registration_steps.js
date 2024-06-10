import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { disability, gender, height, manglik } from '../../../data/selectionData';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const registration_steps = [
    {
        label: 'Create Profile',
        icon: <EditIcon />,
        initialValues: {
            name: '',
            gender: 'Men',
            date_of_birth: dayjs('2000-01-01'),
            time_of_birth: dayjs('2001-01-01'),
            place_of_birth: '',
            disability: '',
        },
        inputField: [
            { label: 'Name' },
            { label: 'Gender', type: 'select', menuItems: gender },
            { label: 'Date Of Birth', type: 'date' },
            { label: 'Time Of Birth', type: 'time' },
            { label: 'Place Of Birth' },
            { label: 'Disability', type: 'select', menuItems: disability },
        ],
    },
    {
        label: 'Basic details',
        icon: <GroupAddIcon />,
        initialValues: {
            education: '',
            occupation: '',
            income: '',
            height: '',
            location: '',
            manglik: '',
        },
        inputField: [
            { label: 'Education' },
            { label: 'Occupation' },
            { label: 'Income', type: 'number', InputProps: { endAdornment: <Typography fontWeight={500}>lakhs</Typography> } },
            { label: 'Location' },
            { label: 'Height', type: 'select', menuItems: height },
            { label: 'Manglik', type: 'select', menuItems: manglik },
        ],
    },
    {
        label: 'Family Details',
        icon: <FamilyRestroomIcon />,
        initialValues: {
            father_name: '',
            father_occupation: '',
            mother_name: '',
            mother_occupation: '',
        },
        inputField: [
            { label: 'Father Name' },
            { label: 'Father Occupation' },
            { label: 'Mother Name' },
            { label: 'Mother Occupation' },
        ],
    },
    {
        label: 'Verify Email',
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
        ],
    }
];

export default registration_steps
