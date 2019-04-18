let isLast = false
let choose = 0
let openForTry = false
let currentHistoryStep = 0
let history: string[] = []
// if is last in history
function isLastInHistory(): boolean {
    if (currentHistoryStep == history.length) {
        return true;
    }
    return false;
}
// simple function to set lights
function showLights(left: string, right: string, repeat: number) {
    let colors = "";
    for (let i = 0; i < 5; i++) {
        colors += " " + left;
    }
    for (let i = 0; i < 5; i++) {
        colors += " " + right
    }
    for (let i = 0; i < repeat; i++) {
        light.showRing(colors);
        light.showRing("black black black black black black black black black black black black");
    }
}
// set a good step
function setGood() {
    currentHistoryStep += 1

    // is last one!
    if (isLastInHistory()) {
        currentHistoryStep = 0
        showLights("green", "green", 2)
        chooseSide()
    }
}
// set a failed step
function setFail() {
    showLights("red", "red", 2)
    start()
}
// set ready for input
function setStartTry() {
    showLights("white", "white", 1)
    openForTry = true
}
// show side A
function showA() {
    showLights("yellow", "black", 1)
}
// show side B
function showB() {
    showLights("black", "yellow", 1)
}
// loop through history and show sides
function showHistory() {
    openForTry = false
    for (let k = 0; k <= history.length - 1; k++) {
        if (history[k] == "A") {
            showA()
        } else {
            showB()
        }
    }
    setStartTry();
}
// let program choose a new side and show the full
// history
function chooseSide() {
    choose = Math.randomRange(0, 1)
    if (choose == 0) {
        history.push("A")
    } else {
        history.push("B")
    }
    showHistory()
}
// evaluate a try
function evaluate(button: string) {
    if (!openForTry) { return; }
    if (history[currentHistoryStep] == button) {
        // good!!
        setGood();
    } else {
        // fail..
        setFail();
    }
}
// (re)start game
function start() {
    history = []
    currentHistoryStep = 0
    chooseSide()
}
// (re)start by pressing both buttons
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    start()
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    showA()
    evaluate('A')
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    showB()
    evaluate('B')
})
