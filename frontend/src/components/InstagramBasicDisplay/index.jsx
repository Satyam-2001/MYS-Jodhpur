import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../../services/axiosinstance';

const InstagramAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [media, setMedia] = useState(null)

    const appId = '1315162909443847'; // Use environment variables for security
    const appSecret = '471f6415b03ed1f9094b1964e7b2f8a2'; // Use environment variables for security
    const redirectUri = `${window.location.origin}/profile`; // Ensure this is registered with Instagram

    const handleLogin = () => {
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
        window.location.href = authUrl;
    };

    const handleCodeExchange = async (code) => {
        try {
            const data = await instance.post('/exchangeCode', { code });
            const { short_lived_token, long_lived_token } = data;

            setAccessToken(long_lived_token);
            // Store the short-lived token if needed
        } catch (error) {
            console.error('Error exchanging code for access token', error.response?.data || error.message);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('https://graph.instagram.com/me', {
                params: {
                    fields: 'id,username',
                    access_token: accessToken,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile', error.response?.data || error.message);
        }
    };

    const fetchUserMedia = async () => {
        try {
            const response = await axios.get('https://graph.instagram.com/me/media', {
                params: {
                    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink',
                    access_token: accessToken,
                },
            });
            setMedia(response.data.data);
        } catch (error) {
            console.error('Error fetching user media', error.response?.data || error.message);
        }
    };

    // Extract the authorization code from the URL
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        if (code) {
            handleCodeExchange(code);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            fetchUserProfile();
            fetchUserMedia();
        }
    }, [accessToken]);

    return (
        <div>
            {!accessToken ? (
                <button onClick={handleLogin}>Login with Instagram</button>
            ) : (
                <div>
                    {profile ? (
                        <div>
                            <h1>Welcome, {profile.username}</h1>
                            <p>Instagram ID: {profile.id}</p>
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default InstagramAuth;
