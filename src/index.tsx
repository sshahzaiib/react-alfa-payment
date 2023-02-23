import React, { forwardRef, useCallback, useState } from 'react';
import { POST_URL, SANDBOX_POST_URL } from 'utils/constants';
import {
  generateRequestHash,
  getAlfaFormKeys,
  getAlfaHandshakeKeys,
  getHSAuthToken,
} from 'utils/helpers';

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
const Index = forwardRef<Ref, Props>(
  ({ alfaConfig, className, message, isSandbox = false }, ref) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const alfaFormKeys = React.useMemo(
      () => getAlfaFormKeys(alfaConfig || {}),
      [alfaConfig]
    );

    const handleSubmit = useCallback(
      (authToken: String, requestHash: String) => {
        if (authToken && requestHash) {
          const form = document.createElement('form');
          form.setAttribute('action', isSandbox ? SANDBOX_POST_URL : POST_URL);
          form.setAttribute('method', 'post');
          form.setAttribute('novalidate', 'novalidate');
          form.setAttribute('hidden', 'hidden');

          let formFields = `
        <input name="AuthToken" value='${authToken}' readOnly />
        <input name="RequestHash" value='${requestHash}' readOnly />
        `;
          Object.entries(alfaFormKeys).forEach(([key, value]) => {
            formFields += `<input key=${key} name=${key} value=${
              value || key
            } readOnly />`;
          });
          form.innerHTML = formFields;
          document.body.appendChild(form);
          form.submit();
        }
      },
      [alfaFormKeys, isSandbox]
    );

    const handleClick = useCallback(
      async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          setIsSubmitting(true);
          if (typeof alfaConfig === 'undefined') return;
          const data = getAlfaHandshakeKeys(alfaConfig || {});
          const requestHash: String = generateRequestHash(
            data,
            alfaConfig.secretKey1,
            alfaConfig.secretKey2
          );
          const response = await getHSAuthToken(data, requestHash, isSandbox);
          const formRequestHash: String = generateRequestHash(
            { ...alfaFormKeys, AuthToken: response.AuthToken },
            alfaConfig ? alfaConfig.secretKey1 : '',
            alfaConfig ? alfaConfig.secretKey2 : ''
          );
          handleSubmit(response.AuthToken, formRequestHash);
        } catch (err: any) {
          throw new Error(err);
        } finally {
          setIsSubmitting(false);
        }
      },
      [alfaConfig, isSandbox, alfaFormKeys, handleSubmit]
    );

    return (
      <button
        ref={ref}
        disabled={isSubmitting}
        onClick={isSubmitting ? undefined : handleClick}
        type="button"
        className={className}
      >
        {message ?? 'Submit'}
      </button>
    );
  }
);

Index.displayName = 'Main Component';

export default Index;
