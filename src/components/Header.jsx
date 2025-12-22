import React from 'react'
import {Box,Typography,useTheme} from "@mui/material";
export default function Header({title,subTitle,isDashboard=false}) {
    const theme=useTheme()
  return (
   <div>
    
    <Box mb={isDashboard?2:3}>
        <Typography sx={{color:theme.palette.info.light,fontWeight:'bold'}} variant='h5'>
            {title}
            </Typography>
            <Typography  variant='body1'>
            {subTitle}
            </Typography>
        </Box>
    </div>
  )
}
