// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': 'صفر', '1': 'ایک', '2': 'دو', '3': 'تین', '4': 'چار',
    '5': 'پانچ', '6': 'چھ', '7': 'سات', '8': 'آٹھ', '9': 'نو',
    '10': 'دس', '11': 'گیارہ', '12': 'بارہ', '13': 'تیرہ',
    '14': 'چودہ', '15': 'پندرہ', '16': 'سولہ', '17': 'سترہ',
    '18': 'اٹھارہ', '19': 'انیس'
};

// Tens place numbers
export const tens: Record<string, string> = {
    '2': 'بیس', '3': 'تیس', '4': 'چالیس', '5': 'پچاس',
    '6': 'ساٹھ', '7': 'ستر', '8': 'اسی', '9': 'نواں'
};

// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': 'ہزار', '2': 'ملین', '3': 'بلین', '4': 'کھرب', '5': 'کوانٹریلین',
    '6': 'پنچیلین', '7': 'سکسٹین', '8': 'سیپٹیلین', '9': 'آکٹیلین', '10': 'نونیلین',
    '11': 'دسین', '12': 'یازدہ', '13': 'بارہ', '14': 'چودہ', '15': 'پندرہ',
    '16': 'سولہ', '17': 'سترہ', '18': 'اٹھارہ', '19': 'انیس',
    '20': 'بیس', '21': 'اکیس', '22': 'بائیس', '23': 'تئیس', '24': 'چوبیس',
    '25': 'پچیس', '26': 'چھببیس', '27': 'ستائیس', '28': 'اٹھائیس', '29': 'نونتیس',
    '30': 'تیس', '31': 'اکتیس', '32': 'بتیس', '33': 'تھتیس', '34': 'چوتیس',
    '35': 'پینتیس', '36': 'چھتیس', '37': 'سینتیس', '38': 'آٹھتیس', '39': 'انتالیس',
    '40': 'چالیس', '41': 'اکتالیس', '42': 'بیالیس', '43': 'تینتالیس', '44': 'چوالیس',
    '45': 'پینتالیس', '46': 'چھالیس', '47': 'سترہ', '48': 'اٹھالیس', '49': 'نیا لئیس',
    '50': 'پچاس', '51': 'اکاون', '52': 'باہن', '53': 'تھرپن', '54': 'چودہ',
    '55': 'پچپن', '56': 'چھپن', '57': 'ستاون', '58': 'اٹھاون', '59': 'نواسی',
    '60': 'ساٹھ', '61': 'اکسٹھ', '62': 'باسٹھ', '63': 'تھسٹھ', '64': 'چوراسی',
    '65': 'پینسٹھ', '66': 'چھسٹھ', '67': 'ستراسی', '68': 'اٹھاسی', '69': 'نواسی',
    '70': 'ستر', '71': 'اکتھر', '72': 'بہتر', '73': 'تہتر', '74': 'چوہتر',
    '75': 'پچھتر', '76': 'چھہتر', '77': 'ستتر', '78': 'اٹھتر', '79': 'نواسی',
    '80': 'اسی', '81': 'اکاسی', '82': 'بیاسی', '83': 'تراسی', '84': 'چوراسی',
    '85': 'پچاسی', '86': 'چھاسی', '87': 'ستاسی', '88': 'اٹھاسی', '89': 'نواسی',
    '90': 'نواسی', '91': 'اکانوے', '92': 'بانوے', '93': 'تینانوے', '94': 'چورانوے',
    '95': 'پچانوے', '96': 'چھانوے', '97': 'ستانوے', '98': 'اٹھانوے', '99': 'نواسی',
    '100': 'سو', '101': 'ایک سو ایک'
};



// Trimming utility functions
export function trimLeadingNegatives(number: string): string {
    return number.replace(/^-+/, '');
}

export function trimLeadingZeros(number: string): string {
    return number.replace(/^0+/, '') || '0';
}

// Parsing number groups into words
export function getWholeNumber(wholeNumber: string): string {
    if (wholeNumber === '') return 'چار';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'چار') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'چار');
    }
    return 'نقط ' + words.join(' ');
}

// Parsing logic for the largest number group
export function parseLargestNumber(wholeNumber: string): { largestNumber2Word: string, subNumber: string } {
    const numberGroup: string[] = splitIntoGroups(wholeNumber);
    let largestNumber2Word = '';
    let multiplier = numberGroup.length;

    for (const group of numberGroup) {
        if (parseInt(group, 10) !== 0) {
            largestNumber2Word += getGroupNumber(group);
            if (multiplier > 1) {
                largestNumber2Word += ' ' + larger[(multiplier - 1).toString()];
            }
            largestNumber2Word += ' ';
        }
        multiplier--;
    }

    return { largestNumber2Word: largestNumber2Word.trim(), subNumber: '' };
}

// Split the number into groups of three digits
export function splitIntoGroups(wholeNumber: string): string[] {
    const groups: string[] = [];
    const length = wholeNumber.length;

    for (let i = length; i > 0; i -= 3) {
        const group = wholeNumber.slice(Math.max(0, i - 3), i);
        groups.unshift(group);
    }

    return groups;
}

// Convert each group of three digits into words
export function getGroupNumber(group: string): string {
    const num = parseInt(group, 10);
    
    if (num === 0) return 'چار';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} ایک سو ایک `;
    }

    // Handle tens and ones
    const lastTwo = group.slice(-2);
    
    if (parseInt(lastTwo, 10) < 20) {
        word += coreNumbers[lastTwo];
    } else {
        word += tens[lastTwo[0]];
        if (lastTwo[1] !== '0') {
            word += `-${coreNumbers[lastTwo[1]]}`;
        }
    }

    return word.trim();
}
