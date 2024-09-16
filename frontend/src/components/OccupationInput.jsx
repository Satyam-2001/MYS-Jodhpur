import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { elevation } from '../theme/styles'

const occupation = [
    { label: 'Accounting Professional', category: 'Banking & Finance' },
    { label: 'Share Broker', category: 'Banking & Finance' },
    { label: 'Auditor', category: 'Banking & Finance' },
    { label: 'Banking Professional', category: 'Banking & Finance' },
    { label: 'Charted Accountant', category: 'Banking & Finance' },
    { label: 'Finance Professional', category: 'Banking & Finance' },
    { label: 'Actor/Model', category: 'Advertising, Media & Entertainment' },
    { label: 'Advertising Professional', category: 'Advertising, Media & Entertainment' },
    { label: 'Film/ Entertainment Professional', category: 'Advertising, Media & Entertainment' },
    { label: 'Journalist', category: 'Advertising, Media & Entertainment' },
    { label: 'Media Professional', category: 'Advertising, Media & Entertainment' },
    { label: 'PR Professional', category: 'Advertising, Media & Entertainment' },
    { label: 'Admin Professional', category: 'Administration' },
    { label: 'Clerk', category: 'Administration' },
    { label: 'Operator/Technician', category: 'Administration' },
    { label: 'Secretary/Front Office', category: 'Administration' },
    { label: 'Agriculture Professional', category: 'Agricultural' },
    { label: 'Farming', category: 'Agricultural' },
    { label: 'Airline Professional', category: 'Airline & Aviation' },
    { label: 'Flight Attendant', category: 'Airline & Aviation' },
    { label: 'Pilot', category: 'Airline & Aviation' },
    { label: 'Analyst', category: 'Corporate Management Professionals' },
    { label: 'Consultant', category: 'Corporate Management Professionals' },
    { label: 'Corporate Communication', category: 'Corporate Management Professionals' },
    { label: 'Corporate Planning', category: 'Corporate Management Professionals' },
    { label: 'HR Professional', category: 'Corporate Management Professionals' },
    { label: 'Marketing Professional', category: 'Corporate Management Professionals' },
    { label: 'Operations Management', category: 'Corporate Management Professionals' },
    { label: 'Product Manager', category: 'Corporate Management Professionals' },
    { label: 'Program Manager', category: 'Corporate Management Professionals' },
    { label: 'Project Manager - IT', category: 'Corporate Management Professionals' },
    { label: 'Project Manager - Non IT', category: 'Corporate Management Professionals' },
    { label: 'Sales Professional', category: 'Corporate Management Professionals' },
    { label: 'Sr. Manager/ Manager', category: 'Corporate Management Professionals' },
    { label: 'Subject Matter Expert', category: 'Corporate Management Professionals' },
    { label: 'Animator', category: 'Software & IT' },
    { label: 'Cyber/Network Security', category: 'Software & IT' },
    { label: 'Project Lead - IT', category: 'Software & IT' },
    { label: 'Quality Assurance Engineer - IT', category: 'Software & IT' },
    { label: 'Software Professional', category: 'Software & IT' },
    { label: 'UI/UX Designer', category: 'Software & IT' },
    { label: 'Web/Graphic Designer', category: 'Software & IT' },
    { label: 'Architect', category: 'Architecture' },
    { label: 'BPO/ITes Professional', category: 'BPO & Customer Service' },
    { label: 'Customer Service', category: 'BPO & Customer Service' },
    { label: 'CxO/ Chairman/ President/ Director', category: 'Top Management' },
    { label: 'VP/ AVP/ GM/ DGM', category: 'Top Management' },
    { label: 'Dentist', category: 'Doctor' },
    { label: 'Doctor', category: 'Doctor' },
    { label: 'Surgeon', category: 'Doctor' },
    { label: 'Education Professional', category: 'Education & Training' },
    { label: 'Educational Institution Owner', category: 'Education & Training' },
    { label: 'Librarian', category: 'Education & Training' },
    { label: 'Professor/Lecturer', category: 'Education & Training' },
    { label: 'Research Assistant', category: 'Education & Training' },
    { label: 'Teacher', category: 'Education & Training' },
    { label: 'Electronics Engineering', category: 'Engineering' },
    { label: 'Hardware/Telecom Engineer', category: 'Engineering' },
    { label: 'Non - IT Engineer', category: 'Engineering' },
    { label: 'Quality Assurance Engineer', category: 'Engineering' },
    { label: 'Hotels/Hospitality Professional', category: 'Hospitality' },
    { label: 'Lawyer & Legal Professional', category: 'Legal' },
    { label: 'Mariner', category: 'Merchant Navy' },
    { label: 'Merchant Naval Officer', category: 'Merchant Navy' },
    { label: 'Medical/ Healthcare Professional', category: 'Other Medical & Healthcare' },
    { label: 'Nurse', category: 'Other Medical & Healthcare' },
    { label: 'Paramedic', category: 'Other Medical & Healthcare' },
    { label: 'Pharmacist', category: 'Other Medical & Healthcare' },
    { label: 'Physiotherapist', category: 'Other Medical & Healthcare' },
    { label: 'Psychologist', category: 'Other Medical & Healthcare' },
    { label: 'Veterinary Doctor', category: 'Other Medical & Healthcare' },
    { label: 'Research Professional', category: 'Science & Research' },
    { label: 'Science Professional', category: 'Science & Research' },
    { label: 'Scientist', category: 'Science & Research' },
    { label: 'Agent', category: 'Others' },
    { label: 'Artist', category: 'Others' },
    { label: 'Beautician', category: 'Others' },
    { label: 'Broker', category: 'Others' },
    { label: 'Business', category: 'Others' },
    { label: 'Fashion Designer', category: 'Others' },
    { label: 'Entrepreneur', category: 'Others' },
    { label: 'Interior Designer', category: 'Others' },
    { label: 'Others', category: 'Others' },
    { label: 'Security Professional', category: 'Others' },
    { label: 'Singer', category: 'Others' },
    { label: 'Social Service/ NGO/ Volunteer', category: 'Others' },
    { label: 'Sportsperson', category: 'Others' },
    { label: 'Travel Professional', category: 'Others' },
    { label: 'Writer', category: 'Others' },
]

export default function OccupationInput({ formikState, ...props }) {
    const name = props.label.toLowerCase()
    const value = formikState.values[name]
    return (
        <Autocomplete
            disablePortal
            fullWidth
            sx={{ boxShadow: elevation() }}
            id="occupation"
            options={occupation}
            getOptionLabel={(option) => option.label}
            groupBy={(option) => option.category}
            name={name}
            label={props.label}
            inputValue={value}
            onInputChange={(e, v) => {
                formikState.setFieldValue(name, v)
            }}
            renderInput={(params) => <TextField {...params} label={'Occupation'} />}
        />
    )
}
