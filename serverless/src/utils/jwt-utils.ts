import * as jwt from 'jsonwebtoken';
import {PolicyDocument} from 'aws-lambda';

/**
 * Helper methods for JWT
 */
export default class JwtUtils {
    /**
     * Generates JWT For Protected Routes
     *
     * @param userData
     * @return JWT
     */
    static generateJwt(userData: any): string {
        return jwt.sign(
            {
                sub: userData.email,
            },
            process.env.APP_SECRET
        );
    }

    /**
     * Refreshes JWT
     *
     * @param user
     * @return new JWT
     */
    static refreshJwt(user: any): string {
        return jwt.sign(
            {
                sub: user.sub,
                email: user.email,
                username: user.username,
            },
            process.env.APP_SECRET
        );
    }

    /**
     * Retrieves Token
     *
     * @param cookie
     * @return access token
     */
    static getToken(cookie: string): string | null {
        const tokens = cookie.replace(' ', '').split(';');
        let accessToken: string = null;

        for (const token of tokens) {
            if (token.includes('accessToken')) {
                accessToken = token.substr(12);
                break;
            }
        }

        return accessToken;
    }

    /**
     * Retrieves decoded token
     *
     * @param token
     * @return decoded token
     */
    static getDecodedToken(token: string): string | object {
        return jwt.verify(token, process.env.APP_SECRET);
    }

    /**
     * Verifies JWT
     *
     * @param token
     */
    static verify(token: string): string | object {
        return jwt.verify(token, process.env.APP_SECRET);
    }

    /**
     * Generates JWT Policy Response
     *
     * @param principalId
     * @param effect
     * @param methodArn
     * @return jwt response
     */
    static generatePolicyResponse(principalId, effect, methodArn): string | object {
        const policyDocument = this.generatePolicyDocument(effect, methodArn);

        return {
            principalId,
            policyDocument,
        };
    }

    /**
     * Generates Policy Document for JWT Response
     *
     * @param effect
     * @param methodArn
     * @return jwt policy document
     */
    private static generatePolicyDocument(effect, methodArn): PolicyDocument | null {
        if (!effect || !methodArn) {
            return null;
        }

        return {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: methodArn,
                },
            ],
        };
    }
}
