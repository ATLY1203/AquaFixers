import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithCustomToken, signInAnonymously, browserLocalPersistence, browserSessionPersistence, setPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Global variables for the app and Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyAf-B6G07KXX5jn9A5TTBc_Wvukx4EGkOM",
  authDomain: "aquafixers-96f89.firebaseapp.com",
  projectId: "aquafixers-96f89",
  storageBucket: "aquafixers-96f89.firebasestorage.app",
  messagingSenderId: "463385848230",
  appId: "1:463385848230:web:6fe19a857fa67764d54767",
  measurementId: "G-0PX1043T8X"
};

const appId = 'c_c8b098002f92001e_aquafixers-weather-app-687';
const SELANGAU_LAT = 2.9221;
const SELANGAU_LON = 112.1897;

const API_BASE_URL = 'http://localhost:3000/api';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const authSection = document.getElementById('auth-section');
const mainContentSection = document.getElementById('main-content-section');
const weatherSection = document.getElementById('weather-section');
const historySection = document.getElementById('history-section');
const profileSection = document.getElementById('profile-section');
const cameraSensorSection = document.getElementById('camera-sensor-section');
const rainwaterLevel = document.getElementById('rainwater-level');
const riverWaterLevel = document.getElementById('river-water-level');

const welcomeMessage = document.getElementById('welcome-message');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const rememberMeCheckbox = document.getElementById('remember-me-checkbox');
const rememberMeLabel = document.getElementById('remember-me-label');
const signInButton = document.getElementById('sign-in-button');
const createAccountLink = document.getElementById('create-account-link');
const createAccountText = document.getElementById('create-account-text');
const authErrorMessage = document.getElementById('auth-error-message');

const currentWeatherTab = document.getElementById('current-weather-tab');
const historyTrendsTab = document.getElementById('history-trends-tab');
const cameraSensorTab = document.getElementById('camera-sensor-tab');

const weatherForecastTitle = document.getElementById('weather-forecast-title');
const locationName = document.getElementById('location-name');
const weatherPercentage = document.getElementById('weather-percentage');
const currentTimeEl = document.getElementById('current-time');
const currentConditionsEl = document.getElementById('current-conditions');
const currentHumidityEl = document.getElementById('current-humidity');
const currentWindEl = document.getElementById('current-wind');
const humidityText = document.getElementById('humidity-text');
const windText = document.getElementById('wind-text');
const weatherDisplay = document.getElementById('weather-display');
const dailyForecastContainer = document.getElementById('daily-forecast');
     const weatherLoadingSpinner = document.getElementById('weather-loading-spinner');
 const initialMessage = document.getElementById('initial-message');
 const refreshWeatherBtn = document.getElementById('refresh-weather-btn');

 // Current Weather Banner Elements
const historyTrendsTitle = document.getElementById('history-trends-title');
const historyChartContainer = document.getElementById('history-chart-container');
const historyLoadingSpinner = document.getElementById('history-loading-spinner');
const historyChartCanvas = document.getElementById('historyChart');

const profileMenuContainer = document.getElementById('profile-menu-container');
const profileDropdown = document.getElementById('profile-dropdown');
const profileLink = document.getElementById('profile-link');
const profileText = document.getElementById('profile-text');
const languageLink = document.getElementById('language-link');
const languageText = document.getElementById('language-text');
const dropdownSignOutButton = document.getElementById('dropdown-sign-out-button');
const signOutText = document.getElementById('sign-out-text');

const profileTitle = document.getElementById('profile-title');
const profilePictureContainer = document.getElementById('profile-picture-container');
const profilePicture = document.getElementById('profile-picture');
const profilePictureIcon = document.getElementById('profile-picture-icon');
const mainProfilePicture = document.getElementById('main-profile-picture');
const profilePictureInput = document.getElementById('profile-picture-input');
const profilePictureNote = document.getElementById('profile-picture-note');
const profileNameLabel = document.getElementById('profile-name-label');
const profileNameInput = document.getElementById('profile-name-input');
const profileEmailLabel = document.getElementById('profile-email-label');
const profileEmailInput = document.getElementById('profile-email-input');
const profilePhoneLabel = document.getElementById('profile-phone-label');
const profilePhoneInput = document.getElementById('profile-phone-input');
const saveChangesButton = document.getElementById('save-changes-button');
const backButton = document.getElementById('back-button');
const profileMessage = document.getElementById('profile-message');

const languageModal = document.getElementById('language-modal');
const languageModalClose = document.querySelector('#language-modal .modal-close');
const languageModalTitle = document.getElementById('language-modal-title');
const messageModal = document.getElementById('message-modal');
const messageModalClose = document.getElementById('message-modal-close');
const messageModalTitle = document.getElementById('message-modal-title');
const messageModalText = document.getElementById('message-modal-text');
const messageModalOkButton = document.getElementById('message-modal-ok-button');
const globalNotifier = document.getElementById('global-notifier');

// AI Rain Probability Elements
const calculateRainProbabilityBtn = document.getElementById('calculate-rain-probability');
const rainProbabilityResult = document.getElementById('rain-probability-result');
const rainProbabilityLoading = document.getElementById('rain-probability-loading');
const rainProbabilityPercentage = document.getElementById('rain-probability-percentage');
const rainProbabilityDescription = document.getElementById('rain-probability-description');
const rainProbabilityBar = document.getElementById('rain-probability-bar');
const aiReasoning = document.getElementById('ai-reasoning');
const aiRainTitle = document.getElementById('ai-rain-title');
const calculateButtonText = document.getElementById('calculate-button-text');

// AI Weather Suggestions Elements
const getAiSuggestionsBtn = document.getElementById('get-ai-suggestions');
const aiSuggestionsResult = document.getElementById('ai-suggestions-result');
const aiSuggestionsLoading = document.getElementById('ai-suggestions-loading');
const suggestionIcon = document.getElementById('suggestion-icon');
const aiSuggestionText = document.getElementById('ai-suggestion-text');
const suggestionsProgressBar = document.getElementById('suggestions-progress-bar');
const aiSuggestionsTitle = document.getElementById('ai-suggestions-title');
const suggestionsButtonText = document.getElementById('suggestions-button-text');

// AquaBot Chat Elements
const aquabotWidget = document.getElementById('aquabot-widget');
const aquabotToggle = document.getElementById('aquabot-toggle');
const aquabotChat = document.getElementById('aquabot-chat');
const aquabotClose = document.getElementById('aquabot-close');
const aquabotMessages = document.getElementById('aquabot-messages');
const aquabotInput = document.getElementById('aquabot-input');
const aquabotSend = document.getElementById('aquabot-send');

