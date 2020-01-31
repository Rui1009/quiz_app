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


const Home = (props: InjectedFormProps) => {
    useEffect(() => {
        dispatch(loadUserSliceReducer.actions.loadUser({param: user}))
        dispatch(loadRankingSliceReducer.actions.loadRanking(""))
    }, [])
    const dispatch = useDispatch()
    const user: string = useSelector((state: CombinedState) => state.user)
    const userDetailInfo: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    const icon = userDetailInfo && userDetailInfo.icon && userDetailInfo.icon.length !== 0 ? userDetailInfo.icon : "data:image/png;base64,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";
    const rankingArray: RankingType[] = useSelector((state: CombinedState) => state.ranking)
    console.log(rankingArray)

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
