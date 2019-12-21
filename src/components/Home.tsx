import React, {useEffect} from "react"
import {Box, createStyles, Grid, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CombinedState} from "../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {connect, useSelector} from "react-redux";
import QuestionStartModal from "./Modals/QuestionStartModal";
import modalReducer from "../modules/Modal"
import {SetQuestionActionCreator} from "../modules/Question";
import {playingUserSliceReducer, SetUserActionCreator} from "../modules/User";
import {PersonalInfoType} from "../Types/type";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch} from "react-redux";
import questionLevelReducer from "../modules/QuestionLevel"
import Header from "./Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

interface Props {
    loadEasyQuestion(): void,
    loadIntermediateQuestion(): void,
    loadUser(): void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: "auto",
            width: "40%",
            borderBottom: "1px solid",
            borderRight: "1px solid"
        },
        card: {
            backgroundColor: "lightblue",
    }})
)


const Home = (props: Props) => {
    const dispatch = useDispatch()
    const user: string = useSelector((state: CombinedState) => state.user)
    const userDetailInfo: PersonalInfoType[] = useSelector((state: CombinedState) => state.userDetailInfo)
    const index: number = userDetailInfo.findIndex(({username}) => username === user)
    const playingUser: PersonalInfoType = userDetailInfo[index]
    dispatch(playingUserSliceReducer.actions.setPlayingUser(playingUser))

    const icon = playingUser.icon ? playingUser.icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXd3d2ZmJiUk5PS0tLg4ODb29udnJzX19exsbHFxMTBwcGenZ2hoKCtrKylpKTLy8u2tbW8vLyQj4+pqKjgVrqEAAAD6klEQVR4nO3c2XqCMBAFYEkGCKiA9f3ftURwKyJZhMnY81/1ohecLyEbGXc7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhDvbzUWpe5/ZP7cT6NSNemyTJlZVljav1NIft43d4Ge6DUvvuWkETV4TndLeWh+oaMVBWv810yFpX0iKRn2u/ejlp0Rjq9z3fJeJIbkfJmOWAfscmFZqSycMhnFaXIiKQd81kSX0bSLj301lMFRiw98lkl9wN7c30HrwruB/ZER58+aqmjqH5KlW/APqKo5U3unc/KuR/bHR2DEgrqp14TxZ3S3A/uis5BAbPsLKURA5tQTiNSFxgwyzoZjUjBAbNMREJqQztp301bCRHJRLShEZFwH5FwLyFhGd5J+24qYIsR8xrKeBFdDp/eJBRwLBU10IgYagJX3VcCVt/URCVsBCQ8RCU8ICG/f9BLQzeHAwFbxH8wW3z/jB9wkPiQUMKRYvAZxiWhiHMM3/P8RyLO9qOWbQIWbXEvoojXsBeRkPvR3UR0UxGdtBe8y1ct96M7Cl58C1h2D0KPaiQc0owC9xcC9hU3QesaGeuZEXUBX7mFfJYZBQw2YoaZkffJt4TT7ie+46mgcfTKb3kqZUH6hGr3iKoWGNCnFUW2oOV8/1LgxcQR5WeHW9BnqVeEL5ZfRqGv4B3l5l1GZUQ34IBKo2YqSpSRecF7gvJTMwmpVHP6gva7IiprUwx1XZfarsLUpfCKoMnj29o83VZ1XVetzqflecLyElWv90I0W3rYtZIyUrtXXgVNtjxKHcQsvqkcioFUt3N7ZNoNG2Z1lDH03D+v2dq75Uemx/o9AQvU52quPuNCO9LuqT4x/ZqEyWJbFaf5aaGfRE5/6i/VIe1FwKsNk1JnO/e9mD3K+vxqtZPyTmPuC7dSe1PpYaoY7HRl/hY/3/473TH17Sf8fiVTNEfTdZ05Nns1ky7tiHF3FARE9DmXWYyY4rsYdwdjEjG901O/ktFl6V1ZCKtWeyO1D1GR9/VeSOxDTci3psWIKQ2ocffzZ6VUcRlzDWpeOjcx6e2BYbhkjlJX6qNZOrMirdNHrTT66eeWo1NpjKf5egH7pU0CCSPvdS9IYbCJKsZzwJ0vtsxpEf/V9rWbkL0R130LLe5GXHUgHbEmXHMuvOK9qLHicuaOcy+83or0EeetzLWnihHnbn+LJswYx5rPHiDO47vCv1En5SxK3Cgg3w7jw4fA87hG0y2m+zEh0x5qs9eQrR4q6odo/HD9bM1mAbm2UOtvDW+YjhX1j9rKD89gmuvtpPQJAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDZL+hwK5fYOO9qAAAAAElFTkSuQmCC"

    function lankCompare(a: PersonalInfoType, b: PersonalInfoType) {
        let comparison = 0
        if (a.point < b.point) {
            comparison = 1
        } else {
            comparison = -1
        } return comparison
    }
    const newUserArray = userDetailInfo.slice()
    newUserArray.sort(lankCompare)

    const classes = useStyles()

    return (

        <div>
            <Grid container xs={12} style={{display: "flex", justifyContent: "space-evenly"}}>
                <Grid item xs={7}>
                    <Grid container xs={12}>
                    <Card>
                    <Grid container xs={12}>
                        <Grid item xs={12} style={{backgroundColor: "#00baed"}}>
                            <Typography variant={"h5"} style={{fontWeight: "bold", color: "white", padding: 5}}>プロフィール</Typography>
                        </Grid>
                        <Grid item xs={6} style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#d9f4fd"}}>
                            <Avatar variant={"square"} src={icon} className={classes.avatar} />
                        </Grid>

                        <Grid item xs={6} style={{backgroundColor: "#d9f4fd"}}>
                            <ul>
                                <Typography>名前:</Typography>
                                <Typography variant={"h5"}>{playingUser.username}</Typography>
                                <hr/>
                                <Typography>得点:</Typography>
                                <Typography variant={"h5"}>{playingUser.point}Pt</Typography>
                                <hr/>
                            </ul>
                        </Grid>
                        <Grid item xs={6} style={{backgroundColor: "#d9f4fd"}}>
                            <ul>
                                <Typography>順位:</Typography>
                                <Typography variant={"h5"}>{playingUser.lank}位</Typography>
                                <hr/>
                                <Typography>得意分野:</Typography>
                                <Typography variant={"h5"}>{playingUser.strongField}</Typography>
                                <hr/>
                            </ul>
                        </Grid>
                        <Grid item xs={6} style={{backgroundColor: "#d9f4fd"}}>
                            <ul>
                                <Typography>クリアした問題:</Typography>
                                <Typography variant={"h5"}>{playingUser.achievementRate}％</Typography>
                                <hr/>
                                <Typography>苦手分野:</Typography>
                                <Typography variant={"h5"}>{playingUser.weakField}</Typography>
                                <hr/>
                            </ul>
                        </Grid>
                    </Grid>
                    </Card>
                    <Grid item xs={12} style={{paddingTop: 15}}>
                        <Card>
                            <Grid container xs={12}>
                                <Grid item xs={12} style={{backgroundColor: "#00baed"}}>
                                    <Typography variant={"h5"} style={{fontWeight: "bold", color: "white", padding: 5}}>問題にチャレンジ！</Typography>
                                </Grid>
                                <Grid item xs={12} style={{backgroundColor: "#d9f4fd", paddingTop: 12}}>
                                    <Grid container xs={12} direction={"row"} justify={"space-around"}>
                                        <Grid item xs={4}>
                                            <Fab
                                                style={{width: "100%"}}
                                                variant={"extended"}
                                                onClick={() => {
                                                dispatch(questionLevelReducer.actions.setQuesionLevel("入門問題"))
                                                props.loadEasyQuestion()
                                                dispatch(modalReducer.actions.open("questionStartModal"))
                                            }}>
                                                入門問題
                                            </Fab>
                                        </Grid>
                                        <Grid item xs={6} style={{display: "flex", alignItems: "center"}}>
                                            <Typography>基本的な用語の選択式問題。</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{backgroundColor: "#d9f4fd", paddingTop: 12}}>
                                    <Grid container xs={12} direction={"row"} justify={"space-around"}>
                                        <Grid item xs={4}>
                                            <Fab
                                                style={{width: "100%"}}
                                                variant={"extended"}
                                                onClick={() => {
                                                dispatch(questionLevelReducer.actions.setQuesionLevel("中級問題"))
                                                props.loadIntermediateQuestion()
                                                dispatch(modalReducer.actions.open("questionStartModal"))
                                            }}>
                                                中級問題

                                            </Fab>
                                        </Grid>
                                        <Grid item xs={6} style={{display: "flex", alignItems: "center"}}>
                                            <Typography>用語の記述式問題。</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{backgroundColor: "#d9f4fd", paddingTop: 12, paddingBottom: 12}}>
                                    <Grid container xs={12} direction={"row"} justify={"space-around"}>
                                        <Grid item xs={4}>
                                            <Fab
                                                style={{width: "100%"}}
                                                variant={"extended"}
                                                 onClick={() => dispatch(questionLevelReducer.actions.setQuesionLevel("上級問題"))}
                                            >
                                                上級問題
                                            </Fab>
                                        </Grid>
                                        <Grid item xs={6} style={{display: "flex", alignItems: "center"}}>
                                            <Typography>複雑な事例問題や、計算問題。</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>



                        <QuestionStartModal />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                    <div>

                            <Typography variant={"h5"} style={{color: "white", fontWeight: "bold", padding: 5, backgroundColor: "#00baed"}}>順位</Typography>
                            {
                                newUserArray.map((user: PersonalInfoType) =>
                                    <div style={{backgroundColor: "#d9f4fd"}}>
                                        <List>
                                            <ListItem style={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid"}}>
                                                <Typography>{newUserArray.indexOf(user) + 1}位　{user.username}</Typography>
                                                <Typography>{user.point}Pt</Typography>
                                            </ListItem>
                                        </List>
                                    </div>

                                )
                            }

                    </div>
                    </Card>
                </Grid>
            </Grid>
        </div>



)}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({

    loadEasyQuestion: () => {dispatch(SetQuestionActionCreator.loadEasyQuestion())},

    loadIntermediateQuestion: () => {dispatch(SetQuestionActionCreator.loadIntermediateQuestion())},

    loadUser: () => {dispatch(SetUserActionCreator.loadUser())},
})


export default connect(
    null,
    mapDispatchToProps,
)(Home)
