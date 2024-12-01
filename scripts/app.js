document.addEventListener("DOMContentLoaded", () => {
    const budgetForm = document.getElementById("budget-form");
    const budgetChartCanvas = document.getElementById("budgetChart");
  
    // Initialize Chart.js Pie Chart
    const budgetChart = new Chart(budgetChartCanvas, {
      type: "pie",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  
    // Form Submission Event Listener
    budgetForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Fetch Input Values
      const name = document.getElementById("name").value.trim();
      const job = document.getElementById("job").value.trim();
      const salary = parseFloat(document.getElementById("salary").value.trim());
      const mostExpenditure = document.getElementById("expenditure").value.trim();
      const expectedExpenditure = parseFloat(
        document.getElementById("expected-expenditure").value.trim()
      );
      const investment = parseFloat(
        document.getElementById("investment").value.trim()
      );
      const totalBudget = parseFloat(
        document.getElementById("total-budget").value.trim()
      );
  
      // Validate Input Fields
      if (
        !name ||
        !job ||
        isNaN(salary) ||
        isNaN(expectedExpenditure) ||
        isNaN(investment) ||
        isNaN(totalBudget)
      ) {
        alert("Please fill all the fields with valid values.");
        return;
      }
  
      // Update Chart Data
      budgetChart.data.labels = [
        "Expenditure",
        "Investment",
        "Savings",
        "Total Budget",
      ];
      budgetChart.data.datasets[0].data = [
        expectedExpenditure,
        investment,
        totalBudget - (expectedExpenditure + investment),
        totalBudget,
      ];
  
      budgetChart.update();
  
      // Display Success Message
      alert(`Hi ${name}, your budget breakdown is updated!`);
    });
  });
  