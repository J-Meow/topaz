import "./index.css"
import elements from "./elements"
const instrumentTypeDisplayMap: { [key: string]: string } = {
    oscillator: "Oscillator",
}
let song = {
    tracks: [
        { type: "oscillator", name: "Track 1" },
        { type: "oscillator", name: "Track 2" },
    ],
}
function showTracks() {
    song.tracks.forEach((track) => {
        const trackElement = document.createElement("div")
        trackElement.className = "track"
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
