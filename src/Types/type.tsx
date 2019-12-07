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