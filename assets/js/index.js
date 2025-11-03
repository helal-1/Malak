// Create audio context for sound effects
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play click sound
function playClickSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Variable to keep track of the currently playing audio
let currentAudio = null;

// Function to stop currently playing audio
function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// Function to play audio by ID
function playAudio(songId) {
    stopCurrentAudio(); // Stop any currently playing audio
    currentAudio = document.getElementById(songId);
    if (currentAudio) {
        currentAudio.currentTime = 0; // Rewind to start
        currentAudio.play().catch(e => console.log("Audio play failed:", e));
    }
}

// Navigation and item click handlers
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").prepend(items[items.length - 1]);
});

// Add click handlers to all items
let items = document.querySelectorAll(".item");
items.forEach((item) => {
    item.addEventListener("click", function () {
        // Get the song ID from the data-song attribute
        const songId = this.getAttribute('data-song');
        if (songId) {
            playAudio(songId);
        }
        
        // Move the clicked item to the first position
        let currentItems = document.querySelectorAll(".item");
        document.querySelector(".slide").appendChild(currentItems[0]);
    });
});

// Stop audio when clicking anywhere else on the page
document.addEventListener('click', function(e) {
    if (!e.target.closest('.item')) {
        stopCurrentAudio();
    }
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const landingPage = document.getElementById('landingPage');
    const startBtn = document.getElementById('startBtn');

    if (startBtn && landingPage) {
        startBtn.addEventListener('click', function() {
            // Play a simple sound effect
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);

            // Hide the landing page
            landingPage.classList.add('hidden');
        });
    }
});

// Rest of your existing JavaScript code...