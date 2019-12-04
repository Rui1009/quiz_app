export const passLengthValidation = (value: string) => (
    value && value.length < 4 ? "最低4文字以上のパスワードを設定してください"　: undefined
);

export const requiredValidation = (value: string) => (
    value ? undefined : "必須項目です"
)