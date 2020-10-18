// 
// Variables
const todayMoreDetails = document.querySelector('#today-more-details').parentElement;
const mainBodyToday = document.querySelector('#main-body-today').firstElementChild;
const followingDays = document.querySelectorAll('.following-day-mobile');
// 
const tomorrowMoreDetails = document.querySelector('#tomorrow-more-details').parentElement;
const afterTomorrowMoreDetails = document.querySelector('#after-tomorrow-more-details').parentElement;
const afterAfterTomorrowMoreDetails = document.querySelector('#after-after-tomorrow-more-details').parentElement;
// 
const appContainer = document.querySelector('.app-container');
const navbarWrapper = document.querySelector('#navbar');
const locationIconWrapper = document.querySelector('#location-icon');
const city = document.querySelector('#city');
const menuIcon = document.querySelector('#menu-plus-icon');
const cityForm = document.querySelector('#city-form');
// 
// main today tab
const todayMainImage = document.querySelector('#today-main-image');
const todayMainText = document.querySelector('#main-today-text');
const todayMainTemperature = document.querySelector('#main-today-temperature');
const todayMainDay = document.querySelector('#main-today-day');
const todayMainTime = document.querySelector('#main-today-time');
const temperatureConversion = document.querySelector('#main-today-conversion');
// 
// today tab - more details
const todayTabBackground = document.querySelector('#today-tab-background');
// 
const todayTabImage = document.querySelector('#today-tab-image');
const todayTabDescription = document.querySelector('#today-tab-description');
const todayTabHigh = document.querySelector('#today-tab-high');
const todayTabCurrent = document.querySelector('#today-tab-current');
const todayTabFeelsLike = document.querySelector('#today-tab-feels-like');
const todayTabLow = document.querySelector('#today-tab-low');
// 
const todayTabClouds = document.querySelector('#today-tab-clouds');
const todayTabHumidity = document.querySelector('#today-tab-humidity');
const todayTabWind = document.querySelector('#today-tab-wind');
const todayTabPressure = document.querySelector('#today-tab-pressure');
// 
const todayTabSunrise = document.querySelector('#today-tab-sunrise');
const todayTabDayDuration = document.querySelector('#today-tab-day-duration');
const todayTabNightDuration = document.querySelector('#today-tab-night-duration');
const todayTabSunset = document.querySelector('#today-tab-sunset');
// 
// tomorrow tab - more details
const tomorrowTabBackground = document.querySelector('#tomorrow-tab-background');
// 
const tomorrowSummaryDescription = document.querySelector('#tomorrow-summary-description');
const tomorrowSummaryCurrent = document.querySelector('#tomorrow-summary-current');
const tomorrowSummaryWeather = document.querySelector('#tomorrow-summary-weather');
// 
const tomorrowTabImage = document.querySelector('#tomorrow-tab-image');
const tomorrowTabDescription = document.querySelector('#tomorrow-tab-description');
const tomorrowTabHigh = document.querySelector('#tomorrow-tab-high');
const tomorrowTabLow = document.querySelector('#tomorrow-tab-low');
// 
const tomorrowTabClouds = document.querySelector('#tomorrow-tab-clouds');
const tomorrowTabHumidity = document.querySelector('#tomorrow-tab-humidity');
const tomorrowTabWind = document.querySelector('#tomorrow-tab-wind');
const tomorrowTabPressure = document.querySelector('#tomorrow-tab-pressure');
// 
const tomorrowTabSunrise = document.querySelector('#tomorrow-tab-sunrise');
const tomorrowTabDayDuration = document.querySelector('#tomorrow-tab-day-duration');
const tomorrowTabNightDuration = document.querySelector('#tomorrow-tab-night-duration');
const tomorrowTabSunset = document.querySelector('#tomorrow-tab-sunset');
// 
// after-tomorrow tab - more details
const afterTomorrowTabBackground = document.querySelector('#after-tomorrow-tab-background');
// 
const afterTomorrowTabDay = document.querySelector('#after-tomorrow-more-details');
const afterTomorrowSummaryDescription = document.querySelector('#after-tomorrow-summary-description');
const afterTomorrowSummaryCurrent = document.querySelector('#after-tomorrow-summary-current');
const afterTomorrowSummaryWeather = document.querySelector('#after-tomorrow-summary-weather');
// 
const afterTomorrowTabImage = document.querySelector('#after-tomorrow-tab-image');
const afterTomorrowTabDescription = document.querySelector('#after-tomorrow-tab-description');
const afterTomorrowTabHigh = document.querySelector('#after-tomorrow-tab-high');
const afterTomorrowTabLow = document.querySelector('#after-tomorrow-tab-low');
// 
const afterTomorrowTabClouds = document.querySelector('#after-tomorrow-tab-clouds');
const afterTomorrowTabHumidity = document.querySelector('#after-tomorrow-tab-humidity');
const afterTomorrowTabWind = document.querySelector('#after-tomorrow-tab-wind');
const afterTomorrowTabPressure = document.querySelector('#after-tomorrow-tab-pressure');
// 
const afterTomorrowTabSunrise = document.querySelector('#after-tomorrow-tab-sunrise');
const afterTomorrowTabDayDuration = document.querySelector('#after-tomorrow-tab-day-duration');
const afterTomorrowTabNightDuration = document.querySelector('#after-tomorrow-tab-night-duration');
const afterTomorrowTabSunset = document.querySelector('#after-tomorrow-tab-sunset');
// 
// after-after-tomorrow tab - more details
const afterAfterTomorrowTabBackground = document.querySelector('#after-after-tomorrow-tab-background');
// 
const afterAfterTomorrowTabDay = document.querySelector('#after-after-tomorrow-more-details');
const afterAfterTomorrowSummaryDescription = document.querySelector('#after-after-tomorrow-summary-description');
const afterAfterTomorrowSummaryCurrent = document.querySelector('#after-after-tomorrow-summary-current');
const afterAfterTomorrowSummaryWeather = document.querySelector('#after-after-tomorrow-summary-weather');
// 
const afterAfterTomorrowTabImage = document.querySelector('#after-after-tomorrow-tab-image');
const afterAfterTomorrowTabDescription = document.querySelector('#after-after-tomorrow-tab-description');
const afterAfterTomorrowTabHigh = document.querySelector('#after-after-tomorrow-tab-high');
const afterAfterTomorrowTabLow = document.querySelector('#after-after-tomorrow-tab-low');
// 
const afterAfterTomorrowTabClouds = document.querySelector('#after-after-tomorrow-tab-clouds');
const afterAfterTomorrowTabHumidity = document.querySelector('#after-after-tomorrow-tab-humidity');
const afterAfterTomorrowTabWind = document.querySelector('#after-after-tomorrow-tab-wind');
const afterAfterTomorrowTabPressure = document.querySelector('#after-after-tomorrow-tab-pressure');
// 
const afterAfterTomorrowTabSunrise = document.querySelector('#after-after-tomorrow-tab-sunrise');
const afterAfterTomorrowTabDayDuration = document.querySelector('#after-after-tomorrow-tab-day-duration');
const afterAfterTomorrowTabNightDuration = document.querySelector('#after-after-tomorrow-tab-night-duration');
const afterAfterTomorrowTabSunset = document.querySelector('#after-after-tomorrow-tab-sunset');
// auxiliary variables
const submitBtnWrapper = cityForm.firstElementChild.lastElementChild;
const cityInput = cityForm.city;
const loader = cityForm.nextElementSibling;
const navbar = locationIconWrapper.parentElement;
const locationIcon = locationIconWrapper.firstElementChild;
const locationBackIcon = locationIconWrapper.lastElementChild;
const cityNavbar = locationIconWrapper.nextElementSibling;
const menuNavbar = locationIconWrapper.nextElementSibling.nextElementSibling;
const welcomeScreenWrapper = navbarWrapper.nextElementSibling;
const errorBox = loader.nextElementSibling;
const todayTab = todayMoreDetails.parentElement;
const tomorrowTab = tomorrowMoreDetails.parentElement;
const afterTomorrowTab = afterTomorrowMoreDetails.parentElement;
const afterAfterTomorrowTab = afterAfterTomorrowMoreDetails.parentElement;
const tomorrowSummary = tomorrowMoreDetails.nextElementSibling;
const afterTomorrowSummary = afterTomorrowMoreDetails.nextElementSibling;
const afterAfterTomorrowSummary = afterAfterTomorrowMoreDetails.nextElementSibling;
const menuWrapper = navbarWrapper.nextElementSibling.nextElementSibling;
const menuPlusIcon = menuIcon.firstElementChild;
const menuMinusIcon = menuIcon.lastElementChild;
const celsiusDeg = temperatureConversion.firstElementChild;
const fahrenheitDeg = temperatureConversion.lastElementChild;
// 
let currentHeight = 0;
let navbarHeight = 55;
let navbarOffset = 75;
// 