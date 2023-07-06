import {
  calculateFutureValue,
  createTable,
  formatMoney,
} from './script.js';

let x = document.getElementById("monthlyDividendForm");
let y = document.getElementById("quarterlyDividendForm");
let monthlyDividendButtonEl = document.getElementById("monthlyDividendButton")
let quarterlyDividendButtonEl = document.getElementById("quarterlyDividendButton");
let quarterlyDividendTotalEl = document.getElementById("quarterlyDividendTotal");
let monthlyDividendTotalContainerEl = document.getElementById("monthlyDividendTotalContainer");
let quarterlyDividendTotalContainerEl = document.getElementById("quarterlyDividendTotalContainer");

const dividendMonthlyObject = {
  compoundingPeriodsPerYear: 12,
}
const dividendQuarterlyObject = {
  compoundingPeriodsPerYear: 4,
}

monthlyDividendButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  dividendMonthlyObject.principal = Number(x.elements[0].value) || 0;
  dividendMonthlyObject.annualInterestRate = Number(x.elements[1].value) || 0;
  dividendMonthlyObject.years = Number(x.elements[2].value) || 1;
  dividendMonthlyObject.weeklyInvestment = Number(x.elements[3].value) || 0;

  const monthlyDividendTotal = calculateFutureValue(dividendMonthlyObject);

  createTable(monthlyDividendTotal, "monthlyDividendTable");
  monthlyDividendTotalContainerEl.removeAttribute("hidden");
});

quarterlyDividendButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  dividendQuarterlyObject.principal = Number(y.elements[0].value) || 0;
  dividendQuarterlyObject.annualInterestRate = Number(y.elements[1].value) || 0;
  dividendQuarterlyObject.years = Number(y.elements[2].value) || 1;
  dividendQuarterlyObject.weeklyInvestment = Number(y.elements[3].value) || 0;

  const quarterlyDividendTotal = calculateFutureValue(dividendQuarterlyObject);

  createTable(quarterlyDividendTotal, "quarterlyDividendTable");
  quarterlyDividendTotalContainerEl.removeAttribute("hidden");
});