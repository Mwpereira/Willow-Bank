/**
 * SQS Queue Utilities
 */
export class SqsUtils {
    /**
     * Parameters to poll a single message from queue
     */
    public static sqsParams(): any {
        return {
            QueueUrl: process.env.TFA_QUEUE_URL,
            MessageBody: '',
        }
    }
}
