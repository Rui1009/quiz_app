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
    loginInfo: LoginInfoType
    icon?: string,
    lank?: number,
    class?: string
    achievementRate?: number,
    strongField?: string,
    weakField?: string
}