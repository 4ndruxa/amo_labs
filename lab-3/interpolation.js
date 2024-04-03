window.onload = function() {
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");

  calculateButton.addEventListener("click", calculateInterpolation);
  resetButton.addEventListener("click", resetPage);

  function resetPage() {
    window.location.reload();
  }

  function calculateInterpolation() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const n = parseInt(document.getElementById("n").value);
    const useSin = document.getElementById("useSin").checked;

    // Перевірка введених даних
    if (isNaN(a) || isNaN(b) || isNaN(n) || a >= b || n <= 0 || !Number.isInteger(n)) {
      alert("Помилка! Будь ласка, введіть числові значення. (a < b, n - ціле додатнє число)");
      return;
    }

    // Обчислення вузлів
    const nodes = evenlySpacedNodes(a, b, n);

    // Обчислення значень функції та інтерполяційного многочлена
    const fValues = nodes.map(useSin ? Math.sin : cosOfSquare);
    const interpolatedValues = nodes.map(interpolate);

    // Обчислення значень похибки
    const errorValues = nodes.map((x, index) => Math.abs(fValues[index] - interpolatedValues[index]));

    // Візуалізація графіків
    drawChart("function-chart", useSin ? "sin(x)" : "cos(x^2)", nodes, fValues, "red");
    drawChart("interpolation-chart", "Інтерполяційний многочлен Ньютона", nodes, interpolatedValues, "blue");
    drawChart("error-chart", "Похибка", nodes, errorValues, "green");

    // Створення таблиці
    createTable(nodes, fValues, interpolatedValues, errorValues);
  }

  // Функція для генерації рівномірно розташованих вузлів
  function evenlySpacedNodes(a, b, n) {
    const h = (b - a) / n;
    return Array(n + 1).fill(0).map((_, i) => a + i * h);
  }

  // Функція для обчислення cos(x^2)
  function cosOfSquare(x) {
    return Math.cos(x ** 2);
  }

  // Функція для обчислення інтерполяції
  function interpolate(x) {
    const nodes = evenlySpacedNodes(
      parseFloat(document.getElementById("a").value),
      parseFloat(document.getElementById("b").value),
      parseInt(document.getElementById("n").value)
    );
    const useSin = document.getElementById("useSin").checked;
    const fValues = nodes.map(useSin ? Math.sin : cosOfSquare);
    const dividedDifferences = calculateDividedDifferences(nodes, fValues);
    return calculateNewtonPolynomialNested(x, nodes, dividedDifferences);
  }

  // Функція для обчислення поділених різниць
  function calculateDividedDifferences(nodes, fValues) {
    const n = nodes.length;
    const dividedDifferences = [...fValues];
    for (let i = 1; i < n; i++) {
      for (let j = n - 1; j >= i; j--) {
        dividedDifferences[j] = (dividedDifferences[j] - dividedDifferences[j - 1]) / (nodes[j] - nodes[j - i]);
      }
    }
    return dividedDifferences;
  }

  // Функція для обчислення значення інтерполяційного многочлена Ньютона
  function calculateNewtonPolynomialNested(x, nodes, dividedDifferences) {
    const n = nodes.length;
    let p = dividedDifferences[0];
    for (let i = 1; i < n; i++) {
      let product = dividedDifferences[i];
      for (let j = 0; j < i; j++) {
        product *= (x - nodes[j]);
      }
      p += product;
    }
    return p;
  }

  // Функція для візуалізації графіків
  function drawChart(canvasId, label, nodes, values, color) {
    const canvas = document.getElementById(canvasId);
    new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: nodes,
        datasets: [{
          label: label,
          data: values,
          borderColor: color,
          tension: 0.4, // Параметр плавності (ви можете змінити його)
        }],
      },
      options: {
        scales: {
          y: {
            min: -1.1,
            max: 1.1,
          },
        },
      },
    });
  }

  // Функція для створення таблиці
  function createTable(nodes, fValues, interpolatedValues, errorValues) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    for (let i = 0; i < nodes.length; i++) {
      const row = document.createElement("tr");
      const xCell = document.createElement("td");
      xCell.textContent = nodes[i].toFixed(4);
      const fCell = document.createElement("td");
      fCell.textContent = fValues[i].toFixed(4);
      const interpolatedCell = document.createElement("td");
      interpolatedCell.textContent = interpolatedValues[i].toFixed(4);
      const errorCell = document.createElement("td");
      errorCell.textContent = errorValues[i].toFixed(6);
      row.appendChild(xCell);
      row.appendChild(fCell);
      row.appendChild(interpolatedCell);
      row.appendChild(errorCell);
      tableBody.appendChild(row);
    }
  }
};
