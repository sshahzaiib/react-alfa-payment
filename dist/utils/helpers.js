var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable camelcase */
import { HANDSHAKE_URL, SANDBOX_HANDSHAKE_URL } from './constants';
import CryptoJS from 'crypto-js';
export var getAlfaHandshakeKeys = function (config) {
    if (!Object.keys(config).length)
        return {};
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
export var getAlfaFormKeys = function (config) {
    if (!config || !Object.keys(config).length)
        return {};
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
export var generateRequestHash = function (values, secretKey1, secretKey2) {
    if ((typeof values === 'object' &&
        !Object.values(values).every(function (value) { return value; })) ||
        !secretKey1 ||
        !secretKey2) {
        throw new Error('Error generating request hash!');
    }
    var mapString = '';
    Object.entries(values).forEach(function (entry) {
        mapString += entry.join('=') + '&';
    });
    var hash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mapString.substring(0, mapString.length - 1)), CryptoJS.enc.Utf8.parse(secretKey1), {
        keySize: 128 / 8,
        iv: CryptoJS.enc.Utf8.parse(secretKey2),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return hash.toString();
};
export var getHSAuthToken = function (data, HS_RequestHash, isSandbox) { return __awaiter(void 0, void 0, void 0, function () {
    var _data, myHeaders, urlencoded, requestOptions, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _data = __assign(__assign({}, data), { HS_RequestHash: HS_RequestHash });
                myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
                urlencoded = new URLSearchParams();
                Object.entries(_data).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return urlencoded.append(key, value);
                });
                requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(isSandbox ? SANDBOX_HANDSHAKE_URL : HANDSHAKE_URL, requestOptions)];
            case 2: return [4 /*yield*/, (_a.sent()).json()];
            case 3:
                response = _a.sent();
                if (!response.AuthToken)
                    throw new Error('Invalid Request');
                return [2 /*return*/, response];
            case 4:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=helpers.js.map