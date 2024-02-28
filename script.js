import { 
  randomNumber, 
  randomSix, 
  dimCells,
 } from '/utils.js'
import {  
  playAudioSuccess, 
  playAudioLose 
} from './playAudio.js'

const results = document.querySelector('[data-results]')
const attemptScore = document.querySelector('[data-attempts]')
const successScore = document.querySelector('[data-successes]')
const button = document.querySelector('[data-button]')
const colorFormat = document.querySelector('[data-color-format]')
const format = document.querySelector('[data-format]')
const difficulty = document.querySelector('[data-difficulty]')
const colorGrid = document.querySelector('[data-color-grid]')
const cells = [...colorGrid.children]

let selectedFormat
let selectedDifficulty
let random
let secretCell 
let hslValue
let red
let green
let blue
let attempts = 0
let successes = 0

results.classList.add('hide')

runGame(cells)
setScore(attempts, successes)

format.addEventListener('click', () => {
  runGame(cells)
  getFormat()
})

difficulty.addEventListener('click', () => {
  randomizeCells()
  getFormat()
  getDifficulty()
  runGame(cells)
})

for(let i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', () => {      
      const selectedCellId = cells[i].id
      results.classList.remove('hide')

      cells.forEach(cell => {
        cell.setAttribute('disabled', '')
      })

      if(selectedCellId == random) {
        results.firstElementChild.innerText = "Correct"
        successes++
        playAudioSuccess()
      } else {
        results.firstElementChild.innerText = "Wrong"
        playAudioLose()
      }
      
    dimCells(cells)  
    cells[random].classList.remove('wrong')
    attempts++
    setScore()

    })
  }

button.addEventListener('click', () => {
  runGame(cells)
  results.classList.add('hide')
  cells.forEach(cell => {
    cell.removeAttribute('disabled', '')
  })
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

function setScore() {
  attemptScore.innerText = `Attempts: ${attempts}`
  successScore.innerText = `Successes: ${successes}`
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
    cell.style.backgroundColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
    cell.colors = {red, green, blue}
  })
}

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

  const seed = randomNumber(0, 255-span)
  const offset = Math.round(Math.random() * span)
  red = Math.abs(seed - Math.round(Math.random() * span))
  green = Math.abs(seed - Math.round(Math.random() * span))
  blue = Math.abs(seed - Math.round(Math.random() * span))

  return red, green, blue
}

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
  console.log(rgb)
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



