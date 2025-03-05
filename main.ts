// Include the BitBot extension in MakeCode
bitbot.select_model(BBModel.PRO);

// Function to analyze sound intensity and determine dance speed
function getBeatStrength(): number {
    let soundLevel = input.soundLevel();
    return Math.map(soundLevel, 0, 255, 300, 700); // Adjust movement timing based on beat strength
}

// Function to make the robot dance with varied moves while staying in place
function dance() {
    let beatTime = getBeatStrength();

    // Intense side swing
    bitbot.motor(BBMotor.Left, 60);
    bitbot.motor(BBMotor.Right, 30);
    bitbot.bbSetServo(BBServos.P1, 45);
    bitbot.bbSetServo(BBServos.P2, 135);
    bitbot.ledRainbow(true, BBArms.Both);
    basic.pause(beatTime);

    // Reverse swing
    bitbot.motor(BBMotor.Left, 30);
    bitbot.motor(BBMotor.Right, 60);
    bitbot.bbSetServo(BBServos.P1, 135);
    bitbot.bbSetServo(BBServos.P2, 45);
    bitbot.ledShow();
    basic.pause(beatTime);

    // Quick spin and reverse to avoid displacement
    bitbot.motor(BBMotor.Left, -50);
    bitbot.motor(BBMotor.Right, 50);
    bitbot.ledRotate(true, BBArms.Both);
    basic.pause(beatTime / 2);

    bitbot.motor(BBMotor.Left, 50);
    bitbot.motor(BBMotor.Right, -50);
    basic.pause(beatTime / 2);

    // Move back to center
    bitbot.motor(BBMotor.Left, -30);
    bitbot.motor(BBMotor.Right, -30);
    bitbot.ledClear();
    basic.pause(beatTime);
    bitbot.stop(BBStopMode.Coast);
}

// Listen for varying sound levels and adjust dance
basic.forever(function () {
    if (input.soundLevel() > 128) { // Detect strong beats
        dance();
    }
});

// Indicate ready status
basic.showIcon(IconNames.EighthNote);
