# num2talk

Converts number to multi language Talking text

## Installation

```bash
npm install num2talk
```

or

```bash
yarn add num2talk
```

## Usage



## Basic Usage

```javascript

const num2talk = require('num2talk')

num2talk(123)
// 

```

## Options

| Option                    | Type                 | Default        | Description                                                                        |
| ----------------------- | -------------------- | -------------- | ---------------------------------------------------------------------------------- |
| lang                    | `Language`             | `'en'`        | Output text language, default to Vietnamese; `Language = 'vi' \| 'en'`
| textTransform           | `TextTransformProps`             | `'capitalizeFirstLetter'`       |  Text transform style `TextTransformProps = 'capitalizeWords' \| 'capitalizeFirstLetter' \| 'uppercase' \| 'lowercase'`                          |
| currencyUnit                    | `string`            | `undefined`        | Unit of currency                                            |
| commaSeparator                 | `boolean`             | `false`          | Comma separator in output text                                                             |

## License

MIT License