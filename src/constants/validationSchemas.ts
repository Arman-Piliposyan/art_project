import * as yup from 'yup';

import { errorMessages } from './errors';

const RegistrationSchema = yup.object().shape({
  password: yup
    .string()
    .required(errorMessages.required)
    .matches(/[A-Z]/, errorMessages.passwordContent)
    .matches(/[a-z]/, errorMessages.passwordContent)
    .matches(/[0-9]/, errorMessages.passwordContent)
    .matches(/[^\w]/, errorMessages.passwordContent)
    .min(8, errorMessages.passwordLength),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], errorMessages.passwordsIdentical)
    .required(errorMessages.required),
  organizationName: yup
    .string()
    .max(30, errorMessages.charsMaxLength)
    .required(errorMessages.required)
    .trim(),
  email: yup.string().email(errorMessages.email).required(errorMessages.required),
});

const LoginSchema = yup.object().shape({
  email: yup.string().email(errorMessages.email).required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
});

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email(errorMessages.email).required(errorMessages.required),
});

const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required(errorMessages.required)
    .matches(/[A-Z]/, errorMessages.passwordContent)
    .matches(/[a-z]/, errorMessages.passwordContent)
    .matches(/[0-9]/, errorMessages.passwordContent)
    .matches(/[^\w]/, errorMessages.passwordContent)
    .min(8, errorMessages.passwordLength),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], errorMessages.passwordsIdentical)
    .required(errorMessages.required),
});

const OrganizationSchema = yup.object().shape({
  organizationName: yup
    .string()
    .max(30, errorMessages.charsMaxLength)
    .required(errorMessages.required)
    .trim(),
});

const InviteUserSchema = yup.object().shape({
  email: yup.string().email(errorMessages.email).required(errorMessages.required),
  role: yup.string().trim().required(errorMessages.required).trim(),
  emailText: yup.string().trim().required(errorMessages.required),
});

const EnterprisePlanFormSchema = yup.object().shape({
  email: yup.string().email(errorMessages.email).required(errorMessages.required),
  fullName: yup.string().required(errorMessages.required).trim(),
});

export {
  EnterprisePlanFormSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  RegistrationSchema,
  OrganizationSchema,
  InviteUserSchema,
  LoginSchema,
};
