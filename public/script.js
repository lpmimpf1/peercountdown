let countdownDate;

// Initialize the timer from localStorage or default to 1h 36m
function initializeTimer() {
    const savedEndDate = localStorage.getItem('countdownEndDate');
    if (savedEndDate) {
        countdownDate = new Date(savedEndDate).getTime();
    } else {
        // Default: 1 hour 36 minutes from now
        const now = new Date().getTime();
        countdownDate = now + (1 * 60 * 60 * 1000) + (36 * 60 * 1000);
        localStorage.setItem('countdownEndDate', new Date(countdownDate));
    }
    updateTimer();
}

// Update the countdown display
function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
        document.getElementById("timer").innerHTML = "<h2>Time's Up!</h2>";
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

// Handle Open Edit Mode button click
document.getElementById("open-edit-btn").addEventListener("click", () => {
    const password = prompt("Enter the password to edit the timer:");
    if (password === "3798786347rehiuz") {
        document.getElementById("edit-form").classList.remove("hidden");
    } else {
        alert("Incorrect password!");
    }
});

// Save the new countdown time
document.getElementById("save-btn").addEventListener("click", () => {
    const password = prompt("Enter the password to save the new time:");
    if (password !== "eoiuoiu8uz58934") {
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("error-message").classList.add("hidden");
        }, 2000); // Hide error after 2 seconds
        return;
    }

    const days = parseInt(document.getElementById("edit-days").value, 10);
    const hours = parseInt(document.getElementById("edit-hours").value, 10);
    const minutes = parseInt(document.getElementById("edit-minutes").value, 10);
    const seconds = parseInt(document.getElementById("edit-seconds").value, 10);

    const now = new Date().getTime();
    countdownDate = now + (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) +
                    (minutes * 60 * 1000) + (seconds * 1000);

    localStorage.setItem('countdownEndDate', new Date(countdownDate));
    document.getElementById("edit-form").classList.add("hidden");
    updateTimer();
});

// Start the timer
initializeTimer();
const timerInterval = setInterval(updateTimer, 1000);
