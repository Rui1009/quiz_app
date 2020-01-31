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
    point: number,
    status: string,
    strongField?: string,
    weakField?: string
}

export interface RankingType {
    username: string,
    point: number
}

export interface AnswerResultType {
    question: string,
    username: string,
    result: string,
    field: string,
    level: string
}

export interface modificatonInfoType {
    currentUser: string,
    password: string
}

export interface postQuizType {
    username: string,
    level: string,
    question: string,
    option1?: string,
    option2?: string,
    option3?: string,
    option4?: string,
    answer: string,
    description: string,
    field: string
}