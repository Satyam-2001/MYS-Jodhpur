import { Stack } from "@mui/material"
import HeroSection from "./HeroSection"
import IntroSection from "./IntroSection"
import Container from "../../components/Layouts/Container"
import Footer from "../../components/Layouts/Footer"

function Home() {
    return (
        <Container hideSideBar appBarTranslucent direction='column' pt={0} p={0} overflow={'auto'}>
            <IntroSection />
            <HeroSection />
            <Footer />
        </Container>
    )
}

export default Home