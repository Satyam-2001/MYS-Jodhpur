import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import { elevation } from '../theme/styles'

const education = [
    { label: 'A.M.E.', category: 'Engineering/Technology/Design' },
    { label: 'B.Arch', category: 'Engineering/Technology/Design' },
    { label: 'B.Des', category: 'Engineering/Technology/Design' },
    { label: 'B.E/B.Tech', category: 'Engineering/Technology/Design' },
    { label: 'B.FAD', category: 'Engineering/Technology/Design' },
    { label: 'B.HTech', category: 'Engineering/Technology/Design' },
    { label: 'B.Pharma', category: 'Engineering/Technology/Design' },
    { label: 'B.Tech LL.B.', category: 'Engineering/Technology/Design' },
    { label: 'BID', category: 'Engineering/Technology/Design' },
    { label: 'CISE', category: 'Engineering/Technology/Design' },
    { label: 'ITIL', category: 'Engineering/Technology/Design' },
    { label: 'M.Arch', category: 'Engineering/Technology/Design' },
    { label: 'M.Des', category: 'Engineering/Technology/Design' },
    { label: 'M.E/M.Tech', category: 'Engineering/Technology/Design' },
    { label: 'M.FTech', category: 'Engineering/Technology/Design' },
    { label: 'M.Pharma', category: 'Engineering/Technology/Design' },
    { label: 'M.S. (Engineering)', category: 'Engineering/Technology/Design' },
    { label: 'MIB', category: 'Engineering/Technology/Design' },
    { label: 'MID', category: 'Engineering/Technology/Design' },
    { label: 'MPD', category: 'Engineering/Technology/Design' },
    { label: 'BCA', category: 'Computers' },
    { label: 'DCA', category: 'Computers' },
    { label: 'MCA', category: 'Computers' },
    { label: 'MCM', category: 'Computers' },
    { label: 'PGDCA', category: 'Computers' },
    { label: 'B.Com', category: 'Finance/Commerce/Economics' },
    { label: 'B.Com (Hons)', category: 'Finance/Commerce/Economics' },
    { label: 'BBE', category: 'Finance/Commerce/Economics' },
    { label: 'BBI', category: 'Finance/Commerce/Economics' },
    { label: 'CA', category: 'Finance/Commerce/Economics' },
    { label: 'CFA', category: 'Finance/Commerce/Economics' },
    { label: 'CFP', category: 'Finance/Commerce/Economics' },
    { label: 'CIA', category: 'Finance/Commerce/Economics' },
    { label: 'CPA', category: 'Finance/Commerce/Economics' },
    { label: 'CS', category: 'Finance/Commerce/Economics' },
    { label: 'ICWA', category: 'Finance/Commerce/Economics' },
    { label: 'M.Com', category: 'Finance/Commerce/Economics' },
    { label: 'MBE', category: 'Finance/Commerce/Economics' },
    { label: 'MBF', category: 'Finance/Commerce/Economics' },
    { label: 'MFC', category: 'Finance/Commerce/Economics' },
    { label: 'MFM', category: 'Finance/Commerce/Economics' },
    { label: 'B.H.A.', category: 'Management' },
    { label: 'BAM', category: 'Management' },
    { label: 'BBA', category: 'Management' },
    { label: 'BBM', category: 'Management' },
    { label: 'BFM', category: 'Management' },
    { label: 'BFT', category: 'Management' },
    { label: 'BHM', category: 'Management' },
    { label: 'BHMCT', category: 'Management' },
    { label: 'BHMTT', category: 'Management' },
    { label: 'BMS', category: 'Management' },
    { label: 'CWM', category: 'Management' },
    { label: 'Executive MBA/PGDM', category: 'Management' },
    { label: 'FPM', category: 'Management' },
    { label: 'MAM', category: 'Management' },
    { label: 'MBA/PGDM', category: 'Management' },
    { label: 'MBM', category: 'Management' },
    { label: 'MHA', category: 'Management' },
    { label: 'MHRM', category: 'Management' },
    { label: 'MMM', category: 'Management' },
    { label: 'MMS', category: 'Management' },
    { label: 'MTA', category: 'Management' },
    { label: 'MTM', category: 'Management' },
    { label: 'ANM', category: 'Medicine/Health' },
    { label: 'B.O.Th', category: 'Medicine/Health' },
    { label: 'B.P.E.S.', category: 'Medicine/Health' },
    { label: 'B.P.Ed', category: 'Medicine/Health' },
    { label: 'BAMS', category: 'Medicine/Health' },
    { label: 'BCVT', category: 'Medicine/Health' },
    { label: 'BDS', category: 'Medicine/Health' },
    { label: 'BHMS', category: 'Medicine/Health' },
    { label: 'BMLT', category: 'Medicine/Health' },
    { label: 'BMRIT', category: 'Medicine/Health' },
    { label: 'BMRT', category: 'Medicine/Health' },
    { label: 'BNYS', category: 'Medicine/Health' },
    { label: 'BOT', category: 'Medicine/Health' },
    { label: 'BPH', category: 'Medicine/Health' },
    { label: 'BPMT', category: 'Medicine/Health' },
    { label: 'BPO', category: 'Medicine/Health' },
    { label: 'BRDIT', category: 'Medicine/Health' },
    { label: 'BUMS', category: 'Medicine/Health' },
    { label: 'BVSc.', category: 'Medicine/Health' },
    { label: 'D.P.Ed', category: 'Medicine/Health' },
    { label: 'D.Pharma', category: 'Medicine/Health' },
    { label: 'DM', category: 'Medicine/Health' },
    { label: 'DMLT', category: 'Medicine/Health' },
    { label: 'GNM', category: 'Medicine/Health' },
    { label: 'M.D.', category: 'Medicine/Health' },
    { label: 'M.Optom.', category: 'Medicine/Health' },
    { label: 'M.S. (Medicine)', category: 'Medicine/Health' },
    { label: 'MBBS', category: 'Medicine/Health' },
    { label: 'MCh', category: 'Medicine/Health' },
    { label: 'MDS', category: 'Medicine/Health' },
    { label: 'MOT', category: 'Medicine/Health' },
    { label: 'MPT', category: 'Medicine/Health' },
    { label: 'MS', category: 'Medicine/Health' },
    { label: 'MVSc.', category: 'Medicine/Health' },
    { label: 'BL/LLB', category: 'Law' },
    { label: 'ML/LLM', category: 'Law' },
    { label: 'BA', category: 'Arts/Science' },
    { label: 'B.Ed', category: 'Arts/Science' },
    { label: 'B.Sc.', category: 'Arts/Science' },
    { label: 'BFA', category: 'Arts/Science' },
    { label: 'MA', category: 'Arts/Science' },
    { label: 'M.Ed', category: 'Arts/Science' },
    { label: 'M.Sc.', category: 'Arts/Science' },
    { label: 'MFA', category: 'Arts/Science' },
    { label: 'M.Phill', category: 'Doctorate' },
    { label: 'Ph.D', category: 'Doctorate' },
    { label: 'High School', category: 'Non-Graduate' },
    { label: 'Vocational School', category: 'Non-Graduate' },
    { label: 'Diploma', category: 'Non-Graduate' },
    { label: 'Civil Services', category: 'Civil Services' },
    { label: 'Other Bachelors', category: 'Others' },
    { label: 'Other Masters', category: 'Others' },
    { label: 'Others', category: 'Others' },
]

export default function EducationInput({ formikState, ...props }) {
    const name = props.label.toLowerCase()
    const value = formikState.values[name]
    const [v, setV] = useState([])

    return (
        <Autocomplete
            disablePortal
            fullWidth
            sx={{ boxShadow: elevation() }}
            id="education"
            options={education}
            getOptionLabel={(option) => option.label}
            groupBy={(option) => option.category}
            name={name}
            multiple
            value={v}
            onChange={(e, v) => setV(v)}
            label={props.label}
            inputValue={value}
            onInputChange={(e, v) => {
                formikState.setFieldValue(name, v)
            }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    )
}
