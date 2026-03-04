// Cool guy animation
let coolGuyClickable = false;
let claysLaunching = true;
let scaryRevealed = false;
let countdownFinished = false;
let clayCount = 0;
let countdownValue = 59;
let countdownInterval = null;
let speedMultiplier = 1;

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('coolGuy').classList.add('rise');
    }, 500);

    // Start typing text after cool guy appears
    setTimeout(() => {
        typeText("SHOOT THE CLAY ANDY'S!");
    }, 2500);

    // Start launching clay pigeons and countdown after text finishes
    setTimeout(() => {
        launchClayPigeons();
        startCountdown();
    }, 5500);
});

// Cool guy click handler
document.addEventListener('DOMContentLoaded', () => {
    const coolGuy = document.getElementById('coolGuy');
    
    coolGuy.addEventListener('click', () => {
        if (coolGuyClickable && !scaryRevealed) {
            scaryReveal();
            scaryRevealed = true;
        }
    });
});

function startCountdown() {
    updateTimerDisplay(countdownValue);
    
    countdownInterval = setInterval(() => {
        countdownValue--;
        updateTimerDisplay(countdownValue);
        
        // Speed up in the last 10 seconds
        if (countdownValue === 10) {
            speedMultiplier = 1.6;
        }
        
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            countdownValue = 0;
            updateTimerDisplay(0);
            if (!countdownFinished && !scaryRevealed) {
                countdownFinished = true;
                countdownMilestone();
            }
        }
    }, 1000);
}

function updateTimerDisplay(val) {
    const el = document.getElementById('countdownTimer');
    if (el) {
        el.textContent = val;
        if (val <= 10 && val > 0) {
            el.style.color = '#FF4444';
            el.style.animation = 'timerPulse 0.5s ease-in-out infinite';
        }
    }
}

function scaryReveal() {
    const coolGuy = document.getElementById('coolGuy');
    const typingText = document.getElementById('typingText');
    
    claysLaunching = false;
    if (countdownInterval) clearInterval(countdownInterval);
    
    setTimeout(() => {
        coolGuy.style.cursor = 'pointer';
        coolGuy.onclick = () => {
            window.location.href = 'adventure.html';
        };
    }, 3000);
    
    coolGuy.classList.add('centered');
    
    typingText.textContent = '';
    setTimeout(() => {
        typeText('YOU ARE NOT SAFE!', () => {
            setTimeout(() => {
                typingText.innerHTML += '<br>';
                typeText('YOU MUST BE REMOVED FROM THE SHOOTING RANGE!');
            }, 500);
        });
    }, 500);
}

function countdownMilestone() {
    const coolGuy = document.getElementById('coolGuy');
    const typingText = document.getElementById('typingText');
    
    claysLaunching = false;
    
    coolGuy.classList.add('centered');
    coolGuy.style.pointerEvents = 'none';
    coolGuy.style.cursor = 'default';
    
    typingText.textContent = '';
    setTimeout(() => {
        typeText('Nice work! Ready for the Pub?', () => {
            showChoiceButtons();
        });
    }, 500);
}

function showChoiceButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'choice-buttons';
    buttonContainer.id = 'choiceButtons';
    
    const yesButton = document.createElement('button');
    yesButton.className = 'choice-button';
    yesButton.textContent = 'YES';
    yesButton.onclick = () => {
        window.location.href = 'adventure.html';
    };
    
    const noButton = document.createElement('button');
    noButton.className = 'choice-button';
    noButton.textContent = 'NO';
    noButton.onclick = () => {
        buttonContainer.remove();
        
        const coolGuy = document.getElementById('coolGuy');
        coolGuy.classList.remove('centered');
        
        document.getElementById('typingText').textContent = '';
        claysLaunching = true;
        countdownFinished = false;
        countdownValue = 59;
        speedMultiplier = 1;
        
        // Update timer display
        const timerEl = document.getElementById('countdownTimer');
        if (timerEl) {
            timerEl.style.color = '#FFD700';
            timerEl.style.animation = '';
        }
        
        startCountdown();
    };
    
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    document.body.appendChild(buttonContainer);
}

