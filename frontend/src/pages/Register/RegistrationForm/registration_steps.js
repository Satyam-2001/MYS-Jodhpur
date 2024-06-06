import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { disability, gender, height, manglik } from '../../../data/selectionData';
import { Typography } from '@mui/material';


const registration_steps = [
    {
        label: 'Create Profile',
        icon: <EditIcon />,
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
        inputField: [
            { label: 'Email', type: 'email' },
            { label: 'Phone Number', type: 'tel' },
            { label: 'Password', type: 'password' },
        ],
    }
];

export default registration_steps