// State and language variables
const localStorageEmailKey = 'aqua-email-remember';
let isCreatingAccount = false;
let historyChartInstance = null;
const translations = {
    'en': {
        welcomeMessage: "Welcome to AquaFixers",
        signInButton: "Sign In",
        createAccountText: "Don't have an account?",
        createAccountLink: "Create one",
        currentWeatherTab: "Current Weather",
        historyTrendsTab: "History & Trends",
        weatherForecastTitle: "Current Weather",
        humidityText: "Humidity",
        windText: "Wind",
        profileText: "Profile",
        languageText: "Language",
        signOutText: "Sign Out",
        initialMessage: "Loading weather data...",
        profileTitle: "Your Profile",
        profilePictureNote: "Click the camera icon to upload a profile picture",
        profileNameLabel: "Name",
        profileEmailLabel: "Email (Read-only)",
        profilePhoneLabel: "Phone",
        saveChangesButton: "Save Changes",
        backButton: "Back",
        languageModalTitle: "Select Language",
        authErrorMessage: "Sign in failed. Please check your email and password.",
        profileUpdateMessage: "Profile updated successfully!",
        historyTrendsTitle: "Weather History & Trends",
        historyLoadingMessage: "Generating historical data...",
        temperatureLabel: "Temperature (°C)",
        rainLabel: "Rain Levels (mm)",
        aiRainTitle: "AI Rain Prediction",
        calculateButtonText: "Calculate",
        aiAnalyzing: "AI is analyzing weather patterns...",
        rainProbabilityHigh: "High chance of rain",
        rainProbabilityMedium: "Moderate chance of rain",
        rainProbabilityLow: "Low chance of rain",
        rainProbabilityVeryLow: "Very low chance of rain",
        aiSuggestionsTitle: "AI Lifestyle Tips",
        suggestionsButtonText: "Get Tips",
        aiGeneratingTips: "AI is generating personalized tips...",
        aquabotWelcome: "Hi! I'm AquaBot, your weather assistant. Ask me anything about the weather or daily activities!",
        aquabotPlaceholder: "Ask about weather...",
        aquabotTyping: "AquaBot is thinking...",
    },
    'ms': {
        welcomeMessage: "Selamat Datang ke AquaFixers",
        signInButton: "Log Masuk",
        createAccountText: "Tiada akaun?",
        createAccountLink: "Daftar sekarang",
        currentWeatherTab: "Cuaca Semasa",
        historyTrendsTab: "Sejarah & Tren",
        weatherForecastTitle: "Cuaca Semasa",
        humidityText: "Kelembapan",
        windText: "Angin",
        profileText: "Profil",
        languageText: "Bahasa",
        signOutText: "Log Keluar",
        initialMessage: "Memuatkan data cuaca...",
        profileTitle: "Profil Anda",
        profilePictureNote: "Klik ikon kamera untuk memuat naik gambar profil",
        profileNameLabel: "Nama",
        profileEmailLabel: "E-mel (Baca-sahaja)",
        profilePhoneLabel: "Telefon",
        saveChangesButton: "Simpan Perubahan",
        backButton: "Kembali",
        languageModalTitle: "Pilih Bahasa",
        authErrorMessage: "Log masuk gagal. Sila semak e-mel dan kata laluan anda.",
        profileUpdateMessage: "Profil berjaya dikemas kini!",
        historyTrendsTitle: "Sejarah & Tren Cuaca",
        historyLoadingMessage: "Menjana data sejarah...",
        temperatureLabel: "Suhu (°C)",
        rainLabel: "Paras Hujan (mm)",
        aiRainTitle: "Ramalan Hujan AI",
        calculateButtonText: "Kira",
        aiAnalyzing: "AI sedang menganalisis corak cuaca...",
        rainProbabilityHigh: "Kemungkinan hujan tinggi",
        rainProbabilityMedium: "Kemungkinan hujan sederhana",
        rainProbabilityLow: "Kemungkinan hujan rendah",
        rainProbabilityVeryLow: "Kemungkinan hujan sangat rendah",
        aiSuggestionsTitle: "Petua Gaya Hidup AI",
        suggestionsButtonText: "Dapatkan Petua",
        aiGeneratingTips: "AI sedang menjana petua peribadi...",
        aquabotWelcome: "Hai! Saya AquaBot, pembantu cuaca anda. Tanya saya apa-apa tentang cuaca atau aktiviti harian!",
        aquabotPlaceholder: "Tanya tentang cuaca...",
        aquabotTyping: "AquaBot sedang berfikir...",
    },
    'zh': {
        welcomeMessage: "欢迎来到 AquaFixers",
        signInButton: "登录",
        createAccountText: "没有账户?",
        createAccountLink: "创建账户",
        currentWeatherTab: "当前天气",
        historyTrendsTab: "历史与趋势",
        weatherForecastTitle: "当前天气",
        humidityText: "湿度",
        windText: "风速",
        profileText: "个人资料",
        languageText: "语言",
        signOutText: "登出",
        initialMessage: "正在加载天气数据...",
        profileTitle: "您的个人资料",
        profilePictureNote: "点击相机图标上传个人资料图片",
        profileNameLabel: "姓名",
        profileEmailLabel: "电子邮件 (只读)",
        profilePhoneLabel: "电话",
        saveChangesButton: "保存更改",
        backButton: "返回",
        languageModalTitle: "选择语言",
        authErrorMessage: "登录失败。请检查您的电子邮件和密码。",
        profileUpdateMessage: "个人资料更新成功！",
        historyTrendsTitle: "天气历史与趋势",
        historyLoadingMessage: "正在生成历史数据...",
        temperatureLabel: "温度 (°C)",
        rainLabel: "降雨量 (mm)",
        aiRainTitle: "AI 降雨预测",
        calculateButtonText: "计算",
        aiAnalyzing: "AI 正在分析天气模式...",
        rainProbabilityHigh: "降雨概率高",
        rainProbabilityMedium: "降雨概率中等",
        rainProbabilityLow: "降雨概率低",
        rainProbabilityVeryLow: "降雨概率很低",
        aiSuggestionsTitle: "AI 生活建议",
        suggestionsButtonText: "获取建议",
        aiGeneratingTips: "AI 正在生成个性化建议...",
        aquabotWelcome: "你好！我是AquaBot，你的天气助手。问我任何关于天气或日常活动的问题！",
        aquabotPlaceholder: "询问天气...",
        aquabotTyping: "AquaBot正在思考...",
    }
};
let currentLang = 'en';
let timeUpdateInterval;

     // Helper functions
 function addAquaBotMessage(message, isUser = false) {
     const messageDiv = document.createElement('div');
     messageDiv.className = `flex items-start space-x-2 aquabot-message ${isUser ? 'justify-end' : ''}`;

     if (isUser) {
         messageDiv.innerHTML = `
             <div class="bg-blue-500 rounded-lg p-3 max-w-xs">
                 <p class="text-sm text-white">${message}</p>
             </div>
             <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                 U
             </div>
         `;
     } else {
         messageDiv.innerHTML = `
             <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                 A
             </div>
             <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                 <p class="text-sm text-gray-800">${message}</p>
             </div>
         `;
     }

     aquabotMessages.appendChild(messageDiv);
     aquabotMessages.scrollTop = aquabotMessages.scrollHeight;
 }

 function showAquaBotTyping() {
     const typingDiv = document.createElement('div');
     typingDiv.className = 'flex items-start space-x-2 aquabot-message';
     typingDiv.id = 'aquabot-typing-indicator';
     typingDiv.innerHTML = `
         <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
             A
         </div>
         <div class="bg-gray-100 rounded-lg p-3">
             <div class="aquabot-typing">
                 <span></span>
                 <span></span>
                 <span></span>
             </div>
         </div>
     `;

     aquabotMessages.appendChild(typingDiv);
     aquabotMessages.scrollTop = aquabotMessages.scrollHeight;
 }

 function hideAquaBotTyping() {
     const typingIndicator = document.getElementById('aquabot-typing-indicator');
     if (typingIndicator) {
         typingIndicator.remove();
     }
 }

 function getCurrentWeatherData() {
     // Get current weather data from the UI
     const currentTemp = parseFloat(weatherPercentage.textContent.replace('°C', ''));
     const currentHumidity = parseFloat(currentHumidityEl.textContent.replace('%', ''));
     const currentWind = parseFloat(currentWindEl.textContent.replace(' km/h', ''));
     const currentCondition = currentConditionsEl.textContent;

     // Get forecast data (simplified for now)
     const forecast = [];
     if (dailyForecastContainer.children.length > 0) {
         // Extract data from the daily forecast display
         const forecastItems = dailyForecastContainer.children;
         for (let i = 0; i < Math.min(forecastItems.length, 5); i++) {
             const item = forecastItems[i];
             const tempText = item.querySelector('p:last-child').textContent;
             const temp = parseFloat(tempText.replace('°C', ''));

             forecast.push({
                 temp: temp,
                 condition: 'Partly Cloudy', // Default condition
                 rainChance: Math.random() * 30 // Simulated rain chance
             });
         }
     }

     return {
         current: {
             temp: currentTemp,
             humidity: currentHumidity,
             condition: currentCondition,
             wind: currentWind
         },
         forecast: forecast
     };
 }

 function translateUI() {
    const t = translations[currentLang];

    // Update AquaBot elements
    const welcomeMessage = aquabotMessages.querySelector('.bg-gray-100 p');
    if (welcomeMessage) {
        welcomeMessage.textContent = t.aquabotWelcome;
    }
    aquabotInput.placeholder = t.aquabotPlaceholder;

    welcomeMessage.textContent = t.welcomeMessage;
    signInButton.textContent = t.signInButton;
    createAccountText.textContent = t.createAccountText;
    createAccountLink.textContent = t.createAccountLink;
    rememberMeLabel.textContent = "Remember Me"; // Statically keep this in English for simplicity
    currentWeatherTab.textContent = t.currentWeatherTab;
    historyTrendsTab.textContent = t.historyTrendsTab;
    weatherForecastTitle.textContent = t.weatherForecastTitle;
    humidityText.textContent = t.humidityText;
    windText.textContent = t.windText;
    profileText.textContent = t.profileText;
    languageText.textContent = t.languageText;
    signOutText.textContent = t.signOutText;
    initialMessage.textContent = t.initialMessage;
    historyTrendsTitle.textContent = t.historyTrendsTitle;
    profileTitle.textContent = t.profileTitle;
    profilePictureNote.textContent = t.profilePictureNote;
    profileNameLabel.textContent = t.profileNameLabel;
    profileEmailLabel.textContent = t.profileEmailLabel;
    profilePhoneLabel.textContent = t.profilePhoneLabel;
    saveChangesButton.textContent = t.saveChangesButton;
    backButton.textContent = t.backButton;
    languageModalTitle.textContent = t.languageModalTitle;
    authErrorMessage.textContent = t.authErrorMessage;

    // Update AI rain probability elements
    aiRainTitle.textContent = t.aiRainTitle;
    calculateButtonText.textContent = t.calculateButtonText;

    // Update AI suggestions elements
    aiSuggestionsTitle.textContent = t.aiSuggestionsTitle;
    suggestionsButtonText.textContent = t.suggestionsButtonText;
}

     function showAuthSection() {
     authSection.classList.remove('hidden');
     mainContentSection.classList.add('hidden');
     profileSection.classList.add('hidden');
     profileDropdown.classList.add('hidden');
     // Hide AquaBot when not signed in
     aquabotWidget.classList.add('hidden');
     isCreatingAccount = false;
     signInButton.textContent = translations[currentLang].signInButton;
     createAccountLink.textContent = translations[currentLang].createAccountLink;
     authErrorMessage.classList.add('hidden');
     // Stop the time update interval if we're not on the main page
     if (timeUpdateInterval) {
         clearInterval(timeUpdateInterval);
     }
 }

     function showMainContentSection() {
     authSection.classList.add('hidden');
     profileSection.classList.add('hidden');
     mainContentSection.classList.remove('hidden');
     profileDropdown.classList.add('hidden');
     // Show AquaBot when user is signed in
     aquabotWidget.classList.remove('hidden');
     // Start the time update interval when on the main page
     updateCurrentTime();
     timeUpdateInterval = setInterval(updateCurrentTime, 60000); // Update every minute
 }

