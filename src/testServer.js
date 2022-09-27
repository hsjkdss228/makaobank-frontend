/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (request, response, context) => {
    console.log('로그인 시도 (msw)');

    const { accountNumber, password } = await request.json();
    console.log('로그인 응답 완료 (msw)');

    if (accountNumber === '352' && password === 'password') {
      return response(context.json({
        accessToken: 'ACCESS.TOKEN',
        name: '황인우',
        amount: 1_000_000,
      }));
    }

    return response(context.status(400));
  }),
  rest.get(`${baseUrl}/accounts/me`, async (request, response, context) => {
    console.log('계좌 정보 로딩 시도 (msw)');

    return response(context.json({
      name: '황인우',
      accountNumber: '352',
      amount: 1_000_000,
    }));
  }),
);

export default server;
