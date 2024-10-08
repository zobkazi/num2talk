// src/languages/num2Hi.ts

import { trimLeadingNegatives, getWholeNumber, getDecimalNumber } from '../utils/num2Hindi';

const num2Hindi =(number: number | string): string => {
    if (number === '' || (typeof number !== 'number' && typeof number !== 'string')) {
        throw new Error('संख्या या खाली स्ट्रिंग प्रदान करनी होगी।');
    }

    const stringNumber = trimLeadingNegatives(number.toString()).replace(/,/g, '');
    let wordedNumber = '';
    let parts: string[] = [];
    let wholeNumber = '';
    let decimalNumber = '';

    if (isNaN(Number(stringNumber))) {
        throw new Error(`${number} एक संख्या नहीं है।`);
    }

    parts = stringNumber.split('.');
    wholeNumber = parts[0] || '0';
    decimalNumber = parts[1] || '';

    if (typeof number === 'number' && parseInt(wholeNumber, 10) >= Number.MAX_SAFE_INTEGER) {
        return `${number} को संख्या के रूप में पास करने के लिए बहुत बड़ा है। कृपया इसे स्ट्रिंग के रूप में पास करें।`;
    } else if (wholeNumber.length > 306) {
        throw new Error(`${number} अधिकतम संख्या रूपांतरण सीमा से बाहर है। की अधिकतम संख्या रूपांतरण सीमा से बाहर है।`);
    }

    wordedNumber = getWholeNumber(wholeNumber) + " " + getDecimalNumber(decimalNumber);

    return wordedNumber.trim();
}

export default num2Hindi;
