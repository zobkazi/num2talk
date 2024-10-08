// src/languages/num2Word.ts
import { trimLeadingNegatives, getWholeNumber, getDecimalNumber } from '../utils/num2Russian';

const num2Russian = (number: number | string): string =>{
    if (number === '' || (typeof number !== 'number' && typeof number !== 'string')) {
        throw new Error('Must supply a number or non-empty string argument.');
    }

    const stringNumber = trimLeadingNegatives(number.toString()).replace(/,/g, '');
    let wordedNumber = '';
    let parts: string[] = [];
    let wholeNumber = '';
    let decimalNumber = '';

    if (isNaN(Number(stringNumber))) {
        throw new Error(`${number} is not a number.`);
    }

    parts = stringNumber.split('.');
    wholeNumber = parts[0] || '0';
    decimalNumber = parts[1] || '';

    if (typeof number === 'number' && parseInt(wholeNumber, 10) >= Number.MAX_SAFE_INTEGER) {
        return `${number} is too large to be passed as a number. Pass number in as a string.`;
    } else if (wholeNumber.length > 306) {
        throw new Error(`${number} exceeds num2Word's maximum number conversion.`);
    }

    wordedNumber = getWholeNumber(wholeNumber);
if (decimalNumber) {
    wordedNumber += " و " + getDecimalNumber(decimalNumber);
}

    wordedNumber = wordedNumber.trim();

    return wordedNumber.trim();
}

export default num2Russian;
