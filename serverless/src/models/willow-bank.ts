import * as DynamoDB from 'dynamoose';

export const WillowBankSchema = new DynamoDB.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accounts: {
        type: String,
        required: true,
    },
    etransfers:{
        type: String,
        required: true,
    },
    twoFactorAuthentication: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
});