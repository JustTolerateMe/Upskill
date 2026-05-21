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

  // Handle Slide 5 Autoplay
  if (activeSlideIndex === 4) {
    startSlide5Autoplay();
  } else {
    stopSlide5Autoplay();
  }
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
const hulkHead = hulkFighter ? hulkFighter.querySelector('.hulk-head') : null;
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
      if (hulkHead) hulkHead.textContent = '💀';
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
  if (hulkHead) hulkHead.textContent = '😎';
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
  if (hulkHead) hulkHead.textContent = '😡';
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


// ==========================================
// SLIDE 5: HABIT LOOP AUTOPLAY LOGIC
// ==========================================

const habitNodes = document.querySelectorAll('.habit-node');
const habitPanelContents = document.querySelectorAll('.habit-panel-content');

let slide5AutoplayTimer = null;
let slide5CurrentHabit = 1;

// Sub-animation states
let sandboxTypewriterInterval = null;
let sandboxTimeouts = [];
let automateProgressInterval = null;
let shareTimeouts = [];
let shadowCycleTimeout = null;

function startSlide5Autoplay() {
  if (slide5AutoplayTimer) return; // Already running
  
  // Start from Habit 1
  slide5CurrentHabit = 1;
  triggerHabitAnimation(1);
  
  slide5AutoplayTimer = setInterval(() => {
    slide5CurrentHabit = (slide5CurrentHabit % 4) + 1;
    triggerHabitAnimation(slide5CurrentHabit);
  }, 8000);
}

function stopSlide5Autoplay() {
  if (slide5AutoplayTimer) {
    clearInterval(slide5AutoplayTimer);
    slide5AutoplayTimer = null;
  }
  
  // Clean up all running sub-animations
  clearAllSubAnimations();
}

function clearAllSubAnimations() {
  // Clear Sandbox typing timeouts
  sandboxTimeouts.forEach(t => clearTimeout(t));
  sandboxTimeouts = [];

  // Clear Sandbox typewriter interval
  if (sandboxTypewriterInterval) {
    clearInterval(sandboxTypewriterInterval);
    sandboxTypewriterInterval = null;
  }
  
  // Clear Automate progress interval
  if (automateProgressInterval) {
    clearInterval(automateProgressInterval);
    automateProgressInterval = null;
  }
  
  // Clear Share timeouts
  shareTimeouts.forEach(t => clearTimeout(t));
  shareTimeouts = [];
  
  // Clear Shadowing timeouts
  if (shadowCycleTimeout) {
    clearTimeout(shadowCycleTimeout);
    shadowCycleTimeout = null;
  }
}

// Bind click listeners to nodes for manual override
habitNodes.forEach(node => {
  node.addEventListener('click', () => {
    const habitId = parseInt(node.getAttribute('data-habit'));
    
    // Jump to clicked habit
    slide5CurrentHabit = habitId;
    triggerHabitAnimation(habitId);
    
    // Reset global autoplay timer
    if (slide5AutoplayTimer) {
      clearInterval(slide5AutoplayTimer);
      slide5AutoplayTimer = setInterval(() => {
        slide5CurrentHabit = (slide5CurrentHabit % 4) + 1;
        triggerHabitAnimation(slide5CurrentHabit);
      }, 8000);
    }
  });
});

function triggerHabitAnimation(habitId) {
  // 1. Highlight current node
  habitNodes.forEach(node => {
    const nodeHabit = parseInt(node.getAttribute('data-habit'));
    node.classList.toggle('active', nodeHabit === habitId);
  });
  
  // 2. Show correct panel
  habitPanelContents.forEach(panel => {
    const panelId = panel.getAttribute('id');
    panel.classList.toggle('active', panelId === `habit-panel-${habitId}`);
  });
  
  // 3. Reset all panels to clean initial state and clear active animations
  clearAllSubAnimations();
  resetPanelVisuals();
  
  // 4. Run the selected animation
  if (habitId === 1) {
    runSandboxAnimation();
  } else if (habitId === 2) {
    runAutomateAnimation();
  } else if (habitId === 3) {
    runShareAnimation();
  } else if (habitId === 4) {
    runShadowAnimation();
  }
}