function showWeatherSection() {
    weatherSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    cameraSensorSection.classList.add('hidden');
    currentWeatherTab.classList.add('active');
    historyTrendsTab.classList.remove('active');
    cameraSensorTab.classList.remove('active');
}

function showHistorySection() {
    weatherSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    cameraSensorSection.classList.add('hidden');
    currentWeatherTab.classList.remove('active');
    historyTrendsTab.classList.add('active');
    cameraSensorTab.classList.remove('active');
    renderHistoryChart();
}

function showCameraSensorSection() {
    weatherSection.classList.add('hidden');
    historySection.classList.add('hidden');
    cameraSensorSection.classList.remove('hidden');
    currentWeatherTab.classList.remove('active');
    historyTrendsTab.classList.remove('active');
    cameraSensorTab.classList.add('active');
}

function showProfileSection() {
    authSection.classList.add('hidden');
    mainContentSection.classList.add('hidden');
    profileSection.classList.remove('hidden');
    cameraSensorSection.classList.add('hidden');
    profileDropdown.classList.add('hidden');
    if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
    }

    // Load saved profile picture if exists
    const savedPicture = localStorage.getItem('aquafixers-profile-picture');
    if (savedPicture) {
        profilePicture.src = savedPicture;
        profilePicture.classList.remove('hidden');
        profilePictureIcon.classList.add('hidden');
    } else {
        profilePicture.classList.add('hidden');
        profilePictureIcon.classList.remove('hidden');
    }
}

function showModal(modalElement) {
    modalElement.style.display = 'flex';
}

function hideModal(modalElement) {
    modalElement.style.display = 'none';
}

// New helper functions for progress bar and notifier




