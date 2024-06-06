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
import moment from 'moment';
import { heightConverter } from './selectionData';
import { heightFormat } from '../utils';


const parameters = [
    {
        value: 'height',
        Icon: StraightenIcon,
        format: (data) => {
            const height = data?.height
            if (!height) return null
            return heightFormat(height)
        }
    },
    {
        value: 'occupation',
        Icon: WorkIcon
    },
    {
        value: 'location',
        Icon: LocationOnIcon
    },
    {
        value: 'education',
        Icon: SchoolIcon
    },
    {
        value: 'income',
        Icon: WalletIcon,
        format: (data) => {
            const income = data?.income
            if (!income) return null
            return `${income} lakhs`
        }
    },
    {
        value: 'date of birth',
        Icon: CakeIcon,
        format: (data) => {
            return moment(new Date(data.date_of_birth)).format('Do MMMM, YYYY')
        }
    },
    {
        value: 'martial status',
        Icon: HandshakeIcon
    },
    {
        value: 'diet',
        Icon: RestaurantIcon
    },
    {
        value: 'weight category',
        Icon: FitnessCenterIcon
    },
    {
        value: 'manglik',
        Icon: StarIcon
    },
    {
        value: 'disability',
        Icon: AccessibleForwardOutlinedIcon,
        format: (data) => {
            const disability = data.disability
            if (!disability) return null
            if (disability === 'No') return 
            return 'Disabled'
        }
    },
    {
        value: 'color',
        Icon: FaceOutlinedIcon,
    },
    {
        value: 'disease',
        Icon: CoronavirusOutlinedIcon,
        format: (data) => {
            const disease = data.disease
            if (!disease || disease === 'None') return null
            return disease
        }
    }
]

export function getParameters(data) {
    const formattedParameters = parameters.map((params) => {
        const { value, Icon } = params
        const key = value.toLowerCase().replaceAll(' ', '_')
        const field = params.format ? params.format(data) : data?.[key]
        return { Icon, value: field }
    }).filter(({ value }) => Boolean(value))
    return formattedParameters
}

export default parameters