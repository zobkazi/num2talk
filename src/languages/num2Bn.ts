// src/languages/num2bn.ts
import { num2Money } from '../utils/num2Bengali'; // Import Bangla number converter

export default function num2Bangla(number: number | string): string {
    const stringNumber = number.toString().replace(/,/g, ''); // Remove commas if any
    const [wholeNumber, decimalNumber] = stringNumber.split('.');

    // Convert the whole number part
    let wordedMoney = num2Money(wholeNumber) + ' টাকা'; // Add 'টাকা' to the whole number

    // If there's a decimal part (e.g., paisa), convert it
    if (decimalNumber && parseInt(decimalNumber, 10) > 0) {
        wordedMoney += ' ' + num2Money(decimalNumber) + ' পয়সা';
    }

    return wordedMoney.trim();
}