function resetPanelVisuals() {
  // Habit 1 reset
  const sandboxOutput = document.getElementById('sandboxOutput');
  const sandboxStatus = document.getElementById('sandboxStatusBadge');
  if (sandboxOutput) sandboxOutput.textContent = 'Preparing terminal sandbox environment...';
  if (sandboxStatus) {
    sandboxStatus.textContent = 'BOOTING';
    sandboxStatus.style.background = 'rgba(0, 240, 255, 0.15)';
    sandboxStatus.style.borderColor = 'var(--neon-cyan)';
    sandboxStatus.style.color = 'var(--neon-cyan)';
    sandboxStatus.style.boxShadow = '0 0 8px rgba(0, 240, 255, 0.3)';
  }
  
  // Habit 2 reset
  const customProgressFill = document.getElementById('customProgressFill');
  const weeklyTime = document.getElementById('weeklyTime');
  const automationPct = document.getElementById('automationPct');
  const automationLog = document.getElementById('automationLog');
  if (customProgressFill) customProgressFill.style.width = '0%';
  if (weeklyTime) {
    weeklyTime.textContent = '4.0';
    weeklyTime.className = 'stat-num';
  }
  if (automationPct) automationPct.textContent = '0%';
  if (automationLog) automationLog.textContent = 'Scanning spreadsheet chores...';
  
  // Habit 3 reset
  const chatStream = document.getElementById('chatStream');
  if (chatStream) {
    chatStream.innerHTML = `
      <div class="chat-message system">[Channel: #development-tips]</div>
      <div class="chat-message sent">
        <strong>You:</strong> Hey team! Here is the script to auto-generate weekly sprint summaries using the API: <code>sprint_gen.py</code>.
      </div>
    `;
  }
  
  // Habit 4 reset
  const arrowLtoR = document.getElementById('arrowLtoR');
  const arrowRtoL = document.getElementById('arrowRtoL');
  const shadowingDesc = document.getElementById('shadowingDesc');
  if (arrowLtoR) arrowLtoR.classList.remove('active');
  if (arrowRtoL) arrowRtoL.classList.remove('active');
  if (shadowingDesc) shadowingDesc.textContent = 'Initializing reverse shadowing session...';
}

function typewriterText(element, text, speed, onComplete) {
  element.textContent = '';
  let i = 0;
  sandboxTypewriterInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      if (element.parentElement) {
        element.parentElement.scrollTop = element.parentElement.scrollHeight;
      }
    } else {
      clearInterval(sandboxTypewriterInterval);
      sandboxTypewriterInterval = null;
      if (onComplete) onComplete();
    }
  }, speed);
}

function runSandboxAnimation() {
  const sandboxOutput = document.getElementById('sandboxOutput');
  const sandboxStatus = document.getElementById('sandboxStatusBadge');
  if (!sandboxOutput || !sandboxStatus) return;
  
  const text1 = `[System] Booting LLM environment...\nuser@sandbox:~$ gemini-3.5 --prompt="Analyze spreadsheet anomalies"\n\nGemini: Found 3 spikes in marketing spend. Auto-generated Python script for correction.`;
  const text2 = `\n\nuser@sandbox:~$ python auto_cleanup.py\n[Process] Merging CSV datasets...\n[Success] Reclaimed 1.8 GB disk space. Reclaimed ~40 mins of copy-pasting.`;
  const text3 = `\n\nuser@sandbox:~$ node parse_emails.js --pattern="[a-zA-Z]+@company.com"\n[Regex] Scanning 2,500 database logs...\n[Success] Matched 42 emails in 4ms.`;

  sandboxStatus.textContent = 'AI PROMPT';
  sandboxStatus.style.background = 'rgba(0, 240, 255, 0.15)';
  sandboxStatus.style.borderColor = 'var(--neon-cyan)';
  sandboxStatus.style.color = 'var(--neon-cyan)';
  sandboxStatus.style.boxShadow = '0 0 8px rgba(0, 240, 255, 0.3)';
  playSound(400, 'sine', 0.05);
  typewriterText(sandboxOutput, text1, 6);

  sandboxTimeouts.push(setTimeout(() => {
    sandboxStatus.textContent = 'PYTHON RUNNING';
    sandboxStatus.style.background = 'rgba(255, 153, 0, 0.15)';
    sandboxStatus.style.borderColor = 'var(--neon-orange)';
    sandboxStatus.style.color = 'var(--neon-orange)';
    sandboxStatus.style.boxShadow = '0 0 8px rgba(255, 153, 0, 0.3)';
    playSound(450, 'sine', 0.05);
    
    let i = 0;
    sandboxTypewriterInterval = setInterval(() => {
      if (i < text2.length) {
        sandboxOutput.textContent += text2.charAt(i);
        i++;
        if (sandboxOutput.parentElement) sandboxOutput.parentElement.scrollTop = sandboxOutput.parentElement.scrollHeight;
      } else {
        clearInterval(sandboxTypewriterInterval);
        sandboxTypewriterInterval = null;
      }
    }, 6);
  }, 2600));

  sandboxTimeouts.push(setTimeout(() => {
    sandboxStatus.textContent = 'REGEX COMPILE';
    sandboxStatus.style.background = 'rgba(189, 0, 255, 0.15)';
    sandboxStatus.style.borderColor = 'var(--neon-purple)';
    sandboxStatus.style.color = 'var(--neon-purple)';
    sandboxStatus.style.boxShadow = '0 0 8px rgba(189, 0, 255, 0.3)';
    playSound(500, 'sine', 0.05);
    
    let i = 0;
    sandboxTypewriterInterval = setInterval(() => {
      if (i < text3.length) {
        sandboxOutput.textContent += text3.charAt(i);
        i++;
        if (sandboxOutput.parentElement) sandboxOutput.parentElement.scrollTop = sandboxOutput.parentElement.scrollHeight;
      } else {
        clearInterval(sandboxTypewriterInterval);
        sandboxTypewriterInterval = null;
      }
    }, 6);
  }, 5200));

  sandboxTimeouts.push(setTimeout(() => {
    sandboxStatus.textContent = 'SUCCESS';
    sandboxStatus.style.background = 'rgba(0, 255, 135, 0.15)';
    sandboxStatus.style.borderColor = 'var(--neon-green)';
    sandboxStatus.style.color = 'var(--neon-green)';
    sandboxStatus.style.boxShadow = '0 0 8px rgba(0, 255, 135, 0.3)';
    playSound(550, 'sine', 0.15);
  }, 7200));
}

