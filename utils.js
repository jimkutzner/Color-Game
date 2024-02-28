
export function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomSix() {
  return Math.floor(Math.random() * 6)
}

export function dimCells(cells) {
  cells.forEach(cell => {
    cell.classList.add('wrong')
  })
}

