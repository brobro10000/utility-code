# Dividend Calculator

This project consists of an application that calculates the future value of weekly investments, taking into account an initial principal and either monthly or quarterly dividends.

## How It Works

The JavaScript function `calculateFutureValue` is used to perform the calculations. It takes the following parameters:

- `principal`: The initial amount of money invested.
- `weeklyInvestment`: The amount of money that is invested every week.
- `annualInterestRate`: The annual interest rate (in decimal form, so 5% would be 0.05).
- `compoundingPeriodsPerYear`: The number of times the interest is compounded per year. It should be either 4 (for quarterly compounding) or 12 (for monthly compounding).
- `years`: The number of years the money is invested for.

The function calculates the future value of the investment and dividends for each year, and returns an array of objects. Each object contains the following properties:

- `year`: The year number (from 1 to `years`).
- `totalFutureValue`: The total future value of the investment and dividends at the end of this year.
- `dividendsThisYear`: The amount of dividends paid this year.
- `totalDividends`: The total amount of dividends paid up to and including this year.

The `createTable` function is used to create an HTML table that displays these results. It takes the array of objects returned by `calculateFutureValue` and creates a table with columns for year, total future value, dividends this year, and total dividends, and a row for each year.

## Styling

The application uses CSS to style the table and a form used to enter the parameters for the calculation. The table and form both use a modern color palette, with a dark blue header and alternating light blue rows for the table, and matching styles for the form. The form includes inputs for the principal, interest rate, estimated years, interest rate, and submit, each of which is styled appropriately.

## How to Use

To use this application, simply enter your parameters in the form (initial principal, weekly investment, annual interest rate, compounding periods per year, and number of years), and then click the Submit button. The table will be updated to display the results of the calculation.
