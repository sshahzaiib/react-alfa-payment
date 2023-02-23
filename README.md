# react-alfa-payment

[![NPM](https://img.shields.io/npm/v/react-alfa-payment.svg)](https://www.npmjs.com/package/react-alfa-payment)
[![npm](https://img.shields.io/npm/dm/react-alfa-payment.svg)](https://www.npmjs.com/package/react-alfa-payment)
![GitHub](https://img.shields.io/github/license/sshahzaiib/react-alfa-payment)

A [Bank Alfalah Limited](https://merchants.bankalfalah.com/MerchantPortal
) payment gateway component for `React Apps` for easy integration written in `Typescript` 


- This library currently supports Debit/Credit Card payments only
- Other methods are planned to be supported in the upcoming releases


## Installation

Install [react-alfa-payment](https://www.npmjs.com/package/react-alfa-payment) using npm

```bash
npm install --save react-alfa-payment
```

Or using yarn

```bash
yarn add react-alfa-payment
```


    
## Demo

[Click here to test](https://sshahzaiib.github.io/react-alfa-payment/)


## Usage/Examples

```javascript
import ReactAlfaPayment from 'react-alfa-payment'

function App() {
  return (
      <ReactAlfaPayment 
        alfaConfig={{
            merchantId: '',
            storeId: '',
            channelId: '',
            merchantHash: '',
            merchantUsername: '',
            merchantPassword: '',
            redirectUrl: '',
            secretKey1: '',
            secretKey2: '',
            transactionReferenceNumber: '',
            transactionAmount: 100,
        }} 
        message="Proceed to Pay"
        className="btn-primary"
        isSandbox
    />
  )
}
```


## Component Props


| Parameter | Type     | Required | Description                |
| :-------- | :------- | :------- |:------------------------- |
| `alfaConfig` | `object` | `true` | Scroll down to see the required properties |
| `isSandbox` | `boolean` | `false` | To determine whether the current environment is a sandbox or not |
| `message` | `string` | `false` | Text to appear on submit button |
| `className` | `string` | `false` | CSS className |
| `ref` | `ref` | `false` | Submit button ref to trigger actions i.e click |

#### Prop: alfaConfig
`object` containing all of the following (required) properties

```javascript
  {
    merchantId: '',
    storeId: '',
    channelId: '',
    merchantHash: '',
    merchantUsername: '',
    merchantPassword: '',
    redirectUrl: '',
    secretKey1: '',
    secretKey2: '',
    transactionReferenceNumber: '',
    transactionAmount: 100,
  }
```
## Acknowledgements

This project is generated from [react-typescript-library template](https://github.com/alioguzhan/react-typescript-library)

## License

MIT © [Shahzaib](https://github.com/sshahzaiib)

## Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shahzaiib)\
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sshahzaiib)
