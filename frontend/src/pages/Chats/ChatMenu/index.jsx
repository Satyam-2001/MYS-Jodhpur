import { Stack } from '@mui/material'
import React from 'react'
import SearchBar from './SearchBar'
import MenuItem from './MenuItem'
import Block from '../../../UI/Block'

const profiles = [
    {
        id: '10023',
        first_name: 'Shivam',
        last_name: 'Lohiya',
        mother_tongue: 'Hindi',
        gender: 'male',
        age: 30,
        dob: '30 Oct, 1994',
        images: ['https://media-pnq1-2.cdn.whatsapp.net/v/t61.24694-24/422491773_1111066909915493_2754799455267601243_n.jpg?ccb=11-4&oh=01_Q5AaIK_pd6aqK9zp3gvAm-Byf2jlUuUPi6qgML3xo-CeUj7j&oe=6659999F&_nc_sid=e6ed6c&_nc_cat=111'],
        height: `5" 9' (178 cm)`,
        income: '10 lakhs',
        religion: 'Hindu',
        community: 'Maheshwari',
        education: 'BCA, MCA',
        profession: 'Software Developer',
        location: 'Jodhpur, Rajasthan',
        status: 'Never Married',
        diet: 'Vegetarian',
        manglik: 'Non Manglik'
    },
    {
        id: '10023',
        first_name: 'Shivam',
        last_name: 'Lohiya',
        mother_tongue: 'Hindi',
        gender: 'male',
        age: 30,
        dob: '30 Oct, 1994',
        images: ['https://media-pnq1-2.cdn.whatsapp.net/v/t61.24694-24/422491773_1111066909915493_2754799455267601243_n.jpg?ccb=11-4&oh=01_Q5AaIK_pd6aqK9zp3gvAm-Byf2jlUuUPi6qgML3xo-CeUj7j&oe=6659999F&_nc_sid=e6ed6c&_nc_cat=111'],
        height: `5" 9' (178 cm)`,
        income: '10 lakhs',
        religion: 'Hindu',
        community: 'Maheshwari',
        education: 'BCA, MCA',
        profession: 'Software Developer',
        location: 'Jodhpur, Rajasthan',
        status: 'Never Married',
        diet: 'Vegetarian',
        manglik: 'Non Manglik'
    },
]

export default function ChatMenu() {
    return (
        <Block
            gap={1}
            p={1}
            sx={{
                width: { xs: '100%', md: '350px' },
                height: '100%',
                overflow: 'auto',
                justifyContent: 'flex-start'
            }}
        >
            <SearchBar />
            <Stack gap='3px'>
                {profiles.map((user) => <MenuItem user={user} />)}
            </Stack>
        </Block>
    )
}