// Typing effect
function typeText(text, callback) {
    const typingElement = document.getElementById('typingText');
    let index = 0;
    const startLength = typingElement.textContent.length;

    function type() {
        if (index < text.length) {
            const currentText = typingElement.textContent;
            const beforeBreak = currentText.substring(0, startLength);
            const afterBreak = currentText.substring(startLength);
            
            typingElement.innerHTML = beforeBreak + (beforeBreak ? '<br>' : '') + afterBreak + text[index];
            index++;
            setTimeout(type, 100);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// Clay pigeon launching
let clayCountLeft = 0;
let leftInterval = null;

function launchClayPigeons() {
    leftInterval = setInterval(() => {
        if (!claysLaunching) {
            clearInterval(leftInterval);
            return;
        }
        
        launchClay('left');
        clayCountLeft++;
        
        if (clayCountLeft >= 5) {
            if (!coolGuyClickable) {
                coolGuyClickable = true;
                document.getElementById('coolGuy').style.cursor = 'pointer';
            }
            
            const delay = Math.round(400 / speedMultiplier);
            setTimeout(() => {
                if (claysLaunching) {
                    launchClay('right');
                }
            }, delay);
        }
    }, Math.round(2000 / speedMultiplier));
    
    // Watch for speed changes and restart interval
    let lastSpeed = speedMultiplier;
    const speedWatcher = setInterval(() => {
        if (!claysLaunching) {
            clearInterval(speedWatcher);
            return;
        }
        if (speedMultiplier !== lastSpeed) {
            lastSpeed = speedMultiplier;
            clearInterval(leftInterval);
            leftInterval = setInterval(() => {
                if (!claysLaunching) {
                    clearInterval(leftInterval);
                    return;
                }
                launchClay('left');
                const delay = Math.round(400 / speedMultiplier);
                setTimeout(() => {
                    if (claysLaunching) launchClay('right');
                }, delay);
            }, Math.round(2000 / speedMultiplier));
        }
    }, 500);
}

function launchClay(side) {
    const clay = document.createElement('div');
    clay.className = 'clay';
    
    const img = document.createElement('img');
    img.src = 'images/clay1.png';
    clay.appendChild(img);
    
    document.getElementById('clayContainer').appendChild(clay);
    
    let startX, startY, horizontalDistance, direction, peakHeight;
    
    const isMobile = window.innerWidth <= 768;
    
    if (side === 'right') {
        if (isMobile) {
            startX = window.innerWidth + 80;
            startY = window.innerHeight + 100;
            horizontalDistance = -(window.innerWidth * 1.5);
            peakHeight = window.innerHeight * 0.5;
        } else {
            startX = window.innerWidth + 50;
            startY = window.innerHeight * 0.15;
            horizontalDistance = -(window.innerWidth * 1.4);
            peakHeight = window.innerHeight * 0.25;
        }
        direction = -1;
    } else {
        startX = -100;
        startY = window.innerHeight + 100;
        horizontalDistance = window.innerWidth + 200;
        direction = 1;
        peakHeight = window.innerHeight * 0.45;
    }
    
    clay.style.left = startX + 'px';
    if (side === 'right') {
        clay.style.top = startY + 'px';
        clay.style.bottom = 'auto';
    } else {
        clay.style.bottom = '0px';
        clay.style.top = 'auto';
    }
    
    let rotation = 0;
    let scale = 1;
    let isDestroyed = false;

    clay.addEventListener('click', (e) => {
        if (!isDestroyed) {
            e.stopPropagation();
            shatterClay(clay);
            isDestroyed = true;
            
            clayCount++;
            document.getElementById('clayCounter').textContent = clayCount;
        }
    });

    // Speed up duration when in last 10 seconds
    const baseDuration = side === 'right' ? 4500 : 5000;
    const duration = Math.round(baseDuration / speedMultiplier);
    const startTime = Date.now();

    function animate() {
        if (isDestroyed || !claysLaunching) {
            clay.remove();
            return;
        }

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) {
            clay.remove();
            return;
        }

        const x = startX + (horizontalDistance * progress);
        
        let posTop;
        if (side === 'right') {
            // Start upper-right, drift across and downward in a gentle arc
            const dropAmount = window.innerHeight * 0.75; // total drop from start to end
            const arcDip = -peakHeight * Math.sin(progress * Math.PI * 0.7); // slight upward bow early
            posTop = startY + (dropAmount * progress) + arcDip;
            clay.style.top = posTop + 'px';
            clay.style.bottom = 'auto';
        } else {
            // Left side: launch from bottom, arc upward then fall
            const arcProgress = progress < 0.5 ? progress * 2 : 1 + (progress - 0.5) * 3;
            const y = startY - (Math.sin(Math.min(arcProgress, 1) * Math.PI) * peakHeight * 2);
            clay.style.bottom = (window.innerHeight - y) + 'px';
            clay.style.top = 'auto';
        }

        const shrinkAmount = side === 'right' ? 0.85 : 0.9;
        scale = 1 - (progress * shrinkAmount);
        
        rotation += 2 * direction;

        clay.style.left = x + 'px';
        clay.style.transform = `rotate(${rotation}deg) scale(${scale})`;

        requestAnimationFrame(animate);
    }

    animate();
}

function shatterClay(clay) {
    const rect = clay.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 10; i++) {
        const shard = document.createElement('div');
        shard.className = 'clay-shard';
        
        const img = document.createElement('img');
        img.src = 'images/clay1.png';
        shard.appendChild(img);
        
        document.body.appendChild(shard);

        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
        const speed = 100 + Math.random() * 100;
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        shard.style.left = centerX + 'px';
        shard.style.top = centerY + 'px';

        let shardX = centerX;
        let shardY = centerY;
        let shardVelocityY = velocityY;
        let rotation = Math.random() * 360;
        let opacity = 1;

        function animateShard() {
            shardX += velocityX * 0.02;
            shardY += shardVelocityY * 0.02;
            shardVelocityY += 5;
            rotation += 10;
            opacity -= 0.02;

            if (opacity <= 0) {
                shard.remove();
                return;
            }

            shard.style.left = shardX + 'px';
            shard.style.top = shardY + 'px';
            shard.style.transform = `rotate(${rotation}deg)`;
            shard.style.opacity = opacity;

            requestAnimationFrame(animateShard);
        }

        animateShard();
    }

    clay.remove();
}
