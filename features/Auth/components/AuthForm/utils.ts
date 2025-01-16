export interface AuthDetails {
    username?: string;
    email?: string;
    phone_number?: string;
    password?: string;
}

export interface AuthInfoKey {
    isLoginForm: boolean;
    isRegisterForm: boolean;
    isForgotPassForm: boolean;
    isResetPassForm: boolean;
}

export const initialAuthInfo = {
    isLoginForm: false,
    isRegisterForm: false,
    isForgotPassForm: false,
    isResetPassForm: false,
};

export const authTypesDict = {
    login: 'login',
    forgotPass: 'forgot-password',
    resetPass: 'reset-password'
}