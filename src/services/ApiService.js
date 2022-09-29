/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    console.log('set access token', accessToken);
    this.accessToken = accessToken;
  }

  async postSession({ accountNumber, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { accountNumber, password });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async register({
    name, accountNumber, password, confirmPassword,
  }) {
    console.log(`${name} ${accountNumber} ${password} ${confirmPassword}`);

    const url = `${baseUrl}/users`;
    await axios.post(url, {
      name, accountNumber, password, confirmPassword,
    });
  }

  async fetchAccount() {
    const url = `${baseUrl}/accounts/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(data);

    return {
      name: data.name,
      accountNumber: data.accountNumber,
      amount: data.amount,
    };
  }

  async fetchTransactions() {
    const url = `${baseUrl}/transactions`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const { transactions } = data;
    return transactions;
  }

  async createTransaction({ to, amount, name }) {
    const url = `${baseUrl}/transactions`;
    await axios.post(url, { to, amount, name }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export const apiService = new ApiService();
