const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

// The Data array contains information for each speech box
const data = [
  {
    image: 'playGame.jpg',
    text: "I want to play a game"
  },
  {
    image: 'donate.jpg',
    text: "I want to make a donation"
  },
  {
    image: 'contact.jpg',
    text: "I want to contact the CodFather team"
  },
  {
    image: 'aboutUs.jpg',
    text: 'I want to view the about us page'
  },
  {
    image: 'fishyfig.jpg',
    text: 'I want to play FishyFig'
  },
  {
    image: 'forums.png',
    text: 'I want to access & write forums'
  },
  {
    image: 'services.png',
    text: 'I want to view the services page'
  },
  {
    image: 'marine.webp',
    text: 'I want to learn more about marine pollution'
  },
  
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

// Add some fun text to the buttons and boxes
toggleBtn.innerText = '🔊 Enter Your Own Text !';
closeBtn.innerText = '👋  Bye for now!';

// Animate the buttons
toggleBtn.addEventListener('mouseover', () => {
  toggleBtn.style.animation = 'spin 1s ease-in-out';
});

toggleBtn.addEventListener('mouseout', () => {
  toggleBtn.style.animation = '';
});

readBtn.addEventListener('mouseover', () => {
  readBtn.style.animation = 'pulse 1s ease-in-out infinite';
});

readBtn.addEventListener('mouseout', () => {
  readBtn.style.animation = '';
});

// Animate the speech boxes
const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
  box.addEventListener('mouseover', () => {
    box.style.animation = 'jiggle 1s ease-in-out infinite';
  });

  box.addEventListener('mouseout', () => {
    box.style.animation = '';
  });

});