function runAutomateAnimation() {
  const customProgressFill = document.getElementById('customProgressFill');
  const weeklyTime = document.getElementById('weeklyTime');
  const automationPct = document.getElementById('automationPct');
  const automationLog = document.getElementById('automationLog');
  if (!customProgressFill || !weeklyTime || !automationPct || !automationLog) return;

  const autoLogMessages = [
    "Scanning spreadsheet workflows...",
    "Connecting database sheets to Python parser...",
    "Testing auto-cleaning regex filters...",
    "Refining cron schedules for weekly execution...",
    "Setting script to run autonomously in cloud server!",
    "Deployment complete! Chores automated successfully."
  ];

  let elapsed = 0;
  const duration = 5000; 
  const intervalTime = 50;
  let lastSoundTime = 0;

  automateProgressInterval = setInterval(() => {
    elapsed += intervalTime;
    const progress = Math.min(1.0, elapsed / duration);
    const pct = Math.floor(progress * 95);
    
    customProgressFill.style.width = `${pct}%`;
    automationPct.textContent = `${pct}%`;
    
    const timeReclaimed = (4.0 * (pct / 100)).toFixed(1);
    weeklyTime.textContent = timeReclaimed;
    
    if (pct >= 90) {
      weeklyTime.className = "stat-num text-cyan";
    } else if (pct > 50) {
      weeklyTime.className = "stat-num text-gradient";
    } else {
      weeklyTime.className = "stat-num";
    }

    const logIndex = Math.min(Math.floor(pct / 18), autoLogMessages.length - 1);
    automationLog.textContent = autoLogMessages[logIndex];

    if (elapsed - lastSoundTime >= 200 && pct < 95) {
      playSound(200 + pct * 4, 'sine', 0.04);
      lastSoundTime = elapsed;
    }

    if (progress >= 1.0) {
      clearInterval(automateProgressInterval);
      automateProgressInterval = null;
      playSound(600, 'sine', 0.2);
    }
  }, intervalTime);
}

