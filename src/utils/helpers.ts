/* eslint-disable camelcase */
import { HANDSHAKE_URL, SANDBOX_HANDSHAKE_URL } from './constants';
import { Config } from '..';
import CryptoJS from 'crypto-js';

export type HandeshakeKeys = {
  HS_MerchantId: string | number;
  HS_StoreId: string | number;
  HS_ChannelId: string | number;
  HS_MerchantHash: string;
  HS_MerchantUsername: string;
  HS_MerchantPassword: string;
  HS_IsRedirectionRequest: string;
  HS_ReturnURL: string;
  HS_TransactionReferenceNumber: string | number;
};

export const getAlfaHandshakeKeys = (config: Config): HandeshakeKeys | {} => {
  if (!Object.keys(config).length) return {};
  return {
    HS_MerchantId: config.merchantId,
    HS_StoreId: config.storeId,
    HS_ChannelId: config.channelId,
    HS_MerchantHash: config.merchantHash,
    HS_MerchantUsername: config.merchantUsername,
    HS_MerchantPassword: config.merchantPassword,
    HS_IsRedirectionRequest: '0',
    HS_ReturnURL: config.redirectUrl,
    HS_TransactionReferenceNumber: config.transactionReferenceNumber,
  };
};

export type AlfaFormKeys = {
  ChannelId: string | number;
  Currency: string;
  IsBIN: string;
  ReturnURL: string;
  MerchantId: string | number;
  StoreId: string | number;
  MerchantHash: string;
  MerchantUsername: string;
  MerchantPassword: string;
  TransactionTypeId: string;
  TransactionReferenceNumber: string | number;
  TransactionAmount: number;
};

export const getAlfaFormKeys = (config: Config): AlfaFormKeys | {} => {
  if (!config || !Object.keys(config).length) return {};
  return {
    ChannelId: '1001',
    Currency: 'PKR',
    IsBIN: '0',
    ReturnURL: config.redirectUrl,
    MerchantId: config.merchantId,
    StoreId: config.storeId,
    MerchantHash: config.merchantHash,
    MerchantUsername: config.merchantUsername,
    MerchantPassword: config.merchantPassword,
    TransactionTypeId: '3',
    TransactionReferenceNumber: config.transactionReferenceNumber,
    TransactionAmount: config.transactionAmount,
  };
};

export const generateRequestHash = (
  values: any,
  secretKey1: string,
  secretKey2: string
): string => {
  if (
    (typeof values === 'object' &&
      !Object.values(values).every((value) => value)) ||
    !secretKey1 ||
    !secretKey2
  ) {
    throw new Error('Error generating request hash!');
  }

  let mapString = '';
  Object.entries(values).forEach((entry) => {
    mapString += entry.join('=') + '&';
  });
  const hash = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(mapString.substring(0, mapString.length - 1)),
    CryptoJS.enc.Utf8.parse(secretKey1),
    {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(secretKey2),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return hash.toString();
};

export const getHSAuthToken = async (
  data: any,
  HS_RequestHash: string,
  isSandbox: boolean
): Promise<{
  AuthToken: string;
  ReturnURL: string;
  success: boolean;
}> => {
  const _data: {
    [key: string]: string;
  } = {
    ...data,
    HS_RequestHash,
  };
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  Object.entries(_data).forEach(([key, value]) =>
    urlencoded.append(key, value)
  );

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };
  try {
    const response = await (
      await fetch(
        isSandbox ? SANDBOX_HANDSHAKE_URL : HANDSHAKE_URL,
        requestOptions
      )
    ).json();
    if (!response.AuthToken) throw new Error('Invalid Request');
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