function showNotifier(message, type) {
    globalNotifier.textContent = message;
    globalNotifier.classList.remove('hidden');
    globalNotifier.classList.remove('bg-green-500', 'bg-red-500'); // Remove previous type classes

    if (type === 'success') {
        globalNotifier.classList.add('bg-green-500');
    } else if (type === 'error') {
        globalNotifier.classList.add('bg-red-500');
    }

    setTimeout(() => {
        hideNotifier();
    }, 3000); // Hide after 3 seconds
}

function hideNotifier() {
    globalNotifier.classList.add('hidden');
}

function showProgressBar() {
    const progressBar = document.getElementById('global-progress-bar');
    if (progressBar) {
        progressBar.classList.remove('hidden');
        progressBar.style.width = '0%';
        // Animate the progress bar to 50% to indicate loading
        setTimeout(() => {
            progressBar.style.width = '50%';
        }, 100);
    }
}

function hideProgressBar() {
    const progressBar = document.getElementById('global-progress-bar');
    if (progressBar) {
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.classList.add('hidden');
            progressBar.style.width = '0%'; // Reset for next use
        }, 300); // Short delay to allow animation to complete
    }
}

function showMessageModal(title, message) {
    messageModalTitle.textContent = title;
    messageModalText.textContent = message;
    showModal(messageModal);
}

function updateCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTimeEl.textContent = `${hours}:${minutes} ${ampm}`;
}

// AI Rain Probability Calculation Function
function calculateRainProbability(temperature, humidity, windSpeed, pressure, cloudCover) {
    // AI-powered rain probability calculation based on meteorological principles
    // This simulates what an AI model like Gemini or ChatGPT would analyze

    let probability = 0;
    let reasoning = [];

    // Temperature factor (lower temps = higher rain chance)
    let tempFactor = 0;
    if (temperature < 10) {
        tempFactor = 0.3; // Cold air holds less moisture
        reasoning.push("Low temperature increases condensation potential");
    } else if (temperature < 20) {
        tempFactor = 0.2;
        reasoning.push("Moderate temperature supports rain formation");
    } else if (temperature < 30) {
        tempFactor = 0.1;
        reasoning.push("Warm temperature reduces immediate rain chance");
    } else {
        tempFactor = 0.05;
        reasoning.push("High temperature typically reduces rain probability");
    }

    // Humidity factor (higher humidity = higher rain chance)
    let humidityFactor = 0;
    if (humidity > 80) {
        humidityFactor = 0.4;
        reasoning.push("Very high humidity indicates saturated air");
    } else if (humidity > 60) {
        humidityFactor = 0.3;
        reasoning.push("High humidity supports rain formation");
    } else if (humidity > 40) {
        humidityFactor = 0.2;
        reasoning.push("Moderate humidity provides some rain potential");
    } else {
        humidityFactor = 0.1;
        reasoning.push("Low humidity reduces rain probability");
    }

    // Wind speed factor (moderate winds can enhance rain)
    let windFactor = 0;
    if (windSpeed > 20) {
        windFactor = 0.1; // Strong winds can disperse clouds
        reasoning.push("Strong winds may disperse rain clouds");
    } else if (windSpeed > 10) {
        windFactor = 0.2; // Moderate winds enhance rain
        reasoning.push("Moderate winds enhance rain formation");
    } else {
        windFactor = 0.1;
        reasoning.push("Light winds allow stable rain conditions");
    }

    // Pressure factor (lower pressure = higher rain chance)
    let pressureFactor = 0;
    if (pressure < 1013) {
        pressureFactor = 0.2; // Low pressure systems bring rain
        reasoning.push("Low pressure system indicates rain potential");
    } else if (pressure < 1020) {
        pressureFactor = 0.1;
        reasoning.push("Slightly low pressure supports rain");
    } else {
        pressureFactor = 0.05;
        reasoning.push("High pressure typically brings clear weather");
    }

    // Cloud cover factor (estimated from conditions)
    let cloudFactor = 0;
    if (cloudCover > 80) {
        cloudFactor = 0.3;
        reasoning.push("Heavy cloud cover increases rain chance");
    } else if (cloudCover > 50) {
        cloudFactor = 0.2;
        reasoning.push("Moderate cloud cover supports rain");
    } else {
        cloudFactor = 0.1;
        reasoning.push("Clear skies reduce rain probability");
    }

    // Calculate final probability
    probability = (tempFactor + humidityFactor + windFactor + pressureFactor + cloudFactor) * 100;

    // Ensure probability is between 0 and 100
    probability = Math.max(0, Math.min(100, probability));

    // Add some randomness to simulate AI learning patterns
    const randomVariation = (Math.random() - 0.5) * 10;
    probability += randomVariation;
    probability = Math.max(0, Math.min(100, probability));

    // Determine description
    let description = "";
    if (probability >= 70) {
        description = translations[currentLang].rainProbabilityHigh;
    } else if (probability >= 50) {
        description = translations[currentLang].rainProbabilityMedium;
    } else if (probability >= 30) {
        description = translations[currentLang].rainProbabilityLow;
    } else {
        description = translations[currentLang].rainProbabilityVeryLow;
    }

             return {
         probability: Math.round(probability),
         description: description,
         reasoning: reasoning.join(". ") + "."
     };
 }

 // AI Weather-Based Suggestions Function
 function generateWeatherSuggestions(temperature, humidity, condition, windSpeed) {
     // AI-powered lifestyle suggestions based on weather conditions
     // This simulates what an AI model like Gemini or ChatGPT would generate

     let suggestion = "";
     let icon = "";

     // Temperature-based suggestions
     if (temperature > 32) {
         suggestion = "It's quite hot today! Stay hydrated, avoid prolonged outdoor activities, and consider wearing light, breathable clothing.";
         icon = "fas fa-thermometer-half";
     } else if (temperature < 20) {
         suggestion = "It's a bit chilly! Layer up with warm clothing and enjoy the cool weather comfortably.";
         icon = "fas fa-thermometer-empty";
     } else {
         suggestion = "Perfect temperature for outdoor activities! Enjoy the pleasant weather.";
         icon = "fas fa-thermometer-quarter";
     }

     // Condition-based suggestions
     if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) {
         suggestion = "Don't forget your umbrella! It's a good day to stay indoors or wear waterproof gear if you need to go out.";
         icon = "fas fa-umbrella";
     } else if (condition.toLowerCase().includes('thunder') || condition.toLowerCase().includes('storm')) {
         suggestion = "Stormy weather ahead! Stay indoors, secure loose items, and avoid outdoor activities for safety.";
         icon = "fas fa-bolt";
     } else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
         suggestion = "Cloudy skies today. Perfect for a relaxed day or light outdoor activities without the harsh sun.";
         icon = "fas fa-cloud";
     } else if (condition.toLowerCase().includes('clear') || condition.toLowerCase().includes('sunny')) {
         suggestion = "Beautiful clear weather! Great for outdoor activities, but remember sunscreen if spending time in the sun.";
         icon = "fas fa-sun";
     }

     // Wind-based suggestions
     if (windSpeed > 20) {
         suggestion = "It's quite windy! Secure any loose items, be careful with umbrellas, and consider indoor activities.";
         icon = "fas fa-wind";
     } else if (windSpeed > 10) {
         suggestion = "Nice breeze today! Perfect for outdoor activities and keeping cool.";
         icon = "fas fa-wind";
     }

     // Humidity-based suggestions
     if (humidity > 80) {
         suggestion = "High humidity today! Stay hydrated, avoid strenuous outdoor activities, and consider using air conditioning.";
         icon = "fas fa-tint";
     } else if (humidity < 30) {
         suggestion = "Low humidity - your skin might feel dry. Stay hydrated and consider using moisturizer.";
         icon = "fas fa-tint";
     }

     // Multi-factor considerations
     if (temperature > 30 && humidity > 70) {
         suggestion = "Hot and humid conditions! This combination can be challenging. Stay hydrated, take frequent breaks, and avoid peak sun hours.";
         icon = "fas fa-exclamation-triangle";
     } else if (temperature < 15 && windSpeed > 15) {
         suggestion = "Cold and windy! Bundle up with warm, wind-resistant clothing to stay comfortable.";
         icon = "fas fa-thermometer-empty";
     }

     // Add some randomness to simulate AI learning patterns
     const randomVariation = Math.random();
     if (randomVariation > 0.8) {
         suggestion += " Perfect weather for a coffee break!";
     } else if (randomVariation > 0.6) {
         suggestion += " Great day to plan some outdoor fun!";
     }

     return {
         suggestion: suggestion,
         icon: icon
     };
 }



