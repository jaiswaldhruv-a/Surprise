// --- CONFIGURATION ---
const valentineDate = new Date("February 14, 2026 00:00:00").getTime();
const coupleName = "Trinayani"; // Personalization variable

// --- DOM ELEMENTS ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const heroTitle = document.querySelector('.main-title');
const mainGif = document.getElementById('main-gif');

// --- 1. THE IMPOSSIBLE BUTTON LOGIC ---
// When mouse hovers over 'No', move it
noBtn.addEventListener('mouseover', () => {
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get button dimensions to ensure it doesn't go off-screen
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate random position
    // Math.random() gives a number between 0 and 1
    const randomX = Math.random() * (windowWidth - btnWidth);
    const randomY = Math.random() * (windowHeight - btnHeight);
    
    // Apply new position
    noBtn.style.position = 'absolute'; // Must be absolute to move freely
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// --- 2. THE SUCCESS STATE ---
yesBtn.addEventListener('click', () => {
    // Update text
    heroTitle.innerHTML = `Yay! I knew you'd say Yes, ${coupleName}! ❤️`;
    
    // Update GIF to a celebration one
    mainGif.src = "https://media.tenor.com/ivKWdfdbV3EAAAAi/bear-kiss-bear-kisses.gif";
    
    // Hide the buttons
    document.querySelector('.buttons').style.display = 'none';
    
    // Trigger intense confetti/heart animation
    createHearts(50); // Burst of hearts
});

// --- 3. COUNTDOWN TIMER ---
const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = valentineDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById("days").innerText = days < 10? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10? "0" + seconds : seconds;

    // If countdown finished
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").innerHTML = "Happy Valentine's Day!";
    }
}, 1000);

// --- 4. FLOATING HEARTS ANIMATION ---
function createHearts(count = 1) {
    const container = document.querySelector('.floating-hearts');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random horizontal position
            heart.style.left = Math.random() * 100 + 'vw';
            
            // Random size
            const size = Math.random() * 20 + 10;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Random animation duration
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            container.appendChild(heart);
            
            // Remove after animation ends to prevent memory leak
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Continuous flow of hearts
setInterval(() => {
    createHearts();
}, 300);