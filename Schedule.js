import { Button, FormControlLabel, Radio, RadioGroup, Typography,TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { get, push, ref } from "firebase/database"
import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom'
import { db } from './firebaseConfig.js'
import NavBar from './NavBar.js'

export default function Schedule(props) {
    let { id } = useParams()
    const [interests, setInterests] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [students, setStudents] = useState([])
    const [experience, setExperience] = useState("Culture")

    const [value, setValue] = useState(dayjs())

    const handleChange = (newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        get(ref(db, 'users/' + id)).then(
            (data) => {
                const teacher = data.val()
                console.log(teacher)

                setUserType(teacher.userType)
                setEmail(teacher.email)
                setInterests(teacher.data)
            }
        )
    }, [])

    const scheduleLesson = () => {
        push(ref(db, "users/" + id + "/classes"),{
            time:value.toString(),
            studentId:props.user.uid,
            studentEmail:props.user.email,
            videoUrl:"https://nobles.zoom.us/s/2579863310",
            experience:experience
        })
        alert("Here is your zoom url, join this meeting at the selected date and time" +" https://nobles.zoom.us/s/2579863310")
    }

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center",overflow:"hidden" }}>
            <NavBar />
            <div style={{ marginRight: "auto", width: "45%", height: "50vh", paddingLeft: "80px", display: "flex", flexDirection: "column", alignItems: "left" }}>
                <Typography variant="h5" style={{ color: "#3b4936", width: "100%" }} align="left">
                    Sign up for a class with {email}
                </Typography>
                <Typography variant="subtitle1" style={{ color: "#3b4936", paddingTop: 18, width: "100%" }} align="left">
                    {interests}
                </Typography>

                <RadioGroup style={{ paddingTop: 40,paddingBottom:40 }} row value={experience} onChange={(event) => setExperience(event.target.value)}>
                    <FormControlLabel value="Culture" control={<Radio />} label="Cultural Immersion" />
                    <FormControlLabel value="Language" control={<Radio />} label="Language" />
                    <FormControlLabel value="Cooking" control={<Radio />} label="Cooking" />
                </RadioGroup>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateTimePicker
                        label="Select a date and time for your meeting"
                        value={value}
                        style={{width:"70%"}}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} style={{width:"70%"}}/>}
                    />
                </LocalizationProvider>
                <Button onClick={scheduleLesson} variant="contained" style={{ width: "400px", marginTop: "50px" }}>
                    Schedule your {experience} Experience
                </Button>
            </div>
            <div style={{ position: "fixed", right: 0, bottom: 0, display: "flex", zIndex: 0 }}>
                <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 100vh 80vh", borderColor: "transparent transparent #3b4936 transparent" }}>
                </div>
                <div style={{ width: "10.5vw", height: "100vh", backgroundColor: "#3b4936" }} />
            </div>

        </div>
    )
}
