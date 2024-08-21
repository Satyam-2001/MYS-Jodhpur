import { Box, Button, Grid, Modal, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import CustomBiodata from './CustomBiodata'
import { CustomBiodataContext } from './CustomBiodataContext'
import { usePDF } from 'react-to-pdf';
import { ProfileContext } from '../../../context/ProfileProvider';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ElevatedButton, ElevatedStack } from '../../../UI/ElevatedComponents';
import { APPBAR_HEIGHT, HeaderContainer, HeaderStart } from '../../../components/Layouts/Header';
import NameHeader from '../../../UI/NameHeader';


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
    {
        id: 6,
        image: require('../../../assets/Biodata/6.jpg'),
        color: '#bdac3c',
        pt: 12,
        pb: 4,
        px: 8,
    },
]

export default function Biodata() {

    const theme = useTheme()
    const { profile, isPending } = useContext(ProfileContext)
    const { toPDF, targetRef } = usePDF({
        filename: `${profile?.basic_info?.name}.pdf`,
        page: { format: [105, 148.6] },
    });
    const [selectedBiodata, setSelectedBiodata] = useState(biodataDesigns[0])
    if (isPending) return
    return (
        <Modal open={true} sx={{ backgroundColor: 'background.default', }}>
            <CustomBiodataContext.Provider value={selectedBiodata}>
                <Stack className='hide-scroll-bar' sx={{ height: '100vh', bgcolor: 'background.default', pt: `${APPBAR_HEIGHT}px` }} overflow={'hidden'}>
                    <HeaderContainer>
                        <HeaderStart header={{ goBack: true }}>
                            <NameHeader isPending={isPending} profile={profile} color='text.primary' hideActivityStatus hideShortlistIcon />
                        </HeaderStart>
                    </HeaderContainer>
                    <Stack direction={{ md: 'row' }} sx={{ overflow: 'auto', px: { xs: 1, md: 6 }, py: { xs: 1, md: 2 }, gap: {xs:1, md:2}, justifyContent: 'space-evenly' }}>
                        <Stack overflow={'auto'}  >
                            <CustomBiodata ref={targetRef} />
                        </Stack>
                        <Stack sx={{ gap: 1, maxWidth: { md: '320px' } }}>
                            <Stack direction='row' sx={{ gap: 1, height: { xs: '100px', md: 'auto' }, width: '100%', flexWrap: { md: 'wrap' }, overflow: 'auto' }}>
                                {biodataDesigns.map((biodataDesign) => {
                                    return (
                                        <ElevatedStack
                                            key={biodataDesign.image}
                                            onClick={() => setSelectedBiodata(biodataDesign)}
                                            sx={{
                                                cursor: 'pointer',
                                                border: biodataDesign.id === selectedBiodata.id && `solid ${theme.palette.primary.main} 5px`,
                                                aspectRatio: '210/297 !important',
                                                // minHeight: { xs: '80px' },
                                                minWidth: { md: '100px' },
                                                backgroundSize: '100% 100%',
                                                backgroundImage: `url(${biodataDesign.image})})`,
                                            }}
                                        />
                                    )
                                })}
                            </Stack>
                            <ElevatedButton variant='contained' onClick={toPDF} sx={{ bgcolor: 'primary.main', fontFamily: 'Lexend,sans-serif', textTransform: 'capitalize', fontSize: '0.9rem' }}>
                                Download
                            </ElevatedButton>
                        </Stack>

                    </Stack>
                </Stack>
            </CustomBiodataContext.Provider>
        </Modal >
    )
}
