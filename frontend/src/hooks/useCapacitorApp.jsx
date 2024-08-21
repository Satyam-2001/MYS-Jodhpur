// src/hooks/useCapacitorApp.js
import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useLocation, useNavigate } from 'react-router-dom';

const useCapacitorApp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBackButton = () => {
            const pathname = location.pathname.split('/').slice(1);

            // Handle specific cases
            if (pathname[0] === '' || pathname[0] === 'search') {
                App.exitApp(); // Exit app if on root or search page
            } else if (pathname.length === 1 && ['chats', 'activity', 'settings', 'profile'].includes(pathname[0])) {
                navigate('/search'); // Navigate to search if on specific pages
            } else if (window.history.state && window.history.state.idx > 0) {
                // Go back in history if there is history state
                navigate(-1);
            } else {
                // Exit app if no history state
                App.exitApp();
            }

        };

        const backButtonListener = App.addListener('backButton', handleBackButton);
        const appUrlOpenListener = App.addListener('appUrlOpen', (event) => {
            // Example url: https://beerswift.app/tabs/tab2
            // Extract slug from the URL
            const slug = new URL(event.url).pathname;
            if (slug) {
                navigate(slug);
            }
        });

        // Cleanup listeners on unmount
        return () => {
            App.removeAllListeners()
            // backButtonListener.remove();
            // appUrlOpenListener.remove();
        };
    }, [navigate, location]);

};

export default useCapacitorApp;
