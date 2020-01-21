import axios from "axios"
import {AnswerResultType} from "../Types/type";

export class Api {
    static async get(url: string) {
        return axios.get(url)
    }
    static async answerPost(url: string, data: AnswerResultType[]) {
        return axios(
            {
                method: "POST",
                url: url,
                data: data
            }
        )
    }
}