import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useLoginUserMutation } from "../../redux/user-api";
import { successLogin } from "../../redux/slice/user-slice";

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
}).required();

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus,
        setError,
        clearErrors
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [loginUser] = useLoginUserMutation();

    const onSubmit = async (data) => {
        clearErrors();
        
        try {
            const user = await loginUser(data).unwrap();
            dispatch(successLogin(user));
            history.push('/');
        } catch {
            setError('invalidData', { message: 'Invalid data!' });
        }
    }

    useEffect(() => {
        setFocus('email');
    }, [setFocus]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">mail</label>
                    <input {...register('email')} id="username" type="email" />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="userpass">password</label>
                    <input {...register('password')} id="userpass" type="password" />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                {errors.invalidData && <span>{errors.invalidData.message}</span>}
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;