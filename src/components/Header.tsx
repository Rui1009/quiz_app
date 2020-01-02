import React from "react"
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "../genkan_logo.svg"
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";




const Header = () => {
    return(
        <AppBar position={"static"} color={"default"}>
            <Toolbar style={{display: "flex"}}>
                <Grid container xs={12}>
                    <Box display="flex">
                        <img src={logo} height={30}></img>
                        <Box pl={1} mb={-0.3}>
                            <Typography variant={"h6"} style={{fontWeight: "bolder"}}>原価管理クイズ</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item container xs={2} justify={"flex-end"}>
                    <Link to={"/setting_page"} style={{textDecoration: "none"}}>
                        <IconButton color={"inherit"}>
                            <AccountCircle />
                        </IconButton>
                    </Link>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header