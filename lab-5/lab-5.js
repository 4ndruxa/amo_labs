"use strict";

function jacobi(A, b) {
  const n = A.length;

  for (let k = 0; k < n - 1; k++) {
    let amax = Math.abs(A[k][k]);
    let imax = k;

    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > amax) {
        amax = Math.abs(A[i][k]);
        imax = i;
      }
    }

    if (imax !== k) {
      [A[k], A[imax]] = [A[imax], A[k]];
      [b[k], b[imax]] = [b[imax], b[k]];
    }

    for (let i = k + 1; i < n; i++) {
      if (A[k][k] !== 0) {
        const M = A[i][k] / A[k][k];
        A[i] = A[i].map((val, j) => val - M * A[k][j]);
        b[i] = b[i] - M * b[k];
      }
    }
  }

  const x = new Array(n).fill(0);
  x[n - 1] = b[n - 1] / A[n - 1][n - 1];

  for (let i = n - 2; i >= 0; i--) {
    let s = 0;

    for (let j = i + 1; j < n; j++) {
      s += A[i][j] * x[j];
    }

    x[i] = (b[i] - s) / A[i][i];
  }

  return x;
}

const clearingResult = (result) => {
  return result.map((val, i) => ` x${i + 1} = ${val.toFixed(2)}`);
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

  const A = [
    [a11, a12, a13],
    [a21, a22, a23],
    [a31, a32, a33],
  ];
  const B = [b1, b2, b3];

  const result = jacobi(A, B);
  const clearResult = clearingResult(result);
  resultText.textContent = clearResult;
});

