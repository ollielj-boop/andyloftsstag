// Cool guy animation
let coolGuyClickable = false;
let claysLaunching = true;

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('coolGuy').classList.add('rise');
    }, 500);

    // Start typing text after cool guy appears
    setTimeout(() => {
        typeText("SHOOT THE CLAY ANDY'S!");
    }, 2500);

    // Start launching clay pigeons after text finishes
    setTimeout(() => {
        launchClayPigeons();
    }, 5500);
});

// Cool guy click handler
document.addEventListener('DOMContentLoaded', () => {
    const coolGuy = document.getElementById('coolGuy');
    
    coolGuy.addEventListener('click', () => {
        if (coolGuyClickable) {
            scaryReveal();
        }
    });
});

function scaryReveal() {
    const coolGuy = document.getElementById('coolGuy');
    const typingText = document.getElementById('typingText');
    
    // Stop launching clays
    claysLaunching = false;
    
    // Make cool guy clickable cursor
    coolGuy.style.cursor = 'default';
    
    // Center and enlarge cool guy
    coolGuy.classList.add('centered');
    
    // Clear existing text and type scary message
    typingText.textContent = '';
    setTimeout(() => {
        typeText('YOU ARE NOT SAFE!');
    }, 500);
}

// Typing effect
function typeText(text) {
    const typingElement = document.getElementById('typingText');
    typingElement.textContent = ''; // Clear existing text
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text[index];
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

// Clay pigeon launching
function launchClayPigeons() {
    setInterval(() => {
        launchClay();
    }, 2000); // Launch every 2 seconds
}

// Clay pigeon launching
let clayCountLeft = 0;

function launchClayPigeons() {
    // Left side launches continuously
    const leftInterval = setInterval(() => {
        if (!claysLaunching) {
            clearInterval(leftInterval);
            return;
        }
        
        launchClay('left');
        clayCountLeft++;
        
        // After 5 left launches, also launch from right with delay
        if (clayCountLeft >= 5) {
            // Make cool guy clickable
            if (!coolGuyClickable) {
                coolGuyClickable = true;
                document.getElementById('coolGuy').style.cursor = 'pointer';
            }
            
            setTimeout(() => {
                if (claysLaunching) {
                    launchClay('right');
                }
            }, 400); // 400ms delay after left launch
        }
    }, 2000); // Launch every 2 seconds
}

function launchClay(side) {
    const clay = document.createElement('div');
    clay.className = 'clay';
    
    const img = document.createElement('img');
    img.src = 'images/clay1.png';
    clay.appendChild(img);
    
    document.getElementById('clayContainer').appendChild(clay);
    
    let startX, startY, horizontalDistance, direction;
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    if (side === 'right') {
        // Launch from right side - adjusted for mobile visibility
        if (isMobile) {
            startX = window.innerWidth + 50; // Closer to screen on mobile
            horizontalDistance = -(window.innerWidth * 1.1); // Less distance on mobile
        } else {
            startX = window.innerWidth + 150;
            horizontalDistance = -(window.innerWidth * 1.3);
        }
        startY = window.innerHeight + 100;
        direction = -1;
    } else {
        // Launch from left side
        startX = -100;
        startY = window.innerHeight + 100;
        horizontalDistance = window.innerWidth + 200;
        direction = 1;
    }
    
    // Calculate trajectory - higher peak
    const peakHeight = window.innerHeight * 0.45; // Peak at 45% of screen height
    
    clay.style.left = startX + 'px';
    clay.style.bottom = '0px';
    
    let rotation = 0;
    let scale = 1;
    let isDestroyed = false;

    // Click handler for shooting with larger hit detection
    clay.addEventListener('click', (e) => {
        if (!isDestroyed) {
            e.stopPropagation();
            shatterClay(clay);
            isDestroyed = true;
        }
    });

    // Animation loop
    const duration = side === 'right' ? 4500 : 5000;
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

        // Parabolic trajectory with earlier fall
        const x = startX + (horizontalDistance * progress);
        const arcProgress = progress < 0.5 ? progress * 2 : 1 + (progress - 0.5) * 3;
        const y = startY - (Math.sin(Math.min(arcProgress, 1) * Math.PI) * peakHeight * 2);

        // Size decreases more dramatically for right side
        const shrinkAmount = side === 'right' ? 0.92 : 0.9; // Right side shrinks to 8%
        scale = 1 - (progress * shrinkAmount);
        
        // Rotation
        rotation += 2 * direction;

        clay.style.left = x + 'px';
        clay.style.bottom = (window.innerHeight - y) + 'px';
        clay.style.transform = `rotate(${rotation}deg) scale(${scale})`;

        requestAnimationFrame(animate);
    }

    animate();
}

function shatterClay(clay) {
    const rect = clay.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create 10 shards
    for (let i = 0; i < 10; i++) {
        const shard = document.createElement('div');
        shard.className = 'clay-shard';
        
        const img = document.createElement('img');
        img.src = 'images/clay1.png';
        shard.appendChild(img);
        
        document.body.appendChild(shard);

        // Random direction
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
            shardVelocityY += 5; // Gravity
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

    // Remove original clay
    clay.remove();
}
