// src/utils/num2WordUtils.ts
// Core numbers from 0 to 19 in Arabic
export const coreNumbers: Record<string, string> = {
    '0': 'صفر', '1': 'واحد', '2': 'اثنان', '3': 'ثلاثة', '4': 'أربعة',
    '5': 'خمسة', '6': 'ستة', '7': 'سبعة', '8': 'ثمانية', '9': 'تسعة',
    '10': 'عشرة', '11': 'أحد عشر', '12': 'اثنا عشر', '13': 'ثلاثة عشر',
    '14': 'أربعة عشر', '15': 'خمسة عشر', '16': 'ستة عشر', '17': 'سبعة عشر',
    '18': 'ثمانية عشر', '19': 'تسعة عشر'
};

// Tens place numbers in Arabic
export const tens: Record<string, string> = {
    '2': 'عشرون', '3': 'ثلاثون', '4': 'أربعون', '5': 'خمسون',
    '6': 'ستون', '7': 'سبعون', '8': 'ثمانون', '9': 'تسعون'
};

// Larger number groups in Arabic (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': 'ألف', '2': 'مليون', '3': 'مليار', '4': 'تريليون', '5': 'كوادريليون',
    '6': 'كوينتيليون', '7': 'سيكستيليون', '8': 'سبتيليون', '9': 'أوكتيليون', '10': 'نونيليون',
    '11': 'دسيليون', '12': 'أوندسيليون', '13': 'دودسيليون', '14': 'تريدسيليون', '15': 'كواتوردسيليون',
    '16': 'كويندسيليون', '17': 'سيكسدسيليون', '18': 'سبتندسيليون', '19': 'أوكتودسيليون',
    '20': 'نوفيمدسيليون', '21': 'فيجينتيليون', '22': 'أونفيجينتيليون', '23': 'دوفجينتيليون',
    '24': 'تريفجينتيليون', '25': 'كواتورفجينتيليون', '26': 'كوينفجينتيليون', '27': 'سيكسفجينتيليون',
    '28': 'سبتينفجينتيليون', '29': 'أوكوفجينتيليون', '30': 'نوفيمفجينتيليون', '31': 'تريجينتيليون',
    '32': 'أونتريجينتيليون', '33': 'دوتريجينتيليون', '34': 'تريتريجينتيليون', '35': 'كواتورريجينتيليون',
    '36': 'كوينتريجينتيليون', '37': 'سيكستريجينتيليون', '38': 'سبتنتريجينتيليون', '39': 'أوكوتريجينتيليون',
    '40': 'نوفيمتريجينتيليون', '41': 'كوادراجينتيليون', '42': 'أونكوادراجينتيليون', '43': 'دوكوادراجينتيليون',
    '44': 'تريكوادراجينتيليون', '45': 'كواتوركوادراجينتيليون', '46': 'كوينكوادراجينتيليون',
    '47': 'سيكسكوادراجينتيليون', '48': 'سبتينكوادراجينتيليون', '49': 'أوكوكوادراجينتيليون',
    '50': 'نوفيمكوادراجينتيليون', '51': 'كوينكواجينتيليون', '52':'أونكوينكواجينتيليون',
    '53': 'دوكوينكواجينتيليون', '54': 'تريكواجينتيليون', '55': 'كواتوركوينكواجينتيليون',
    '56': 'كوينكوينكواجينتيليون', '57': 'سيكسكوينكواجينتيليون', '58': 'سبتينكوينكواجينتيليون',
    '59': 'أوكوكوينكواجينتيليون', '60': 'نوفيمكوينكواجينتيليون', '61': 'سيكساجينتيليون',
    '62': 'أونسيساجينتيليون', '63': 'دوسيساجينتيليون', '64': 'تريساجينتيليون', '65': 'كواتورسيساجينتيليون',
    '66': 'كوينسيساجينتيليون', '67': 'سيكسسيساجينتيليون', '68': 'سبتينسيساجينتيليون', '69': 'أوكوسيساجينتيليون',
    '70': 'نوفيمسيساجينتيليون', '71': 'سبتواجينتيليون', '72': 'أونسبتواجينتيليون', '73': 'دوسبتواجينتيليون',
    '74': 'تريسوجاجينتيليون', '75': 'كواتورسوجاجينتيليون', '76': 'كوينسبتواجينتيليون',
    '77': 'سيكسسبتواجينتيليون', '78': 'سبتينسبتواجينتيليون', '79': 'أوكوسبتواجينتيليون',
    '80': 'نوفيمسبتواجينتيليون', '81': 'أوكتاجينتيليون', '82': 'أونوكتاجينتيليون', '83': 'دواوكتاجينتيليون',
    '84': 'تريوكتاجينتيليون', '85': 'كواتوروكتاجينتيليون', '86': 'كوينوكوتاجينتيليون', '87': 'سيكسوكوتاجينتيليون',
    '88': 'سبتينوكوتاجينتيليون', '89': 'أوكوتاجينتيليون', '90': 'نوفيموكتاجينتيليون', '91': 'نوناجينتيليون',
    '92': 'أوننوناجينتيليون', '93': 'دونوناجينتيليون', '94': 'ترينوناجينتيليون', '95': 'كواتورنوناجينتيليون',
    '96': 'كويننوناجينتيليون', '97': 'سيكسنوناجينتيليون', '98': 'سبتيننوناجينتيليون', '99': 'أوكونوناجينتيليون',
    '100': 'سنتيليون'
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
    if (wholeNumber === '') return 'أربعة';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'أربعة') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'أربعة');
    }
    return 'نقطة ' + words.join(' ');
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
    
    if (num === 0) return 'صفر';  // تعديل هنا
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} مائة `;
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
