function id(x: string) {
    return document.getElementById(x)!
}
export default {
    trackList: id("tracks"),
    overallView: id("overall"),
}
