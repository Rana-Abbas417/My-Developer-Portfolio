const passwordRangeInput = document.getElementById("passRangeInput");
const passwordLengthValue = document.getElementById("passRangeValue");

const lowercaseCheckbox = document.getElementById("lowercase");
const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("genBtn");

const passwordDisplay = document.getElementById("password");
const copyButton = document.getElementById("copyBtn");

const strengthText = document.getElementById("strengthText");
const strengthProgress = document.getElementById("strengthProgress");

let passwordLength = 8;

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",

  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  numbers: "0123456789",

  symbols: "!@#$%^&*()_+-=[]{}<>?",
};

// Secure random generator

function secureRandom(max) {
  const array = new Uint32Array(1);

  crypto.getRandomValues(array);

  return array[0] % max;
}

// Generate Password

function generatePassword(length) {
  let availableCharacters = "";

  if (lowercaseCheckbox.checked) {
    availableCharacters += characters.lowercase;
  }

  if (uppercaseCheckbox.checked) {
    availableCharacters += characters.uppercase;
  }

  if (numbersCheckbox.checked) {
    availableCharacters += characters.numbers;
  }

  if (symbolsCheckbox.checked) {
    availableCharacters += characters.symbols;
  }

  // No option selected

  if (availableCharacters.length === 0) {
    return "";
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = secureRandom(availableCharacters.length);

    password += availableCharacters[randomIndex];
  }

  return password;
}

// Password strength

function calculateStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;

  if (/[A-Z]/.test(password)) score++;

  if (/[0-9]/.test(password)) score++;

  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

function updateStrength(password) {
  const strength = calculateStrength(password);

  const levels = [
    {
      text: "Very Weak",
      width: "20%",
    },

    {
      text: "Weak",
      width: "40%",
    },

    {
      text: "Medium",
      width: "60%",
    },

    {
      text: "Strong",
      width: "80%",
    },

    {
      text: "Very Strong",
      width: "100%",
    },
  ];

  if (!password) {
    strengthText.textContent = "-";

    strengthProgress.style.width = "0%";

    return;
  }

  strengthText.textContent = levels[strength].text;

  strengthProgress.style.width = levels[strength].width;
}

// Range input

passwordRangeInput.addEventListener("input", (event) => {
  passwordLength = Number(event.target.value);

  passwordLengthValue.textContent = passwordLength;
});

// Generate button

generateButton.addEventListener("click", () => {
  const password = generatePassword(passwordLength);

  if (password === "") {
    passwordDisplay.textContent = "Select at least one option";

    updateStrength("");

    return;
  }

  passwordDisplay.textContent = password;

  updateStrength(password);
});

// Copy password

copyButton.addEventListener("click", async () => {
  const password = passwordDisplay.textContent;

  if (!password || password === "Select at least one option") {
    return;
  }

  try {
    await navigator.clipboard.writeText(password);

    copyButton.textContent = "Copied ✓";

    setTimeout(() => {
      copyButton.textContent = "📋 Copy";
    }, 1500);
  } catch (error) {
    copyButton.textContent = "Failed";
  }
});

// Clicking password copies it

passwordDisplay.addEventListener("click", () => {
  copyButton.click();
});
