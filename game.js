// Cool guy animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('coolGuy').classList.add('rise');
    }, 500);

    // Start typing text after cool guy appears
    setTimeout(() => {
        typeText();
    }, 2500);

    // Start launching clay pigeons after text finishes
    setTimeout(() => {
        launchClayPigeons();
    }, 5500);
});

// Typing effect
function typeText() {
    const text = "SHOOT THE CLAY ANDY'S!";
    const typingElement = document.getElementById('typingText');
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

function launchClay() {
    const clay = document.createElement('div');
    clay.className = 'clay';
    
    const img = document.createElement('img');
    img.src = 'images/clay1.png';
    clay.appendChild(img);
    
    document.getElementById('clayContainer').appendChild(clay);

    // Random starting angle variation (10-30 degrees from bottom left)
    const angleVariation = 15 + Math.random() * 15; // 15-30 degrees
    
    // Starting position (bottom left)
    const startX = -50;
    const startY = window.innerHeight + 50;
    
    // Calculate trajectory
    const horizontalDistance = window.innerWidth + 100;
    const peakHeight = window.innerHeight * 0.3; // Peak at 30% of screen height
    
    clay.style.left = startX + 'px';
    clay.style.bottom = '0px';
    
    let time = 0;
    let rotation = 0;
    let scale = 1;
    let isDestroyed = false;

    // Click handler for shooting
    clay.addEventListener('click', (e) => {
        if (!isDestroyed) {
            e.stopPropagation();
            shatterClay(clay);
            isDestroyed = true;
        }
    });

    // Animation loop
    const duration = 3000; // 3 seconds flight time
    const startTime = Date.now();

    function animate() {
        if (isDestroyed) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) {
            clay.remove();
            return;
        }

        // Parabolic trajectory
        const x = startX + (horizontalDistance * progress);
        const y = startY - (Math.sin(progress * Math.PI) * peakHeight * 2);

        // Size decreases as it goes higher and farther
        scale = 1 - (progress * 0.5); // Shrinks to 50% of original size
        
        // Rotation
        rotation += 3;

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
