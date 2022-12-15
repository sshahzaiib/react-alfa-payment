/// <reference types="react" />
/**
 * Main Component Props
 */
export type Config = {
    merchantId: number | string;
    storeId: number | string;
    channelId: number | string;
    merchantHash: string;
    merchantUsername: string;
    merchantPassword: string;
    redirectUrl: string;
    transactionReferenceNumber: string | number;
    transactionAmount: number;
    secretKey1: string;
    secretKey2: string;
};
export type Props = {
    message?: string;
    className?: string;
    alfaConfig: Config;
    isSandbox?: Boolean;
};
/**
 * Main Component
 */
declare const Index: ({ alfaConfig, className, message, isSandbox, }: Props) => JSX.IntrinsicElements[keyof JSX.IntrinsicElements];
export default Index;
//# sourceMappingURL=index.d.ts.map