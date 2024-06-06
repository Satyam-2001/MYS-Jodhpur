import { Box, Button, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import CustomBiodata from './CustomBiodata'
import { CustomBiodataContext } from './CustomBiodataContext'
import { usePDF } from 'react-to-pdf';
import { ProfileContext } from '../../../context/ProfileProvider';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const biodataDesigns = [
    {
        id: 0,
        image: require('../../../assets/Biodata/5.jpg'),
        color: '#DDE3BD',
        px: 4,
        py: 6,
    },
    {
        id: 1,
        image: require('../../../assets/Biodata/1.jpg'),
        color: '#D3271D',
        px: 5,
        py: 6,
    },
    {
        id: 2,
        image: require('../../../assets/Biodata/2.jpg'),
        color: 'black',
        px: 5,
        pt: 14,
        pb: 8,
    },
    {
        id: 3,
        image: require('../../../assets/Biodata/3.jpg'),
        color: '#b55604',
        px: 7,
        py: 8,
    },
    {
        id: 4,
        image: require('../../../assets/Biodata/4.jpg'),
        color: '#bdac3c',
        px: 4,
        py: 6,
    },
]

export default function Biodata() {

    const theme = useTheme()
    const { profile } = useContext(ProfileContext)
    const { toPDF, targetRef } = usePDF({ filename: `${profile.basic_info.name}.pdf`, page: { format: [105, 148.6] } });
    const [selectedBiodata, setSelectedBiodata] = useState(biodataDesigns[0])

    return (
        <CustomBiodataContext.Provider value={selectedBiodata}>
            <Stack className='hide-scroll-bar' direction={{ xs: 'column-reverse', md: 'row-reverse' }} py={2} px={1} gap={1} overflow={'hidden'}>
                <Stack gap={1} sx={{ flex: 1 }}>
                    <Paper className='hide-scroll-bar' elevation={2} sx={{ display: 'flex', overflow: 'auto', flex: { md: 1 }, flexShrink: 0, height: { xs: '100px' }, boxSizing: 'border-box', }}>
                        <Grid container direction={{ xs: 'column', md: 'row' }}   >
                            {biodataDesigns.map((biodataDesign) => {
                                return (
                                    <Grid item xs={undefined} md={6} p={1} >
                                        <Box
                                            onClick={() => setSelectedBiodata(biodataDesign)}
                                            sx={{
                                                cursor: 'pointer',
                                                border: biodataDesign.id === selectedBiodata.id && `solid ${theme.palette.primary.main} 5px`,
                                                aspectRatio: '210/297',
                                                minHeight: { xs: '80px' },
                                                backgroundSize: '100% 100%',
                                                backgroundImage: `url(${biodataDesign.image})})`,
                                            }}
                                        />
                                    </ Grid>
                                )
                            })}
                        </Grid>
                    </Paper>
                    <Button variant='contained' onClick={toPDF}>
                        Download
                    </Button>
                </Stack>
                <Stack overflow={'auto'}  >
                    <CustomBiodata ref={targetRef} />
                </Stack>
            </Stack>
        </CustomBiodataContext.Provider>
    )
}
