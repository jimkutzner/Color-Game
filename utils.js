
export function randomNumber(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor= Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function randomSix() {
  return Math.floor(Math.random() * 6)
}

export function dimCells(cells) {
  cells.forEach(cell => {
    cell.classList.add('wrong')
  })
}

