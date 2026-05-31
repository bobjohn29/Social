const splash = document.getElementById("splash");
const loadingScreen = document.getElementById("loading-screen");
const welcomePage = document.getElementById("welcome-page");
const loginPage = document.getElementById("login-page");
const signupPage = document.getElementById("signup-page");
const slides = document.getElementById("slides");
const gameGrid = document.getElementById("gameGrid");

let currentSlide = 0;
let startX = 0;
let endX = 0;

const colors = [
    "#ff6b6b", "#4dabf7", "#51cf66", "#ffd43b", "#845ef7", "#ff922b",
    "#20c997", "#f06595", "#748ffc", "#94d82d", "#adb5bd", "#339af0",
    "#ff8787", "#69db7c", "#fcc419", "#9775fa", "#ffa94d", "#38d9a9"
];

colors.forEach(color => {
    const tile = document.createElement("div");
    tile.className = "game-tile";
    tile.style.background = color;
    gameGrid.appendChild(tile);
});

for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    document.getElementById("birthDay").appendChild(option);
}

for (let year = 2025; year >= 1900; year--) {
    const option = document.createElement("option");
    option.textContent = year;
    document.getElementById("birthYear").appendChild(option);
}

const takenUsernames = ["admin", "velora", "test", "roblox"];

setTimeout(() => {
    splash.style.display = "none";
    loadingScreen.style.display = "flex";

    setTimeout(() => {
        loadingScreen.style.display = "none";
        welcomePage.style.display = "block";
    }, 3000);
}, 3000);

function hideAllPages() {
    welcomePage.style.display = "none";
    loginPage.style.display = "none";
    signupPage.style.display = "none";
    loadingScreen.style.display = "none";
}

function showWelcome() {
    hideAllPages();
    welcomePage.style.display = "block";
}

function showLogin() {
    hideAllPages();
    loginPage.style.display = "block";
}

function showSignup() {
    hideAllPages();
    signupPage.style.display = "block";
}

function infiniteLoad() {
    hideAllPages();
    loadingScreen.style.display = "flex";
}

function updateSlide() {
    slides.style.transform = "translateX(-" + currentSlide * 100 + "vw)";

    document.getElementById("dot0").classList.remove("active");
    document.getElementById("dot1").classList.remove("active");
    document.getElementById("dot2").classList.remove("active");

    document.getElementById("dot" + currentSlide).classList.add("active");
}

welcomePage.addEventListener("touchstart", event => {
    startX = event.touches[0].clientX;
});

welcomePage.addEventListener("touchend", event => {
    endX = event.changedTouches[0].clientX;
    handleSwipe();
});

welcomePage.addEventListener("mousedown", event => {
    startX = event.clientX;
});

welcomePage.addEventListener("mouseup", event => {
    endX = event.clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = startX - endX;

    if (swipeDistance > 50 && currentSlide < 2) {
        currentSlide++;
        updateSlide();
    }

    if (swipeDistance < -50 && currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

const usernameInput = document.getElementById("signupUsername");
const passwordInput = document.getElementById("signupPassword");
const confirmInput = document.getElementById("confirmPassword");

usernameInput.addEventListener("input", () => {
    const value = usernameInput.value.trim().toLowerCase();
    const error = document.getElementById("usernameError");

    usernameInput.classList.remove("input-error", "input-good");

    if (value.length === 0) {
        error.style.display = "none";
        return;
    }

    if (value.length < 3) {
        usernameInput.classList.add("input-error");
        error.textContent = "Need at least 3 characters.";
        error.style.display = "block";
        return;
    }

    if (takenUsernames.includes(value)) {
        usernameInput.classList.add("input-error");
        error.textContent = "Username already exists.";
        error.style.display = "block";
        return;
    }

    usernameInput.classList.add("input-good");
    error.style.display = "none";
});

passwordInput.addEventListener("input", validatePassword);
confirmInput.addEventListener("input", validatePassword);

function validatePassword() {
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    passwordInput.classList.remove("input-error", "input-good");
    confirmInput.classList.remove("input-error", "input-good");

    if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
        passwordInput.classList.add("input-error");
        passwordError.style.display = "block";
    } else if (passwordInput.value.length >= 8) {
        passwordInput.classList.add("input-good");
        passwordError.style.display = "none";
    } else {
        passwordError.style.display = "none";
    }

    if (confirmInput.value.length > 0) {
        if (confirmInput.value !== passwordInput.value) {
            confirmInput.classList.add("input-error");
            confirmError.style.display = "block";
        } else {
            confirmInput.classList.add("input-good");
            confirmError.style.display = "none";
        }
    } else {
        confirmError.style.display = "none";
    }
}

function selectGender(gender) {
    const male = document.getElementById("maleButton");
    const female = document.getElementById("femaleButton");

    male.classList.remove("active-male");
    female.classList.remove("active-female");

    if (gender === "male") {
        male.classList.add("active-male");
    }

    if (gender === "female") {
        female.classList.add("active-female");
    }
}

document.addEventListener("gesturestart", event => {
    event.preventDefault();
});

document.addEventListener("wheel", event => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("touchmove", event => {
    event.preventDefault();
}, { passive: false });