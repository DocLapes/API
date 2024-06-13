/**
 * @fileOverview
 * Subsystem that stores the codes of currencies
 * that are participating in the current convertation.
 */
import {currencyExists} from "~/Model/Currency/getAllCodes";

let baseCurrency = 'rub';
let targetCurrency = 'usd';

/**
 * Sets base currency of the current convertion.
 * @param {string} currencyCode
 * @return {boolean}
 * Returns false if currency doesn't exist.
 * Returns true otherwise.
 */
export function currencyConvertionParticipantsSetBaseCurrency(currencyCode)
{
    if (!currencyExists(currencyCode))
        return false;
    baseCurrency = currencyCode;
    return true;
}

/**
 * Sets target currency of the current convertion.
 * @param {string} currencyCode
 * @return {boolean}
 * Returns false if currency doesn't exist.
 * Returns true otherwise.
 */
export function currencyConvertionParticipantsSetTargetCurrency(currencyCode)
{
    if (!currencyExists(currencyCode))
        return false;
    targetCurrency = currencyCode;
    return true;
}

/**
 * Returns target currency of the current convertion.
 * @return {string}
 */
export function currencyConvertionParticipantsGetTargetCurrency()
{
    return targetCurrency;
}

/**
 * Returns base currency of the current convertion.
 * @return {string}
 */
export function currencyConvertionParticipantsGetBaseCurrency()
{
    return baseCurrency;
}
