
 export function playAudioSuccess() {
  const audioCtx = new AudioContext();
  const audioElement = new Audio('./audio/arcade-bonus-alert-success.mp3')

  const audioSource = audioCtx.createMediaElementSource(audioElement)

  const volume = audioCtx.createGain()
  volume.gain.setValueAtTime(0.3, 0)
  audioSource.connect(volume)
  volume.connect(audioCtx.destination)

  audioElement.play()
}

 export function playAudioLose() {
  const audioCtx = new AudioContext();
  const audioElement = new Audio('./audio/retro-arcade-lose-short.mp3')

  const audioSource = audioCtx.createMediaElementSource(audioElement)

  const volume = audioCtx.createGain()
  volume.gain.setValueAtTime(0.3, 0)
  audioSource.connect(volume)
  volume.connect(audioCtx.destination)

  audioElement.play()
}

