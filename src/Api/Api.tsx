import axios from "axios"

export class Api {
    static async get(url: string) {
        return axios.get(url)
    }

}