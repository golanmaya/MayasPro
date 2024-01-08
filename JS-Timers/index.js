'use strict'

//TIMER
//----------
// digital timer of hours, min. sec that runs when user click start and reset when click reset button **maybe add a pause button later**
//-------------------

// click start button > 3 counters need to stars
//hoursCounter
//minutesCounter
//secondsCounter
// when reser > 3 counters reset

//elmReferns:
const elmHoures = document.querySelector("#hours")
const elmMinutes = document.querySelector("#minutes")
const elmSecondes = document.querySelector("#seconds")
const elmMillisec = document.querySelector("#millisec")

const countdownInput = document.querySelector("#countdownInput");
//buttons
//------------

const totalTimer = { hh: 0, mm: 0, ss: 0, ms: 0 };
let hoursInterval;
let minutesInterval;
let secondesInterval;
let millisecInterval;

let isTimerRunning = false;

const hoursUp = () => {
    totalTimer.hh++;
    elmHoures.innerText =
        totalTimer.hh < 10 ?
            "0" + totalTimer.hh + " :"
            :
            totalTimer.hh + " :";
    if (totalTimer.hh === 24) {
        totalTimer.hh = 0;
    }
    //reset after 23h
};

const minutesUp = () => {
    totalTimer.mm++;
    elmMinutes.innerText =
        totalTimer.mm < 10 ?
            "0" + totalTimer.mm + " :"
            :
            totalTimer.mm + " :";
    if (totalTimer.mm === 60) {
        totalTimer.mm = 0;
        // hoursUp(); //calls the hoursUp when reches 60 min
    }
};

const secondsUp = () => {
    totalTimer.ss++;
    elmSecondes.innerText =
        totalTimer.ss < 10 ?
            "0" + totalTimer.ss + " :"
            :
            totalTimer.ss + " :";

    if (totalTimer.ss === 60) {
        totalTimer.ss = 0 + ":";
        // minutesUp(); //calls minutesUp when reches 60 sec
    }
    console.log(`secondes: ${totalTimer.ss}`);
};

const millisecUp = () => {
    totalTimer.ms++
    elmMillisec.innerText =
        totalTimer.ms < 10 ?
            "0" + totalTimer.ms
            :
            totalTimer.ms
    if (totalTimer.ms === 100) {
        totalTimer.ms = 0;
    }
    console.log(`millisec: ${totalTimer.ms}`);
}



const resetTimer = () => {
    totalTimer.hh = 0;
    totalTimer.mm = 0;
    totalTimer.ss = 0;
    totalTimer.ms = 0;
    elmHoures.innerText = "00 :";
    elmMinutes.innerText = "00 :";
    elmSecondes.innerText = "00 :";
    elmMillisec.innerText = "00"


    clearInterval(hoursInterval);
    clearInterval(minutesInterval);
    clearInterval(secondesInterval);
    clearInterval(millisecInterval);

    isTimerRunning = false;
};

const startTimer = () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        hoursInterval = setInterval(hoursUp, 3600000);
        minutesInterval = setInterval(minutesUp, 60000);
        secondesInterval = setInterval(secondsUp, 1000);
        millisecInterval = setInterval(millisecUp, 100);
    }
};


const pauseTimer = () => {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(hoursInterval);
        clearInterval(minutesInterval);
        clearInterval(secondesInterval);
        clearInterval(millisecInterval);
    }
};
//========COUNTDOWN

/* 

const hoursDown = () => {
    totalTimer.hh--;
    elmHoures.innerText =
        totalTimer.hh < 10 ?
            "0" + totalTimer.hh + " :"
            :
            totalTimer.hh + " :";
    if (totalTimer.hh === 0) {
        clearInterval(hoursInterval);
    }
};

const minutesDown = () => {
    totalTimer.mm--;
    elmMinutes.innerText =
        totalTimer.hh < 10 ?
            "0" + totalTimer.hh + " :"
            :
            totalTimer.hh + " :";
    if (totalTimer.hh === 0) {
        clearInterval(minutesInterval);
    }
};

const secondsDown = () => {
    totalTimer.ss--;
    elmSecondes.innerText =
        totalTimer.hh < 10 ?
            "0" + totalTimer.hh + " :"
            :
            totalTimer.hh + " :";
    if (totalTimer.hh === 0) {
        clearInterval(secondesInterval);
    }
};
const updateDisplay = () => {

}

const setCountdown = () => {
    const setCountdown = () => {
        totalTimer.hh = parseInt(document.querySelector("#hoursInput").value) || 0;
        totalTimer.mm = parseInt(document.querySelector("#minutesInput").value) || 0;
        totalTimer.ss = parseInt(document.querySelector("#secondsInput").value) || 0;
        totalTimer.ms = parseInt(document.querySelector("#millisecInput").value) || 0;
        //---update display
        updateDisplay();
    };
}; */

const addLeadingZero = (value) => {
    return value < 10 ? "0" + value : value;
};


/* const startCountdown = () => {
    setCountdown();
    if (!isTimerRunning) {
        isTimerRunning = true;

        hoursInterval = setInterval(() => {
            if (totalTimer.hh > 0) {
                totalTimer.hh--;
            } else {
                clearInterval(hoursInterval);
            }
            updateDisplay();
        }, 3600000);

        minutesInterval = setInterval(() => {
            if (totalTimer.mm > 0) {
                totalTimer.mm--;
            } else {
                clearInterval(minutesInterval);
            }
            updateDisplay();
        }, 60000);

        secondesInterval = setInterval(() => {
            if (totalTimer.ss > 0) {
                totalTimer.ss--;
            } else {
                clearInterval(secondesInterval);
            }
            updateDisplay();
        }, 1000);

        millisecInterval = setInterval(() => {
            if (totalTimer.ms > 0) {
                totalTimer.ms--;
            } else {
                clearInterval(millisecInterval);
            }
            updateDisplay();
        }, 100);
    }
};
 */

//אולי להפוך את הכפתור "סטארט" ל"פאוז" אחרי לחיצה - במקום שני כפתורים
