// 
// 
document.addEventListener('DOMContentLoaded', () => {
    // 
    // instantiate weather & UI objects
    const weather = new Weather(key);
    const ui = new UI();
    // 
    // welcome screen
    cityInput.addEventListener('keyup', () => {
        // 
        if (cityInput.value) {
            // 
            submitBtnWrapper.classList.remove('squeezed');
            cityInput.classList.add('valid');
            // 
        } else {
            // 
            submitBtnWrapper.classList.add('squeezed');
            cityInput.classList.remove('valid');
            // 
        }
        // 
    });
    // 
    cityForm.addEventListener('submit', (e) => {
        // 
        e.preventDefault();
        // 
        if (cityInput.classList.contains('valid')) {
            // 
            cityForm.classList.toggle('hide');
            loader.classList.toggle('hide');
            // 
            appContainer.classList.remove('overflow-hidden');
            // 
            // hide back button and social if searching yet another time
            if (!locationBackIcon.classList.contains('hide')) {
                // 
                locationBackIcon.classList.toggle('hide');
                // 
            }
            // 
            // go back to celsius if necessary
            if (!celsiusDeg.classList.contains('units-active')) {
                // 
                celsiusDeg.classList.toggle('units-active');
                fahrenheitDeg.classList.toggle('units-active');
                // 
            }
            // 
            weather.getCurrentForecast(cityInput.value)
            .then(result => {
                // 
                // console.log(result);
                // 
                // today main screen
                weather.updateMainScreen(weather.city, result.weather[0], result.main.temp, result.timezone);
                // 
                // today tab
                weather.updateTodayCurrentFeelsLike(result.main.temp, result.main.feels_like);
                weather.updateCloudsHumidityWindPressure(result.clouds.all, todayTabClouds, result.main.humidity, todayTabHumidity, result.wind.deg, result.wind.speed, todayTabWind, result.main.pressure, todayTabPressure);
                weather.updateSunriseSunset(result.sys.sunrise, todayTabSunrise, result.sys.sunset, todayTabSunset, todayTabDayDuration, todayTabNightDuration);
                weather.updateBackgroundDescriptionIcon(result.weather[0], todayTabDescription, todayTabBackground, todayTabImage);
                // 
                // call & return getTodayForecast response
                return weather.get3DayForecast(result.coord.lat, result.coord.lon);
                // 
            })
            .then(result => {
                // 
                // console.log(result);
                // 
                // today tab - cont
                weather.updateHighLowTemperature(0, result.daily, todayTabHigh, todayTabLow);
                // 
                // tomorrow tab
                weather.updateSummaryInfo(1, result.daily, tomorrowSummaryDescription, tomorrowSummaryCurrent, tomorrowSummaryWeather);
                weather.updateBackgroundDescriptionIcon(result.daily[1].weather[0], tomorrowTabDescription, tomorrowTabBackground, tomorrowTabImage);
                weather.updateHighLowTemperature(1, result.daily, tomorrowTabHigh, tomorrowTabLow);
                weather.updateCloudsHumidityWindPressure(result.daily[1].clouds, tomorrowTabClouds,  result.daily[1].humidity, tomorrowTabHumidity, result.daily[1].wind_deg, result.daily[1].wind_speed, tomorrowTabWind, result.daily[1].pressure, tomorrowTabPressure);
                weather.updateSunriseSunset(result.daily[1].sunrise, tomorrowTabSunrise, result.daily[1].sunset, tomorrowTabSunset, tomorrowTabDayDuration, tomorrowTabNightDuration);
                // 
                // after-tomorrow
                // tab day name
                weather.updateDayName(result.daily[2], afterTomorrowTabDay);
                weather.updateSummaryInfo(2, result.daily, afterTomorrowSummaryDescription, afterTomorrowSummaryCurrent, afterTomorrowSummaryWeather);
                weather.updateBackgroundDescriptionIcon(result.daily[2].weather[0], afterTomorrowTabDescription, afterTomorrowTabBackground, afterTomorrowTabImage);
                weather.updateHighLowTemperature(2, result.daily, afterTomorrowTabHigh, afterTomorrowTabLow);
                weather.updateCloudsHumidityWindPressure(result.daily[2].clouds, afterTomorrowTabClouds,  result.daily[2].humidity, afterTomorrowTabHumidity, result.daily[2].wind_deg, result.daily[2].wind_speed, afterTomorrowTabWind, result.daily[2].pressure, afterTomorrowTabPressure);
                weather.updateSunriseSunset(result.daily[2].sunrise, afterTomorrowTabSunrise, result.daily[2].sunset, afterTomorrowTabSunset, afterTomorrowTabDayDuration, afterTomorrowTabNightDuration);
                // 
                // after-after-tomorrow
                // tab day name
                weather.updateDayName(result.daily[3], afterAfterTomorrowTabDay);
                weather.updateSummaryInfo(3, result.daily, afterAfterTomorrowSummaryDescription, afterAfterTomorrowSummaryCurrent, afterAfterTomorrowSummaryWeather);
                weather.updateBackgroundDescriptionIcon(result.daily[3].weather[0], afterAfterTomorrowTabDescription, afterAfterTomorrowTabBackground, afterAfterTomorrowTabImage);
                weather.updateHighLowTemperature(3, result.daily, afterAfterTomorrowTabHigh, afterAfterTomorrowTabLow);
                weather.updateCloudsHumidityWindPressure(result.daily[3].clouds, afterAfterTomorrowTabClouds,  result.daily[3].humidity, afterAfterTomorrowTabHumidity, result.daily[3].wind_deg, result.daily[3].wind_speed, afterAfterTomorrowTabWind, result.daily[3].pressure, afterAfterTomorrowTabPressure);
                weather.updateSunriseSunset(result.daily[3].sunrise, afterAfterTomorrowTabSunrise, result.daily[3].sunset, afterAfterTomorrowTabSunset, afterAfterTomorrowTabDayDuration, afterAfterTomorrowTabNightDuration);
                // 
                // hide loader, roll up main screen, update city name, reset form, set city
                setTimeout(() => {
                    // 
                    loader.classList.toggle('hide');
                    // 
                    if (navbar.classList.contains('hide')) {
                        // 
                        navbar.classList.toggle('hide');
                        // 
                    }
                    // 
                    if (navbarWrapper.classList.contains('absolutely-on-top')) {
                        // 
                        locationIcon.classList.toggle('hide');
                        cityNavbar.classList.toggle('hide');
                        menuNavbar.classList.toggle('hide');
                        navbarWrapper.classList.toggle('absolutely-on-top');
                        // 
                    }
                    // 
                    welcomeScreenWrapper.classList.toggle('collapsed');
                    city.textContent = cityInput.value.toUpperCase();
                    cityForm.classList.toggle('hide');
                    submitBtnWrapper.classList.add('squeezed');
                    weather.setCity(cityInput.value);
                    cityForm.reset();
                    // 
                    // 
                }, 2000);
                // 
            })
            .catch(err => {
                // 
                // console.log(err.message);
                // 
                // reset city form, hide loader, display error message
                loader.classList.toggle('hide');
                submitBtnWrapper.classList.add('squeezed');
                cityForm.reset();
                errorBox.textContent = err.message.toUpperCase();
                errorBox.classList.toggle('hide');
                locationBackIcon.classList.toggle('hide');
                // 
                // show city form again and hide error div
                setTimeout(() => {
                    //
                    errorBox.classList.toggle('hide');
                    cityForm.classList.toggle('hide');
                    // 
                }, 2000);
                // 
            });
            // 
        }
        // 
        if (cityInput.value) {
            // 
            submitBtnWrapper.classList.remove('squeezed');
            // 
        } else {
            // 
            submitBtnWrapper.classList.add('squeezed');
            // 
        }
        // 
    });
    // 
    // event listeners
    locationIcon.addEventListener('click', () => {
        // 
        locationIcon.classList.toggle('hide');
        locationBackIcon.classList.toggle('hide');
        cityNavbar.classList.toggle('hide');
        menuNavbar.classList.toggle('hide');
        welcomeScreenWrapper.classList.toggle('collapsed');
        navbarWrapper.classList.toggle('absolutely-on-top');
        // 
        // if any weather tab is active, close it
        if (todayTab.classList.contains('active')) {
            // 
            ui.rollUnrollTodayTab(todayMoreDetails, followingDays);
            ui.styleDayTab(todayMoreDetails);
            // 
        } else if (tomorrowTab.classList.contains('active')) {
            // 
            ui.caseTwo(tomorrowMoreDetails);
            tomorrowSummary.classList.toggle('hide');
            // 
        } else if (afterTomorrowTab.classList.contains('active')) {
            // 
            ui.caseTwo(afterTomorrowMoreDetails);
            afterTomorrowSummary.classList.toggle('hide');
            // 
        } else if (afterAfterTomorrowTab.classList.contains('active')) {
            // 
            ui.caseTwo(afterAfterTomorrowMoreDetails);
            afterAfterTomorrowSummary.classList.toggle('hide');
            // 
        }
        // 
        appContainer.classList.add('overflow-hidden');
        // 
    });
    // 
    locationBackIcon.addEventListener('click', () => {
        // 
        appContainer.classList.remove('overflow-hidden');
        // 
        locationIcon.classList.toggle('hide');
        locationBackIcon.classList.toggle('hide');
        cityNavbar.classList.toggle('hide');
        menuNavbar.classList.toggle('hide');
        welcomeScreenWrapper.classList.toggle('collapsed');
        navbarWrapper.classList.toggle('absolutely-on-top');
        // 
        cityForm.reset();
        if (cityInput.value) {
            // 
            submitBtnWrapper.classList.remove('squeezed');
            // 
        } else {
            // 
            submitBtnWrapper.classList.add('squeezed');
            // 
        }
        // 
    });
    // 
    menuPlusIcon.addEventListener('click', () => {
        // 
        appContainer.classList.add('overflow-hidden');
        appContainer.style.height = '100vh';
        // 
        navbarWrapper.classList.toggle('absolutely-on-top');
        locationIconWrapper.classList.toggle('hide');
        cityNavbar.classList.toggle('hide');
        // 
        menuPlusIcon.classList.toggle('hide');
        menuMinusIcon.classList.toggle('hide');
        menuIcon.classList.toggle('is-offset-10');
        menuWrapper.classList.toggle('collapsed');
        // 
        // if any weather tab is active, close it
        if (todayTab.classList.contains('active')) {
            // 
            ui.rollUnrollTodayTab(todayMoreDetails, followingDays);
            ui.styleDayTab(todayMoreDetails);
            // 
        } else if (tomorrowTab.classList.contains('active')) {
            // 
            ui.caseTwo(tomorrowMoreDetails);
            tomorrowSummary.classList.toggle('hide');
            // 
        } else if (afterTomorrowTab.classList.contains('active')) {
            // 
            ui.caseTwo(afterTomorrowMoreDetails);
            afterTomorrowSummary.classList.toggle('hide');
            // 
        } else if (afterAfterTomorrowTab.classList.contains('active')) {
            // 
            ui.caseTwo(afterAfterTomorrowMoreDetails);
            afterAfterTomorrowSummary.classList.toggle('hide');
            // 
        }
        // 
    });
    // 
    menuMinusIcon.addEventListener('click', () => {
        // 
        appContainer.classList.remove('overflow-hidden');
        appContainer.removeAttribute('style');
        // 
        navbarWrapper.classList.toggle('absolutely-on-top');
        locationIconWrapper.classList.toggle('hide');
        cityNavbar.classList.toggle('hide');
        // 
        menuPlusIcon.classList.toggle('hide');
        menuMinusIcon.classList.toggle('hide');
        menuIcon.classList.toggle('is-offset-10');
        menuWrapper.classList.toggle('collapsed');
        // 
    });
    // 
    celsiusDeg.addEventListener('click', () => {
        // 
        if (!celsiusDeg.classList.contains('units-active')) {
            // 
            celsiusDeg.classList.toggle('units-active');
            fahrenheitDeg.classList.toggle('units-active');
            // 
            todayMainTemperature.textContent = ((Number(todayMainTemperature.textContent.substring(0, todayMainTemperature.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
            todayTabCurrent.textContent = ((Number(todayTabCurrent.textContent.substring(0,todayTabCurrent.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            todayTabFeelsLike.textContent = ((Number(todayTabFeelsLike.textContent.substring(0,todayTabFeelsLike.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
            todayTabHigh.textContent = ((Number(todayTabHigh.textContent.substring(0,todayTabHigh.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            todayTabLow.textContent = ((Number(todayTabLow.textContent.substring(0,todayTabLow.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
            tomorrowTabHigh.textContent = ((Number(tomorrowTabHigh.textContent.substring(0,tomorrowTabHigh.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            tomorrowTabLow.textContent = ((Number(tomorrowTabLow.textContent.substring(0,tomorrowTabLow.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
            afterTomorrowTabHigh.textContent = ((Number(afterTomorrowTabHigh.textContent.substring(0,afterTomorrowTabHigh.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            afterTomorrowTabLow.textContent = ((Number(afterTomorrowTabLow.textContent.substring(0,afterTomorrowTabLow.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
            afterAfterTomorrowTabHigh.textContent = ((Number(afterAfterTomorrowTabHigh.textContent.substring(0,afterAfterTomorrowTabHigh.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            afterAfterTomorrowTabLow.textContent = ((Number(afterAfterTomorrowTabLow.textContent.substring(0,afterAfterTomorrowTabLow.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
            tomorrowSummaryCurrent.textContent = ((Number(tomorrowSummaryCurrent.textContent.substring(0,tomorrowSummaryCurrent.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            afterTomorrowSummaryCurrent.textContent = ((Number(afterTomorrowSummaryCurrent.textContent.substring(0,afterTomorrowSummaryCurrent.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            afterAfterTomorrowSummaryCurrent.textContent = ((Number(afterAfterTomorrowSummaryCurrent.textContent.substring(0,afterAfterTomorrowSummaryCurrent.textContent.length - 1)) - 32) * 0.5556).toFixed() + '\xB0';
            // 
        }
    });
    // 
    fahrenheitDeg.addEventListener('click', () => {
        // 
        if (!fahrenheitDeg.classList.contains('units-active')) {
            // 
            celsiusDeg.classList.toggle('units-active');
            fahrenheitDeg.classList.toggle('units-active');
            // 
            todayMainTemperature.textContent = ((Number(todayMainTemperature.textContent.substring(0, todayMainTemperature.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
            todayTabCurrent.textContent = ((Number(todayTabCurrent.textContent.substring(0,todayTabCurrent.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            todayTabFeelsLike.textContent = ((Number(todayTabFeelsLike.textContent.substring(0,todayTabFeelsLike.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
            todayTabHigh.textContent = ((Number(todayTabHigh.textContent.substring(0,todayTabHigh.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            todayTabLow.textContent = ((Number(todayTabLow.textContent.substring(0,todayTabLow.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
            tomorrowTabHigh.textContent = ((Number(tomorrowTabHigh.textContent.substring(0,tomorrowTabHigh.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            tomorrowTabLow.textContent = ((Number(tomorrowTabLow.textContent.substring(0,tomorrowTabLow.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
            afterTomorrowTabHigh.textContent = ((Number(afterTomorrowTabHigh.textContent.substring(0,afterTomorrowTabHigh.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            afterTomorrowTabLow.textContent = ((Number(afterTomorrowTabLow.textContent.substring(0,afterTomorrowTabLow.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
            afterAfterTomorrowTabHigh.textContent = ((Number(afterAfterTomorrowTabHigh.textContent.substring(0,afterAfterTomorrowTabHigh.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            afterAfterTomorrowTabLow.textContent = ((Number(afterAfterTomorrowTabLow.textContent.substring(0,afterAfterTomorrowTabLow.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
            tomorrowSummaryCurrent.textContent = ((Number(tomorrowSummaryCurrent.textContent.substring(0,tomorrowSummaryCurrent.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            afterTomorrowSummaryCurrent.textContent = ((Number(afterTomorrowSummaryCurrent.textContent.substring(0,afterTomorrowSummaryCurrent.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            afterAfterTomorrowSummaryCurrent.textContent = ((Number(afterAfterTomorrowSummaryCurrent.textContent.substring(0,afterAfterTomorrowSummaryCurrent.textContent.length - 1)) * 1.8) + 32).toFixed() + '\xB0';
            // 
        }
    });
    // 
    window.addEventListener('resize', () => {
        // 
        ui.windowSizeChange();
        // 
    });
    // 
    todayMoreDetails.firstElementChild.addEventListener('click', () => {
        // 
        if (!tomorrowTab.classList.contains('active') && !afterTomorrowTab.classList.contains('active') && !afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 1: todayMoreDetails CLICKED FIRST
            ui.rollUnrollTodayTab(todayMoreDetails, followingDays);
            ui.styleDayTab(todayMoreDetails);
            // 
        } else if(tomorrowTab.classList.contains('active') || afterTomorrowTab.classList.contains('active') || afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 2: todayMoreDetails CLICKED WHEN ANY OF THE FOLLOWING DAY TABS IS ACTIVE
            if (tomorrowTab.classList.contains('active')) {
                // 
                ui.styleSwitchTabs(tomorrowMoreDetails, [true, false, false, true], todayMoreDetails, [false, true, true, false]);
                //
                ui.setHeight(tomorrowSummary, navbarHeight, todayMoreDetails);
                ui.setHeight(afterTomorrowSummary, navbarHeight, todayMoreDetails);
                ui.setHeight(afterAfterTomorrowSummary, navbarHeight, todayMoreDetails);
                // 
            } else if(afterTomorrowTab.classList.contains('active')) {
                // 
                ui.styleSwitchTabs(afterTomorrowMoreDetails, [true, false, false, true], todayMoreDetails, [false, true, true, false]);
                //
                ui.setHeight(tomorrowSummary, navbarHeight, todayMoreDetails);
                ui.setHeight(afterTomorrowSummary, navbarHeight, todayMoreDetails);
                ui.setHeight(afterAfterTomorrowSummary, navbarHeight, todayMoreDetails);
                // 
                tomorrowSummary.classList.toggle('hide');
                afterAfterTomorrowSummary.classList.toggle('hide');
                // 
            } else if(afterAfterTomorrowTab.classList.contains('active')) {
                // 
                ui.styleSwitchTabs(afterAfterTomorrowMoreDetails, [true, false, false, true], todayMoreDetails, [false, true, true, false]);
                //
                ui.setHeight(tomorrowSummary, navbarHeight, todayMoreDetails);
                ui.setHeight(afterTomorrowSummary, navbarHeight, todayMoreDetails);
                ui.setHeight(afterAfterTomorrowSummary, navbarHeight, todayMoreDetails);
                // 
                tomorrowSummary.classList.toggle('hide');
                afterTomorrowSummary.classList.toggle('hide');
                // 
            }
            // 
        }
        // 
    });
    // 
    tomorrowMoreDetails.firstElementChild.addEventListener('click', () => {
        // 
        if (!todayTab.classList.contains('active') && !tomorrowTab.classList.contains('active') && !afterTomorrowTab.classList.contains('active') && !afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 1: tomorrowMoreDetails CLICKED FIRST
            ui.caseOne(tomorrowMoreDetails);
            // 
        } else if(!todayTab.classList.contains('active') && tomorrowTab.classList.contains('active')) {
            // 
            // CASE 2: tomorrowMoreDetails CLICKED SECOND TIME (ROLL DOWN) WHEN todayMoreDetails STILL INACTIVE
            ui.caseTwo(tomorrowMoreDetails);
            tomorrowSummary.classList.toggle('hide');
            // 
        } else if(todayTab.classList.contains('active') && !tomorrowTab.classList.contains('active')) {
            // 
            // CASE 3: tomorrowMoreDetails CLICKED WHEN todayMoreDetails ACTIVE
            ui.caseThree(tomorrowMoreDetails);
            afterAfterTomorrowTab.removeAttribute('style');
            // 
        } else if(!todayTab.classList.contains('active') && (afterTomorrowTab.classList.contains('active') || afterAfterTomorrowTab.classList.contains('active'))) {
            // 
            // CASE 4: tomorrowMoreDetails CLICKED WHEN todayMoreDetails INACTIVE AND ONE OF THE OTHER FOLLOWING DAY TABS ACTIVE
            if (afterTomorrowTab.classList.contains('active')) {
                // 
                ui.caseFour(tomorrowMoreDetails, afterTomorrowMoreDetails, [true, false, false, true], [true, true, false, true]);
                ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterAfterTomorrowMoreDetails, false);
                // 
            } else if(afterAfterTomorrowTab.classList.contains('active')) {
                // 
                ui.caseFour(tomorrowMoreDetails, afterAfterTomorrowMoreDetails, [true, false, false, true], [true, true, false, true]);
                ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterTomorrowMoreDetails, false);
                // 
            }
            // 
        }
        // 
    });
    // 
    afterTomorrowMoreDetails.firstElementChild.addEventListener('click', () => {
        // 
        if (!todayTab.classList.contains('active') && !tomorrowTab.classList.contains('active') && !afterTomorrowTab.classList.contains('active') && !afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 1: afterTomorrowMoreDetails CLICKED FIRST
            ui.caseOne(afterTomorrowMoreDetails);
            ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterAfterTomorrowMoreDetails);
            // 
        } else if(!todayTab.classList.contains('active') && afterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 2: afterTomorrowMoreDetails CLICKED SECOND TIME (ROLL DOWN) WHEN todayMoreDetails STILL INACTIVE
            ui.caseTwo(afterTomorrowMoreDetails);
            afterTomorrowSummary.classList.toggle('hide');
            // ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterAfterTomorrowMoreDetails, false);
            // 
        } else if(todayTab.classList.contains('active') && !afterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 3: afterTomorrowMoreDetails CLICKED WHEN todayMoreDetails ACTIVE
            ui.caseThree(afterTomorrowMoreDetails);
            ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterAfterTomorrowMoreDetails);
            // 
        } else if(!todayTab.classList.contains('active') && (tomorrowTab.classList.contains('active') || afterAfterTomorrowTab.classList.contains('active'))) {
            // 
            // CASE 4: afterTomorrowMoreDetails CLICKED WHEN todayMoreDetails INACTIVE AND ONE OF THE OTHER FOLLOWING DAY TABS ACTIVE
            if (tomorrowTab.classList.contains('active')) {
                // 
                ui.caseFour(afterTomorrowMoreDetails, tomorrowMoreDetails);
                ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterAfterTomorrowMoreDetails);
                // 
            } else if(afterAfterTomorrowTab.classList.contains('active')) {
                // 
                ui.caseFour(afterTomorrowMoreDetails, afterAfterTomorrowMoreDetails);
                ui.toggleHideRemoveStyle(afterAfterTomorrowMoreDetails, afterTomorrowMoreDetails, false);
                // 
            }
            // 
        }
        // 
    });
    // 
    afterAfterTomorrowMoreDetails.firstElementChild.addEventListener('click', () => {
        // 
        if (!todayTab.classList.contains('active') && !tomorrowTab.classList.contains('active') && !afterTomorrowTab.classList.contains('active') && !afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 1: afterAfterTomorrowMoreDetails CLICKED FIRST
            ui.caseOne(afterAfterTomorrowMoreDetails);
            ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterTomorrowMoreDetails);
            // 
        } else if(!todayTab.classList.contains('active') && afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 2: afterAfterTomorrowMoreDetails CLICKED SECOND TIME (ROLL DOWN) WHEN todayMoreDetails STILL INACTIVE
            ui.caseTwo(afterAfterTomorrowMoreDetails);
            afterAfterTomorrowSummary.classList.toggle('hide');
            // ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterTomorrowMoreDetails, false);
            // 
        } else if(todayTab.classList.contains('active') && !afterAfterTomorrowTab.classList.contains('active')) {
            // 
            // CASE 3: afterAfterTomorrowMoreDetails CLICKED WHEN todayMoreDetails ACTIVE
            ui.caseThree(afterAfterTomorrowMoreDetails);
            ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterTomorrowMoreDetails);
            // 
        } else if(!todayTab.classList.contains('active') && (tomorrowTab.classList.contains('active') || afterTomorrowTab.classList.contains('active'))) {
            // 
            // CASE 4: afterTomorrowMoreDetails CLICKED WHEN todayMoreDetails INACTIVE AND ONE OF THE OTHER FOLLOWING DAY TABS ACTIVE
            if (tomorrowTab.classList.contains('active')) {
                // 
                ui.caseFour(afterAfterTomorrowMoreDetails, tomorrowMoreDetails);
                ui.toggleHideRemoveStyle(tomorrowMoreDetails, afterTomorrowMoreDetails, false);
                // 
            } else if(afterTomorrowTab.classList.contains('active')) {
                // 
                ui.caseFour(afterAfterTomorrowMoreDetails, afterTomorrowMoreDetails);
                ui.toggleHideRemoveStyle(afterTomorrowMoreDetails, afterAfterTomorrowMoreDetails, false);
                // 
            }
            // 
        }
        // 
    });
    // 
})
// 