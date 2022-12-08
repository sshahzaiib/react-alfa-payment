import { Config } from '..';
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
export declare const getAlfaHandshakeKeys: (config: Config) => HandeshakeKeys | {};
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
export declare const getAlfaFormKeys: (config: Config) => AlfaFormKeys | {};
export declare const generateRequestHash: (values: any, secretKey1: string, secretKey2: string) => string;
export declare const getHSAuthToken: (data: any, HS_RequestHash: string) => Promise<{
    AuthToken: string;
    ReturnURL: string;
    success: boolean;
}>;
//# sourceMappingURL=helpers.d.ts.map