# Bridging Languages Through Number Translation – Supporting 10 Popular Languages.


### num2talk Documentation


`num2talk` is a JavaScript package that provides functions to convert numbers into words in various languages, including English, Bengali, Hindi, Arabic, Chinese, Urdu, Portuguese, Russian, Japanese, and Spanish.

### Installation

You can install `num2talk` via npm:

```bash
npm install num2talk
```

### Usage

After installation, you can import the specific number-to-word functions you need in your project.

```javascript
import { num2Word, num2Bangla, num2Hi } from 'num2talk';

// Example usage
console.log(num2Word(123));       // Converts to English words: "one hundred twenty-three"
console.log(num2Bangla(456));     // Converts to Bengali words: "চারশ পঁচাশি"
console.log(num2Hi(789));         // Converts to Hindi words: "सात सौ नवासी"
```

### Language Functions Table

The following table outlines the available languages, their respective functions, and usage examples.

| Language   | Function        | Usage Example                             | Output                           |
|------------|-----------------|------------------------------------------|----------------------------------|
| English    | `num2English`      | `num2English(12345)`                       | "twelve thousand three hundred forty-five" |
| English    | `num2Words`      | `num2Words(12345)`                       | "twelve thousand three hundred forty-five"|| Bengali    | `num2Bangla`    | `num2Bangla(678)`                       | "ছয়শ আটাত্তর"                   |
| Hindi      | `num2Hindi`        | `num2Hindi(101)`                           | "एक सौ एक"                      |
| Arabic     | `num2Arabic`    | `num2Arabic(345)`                       | "ثلاثمائة وخمسة وأربعون"      |
| Chinese    | `num2Chinese`   | `num2Chinese(5678)`                     | "五千六百七十八"                |
| Urdu       | `num2Urdu`      | `num2Urdu(901)`                         | "نو سو ایک"                     |
| Portuguese | `num2Portuguese` | `num2Portuguese(2345)`                 | "dois mil trezentos e quarenta e cinco" |
| Russian    | `num2Russian`   | `num2Russian(890)`                      | "восемьсот девяносто"           |
| Japanese   | `num2Japanese`  | `num2Japanese(1234)`                    | "千二百三十四"                  |
| Spanish    | `num2Spanish`   | `num2Spanish(567)`                      | "quinientos sesenta y siete"    |

### Example Usage

Here’s how to use some of the functions:

#### English

```javascript
import { num2Word } from 'num2talk';
console.log(num2Word(12345)); // "twelve thousand three hundred forty-five"
```

#### Bengali

```javascript
import { num2Bangla } from 'num2talk';
console.log(num2Bangla(678)); // "ছয়শ আটাত্তর"
```

#### Hindi

```javascript
import { num2Hi } from 'num2talk';
console.log(num2Hi(101)); // "एक सौ एक"
```

### Contributing

If you wish to contribute to the development of `num2talk`, feel free to fork the repository and submit pull requests. Ensure you follow the coding conventions and include tests for any new features you add.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- Thank you to all contributors and users for your support in improving this package.

---

### Additional Sections (if needed)

- **Changelog**: Document any updates, fixes, or improvements made to the package over time.
- **FAQ**: Address common questions or issues users might encounter.
- **Contributing**: Provide instructions for how to contribute to the project.
- **Credits**: List any third-party libraries or resources used in the package.
- **License**: Include a copy of the license used for the package.