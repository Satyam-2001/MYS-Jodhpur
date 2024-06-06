import { Stack } from "@mui/material"
import HeroSection from "./HeroSection"
import IntroSection from "./IntroSection"
import Container from "../../components/Layouts/Container"

function Home() {
    return (
        <Container hideSideBar direction='column' pt={0} p={0} overflow={'auto'}>
            <IntroSection />
            <HeroSection />
        </Container>
    )
}

export default Home