
//  // WHAT IS THE DISABLED PROPERTY FOR???

// code randomizes the color chips 
//    and narrows the random choices according to the Difficulty setting
// code secretly selects one chip as the winner 
//    and shows the color code per the format setting

// user selects Format and cells reset and results disappear
// user selects Difficulty and cells reset and results disappear

// user selects color cell
// results block is revealed with "Correct" or "Wrong"
// correct chip is un-disabled (revealed); Next Color button is revealed

// user pushes "Next Color" button and cells reset and results disappear
// color cells are randomized, class 'wrong' is added to all cells, and new color code displayed 
// color code is changed to correct color

const results = document.querySelector('[data-results]')
const button = document.querySelector('[data-button]')
const colorFormat = document.querySelector('[data-color-format]')
const format = document.querySelector('[data-format]')
const difficulty = document.querySelector('[data-difficulty]')
const colorGrid = document.querySelector('[data-color-grid]')
const cells = [...colorGrid.children]
let selectedFormat
let selectedDifficulty
let selectedSecretCell
let random
let secretCell 
let hslValue


results.classList.add('hide')

function runGame(cells) {
  cells.forEach(cell => {
    cell.classList.remove('wrong')
  })
  randomizeCells()
  random = randomSix()
  //colorFormat.innerText = cells[random].style.backgroundColor
  displayColorCode(cells, random)
  // console.log(cells[random].style.backgroundColor, random)
  // console.log(cells[random].style.backgroundColor)
  secretCell = cells[random].style.backgroundColor
  return secretCell, random
}

runGame(cells)
console.log('secret cell = ' + secretCell)
console.log(random)

// get Format
format.addEventListener('click', () => {
  runGame(cells)
  getFormat()
})
// get Difficulty
difficulty.addEventListener('click', () => {
  randomizeCells()
  getFormat()
  getDifficulty()
})
// make selection -> click on cell
for(let i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', () => {      
      const selectedCellId = cells[i].id
      results.classList.remove('hide')
      console.log(`you picked ${cells[i].id}, correct cell is ${random}`)      
      
      if(selectedCellId == random) {
        console.log('yes')
        results.firstElementChild.innerText = "Correct"
        

      } else {
        results.firstElementChild.innerText = "Wrong"
        console.log('no')      
  
      }
    dimCells(cells)  
    cells[random].classList.remove('wrong')
    })
  }

// get next color
button.addEventListener('click', () => {
 
  runGame(cells)

  results.classList.add('hide')
})

function dimCells(cells) {
  cells.forEach(cell => {
    cell.classList.add('wrong')
  })
}

function getFormat() {
  const formatButtons = document.querySelectorAll('input[name="format"]')
  for(const formatButton of formatButtons) {
    if(formatButton.checked) {
      selectedFormat = formatButton.value
      break
    }
  }
  return selectedFormat
}

function getDifficulty() {
  const difficultyButtons = document.querySelectorAll('input[name="difficulty"]')
  for(const difficultyButton of difficultyButtons) {
    if(difficultyButton.checked) {
      selectedDifficulty = difficultyButton.value
      break
    }
  }
  return selectedDifficulty
}

function randomizeCells() {
  cells.forEach((cell) => {
    const red = randomRgbValue()
    const green = randomRgbValue()
    const blue = randomRgbValue()    
    cell.style.backgroundColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
    cell.colors = {red, green, blue}
  })
}

function randomSix() {
  return Math.floor(Math.random() * 6)
}

function randomRgbValue() {
  return Math.round(Math.random() * 255)
}

function randomHslValue() {
  return Math.round(Math.random() * 100)
}

function displayColorCode(cells, random) {
  console.log(cells, random)
  getFormat()
  console.log(selectedFormat + '  selected format')
  const temp1 = cells[random].style.backgroundColor
  const rgb = temp1.match(/(\d+)/g)  
  if(selectedFormat === 'rgb') {
    colorFormat.innerText = cells[random].style.backgroundColor
  } else if(selectedFormat === 'hex') {
    colorFormat.innerText = 
    (`#${Math.abs(rgb[0]).toString(16).padStart(2, '0')}${Math.abs(rgb[1]).toString(16).padStart(2, '0')}${Math.abs(rgb[2]).toString(16).padStart(2, '0')}`)
  } else {
    console.log(rgb)    
    rgbToHSL(rgb)

    colorFormat.innerText = hslValue      
  }
}

//displayColorCode(49,34,109)

// function convertColorFormat(red, green, blue) {
//   const rgbDisplayedValue = 
//   (`rgb(${red}, ${green}, ${blue})`)
//   //console.log(rgbDisplayedValue)
//   const hexDisplayedValue = 
//   (`#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')})`)
//   //console.log(hexDisplayedValue)
//   const temp2 = rgbToHSL(red, green, blue)
// }


function rgbToHSL(rgb) {
  let r = rgb[0]
  let g = rgb[1]
  let b = rgb[2]
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  hslValue = `hsl(${Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)}, ${Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))}%, ${Math.round(100 * (2 * l - s) / 2)}%)`
//  console.log(hslValue)
  return hslValue
}
// const temp5 = [49, 134, 10]
// rgbToHSL(temp5)
// console.log(hslValue)






