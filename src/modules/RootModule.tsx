import { reducer as formReducer } from "redux-form";


export interface CombinedState {
    form: any
}


export const rootReducer = {
    form: formReducer
}