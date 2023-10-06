function calculateBMI() {
    var h = document.getElementById("height").value;
    var w = document.getElementById("weight").value;
    var bmi = w/((h/100)**2);
    document.getElementById("result").innerHTML = bmi.toPrecision(4);
    if (bmi < 18.5) {
        document.getElementById("result").style.backgroundColor = "#ffe355";
    }
    else if (18.5 < bmi && bmi < 25) {
        document.getElementById("result").style.backgroundColor = "#5cf175";
    }
    else if (25 <= bmi && bmi < 30) {
        document.getElementById("result").style.backgroundColor = "#fd8f50";
    }
    else if (bmi >= 30) {
        document.getElementById("result").style.backgroundColor = "#e94949";
    }
}