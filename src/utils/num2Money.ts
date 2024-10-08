// /src/utils/num2Money.ts

// Bangla words for numbers 0-19
const coreNumbers: Record<string, string> = {
 '0': 'শূন্য', '1': 'এক', '2': 'দুই', '3': 'তিন', '4': 'চার',
    '5': 'পাঁচ', '6': 'ছয়', '7': 'সাত', '8': 'আট', '9': 'নয়',
    '10': 'দশ', '11': 'এগারো', '12': 'বারো', '13': 'তেরো',
    '14': 'চৌদ্দ', '15': 'পনেরো', '16': 'ষোল', '17': 'সতেরো',
    '18': 'আঠারো', '19': 'ঊনিশ', '20': 'বিশ', '21': 'একুশ', 
    '22': 'বাইশ', '23': 'তেইশ', '24': 'চব্বিশ', '25': 'পঁচিশ', 
    '26': 'ছাব্বিশ', '27': 'সাতাশ', '28': 'আটাশ', '29': 'ঊনত্রিশ', 
    '30': 'ত্রিশ', '31': 'একত্রিশ', '32': 'বত্রিশ', '33': 'তেত্রিশ', 
    '34': 'চৌত্রিশ', '35': 'পঁইত্রিশ', '36': 'ছত্রিশ', '37': 'সাঁইত্রিশ', 
    '38': 'আটত্রিশ', '39': 'ঊনচল্লিশ', '40': 'চল্লিশ', '41': 'একচল্লিশ', 
    '42': 'বিয়াল্লিশ', '43': 'তেতাল্লিশ', '44': 'চুয়াল্লিশ', 
    '45': 'পঁইতাল্লিশ', '46': 'ছেচল্লিশ', '47': 'সাতচল্লিশ', 
    '48': 'আটচল্লিশ', '49': 'ঊনপঞ্চাশ', '50': 'পঞ্চাশ', 
    '51': 'একান্ন', '52': 'বায়ান্ন', '53': 'তিপ্পান্ন', '54': 'চুয়ান্ন', 
    '55': 'পঞ্চান্ন', '56': 'ছাপ্পান্ন', '57': 'সাতান্ন', '58': 'আটান্ন', 
    '59': 'ঊনষাট', '60': 'ষাট', '61': 'একষট্টি', '62': 'বাষট্টি', 
    '63': 'তেষট্টি', '64': 'চৌষট্টি', '65': 'পঁইষট্টি', '66': 'ছেষট্টি', 
    '67': 'সাতষট্টি', '68': 'আটষট্টি', '69': 'ঊনসত্তর', '70': 'সত্তর', 
    '71': 'একাত্তর', '72': 'বাহাত্তর', '73': 'তিয়াত্তর', '74': 'চুয়াত্তর', 
    '75': 'পঁচাত্তর', '76': 'ছিয়াত্তর', '77': 'সাতাত্তর', '78': 'আটাত্তর', 
    '79': 'ঊনআশি', '80': 'আশি', '81': 'একাশি', '82': 'বিরাশি', 
    '83': 'তিরাশি', '84': 'চুরাশি', '85': 'পঁচাশি', '86': 'ছিয়াশি', 
    '87': 'সাতাশি', '88': 'আটাশি', '89': 'ঊননব্বই', '90': 'নব্বই', 
    '91': 'একানব্বই', '92': 'বিরানব্বই', '93': 'তিরানব্বই', 
    '94': 'চুরানব্বই', '95': 'পঁচানব্বই', '96': 'ছিয়ানব্বই', 
    '97': 'সাতানব্বই', '98': 'আটানব্বই', '99': 'নিরানব্বই', 
    '100': 'শত', '1000': 'হাজার', '100000': 'লক্ষ', '10000000': 'কোটি'
};

// Bangla words for tens (20, 30, 40, etc.)
const tensNumbers: Record<string, string> = {
    '2': 'বিশ', '3': 'ত্রিশ', '4': 'চল্লিশ', '5': 'পঞ্চাশ',
    '6': 'ষাট', '7': 'সত্তর', '8': 'আশি', '9': 'নব্বই'
};

// Bangla words for large numbers (like thousand, lakh, crore)
const largeNumbers: Record<string, string> = {
   '1': 'হাজার', '2': 'লক্ষ', '3': 'কোটি', '4': 'অর্থ',
    '5': 'পড়শ', '6': 'চোদ্দ', '7': 'পঁইল্ল', '8': 'সন্তস', '9': 'বিলিয়ন',
    '10': 'দশেরী', '11': 'একাদশ',
};

// Main export function to handle both small and large numbers
export function num2Bn(number: string): string {
    if (number.length <= 2) {
        return convertSmallNumbers(number); // Handle numbers up to 99
    } else if (number.length <= 3) {
        return convertHundreds(number); // Handle numbers from 100 to 999
    } else {
        return convertLargeNumbers(number); // Handle larger numbers like thousands and above
    }
}

// Converts small numbers (0-19) and tens (20-99) to Bengali
function convertSmallNumbers(number: string): string {
    if (coreNumbers[number]) {
        return coreNumbers[number]; // Direct match for 0-19
    }

    const tens = number[0];
    const ones = number[1];

    return tensNumbers[tens] + (ones !== '0' ? ' ' + coreNumbers[ones] : '');
}

// Converts numbers from 100-999 (like 123) to Bengali (e.g., একশত তেইশ)
function convertHundreds(number: string): string {
    const hundreds = number[0]; // The 'hundreds' place (1-9)
    const rest = number.slice(1); // The remaining part (01-99)

    if (rest === '00') {
        return coreNumbers[hundreds] + 'শত'; // Handle numbers like 100, 200, etc.
    } else {
        return coreNumbers[hundreds] + 'শত ' + convertSmallNumbers(rest); // Combine hundreds and tens/ones
    }
}

// Converts large numbers (like 1000, 10000) to Bengali
function convertLargeNumbers(number: string): string {
    const groups = splitIntoGroups(number); // Splits the number into chunks (e.g., ['99', '90'])
    let result = '';

    // Iterate over the groups (thousands, lakhs, crores, etc.)
    groups.forEach((group, index) => {
        if (parseInt(group, 10) > 0) {
            if (index === 0 && groups.length === 2) {
                // Special case for thousands (like 9990)
                result += num2Bn(group) + ' হাজার';
            } else {
                // For larger numbers, apply the standard formatting
                result += num2Bn(group) + ' ' + (largeNumbers[(groups.length - 1 - index)] || '') + ' ';
            }
        }
    });

    // Fix the special case for 4-digit numbers like 1092
    if (number.length === 4 && number[0] === '1') {
        result = result.replace('হাজার', 'দশ হাজার');
    }

    return result.trim();
}





// Splits large numbers into groups of 2 digits each (e.g., 12345 -> ['12', '34', '5'])
function splitIntoGroups(wholeNumber: string): string[] {
    const groups: string[] = [];
    const length = wholeNumber.length;

    for (let i = length; i > 0; i -= 2) {
        const group = wholeNumber.slice(Math.max(0, i - 2), i);
        groups.unshift(group);
    }

    return groups;
}
