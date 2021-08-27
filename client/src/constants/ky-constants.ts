import ky from 'ky';

export const options = ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('X-Requested-With', 'ky');
      },
    ]
  },
  credentials: 'include'
});
