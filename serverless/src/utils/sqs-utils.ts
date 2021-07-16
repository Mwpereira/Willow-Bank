import SQS from "aws-sdk/clients/sqs";

/**
 * SQS Queue Utilities
 */
export class SqsUtils {
    /**
     * Parameters to poll a single message from queue
     */
    public static sqsParams(sqs: SQS): any {
        return {
            QueueUrl: sqs.getQueueUrl({QueueName: 'updateTwoFactorAuthenticationSQS'}),
            MessageBody: '',
        }
    }

    /**
     * Retrieves a message from the queue, parses it, and deletes the message from the queue.
     * Returns a message confirming that the process was successful, or throws if it fails.
     * @param resources Resources required to execute the function.
     */
    // public static consumeMessage(resources: any): Promise<void> {
    //     return this.getQueueMessage(resources.sqs)
    //         .then((message: Message) => {
    //             console.info('Received message from email queue. Attempting to send email.');
    //             return User.setTwoFactorAuthentication(resources.ses, JSON.parse(message.Body))
    //                 .then(() =>
    //                     this.deleteMessage(resources.sqs, message.ReceiptHandle)
    //                 .catch(e => {
    //                     // Error with request
    //                     console.error(`Error processing email request. `, e);
    //                 }));
    //         }).catch(e => {
    //             // There was a failure retrieving message from queue - no metadata to add to log.
    //             console.warn('Request to update two factor authentication failed to retrieve a message from the queue. ', e);
    //         });
    // }
    //
    // /**
    //  * Retrieves a message from the queue
    //  * @param sqs SQS instance
    //  */
    // public static async getQueueMessage(sqs: SQS): Promise<Message> {
    //     return sqs.receiveMessage(this.sqsPollParams).promise()
    //         .then((result: PromiseResult<ReceiveMessageResult, AWSError>) => result.$response.error ?
    //             Promise.reject(result.$response.error) : result.$response.data)
    //         .then((data: ReceiveMessageResult) => data?.Messages?.length ? data.Messages[0] :
    //             Promise.reject('One Message Expected'));
    // }
    //
    // /**
    //  * Deletes the message with the provided receipt handle from the queue
    //  * @param sqs SQS instance
    //  * @param receipt Receipt handle of the message being deleted
    //  */
    // public static async deleteMessage(sqs: SQS, receipt: string): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         sqs.deleteMessage(this.getSqsDeleteParams(receipt), (err: AWSError, _data: {}) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve();
    //                 console.info(`Request to update two factor authentication was successful.`);
    //             }
    //         });
    //     });
    // }

    // /**
    //  * Produces the request parameters required to delete a message from the queue
    //  * @param receipt Receipt handle of the message being deleted
    //  */
    // public static getSqsDeleteParams(sqs: SQS): DeleteMessageRequest {
    //     return {
    //         QueueUrl: sqs.getQueueUrl({QueueName: 'updateTwoFactorAuthenticationSQS'}),
    //         ReceiptHandle: receipt
    //     };
    // }
}
