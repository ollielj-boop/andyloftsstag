// State
let coolGuyClickable = false;
let claysLaunching = true;
let scaryRevealed = false;
let countdownFinished = false;
let clayCount = 0;
let countdownValue = 59;
let countdownInterval = null;
let speedMultiplier = 1;
let bottomLaunchInterval = null;
let gameStartTime = null;

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('coolGuy').classList.add('rise');
    }, 500);

    setTimeout(() => {
        typeText("SHOOT THE CLAY ANDY'S!");
    }, 2500);

    setTimeout(() => {
        gameStartTime = Date.now();
        launchClayPigeons();
        startCountdown();
    }, 5500);
});

document.addEventListener('DOMContentLoaded', () => {
    const coolGuy = document.getElementById('coolGuy');
    // Div itself non-interactive
    coolGuy.style.pointerEvents = 'none';

    const coolGuyImg = coolGuy.querySelector('img');
    if (coolGuyImg) {
        coolGuyImg.style.pointerEvents = 'auto';
        coolGuyImg.style.cursor = 'default';
        coolGuyImg.addEventListener('click', () => {
            if (coolGuyClickable && !scaryRevealed) {
                scaryReveal();
                scaryRevealed = true;
            }
        });
    }

    // Add a transparent blocker over the top 40% of the image so it can't be
    // accidentally clicked — only the lower 60% (the body) is interactive.
    // Only apply on non-mobile (desktop has the accidental click problem).
    if (window.innerWidth > 768) {
        const blocker = document.createElement('div');
        blocker.className = 'cool-guy-blocker';
        blocker.id = 'coolGuyBlocker';
        coolGuy.appendChild(blocker);
    }
});

// ─── Countdown ────────────────────────────────────────────────────────────────

