const splash = document.getElementById("splash");
const loadingScreen = document.getElementById("loading-screen");
const welcomePage = document.getElementById("welcome-page");
const loginPage = document.getElementById("login-page");
const signupPage = document.getElementById("signup-page");
const homePage = document.getElementById("home-page");
const gamesPage = document.getElementById("games-page");
const slides = document.getElementById("slides");
const gameGrid = document.getElementById("gameGrid");
const gamesSections = document.getElementById("gamesSections");

let currentSlide = 0;
let startX = 0;
let endX = 0;
let selectedGender = "";

const colors = [
    "#ff6b6b", "#4dabf7", "#51cf66", "#ffd43b", "#845ef7", "#ff922b",
    "#20c997", "#f06595", "#748ffc", "#94d82d", "#adb5bd", "#339af0",
    "#ff8787", "#69db7c", "#fcc419", "#9775fa", "#ffa94d", "#38d9a9"
];

colors.forEach(function (color) {
    const tile = document.createElement("div");
    tile.className = "game-tile";
    tile.style.background = color;
    gameGrid.appendChild(tile);
});

const gamesCategories = [
    "Recommended",
    "Trending",
    "New",
    "Top Playing",
    "Top Earning",
    "Top Paid Access",
    "Top Rated"
];

const gamesCatalog = [
    { title: "MeepCity", players: "3,474 Playing", thumb: "thumb-meep", label: "meepcity" },
    { title: "The Really Easy Obby", players: "770 Playing", thumb: "thumb-rainbow", label: "obby" },
    { title: "Adopt Me! Obbies", players: "1,474 Playing", thumb: "thumb-adopt", label: "adopt me" },
    { title: "Fashion Famous", players: "692 Playing", thumb: "thumb-fashion", label: "fashion" },
    { title: "Candy Tycoon!", players: "340 Playing", thumb: "thumb-candy", label: "candy" },
    { title: "Escape FRIES!", players: "209 Playing", thumb: "thumb-fries", label: "escape" },
    { title: "Shark Run", players: "1,208 Playing", thumb: "thumb-shark", label: "run" },
    { title: "Chef Trouble", players: "925 Playing", thumb: "thumb-chef", label: "chef" },
    { title: "Hide And Escape", players: "801 Playing", thumb: "thumb-hide", label: "escape!" }
];

function createGameCard(game) {
    const card = document.createElement("article");
    card.className = "game-card";

    card.innerHTML =
        '<div class="game-thumb ' + game.thumb + '">' +
            '<span>' + game.label + '</span>' +
        '</div>' +
        '<div class="game-card-title">' + game.title + '</div>' +
        '<div class="game-card-players">' + game.players + '</div>' +
        '<div class="rating-row">' +
            '<span class="like-icon">♣</span>' +
            '<span></span><span></span><span></span><span></span><span></span><span></span>' +
        '</div>';

    return card;
}

function buildGamesSections() {
    gamesCategories.forEach(function (category, categoryIndex) {
        const section = document.createElement("section");
        section.className = "games-section";

        const header = document.createElement("div");
        header.className = "games-section-header";
        header.innerHTML = '<h2>' + category + '</h2><button onclick="infiniteLoad()">See All</button>';

        const grid = document.createElement("div");
        grid.className = "games-card-grid";

        gamesCatalog.forEach(function (_, gameIndex) {
            const game = gamesCatalog[(gameIndex + categoryIndex) % gamesCatalog.length];
            grid.appendChild(createGameCard(game));
        });

        section.appendChild(header);
        section.appendChild(grid);
        gamesSections.appendChild(section);
    });
}

buildGamesSections();

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

function getAccounts() {
    const saved = localStorage.getItem("veloraAccounts");

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem("veloraAccounts", JSON.stringify(accounts));
}

function setLoggedInUser(username) {
    localStorage.setItem("veloraLoggedInUser", username);
}

function getLoggedInUser() {
    return localStorage.getItem("veloraLoggedInUser");
}

function hideAllPages() {
    welcomePage.style.display = "none";
    loginPage.style.display = "none";
    signupPage.style.display = "none";
    homePage.style.display = "none";
    gamesPage.style.display = "none";
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

function showHome() {
    const username = getLoggedInUser();

    hideAllPages();

    if (username) {
        document.getElementById("homeUsername").textContent = username;
    }

    homePage.style.display = "block";
}

function showGames() {
    const username = getLoggedInUser();

    hideAllPages();

    if (username) {
        document.getElementById("gamesUsername").textContent = username;
    }

    gamesPage.style.display = "block";
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

setTimeout(function () {
    splash.style.display = "none";
    loadingScreen.style.display = "flex";

    setTimeout(function () {
        loadingScreen.style.display = "none";

        if (getLoggedInUser()) {
            showHome();
        } else {
            welcomePage.style.display = "block";
        }
    }, 3000);
}, 3000);

welcomePage.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
});

