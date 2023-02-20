import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '@mui/material';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createUser } from './firebaseConfig';
import Switch from '@mui/material/Switch'

export default function CreateAccountCard(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userType, setUserType] = useState("Learner")
    const [data, setData] = useState("")





    const createAccount = () => {
        createUser(username, password, userType, data)
    }

    return (
        <Box style={{ width: 400, height: 400, borderRadius: 5, display: "flex", justifyContent: "left" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex" }}>
                    <Typography variant="h4" style={{ paddingTop: "18px", color: "#e5d1b8", paddingRight: "5px" }}>
                        Culture
                    </Typography>
                    <Typography variant="h4" style={{ paddingTop: "18px", color: "#c28753" }}>
                        Together
                    </Typography>
                </div>
                <div style={{ width: "60%", marginTop: "auto", marginBottom: "auto" }}>
                    <TextField autoFocus onChange={(event) => { setUsername(event.target.value) }} label="Username" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                    <TextField onChange={(event) => { setPassword(event.target.value) }} label="Password" type="password" autoComplete="current-password" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 18, width: "100%" }} />
                    <RadioGroup row value={userType} onChange={(event) => setUserType(event.target.value)}>
                        <FormControlLabel value="Learner" control={<Radio />} label="Learner" />
                        <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                    </RadioGroup>
                    <TextField onChange={(event) => { setData(event.target.value) }} label={userType == "Teacher" ? "Enter your specialities" : "Enter your interests"} variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 18, width: "100%" }} />
                </div>
                <Button onClick={createAccount} variant="contained" style={{ marginTop: "auto", marginBottom: "18px", width: "70%", textTransform: "none", background: "linear-gradient(45deg, #3b4936,#90EE90)" }}>
                    Sign up
                </Button>
                <Typography variant="caption" style={{ paddingBottom: "18px" }}>
                    Already have an account? <a style={{ color: "#3b4936" }} href="/login">Login</a> right now!
                </Typography>
            </div>

        </Box>
    )
}