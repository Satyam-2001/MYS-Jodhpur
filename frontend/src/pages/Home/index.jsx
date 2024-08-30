import { Stack } from "@mui/material"
import IntroSection from "./IntroSection"
import Container from "../../components/Layouts/Container"
import Footer from "../../components/Layouts/Footer"
import useProtectedRoute from "../../hooks/useProtectedRoute"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from "react"
import bg_image from '../../assets/background.jpg'
import SafetySection from "./SafetySection"
import RegisterSection from "./RegistrationSection"
import CommunitySection from "./CommunitySection"
import ContactUsSection from "./ContactUsSection"
import AboutUs from "./AboutUs"
import FeatureSection from "./FeatureSection"
import SponserSection from "./SponserSection"
import MemberSection from "./MemberSection"

const image_url = 'https://i.pinimg.com/originals/71/6e/fc/716efc545dbb2b0e2a018bed028b26f7.jpg'


function Home() {

    useProtectedRoute()

    return (
        <Container hideSideBar appBarTranslucent showFooter direction='column' pt={0} p={0} overflow={'auto'} sx={{ overflowX: 'hidden' }}
            style={{
                bgcolor: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: { xs: 'center', md: 'center' },
                backgroundImage: `url(${bg_image})`,
                // boxShadow: 'inset 0px 100px 120px -50px black'
            }} >
            <IntroSection />
            <SponserSection />
            <RegisterSection />
            <FeatureSection />
            <SafetySection />
            <AboutUs />
            <MemberSection />
            <ContactUsSection />
            <CommunitySection />
            {/* <HeroSection /> */}
        </Container>
    )
}

export default Home