import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { logout } from './firebaseConfig';
import Inner from './Inner.png';
import Outer from './OuterRing.png';

export default function NavBar() {
    return (<AppBar elevation={0} position="fixed" style={{
        backgroundColor: "rgba(0,0,0,0)"
    }}>
        <Toolbar style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 15
        }}>
            <div style={{
                display: "flex",
                alignItems: "center"
            }} onClick={logout}>
                <img className="logo" src={Outer} style={{
                    height: "80px",
                    zIndex: 0
                }} />
                <img src={Inner} style={{
                    height: 80,
                    zIndex: 10,
                    marginLeft: -84
                }} />
                <div style={{
                    display: "flex"
                }}>
                    <Typography variant="h5" style={{
                        color: "#e5d1b8",
                        zIndex: 20
                    }}>
                        Culture
                    </Typography>
                    <Typography variant="h5" style={{
                        color: "#c28753",
                        zIndex: 20
                    }}>
                        Together
                    </Typography>
                </div>
            </div>
            <div>
                <Button style={{
                    textTransform: "none",
                    fontSize: 16,
                    color: "#e5d1b8"
                }} href="/main">
                    Dashboard
                </Button>
                <Button style={{
                    textTransform: "none",
                    fontSize: 16,
                    color: "#e5d1b8"
                }} href="/recipe/biryani">
                    Recipes
                </Button>
                <Button style={{
                    textTransform: "none",
                    fontSize: 16,
                    color: "#e5d1b8"
                }}>
                    Cultural Immersion
                </Button>
                <Button style={{
                    textTransform: "none",
                    fontSize: 16,
                    color: "#e5d1b8"
                }}>
                    Language Lessons
                </Button>
            </div>
        </Toolbar>
    </AppBar>);
}