// AquaBot AI Function using Google Gemini API
async function aquaBotResponse(userQuestion, weatherData) {
    try {
        // Prepare weather data for Gemini
        const weatherContext = {
            current: {
                temperature: weatherData.current.temp,
                condition: weatherData.current.condition,
                humidity: weatherData.current.humidity,
                windSpeed: weatherData.current.wind
            },
            forecast: weatherData.forecast || []
        };

        // Create the prompt for Gemini
        const prompt = `You are AquaBot, a friendly chatbot assistant in a weather app.

            You will receive:
            * User's question: " ${JSON.stringify(weatherContext, null, 2)} ${userQuestion}"

            * WE ARE A SCHOOL NAME SK NANGA TAJAM IN SELANGAU,SARAWAK,MALAYSIA WHICH RELY ON RAIN WATER FOR OUR DAILY NEEDS. 
            * AS THE STUDENTS AND TEACHERS IN THAT SCHOOL ALWAYS HAVING THE PROBLEM OF KNOWING THE ALREADY HAVE LOW AMOUNT OF THE WATER IN THR RAIN WATER TANK LAST MINUTE.
            * SO, WE INVENTED A SYSTEM.
            * THIS IS THE SYSTEM THAT WE USE
            * 1.Rainwater tank
            -Sensor
            #when detect low water level,opens a hatch and lets riverwater to flow into the wate pipes for usage
            2. River water tank(Always full)(Whenever sensor in Tank 2 senses low water level,it will activate the water pump to start filtration process)
            -Unfiltered tank(Tank 1)
            #Water from river gets pumped into this tank
            #Alum is added and mixed
            #Goes to Tank 2
            -Filtered Tank(Tank 2)
            #Water from Tank 1 goes through a mesh/filter located at the part near the bottom of the tank
            #Sludge/sediment(Dirty stuff) gets filter and clean water goes to the top
            Rules:
            * If not raining → suggest collect river water
            * If raining > probability 60% or above > suggest prepared bucket for collection of rain water
            * IF SENSOR DETECTS LOW WATER LEVEL IN RAINWATER TANK IS LOW, SUGGEST TO OPEN THE PUMP TO COLLECT RIVER WATER INTO TANK 2 TO FILTER BEFORE USE.
            * Keep replies short (1–3 sentences) and conversational.
            * Never invent weather data.
            * Use only the weather information provided above. 
            * If user ask about water level, suggest to check the tank level using the sensor.
            Generate a helpful, friendly response based on the user's question and current weather conditions.`;

        // Call Gemini API
        const response = await fetch(`${API_BASE_URL}/gemini`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract the response text from Gemini
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            return aiResponse.trim();
        } else {
            throw new Error('Invalid response format from Gemini API');
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);

        // Fallback to basic responses if API fails
        return getFallbackResponse(userQuestion, weatherData);
    }
}

     // Fallback response function when Gemini API fails
 function getFallbackResponse(userQuestion, weatherData) {
     const currentTemp = weatherData.current.temp;
     const currentCondition = weatherData.current.condition;
     const currentWind = weatherData.current.wind;

     const question = userQuestion.toLowerCase();

     if (question.includes('tomorrow')) {
         return "I'm having trouble accessing weather forecasts right now. Please check back later for tomorrow's weather!";
     }

     if (question.includes('water') && question.includes('plant')) {
         if (currentCondition.toLowerCase().includes('rain')) {
             return "It's currently raining, so you probably don't need to water your plants today!";
         }
         return "No significant rain is expected today. You should water your plants as usual.";
     }

     if (question.includes('jog') || question.includes('outdoor')) {
         if (currentTemp > 32) {
             return `It's quite hot at ${currentTemp}°C right now. Better to exercise in the early morning or evening when it's cooler.`;
         }
         if (currentWind > 20) {
             return `It's quite windy at ${currentWind} km/h. Consider indoor activities or secure any loose items.`;
         }
         return `The weather looks good for outdoor activities! It's ${currentTemp}°C with ${currentCondition}.`;
     }

     return `The current weather is ${currentTemp}°C with ${currentCondition}. I'm here to help with weather-related questions!`;
 }

 // Get weather emoji based on weather condition
 function getWeatherEmoji(weatherMain) {
     const weatherEmojis = {
         'Clear': '☀️',
         'Clouds': '☁️',
         'Rain': '🌧️',
         'Drizzle': '🌦️',
         'Thunderstorm': '⛈️',
         'Snow': '❄️',
         'Mist': '🌫️',
         'Fog': '🌫️',
         'Haze': '🌫️',
         'Smoke': '🌫️',
         'Dust': '🌫️',
         'Sand': '🌫️',
         'Ash': '🌫️',
         'Squall': '💨',
         'Tornado': '🌪️'
     };
     return weatherEmojis[weatherMain] || '🌤️';
 }

 // Show current weather error
 function showCurrentWeatherError() {

     currentTemperature.textContent = '--°C';
     currentFeelsLike.textContent = 'Feels like --°C';
     currentHighTemp.textContent = '--°C';
     currentLowTemp.textContent = '--°C';
     currentHumidityDisplay.textContent = '--%';
     currentWindDisplay.textContent = '-- km/h';
     currentWeatherDescription.textContent = 'Weather unavailable';
     currentWeatherIcon.textContent = '❌';
 }

