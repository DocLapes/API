import {Frame, Observable} from "@nativescript/core";
import {currencyGetAllCodes} from "~/Model/Currency/getAllCodes";
import {currencyGetNameByCode} from "~/Model/Currency/getNameByCode";
import {
    currencyConvertionParticipantsSetBaseCurrency,
    currencyConvertionParticipantsSetTargetCurrency
} from "~/Model/Currency/Convertion/convertionParticipants";

const viewModel = new Observable();

function goHome()
{
    Frame.topmost().navigate('~/View/main-page');
}

function chooseCurrency(args)
{
    let choosenCurrency = args.object.items[args.index].currencyCode;
    if (viewModel.get('isChangingTargetCurrency'))
        currencyConvertionParticipantsSetTargetCurrency(choosenCurrency);
    else
        currencyConvertionParticipantsSetBaseCurrency(choosenCurrency);
    goHome();
}

function createCurrencysObjects()
{
    let result = [];
    let currencyCodes = currencyGetAllCodes();
    for (let currencyCode of currencyCodes)
    {
        result.push({
            currencyName: currencyGetNameByCode(currencyCode),
            currencyCode: currencyCode
        });
    }
    return result;
}

export function createViewModel(context)
{
    viewModel.isChangingTargetCurrency = context.isChangingTargetCurrency;
    viewModel.goHome = goHome;
    viewModel.chooseCurrency = chooseCurrency;
    viewModel.currencys = createCurrencysObjects();
    return viewModel;
}
