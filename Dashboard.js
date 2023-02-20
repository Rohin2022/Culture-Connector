import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Button, Drawer, List, ListItem, Box, ListItemAvatar, Avatar, ListItemButton, ListItemText, ListItemSecondaryAction } from '@mui/material';
import Outer from './OuterRing.png'
import Inner from './Inner.png'
import Typography from '@mui/material/Typography'
import { logout } from './firebaseConfig';
import NavBar from './NavBar.js'
import { useEffect, useState } from 'react';
import { get, getDatabase, push, ref, set } from "firebase/database";
import { db } from './firebaseConfig';



export default function Dashboard(props) {
    const [interests, setInterests] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [students, setStudents] = useState([])
    const [recommendedTeachers, setRecommendedTeachers] = useState([])

    useEffect(() => {
        get(ref(db, 'users/' + props.user.uid)).then((data) => {
            const user = data.val()
            setUserType(user.userType)
            setEmail(user.email)
            setInterests(user.data)
            if (user.userType === "Teacher") {
                console.log(user)
                const students = []
                for (var key in user.classes) {
                    const student = user.classes[key]
                    students.push(student)
                }
                setStudents(students)
            }
            else {

                get(ref(db, "users")).then((users) => {
                    const data = users.val()
                    const values = Object.values(data)
                    const teachers = []
                    for (const idx in values) {
                        const obj = values[idx]
                        if (obj.data.split(", ")[0] === user.data.split(", ")[0] && obj.userType==="Teacher") {
                            teachers.push(obj)
                        }

                    }
                    console.log(teachers)
                    setRecommendedTeachers(teachers)

                })
            }
        })
    }, [])

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <NavBar />
            <Toolbar />
            <div style={{ paddingTop: 150, zIndex: 10, position: "absolute" }}>
                <List style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                    {recommendedTeachers.map((teacher) => {
                        console.log(teacher)
                        return (
                            <div style={{ width: "50vw", display: "flex", justifyContent: "center", paddingBottom: 40 }}>
                                <Box boxShadow={10} style={{ color: "white", borderRadius: 15, backgroundColor: "#e5d1b8", width: "40vw" }}>
                                    <ListItem disableGutters disablePadding >

                                        <ListItemButton style={{ borderRadius: 15 }} href={`/schedule/${teacher.uuid}`}>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: "#c28753" }}>{teacher.email.charAt(0).toUpperCase()}</Avatar>
                                            </ListItemAvatar>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <Typography textAlign="left" noWrap style={{ width: "100%", color: "#3b4936" }}>{`Teacher ${teacher.email}`}</Typography>
                                                <Typography textAlign="left" noWrap style={{ width: "100%", color: "#3b4936", fontSize: 15 }}>{`${teacher.data}`}</Typography>
                                            </div>
                                        </ListItemButton>
                                    </ListItem>
                                </Box>
                            </div>
                        )
                    })}
                    {students.map((student) => {
                        console.log(student)
                        return (
                            <div style={{ width: "50vw", display: "flex", justifyContent: "center", paddingBottom: 40 }}>
                                <Box boxShadow={10} style={{ color: "white", borderRadius: 15, backgroundColor: "#e5d1b8", width: "40vw" }}>
                                    <ListItem disableGutters disablePadding >

                                        <ListItemButton style={{ borderRadius: 15 }}>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: "#c28753" }}>{student.studentEmail.charAt(0).toUpperCase()}</Avatar>
                                            </ListItemAvatar>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <Typography textAlign="left" noWrap style={{ width: "100%", color: "#3b4936" }}>{`Learner ${student.studentEmail}`}</Typography>
                                                <Typography textAlign="left" noWrap style={{ width: "100%", color: "#3b4936", fontSize: 15 }}>{`${student.experience} at ${student.time}`}</Typography>
                                            </div>
                                        </ListItemButton>
                                    </ListItem>
                                </Box>
                            </div>
                        )
                    })}
                </List>
            </div>
            <div style={{ position: "absolute", right: 0, bottom: 0, display: "flex", zIndex: 0 }}>
                <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 100vh 80vh", borderColor: "transparent transparent #3b4936 transparent" }}>
                </div>
                <div style={{ width: "10.5vw", height: "100vh", backgroundColor: "#3b4936" }} />
            </div>

        </div>
    )
}
