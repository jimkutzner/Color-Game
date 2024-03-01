
 export function playAudioSuccess() {
  const audioCtx = new AudioContext();
  const audioElement = new Audio('./audio/success.mp3')

  const audioSource = audioCtx.createMediaElementSource(audioElement)

  const volume = audioCtx.createGain()
  volume.gain.setValueAtTime(0.3, 0)
  audioSource.connect(volume)
  volume.connect(audioCtx.destination)

  audioElement.play()
}

 export function playAudioLose() {
  const audioCtx = new AudioContext();
  const audioElement = new Audio('./audio/lose.mp3')

  const audioSource = audioCtx.createMediaElementSource(audioElement)

  const volume = audioCtx.createGain()
  volume.gain.setValueAtTime(0.3, 0)
  audioSource.connect(volume)
  volume.connect(audioCtx.destination)

  audioElement.play()
}

