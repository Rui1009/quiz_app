export interface LoginInfoType {
    username: string,
    password: string
}


export interface EasyQuizType {
   question: string,
   option: string[]
   answer: string,
   description: string,
    field: string
}

export interface IntermediateQuizType {
    question: string,
    answer: string,
    description: string,
    field: string
}

export interface PersonalInfoType {
    username: string,
    password: string,
    icon: string,
    point: number
    strongField?: string,
    weakField?: string
}

export interface RankingType {
    username: string,
    point: number
}