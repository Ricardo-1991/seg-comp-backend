export interface IUserValidator {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cpf: string;
    gender: string;
    cityId: number;
    privacyPolicyAccepted: boolean
}