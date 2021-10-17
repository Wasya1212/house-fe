import React from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRegisterUserMutation } from "../../redux/user-api";

const schema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    repassword: yup.string().required().min(6).oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();

export const RegisterPage = () => {
    const history = useHistory();

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [ registerUser, { isError } ] = useRegisterUserMutation();

    if (isError) {
        console.error("Some error");
        history.push('/');
    }

    const onSubmit = async (data) => {
        await registerUser(data).unwrap();
        history.push('/login');
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstname">firstname</label>
                    <input {...register('firstname')} id="firstname" type="text" />
                    {errors.firstname && <span>{errors.firstname.message}</span>}
                </div>
                <div>
                    <label htmlFor="lastname">lastname</label>
                    <input {...register('lastname')} id="lastname" type="text" />
                    {errors.lastname && <span>{errors.lastname.message}</span>}
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input {...register('email')} id="email" type="email" />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input {...register('password')} id="password" type="password" />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="repassword">confirm password</label>
                    <input {...register('repassword')} id="repassword" type="password" />
                    {errors.repassword && <span>{errors.repassword.message}</span>}
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;