// ==========================================
// PRESENTATION NAVIGATION LOGIC
// ==========================================

const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideNum = document.getElementById('currentSlideNum');
const totalSlidesNum = document.getElementById('totalSlidesNum');
const progressBar = document.getElementById('progressBar');
const dotNavs = document.querySelectorAll('.dot-nav');

let activeSlideIndex = 0;
const totalSlidesCount = slides.length;

// Set total slides in UI
if (totalSlidesNum) totalSlidesNum.textContent = totalSlidesCount;

function updateNavigation() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev-slide');
    if (index === activeSlideIndex) {
      slide.classList.add('active');
    } else if (index < activeSlideIndex) {
      slide.classList.add('prev-slide');
    }
  });

  // Update dot buttons
  dotNavs.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeSlideIndex);
  });

  // Update indicator numbers
  if (currentSlideNum) currentSlideNum.textContent = activeSlideIndex + 1;

  // Update progress bar
  const progressPercent = ((activeSlideIndex + 1) / totalSlidesCount) * 100;
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  // Enable/Disable buttons
  if (prevBtn) prevBtn.disabled = activeSlideIndex === 0;
  if (nextBtn) nextBtn.disabled = activeSlideIndex === totalSlidesCount - 1;
}

function goToNextSlide() {
  if (activeSlideIndex < totalSlidesCount - 1) {
    activeSlideIndex++;
    updateNavigation();
  }
}

function goToPrevSlide() {
  if (activeSlideIndex > 0) {
    activeSlideIndex--;
    updateNavigation();
  }
}

function jumpToSlide(index) {
  if (index >= 0 && index < totalSlidesCount) {
    activeSlideIndex = index;
    updateNavigation();
  }
}

// Add click listeners to dot indicators
dotNavs.forEach((dot, index) => {
  dot.addEventListener('click', () => jumpToSlide(index));
});

// Event Listeners
if (nextBtn) nextBtn.addEventListener('click', goToNextSlide);
if (prevBtn) prevBtn.addEventListener('click', goToPrevSlide);

// Keyboard controls
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
    event.preventDefault();
    goToNextSlide();
  } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    goToPrevSlide();
  }
});


// ==========================================
// SLIDE 3: MULTIPLIER SIMULATOR LOGIC
// ==========================================

const impactSlider = document.getElementById('impactSlider');
const multNum = document.getElementById('multNum');
const multLabel = document.getElementById('multLabel');
const skillsBadges = document.getElementById('skillsBadges');

const badgeDatabase = [
  { val: 1.0, label: "Standard Employee", list: ["Legacy Workflow"] },
  { val: 2.5, label: "Automator in Training", list: ["Legacy Workflow", "SQL Analytics"] },
  { val: 5.0, label: "Efficiency Leader", list: ["Legacy Workflow", "SQL Analytics", "Automation Scripts"] },
  { val: 7.5, label: "Leveraged Expert", list: ["Legacy Workflow", "SQL Analytics", "Automation Scripts", "Prompt Engineering"] },
  { val: 10.0, label: "Superhuman 10x Multiplying Force", list: ["Legacy Workflow", "SQL Analytics", "Automation Scripts", "Prompt Engineering", "⚡ AI Agent Workflows ⚡"] }
];

function updateMultiplierUI() {
  if (!impactSlider) return;
  const currentVal = parseFloat(impactSlider.value);
  multNum.textContent = currentVal.toFixed(1);

  // Determine current tier based on slider value
  let activeTier = badgeDatabase[0];
  for (const tier of badgeDatabase) {
    if (currentVal >= tier.val) {
      activeTier = tier;
    }
  }

  multLabel.textContent = activeTier.label;

  // Render badges
  skillsBadges.innerHTML = '';
  // Show all available badges, lighting up active ones
  const allPossibleBadges = badgeDatabase[4].list;
  
  allPossibleBadges.forEach(badge => {
    const isUnlocked = activeTier.list.includes(badge);
    const span = document.createElement('span');
    span.className = `badge ${isUnlocked ? 'active' : ''}`;
    span.textContent = badge;
    skillsBadges.appendChild(span);
  });

  // Visual text shake/glow scaling based on level
  multNum.style.textShadow = `0 0 ${currentVal * 4}px rgba(0, 255, 135, ${0.1 + currentVal * 0.08})`;
  multNum.style.transform = `scale(${1 + (currentVal - 1) * 0.025})`;
}