function runShareAnimation() {
  const chatStream = document.getElementById('chatStream');
  if (!chatStream) return;

  const reply1 = {
    name: "Siddharth (Engineer)",
    msg: "Whoa, this is neat! Can you post a quick link to the repository/script? I want to test it locally.",
    reaction: "🔥"
  };

  const reply2 = {
    name: "Ananya (Design)",
    msg: "Super helpful. This is going to save the marketing team at least 2 hours of report building every Monday. 🙌",
    reaction: "👍"
  };

  shareTimeouts.push(setTimeout(() => {
    const r1Div = document.createElement('div');
    r1Div.className = 'chat-message reply';
    r1Div.innerHTML = `
      <strong>${reply1.name}:</strong> ${reply1.msg}
      <div class="chat-reactions">
        <span class="reaction-tag" id="sidReaction1">${reply1.reaction} <span class="react-count" id="sidCount1">1</span></span>
        <span class="reaction-tag" id="sidReaction2">💡 <span class="react-count" id="sidCount2">1</span></span>
      </div>
    `;
    chatStream.appendChild(r1Div);
    playSound(650, 'triangle', 0.1);
    
    const chatWindow = chatStream.parentElement;
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1200));

  shareTimeouts.push(setTimeout(() => {
    const r1 = document.getElementById('sidReaction1');
    const r2 = document.getElementById('sidReaction2');
    const c1 = document.getElementById('sidCount1');
    const c2 = document.getElementById('sidCount2');
    
    if (c1) c1.textContent = '2';
    if (c2) c2.textContent = '3';
    
    if (r1) { r1.style.transform = 'scale(1.25)'; r1.style.borderColor = 'var(--neon-green)'; }
    if (r2) { r2.style.transform = 'scale(1.25)'; r2.style.borderColor = 'var(--neon-green)'; }
    playSound(800, 'sine', 0.05);
    
    setTimeout(() => {
      if (r1) r1.style.transform = 'scale(1)';
      if (r2) r2.style.transform = 'scale(1)';
    }, 150);
  }, 2400));

  shareTimeouts.push(setTimeout(() => {
    const r2Div = document.createElement('div');
    r2Div.className = 'chat-message reply';
    r2Div.innerHTML = `
      <strong>${reply2.name}:</strong> ${reply2.msg}
      <div class="chat-reactions">
        <span class="reaction-tag" id="anaReaction1">${reply2.reaction} <span class="react-count" id="anaCount1">1</span></span>
        <span class="reaction-tag" id="anaReaction2">❤️ <span class="react-count" id="anaCount2">1</span></span>
      </div>
    `;
    chatStream.appendChild(r2Div);
    playSound(650, 'triangle', 0.1);
    
    const chatWindow = chatStream.parentElement;
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 3800));

  shareTimeouts.push(setTimeout(() => {
    const r1 = document.getElementById('anaReaction1');
    const r2 = document.getElementById('anaReaction2');
    const c1 = document.getElementById('anaCount1');
    const c2 = document.getElementById('anaCount2');
    
    if (c1) c1.textContent = '3';
    if (c2) c2.textContent = '4';
    
    if (r1) { r1.style.transform = 'scale(1.25)'; r1.style.borderColor = 'var(--neon-green)'; }
    if (r2) { r2.style.transform = 'scale(1.25)'; r2.style.borderColor = 'var(--neon-green)'; }
    playSound(800, 'sine', 0.05);
    
    setTimeout(() => {
      if (r1) r1.style.transform = 'scale(1)';
      if (r2) r2.style.transform = 'scale(1)';
    }, 150);
  }, 5000));

  shareTimeouts.push(setTimeout(() => {
    const cSid = document.getElementById('sidCount1');
    const cAna = document.getElementById('anaCount2');
    if (cSid) cSid.textContent = '5';
    if (cAna) cAna.textContent = '8';
    
    const rSid = document.getElementById('sidReaction1');
    const rAna = document.getElementById('anaReaction2');
    
    if (rSid) { rSid.style.transform = 'scale(1.3)'; rSid.style.borderColor = 'var(--neon-green)'; }
    if (rAna) { rAna.style.transform = 'scale(1.3)'; rAna.style.borderColor = 'var(--neon-green)'; }
    playSound(850, 'sine', 0.05);
    
    setTimeout(() => {
      if (rSid) rSid.style.transform = 'scale(1)';
      if (rAna) rAna.style.transform = 'scale(1)';
    }, 150);
  }, 6400));
}

function runShadowAnimation() {
  const arrowLtoR = document.getElementById('arrowLtoR');
  const arrowRtoL = document.getElementById('arrowRtoL');
  const shadowingDesc = document.getElementById('shadowingDesc');
  if (!arrowLtoR || !arrowRtoL || !shadowingDesc) return;

  const juniorAvatar = document.querySelector('.member.junior .avatar');
  const seniorAvatar = document.querySelector('.member.senior .avatar');

  const textJuniorToSenior = `<strong>Junior ➔ Senior Exchange:</strong> The junior employee showcases developer tools, AI prompt-chaining, or custom shortcuts. The senior leader discovers new workflows without getting bogged down.`;
  const textSeniorToJunior = `<strong>Senior ➔ Junior Exchange:</strong> The senior leader shares product context, market history, and strategic vision. The junior engineer aligns their code directly with business impact.`;

  arrowLtoR.classList.add('active');
  arrowRtoL.classList.remove('active');
  if (juniorAvatar) juniorAvatar.style.transform = 'scale(1.2)';
  if (seniorAvatar) seniorAvatar.style.transform = 'scale(1)';
  shadowingDesc.innerHTML = textJuniorToSenior;
  playSound(450, 'sine', 0.05);

  shadowCycleTimeout = setTimeout(() => {
    arrowLtoR.classList.remove('active');
    arrowRtoL.classList.add('active');
    if (juniorAvatar) juniorAvatar.style.transform = 'scale(1)';
    if (seniorAvatar) seniorAvatar.style.transform = 'scale(1.2)';
    shadowingDesc.innerHTML = textSeniorToJunior;
    playSound(480, 'sine', 0.05);
  }, 4000);
}


// ==========================================
// SLIDE 7: CODENAMES GAME LOGIC
// ==========================================

function initCodenames() {
  const redWords = [
    "BULLSEYE", "REDCARD", "SHIPT", "ROUNDEL", "ENDCAP",
    "REGISTRY", "DRIVEUP", "GOOD & GATHER", "EVERSPRING", "EXPECT MORE"
  ];
  
  const greenWords = [
    "TARGET CIRCLE", "CARTWHEEL", "CLEARANCE", "COLLAB", "EXCLUSIVE",
    "PICKUP", "ALL IN MOTION", "THRESHOLD", "CASALUNA", "PAY LESS"
  ];
  
  const neutralWords = [
    "OPTICAL", "CLOUD ISLAND", "CAT & JACK", "PRICE MATCH"
  ];
  
  const assassinWords = ["STORE"];
  
  const gridContainer = document.getElementById('codenamesGrid');
  const redCountEl = document.getElementById('redCount');
  const greenCountEl = document.getElementById('greenCount');
  const btnReset = document.getElementById('btnResetCodenames');
  const overlay = document.getElementById('codenamesOverlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayMessage = document.getElementById('overlayMessage');
  const btnOverlayReset = document.getElementById('btnOverlayReset');
  
  if (!gridContainer) return;

  let boardCards = [];
  let redRemaining = 10;
  let greenRemaining = 10;
  let isCodenamesGameOver = false;

  function buildBoard() {
    boardCards = [];
    
    // Create card objects
    redWords.forEach(word => boardCards.push({ word, type: 'red', revealed: false }));
    greenWords.forEach(word => boardCards.push({ word, type: 'green', revealed: false }));
    neutralWords.forEach(word => boardCards.push({ word, type: 'neutral', revealed: false }));
    assassinWords.forEach(word => boardCards.push({ word, type: 'assassin', revealed: false }));
    
    // Shuffle using Fisher-Yates
    for (let i = boardCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boardCards[i], boardCards[j]] = [boardCards[j], boardCards[i]];
    }

    redRemaining = 10;
    greenRemaining = 10;
    isCodenamesGameOver = false;
    
    if (redCountEl) redCountEl.textContent = redRemaining;
    if (greenCountEl) greenCountEl.textContent = greenRemaining;
    
    if (overlay) overlay.className = 'codenames-overlay';
    
    renderBoard();
    
    // Play start chime
    playSound(400, 'sine', 0.1);
    setTimeout(() => playSound(500, 'sine', 0.1), 80);
    setTimeout(() => playSound(600, 'sine', 0.15), 160);
  }

  function renderBoard() {
    gridContainer.innerHTML = '';
    
    boardCards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'codename-card hidden';
      cardEl.textContent = card.word;
      
      // Store type class (red/green/neutral/assassin)
      cardEl.classList.add(card.type);
      
      cardEl.addEventListener('click', () => revealCard(index, cardEl));
      gridContainer.appendChild(cardEl);
    });
  }

  function revealCard(index, cardEl) {
    if (isCodenamesGameOver) return;
    
    const card = boardCards[index];
    if (card.revealed) return;
    
    card.revealed = true;
    cardEl.classList.remove('hidden');
    cardEl.classList.add('revealed');
    
    if (card.type === 'red') {
      redRemaining = Math.max(0, redRemaining - 1);
      if (redCountEl) redCountEl.textContent = redRemaining;
      
      // Team click sound
      playSound(600, 'sine', 0.08);
      setTimeout(() => playSound(750, 'sine', 0.12), 80);
      
      checkVictory();
    } else if (card.type === 'green') {
      greenRemaining = Math.max(0, greenRemaining - 1);
      if (greenCountEl) greenCountEl.textContent = greenRemaining;
      
      // Team click sound
      playSound(600, 'sine', 0.08);
      setTimeout(() => playSound(750, 'sine', 0.12), 80);
      
      checkVictory();
    } else if (card.type === 'neutral') {
      // Neutral click sound
      playSound(450, 'sine', 0.1);
    } else if (card.type === 'assassin') {
      // Assassin buzz sound
      playSound(150, 'sawtooth', 0.6);
      setTimeout(() => playSound(100, 'sawtooth', 0.7), 200);
      
      triggerGameOver(false);
    }
  }

  function checkVictory() {
    if (redRemaining === 0) {
      triggerGameOver(true, 'red');
    } else if (greenRemaining === 0) {
      triggerGameOver(true, 'green');
    }
  }

  function triggerGameOver(isWin, winner) {
    isCodenamesGameOver = true;
    
    if (isWin) {
      if (overlay) {
        overlay.className = 'codenames-overlay show victory';
        if (overlayTitle) {
          overlayTitle.textContent = `${winner.toUpperCase()} TEAM WINS!`;
        }
        if (overlayMessage) {
          overlayMessage.textContent = `All objectives secured! Well played, operatives.`;
        }
      }
      
      // Victory Fanfare sound
      playSound(523.25, 'sine', 0.15); // C5
      setTimeout(() => playSound(659.25, 'sine', 0.15), 150); // E5
      setTimeout(() => playSound(783.99, 'sine', 0.15), 300); // G5
      setTimeout(() => playSound(1046.50, 'sine', 0.45), 450); // C6
    } else {
      if (overlay) {
        overlay.className = 'codenames-overlay show';
        if (overlayTitle) {
          overlayTitle.textContent = 'GAME OVER';
        }
        if (overlayMessage) {
          overlayMessage.textContent = 'Store infiltrated! Operatives compromised.';
        }
      }
    }
  }

  if (btnReset) btnReset.addEventListener('click', buildBoard);
  if (btnOverlayReset) btnOverlayReset.addEventListener('click', buildBoard);

  // Initialize
  buildBoard();
}

