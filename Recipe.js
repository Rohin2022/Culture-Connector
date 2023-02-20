import AddIcon from '@mui/icons-material/Add'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import { get, ref } from "firebase/database"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar.js'
import { db } from './firebaseConfig.js'

export default function Recipe() {
    let { id } = useParams()
    const [ingredients, setIngredients] = useState("")
    const [method, setMethod] = useState("")
    const [url, setImageUrl] = useState("")
    const [title, setTitle] = useState("")
    const [open, setDialogOpen] = useState(false)

    useEffect(() => {
        get(ref(db, 'recipes/' + id)).then(
            (data) => {
                const item = data.val()
                console.log(item)

                setIngredients(item.ingredients)
                setMethod(item.method)
                setImageUrl(item.url)
                setTitle(item.title)
            }
        )
    }, [])

    const openDialog = () => {
        setDialogOpen(!open)
    }
    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <NavBar />
            
            <div style={{ width: "80%", display: "flex", paddingTop: 90, justifyContent: "space-between", zIndex: 10 }}>
                <div style={{ width: "45vw", height: "60vh",overflowX:"hidden" }}>
                    <Typography variant="h5" align="left" style={{ color: "#3b4936" }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" align="left" style={{ color: "#3b4936",paddingTop:18 }}>
                        Ingredients
                    </Typography>
                    <List style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
                        {ingredients.split(",").map((ingredient,idx) => {
                            return (

                                <ListItem style={{width:"45%"}}>
                                    <ListItemText style={{ color: "#3b4936" }}>
                                        {idx+1}. {ingredient}
                                    </ListItemText>
                                </ListItem>

                            )
                        })}
                    </List>
                    <Typography variant="h6" align="left" style={{ color: "#3b4936" }}>
                        Method
                    </Typography>
                    <List>
                        {method.split("%^").map((method) => {
                            return (

                                <ListItem style={{width:"45vw"}}>
                                    <ListItemText style={{ color: "#3b4936" }}>
                                        {method}
                                    </ListItemText>
                                </ListItem>

                            )
                        })}
                    </List>

                </div>
                <div style={{ width: "45vw", height: "60vh", borderRadius: 10,position:"fixed",right:-8 }}>
                    <img src={url} style={{ width: "400px" }} />
                </div>
            </div>
            <div style={{ position: "fixed", right: 0, bottom: 0, display: "flex", zIndex: 0 }}>
                <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 100vh 80vh", borderColor: "transparent transparent #3b4936 transparent" }}>
                </div>
                <div style={{ width: "10.5vw", height: "100vh", backgroundColor: "#3b4936" }} />
            </div>
            <Fab onClick={openDialog} style={{ position: "fixed", bottom: 40, right: 40, backgroundColor: "#e5d1b8", width: "80px", height: "80px" }} size="large">
                <AddIcon style={{ color: "#3b4936", width: "40px", height: "40px" }} />
            </Fab>
            <Dialog open={open} onClose={openDialog} style={{ width: "800px", height: "400px" }}>
                <DialogTitle>
                    New Recipe
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={openDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
