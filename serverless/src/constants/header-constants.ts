export const responseHeader: object = {
    'Accept-Encoding': 'gzip, compress, br',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type,x-requested-with',
    'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS',
    'Access-Control-Allow-Origin':
        process.env.SERVER_MODE === 'PRODUCTION'
            ? `https://${process.env.DOMAIN}`
            : `http://${process.env.DOMAIN_LOCAL}`,
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Requested-With': '*',
    'X-Xss-Protection': '1; mode=block',
};
