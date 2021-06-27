import * as DynamoDB from 'dynamoose';

export const WillowBankSchema = new DynamoDB.Schema({
    id: {
        type: String,
        required: true,
    },
    accessNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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