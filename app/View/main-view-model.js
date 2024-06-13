import {Dialogs, Frame, Observable} from '@nativescript/core';
import {
    userNumberInputAddSymbol,
    userNumberInputClear,
    userNumberInputGetAsNumber,
    userNumberInputGetAsString,
    userNumberInputRemoveLastSymbol
} from "~/Model/UserNumberInput";
import {
    currencyConvertionParticipantsGetBaseCurrency,
    currencyConvertionParticipantsGetTargetCurrency,
    currencyConvertionParticipantsSetBaseCurrency,
    currencyConvertionParticipantsSetTargetCurrency
} from "~/Model/Currency/Convertion/convertionParticipants";
import {
    currencyConvertionGetDateOfLastMultipliersUpdate,
    currencyConvertionGetMultiplier,
    currencyConvertionUpdateMultipliers
} from "~/Model/Currency/Convertion/getMultipliers";

const viewModel = new Observable();

function DisplayErrorMessage(message)
{
    Dialogs.alert({
        title: 'Ошибка',
        message: message,
        okButtonText: 'Ок',
        cancelable: true
    });
}

function updateDisplayOfCurrencyRateRelevanse()
{
    let date = currencyConvertionGetDateOfLastMultipliersUpdate();
    let dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    viewModel.set('dateOfLastMultipliersUpdate', dateStr);
}

function updateDisplayOfCurrencyExchangeRate()
{
    let from = currencyConvertionParticipantsGetBaseCurrency();
    let to = currencyConvertionParticipantsGetTargetCurrency();
    let multiplier = currencyConvertionGetMultiplier(from, to);
    let title = `1 ${from.toUpperCase()} = ${multiplier} ${to.toUpperCase()}`;
    viewModel.set('currencyConvertionRate', title);
}

function updateCurrencysCodes()
{
    let from = currencyConvertionParticipantsGetBaseCurrency();
    let to = currencyConvertionParticipantsGetTargetCurrency();
    viewModel.set('baseCurrencyCode', from);
    viewModel.set('targetCurrencyCode', to);
}

function updateCurrencysAmounts()
{
    let from = currencyConvertionParticipantsGetBaseCurrency();
    let to = currencyConvertionParticipantsGetTargetCurrency();
    let multiplier = currencyConvertionGetMultiplier(from ,to);
    viewModel.set('baseCurrencyAmount', userNumberInputGetAsString());
    viewModel.set('targetCurrencyAmount', userNumberInputGetAsNumber() * multiplier);
}

function clearUserInput()
{
    userNumberInputClear();
    updateCurrencysAmounts();
}

function deleteLastInputOfUser()
{
    userNumberInputRemoveLastSymbol();
    updateCurrencysAmounts();
}

function addSymbolToUserInput(args)
{
    let number = args.object.text;
    userNumberInputAddSymbol(number);
    updateCurrencysAmounts();
}

async function updateCurrencyExchangeRates()
{
    let status = await currencyConvertionUpdateMultipliers();
    if (status === 1)
    {
        DisplayErrorMessage('Невозможно подключиться к серверу. Обновление валютных курсов невозможно.');
        return;
    }
    updateCurrencysAmounts();
    updateDisplayOfCurrencyRateRelevanse();
    updateDisplayOfCurrencyExchangeRate();
}

function swapConvertionParticipants()
{
    let baseCurrency = currencyConvertionParticipantsGetBaseCurrency();
    let targetCurrency = currencyConvertionParticipantsGetTargetCurrency();
    currencyConvertionParticipantsSetTargetCurrency(baseCurrency);
    currencyConvertionParticipantsSetBaseCurrency(targetCurrency);
    updateCurrencysCodes();
    updateCurrencysAmounts();
    updateDisplayOfCurrencyExchangeRate();
}

function changeTargetCurrency()
{
    Frame.topmost().navigate({
        moduleName: '~/View/changeCurrency/changeCurrency',
        context: { isChangingTargetCurrency: true }
    });
}

function changeBaseCurrency()
{
    Frame.topmost().navigate({
        moduleName: '~/View/changeCurrency/changeCurrency',
        context: { isChangingTargetCurrency: false }
    });
}

export async function createViewModel()
{
    viewModel.clearUserInput = clearUserInput;
    viewModel.deleteLastInputOfUser = deleteLastInputOfUser;
    viewModel.addSymbolToUserInput = addSymbolToUserInput;
    viewModel.swapConvertionParticipants = swapConvertionParticipants;
    viewModel.changeTargetCurrency = changeTargetCurrency;
    viewModel.changeBaseCurrency = changeBaseCurrency;
    viewModel.updateCurrencyExchangeRates = updateCurrencyExchangeRates;
    await updateCurrencyExchangeRates();
    updateCurrencysCodes();
    updateCurrencysAmounts();
    return viewModel;
}
