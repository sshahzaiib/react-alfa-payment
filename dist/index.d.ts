import React from 'react';
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
export type Ref = HTMLButtonElement;
/**
 * Main Component
 */
declare const Index: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLButtonElement>>;
export default Index;
//# sourceMappingURL=index.d.ts.map