document.addEventListener('DOMContentLoaded', function() {
    // Đồng hồ bấm giờ
    var stopwatchDisplay = document.getElementById("stopwatch-display");
    var startButton = document.getElementById("startStopwatch");
    var pauseButton = document.getElementById("pauseStopwatch");
    var timer;
    var isRunning = false;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0; // Thêm biến milliseconds

    function updateStopwatch() {
        milliseconds += 10; // Cập nhật mỗi 10 milliseconds (0.01 giây)
        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }
        stopwatchDisplay.innerText = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + (milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" : "")) + milliseconds;
    }

    startButton.addEventListener("click", function() {
        if (!isRunning) {
            timer = setInterval(updateStopwatch, 10); // Cập nhật mỗi 10 milliseconds
            isRunning = true;
        }
    });

    pauseButton.addEventListener("click", function() {
        clearInterval(timer);
        isRunning = false;
    });

    // Đồng hồ số
    function updateDigitalClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;
        
        document.getElementById("digital-clock-display").innerText = hours + ":" + minutes + ":" + seconds;
    }

    // Ngày tháng năm
    function updateDate() {
        var now = new Date();
        var date = now.getDate();
        var month = now.getMonth() + 1;
        var year = now.getFullYear();
        
        document.getElementById("date-display").innerText = date + "/" + month + "/" + year;
    }

    // Update the digital clock every second
    setInterval(updateDigitalClock, 1000);

    // Update the date once per minute
    setInterval(updateDate, 60000);
    
    // Initial update
    updateDate();

    // Đồng hồ đếm ngược
    var countdownDisplay = document.getElementById("countdown-display");
    var startCountdownButton = document.getElementById("startCountdown");
    var pauseCountdownButton = document.getElementById("pauseCountdown");
    var resetCountdownButton = document.getElementById("resetCountdown");
    var countdownTimer;
    var countdownHours = 2;
    var countdownMinutes = 0;
    var countdownSeconds = 0;
    var countdownMilliseconds = 0; // Thêm biến countdownMilliseconds

    function updateCountdown() {
        countdownMilliseconds -= 10; // Giảm 10 milliseconds (0.01 giây)
        if (countdownMilliseconds < 0) {
            countdownMilliseconds = 999;
            countdownSeconds--;
            if (countdownSeconds < 0) {
                countdownSeconds = 59;
                countdownMinutes--;
                if (countdownMinutes < 0) {
                    countdownMinutes = 59;
                    countdownHours--;
                    if (countdownHours < 0) {
                        // Countdown is over
                        clearInterval(countdownTimer);
                        alert("Countdown finished!");
                        return;
                    }
                }
            }
        }
        countdownDisplay.innerText = (countdownHours < 10 ? "0" : "") + countdownHours + ":" + (countdownMinutes < 10 ? "0" : "") + countdownMinutes + ":" + (countdownSeconds < 10 ? "0" : "") + countdownSeconds + "." + (countdownMilliseconds < 10 ? "00" : (countdownMilliseconds < 100 ? "0" : "")) + countdownMilliseconds;
    }

    startCountdownButton.addEventListener("click", function() {
        if (!countdownTimer) {
            countdownTimer = setInterval(updateCountdown, 10); // Cập nhật mỗi 10 milliseconds
        }
    });

    pauseCountdownButton.addEventListener("click", function() {
        clearInterval(countdownTimer);
        countdownTimer = null;
    });

    resetCountdownButton.addEventListener("click", function() {
        clearInterval(countdownTimer);
        countdownTimer = null;
        countdownHours = 2;
        countdownMinutes = 0;
        countdownSeconds = 0;
        countdownMilliseconds = 0;
        countdownDisplay.innerText = "02:00:00.000";
    });

    // Bộ đếm ngược mới
    var countdownDisplayNew = document.getElementById("countdown-display-new");
    var countdownEndDate = new Date("2025-06-25T00:00:00"); // Ngày 25/6/2025

    function updateCountdownNew() {
        var now = new Date();
        var timeDiff = countdownEndDate - now;
        
        if (timeDiff <= 0) {
            countdownDisplayNew.innerText = "Countdown finished!";
            return;
        }

        var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        var displayText = "";
        if (days > 0) displayText += days + " ngày ";
        if (hours > 0 || days > 0) displayText += hours + " giờ ";
        if (minutes > 0 || hours > 0 || days > 0) displayText += minutes + " phút ";
        displayText += seconds + " giây";

        countdownDisplayNew.innerText = displayText;
    }

    setInterval(updateCountdownNew, 1000); // Cập nhật mỗi giây
});