function startCountdown() {
    updateTimerDisplay(countdownValue);

    countdownInterval = setInterval(() => {
        countdownValue--;
        updateTimerDisplay(countdownValue);

        // Start bottom-launches at second 25 elapsed (countdown = 59-25 = 34)
        if (countdownValue === 34 && !bottomLaunchInterval) {
            startBottomLaunches();
        }

        // Speed up last 10 seconds
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
    if (!el) return;
    el.textContent = val;
    if (val <= 10 && val > 0) {
        el.style.color = '#FF4444';
        el.style.animation = 'timerPulse 0.5s ease-in-out infinite';
    } else {
        el.style.color = '#FFD700';
        el.style.animation = '';
    }
}

// ─── End states ───────────────────────────────────────────────────────────────

function scaryReveal() {
    const coolGuy = document.getElementById('coolGuy');
    const typingText = document.getElementById('typingText');

    claysLaunching = false;
    if (countdownInterval) clearInterval(countdownInterval);
    if (bottomLaunchInterval) clearInterval(bottomLaunchInterval);

    // Remove the top blocker
    const blocker = document.getElementById('coolGuyBlocker');
    if (blocker) blocker.remove();

    // Grow cool guy — not yet clickable
    coolGuy.classList.add('centered');
    coolGuy.style.pointerEvents = 'none';
    const cgImg = coolGuy.querySelector('img');
    if (cgImg) { cgImg.style.pointerEvents = 'none'; cgImg.style.cursor = 'default'; }

    // Type both lines, then make cool guy clickable to go to adventure
    typingText.textContent = '';
    setTimeout(() => {
        typeText('YOU SHOT ME. YOU ARE NOT SAFE!', () => {
            setTimeout(() => {
                typingText.innerHTML += '<br>';
                typeText('YOU MUST BE REMOVED FROM THE SHOOTING RANGE!', () => {
                    // Text done — now make cool guy clickable
                    coolGuy.style.pointerEvents = 'auto';
                    coolGuy.style.cursor = 'pointer';
                    coolGuy.onclick = () => { window.location.href = 'adventure.html'; };
                    if (cgImg) {
                        cgImg.style.pointerEvents = 'auto';
                        cgImg.style.cursor = 'pointer';
                        cgImg.onclick = () => { window.location.href = 'adventure.html'; };
                    }
                });
            }, 500);
        });
    }, 500);
}

function countdownMilestone() {
    const coolGuy = document.getElementById('coolGuy');
    const typingText = document.getElementById('typingText');

    claysLaunching = false;
    if (bottomLaunchInterval) clearInterval(bottomLaunchInterval);

    // Disable accidental click on cool guy (div already none; also disable img)
    coolGuy.style.pointerEvents = 'none';
    const cgImgM = coolGuy.querySelector('img');
    if (cgImgM) { cgImgM.style.pointerEvents = 'none'; cgImgM.style.cursor = 'default'; }
    coolGuy.classList.add('centered');

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
    yesButton.onclick = () => { window.location.href = 'adventure.html'; };

    const noButton = document.createElement('button');
    noButton.className = 'choice-button';
    noButton.textContent = 'NO';
    noButton.onclick = () => {
        buttonContainer.remove();

        const coolGuy = document.getElementById('coolGuy');
        coolGuy.classList.remove('centered');
        // Restore: div stays pointer-events:none, img gets pointer-events:auto
        coolGuy.style.pointerEvents = 'none';
        // Re-enable cool guy clickability for the new round
        coolGuyClickable = true;
        coolGuy.style.pointerEvents = 'none'; // div stays none, img is the click target
        const cgImgNo = coolGuy.querySelector('img');
        if (cgImgNo) {
            cgImgNo.style.pointerEvents = 'auto';
            cgImgNo.style.cursor = 'pointer';
            cgImgNo.onclick = null; // cleared - the DOMContentLoaded listener handles it
        }
        // Restore top blocker on desktop
        if (window.innerWidth > 768 && !document.getElementById('coolGuyBlocker')) {
            const blockerNo = document.createElement('div');
            blockerNo.className = 'cool-guy-blocker';
            blockerNo.id = 'coolGuyBlocker';
            coolGuy.appendChild(blockerNo);
        }

        document.getElementById('typingText').textContent = '';
        claysLaunching = true;
        countdownFinished = false;
        scaryRevealed = false; // allow cool guy to be clicked again
        countdownValue = 59;
        speedMultiplier = 1;
        bottomLaunchInterval = null;
        clayCountLeft = 0; // reset so right clays restart properly

        // Restart clay launches (launchClayPigeons sets up speed watcher + cycle)
        if (leftInterval) clearInterval(leftInterval);
        launchClayPigeons();

        startCountdown();
    };

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    document.body.appendChild(buttonContainer);
}

// ─── Typing effect ────────────────────────────────────────────────────────────

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

// ─── Clay launching ───────────────────────────────────────────────────────────

let clayCountLeft = 0;
let leftInterval = null;

function launchClayPigeons() {
    startLeftRightCycle();

    // Watch for speed change and restart cycle
    let lastSpeed = speedMultiplier;
    const speedWatcher = setInterval(() => {
        if (!claysLaunching) { clearInterval(speedWatcher); return; }
        if (speedMultiplier !== lastSpeed) {
            lastSpeed = speedMultiplier;
            clearInterval(leftInterval);
            startLeftRightCycle();
        }
    }, 500);
}

function startLeftRightCycle() {
    leftInterval = setInterval(() => {
        if (!claysLaunching) { clearInterval(leftInterval); return; }

        launchClay('left');
        clayCountLeft++;

        if (clayCountLeft >= 5) {
            if (!coolGuyClickable) {
                coolGuyClickable = true;
                document.getElementById('coolGuy').style.cursor = 'pointer';
            }
            const delay = Math.round(400 / speedMultiplier);
            setTimeout(() => {
                if (claysLaunching) launchClay('right');
            }, delay);
        }
    }, Math.round(2000 / speedMultiplier));
}

function startBottomLaunches() {
    bottomLaunchInterval = setInterval(() => {
        if (!claysLaunching) { clearInterval(bottomLaunchInterval); return; }
        launchClay('bottom');
    }, Math.round(5000 / speedMultiplier));
}

// ─── Individual clay launch ───────────────────────────────────────────────────

function launchClay(side) {
    const clay = document.createElement('div');
    clay.className = 'clay';

    const img = document.createElement('img');
    img.src = 'images/clay1.png';
    clay.appendChild(img);

    document.getElementById('clayContainer').appendChild(clay);

    const isMobile = window.innerWidth <= 768;
    let startX, startY, horizontalDistance, direction, peakHeight;

    if (side === 'right') {
        // Launch from upper-right, travel diagonally down-left
        // Same logic for mobile and desktop — use top-based positioning
        startX = window.innerWidth + 50;
        startY = isMobile ? window.innerHeight * 0.1 : window.innerHeight * 0.15;
        horizontalDistance = -(window.innerWidth * (isMobile ? 1.3 : 1.4));
        peakHeight = window.innerHeight * 0.15;
        direction = -1;

        clay.style.left = startX + 'px';
        clay.style.top = startY + 'px';
        clay.style.bottom = 'auto';

    } else if (side === 'bottom') {
        // Launch straight up from random x position along bottom, then drop back
        startX = window.innerWidth * (0.05 + Math.random() * 0.5); // left 5-55% of width, away from Cool Guy
        startY = window.innerHeight + 60; // below screen
        horizontalDistance = 0; // straight up
        peakHeight = window.innerHeight * 0.55;
        direction = Math.random() > 0.5 ? 1 : -1;

        clay.style.left = startX + 'px';
        clay.style.bottom = '0px';
        clay.style.top = 'auto';

    } else {
        // left side
        startX = -100;
        startY = window.innerHeight + 100;
        horizontalDistance = window.innerWidth + 200;
        peakHeight = window.innerHeight * 0.45;
        direction = 1;

        clay.style.left = startX + 'px';
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

    const isMobileDevice = window.innerWidth <= 768;
    const baseDurations = { left: 5000, right: isMobileDevice ? 2800 : 4500, bottom: 3500 };
    const duration = Math.round(baseDurations[side] / speedMultiplier);
    const startTime = Date.now();

    function animate() {
        if (isDestroyed || !claysLaunching) { clay.remove(); return; }

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) { clay.remove(); return; }

        const x = startX + (horizontalDistance * progress);

        if (side === 'right') {
            // Top-based: drift from upper-right downward with slight early upward bow
            const dropAmount = window.innerHeight * 0.75;
            const arcDip = -peakHeight * Math.sin(progress * Math.PI * 0.7);
            const posTop = startY + (dropAmount * progress) + arcDip;
            clay.style.top = posTop + 'px';
            clay.style.bottom = 'auto';

        } else if (side === 'bottom') {
            // Bottom-based: shoot up then fall — pure parabola
            const arcProgress = progress < 0.5 ? progress * 2 : 1 + (progress - 0.5) * 3;
            const yOffset = Math.sin(Math.min(arcProgress, 1) * Math.PI) * peakHeight * 2;
            const posFromBottom = yOffset - 60; // starts at -60 (below screen), rises
            clay.style.bottom = posFromBottom + 'px';
            clay.style.top = 'auto';

        } else {
            // Left: bottom-based parabola
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

// ─── Shatter effect ───────────────────────────────────────────────────────────

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

        let shardX = centerX, shardY = centerY;
        let shardVY = velocityY;
        let rot = Math.random() * 360;
        let opacity = 1;

        function animateShard() {
            shardX += velocityX * 0.02;
            shardY += shardVY * 0.02;
            shardVY += 5;
            rot += 10;
            opacity -= 0.02;

            if (opacity <= 0) { shard.remove(); return; }

            shard.style.left = shardX + 'px';
            shard.style.top = shardY + 'px';
            shard.style.transform = `rotate(${rot}deg)`;
            shard.style.opacity = opacity;

            requestAnimationFrame(animateShard);
        }
        animateShard();
    }

    clay.remove();
}
