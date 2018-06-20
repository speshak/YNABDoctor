# YNABReporting

Using YNAB and the YNAB API to generate customised, monthly reports. After you entered all your transactions every month in YNAB, you can use YNABReporting to automatically send you a report via E-Mail at the end of each month. 

The report helps you understand your spending habits with clear numbers, and gives you a base for your budgets decisions for the following month.

This app is using the official [YNAB API](https://github.com/ynab/ynab-sdk-js). 

## Prerequirements

1. `node` has to be installed
2. MongoDB has to be installed and running in the background

## Install

1. `git clone git@github.com:gruberb/YNABReporting.git`
2. `cd YNABReporting && npm i`

## Setup

Create a `.env` file in the root directory with:

```
accessToken=YNAB_API_TOKEN
mongoUrl=URL_TO_YOUR_MONGODB ('mongodb://localhost:27017')
mongoDBName=DB_NAME_TO_YOUR_LIKING
budgetName=YOUR_BUDGET_NAME
```

## Start

`npm start`
