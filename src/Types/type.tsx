export interface LoginInfoType {
    username: string,
    password: string
}


export interface EasyQuizType {
   question: string,
   option: string[]
   answer: string,
   description: string
}

export interface IntermediateQuizType {
    question: string,
    answer: string,
    description: string
}

export interface PersonalInfoType {
    username: string,
    icon?: string,
    lank?: number,
    class?: string
    achievementRate?: number,
    strongField?: string,
    weakField?: string
}