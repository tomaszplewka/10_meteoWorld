// 
class Weather {
    // 
    constructor(key, city = 'Calgary') {
        // 
        this.key = key;
        this.city = city;
        // 
	}
    // 
    setCity(city) {
        // 
        this.city = city;
        // 
    }
    // 
    async getCurrentForecast(city = this.city, base = 'https://api.openweathermap.org/data/2.5/weather') {
        // 
        const url = `${base}?q=${city}&units=metric&appid=${this.key}`;
        // 
        const response = await fetch(url);
        // 
        if (response.status !== 200) {
            // 
            throw new Error('City not found');
            // 
        }
        // 
        const data = await response.json();
        // 
        return data;
        // 
    }
    // 
    async get3DayForecast(lat, lon, base = 'https://api.openweathermap.org/data/2.5/onecall') {
        // 
        const url = `${base}?lat=${lat}&lon=${lon}&units=metric&appid=${this.key}`;
        // 
        const response = await fetch(url);
        const data = await response.json();
        // 
        return data;
        // 
    }
    // 
    updateMainScreen(location, weather, temperature, timezone) {
        // 
        // city
        city.textContent = location.toUpperCase();
        // 
        // icon
        todayMainImage.setAttribute('src', `icons/${weather.icon}_${weather.id}.png`);
        // 
        // background
        mainBodyToday.parentElement.style.backgroundImage = `url(${UI.chooseBackground(weather)})`;
        // 
        // main text
        todayMainText.textContent = weather.main.toUpperCase();
        // 
        // main temperature
        todayMainTemperature.textContent = (temperature.toFixed() === "-0" ? 0 : temperature.toFixed()) + '\xB0';
        // 
        // main day
        todayMainDay.textContent = dateFns.format(dateFns.addHours(new Date(), ((new Date()).getTimezoneOffset() / 60) + timezone / 3600), 'dddd').toUpperCase();
        // 
        // main time
        todayMainTime.textContent = dateFns.format(dateFns.addHours(new Date(), ((new Date()).getTimezoneOffset() / 60) + timezone / 3600), 'h:mm A');
        // 
    };
    // 
    updateTodayCurrentFeelsLike(current, feelsLike) {
        // 
        // current and feels like temperatures
        todayTabCurrent.textContent = (current.toFixed() === "-0" ? 0 : current.toFixed()) + '\xB0';
        todayTabFeelsLike.textContent = (feelsLike.toFixed() === "-0" ? 0 : feelsLike.toFixed()) + '\xB0';
        // 
    };
    // 
    updateCloudsHumidityWindPressure(clouds, cloudsTarget, humidity, humidityTarget, wind_deg, wind_speed, windTarget, pressure, pressureTarget) {
        // 
        // clouds, humidity, wind & pressure
        cloudsTarget.textContent = clouds + '%';
        humidityTarget.textContent = humidity + '%';
        let windDirection = '';
        if (wind_deg === 0 || wind_deg === 360) {
            // 
            windDirection = 'N';
            // 
        } else if (wind_deg === 90) {
            // 
            windDirection = 'W';
            // 
        } else if (wind_deg === 180) {
            // 
            windDirection = 'S';
            // 
        } else if (wind_deg === 270) {
            // 
            windDirection = 'E';
            // 
        } else if (wind_deg > 0 && wind_deg < 90) {
            // 
            windDirection = 'NW';
            // 
        } else if (wind_deg > 90 && wind_deg < 180) {
            // 
            windDirection = 'SW';
            // 
        } else if (wind_deg > 180 && wind_deg < 270) {
            // 
            windDirection = 'SE';
            // 
        } else if (wind_deg > 270 && wind_deg < 360) {
            // 
            windDirection = 'SE';
            // 
        }
        windTarget.firstElementChild.textContent = windDirection;
        windTarget.lastElementChild.textContent = wind_speed + ' m/s';
        pressureTarget.textContent = pressure + ' hPa';
        // 
    };
    // 
    updateSunriseSunset(sunrise, sunriseTarget, sunset, sunsetTarget, dayDuration, nightDuration) {
        // 
        // sunrise, sunset, day & night durations
        sunriseTarget.textContent = dateFns.format(new Date(sunrise * 1000), 'h:mm A');
        sunsetTarget.textContent = dateFns.format(new Date(sunset * 1000), 'h:mm A');
        const timestampDay = ((new Date(sunset * 1000)).getTime() - (new Date(sunrise * 1000)).getTime()) / 1000;
        const hoursDay = Math.floor(timestampDay / 60 / 60);
        const minutesDay = Math.floor(timestampDay / 60) - (hoursDay * 60);
        const hoursNight = Math.floor(24 - timestampDay / 60 / 60);
        const minutesNight = 60 - minutesDay;
        dayDuration.textContent = `${hoursDay} h ${minutesDay} min`;
        nightDuration.textContent = `${hoursNight} h ${minutesNight} min`;
        // 
    };
    // 
    updateBackgroundDescriptionIcon (weather, descTarget, backTarget, imageTarget) {
        // 
        // today tab description
        descTarget.textContent = weather.description;
        // 
        // background
        backTarget.style.backgroundImage = `url(${UI.chooseBackground(weather)})`;
        // 
        // icon
        imageTarget.setAttribute('src', `icons/${weather.icon}_${weather.id}.png`);
        // 
    };
    // 
    updateHighLowTemperature(day, weather, highTarget, lowTarget) {
        // 
        // high & low temperatures
        highTarget.textContent = (weather[day].temp.max.toFixed() === "-0" ? 0 : weather[day].temp.max.toFixed()) + '\xB0';
        lowTarget.textContent = (weather[day].temp.min.toFixed() === "-0" ? 0 : weather[day].temp.min.toFixed()) + '\xB0';
        // 
    };
    // 
    updateSummaryInfo(day, weather, descriptionTarget, tempTarget, iconTarget) {
        // 
        // summary - description, current T & weather icon
        descriptionTarget.textContent = weather[day].weather[0].main;
        tempTarget.textContent = (weather[day].temp.max.toFixed() === "-0" ? 0 : weather[day].temp.max.toFixed()) + '\xB0';
        iconTarget.setAttribute('src', `icons/${weather[day].weather[0].icon}_${weather[day].weather[0].id}.png`);
        // 
    };
    // 
    updateDayName(result, nameTarget) {
        // 
        nameTarget.textContent = dateFns.format(new Date(result.dt * 1000), 'dddd');
        // 
    };
    // 
}
// 
const key = '638d4b8ca77fa08c392ac8c8d80993e8';
// 
class UI {
    // 
    rollUnrollTodayTab(todayTarget, followingDays, followingDayTab = false) {
        // 
        // update navbarHeight
        navbarHeight = window.innerHeight > 600 ? 65 : 55;
        // 
        // set & update screen width & height depending on the actual screen dimensions
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        if (window.innerWidth <= window.innerHeight && window.innerWidth > 768) {
            // 
            screenWidth = 768;
            // 
        } else if (window.innerWidth > window.innerHeight && window.innerWidth > 1024) {
            // 
            screenWidth = 1024;
            // 
        }
        if (window.innerHeight > 1024) { screenHeight = 1024; }
        // 
        // make wrapper of clicked day tab active and hide content on today tab
        if (!followingDayTab) { this.styleDayTabContent(todayTarget); }
        // 
        // strip absolute positioning and height properties off of the wrapper
        todayTarget.parentElement.classList.toggle('following-day-wrapper');
        // 
        if (!todayTarget.parentElement.classList.contains('following-day-wrapper')) {
            // 
            // unroll
            todayTarget.style.width = (screenWidth - UI.convertRemToPixels(2)) + 'px';
            // 
            Array.from(followingDays).forEach((followingDay) => {
                // 
                if (!followingDayTab) {
                    // 
                    if (window.innerWidth > window.innerHeight) {
                        // 
                        followingDay.parentElement.style.height = 110 + 'px';
                        // 
                    } else {
                        // 
                        followingDay.parentElement.style.height = screenHeight - navbarHeight - todayTarget.parentElement.offsetHeight + 'px';
                        // 
                    }
                    // 
                }
                // 
                followingDay.parentElement.classList.toggle('following-day-wrapper');
                followingDay.parentElement.classList.toggle('hide-behind');
                // 
                followingDay.nextElementSibling.classList.toggle('hide');
                // 
                let summaryTabHeight = followingDay.parentElement.style.height;
                if (window.innerWidth > window.innerHeight) { summaryTabHeight = 110 + 'px'; }
                followingDay.nextElementSibling.style.height = summaryTabHeight;
                // 
            });
            // 
        } else {
            //
            // roll
            currentHeight = followingDays[0].parentElement.offsetHeight;
            if (window.innerWidth > window.innerHeight) { currentHeight = 110; }
            // 
            todayTarget.style.width = (screenWidth - UI.convertRemToPixels(2)) / 3 + 'px';
            // 
            Array.from(followingDays).forEach((followingDay) => {
                // 
                if (!followingDayTab) {
                    // 
                    followingDay.parentElement.removeAttribute('style');
                    followingDay.parentElement.style.height = currentHeight + 'px';
                    // 
                }
                // 
                followingDay.parentElement.classList.toggle('following-day-wrapper');
                followingDay.parentElement.classList.toggle('hide-behind');
                // 
                if (!followingDay.nextElementSibling.classList.contains('hide')) {
                    // 
                    followingDay.nextElementSibling.classList.toggle('hide');
                    // 
                }
                // 
            });
            // 
        }
        // 
        mainBodyToday.classList.toggle('collapsed');
        // 
    };
    // 
    styleDayTab(target, chevronIcon = true, lower = true) {
        // 
        if (lower) { target.classList.toggle('lower'); }
        // 
        target.firstElementChild.classList.toggle('has-text-weight-bold');
        target.firstElementChild.classList.toggle('is-size-7');
        target.firstElementChild.classList.toggle('is-size-6');
        // 
        if (chevronIcon) {
            // 
            target.firstElementChild.firstElementChild.classList.toggle('fa-chevron-up');
            target.firstElementChild.firstElementChild.classList.toggle('fa-chevron-down');
            target.firstElementChild.firstElementChild.classList.toggle('is-size-7');
            target.firstElementChild.firstElementChild.classList.toggle('is-size-6');
            // 
        }
        // 
    };
    // 
    styleDayTabContent(target, followingDayTab = false, removeAttr = false) {
        // 
        target.parentElement.classList.toggle('active');
        target.nextElementSibling.classList.toggle('hide');
        // 
        if (followingDayTab) { target.nextElementSibling.nextElementSibling.classList.toggle('hide'); }
        // 
        if (removeAttr) { target.parentElement.removeAttribute('style'); }
        // 
    };
    // 
    setHeight(target, navHeight, todayTabHeight) {
        // 
        let screenHeight = window.innerHeight;
        if (window.innerHeight > 1024) { screenHeight = 1024; }
        // 
        if (window.innerWidth > window.innerHeight) {
            // 
            target.style.height = 110 + 'px';
            // 
        } else {
            // 
            target.style.height = screenHeight - navHeight - todayTabHeight.parentElement.offsetHeight + 'px';
            // 
        }
        // 
    };
    // 
    styleSwitchTabs(targetFrom, fromDefault = [false, false, true, true], targetTo, toDefault = [false, false, true, true]) {
        // 
        this.styleDayTabContent(targetTo, toDefault[0], toDefault[1]);
        this.styleDayTab(targetTo, toDefault[2], toDefault[3]);
        // 
        this.styleDayTabContent(targetFrom, fromDefault[0], fromDefault[1]);
        this.styleDayTab(targetFrom, fromDefault[2], fromDefault[3]);
        // 
    };
    // 
    toggleHideRemoveStyle(tab1, tab2, removeStyle = true) {
        // 
        if (removeStyle) {
            // 
            tab1.parentElement.removeAttribute('style');
            tab2.parentElement.removeAttribute('style');
            // 
        }
        // 
        tab1.nextElementSibling.classList.toggle('hide');
        tab2.nextElementSibling.classList.toggle('hide');
        // 
    };
    // 
    caseOne(target) {
        //
        // tomorrow, afterTomorrow or afterAfterTomorrow CLICKED FIRST
        // 
        // unroll today tab first
        this.rollUnrollTodayTab(todayMoreDetails, followingDays, true);
        todayMoreDetails.classList.toggle('lower');
        // 
        // unroll tomorrow, afterTomorrow or afterAfterTomorrow tab
        this.styleDayTab(target, false);
        this.styleDayTabContent(target, true, true);
        todayMoreDetails.parentElement.style.height = navbarOffset + 'px';
        this.setHeight(target.nextElementSibling.nextElementSibling, navbarHeight, todayMoreDetails);
        // 
        if (window.innerWidth > window.innerHeight) {
            // 
            target.nextElementSibling.nextElementSibling.removeAttribute('style');
            // 
        }
        // 
    };
    // 
    caseTwo(target) {
        // 
        // tomorrow, afterTomorrow or afterAfterTomorrow CLICKED SECOND TIME (ROLL DOWN) WHEN todayMoreDetails STILL INACTIVE
        // 
        // roll down today tab first
        this.rollUnrollTodayTab(todayMoreDetails, followingDays, true);
        todayMoreDetails.classList.toggle('lower');
        // 
        // roll down tomorrow, afterTomorrow or afterAfterTomorrow
        this.styleDayTab(target, false);
        this.styleDayTabContent(target, true);
        todayMoreDetails.parentElement.removeAttribute('style');
        this.setHeight(target.nextElementSibling.nextElementSibling, navbarHeight, todayMoreDetails);
        // 
        if (window.innerWidth > window.innerHeight) {
            // 
            target.nextElementSibling.nextElementSibling.removeAttribute('style');
            // 
        }
        // 
    };
    // 
    caseThree(target) {
        //
        // CASE 3: tomorrow, afterTomorrow or afterAfterTomorrow CLICKED WHEN todayMoreDetails ACTIVE
        this.styleSwitchTabs(todayMoreDetails, [false, false, true, false], target, [true, true, false, true]);
        todayMoreDetails.parentElement.style.height = navbarOffset + 'px';
        this.setHeight(target.nextElementSibling.nextElementSibling, navbarHeight, todayMoreDetails);
        // 
        if (window.innerWidth > window.innerHeight) {
            // 
            target.nextElementSibling.nextElementSibling.removeAttribute('style');
            // 
        }
        // 
    };
    // 
    caseFour(target, tabFrom, targetDefaults = [true, true, false, true], tabFromDefaults = [true, false, false, true]) {
        // 
        // CASE 4: tomorrow, afterTomorrow or afterAfterTomorrow CLICKED WHEN todayMoreDetails INACTIVE AND ONE OF THE OTHER FOLLOWING DAY TABS ACTIVE
        this.styleSwitchTabs(tabFrom, tabFromDefaults, target, targetDefaults);
        this.setHeight(target.nextElementSibling.nextElementSibling, navbarHeight, todayMoreDetails);
        // 
        if (window.innerWidth > window.innerHeight) {
            // 
            target.nextElementSibling.nextElementSibling.removeAttribute('style');
            // 
        }
        // 
    };
    // 
    static convertRemToPixels(rem) { 
        // 
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        // 
    }
    // 
    static chooseBackground(result) {
        // 
        let filename = '';
        const icon = result.icon.substring(0,2);
        const dayNight = result.icon.substring(2) === 'd';
        const iconId = result.id;
        //
        switch (icon) {
            //
            case '01':
            case '02':
            case '03':
            case '04':
            case '09':
            case '10':
                //
                filename = dayNight ? `imgs/${icon}d_${iconId}_background.jpg` : `imgs/${icon}n_${iconId}_background.jpg`;
                //
                break;
            //
            case '11':
            case '13':
            case '50':
                //
                filename = dayNight ? `imgs/${icon}d_background.jpg` : `imgs/${icon}n_background.jpg`;
                //
                break;
            //
        }
        //
        return filename;
        // 
    };
    // 
    windowSizeChange() {
        // 
        const secondTab = document.querySelector('.following-day-mobile-offset-1');
        const thirdTab = document.querySelector('.following-day-mobile-offset-2');
        // 
        let screenWidth = window.innerWidth;
        if (window.innerWidth <= window.innerHeight && window.innerWidth > 768) {
            // 
            screenWidth = 768;
            // 
        } else if (window.innerWidth > window.innerHeight && window.innerWidth > 1024) {
            // 
            screenWidth = 1024;
            // 
        }
        // 
        todayMoreDetails.removeAttribute('style');
        todayMoreDetails.style.width = (screenWidth - UI.convertRemToPixels(2)) / 3 + 'px';
        // 
        currentHeight = followingDays[0].parentElement.parentElement.previousElementSibling.offsetHeight;
        if (window.innerWidth > window.innerHeight) { currentHeight = 110; }
        // 
        Array.from(followingDays).forEach((followingDay) => {
            // 
            followingDay.removeAttribute('style');
            // 
            if (window.innerWidth <= window.innerHeight && window.innerWidth > 768) {
                // 
                secondTab.style.left = ((768 - UI.convertRemToPixels(2)) / 3) + UI.convertRemToPixels(1) + 'px';
                thirdTab.style.left = 2 * ((768 - UI.convertRemToPixels(2)) / 3) + UI.convertRemToPixels(1) + 'px';
                // 
            }
            // 
            followingDay.style.width = (screenWidth - UI.convertRemToPixels(2)) / 3 + 'px';
            followingDay.parentElement.style.height = currentHeight + 'px';
            // 
        });
        // 
        // if any weather tab is active, close it
        if (todayTab.classList.contains('active')) {
            // 
            this.rollUnrollTodayTab(todayMoreDetails, followingDays);
            this.styleDayTab(todayMoreDetails);
            // 
        } else if (tomorrowTab.classList.contains('active')) {
            // 
            this.caseTwo(tomorrowMoreDetails);
            tomorrowSummary.classList.toggle('hide');
            // 
        } else if (afterTomorrowTab.classList.contains('active')) {
            // 
            this.caseTwo(afterTomorrowMoreDetails);
            afterTomorrowSummary.classList.toggle('hide');
            // 
        } else if (afterAfterTomorrowTab.classList.contains('active')) {
            // 
            this.caseTwo(afterAfterTomorrowMoreDetails);
            afterAfterTomorrowSummary.classList.toggle('hide');
            // 
        }
        // 
    }
    // 
}