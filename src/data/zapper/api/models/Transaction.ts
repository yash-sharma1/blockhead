/* tslint:disable */
/* eslint-disable */
/**
 * Zapper API
 * The Zapper API provides some of the most robust Defi related data, everything from liquidity and prices on different AMMs to complex Defi protocol balances all in one convenient place. In addition, the API also supports bridging between different networks as well as formatted Zap transaction endpoints. <br/><br/><br/> *Enter in our public API key in the Authorize section below to test the endpoints directly in swagger: **96e0cc51-a62e-42ca-acee-910ea7d2a241**
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Transaction
 */
export interface Transaction {
    /**
     * The address for the sending account
     * @type {string}
     * @memberof Transaction
     */
    from: string;
    /**
     * The destination address of the message
     * @type {string}
     * @memberof Transaction
     */
    to: string;
    /**
     * The value transferred for the transaction in wei
     * @type {string}
     * @memberof Transaction
     */
    value: string;
    /**
     * The amount of gas to use for the transaction
     * @type {string}
     * @memberof Transaction
     */
    gas: string;
    /**
     * The price of gas for this transaction in wei
     * @type {string}
     * @memberof Transaction
     */
    gasPrice: string;
    /**
     * ABI byte string containing the data of the function call on a contract
     * @type {string}
     * @memberof Transaction
     */
    data: string;
}

export function TransactionFromJSON(json: any): Transaction {
    return TransactionFromJSONTyped(json, false);
}

export function TransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Transaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'from': json['from'],
        'to': json['to'],
        'value': json['value'],
        'gas': json['gas'],
        'gasPrice': json['gasPrice'],
        'data': json['data'],
    };
}

export function TransactionToJSON(value?: Transaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'from': value.from,
        'to': value.to,
        'value': value.value,
        'gas': value.gas,
        'gasPrice': value.gasPrice,
        'data': value.data,
    };
}

