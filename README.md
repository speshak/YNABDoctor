# YNABDoctor

Using YNAB and the YNAB API to generate customised reports and get insights into your spending habits.

YNABDoctor lets you:
- Identify "Small Cap Spendings": Transactions from 0 to 20 Dollar/Euro. How much percent of your outcome do you spend on coffee, snacks and Co?
- Generates monthly reports with insights to: How much was my income and outcome this month? How much of my income did I save? How high was my passive income? How much did I add to my NetWorth this month? It also lists top payees, top categories and top words of the month, as well as showing all category spendings with percentage of your income. It answer also questions like: How much percent of my income do I spend on rent?
- NetWorthOverview: How much do I add each month to my networth and how high is my current networth?
- Spendings overview: Lists each months and years overall spending, and then lists the categories for each month with percentage of the overall spending
- Identify spending habits: Returns a list of most used Payees and how much you gave this institution/person over the years. Also lists most common words in your spendings

This app is using the official [YNAB API](https://github.com/ynab/ynab-sdk-js).

## Prerequirements

- [Docker](https://www.docker.com/community-edition#/download) has to be installed
- Generate a [YNAB Access Token](https://api.youneedabudget.com/#authentication-overview)

## Local development without Docker:

1. `git clone git@github.com:gruberb/YNABDoctor.git`
2. `cd YNABReporting && npm i`
3. Create a `.env` file in the root directory with:
```
accessToken=YNAB_API_TOKEN
mongoUrl=URL_TO_YOUR_MONGODB ('mongodb://localhost:27017')
mongoDBName=DB_NAME_TO_YOUR_LIKING
budgetName=YOUR_BUDGET_NAME
```
4. `npm start`


## Run with Docker
1. `git clone git@github.com:gruberb/YNABDoctor.git`
2. `cd YNABDoctor`
3. Set `YNAB_ACCESS_TOKEN` and `YNAB_BUDGET_NAME` environment variables.
- `export YNAB_ACCESS_TOKEN=XXX`
- `export YNAB_BUDGET_NAME=XYZ`
2. `docker-compose up` (or `docker-compose up -d` to background) to run the app
3. Access via `localhost:62818`

## Endpoints

So far there are seven working endpoints.
1. `/import` fetches following information from YNAB and stores it locally in your database:
- `accounts`
- `budgetMonths`
- `budgets`
- `categories`
- `transactions`

With this information we don't need to always get the data from YNAB but can use it to calcualte reports on our own. If we want to update the data, simple `GET` to `https://YOUR_SERVER:PORT/import` will fetch the latest data and update the mongo collections.

2. `/reports?year=2018&month=06` whereas `year` and `month` are parameters which can be filled with different years and months.
A return looks like this:

```
{
  "income": INCOME_THIS_MONTH,
  "outcome": OUTCOME_THIS_MONTH,
  "savings": INCOME-OUTCOME,
  "savingsPercent": PERCENTAGE_OF_SAVINGS_FROM_INCOME,
  "passiveIncome": INCOME/OUTCOME_WITH_NO_CATEGORY_SUMMARISED,
  "netWorthPreviousMonth": SUM_OF_NETWORTH_UNTIL_PREV_MONTH,
  "netWorthThisMonth": SUM_OF_NETWORTH_UNTIL_THIS_MONTH,
  "addedNetWorth": AMOUNT_OF_ADDED_NETWORTH_ADDED_THIS_MONTH,
  "topExpenses": [
  // list of transactions from highest negative amount to lowest
    {
      "amount": -2000,
      "category": "Rent",
      "date": "2018-06-01",
      "payee": "Landlord",
      "memo": "Apartment at YNAB Street"
    },
    ....
  ],
  "topWords": [
  // List of top mosed used words in Memos without prepositions
    {
      "key": "Groceries",
      "value": 10
    },
    ...
  ],
  "topPayees": [
    // List of most used Payees
    {
      "key": "Grocery Store",
      "value": 7
    },
   ...
  ],
  "categorySpendings": [
    // Overview over GroupCategories and their spendings
    {
      "name": "Immediate Obligations",
      "amount": -3000,
      "percentageOfOutcome": "71.66%"
    },
    ...
  ],
  "subCategorySpendings": [
    // list of all categories and their spendings
    {
      "name": "Rent",
      "amount": -2000,
      "percentageOfOutcome": "63.28%"
    },
    ...
  ]
}
```

3. `/netWorthOverview` gives the added networth for every year and month + the current culmulated networth
```
{
  "velocity": {
    "2018": {
      "03": 1000,
      "04": 200,
      "05": 3500,
      "06": 400
    }
  },
  "netWorth": 5100
}
```

4. `/spendings` returns spendings by GroupCategroy for every month and year
```
{
  "averagePercent": "50%",
  "average": 2000,
  "sumPerMonth": [
      {
        "2018-03-01": 500
      },
      {
        "2018-04-01": 1000
      },
      {
        "2018-05-01": 13000
      },
      {
        "2018-06-01": 1250
      }
    ],
  "2018-03-01": [
    {
      "name": "Immediate Obligations",
      "amount": -640,
      "percentageOfOutcome": "59.95%"
    },
    {
      "name": "True Expenses",
      "amount": -387.59,
      "percentageOfOutcome": "36.31%"
    },
    {
      "name": "Quality of Life Goals",
      "amount": 0,
      "percentageOfOutcome": "0.00%"
    },
    {
      "name": "Family",
      "amount": 0,
      "percentageOfOutcome": "0.00%"
    },
    {
      "name": "Just for Fun",
      "amount": 0,
      "percentageOfOutcome": "0.00%"
    }
  ],
  "2018-04-01": [
    ...
  ],
  ...
}

```

5. `/savings` returns the savings for every month and year
```
{
  "averagePercent": "30.49%",
  "average": 9876,
  "2018-03-01": {
    "savings": -227,
    "savingsPercent": "-27.10%"
  },
  ...
}
```

6. `/spendingHabits` returns the top used payees, words and the highest expenses:
```
{
  "topExpenses": [
    {
      "amount": -2000,
      "category": "Rent",
      "date": "2018-06-26",
      "payee": "Landlord",
      "memo": "Move to new apartment"
    },
    ...
  ],
  "topWords": [
    {
      "key": "Groceries",
      "value": 37
    },
    {
      "key": "Breakfast",
      "value": 34
    },
    ...
  ],
  "topPayees": [
    {
      "key": "Bakety next to work",
      "frequency": 31,
      "spent": -234.39999999999995
    },
    {
      "key": "Favourite breakfast shop",
      "frequency": 19,
      "spent": -121.2
    },
    ...
  ]
}
```

7. `/checkUp?limit=NUMBER` returns for now "small cap spendings" (spendings between 20 and 0 Euro/Dollar). It's there to highlight how much of an impact have little day-to-day expenses like Coffee2Go etc.
```
{
  "overallSmallCapSpendings": 2800,
  "smallCapInPercent": "10%",
  "mostUsedSmallCapPayees": [
    {
      "key": "CoffeShop",
      "frequency": 29,
      "spent": -189.79999999999998
    },
    {
      "key": "Breakfst shop",
      "frequency": 19,
      "spent": -121.2
    },
    ...
  ],
  "mostUsedSmallCapWords": [
    {
      "key": "Lunch",
      "value": 33
    },
    {
      "key": "Breakfast",
      "value": 32
    },
    ...
  ]
}
```
