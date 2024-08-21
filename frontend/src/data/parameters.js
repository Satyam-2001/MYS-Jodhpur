import BoyIcon from '@mui/icons-material/Boy';
import ChurchIcon from '@mui/icons-material/Church';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SchoolIcon from '@mui/icons-material/School';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarIcon from '@mui/icons-material/Star';
import CakeIcon from '@mui/icons-material/Cake';
import StraightenIcon from '@mui/icons-material/Straighten';
import WalletIcon from '@mui/icons-material/Wallet';
import ScaleIcon from '@mui/icons-material/Scale';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import TranslateIcon from '@mui/icons-material/Translate';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import moment from 'moment';
import { complexion, disability, drink, education, employed_in, gender, height, heightConverter, language, manglik, martial_status, occupation, religion, weight_category } from './selectionData';
import { dateFormat, heightFormat, incomeFormat, max_height, min_height, timeFormat } from '../utils';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FemaleIcon from '@mui/icons-material/Female';

function getNameFromLabel(label) {
    return label.toLowerCase().replaceAll(' ', '_')
}

const name_param = {
    label: 'Name',
    Icon: DriveFileRenameOutlineIcon,
    hide: true,
}

const geneder_param = {
    label: 'Gender',
    menuItems: gender,
    Icon: FemaleIcon,
    hide: true,
    type: 'select',
}

const height_param = {
    label: 'Height',
    menuItems: height,
    Icon: StraightenIcon,
    format: heightFormat,
    value: (data) => data.value,
    type: 'select',
    min: min_height,
    max: max_height,
}

const location_param = {
    label: 'Location',
    Icon: LocationOnIcon,
    type: 'location',
    format: (value) => value?.split(',')?.[0]
}



const mother_tongue_param = {
    label: 'Mother Tongue',
    menuItems: language,
    Icon: TranslateIcon,
    type: 'select',
}

const education_param = {
    label: 'Education',
    Icon: SchoolIcon,
    type: 'select',
    menuItems: education,
    input_prop: {
        multiple: true,
        getOptionLabel: (option) => option.label,
        groupBy: (option) => option.category,
    }
}

const employed_in_param = {
    label: 'Employed In',
    Icon: BadgeOutlinedIcon,
    type: 'select',
    menuItems: employed_in,
}

const occupation_param = {
    label: 'Occupation',
    Icon: WorkIcon,
    menuItems: occupation,
    type: 'select',
    input_prop: {
        getOptionLabel: (option) => option.label,
        groupBy: (option) => option.category,
    }
}

const college_param = {
    label: 'College',
    Icon: AccountBalanceOutlinedIcon,
}

const company_name_param = {
    label: 'Company Name',
    Icon: BusinessOutlinedIcon,
}

const income_param = {
    label: 'Income',
    Icon: WalletIcon,
    format: incomeFormat,
    type: 'educational',
}

const date_of_birth_param = {
    label: 'Date of birth',
    Icon: CakeIcon,
    format: dateFormat,
    type: 'date',
}

const time_of_birth_param = {
    label: 'Time of birth',
    Icon: CakeIcon,
    format: timeFormat,
    type: 'time',
}

const weight_category_param = {
    label: 'Weight Category',
    Icon: FitnessCenterIcon,
    type: 'select',
    menuItems: weight_category,
}

const complexion_param = {
    label: 'Complexion',
    Icon: FaceOutlinedIcon,
    type: 'select',
    menuItems: complexion,
}

const manglik_param = {
    label: 'manglik',
    Icon: StarIcon,
    type: 'select',
    menuItems: manglik,
}

const disability_param = {
    label: 'Disability',
    Icon: AccessibleForwardOutlinedIcon,
    format: (value) => value === 'Yes' ? 'Disabled' : 'No',
    // format: (value) => !value && value === 'No' ? ,
    hide: (value) => !value && value === 'No',
    menuItems: disability,
}

const martial_status_param = {
    label: 'Martial Status',
    Icon: HandshakeIcon,
    menuItems: martial_status,
    type: 'select',
}

const diet_param = {
    label: 'Diet',
    Icon: RestaurantIcon,
    type: 'select'
}

