import React, {useEffect} from "react"
import {CombinedState} from "../modules/RootModule";
import {connect} from "react-redux";
import EasyQuiz from "./Quizes/EasyQuiz";
import IntermediateQuiz from "./Quizes/IntermediateQuiz";

interface Props {
    questionLevel: string
}

const Quiz = (props: Props) => {
    switch (props.questionLevel) {
        case "入門問題":
            return (<EasyQuiz />)
            break;
        case "中級問題":
            return (<IntermediateQuiz />)
            break;
        case "上級問題":
            return (<p>上級問題</p>)
        default:
            return (<p>a</p>)
    }
}

const mapStateToProps = (state: CombinedState) => ({
    questionLevel: state.questionLevel    
})


export default connect(
    mapStateToProps,
    null
)(Quiz)