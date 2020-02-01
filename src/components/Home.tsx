import React, {useEffect} from "react"
import {createStyles, Grid, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CombinedState} from "../modules/RootModule";
import {useSelector} from "react-redux";
import QuestionStartModal from "./Modals/QuestionStartModal";
import modalReducer from "../modules/Modal"
import {
    loadEasyQuizSliceReducer,
    loadIntermediateQuizSliceReducer,
} from "../modules/Question";
import {loadRankingSliceReducer, loadUserSliceReducer} from "../modules/User";
import {PersonalInfoType, RankingType} from "../Types/type";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch} from "react-redux";
import questionLevelReducer from "../modules/QuestionLevel"
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import PostQuizModal from "./Modals/postQuizModal";
import modalSlice from "../modules/Modal";
import {InjectedFormProps} from "redux-form";
import koskaLogo from "../../src/blue_back2.png"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: "auto",
            width: "70%"
        },
        card: {
            backgroundColor: "lightblue",
    }})
)


const Home = (props: InjectedFormProps) => {
    useEffect(() => {
        dispatch(loadUserSliceReducer.actions.loadUser({param: user}))
        dispatch(loadRankingSliceReducer.actions.loadRanking(""))
    }, [])
    const dispatch = useDispatch()
    const user: string = useSelector((state: CombinedState) => state.user)
    const userDetailInfo: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    const icon = userDetailInfo && userDetailInfo.icon && userDetailInfo.icon.length !== 0 ? userDetailInfo.icon : koskaLogo;
    const rankingArray: RankingType[] = useSelector((state: CombinedState) => state.ranking)

    const rank = rankingArray.findIndex(({username}) => username === userDetailInfo.username) + 1;

    const classes = useStyles()

    return (
            <Grid container xs={12} style={{display: "flex", justifyContent: "space-evenly", paddingTop: 16}}>
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
                                <Typography variant={"h5"}>{userDetailInfo.username}</Typography>
                                <hr/>
                                <Typography>得点:</Typography>
                                <Typography variant={"h5"}>{userDetailInfo.point}Pt</Typography>
                                <hr/>
                            </ul>
                        </Grid>
                        <Grid item xs={6} style={{backgroundColor: "#d9f4fd"}}>
                            <ul>
                                <Typography>順位:</Typography>
                                <Typography variant={"h5"}>{rank}位</Typography>
                                <hr/>
                                <Typography>得意分野:</Typography>
                                <Typography variant={"h5"}>{userDetailInfo.strongField}</Typography>
                                <hr/>
                            </ul>
                        </Grid>
                        <Grid item xs={6} style={{backgroundColor: "#d9f4fd"}}>
                            <ul>
                                <Typography>ランク:</Typography>
                                <Typography variant={"h5"}>{userDetailInfo.status}</Typography>
                                <hr/>
                                <Typography>苦手分野:</Typography>
                                <Typography variant={"h5"}>{userDetailInfo.weakField}</Typography>
                                <hr/>
                            </ul>
                        </Grid>
                    </Grid>
                    </Card>
                    <Grid item xs={12} style={{paddingTop: 10}}>
                        <Card>
                            <Grid container xs={12}>
                                <Grid item xs={12} style={{backgroundColor: "#00baed"}}>
                                    <Typography variant={"h5"} style={{fontWeight: "bold", color: "white", padding: 5}}>問題にチャレンジ！</Typography>
                                </Grid>
                                <Grid item xs={12} style={{backgroundColor: "#d9f4fd", paddingTop: 8}}>
                                    <Grid container xs={12} direction={"row"} justify={"space-around"}>
                                        <Grid item xs={4}>
                                            <Fab
                                                style={{width: "100%"}}
                                                variant={"extended"}
                                                onClick={() => {
                                                dispatch(questionLevelReducer.actions.setQuesionLevel("入門問題"))
                                                dispatch(loadEasyQuizSliceReducer.actions.loadEasyQuiz(""))
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
                                <Grid item xs={12} style={{backgroundColor: "#d9f4fd", paddingTop: 8}}>
                                    <Grid container xs={12} direction={"row"} justify={"space-around"}>
                                        <Grid item xs={4}>
                                            <Fab
                                                style={{width: "100%"}}
                                                variant={"extended"}
                                                onClick={() => {
                                                dispatch(questionLevelReducer.actions.setQuesionLevel("中級問題"))
                                                dispatch(loadIntermediateQuizSliceReducer.actions.loadIntermediateQuiz(""))
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
                                <Grid item xs={12} style={{backgroundColor: "#d9f4fd", paddingTop: 8, paddingBottom: 8}}>
                                    <Grid container xs={12} direction={"row"} justify={"space-around"}>
                                        <Grid item xs={4}>
                                            <Fab
                                                style={{width: "100%"}}
                                                variant={"extended"}
                                                disabled={true}
                                                 onClick={() => dispatch(questionLevelReducer.actions.setQuesionLevel("上級問題"))}
                                            >
                                                Coming soon...
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
                        <Grid item xs={12}>
                            <Card style={{marginTop: 10}}>
                                <Typography variant={"h5"} style={{backgroundColor: "#00baed", fontWeight: "bold", color: "white", padding: 5}}>問題を投稿する</Typography>
                                <Grid style={{backgroundColor: "#d9f4fd"}}>
                                    <Typography>問題を作って投稿できます。1問作るごとにpointがもらえます。(入門問題: 30pt、中級問題: 20pt)</Typography>
                                    <Grid style={{display: "flex",justifyContent: "center", marginTop: 8, marginBottom: 8}}>
                                        <Button
                                            style={{width: "40%", backgroundColor: "#00baed", color: "white"}}
                                            variant={"contained"}
                                            onClick={() => dispatch(modalSlice.actions.open("postQuizModal"))}
                                        >問題を作る</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <PostQuizModal {...props}/>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <div>
                        <Typography variant={"h5"} style={{color: "white", fontWeight: "bold", padding: 5, backgroundColor: "#00baed"}}>順位</Typography>
                        {
                            rankingArray.map((user: RankingType) =>
                                <div style={{backgroundColor: "#d9f4fd"}}>
                                    <List>
                                        <ListItem style={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid"}}>
                                            <Typography>{rankingArray.indexOf(user) + 1}位　{user.username}</Typography>
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
)}

export default Home
