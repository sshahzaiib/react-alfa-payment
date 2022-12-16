import React, { useCallback, useEffect, useState } from 'react';
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

/**
 * Main Component
 */
const Index = ({
  alfaConfig,
  className,
  message,
  isSandbox = false,
}: Props): JSX.IntrinsicElements[keyof JSX.IntrinsicElements] => {
  const [authToken, setAuthToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [requestHash, setRequestHash] = useState<string>('');

  console.log({ isSandbox });
  const alfaFormKeys = React.useMemo(
    () => getAlfaFormKeys(alfaConfig || {}),
    [alfaConfig]
  );

  const handleClick = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);
        if (typeof alfaConfig === 'undefined') return;
        const data = getAlfaHandshakeKeys(alfaConfig || {});
        const requestHash: string = generateRequestHash(
          data,
          alfaConfig.secretKey1,
          alfaConfig.secretKey2
        );
        const response = await getHSAuthToken(data, requestHash, isSandbox);
        setAuthToken(response.AuthToken);
        const formRequestHash = generateRequestHash(
          { ...alfaFormKeys, AuthToken: response.AuthToken },
          alfaConfig ? alfaConfig.secretKey1 : '',
          alfaConfig ? alfaConfig.secretKey2 : ''
        );
        setRequestHash(formRequestHash);
      } catch (err: any) {
        throw new Error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [alfaConfig, isSandbox, alfaFormKeys]
  );

  useEffect(() => {
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
  }, [alfaFormKeys, authToken, isSandbox, requestHash]);

  return (
    <button
      disabled={isSubmitting}
      onClick={isSubmitting ? undefined : handleClick}
      type="button"
      className={className}
    >
      {message ?? 'Submit'}
    </button>
  );
};

export default Index;
