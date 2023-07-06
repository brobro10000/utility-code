function calculateFutureValue({ principal, weeklyInvestment, annualInterestRate, compoundingPeriodsPerYear, years }) {
  // Convert weekly investment to the compounding period
  let periodInvestment = weeklyInvestment * 52.1429 / compoundingPeriodsPerYear;

  // Convert annual interest rate to the compounding period
  let periodInterestRate = annualInterestRate / compoundingPeriodsPerYear;

  // Initialize variables to keep track of stats
  let totalFutureValue = principal;
  let totalDividends = 0;
  let stats = [];

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
    let dividendsThisYear = totalFutureValue - principal - periodInvestment * totalPayments;

    // Add dividends for this year to total dividends
    totalDividends += dividendsThisYear;

    // Add stats for this year to the array
    stats.push({
      year: t,
      totalFutureValue: totalFutureValue,
      dividendsThisYear: dividendsThisYear,
      totalDividends: totalDividends,
    });
  }

  return stats;
}

function createTable(stats, tableDivId) {
  // Create the table
  var table = document.createElement('table');
  table.className = 'table'
  // Create table header
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['Year', 'Total Future Value', 'Dividends This Year', 'Total Dividends'];
  for (let header of headers) {
    var th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  var tbody = document.createElement('tbody');
  for (let stat of stats) {
    var row = document.createElement('tr');
    var data = [stat.year, stat.totalFutureValue, stat.dividendsThisYear, stat.totalDividends];
    for (let value of data) {
      var td = document.createElement('td');
      td.textContent = value === stat.year ? value : formatMoney(value);
      row.appendChild(td);
    }
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