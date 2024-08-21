import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import chroma from "chroma-js";

const fontFamily = ["'Exo 2'", "sans-serif"].join(",")

export const themeSettings = (mode, main, primary) => {
    const color = mode === 'light' ? 'black' : 'white'
    const typography = {
        allVariants: {
            color,
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

    const customGradients = {
        mainGradient: primary ? 'linear-gradient(135deg, #C52062 2.34%, #0a6efa 100.78%)' : 'linear-gradient(135deg, #fab14b 2.34%, #FC793D 100.78%)',
        // secondaryGradient: 'linear-gradient(to right, #00c6ff, #0072ff)',
    }

    const light = chroma(main).alpha(0.5).hex()

    const components = {
        // MuiSvgIcon: {
        //     styleOverrides: {
        //         root: {
        //             color,
        //         },
        //     },
        // },
        // MuiSkeleton: {
        //     styleOverrides: {
        //         root: {
        //             animation: 'wave',
        //         },
        //     },
        // },
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main,
                light
            },
            background: {
                // default: 'rgb(32,35,41)',
                // paper: 'rgb(30,32,39)',
                default: 'rgb(21,24,27)',
                paper: 'rgb(21,24,27)',
            },
            action: {
                hover: 'rgba(100, 100, 100, 0.12)'
            },
            grey: {
                A100: '#1f1f1f'
            }
        },
        typography,
        customGradients,
        components
    })

    const lightTheme = createTheme({
        palette: {
            mode,
            primary: {
                main,
                light
            },
            background: {
                default: 'rgb(248,252,255)',
                paper: 'rgb(245,250,255)',
                // paper: 'rgb(235,240,243)',
            },
            action: {
                hover: 'rgba(100, 100, 100, 0.12)'
            },
            grey: {
                A100: '#f6f6f6'
            }
        },
        typography,
        customGradients,
        components
    })

    return mode === 'dark' ? darkTheme : lightTheme;
};



export const ColorModeContext = createContext({ mode: 'dark', toggleMode: () => { } });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark')
    const { user, isLoggedIn } = useSelector(state => state.user)

    const defaultColor = '#fc793d'
    const maleColor = '#0a6efa'
    const femaleColor = '#f285e9'

    const mainColor = !isLoggedIn ? defaultColor : (user?.basic_info?.gender === 'Women' ? femaleColor : maleColor)

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

    const theme = themeSettings(mode, mainColor, isLoggedIn);
    return (
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                <style jsx>{`
        .text-gradient {
          --text-gradient: ${theme.customGradients.mainGradient};
          background: ${theme.customGradients.mainGradient};
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
      `}</style>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>)
}