// Core numbers from 0 to 19 in Bangla
const coreNumbers: Record<string, string> = {
    '0': 'শূন্য', '1': 'এক', '2': 'দুই', '3': 'তিন', '4': 'চার',
    '5': 'পাঁচ', '6': 'ছয়', '7': 'সাত', '8': 'আট', '9': 'নয়',
    '10': 'দশ', '11': 'এগারো', '12': 'বারো', '13': 'তেরো',
    '14': 'চৌদ্দ', '15': 'পনের', '16': 'ষোল', '17': 'সতেরো',
    '18': 'অষ্টাদশ', '19': 'উনিশ'
};

// Tens place numbers in Bangla
const irty: Record<string, string> = {
    '2': 'বিশ', '3': 'ত্রিশ', '4': 'চল্লিশ', '5': 'পঞ্চাশ',
    '6': 'ষাট', '7': 'সত্তর', '8': 'অসির', '9': 'নব্বই'
};

// Larger numbers mapping in Bangla
const larger: Record<string, string> = {
    '1': 'হাজার', '2': 'মিলিয়ন', '3': 'বিলিয়ন', '4': 'ট্রিলিয়ন',
    '5': 'কোয়াড্রিলিয়ন', '6': 'কুইন্টিলিয়ন', '7': 'সেক্সটিলিয়ন',
    '8': 'সেপ্টিলিয়ন', '9': 'অক্টিলিয়ন', '10': 'ননিলিয়ন',
    '11': 'ডেসিলিয়ন', '12': 'উন্ডেসিলিয়ন', '13': 'ডুওডেসিলিয়ন',
    '14': 'ট্রেডেসিলিয়ন', '15': 'কোয়াটুডেসিলিয়ন', '16': 'কুইনডেসিলিয়ন',
    '17': 'সেক্সডেসিলিয়ন', '18': 'সেপ্টেডেসিলিয়ন', '19': 'অক্টোডেসিলিয়ন',
    '20': 'নোভেমডেসিলিয়ন', '21': 'বিগেন্টিলিয়ন', '22': 'উনবিগেন্টিলিয়ন',
    '23': 'ডুওবিগেন্টিলিয়ন', '24': 'ট্রেবিগেন্টিলিয়ন', '25': 'কোয়াটুওবিগেন্টিলিয়ন',
    '26': 'কুইনবিগেন্টিলিয়ন', '27': 'সেক্সবিগেন্টিলিয়ন', '28': 'সেপ্টেনবিগেন্টিলিয়ন',
    '29': 'অক্টোবিগেন্টিলিয়ন', '30': 'নোভেমবিগেন্টিলিয়ন', '31': 'ত্রিগেন্টিলিয়ন',
    // The list continues based on the required scale
};

export default num2Word;

/**
 * Takes a number and converts it to an equivalent Bangla word form
 *
 * @param {number | string} number - Number or string representation of number to be converted to a word
 * @returns {string} Number as a Bangla word
 */
function num2Word(number: number | string): string {
    // check valid argument
    if (number === '' || (typeof number !== 'number' && typeof number !== 'string')) {
        throw Error('Must supply a number or non-empty string argument.');
    }

    // allow multiple leading negatives and allow commas
    const stringNumber = trimLeadingNegatives(number.toString()).replace(/,/g, '');
    let wordedNumber = '';
    let parts: string[] = [];
    let wholeNumber = '';
    let decimalNumber = '';

    // not a number check
    if (isNaN(Number(stringNumber))) {
        throw Error(`${number} is not a number.`);
    }

    parts = stringNumber.split('.');
    wholeNumber = parts[0];
    decimalNumber = parts[1];

    // check if whole number is too large as a number or string
    if (typeof number === 'number' && parseInt(wholeNumber, 10) >= Number.MAX_SAFE_INTEGER) {
        return `${number} is too large to be passed as a number. Pass number in as a string.`;
    } else if (wholeNumber.length > 306) {
        throw Error(`${number} exceeds num2Word's maximum number conversion.`);
    }

    // check if decimal number is too small
    if (decimalNumber && parseFloat("." + decimalNumber) <= Number.MIN_VALUE) {
        decimalNumber = '0';
    }

    // negative number check
    if (wholeNumber[0] === "-") {
        wordedNumber = "নেতিবাচক " + getWholeNumber(wholeNumber.substring(1)) + " " + getDecimalNumber(decimalNumber);
    } else {
        wordedNumber = getWholeNumber(wholeNumber) + " " + getDecimalNumber(decimalNumber);
    }

    // remove trailing space when there is no decimal number, e.g only whole numbers
    return wordedNumber.trim();
}

function getWholeNumber(wholeNumber: string): string {
    if (wholeNumber === '') {
        return 'শূন্য'; //or '' but tests would currently break
    }

    const words: string[] = [];
    let parsedObject;
    let wordedNumber = '';

    // iterate through whole number parsing the largest unit
    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) {
            break;
        }
    }

    // determines if the last word can be zero
    if (words.length > 1 && words[words.length - 1] === 'শূন্য') {
        words.pop();
    }

    // join the words
    wordedNumber = words.join(" ");

    return wordedNumber;
}

function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) {
        return ''; // no decimal number found
    }

    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char]);
    }

    return 'দশমিক ' + words.join(' ');
}

function parseLargestNumber(wholeNumber: string): { largestNumber2Word: string, subNumber: string } {
    const numberGroup: string[] = splitIntoGroups(wholeNumber);

    let largestNumber2Word = '';
    let largestGroup: string;
    let multiplier = numberGroup.length;

    for (const group of numberGroup) {
        largestGroup = group;

        // add word for the group if it's not 0
        if (parseInt(largestGroup, 10) !== 0) {
            largestNumber2Word += getGroupNumber(largestGroup);
            // add the word for the place value
            if (multiplier > 1) {
                largestNumber2Word += ' ' + larger[multiplier.toString()];
            }
            largestNumber2Word += ' ';
        }
        multiplier--;
    }

    return { largestNumber2Word: largestNumber2Word.trim(), subNumber: '' };
}

function splitIntoGroups(wholeNumber: string): string[] {
    const groups: string[] = [];
    const length = wholeNumber.length;

    for (let i = length; i > 0; i -= 3) {
        const group = wholeNumber.slice(Math.max(0, i - 3), i);
        groups.unshift(group);
    }

    return groups;
}

function getGroupNumber(group: string): string {
    if (parseInt(group, 10) >= 100) {
        return `${coreNumbers[group[0]]} শত`;
    }

    let groupNumber = '';
    const tensPlace = parseInt(group[1], 10);
    const onesPlace = parseInt(group[2], 10);

    // if the group is a double digit number
    if (group.length === 2) {
        if (tensPlace === 1) {
            return coreNumbers[group];
        } else if (tensPlace > 1) {
            groupNumber += irty[tensPlace.toString()];
            if (onesPlace > 0) {
                groupNumber += ' ' + coreNumbers[onesPlace.toString()];
            }
            return groupNumber;
        }
    }

    // if the group is a single digit number
    if (group.length === 1) {
        return coreNumbers[onesPlace.toString()];
    }

    return groupNumber; // for safety
}

/**
 * Remove leading zeros from a string
 *
 * @param {string} number - Input string
 * @returns {string} String without leading zeros
 */
function trimLeadingZeros(number: string): string {
    return number.replace(/^0+/, '') || '0';
}

/**
 * Remove leading negatives from a string
 *
 * @param {string} number - Input string
 * @returns {string} String without leading negatives
 */
function trimLeadingNegatives(number: string): string {
    return number.replace(/^-+/, '');
}
