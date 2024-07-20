import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const fontFamily = ["'Exo 2'", "sans-serif"].join(",")

export const themeSettings = (mode) => {
    const typography = {
        allVariants: {
            color: (mode === 'light' ? 'black' : 'white'),
        },
        fontFamily,
        fontSize: 12,
        h1: {
            fontFamily,
            fontSize: '2.5rem',
        },
        h2: {
            fontFamily,
            fontSize: '2rem',
        },
        h3: {
            fontFamily,
            fontSize: '1.5rem',
        },
        h4: {
            fontFamily,
            fontSize: '1.25rem'
        },
        h5: {
            fontFamily,
            fontSize: '1rem',
        },
        h6: {
            fontFamily,
            fontSize: '0.9rem',
        },
        overline: {
            color: 'linear-gradient(135deg, #C52062 2.34%, #FE880C 100.78%)'
        }
    }

    const main = '#DF275D'

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main,
            },
            background: {
                default: 'rgb(21,24,27)',
                paper: 'rgb(24,28,31)',
            },
            grey: {
                A100: '#1f1f1f'
            }
        },
        typography,
    })

    const lightTheme = createTheme({
        palette: {
            mode,
            primary: {
                main,
            },
            background: {
                default: '#eaeaea',
                paper: '#fff',
            },
            grey: {
                A100: '#f6f6f6'
            }
        },
        typography,
    })

    return mode === 'dark' ? darkTheme : lightTheme;
};



export const ColorModeContext = createContext({ mode: 'dark', toggleMode: () => { } });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark')

    useEffect(() => {
        const storedMode = localStorage.getItem('mode');
        if (storedMode) {
            setMode(storedMode)
        }
    }, [])

    const toggleMode = () => {
        setMode(prop => {
            const new_mode = prop === 'light' ? 'dark' : 'light'
            localStorage.setItem('mode', new_mode)
            return new_mode
        })
    }

    const theme = themeSettings(mode);
    return (
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>)
}