import React from "react"
import {Field, getFormValues, InjectedFormProps, reduxForm} from "redux-form";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Button from "@material-ui/core/Button";
import {SettingPageRenderField} from "./SettingPage";
import {useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {PersonalInfoType, RankingType} from "../Types/type";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

const ModificationForm = (props: InjectedFormProps) => {
    const currentValue = useSelector((state: CombinedState) => getFormValues("ModificationForm")(state) as { username: string, password: string, icon: string })
    const userDetailInfo: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    const allUsers: RankingType[] = useSelector((state: CombinedState) => state.ranking)


    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container xs={12}>
                <Grid item xs={12} style={{marginBottom: 30}}>
                    <Field
                        style={{width: "50%"}}
                        label={"パスワード"}
                        name="password"
                        component={SettingPageRenderField}
                        type={"password"}
                        validate={[requiredValidation, passLengthValidation]}
                    />
                </Grid>
                <Grid item container xs={6} justify={"center"}>
                    <Button
                        disabled={props.invalid || props.pristine}
                        color={"primary"}
                        type={"submit"}
                        variant={"contained"}
                    >変更</Button>
                </Grid>
                <Grid item container xs={6} justify={"center"}>
                    <Link to={"/home"} style={{textDecoration: "none"}}>
                        <Button
                            variant={"contained"}
                        >
                            ホームへ戻る
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </form>
    )
}

export default reduxForm<any>({
    form: "ModificationForm"
})(ModificationForm)