initCodenames();

// ==========================================
// BACKGROUND FLOATING PARTICLES GENERATOR
// ==========================================

function initBackgroundParticles() {
  const bgWrapper = document.querySelector('.background-wrapper') || document.body;

  // Create Scrolling Tech Grid Background Overlay
  const gridOverlay = document.createElement('div');
  gridOverlay.className = 'bg-grid-overlay';
  bgWrapper.appendChild(gridOverlay);

  // Create Particles Container
  const container = document.createElement('div');
  container.className = 'bg-particles-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.overflow = 'hidden';
  container.style.zIndex = '1'; // Behind presentation-container (z-index: 10), but in front of glow-orbs (z-index: 0)
  container.style.pointerEvents = 'none';
  bgWrapper.appendChild(container);

  const particleCount = 60; // Beautiful starry dust density

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
    
    // Random sizes (2px to 6px)
    const size = 2 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    
    // Random positions
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    
    // Random delays and durations
    const delay = Math.random() * -30;
    const duration = 15 + Math.random() * 20; // 15s to 35s
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Choose random theme color glow (green, cyan, purple)
    const colorType = Math.floor(Math.random() * 3);
    let color = '';
    if (colorType === 0) {
      color = 'var(--neon-green)';
      particle.style.boxShadow = '0 0 8px var(--neon-green), 0 0 16px var(--neon-green)';
    } else if (colorType === 1) {
      color = 'var(--neon-cyan)';
      particle.style.boxShadow = '0 0 8px var(--neon-cyan), 0 0 16px var(--neon-cyan)';
    } else {
      color = 'var(--neon-purple)';
      particle.style.boxShadow = '0 0 8px var(--neon-purple), 0 0 16px var(--neon-purple)';
    }
    particle.style.backgroundColor = color;
    
    container.appendChild(particle);
  }
}

initBackgroundParticles();

