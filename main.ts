// Function to analyze sound intensity and determine dance speed
function getBeatStrength () {
    soundLevel = input.soundLevel()
    // Adjust movement timing based on beat strength
    return Math.map(soundLevel, 0, 255, 300, 700)
}
// Function to make the robot dance with varied moves while staying in place
function dance () {
    beatTime = getBeatStrength()
    bitbot.gocm(BBDirection.Forward, 60, 5)
    bitbot.gocm(BBDirection.Reverse, 60, 5)
    bitbot.bbSetServo(BBServos.P1, 45)
    bitbot.bbSetServo(BBServos.P2, 135)
    bitbot.ledRainbow(true, BBArms.Both)
    basic.pause(beatTime)
    bitbot.gocm(BBDirection.Forward, 60, 5)
    bitbot.gocm(BBDirection.Reverse, 60, 5)
    bitbot.bbSetServo(BBServos.P1, 135)
    bitbot.bbSetServo(BBServos.P2, 45)
    bitbot.ledShow()
    basic.pause(beatTime)
    bitbot.arcdeg(BBArcDirection.ForwardLeft, 60, 5, 90)
    bitbot.arcdeg(BBArcDirection.ReverseRight, 60, 5, 90)
    bitbot.ledRotate(true, BBArms.Both)
    basic.pause(beatTime / 2)
    bitbot.arcdeg(BBArcDirection.ForwardRight, 50, 5, 90)
    bitbot.arcdeg(BBArcDirection.ReverseLeft, 50, 5, 90)
    basic.pause(beatTime / 2)
    bitbot.arcdeg(BBArcDirection.ForwardLeft, 60, 5, 90)
    bitbot.arcdeg(BBArcDirection.ReverseRight, 60, 5, 90)
    bitbot.ledClear()
    basic.pause(beatTime)
    bitbot.stop(BBStopMode.Coast)
}
let beatTime = 0
let soundLevel = 0
// Include the BitBot extension in MakeCode
bitbot.select_model(BBModel.PRO)
// Indicate ready status
basic.showIcon(IconNames.EighthNote)
bitbot.enablePID(false)
// Listen for varying sound levels and adjust dance
basic.forever(function () {
    if (input.soundLevel() > 10) {
        dance()
    }
})
