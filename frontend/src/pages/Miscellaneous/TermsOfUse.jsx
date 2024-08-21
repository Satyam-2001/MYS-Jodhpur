import React from 'react'
import Container from '../../components/Layouts/Container'
import { Stack, Typography } from '@mui/material'

export default function TermsOfUse() {
    return (
        <Container showFooter hideSideBar pt={11} p={0} direction='column' overflow={'auto'}>
            {/* <Stack overflow='auto' px={{ xs: 2, md: 12 }} pb={2} sx={{ color: 'text.primary', fontFamily: 'Lexend,sans-serif', fontWeight: 400 }}> */}
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, textAlign: 'center' }}>
                <span class="text-gradient">Terms Of Use</span>
            </Typography>
            <Stack px={{ xs: 2, md: 12 }} pb={4} sx={{ color: 'text.primary', fontFamily: 'sans-serif', fontWeight: 400 }}>
                <p>Welcome to mys-shaadi.com (the "Site"). These Terms of Use ("Terms") govern your use of our website, services, and any related content provided by mys-shaadi.com ("Company", "we", "us", or "our"). By accessing or using our Site, you agree to comply with and be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, please do not use our Site.</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By using our Site, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, please do not use our Site.</p>

                <h2>2. Eligibility</h2>
                <p>You must be at least [minimum age, e.g., 18] years old to use our Site. By using our Site, you represent and warrant that you are of legal age and have the capacity to enter into a binding agreement.</p>

                <h2>3. Account Registration</h2>
                <p>To access certain features of our Site, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                <h2>4. Use of the Site</h2>
                <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul>
                    <li>Use the Site for any fraudulent or unlawful purpose.</li>
                    <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with any person or entity.</li>
                    <li>Transmit any content that is defamatory, obscene, abusive, or otherwise objectionable.</li>
                    <li>Engage in any activity that disrupts or interferes with the Site or the servers and networks connected to the Site.</li>
                </ul>

                <h2>5. Content</h2>
                <p>You retain ownership of any content you post on the Site, but by posting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content in connection with the Site. You are solely responsible for the content you post and for ensuring that it complies with all applicable laws and regulations.</p>

                <h2>6. Privacy</h2>
                <p>Our Privacy Policy explains how we collect, use, and disclose information about you. By using the Site, you consent to the collection and use of your information in accordance with our Privacy Policy.</p>

                <h2>7. Fees and Payments</h2>
                <p>Certain features of the Site may require payment of fees. If applicable, you agree to pay all fees associated with such features in accordance with our pricing and payment terms. We reserve the right to change our fees at any time.</p>

                <h2>8. Termination</h2>
                <p>We may suspend or terminate your access to the Site if you violate these Terms or if we believe that your actions are harmful to the Site or its users. You may terminate your account at any time by contacting us.</p>

                <h2>9. Disclaimers</h2>
                <p>The Site is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of the Site, or the accuracy or completeness of any content.</p>

                <h2>10. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, mys-shaadi.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in connection with your use of the Site.</p>

                <h2>11. Indemnification</h2>
                <p>You agree to indemnify, defend, and hold harmless mys-shaadi.com, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or in connection with your use of the Site or any violation of these Terms.</p>

                <h2>12. Changes to Terms</h2>
                <p>We may update these Terms from time to time. We will notify you of any significant changes by posting the new Terms on our Site. Your continued use of the Site after such changes constitutes your acceptance of the new Terms.</p>

                <h2>13. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].</p>
            </Stack>
        </Container>
    )
}
