import {Request} from './request';

export interface LoginRequest extends Request{
    email: string,
    password: string
}
