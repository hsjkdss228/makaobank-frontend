import BankStore from './BankStore';

import server from '../testServer';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const context = describe;

describe('BankStore', () => {
  describe('Login', () => {
    context('올바른 계좌번호와 비밀번호인 경우', () => {
      it('내 계좌 정보를 불러옴', async () => {
        const bankStore = new BankStore();

        console.log('로그인 시도 (jest)');
        await bankStore.login({ accountNumber: '352', password: 'password' });

        console.log('검증 수행 (jest)');
        expect(bankStore.name).toBe('황인우');
        expect(bankStore.amount).toBe(1_000_000);
      });
    });

    context('계좌번호가 올바르지 않은 경우', () => {
      it('계좌 정보를 불러오지 않음', async () => {
        const bankStore = new BankStore();

        await bankStore.login({ accountNumber: 'wrong', password: 'password' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBeFalsy();
      });
    });

    context('비밀번호가 올바르지 않은 경우', () => {
      it('계좌 정보를 불러오지 않음', async () => {
        const bankStore = new BankStore();

        await bankStore.login({ accountNumber: '352', password: 'wrong' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBeFalsy();
      });
    });
  });
});
