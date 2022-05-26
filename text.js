let root = document.getElementById("demo");
let canvas = root.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");

let createMatrixButton = root.getElementsByTagName("button")[0];
let runGaussEliminationButton = root.getElementsByTagName("button")[1];
let runGaussJordanEliminationButton = root.getElementsByTagName("button")[2];

const FLOAT = 2;
const MARGIN = 20;
const PADDING = 10;
const FONT_STYLE = "20px Arial";
const DELAY = 200;

let animation = null;
let matrix = null;
let matrices = [];

let refresh = function(A, i = -1, j = -1) {
  matrices.push({
    value: A.slice(),
    r: i,
    c: j
  });
};

let clear = function() {
  matrix = null
  matrices = [];
  if (animation != null) {
    clearInterval(animation);
    animation = null;
  }
};

let initialize = function() {
  clear();
  let m = Math.floor(Math.random() * 3) + 4;
  let n = Math.floor(Math.random() * 3) + 4;
  let M = Array.from({
    length: m
  }, function() {
    return Array.from({
      length: n
    }, function() {
      return Math.floor(Math.random() * 100);
    });
  });
  let b = Array.from({
    length: m
  }, function() {
    return Array.from({
      length: 1
    }, function() {
      return Math.floor(Math.random() * 100);
    });
  });
  matrix = augmented(M, b);
  if (Math.random() > 0.5) {
    scalar(matrix, Math.floor(Math.random() * m), 0);
  }
  if (Math.random() > 0.5) {
    let z = Math.floor(Math.random() * m);
    scalar(matrix, z, 0);
    addition(matrix, Math.floor(Math.random() * m), z, 1);
  }
  refresh(matrix);
  show();
};

createMatrixButton.onclick = initialize;

runGaussEliminationButton.onclick = function() {
  if (animation == null && matrix != null) {
    Gauss(matrix);
    show();
  }
};

runGaussJordanEliminationButton.onclick = function() {
  if (animation == null && matrix != null) {
    Gauss(matrix);
    Jordan(matrix);
    show();
  }
};

// let show = function() {
//   animation = setInterval(function() {
//     let matrix = matrices.shift();
//     draw(matrix.value, matrix.r, matrix.c);
//     if (matrices.length == 0) {
//       clearInterval(animation);
//       animation = null;
//     }
//   }, DELAY);
// };

// let draw = function(A, r, c) {
//   let m = A.length;
//   let n = A[0].length;
//   let margin = MARGIN;
//   let padding = PADDING;
//   let blockWidth = 0;
//   let blockHeight = 50;
//   context.font = FONT_STYLE;
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       let measure = context.measureText(`${A[i][j].toFixed(FLOAT)}`);
//       blockWidth = Math.max(blockWidth, measure.width);
//     }
//   }
//   blockWidth += padding * 2;
//   blockWidth = Math.max(50, blockWidth);
//   canvas.width = 2 * margin + n * blockWidth;
//   canvas.height = 2 * margin + m * blockHeight;
//   context.font = FONT_STYLE;
//   context.textAlign = "center";
//   context.strokeStyle = "#555555";
//   context.fillStyle = "#CCCCCC";
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       let x = margin + j * blockWidth;
//       let y = margin + i * blockHeight;
//       let fx = margin + Math.floor(blockWidth / 2 + j * blockWidth);
//       let fy = margin + Math.floor(blockHeight / 2 + i * blockHeight) + 10;
//       if (i == r || j == c) {
//         context.fillStyle = "#343e4b";
//         context.fillRect(x, y, blockWidth, blockHeight);
//         context.fillStyle = "#CCCCCC";
//       }
//       context.strokeRect(x, y, blockWidth, blockHeight);
//       context.fillText(`${A[i][j].toFixed(FLOAT)}`, fx, fy);
//     }
//   }
// };

let exchange = function(A, a, b) {
  let T = Array.from(A[a]);
  A[a] = A[b];
  A[b] = T;
};

let addition = function(A, a, b, scalar) {
  A[b] = A[b].map(function(v, k) {
    return v + A[a][k] * scalar;
  });
};

let scalar = function(A, a, scalar) {
  A[a] = A[a].map(function(v, k) {
    return v * scalar;
  });
};

let transpose = function(A) {
  let m = A.length;
  let n = A[0].length;
  let T = Array.from({
    length: n
  }, function(p, i) {
    return Array.from({
      length: m
    }, function(q, j) {
      return A[j][i];
    });
  });
  return T;
};

let augmented = function(M, b) {
  let A = Array.from(M, function(v, k) {
    return v.concat(b[k]);
  });
  return A;
};

let unaugmented = function(A) {
  return {
    M: Array.from(A, function(r) {
      return r.filter(function(v, i) {
        return i != (r.length - 1);
      });
    }),
    b: Array.from(A, function(r) {
      return r.filter(function(v, i) {
        return i == (r.length - 1);
      });
    })
  };
};

let findPivots = function(A, from) {
  return Array.from({
    length: (A.length - from)
  }, function(e, i) {
    for (let j = 0; j < A[i + from].length; j++) {
      if (A[i + from][j] != 0) {
        return j;
      }
    }
    return A[0].length;
  });
};

let minIndex = function(arr) {
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[index]) {
      index = i;
    }
  }
  return index;
};

let Gauss = function(A) {
  let m = A.length;
  let n = A[0].length;
  let r = Math.min(m, n);
  for (let i = 0; i < m; i++) {
    let pivots = findPivots(A, i);
    let p = {
      i: 0,
      j: 0
    };
    p.i = minIndex(pivots);
    p.j = pivots[p.i];
    if (p.j == n) {
      return;
    }
    refresh(A, i, i + p.i);
    exchange(A, i, i + p.i);
    refresh(A, i, i + p.i);
    refresh(A);
    refresh(A, i);
    scalar(A, i, 1 / A[i][p.j]);
    refresh(A, i);
    refresh(A);
    for (let j = i + 1; j < m; j++) {
      refresh(A, j);
      addition(A, i, j, -A[j][p.j] / A[i][p.j]);
      refresh(A, j);
    }
    refresh(A);
  }
  refresh(A);
};

let Jordan = function(A) {
  let m = A.length;
  let n = A[0].length;
  for (let i = m - 1; i >= 0; i--) {
    let pivots = findPivots(A, i);
    let p = {
      i: null,
      j: pivots[0]
    };
    if (p.j == n) {
      continue;
    }
    for (let j = i - 1; j >= 0; j--) {
      refresh(A, j);
      addition(A, i, j, -A[j][p.j] / A[i][p.j]);
      refresh(A, j);
    }
    refresh(A);
  }
  refresh(A);
};

initialize();
