// Selecting necessary elements
const resetBtn = document.getElementById("reset-btn");
const balance = document.getElementById('balance');
const show_credit = document.getElementById('show_credit');
const show_debit = document.getElementById('show_debit');
const list = document.getElementById('list');

// Set initial balance, income, and expense from cookies
setCookie("balance", Number(getCookie("credit")) - Number(getCookie("debit")), 356);
show_credit.innerHTML = "Rs. " + getCookie("credit");
show_debit.innerHTML = "Rs. " + getCookie("debit");
balance.innerHTML = "Rs. " + getCookie("balance");
addTransactionDOM();

// Add transaction on form submit
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const key = document.getElementById("exp").value;
  const value = document.getElementById("amount").value;
  const text = document.getElementById("text").value.trim();

  if (value == "") { 
    alert('Enter Amount'); 
  } else {
    if (getCookie("no_of_transactions") == '') {
      setCookie("no_of_transactions", 1, 365);
    }

    if (key == "debit") {
      checkCookie("debit", value);
      setCookie(getCookie("no_of_transactions"), text + " " + " -" + value, 365);
    } else if (key == "credit") {
      checkCookie("credit", value);
      setCookie(getCookie("no_of_transactions"), text + " " + " +" + value, 365);
    } else { 
      return ""; 
    }
    setCookie("no_of_transactions", Number(getCookie("no_of_transactions")) + 1, 365);
  }
  setCookie("balance", Number(getCookie("credit")) - Number(getCookie("debit")), 356);
  myChart.data.datasets[0].data = Object.values({ 'debit': Number(getCookie("debit")), 'credit': Number(getCookie("credit")) });
  myChart.update();
  window.location.reload();  
})

// Add transactions to DOM list
function addTransactionDOM() {
  console.log("In add transactions");
  
  for (let i = Number(getCookie('no_of_transactions')) - 1; i > 0; i--) {
    const item = document.createElement('li');
    transaction_detail = getCookie(i);
    item.innerText = transaction_detail;
    list.appendChild(item);
  }

  show_credit.innerHTML = "Rs. " + getCookie("credit");
  show_debit.innerHTML = "Rs. " + getCookie("debit");
  balance.innerHTML = "Rs. " + getCookie("balance");
}

// Reset all cookies and values
function resetAll() {
  // Reset all cookies
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.split("=")[0] + "=;expires=" + new Date().toUTCString() + ";path=/";
  });

  // Reset balance, income, and expense
  balance.innerHTML = "Rs. 0.00";
  show_credit.innerHTML = "Rs. 0.00";
  show_debit.innerHTML = "Rs. 0.00";

  // Clear transaction history
  list.innerHTML = "";

  // Reset chart data
  myChart.data.datasets[0].data = [0, 0]; // Reset to 0
  myChart.update();

  // Reload the page to reflect changes
  window.location.reload();
}

// Add event listener to reset button
resetBtn.addEventListener("click", resetAll);

// Function to check if cookie exists, and update or create a new one
function checkCookie(key, value) {
  let originalvalue = getCookie(key);
  console.log("in checkcookie original value of " + key + "=" + originalvalue);

  if (originalvalue != "") {
    setCookie(key, Number(originalvalue) + Number(value), 365); // Add new value to old one
  } else {
    setCookie(key, value, 365); // Create new cookie
  }
  console.log("in check cookie" + document.cookie);
}

// Function to set or update a cookie
function setCookie(key, value, time) {
  let d = new Date();
  d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
  console.log("in set cookie the cookie set is " + document.cookie);
}

// Function to access a particular cookie by its key
function getCookie(key) {
  let name = key + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let char = ca[i];
    while (char.charAt(0) == ' ') {
      char = char.substring(1);
    }
    if (char.indexOf(name) == 0) {
      console.log("in getCookie value of" + key + "=" + char.substring(name.length, char.length));
      return char.substring(name.length, char.length);
    }
  }
  console.log("in get cookie value of " + key + " is null");
  return "";
}

// Chart entry
const data1 = { 'debit': Number(getCookie("debit")), 'credit': Number(getCookie("credit")) };
const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: Object.keys(data1),
    datasets: [{
      label: 'Amount',
      data: Object.values(data1),
    }]
  },
  options: {
    backgroundColor: ['#c9302a', '#33a81e'],
    borderColor: ['#91150c', '#126908'],
    borderWidth: 1,
    responsive: true,
  }
});