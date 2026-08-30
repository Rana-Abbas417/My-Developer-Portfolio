document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const settingsToggle = document.getElementById("settings-toggle");
    const settingsPanel = document.getElementById("settings-panel");
    const addDobBtn = document.getElementById("add-dob-btn");
    const dobInput = document.getElementById("dob-input");
    
    const initialPrompt = document.getElementById("initial-prompt");
    const timerDisplay = document.getElementById("timer-display");

    const yearsEl = document.getElementById("years");
    const monthsEl = document.getElementById("months");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    let timerInterval = null;
    let birthDate = null;

    // 1. Toggle Settings Panel Visibility
    settingsToggle.addEventListener("click", () => {
        settingsPanel.classList.toggle("hidden");
    });

    // 2. Handle adding/updating DOB
    addDobBtn.addEventListener("click", () => {
        const inputValue = dobInput.value;
        
        if (!inputValue) {
            alert("Please select a valid date");
            return;
        }

        birthDate = new Date(inputValue);
        const now = new Date();

        if (birthDate > now) {
            alert("Date of birth cannot be in the future!");
            return;
        }

        // Hide settings panel after selecting
        settingsPanel.classList.add("hidden");

        // Swap screens
        initialPrompt.classList.remove("active");
        timerDisplay.classList.add("active");

        // Reset previous interval if any and start fresh tracking
        if (timerInterval) clearInterval(timerInterval);
        updateAgeTimer();
        timerInterval = setInterval(updateAgeTimer, 1000);
    });

    // 3. Accurate Break-down Calendar Calculation Engine
    function updateAgeTimer() {
        if (!birthDate) return;

        const now = new Date();
        
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        // Adjust for negative seconds
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }

        // Adjust for negative minutes
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }

        // Adjust for negative hours
        if (hours < 0) {
            hours += 24;
            days--;
        }

        // Adjust for negative days (Gets exact days in the preceding month)
        if (days < 0) {
            const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += previousMonth.getDate();
            months--;
        }

        // Adjust for negative months
        if (months < 0) {
            months += 12;
            years--;
        }

        // Render calculated values directly into UI elements
        yearsEl.textContent = years.toString().padStart(2, '0');
        monthsEl.textContent = months.toString().padStart(2, '0');
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
});