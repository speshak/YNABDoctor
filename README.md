# YNABReporting

Using YNAB and the YNAB API to generate customised, monthly reports. After you entered all your transactions every month in YNAB, you can use YNABReporting to automatically send you a report via E-Mail at the end of each month.

The report helps you understand your spending habits with clear numbers, and gives you a base for your budgets decisions for the following month.

This app is using the official [YNAB API](https://github.com/ynab/ynab-sdk-js).

## Prerequirements

1. `node` has to be installed
2. MongoDB has to be installed and running in the background
3. TypeScript should be installed globally

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

1. Start Mongo (usually during typing `mongod` in a terminal window)
2. `npm run build`
3. `npm start`

## Endpoints

So far there are two working endpoints.
1. `/import` fetches following information from YNAB and stores it locally in your database:
- `budgetMonths`
- `budgets`
- `categories`
- `transactions`

With this information we don't need to always get the data from YNAB but can use it to calcualte reports on our own. If we want to update the data, simple `GET` to `https://YOUR_SERVER:PORT/import` will fetch the latest data and update the mongo collections.

2. `/reports?year=2018&month=06` whereas `year` and `month` are parameters which can be filled with different years and months.
A return looks like this:

```
{
  "income": 5000,
  "outcome": -2000,
  "addedNetWorth": 3000,
  "savings": "60%",
  "passiveIncome": 0,
  "topExpenses": [
    {
      "amount": -1000,
      "category": "Rent",
      "date": "2018-06-26",
      "payee": "Landlord",
      "memo": "Rent for xxx"
    },
    {
      "amount": -200,
      "category": "Travelling",
      "date": "2018-06-15",
      "payee": "Hotel XY",
      "memo": "WE away"
    },
    {
      "amount": -100,
      "category": "Events",
      "date": "2018-06-20",
      "payee": "Party",
      "memo": "Throwing a birthday pary"
    },
    {
      "amount": -80,
      "category": "Events",
      "date": "2018-06-21",
      "payee": "Train company",
      "memo": "Train tickets to xy"
    },
    {
      "amount": -50,
      "category": "Travelling",
      "date": "2018-06-18",
      "payee": "Hotel XY",
      "memo": "Breakfast at the hotel"
    }
  ],
  "topWords": [
    {
      "key": "Groceries",
      "value": 12
    },
    {
      "key": "Lunch",
      "value": 9
    },
    {
      "key": "Breakfast",
      "value": 8
    },
    {
      "key": "Dinner",
      "value": 7
    },
    {
      "key": "Beer",
      "value": 7
    },
    {
      "key": "Food",
      "value": 5
    },
    {
      "key": "City-Trip",
      "value": 4
    },
    {
      "key": "Drinks",
      "value": 3
    },
    {
      "key": "Magazines",
      "value": 2
    },
    {
      "key": "Snacks",
      "value": 2
    }
  ],
  "topPayees": [
    {
      "key": "Hotel XY",
      "value": 7
    },
    {
      "key": "Train company",
      "value": 5
    },
    {
      "key": "Restaurant XY",
      "value": 4
    },
    {
      "key": "Snack place",
      "value": 4
    },
    {
      "key": "Fish restaurant",
      "value": 4
    },
    {
      "key": "Grocery Store XY",
      "value": 4
    },
    {
      "key": "Gas company",
      "value": 3
    },
    {
      "key": "iTunes",
      "value": 2
    },
    {
      "key": "Netflix",
      "value": 2
    },
    {
      "key": "Bio Company",
      "value": 2
    }
  ],
  "categorySpendings": [
    {
      "name": "Just for Fun",
      "amount": -number,
      "percentageOfOutcome": "XY%"
    },
    {
      "name": "Immediate Obligations",
      "amount": -number,
      "percentageOfOutcome": "XY%"
    },
    {
      "name": "Quality of Life Goals",
      "amount": 0,
      "percentageOfOutcome": "0.00%"
    },
    {
      "name": "True Expenses",
      "amount": -number,
      "percentageOfOutcome": "XY%"
    },
    {
      "name": "Family",
      "amount": -number,
      "percentageOfOutcome": "XY%"
    }
  ]
}
```
