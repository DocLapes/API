/**
 * @file Subsystem for storing number inputed by user.
 */

let userNumberInput = '';

/**
 * Returns user's input as string
 * @return {string}
 */
export function userNumberInputGetAsString()
{
    return userNumberInput;
}

/**
 * Returns user's input as number.
 * @return {number}
 */
export function userNumberInputGetAsNumber()
{
    if (userNumberInput === '')
        return 0.0;
    return parseFloat(userNumberInput);
}

/**
 * Clears user's input.
 * @return {void}
 */
export function userNumberInputClear()
{
     userNumberInput = '';
}

/**
 * Removes last added symbol of user's input.
 * @return {void}
 */
export function userNumberInputRemoveLastSymbol()
{
    if (userNumberInput.length === 0)
        return;
    userNumberInput = userNumberInput.slice(0, -1);
}

function isDecimalDelimiter(chr)
{
    return (chr === '.') || (chr === ',');
}

function isDigit(chr)
{
    return (chr >= '0') && (chr <= '9');
}

function isExponent(chr)
{
    return (chr === 'e') || (chr === 'E');
}

function countDecimalDelimiters(str)
{
   let result = 0;
   for (let chr of str)
       if (isDecimalDelimiter(chr))
           result++;
   return result;
}

function countExponents(str)
{
    let result = 0;
    for (let chr of str)
        if (isExponent(chr))
            result++;
    return result;
}

function AppendExponentToUserInput()
{
    if (userNumberInput === '')
        return;
    if (countExponents(userNumberInput) === 0)
        userNumberInput += 'e';
}

function AppendDecimalDelimiterToUserInput()
{
    if (userNumberInput === '')
        return;
    if (countDecimalDelimiters(userNumberInput) === 0)
        userNumberInput += '.';
}

function AppendDigitToUserInput(chr)
{
    if (userNumberInput !== '0')
        userNumberInput += chr;
}

export class NumberCantContainGivenSymbolException extends Error
{
    symbol;
    constructor(symbol)
    {
        super("Can't add symbol" + symbol +  " to number, because this part can't be contained in a number");
        this.symbol = symbol;
    }
}

/**
 * Adds new element to user's input.
 * @param {char} symbol
 * @return {void}
 */
export function userNumberInputAddSymbol(symbol)
{
    if (symbol === '')
        return;
    if (isExponent(symbol))
    {
        AppendExponentToUserInput();
        return;
    }
    if (isDecimalDelimiter(symbol))
    {
        AppendDecimalDelimiterToUserInput();
        return;
    }
    if (isDigit(symbol))
    {
        AppendDigitToUserInput(symbol);
        return;
    }
    throw new NumberCantContainGivenSymbolException(symbol);
}
