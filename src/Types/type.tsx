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
    icon?: string,
    lank?: number,
    point: number
    achievementRate?: number,
    strongField?: string,
    weakField?: string
}