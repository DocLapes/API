/**
 * @fileOverview Subsystem that contains and updates currency convertion multipliers.
 */

import {currencyConvertionGetName} from "~/Model/Currency/Convertion/getName";
import {currencyGetAllCodes} from "~/Model/Currency/getAllCodes";
import {Http} from "@nativescript/core";

const CONVERTION_BASE = 'eur';     //euro
const convertionMultipliers = new Map();
let multipliersLastUpdateDate;

function setConvertion(from, to, multiplier)
{
    convertionMultipliers.set(currencyConvertionGetName(from, to), multiplier);
}

function setNewConvertationMultipliers(newMultipliers)
{
    let currencyCodes = currencyGetAllCodes();
    for (let i = 0; i < currencyCodes.length; i++)
    {
        for (let j = i; j < currencyCodes.length; j++)
        {
            let from = currencyCodes[i]
            let to = currencyCodes[j];
            let multiplier = newMultipliers[to] / newMultipliers[from];
            setConvertion(from, to, multiplier);
            setConvertion(to, from, 1 / multiplier);
        }
    }
}

async function fetchConvertionMultipliersFromApi()
{
    let multipliersJson;
    try
    {
        multipliersJson = await Http.getJSON(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${CONVERTION_BASE}.json`);
    }
    catch (e)
    {
        return 1;
    }
    return multipliersJson;
}

function isMultipliersUpToDate(jsonDate)
{
    return (multipliersLastUpdateDate !== undefined) &&
           (multipliersLastUpdateDate.getTime() === jsonDate.getTime());
}

/**
 * Updates the currency convertion multipliers.
 *
 * @return {Promise<number>} Returns completion status code.
 *
 * 0 - Success
 * 1 - Network request error
 */
export async function currencyConvertionUpdateMultipliers()
{
    let json = await fetchConvertionMultipliersFromApi();
    if (Number.isInteger(json))  //if error occurred
        return json;
    let jsonDate = new Date(json.date);
    if (isMultipliersUpToDate(jsonDate))
        return 0;
    multipliersLastUpdateDate = jsonDate;
    setNewConvertationMultipliers(json[CONVERTION_BASE]);
    return 0;
}

/**
 * Returns multiplier for convertion from base currency to target currency.
 * @param {string} from
 * @param {string} to
 * @return {number | undefined} If base or target currency doesn't exist, returns undefined.
 */
export function currencyConvertionGetMultiplier(from, to)
{
    let convertionName = currencyConvertionGetName(from, to);
    return convertionMultipliers.get(convertionName);
}

/**
 * Returns the date that indicates the relevance of the currency convertion multipliers.
 * @return {Date | undefined} If multipliers have never been updated, returns undefined.
 */
export function currencyConvertionGetDateOfLastMultipliersUpdate()
{
    return multipliersLastUpdateDate;
}
