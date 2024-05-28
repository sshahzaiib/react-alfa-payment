import React from 'react';
/**
 * @name Config
 * @description The configuration object for the Alfa Payment Integration
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
/**
 * @name Props
 * @description The props object for the ReactAlfaPayment component
 */
export type Props = {
    message?: string;
    className?: string;
    alfaConfig: Config;
    isSandbox?: boolean;
};
/**
 * @name Ref
 * @description The ref object for the ReactAlfaPayment component
 */
export type Ref = HTMLButtonElement;
/**
 * @name ReactAlfaPayment
 * @description The component that handles the Alfa Payment Integration process in React
 * @param {Props} props
 * @returns {JSX.Element}
 */
declare const ReactAlfaPayment: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLButtonElement>>;
export default ReactAlfaPayment;
//# sourceMappingURL=index.d.ts.map