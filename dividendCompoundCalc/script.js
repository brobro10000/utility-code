function calculateFutureValue({ principal, weeklyInvestment, annualInterestRate, compoundingPeriodsPerYear, years }) {
  let yearlyInvestment = weeklyInvestment * 52.1429;
  // Convert weekly investment to the compounding period
  let periodInvestment = yearlyInvestment / compoundingPeriodsPerYear;

  // Convert annual interest rate to the compounding period
  let periodInterestRate = annualInterestRate / compoundingPeriodsPerYear;

  // Initialize variables to keep track of stats
  let totalFutureValue = principal;
  let totalDividends = 0;
  let totalInvested = principal;
  let stats = [];
  let previousFutureValue = principal;
  let previousDividends = 0;

  // Loop over each year
  for (let t = 1; t <= years; t++) {
    // Total number of payments for this year
    let totalPayments = compoundingPeriodsPerYear * t;
    // Calculate future value for the series of investments
    let futureValueInvestments = periodInvestment * (Math.pow(1 + periodInterestRate, totalPayments) - 1) / periodInterestRate;

    // Calculate future value for the initial principal
    let futureValuePrincipal = principal * Math.pow(1 + periodInterestRate, totalPayments);

    // The total future value is the sum of the two parts
    totalFutureValue = futureValueInvestments + futureValuePrincipal;

    // Calculate total dividends paid this year (total future value minus principal and investments)
    let dividendsThisYear = totalFutureValue - previousFutureValue - periodInvestment * compoundingPeriodsPerYear;

    // Add dividends for this year to total dividends
    totalDividends += dividendsThisYear;

    let totalInvestedThisYear = periodInvestment * compoundingPeriodsPerYear;

    // Add investments for this year to total investments
    totalInvested += totalInvestedThisYear;

    // Calculate dividend increase percentage
    let dividendIncreasePercentage = 0;
    if (t > 1) {
      dividendIncreasePercentage = (dividendsThisYear - previousDividends) / previousDividends * 100;
    }

    // Add stats for this year to the array
    stats.push({
      year: t,
      totalInvested: totalInvested,
      totalFutureValue: totalFutureValue,
      dividendsThisYear: dividendsThisYear,
      totalDividends: totalDividends,
      dividendIncreasePercentage: dividendIncreasePercentage.toFixed(2).toString() + '%',
    });

    // Update future value at the end of the previous year
    previousFutureValue = totalFutureValue;
    previousDividends = dividendsThisYear;
  }

  return stats;
}

function createTableCell(value, isHeader = false) {
  var cell = document.createElement(isHeader ? 'th' : 'td');
  cell.textContent = value;
  return cell;
}

function createTableRow(data, isHeader = false) {
  var row = document.createElement('tr');
  for (let value of data) {
    var cell = createTableCell(value, isHeader);
    row.appendChild(cell);
  }
  return row;
}

function createTable(stats, tableDivId) {
  var table = document.createElement('table');
  table.className = 'table'

  // Create table header
  var thead = document.createElement('thead');
  var headers = [
    'Year',
    'Total Future Value',
    'Amount Invested',
    'Dividends This Year',
    'Dividends Increase %',
    'Total Dividends'
  ];
  var headerRow = createTableRow(headers, true);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  var tbody = document.createElement('tbody');
  for (let stat of stats) {
    var data = [
      stat.year,
      stat.totalFutureValue,
      stat.totalInvested,
      stat.dividendsThisYear,
      stat.dividendIncreasePercentage,
      stat.totalDividends
    ].map((value, index) => index > 0 && typeof value === 'number' ? formatMoney(value) : value);
    var row = createTableRow(data);
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  // Append the table to the div
  var tableDiv = document.getElementById(tableDivId);
  tableDiv.innerHTML = '';
  tableDiv.appendChild(table);
}


function formatMoney(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export {
  calculateFutureValue,
  createTable,
  formatMoney,
}