const disease_param = {
    label: 'Disease',
    Icon: CoronavirusOutlinedIcon,
    type: 'select',
    input_prop: {
        multiple: true
    }
}

const drinks_param = {
    label: 'Drinks',
    Icon: LocalBarIcon,
    type: 'select',
    menuItems: drink,
}

const smoke_param = {
    label: 'Smoke',
    Icon: SmokingRoomsIcon,
    type: 'select',
    menuItems: drink,
}


export const profile_params_list = [
    height_param,
    location_param,
    education_param,
    occupation_param,
    income_param,
    mother_tongue_param,
]

export const personal_details_list = [
    name_param,
    date_of_birth_param,
    geneder_param,
    location_param,
    mother_tongue_param,
    height_param,
    weight_category_param,
    complexion_param,
    manglik_param,
    martial_status_param,
    disability_param,
    disease_param
]

export const education_and_career_list = [
    education_param,
    employed_in_param,
    occupation_param,
    college_param,
    company_name_param,
    income_param
]

export const lifestyle_list = [
    diet_param,
    drinks_param,
    smoke_param,
]

const parameters = [
    {
        value: 'height',
        Icon: StraightenIcon,
        format: (data) => {
            const height = data?.height
            if (!height) return null
            return heightFormat(height)
        },
        type: 'personal',
    },
    {
        value: 'location',
        Icon: LocationOnIcon,
        type: 'personal',
        format: (data) => {
            const location = data?.location
            if (!location) return null
            return location.split(',')[0]
        },
    },
    {
        value: 'mother tongue',
        Icon: TranslateIcon,
        type: 'personal'
    },
    {
        value: 'education',
        Icon: SchoolIcon,
        type: 'educational',
    },
    {
        value: 'college',
        Icon: AccountBalanceOutlinedIcon,
        type: 'educational',
        list: true,
    },
    {
        value: 'occupation',
        Icon: WorkIcon,
        type: 'educational',
    },
    {
        value: 'company name',
        Icon: BusinessOutlinedIcon,
        type: 'educational',
        list: true,
    },
    {
        value: 'income',
        Icon: WalletIcon,
        format: (data) => {
            const income = data?.income
            if (!income) return null
            return `${income} lakhs`
        },
        type: 'educational',
    },
    {
        value: 'date of birth',
        Icon: CakeIcon,
        format: (data) => {
            return moment(new Date(data.date_of_birth)).format('Do MMM, YYYY')
        },
        type: 'personal',
        list: true,
    },
    {
        value: 'martial status',
        Icon: HandshakeIcon,
        type: 'personal',
        list: true,
    },
    {
        value: 'weight category',
        Icon: FitnessCenterIcon,
        list: true,
        type: 'personal',
    },
    {
        value: 'manglik',
        Icon: StarIcon,
        list: true,
        type: 'personal',

    },
    {
        value: 'disability',
        Icon: AccessibleForwardOutlinedIcon,
        format: (data) => {
            const disability = data.disability
            if (!disability) return null
            if (disability === 'No') return
            return 'Disabled'
        },
        type: 'personal',
    },
    {
        value: 'complexion',
        Icon: FaceOutlinedIcon,
        list: true,
        type: 'personal',
    },
    {
        value: 'disease',
        Icon: CoronavirusOutlinedIcon,
        format: (data) => {
            const disease = data.disease
            if (!disease || disease === 'None') return null
            return disease
        },
        type: 'personal',
    },
    {
        value: 'diet',
        Icon: RestaurantIcon,
        list: true,
        type: 'lifestyle'
    },
    {
        value: 'drinks',
        Icon: LocalBarIcon,
        list: true,
        type: 'lifestyle',
    },
    {
        value: 'smoke',
        Icon: SmokingRoomsIcon,
        list: true,
        type: 'lifestyle',
    },
]

export function getParameters(data, { type } = {}) {
    const formattedParameters = parameters.map(({ value, Icon, ...params }) => {
        const key = value.toLowerCase().replaceAll(' ', '_')
        const field = params.format ? params.format(data) : data?.[key]
        return { Icon, label: value, value: field, ...params }
    }).filter(({ value, type: _type }) => Boolean(value) && (!type || type === _type))
    return formattedParameters
}

export default parameters
