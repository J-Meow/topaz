import "./index.css"
import elements from "./elements"
const instrumentTypeDisplayMap: { [key: string]: string } = {
    oscillator: "Oscillator",
}
let song = {
    tracks: [
        { type: "oscillator", name: "Track 1", color: "red" },
        { type: "oscillator", name: "Track 2", color: "maroon" },
    ],
}
let state = {
    selectedTrack: 0,
    piano: {
        pressing: false,
        key: -1,
    },
}
const totalPianoKeys = elements.piano.children.length
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
elements.pianoKeys.forEach((element, i) => {
    element.addEventListener("mousedown", (ev) => {
        ev.preventDefault()
        if (state.piano.key in elements.pianoKeys) {
            elements.pianoKeys[state.piano.key].classList.remove("active")
        }
        state.piano.pressing = true
        state.piano.key = i
        element.classList.add("active")
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
})
