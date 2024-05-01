"use strict";

function isNonSingular(A) {
  const n = A.length;
  const det = A[0][0] * ((A[1][1] * A[2][2]) - (A[2][1] * A[1][2])) -
             A[0][1] * (A[1][0] * A[2][2] - A[2][0] * A[1][2]) +
             A[0][2] * (A[1][0] * A[2][1] - A[2][0] * A[1][1]);
  return det !== 0;
}

function isDiagonalDominant(A) {
  const n = A.length;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        sum += Math.abs(A[i][j]);
      }
    }
    if (Math.abs(A[i][i]) < sum) {
      return false;
    }
  }
  return true;
}

function jacobi(A, b, x0, tol, N) {
  const n = A.length;

  if (!isNonSingular(A) || !isDiagonalDominant(A)) {
    alert("Помилка! Не справджуються умови!");
    return;
  }

  let x = x0.slice();
  let iter = 0;

  while (iter < N) {
    const x_new = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += A[i][j] * x[j];
        }
      }
      x_new[i] = (b[i] - sum) / A[i][i];
    }

    const diff = x_new.map((val, i) => Math.abs(val - x[i]));
    const maxDiff = Math.max(...diff);

    if (maxDiff < tol) {
      break;
    }

    x = x_new;
    iter++;
  }

  return x;
}

const clearingResult = (result) => {
  return result.map((val, i) => `x${i + 1} = ${val.toFixed(2)}`).join(' ');
};


const resultText = document.querySelector(".resultContainer h2 b");

document.querySelector(".resultExtended").addEventListener("click", () => {
  const a11 = Number(document.querySelector("#a11").value);
  const a12 = Number(document.querySelector("#a12").value);
  const a13 = Number(document.querySelector("#a13").value);
  const a21 = Number(document.querySelector("#a21").value);
  const a22 = Number(document.querySelector("#a22").value);
  const a23 = Number(document.querySelector("#a23").value);
  const a31 = Number(document.querySelector("#a31").value);
  const a32 = Number(document.querySelector("#a32").value);
  const a33 = Number(document.querySelector("#a33").value);
  const b1 = Number(document.querySelector("#b1").value);
  const b2 = Number(document.querySelector("#b2").value);
  const b3 = Number(document.querySelector("#b3").value);

  if (isNaN(a11) || isNaN(a12) || isNaN(a13) || isNaN(a21) || isNaN(a22) || isNaN(a23) || isNaN(a31) || isNaN(a32) || isNaN(a33) || isNaN(b1) || isNaN(b2) || isNaN(b3)) {
    alert("Помилка! Будь ласка, введіть числові значення.");
    return;
  }

  const A = [
    [a11, a12, a13],
    [a21, a22, a23],
    [a31, a32, a33]
  ];
  const B = [b1, b2, b3];
  const x0 = [0, 0, 0]; // початкове наближення
  const tol = 1e-6; // задана точність
  const N = 1000; // максимальна кількість ітерацій

  const result = jacobi(A, B, x0, tol, N);

  if (result) {
    const clearResult = clearingResult(result);
    resultText.textContent = clearResult;
  }
});