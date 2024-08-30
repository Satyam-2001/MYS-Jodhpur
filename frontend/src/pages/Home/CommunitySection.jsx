import { Stack, Typography } from "@mui/material";
import ImageSlider from "./components/ImageSlider";
import SubContainer from "./components/SubContainer";

export default function CommunitySection() {

    return (
        <SubContainer >
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center', fontFamily: 'Lexend,sans-serif' }} m={0}>
                    Meet Your
                    <span class="text-gradient"> Soul Mate</span><br />
                </Typography>
            </Stack>
            <ImageSlider />
        </SubContainer>
    )
}