welcomePage.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].clientX;
    handleSwipe();
});

welcomePage.addEventListener("mousedown", function (event) {
    startX = event.clientX;
});

welcomePage.addEventListener("mouseup", function (event) {
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

function validateUsername() {
    const value = usernameInput.value.trim();
    const lowerValue = value.toLowerCase();
    const error = document.getElementById("usernameError");
    const accounts = getAccounts();

    usernameInput.classList.remove("input-error", "input-good");

    if (value.length === 0) {
        error.style.display = "none";
        return false;
    }

    if (value.length < 3) {
        usernameInput.classList.add("input-error");
        error.textContent = "Need at least 3 characters.";
        error.style.display = "block";
        return false;
    }

    if (value.length > 20) {
        usernameInput.classList.add("input-error");
        error.textContent = "Username can only be 20 characters.";
        error.style.display = "block";
        return false;
    }

    const exists = accounts.some(function (account) {
        return account.username.toLowerCase() === lowerValue;
    });

    if (exists) {
        usernameInput.classList.add("input-error");
        error.textContent = "Username already exists.";
        error.style.display = "block";
        return false;
    }

    usernameInput.classList.add("input-good");
    error.style.display = "none";
    return true;
}

function validatePassword() {
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    let passwordValid = false;
    let confirmValid = false;

    passwordInput.classList.remove("input-error", "input-good");
    confirmInput.classList.remove("input-error", "input-good");

    if (passwordInput.value.length === 0) {
        passwordError.style.display = "none";
    } else if (passwordInput.value.length < 8) {
        passwordInput.classList.add("input-error");
        passwordError.style.display = "block";
    } else {
        passwordInput.classList.add("input-good");
        passwordError.style.display = "none";
        passwordValid = true;
    }

    if (confirmInput.value.length === 0) {
        confirmError.style.display = "none";
    } else if (confirmInput.value !== passwordInput.value) {
        confirmInput.classList.add("input-error");
        confirmError.style.display = "block";
    } else {
        confirmInput.classList.add("input-good");
        confirmError.style.display = "none";
        confirmValid = true;
    }

    return passwordValid && confirmValid;
}

usernameInput.addEventListener("input", validateUsername);
passwordInput.addEventListener("input", validatePassword);
confirmInput.addEventListener("input", validatePassword);

function selectGender(gender) {
    const male = document.getElementById("maleButton");
    const female = document.getElementById("femaleButton");

    selectedGender = gender;

    male.classList.remove("active-male");
    female.classList.remove("active-female");

    if (gender === "male") {
        male.classList.add("active-male");
    }

    if (gender === "female") {
        female.classList.add("active-female");
    }
}

function createAccount() {
    const signupError = document.getElementById("signupError");

    const month = document.getElementById("birthMonth").value;
    const day = document.getElementById("birthDay").value;
    const year = document.getElementById("birthYear").value;
    const termsChecked = document.getElementById("termsCheck").checked;

    const usernameValid = validateUsername();
    const passwordValid = validatePassword();

    signupError.style.display = "none";

    if (!month || !day || !year || !usernameValid || !passwordValid || !selectedGender || !termsChecked) {
        signupError.textContent = "Please complete all fields correctly.";
        signupError.style.display = "block";
        return;
    }

    const accounts = getAccounts();

    const newAccount = {
        username: usernameInput.value.trim(),
        password: passwordInput.value,
        birthday: {
            month: month,
            day: day,
            year: year
        },
        gender: selectedGender,
        friends: 0,
        continuePlaying: [],
        favorites: []
    };

    accounts.push(newAccount);
    saveAccounts(accounts);
    setLoggedInUser(newAccount.username);
    showHome();
}

function loginAccount() {
    const loginUsername = document.getElementById("loginUsername").value.trim().toLowerCase();
    const loginPassword = document.getElementById("loginPassword").value;
    const loginError = document.getElementById("loginError");

    const accounts = getAccounts();

    const found = accounts.find(function (account) {
        return account.username.toLowerCase() === loginUsername && account.password === loginPassword;
    });

    loginError.style.display = "none";

    if (!found) {
        loginError.style.display = "block";
        return;
    }

    setLoggedInUser(found.username);
    showHome();
}

document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
});

document.addEventListener("wheel", function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("touchmove", function (event) {
    const target = event.target;
    const scrollable = target.closest(".home-content, .games-content, .empty-games-row");

    if (!scrollable) {
        event.preventDefault();
    }
}, { passive: false });
