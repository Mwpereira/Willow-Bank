import { Handler } from 'aws-lambda';

export const register: Handler = async (event) => {
    return await Auth.reigster(event);
};

export const login: Handler = async (event) => {
    return await Auth.login(event);
};