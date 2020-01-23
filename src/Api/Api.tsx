import axios from "axios"
import {AnswerResultType, LoginInfoType, modificatonInfoType} from "../Types/type";

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
    static async loginPost(url: string, data: LoginInfoType) {
        return axios(
            {
                method: "POST",
                url: url,
                data: data
            }
        )
    }
    static async modificationPost(url: string, data: modificatonInfoType) {
        return axios(
            {
                method: "POST",
                url: url,
                data: data
            }
        )
    }
}