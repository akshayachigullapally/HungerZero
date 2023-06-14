import Card from "./Card"
import { Box, Typography, Link, Chip, Divider } from "@mui/material"
import { lighten } from "@mui/material"
import { Launch as ExternalIcon, DateRange as CalendarIcon,
            RocketLaunch as Placeholder
        } from "@mui/icons-material"
// import {use}

const imageSize = 60
const imageRightSpace = 8

export default function ListingCard(props) {
    // const getDate

    return (
        <Card
            sx={{
                width: {xs: '370px', xl: '400px'},
                py: 2.5,
                px: {xs: 2, xl: 3.5},
                display: 'flex',
                flexDirection: 'column',
                ...(props.sx && props.sx)
            }}
        >
            {
                props.name && (
                    <Box sx={{display: 'flex'}}>
                        {
                            props.logoUrl ? (
                                <img
                                    src={props.logoUrl}
                                    alt={props.name}
                                    width={imageSize}
                                    height={imageSize}
                                    style={{objectFit: 'cover', borderRadius: 8}}
                                 />
                            ) : (
                                <PlaceholderIcon name={props.name} />
                            )
                        }
                        <Box
                            ml={`${imageRightSpace}px`}
                            width={`calc(100% - ${imageSize + imageRightSpace}px)`}
                        >
                            <Link
                                href={props.projectUrl}
                                disabled={true}
                                target="_blank"
                                sx={{
                                    display: 'inline-flex',
                                    gap: 0.5,
                                    alignItems: 'center',
                                    maxWidth: '100%',
                                    textDecoration: 'none',
                                    ...(!props.projectUrl ? {
                                        pointerEvents: 'none',
                                        cursor: 'default'
                                    } : {}),
                                    '&hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    noWrap
                                    title={props.name}
                                >
                                    {props.name}
                                </Typography>
                                {
                                    props.projectUrl ? (
                                        <ExternalIcon fontSize="medium" color="inherit" />
                                    ) : (
                                        <Box mr={1} />
                                    )
                                }
                            </Link>
                            {/* Date Stuff */}
                        </Box>
                    </Box>
                )
            }
            {props.body && props.body}
            {
                props.footerContent && (
                    <Box sx={{marginTop: 'auto'}}>
                        <Divider sx={{mt: 2, mb: 1, width: '200%', translate: -100}} />
                        {props.footerContent}
                    </Box>
                )
            }
        </Card>
    )
}

export function ListingDetail(props) {
    return (
      <Box
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          mb: 1,
        }}
      >
        <Typography variant="caption">{props.label}</Typography>
        <Typography variant="body1" fontWeight="bold">
          {props.value}{' '}
          <Typography variant="caption">
            {props.extraValue ? `(${props.extraValue})` : null}
          </Typography>
        </Typography>
      </Box>
    )
  }

  function PlaceholderIcon({name}) {
    const baseColor = stringToColor(name)
    return (
      <>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor={baseColor} />
            <stop offset={0.5} stopColor={lighten(baseColor, 0.5)} />
            <stop offset={1} stopColor={lighten(baseColor, 0.7)} />
          </linearGradient>
        </svg>
        <Placeholder sx={{width: 60, height: 60, fill: 'url(#linearColors)'}} />
      </>
    )
  }