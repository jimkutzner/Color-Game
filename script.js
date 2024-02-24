
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
let rangeLimit
let centralNumber
let red
let green
let blue

results.classList.add('hide')


runGame(cells)
// console.log('secret cell = ' + secretCell)
// console.log(random)

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
  runGame(cells)
})
// make selection -> click on cell
for(let i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', () => {      
      const selectedCellId = cells[i].id
      results.classList.remove('hide')
      if(selectedCellId == random) {
        results.firstElementChild.innerText = "Correct"
      } else {
        results.firstElementChild.innerText = "Wrong"
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

function runGame(cells) {
  cells.forEach(cell => {
    cell.classList.remove('wrong')
  })
  randomizeCells()
  random = randomSix()
  displayColorCode(cells, random)
  secretCell = cells[random].style.backgroundColor
  return secretCell, random
}


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
    setCellColors()
    // const red = randomRgbValue()
    // const green = randomRgbValue()
    // const blue = randomRgbValue()    
    cell.style.backgroundColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
    cell.colors = {red, green, blue}
  })
}

function randomSix() {
  return Math.floor(Math.random() * 6)
}

// function randomRgbValue() {
//   return Math.round(Math.random() * 255)
// }

// function randomHslValue() {
//   return Math.round(Math.random() * 100)
// }

function setCellColors() {
  getDifficulty()
  let span
  switch (selectedDifficulty) {
    case "easy":
      span = 255
      break;
    case "medium":
      span = 220
      break;
    case "hard":
      span = 190
      break;
    case "harder":
      span = 150
      break;
    case "insanelyHard":
      span = 75
      break;
                      
    default:
      console.log('default');
  }

  let startNumber = Math.floor(Math.random() * 255)
  // console.log(selectedDifficulty + '  selected difficulty')
  // console.log(startNumber + ' starting number')
  // console.log(span + '  span')
  // console.log('   ')

  if(startNumber + (span / 2) >= 255) {
    centralNumber = 255 - (span / 2)
    //console.log('hit upper limit')
  } else if(startNumber - (span / 2) <= 0) {
    centralNumber = (span / 2)
    //console.log('hit lower limit')
  } else {
    centralNumber = startNumber
    //console.log('did not hit upper or lower limit')
  }
  //console.log(centralNumber + '  central number')

  rangeLimit = Math.floor(Math.random() * span)

  //console.log(rangeLimit + '  range limit')
  //return centralNumber, rangeLimit
  
  red = Math.round((centralNumber - (rangeLimit / 2))+(Math.floor(Math.random() * rangeLimit)))
  green = Math.round((centralNumber - (rangeLimit / 2))+(Math.floor(Math.random() * rangeLimit)))
  blue = Math.round((centralNumber - (rangeLimit / 2))+(Math.floor(Math.random() * rangeLimit)))

  return red, green, blue
}

//setCellColors(selectedDifficulty)
//console.log(red, green, blue, 'rgb')

function displayColorCode(cells, random) {
  getFormat()
  const temp1 = cells[random].style.backgroundColor
  const rgb = temp1.match(/(\d+)/g)  
  if(selectedFormat === 'rgb') {
    colorFormat.innerText = cells[random].style.backgroundColor
  } else if(selectedFormat === 'hex') {
    colorFormat.innerText = 
    (`#${Math.abs(rgb[0]).toString(16).padStart(2, '0')}${Math.abs(rgb[1]).toString(16).padStart(2, '0')}${Math.abs(rgb[2]).toString(16).padStart(2, '0')}`)
  } else {   
    rgbToHSL(rgb)
    colorFormat.innerText = hslValue      
  }
}

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

  return hslValue
}






