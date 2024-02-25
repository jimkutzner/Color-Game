const audioCtx = new AudioContext();
let buffer;

export function playAudioSuccess() {
  const audioElement = new Audio('arcade-bonus-alert-success.mp3')

  const audioSource = audioCtx.createMediaElementSource(audioElement)

  audioSource.connect(audioCtx.destination)
  audioElement.play()
}

export function playAudioLose() {
  const audioElement = new Audio('retro-arcade-lose-short.mp3')

  const audioSource = audioCtx.createMediaElementSource(audioElement)

  audioSource.connect(audioCtx.destination)
  audioElement.play()
}

