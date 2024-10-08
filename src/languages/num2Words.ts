// // numToWords.ts

// type NumToWords = (number: number | string) => string;

// const numToWords: NumToWords = (n) => {
//   const a = [
//     '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
//     'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
//     'seventeen', 'eighteen', 'nineteen'
//   ];

//   const b = [
//     '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
//   ];

//   const g = [
//     '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
//     'sextillion', 'septillion', 'octillion', 'nonillion'
//   ];

//   const arr = (x: string): string[] => Array.from(x);
//   const num = (x: string): number => Number(x) || 0;
//   const isEmpty = (xs: string[]): boolean => xs.length === 0;
//   const take = (n: number) => (xs: string[]): string[] => xs.slice(0, n);
//   const drop = (n: number) => (xs: string[]): string[] => xs.slice(n);
//   const comp = <T, U, V>(f: (x: T) => V) => (g: (x: U) => T) => (x: U): V => f(g(x));
//   const not = (x: boolean): boolean => !x;
//   const isEmptyFilter = (x: unknown): boolean => Array.isArray(x) && isEmpty(x as string[]);
//   const chunk = (n: number) => (xs: string[]): string[][] =>
//     isEmpty(xs) ? [] : [take(n)(xs)].concat(chunk(n)(drop(n)(xs)));

//   // Helper function to construct a group of three digits
//   const makeGroup = ([ones, tens, huns]: string[]): string => {
//     return [
//       huns ? a[num(huns)] + ' hundred ' : '',
//       tens === '1' ? a[Number(tens + ones)] : b[num(tens)] && b[num(tens)] + (ones ? '-' : '') || '',
//       a[num(ones)] || ''
//     ].join('');
//   };

//   const thousand = (group: string, i: number): string => {
//     return group ? group + ' ' + g[i] : group;
//   };

//   const numToWordsFunction = (n: string | number): string => {
//     if (typeof n === 'number') return numToWords(String(n));
//     if (n === '0') return 'zero';

//     // Fix: Add type assertions to ensure the correct type
//     return chunk(3)(arr(String(n)) as string[])
//     .map(makeGroup)
//     .map(thousand)
//     .filter(comp(not)(isEmptyFilter))
//     .reverse()
//     .join(' ');

//   };
//   return numToWordsFunction(n);
// };

// export default numToWords




// src/languages/num2Word.ts
import { trimLeadingNegatives, getWholeNumber, getDecimalNumber } from '../utils/num2English';

async function getLanguageModule(lang: string) {
    switch (lang) {
        case 'en':
            return import('../utils/num2English');

        default:
            throw new Error('Unsupported language');
    }
}

export async function num2Word(number: number | string, lang: string = 'en'): Promise<string> {
    const langModule = await getLanguageModule(lang);
    const { coreNumbers, tens, larger } = langModule;

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

    wordedNumber = getWholeNumber(wholeNumber, { coreNumbers, tens, larger }) + " " + getDecimalNumber(decimalNumber, coreNumbers);

    return wordedNumber.trim();
}

export default num2Word;