async function fetchWeather() {
    weatherLoadingSpinner.classList.remove('hidden');
    initialMessage.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');

    const url = `${API_BASE_URL}/weather?lat=${SELANGAU_LAT}&lon=${SELANGAU_LON}`;

    try {
        console.log("Fetching weather from:", url);
        const response = await fetch(url);
        console.log("Weather API response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Weather API error:", errorText);
            throw new Error(`Weather data fetch failed with status: ${response.status}. ${errorText}`);
        }

        const weatherData = await response.json();
        console.log("Weather data received:", weatherData);

        if (weatherData && weatherData.list && weatherData.list.length > 0) {
            updateWeatherUI(weatherData);
        } else {
            throw new Error("No weather data found in the response");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Show error in the UI instead of modal
        initialMessage.textContent = `Error loading weather: ${error.message}`;
        initialMessage.classList.add('hidden');
        weatherLoadingSpinner.classList.add('hidden');

        // Show a fallback weather display with sample data
        showFallbackWeather();
    } finally {
        weatherLoadingSpinner.classList.add('hidden');
        initialMessage.classList.add('hidden');
    }
 }

 function showFallbackWeather() {
     // Show fallback weather data when API fails
     locationName.textContent = "Selangau, MY";
     currentConditionsEl.textContent = "Partly Cloudy";
     weatherPercentage.textContent = "28°C";
     currentHumidityEl.textContent = "75%";
     currentWindEl.textContent = "12 km/h";

     weatherDisplay.classList.remove('hidden');

     // Add fallback forecast
     dailyForecastContainer.innerHTML = '';
     const fallbackDays = ['Today', 'Mon', 'Tue', 'Wed', 'Thu'];
     const fallbackTemps = [28, 29, 27, 30, 26];

     fallbackDays.forEach((day, index) => {
         const item = document.createElement('div');
         item.className = 'daily-forecast-item text-center flex-shrink-0';
         item.innerHTML = `
             <p class="text-sm font-semibold">${day}</p>
             <i class="fas fa-cloud text-4xl mx-auto text-gray-300"></i>
             <p class="text-xs font-bold">${fallbackTemps[index]}°C</p>
             <p class="text-xs opacity-80">${fallbackTemps[index] - 2}°C</p>
         `;
         dailyForecastContainer.appendChild(item);
     });

     // Show message about fallback data
     const fallbackMsg = document.createElement('div');
     fallbackMsg.className = 'text-center mt-4 p-3 bg-yellow-500 bg-opacity-20 rounded-lg';
     fallbackMsg.innerHTML = '<p class="text-yellow-200 text-sm">⚠️ Showing sample weather data. API connection failed.</p>';
     weatherDisplay.appendChild(fallbackMsg);
 }

function updateWeatherUI(weatherData) {
    if (!weatherData.list || weatherData.list.length === 0) {
        console.error("No weather data found in the response.");
        showMessageModal("Error", "No weather data available for this location.");
        return;
    }

    locationName.textContent = "Selangau, MY";
    const current = weatherData.list[0];

    // The time is now handled by the updateCurrentTime() function.
    // We only use the weather data for the conditions, temp, etc.
    currentConditionsEl.textContent = current.weather[0].description;
    weatherPercentage.textContent = `${Math.round(current.main.temp)}°C`;
    currentHumidityEl.textContent = `${Math.round(current.main.humidity)}%`;

    const windKmH = Math.round(current.wind.speed * 3.6);
    currentWindEl.textContent = `${windKmH} km/h`;

    weatherDisplay.classList.remove('hidden');

    dailyForecastContainer.innerHTML = '';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const uniqueDays = {};

    for (const forecast of weatherData.list) {
        const date = new Date(forecast.dt * 1000);
        const dayIndex = date.getDay();

        if (date.getHours() >= 12 && date.getHours() < 15 && !uniqueDays[dayIndex]) {
            const dayName = Object.keys(uniqueDays).length === 0 ? "Today" : daysOfWeek[dayIndex];

            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            let minTemp = forecast.main.temp_min;
            let maxTemp = forecast.main.temp_max;
            const dailyForecasts = weatherData.list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.getDate() === date.getDate();
            });
            for (const dailyItem of dailyForecasts) {
                if (dailyItem.main.temp_min < minTemp) minTemp = dailyItem.main.temp_min;
                if (dailyItem.main.temp_max > maxTemp) maxTemp = dailyItem.main.temp_max;
            }

            const item = document.createElement('div');
            item.className = 'daily-forecast-item text-center flex-shrink-0';
            item.innerHTML = `
                <p class="text-sm font-semibold">${dayName}</p>
                <img src="${iconUrl}" alt="${forecast.weather[0].description}" class="w-12 h-12 mx-auto">
                <p class="text-xs font-bold">${Math.round(maxTemp)}°C</p>
                <p class="text-xs opacity-80">${Math.round(minTemp)}°C</p>
            `;
            dailyForecastContainer.appendChild(item);
            uniqueDays[dayIndex] = true;
        }
    }
}

function generateSimulatedData() {
    const today = new Date();
    const data = {
        labels: [],
        temperatures: [],
        rainLevels: []
    };
    const baseTemp = 28;
    const tempVariation = 3;
    const baseRain = 5;
    const rainVariation = 15;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dayName = daysOfWeek[date.getDay()];
        data.labels.push(dayName);
        data.temperatures.push(parseFloat((baseTemp + (Math.random() * tempVariation * 2) - tempVariation).toFixed(1)));
        data.rainLevels.push(parseFloat(Math.max(0, baseRain + (Math.random() * rainVariation * 2) - rainVariation).toFixed(1)));
    }
    return data;
}

function renderHistoryChart() {
    historyLoadingSpinner.classList.remove('hidden');
    historyChartContainer.classList.add('hidden');

    setTimeout(() => {
        const simulatedData = generateSimulatedData();
        if (historyChartInstance) {
            historyChartInstance.destroy();
        }

        const ctx = historyChartCanvas.getContext('2d');
        const t = translations[currentLang];

        historyChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: simulatedData.labels,
                datasets: [
                    {
                        label: t.temperatureLabel,
                        data: simulatedData.temperatures,
                        borderColor: 'rgba(255, 255, 255, 1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: t.rainLabel,
                        data: simulatedData.rainLevels,
                        borderColor: 'rgba(173, 216, 230, 1)',
                        backgroundColor: 'rgba(173, 216, 230, 0.2)',
                        yAxisID: 'yRain',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    },
                    title: {
                        display: false,
                        text: 'Weekly Weather Trends',
                        color: 'white'
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        title: {
                            display: true,
                            text: t.temperatureLabel,
                            color: 'white'
                        }
                    },
                    yRain: {
                        position: 'right',
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        title: {
                            display: true,
                            text: t.rainLabel,
                            color: 'white'
                        }
                    }
                }
            }
        });

        historyLoadingSpinner.classList.add('hidden');
        historyChartContainer.classList.remove('hidden');
    }, 500); // Simulate a network delay
}

