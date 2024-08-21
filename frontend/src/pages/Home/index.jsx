import { Stack } from "@mui/material"
import HeroSection from "./HeroSection"
import IntroSection from "./IntroSection"
import Container from "../../components/Layouts/Container"
import Footer from "../../components/Layouts/Footer"
import useProtectedRoute from "../../hooks/useProtectedRoute"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from "react"

const image_url = 'https://images.unsplash.com/photo-1615966650071-855b15f29ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXBsZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D'
// 'https://pikwizard.com/pw/medium/81145461cf9d2348111ba92f037a6823.jpg'


function Home() {

    useProtectedRoute()

    return (
        <Container hideSideBar appBarTranslucent showFooter direction='column' pt={0} p={0} overflow={'auto'} sx={{ overflowX: 'hidden' }}
            style={{
                bgcolor: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: { xs: 'center', md: 'center' },
                backgroundImage: `url(${image_url})`,
                // boxShadow: 'inset 0px 100px 120px -50px black'
            }} >
            <IntroSection />
            <HeroSection />
        </Container>
    )
}

export default Home