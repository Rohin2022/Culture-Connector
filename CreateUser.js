import React from 'react'
import CreateAccountCard from './CreateAccountCard'
import Box from '@mui/material/Box';

import Lottie from 'react-lottie-player'

import Logo from './WebsiteLogo.json'
import shape from './Shape.png'
import shape2 from './Shape2.png'


export default function Login() {
    

    return (
        <div style={{ overflow:"hidden",position:"relative",width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={shape} style={{position:"absolute",top:0,left:0,zIndex:0}}/>
            <img src={shape2} style={{position:"absolute",bottom:-60,right:-60,zIndex:0}}/>
            <Box boxShadow={10} style={{borderRadius:10, zIndex:10,width: "80vw", height: "80vh" }}>
                <div style={{paddingLeft:64, width: "67vw", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <CreateAccountCard />
                    <Lottie
                        loop={1}
                        animationData={Logo}
                        play
                        style={{ height: "80%" }}
                    />
                </div>
            </Box>

        </div>
    )
}
