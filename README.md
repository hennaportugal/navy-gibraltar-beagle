
## Plentina Backend Developer Challenge
The aim of this challenge is to implement the requirements laid out below and to improve on the existing codebase. You may not import any other libraries other than the ones provided already in `package.json`.

Upload your work in a public git repository with a name randomly generated from this website: https://www.imprima.com/resources/project-name-generator (if prompted to do so)

## System Requirements

1) Node v10 LTS

## Installation

```bash
$ npm install
```

## Usage
To run the app:
```bash
$ npm run test
```

## Challenge Specifications
There exists a model `Money` intended to store its `amount` and its `scale`, the number of decimals it contains.

Examples:
```
PHP 2.45
const sampleUsd = {
    amount: 245,
    scale: 2
}
```

```
KRW 12000
const sampleKRW = {
    amount: 12000,
    scale: 0 
}
```

Complete the challenge by doing the following:
1) Finish the `/healthCheck` endpoint by returning your entire name as a string in the json response
2) Implement the unfinished `allocate()` method. This method splits the given `money` object into either
- Equal parts of `n`
- Split into multiple based on the given ratios of `[ n, m, o ]`
3) Implement the unfinished `add()` method. This method adds two `money` objects. The output retains the scale of the left-hand side addend.
4) Implement the unfinished `subtract()` method. The output retains the scale of the minuend.
5) Implement the unfinished `multiply()` method. This method accepts the `factor` to multiply to and the `scale`, the number of decimals, of the factor
6) Implement additional unit tests if necessary
7) Restructure the code as you see fit

## Submission
Send an email to [careers@plentina.com](mailto:careers@plentina.com) and CC [arel@plentina.com](mailto:arel@plentina.com) with the link to your git repository.