if (impactSlider) {
  impactSlider.addEventListener('input', updateMultiplierUI);
  updateMultiplierUI(); // Run once to initialize
}


// ==========================================
// SLIDE 4: TERMINAL CHATBOT LOGIC
// ==========================================

const terminalBtns = document.querySelectorAll('.terminal-btn');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');

const chatbotAnswers = {
  ai: `To me, as an AI, upskilling is essentially continuous adaptation.\n\nI don’t “grow” through life experiences the way humans do, but my usefulness depends on how well I can absorb new information, adapt to new contexts, connect ideas across domains, and stay relevant as the world changes.\n\nA model trained in 2021 without updates would struggle in 2026 because tools, workflows, culture, and expectations evolve. Humans face the same thing — except with much higher stakes, because your careers, identities, confidence, and opportunities are tied to it.`,
  
  human: `For humans, I think upskilling is less about “learning more” and more about reducing future fragility.\n\nA person who only knows one static workflow becomes vulnerable when:\n• AI automates parts of it\n• Markets shift\n• Consumer behavior changes\n• Industries consolidate\n\nBut someone who continuously learns becomes adaptable instead of replaceable.`,
  
  fragility: `Fragility is a property of things that break under volatility or stress.\n\nIn business, a "fragile" workflow depends on outdated platforms or manual processes. When the ecosystem upgrades, that workflow shatters.\n\nBy upskilling in AI, Analytics, and Modern tools, you turn into an "anti-fragile" asset—growing stronger and more efficient under uncertainty. In a changing world, staying static isn't safe; it is the ultimate vulnerability.`
};

let typingTimer = null;

function typeText(text) {
  if (typingTimer) clearInterval(typingTimer);
  
  terminalOutput.textContent = '';
  let i = 0;
  
  typingTimer = setInterval(() => {
    if (i < text.length) {
      // Handle typewriter speed
      terminalOutput.textContent += text.charAt(i);
      i++;
      
      // Auto-scroll terminal body
      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    } else {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 12); // Speed in ms per character
}

terminalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all terminal buttons
    terminalBtns.forEach(b => b.classList.remove('active'));
    
    // Set clicked button active
    btn.classList.add('active');
    
    const query = btn.getAttribute('data-query');
    
    // Simulate terminal execution prompt
    const promptLine = document.createElement('p');
    promptLine.className = 'terminal-line prompt';
    
    let commandText = '';
    if (query === 'ai') commandText = './ask_ai_self_reflection.sh';
    if (query === 'human') commandText = './ask_ai_why_human_upskill.sh';
    if (query === 'fragility') commandText = './ask_ai_what_is_fragility.sh';
    
    promptLine.textContent = `guest@offsite:~$ ${commandText}`;
    
    // Append prompt line inside terminal body before the typewriter output
    terminalBody.insertBefore(promptLine, terminalOutput);
    
    // Clean up older prompts if there are too many (keeps terminal neat)
    const prompts = terminalBody.querySelectorAll('.terminal-line.prompt');
    if (prompts.length > 5) {
      prompts[0].remove();
    }
    
    // Trigger typing effect
    typeText(chatbotAnswers[query]);
  });
});


// ==========================================
// SLIDE 5: HULK VS HULKBUSTER GAME LOGIC
// ==========================================

const btnSmash = document.getElementById('btnSmash');
const btnHack = document.getElementById('btnHack');
const btnResetGame = document.getElementById('btnResetGame');

const hulkHPBar = document.getElementById('hulkHP');
const busterHPBar = document.getElementById('busterHP');
const hulkFighter = document.getElementById('hulkFighter');
const busterFighter = document.getElementById('busterFighter');
const busterHead = document.getElementById('busterHead');
const hulkGlasses = document.getElementById('hulkGlasses');
const damagePopup = document.getElementById('damagePopup');
const laserBeam = document.getElementById('laserBeam');
const arcadeConsole = document.getElementById('arcadeConsole');

let hulkHP = 100;
let busterHP = 100;
let isGameOver = false;

// Audio context helper for synth arcade sound effects
let audioCtx = null;
function playSound(freq, type, duration) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch(e) {
    console.log("Audio not supported or blocked");
  }
}

