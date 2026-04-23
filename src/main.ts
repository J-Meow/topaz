import "./index.css"
import elements from "./elements"
const instrumentTypeDisplayMap: { [key: string]: string } = {
    oscillator: "Oscillator",
}
const audioCtx = new AudioContext()
const hertzCache: number[] = []
const a4 = 440
const a4key = 57
for (let key = 0; key < elements.pianoKeys.length; key++) {
    hertzCache.push(Math.pow(2, (key - a4key) / 12) * a4)
}
let song = {
    tracks: [
        { type: "oscillator", name: "Track 1", color: "red" },
        { type: "oscillator", name: "Track 2", color: "maroon" },
    ],
}
let state: {
    selectedTrack: number
    piano: { pressing: boolean; key: number; oscillator: OscillatorNode | null }
} = {
    selectedTrack: 0,
    piano: {
        pressing: false,
        key: -1,
        oscillator: null,
    },
}
function showTracks() {
    song.tracks.forEach((track) => {
        const trackElement = document.createElement("div")
        trackElement.className = "track"
        trackElement.style.backgroundColor = "var(--" + track.color + ")"
        const trackNameElement = document.createElement("span")
        trackNameElement.innerText = track.name
        const trackTypeElement = document.createElement("span")
        trackTypeElement.innerText = instrumentTypeDisplayMap[track.type]
        trackElement.appendChild(trackNameElement)
        trackElement.appendChild(trackTypeElement)
        elements.trackList.appendChild(trackElement)
        const overallViewTrackElement = document.createElement("div")
        overallViewTrackElement.className = "track"
        elements.overallView.appendChild(overallViewTrackElement)
    })
}
showTracks()
function hertzFromPianoKey(key: number) {
    return hertzCache[key]
}
elements.pianoKeys.forEach((element, i) => {
    element.addEventListener("mousedown", (ev) => {
        ev.preventDefault()
        if (state.piano.key in elements.pianoKeys) {
            elements.pianoKeys[state.piano.key].classList.remove("active")
        }
        state.piano.pressing = true
        state.piano.key = i
        element.classList.add("active")
        if (state.piano.oscillator) {
            state.piano.oscillator.stop()
            state.piano.oscillator.disconnect()
        }
        state.piano.oscillator = audioCtx.createOscillator()
        state.piano.oscillator.frequency.setValueAtTime(
            hertzFromPianoKey(state.piano.key),
            audioCtx.currentTime,
        )
        state.piano.oscillator.type = "square"
        state.piano.oscillator.connect(audioCtx.destination)
        state.piano.oscillator.start()
    })
})
addEventListener("mousemove", (ev) => {
    if (state.piano.pressing) {
        ev.preventDefault()
        let currentKeyHover = -1
        for (let i = 0; i < elements.pianoKeys.length; i++) {
            const key = elements.pianoKeys[i]
            if (key.getBoundingClientRect().y < ev.clientY) {
                currentKeyHover = i
                break
            }
        }
        if (currentKeyHover != state.piano.key) {
            if (state.piano.key in elements.pianoKeys) {
                elements.pianoKeys[state.piano.key].classList.remove("active")
            }
            state.piano.key = currentKeyHover
            if (state.piano.key in elements.pianoKeys) {
                elements.pianoKeys[state.piano.key].classList.add("active")
            }
            state.piano.oscillator!.frequency.setValueAtTime(
                hertzFromPianoKey(state.piano.key),
                audioCtx.currentTime,
            )
        }
    }
})
addEventListener("mouseup", (ev) => {
    if (!state.piano.pressing) return
    ev.preventDefault()
    if (state.piano.key in elements.pianoKeys) {
        elements.pianoKeys[state.piano.key].classList.remove("active")
    }
    state.piano.pressing = false
    state.piano.key = -1
    state.piano.oscillator!.stop()
})