// Event listeners
signInButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (rememberMeCheckbox.checked) {
        localStorage.setItem(localStorageEmailKey, email);
    } else {
        localStorage.removeItem(localStorageEmailKey);
    }

    const persistence = rememberMeCheckbox.checked ? browserLocalPersistence : browserSessionPersistence;

    if (!email || !password) {
        authErrorMessage.textContent = "Please enter both email and password.";
        authErrorMessage.classList.remove('hidden');
        return;
    }

    await setPersistence(auth, persistence);

    if (isCreatingAccount) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile/main`);
            await setDoc(profileRef, {
                name: user.email.split('@')[0],
                email: user.email,
                phone: '',
                language: currentLang,
                userId: user.uid
            });
            showNotifier("Account created successfully. You are now signed in.", "success");
        } catch (error) {
            console.error("Error creating account:", error);
            authErrorMessage.textContent = `Error: ${error.message}`;
            authErrorMessage.classList.remove('hidden');
            showNotifier(`Error creating account: ${error.message}`, "error");
        }
    } else {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            showNotifier("Signed in successfully!", "success");
        } catch (error) {
            console.error("Error signing in:", error);
            authErrorMessage.textContent = `Error: ${error.message}`;
            authErrorMessage.classList.remove('hidden');
            showNotifier(`Error signing in: ${error.message}`, "error");
        }
    }
});

createAccountLink.addEventListener('click', (e) => {
    e.preventDefault();
    isCreatingAccount = !isCreatingAccount;
    if (isCreatingAccount) {
        signInButton.textContent = "Create Account";
        createAccountLink.textContent = "Sign In instead";
        welcomeMessage.textContent = "Create an Account";
    } else {
        signInButton.textContent = translations[currentLang].signInButton;
        createAccountLink.textContent = translations[currentLang].createAccountLink;
        welcomeMessage.textContent = translations[currentLang].welcomeMessage;
    }
    authErrorMessage.classList.add('hidden');
});

     currentWeatherTab.addEventListener('click', showWeatherSection);
 historyTrendsTab.addEventListener('click', showHistorySection);
     cameraSensorTab.addEventListener('click', showCameraSensorSection);

 // Weather refresh buttons
 refreshWeatherBtn.addEventListener('click', () => {
     fetchWeather();
 });

profileMenuContainer.addEventListener('click', () => {
    profileDropdown.classList.toggle('hidden');
    profileDropdown.classList.toggle('show');
});

dropdownSignOutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
    }
});

profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    showProfileSection();
});

backButton.addEventListener('click', () => {
    showMainContentSection();
    showWeatherSection();
});

languageLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(languageModal);
});

languageModalClose.addEventListener('click', () => {
    hideModal(languageModal);
});

document.getElementById('lang-en').addEventListener('click', () => {
    currentLang = 'en';
    translateUI();
    hideModal(languageModal);
    if (historySection.classList.contains('hidden') === false) {
         renderHistoryChart();
    }
});
document.getElementById('lang-ms').addEventListener('click', () => {
    currentLang = 'ms';
    translateUI();
    hideModal(languageModal);
    if (historySection.classList.contains('hidden') === false) {
         renderHistoryChart();
    }
});
document.getElementById('lang-zh').addEventListener('click', () => {
    currentLang = 'zh';
    translateUI();
    hideModal(languageModal);
    if (historySection.classList.contains('hidden') === false) {
         renderHistoryChart();
    }
});

messageModalOkButton.addEventListener('click', () => {
    hideModal(messageModal);
});

messageModalClose.addEventListener('click', () => {
    hideModal(messageModal);
});

// AI Rain Probability Calculation Event Listener
calculateRainProbabilityBtn.addEventListener('click', () => {
    // Show loading state
    rainProbabilityResult.classList.add('hidden');
    rainProbabilityLoading.classList.remove('hidden');

    // Simulate AI processing time
    setTimeout(() => {
        // Get current weather data
        const currentTemp = parseFloat(weatherPercentage.textContent.replace('°C', ''));
        const currentHumidity = parseFloat(currentHumidityEl.textContent.replace('%', ''));
        const currentWind = parseFloat(currentWindEl.textContent.replace(' km/h', ''));

        // Estimate pressure and cloud cover based on conditions
        const estimatedPressure = 1013 + (Math.random() - 0.5) * 20; // Simulate pressure variation
        const estimatedCloudCover = currentHumidity > 70 ? 80 : currentHumidity > 50 ? 60 : 30;

        // Calculate rain probability using AI
        const rainData = calculateRainProbability(
            currentTemp,
            currentHumidity,
            currentWind,
            estimatedPressure,
            estimatedCloudCover
        );

        // Update UI
        rainProbabilityPercentage.textContent = rainData.probability;
        rainProbabilityDescription.textContent = rainData.description;
        aiReasoning.textContent = rainData.reasoning;

        // Animate progress bar
        rainProbabilityBar.style.width = '0%';
        setTimeout(() => {
            rainProbabilityBar.style.width = rainData.probability + '%';
        }, 100);

        // Hide loading, show result
        rainProbabilityLoading.classList.add('hidden');
        rainProbabilityResult.classList.remove('hidden');
             }, 2000); // 2 second delay to simulate AI processing
 });

 // AI Weather Suggestions Event Listener
 getAiSuggestionsBtn.addEventListener('click', () => {
     showProgressBar();
     // Show loading state
     aiSuggestionsResult.classList.add('hidden');
     aiSuggestionsLoading.classList.remove('hidden');

     // Simulate AI processing time
     setTimeout(() => {
         try {
             // Get current weather data
             const currentTemp = parseFloat(weatherPercentage.textContent.replace('°C', ''));
             const currentHumidity = parseFloat(currentHumidityEl.textContent.replace('%', ''));
             const currentWind = parseFloat(currentWindEl.textContent.replace(' km/h', ''));
             const currentCondition = currentConditionsEl.textContent;

             // Generate AI suggestions
             const suggestionData = generateWeatherSuggestions(
                 currentTemp,
                 currentHumidity,
                 currentCondition,
                 currentWind
             );

             // Update UI
             suggestionIcon.className = suggestionData.icon;
             aiSuggestionText.textContent = suggestionData.suggestion;

             // Animate progress bar
             suggestionsProgressBar.style.width = '0%';
             setTimeout(() => {
                 suggestionsProgressBar.style.width = '100%';
             }, 100);

             // Hide loading, show result
             aiSuggestionsLoading.classList.add('hidden');
             aiSuggestionsResult.classList.remove('hidden');
             hideProgressBar();
             showNotifier("AI suggestions generated successfully!", "success");
         } catch (error) {
             hideProgressBar();
             aiSuggestionsLoading.classList.add('hidden'); // Ensure loading is hidden on error
             showNotifier(`Error generating AI suggestions: ${error.message}`, "error");
             console.error("Error generating AI suggestions:", error);
         }
     }, 1500); // 1.5 second delay to simulate AI processing
 });

 // AquaBot Chat Event Listeners
 aquabotToggle.addEventListener('click', () => {
     aquabotChat.classList.toggle('hidden');
     if (!aquabotChat.classList.contains('hidden')) {
         aquabotChat.classList.add('show');
     }
 });

 aquabotClose.addEventListener('click', () => {
     aquabotChat.classList.add('hide');
     setTimeout(() => {
         aquabotChat.classList.add('hidden');
         aquabotChat.classList.remove('hide');
     }, 300);
 });

 aquabotSend.addEventListener('click', handleAquaBotMessage);
 aquabotInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') {
         handleAquaBotMessage();
     }
 });

async function handleAquaBotMessage() {
     const message = aquabotInput.value.trim();
     if (!message) return;

     // Add user message
     addAquaBotMessage(message, true);
     aquabotInput.value = '';

     showProgressBar(); // Show global progress bar
     // Show typing indicator
     showAquaBotTyping();

      try {
         // Get current weather data
         const weatherData = getCurrentWeatherData();

          // Generate AI response using Gemini API
          const response = await aquaBotResponse(message, weatherData);

          hideProgressBar(); // Hide global progress bar
          // Hide typing indicator
          hideAquaBotTyping();

         // Add bot response
         addAquaBotMessage(response);
         showNotifier("AquaBot response received!", "success"); // Show success notification

      } catch (error) {
          hideProgressBar(); // Hide global progress bar
          console.error('Error in AquaBot:', error);
          hideAquaBotTyping();

          // Show error message
          addAquaBotMessage("I'm sorry, I'm having trouble processing your request right now. Please try again later!");
          showNotifier(`Error: ${error.message}`, "error"); // Show error notification
      }
 }

 // Profile picture upload functionality
profilePictureInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        showProgressBar();
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            hideProgressBar();
            showMessageModal("File Too Large", "Please select an image smaller than 5MB.");
            showNotifier("File Too Large. Please select an image smaller than 5MB.", "error");
            return;
        }

        if (!file.type.startsWith('image/')) {
            hideProgressBar();
            showMessageModal("Invalid File", "Please select a valid image file.");
            showNotifier("Invalid File. Please select a valid image file.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicture.src = e.target.result;
            profilePicture.classList.remove('hidden');
            profilePictureIcon.classList.add('hidden');

            // Save to localStorage for persistence
            localStorage.setItem('aquafixers-profile-picture', e.target.result);

            // Update the main profile picture as well
            mainProfilePicture.src = e.target.result;
            mainProfilePicture.classList.remove('hidden');

            // Update profile note
            profilePictureNote.textContent = "Profile picture updated!";
            setTimeout(() => {
                profilePictureNote.textContent = translations[currentLang].profilePictureNote;
            }, 2000);
            hideProgressBar();
            showNotifier("Profile picture updated successfully!", "success");
        };
        reader.onerror = function() { // Add onerror handler for FileReader
            hideProgressBar();
            showNotifier("Error reading file.", "error");
            console.error("Error reading file.");
        };
        reader.readAsDataURL(file);
    }
});

// Save changes to profile
saveChangesButton.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) {
        showMessageModal("Error", "You must be signed in to save changes.");
        showNotifier("Error: You must be signed in to save changes.", "error");
        showNotifier("Error: You must be signed in to save changes.", "error");
        return;
    }

    const newName = profileNameInput.value;
    const newPhone = profilePhoneInput.value;

    showProgressBar();
    try {
        const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile/main`);
        await setDoc(profileRef, {
            name: newName,
            email: user.email,
            phone: newPhone,
            language: currentLang,
            userId: user.uid
        }, { merge: true });

        profileMessage.textContent = translations[currentLang].profileUpdateMessage;
        profileMessage.classList.remove('hidden');
        setTimeout(() => {
            profileMessage.classList.add('hidden');
        }, 3000);

        profileText.textContent = newName;
        hideProgressBar();
        showNotifier("Profile updated successfully!", "success");
        showNotifier("Profile updated successfully!", "success");
    } catch (error) {
        hideProgressBar();
        console.error("Error updating profile:", error);
        profileMessage.textContent = `Error: ${error.message}`;
        profileMessage.classList.remove('hidden');
        showNotifier(`Error updating profile: ${error.message}`, "error");
        showNotifier(`Error updating profile: ${error.message}`, "error");
    }
});



