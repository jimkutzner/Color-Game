import { cells } from '/script.js'
let rangeLimit
let centralNumber
let red
let green
let blue
let selectedDifficulty
let selectedSecretCell

export function getFormat() {
  const formatButtons = document.querySelectorAll('input[name="format"]')
  for(const formatButton of formatButtons) {
    if(formatButton.checked) {
      selectedFormat = formatButton.value
      break
    }
  }
  return selectedFormat
}

export function getDifficulty() {
  const difficultyButtons = document.querySelectorAll('input[name="difficulty"]')
  for(const difficultyButton of difficultyButtons) {
    if(difficultyButton.checked) {
      selectedDifficulty = difficultyButton.value
      break
    }
  }
  return selectedDifficulty
}
selectedDifficulty

export function randomizeCells() {
  cells.forEach((cell) => {
    setCellColors()
    // const red = randomRgbValue()
    // const green = randomRgbValue()
    // const blue = randomRgbValue()    
    cell.style.backgroundColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
    cell.colors = {red, green, blue}
  })
}

export function randomSix() {
  return Math.floor(Math.random() * 6)
}

export function setCellColors() {
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


