import { createTheme } from "@mui/material"

export const generateGradient = (alphaLeft, alphaRight) => {
    `linear-gradient(103.7427deg, rgba(159, 238, 255, ${alphaLeft}) 30%, rgba(186, 117, 255, ${alphaRight}) 100%)`
}

const theme = createTheme({
    componenets: {
        MuiChip: {
            variants: [
                {
                    props: {variant: 'gradient'},
                    style: {
                        overflow: 'hidden',
                        color: "#191919",
                        border: "none",
                        fontWeight: "bold",
                        backgroundImage: generateGradient(0.6, 0.6)
                    }
                }
            ]
        },
        MuiButton: {
            variants: [
                {
                    props: {variant: 'gradient'},
                    style: {
                        overflow: "hidden",
                        color: "#191919",
                        border: "1px solid #191919",
                    }
                },
                {
                    props: {variant: 'gradient-solid'},
                    style: {
                        overflow: 'hidden',
                        color: '#191919',
                        backgroundImage: generateGradient(0.6, 0.6)
                    }
                }
            ]
        },
        MuiListItemButton: {
            styleOverrides: {
                color: 'pink',
                root: {
                    position: 'relative',
                    overflow: 'hidden'
                }
            }
        }
    },
    palette: {
        primary: {
            light: "#42424a",
            main: "#191919"
        },
        secondary: {
            main: "rgb(186, 117, 255)"
        }
    }
})

export default theme