// Main auth state listener
onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed. User:", user);
    if (user) {
        showMainContentSection();
        const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile/main`);
        let displayName = user.email.split('@')[0];

        let retries = 0;
        const maxRetries = 5;
        const baseDelay = 1000;
        let profileData = null;

        while (retries < maxRetries) {
            try {
                const profileSnap = await getDoc(profileRef);
                if (profileSnap.exists()) {
                    profileData = profileSnap.data();
                    break;
                } else {
                    await setDoc(profileRef, {
                        name: displayName,
                        email: user.email,
                        phone: '',
                        language: currentLang,
                        userId: user.uid
                    });
                    profileData = { name: displayName, email: user.email, phone: '', language: currentLang, userId: user.uid };
                    break;
                }
            } catch (error) {
                console.error(`Attempt ${retries + 1} failed:`, error);
                retries++;
                await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, retries)));
            }
        }

        if (profileData) {
            profileNameInput.value = profileData.name || '';
            profileEmailInput.value = profileData.email || '';
            profilePhoneInput.value = profileData.phone || '';
            profileText.textContent = profileData.name || displayName;
            currentLang = profileData.language || 'en';

            // Load profile picture if exists
            const savedPicture = localStorage.getItem('aquafixers-profile-picture');
            if (savedPicture) {
                profilePicture.src = savedPicture;
                profilePicture.classList.remove('hidden');
                profilePictureIcon.classList.add('hidden');
                // Also update the main profile picture
                mainProfilePicture.src = savedPicture;
                mainProfilePicture.classList.remove('hidden');
            }
        } else {
            console.error("Failed to fetch or create user profile after multiple retries.");
            profileText.textContent = displayName;
            profileEmailInput.value = user.email || '';
        }

        translateUI();

         // Ensure weather loads after a short delay
         setTimeout(() => {
             fetchWeather();
         }, 500);

         showWeatherSection();

        const sensorDocRef = doc(db, "sensorData", "levels");
        onSnapshot(sensorDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                rainwaterLevel.textContent = data.rainwaterLevel.integerValue;
                riverWaterLevel.textContent = data.riverWaterLevel.integerValue;
            } else {
                console.log("No such document!");
            }
        });
    } else {
        showAuthSection();
        const rememberedEmail = localStorage.getItem(localStorageEmailKey);
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        } else {
            emailInput.value = '';
            rememberMeCheckbox.checked = false;
        }
        passwordInput.value = '';
        translateUI();
    }
});