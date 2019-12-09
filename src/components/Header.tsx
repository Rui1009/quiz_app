import React from "react"
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "../genkan_logo.svg"




const Header = () => {
    return(
        <AppBar position={"static"} color={"default"}>
            <Toolbar>
                <Box display="flex">
                    <img src={logo} height={30}></img>
                    <Box pl={1} mb={-0.3}>
                        <Typography variant={"h6"}>原価管理クイズ</Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header