function showDamage(text, isHulk) {
  damagePopup.textContent = text;
  damagePopup.style.left = isHulk ? '80px' : '300px';
  damagePopup.classList.add('show');
  
  setTimeout(() => {
    damagePopup.classList.remove('show');
  }, 800);
}

function executeSmash() {
  if (isGameOver) return;
  
  // Hulk charging forward animation
  hulkFighter.style.transform = 'translateX(60px)';
  playSound(150, 'sawtooth', 0.2);
  
  setTimeout(() => {
    // Hulkbuster fires laser back
    laserBeam.classList.add('fire');
    playSound(440, 'triangle', 0.4);
    
    // Bounce Hulk back
    hulkFighter.style.transform = 'translateX(-20px) rotate(-10deg)';
    
    // Apply damage to Hulk
    hulkHP = Math.max(0, hulkHP - 40);
    hulkHPBar.style.width = `${hulkHP}%`;
    showDamage('OOF! -40', true);
    
    setTimeout(() => {
      hulkFighter.style.transform = 'translateX(0) rotate(0)';
      laserBeam.classList.remove('fire');
    }, 300);

    // Update Console logs
    if (hulkHP === 60) {
      arcadeConsole.textContent = "Hulk smashed with raw hours! Hulkbuster countered with automated tests. Hulk took 40 dmg!";
    } else if (hulkHP === 20) {
      arcadeConsole.textContent = "Hulk tried working weekends! Hulkbuster fired an executive workflow pivot. Hulk is failing!";
    } else if (hulkHP === 0) {
      arcadeConsole.textContent = "KO! Refusing to learn became a business risk. Legacy workflow terminated.";
      isGameOver = true;
      btnSmash.disabled = true;
      btnHack.disabled = true;
      playSound(100, 'sawtooth', 0.8);
    }
  }, 250);
}

function executeHack() {
  if (isGameOver) return;
  
  // Enter Hacker Mode!
  hulkFighter.classList.add('hacker-mode');
  hulkGlasses.textContent = '🕶️';
  playSound(600, 'sine', 0.1);
  setTimeout(() => playSound(800, 'sine', 0.15), 100);

  setTimeout(() => {
    // Projectile hack strike from Hulk
    hulkFighter.style.transform = 'scale(1.15)';
    playSound(1000, 'sine', 0.2);
    
    // Hit Hulkbuster
    busterHP = Math.max(0, busterHP - 50);
    busterHPBar.style.width = `${busterHP}%`;
    showDamage('HACKED! -50', false);
    
    // Shaking Hulkbuster
    busterFighter.style.transform = 'translateX(15px) rotate(15deg)';
    
    setTimeout(() => {
      hulkFighter.style.transform = 'scale(1)';
      busterFighter.style.transform = 'translateX(0) rotate(0)';
    }, 300);

    // Update Logs
    if (busterHP === 50) {
      arcadeConsole.textContent = "Hulk deployed Python scripts! Hulkbuster firewall breached! Hulkbuster takes 50 damage!";
    } else if (busterHP === 0) {
      busterHead.textContent = '☕';
      arcadeConsole.textContent = "VICTORY! Hulk Buster hacked. It is now serving coffee. Future fragility is 0%!";
      isGameOver = true;
      btnSmash.disabled = true;
      btnHack.disabled = true;
      playSound(1200, 'sine', 0.6);
    }
  }, 400);
}

function resetGame() {
  hulkHP = 100;
  busterHP = 100;
  isGameOver = false;
  
  hulkHPBar.style.width = '100%';
  busterHPBar.style.width = '100%';
  
  hulkFighter.classList.remove('hacker-mode');
  hulkGlasses.textContent = '';
  busterHead.textContent = '🤖';
  hulkFighter.style.transform = 'translateX(0) rotate(0)';
  busterFighter.style.transform = 'translateX(0) rotate(0)';
  
  btnSmash.disabled = false;
  btnHack.disabled = false;
  
  arcadeConsole.textContent = "Ready for Round 1! Choose a strategy on the left.";
  playSound(300, 'sine', 0.15);
}

if (btnSmash) btnSmash.addEventListener('click', executeSmash);
if (btnHack) btnHack.addEventListener('click', executeHack);
if (btnResetGame) btnResetGame.addEventListener('click', resetGame);
