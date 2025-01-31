function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  // Adjust if current month/day is before birth month/day
  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      birth.getDate()
    );
    days += Math.floor((today - prevMonth) / (1000 * 60 * 60 * 24));
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: years,
    months: months,
    days: days,
  };
}

const calculateButton = document.querySelector(`#button`);
const dateInput = document.querySelector(`#date`);
const monthInput = document.querySelector(`#month`);
const yearInput = document.querySelector(`#year`);

const yearResult = document.querySelector(`.years`);
const monthResult = document.querySelector(`.months`);
const dateResult = document.querySelector(`.days`);

const errorAlert = document.querySelector(`.alert`);
const errorAlertt = document.querySelector(`.alertt`);
const errorAlerttt = document.querySelector(`.alerttt`);

const nameInput = document.querySelector('#name');
const nameAlert = document.querySelector('.name-alert');

const greetings = ["Hai", "Halo"];

calculateButton.addEventListener("click", runCalculation);

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isDateInputValid(){
    const val = dateInput.value;
    const monthVal = parseInt(monthInput.value);
    const yearVal = parseInt(yearInput.value);
    
    if(val.length > 2 || val.length === 0) {
        return false;
    }
    
    const dateVal = parseInt(val);
    
    if(monthVal === 2) {
        const maxDays = isLeapYear(yearVal) ? 29 : 28;
        if(dateVal > maxDays) {
            return false;
        }
    } else if(dateVal > 31) {
        return false;
    }
    
    return true;
}

dateInput.addEventListener(`input`, function (e) {
    if(isDateInputValid()){
        errorAlert.classList.add(`not-show`);
    } else{
        errorAlert.classList.remove(`not-show`);
    }
});

function isMonthInputValid(){
    const val = monthInput.value
    if(val.length > 2 || val.length === 0 || parseInt(val) > 12){
        return false
    } else{
        return true
    }
}

monthInput.addEventListener(`input`, function (e){
    if(dateInput.value) {
        if(isDateInputValid()){
            errorAlert.classList.add(`not-show`);
        } else{
            errorAlert.classList.remove(`not-show`);
        }
    }
    
    if(isMonthInputValid()) {
        errorAlertt.classList.add(`not-show`);
    } else {
        errorAlertt.classList.remove(`not-show`);
    }
});

function isYearInputValid(){
    const val = yearInput.value;
    const currentYear = new Date().getFullYear();
    if(val.length !== 4 || val.length === 0 || parseInt(val) > currentYear){
        return false;
    }
    return true;
}

yearInput.addEventListener(`input`, function (e){
    if(isYearInputValid()){
        errorAlerttt.classList.add(`not-show`);
    } else {
        errorAlerttt.classList.remove(`not-show`);
    }
});

function isNameInputValid() {
    const val = nameInput.value.trim();
    return val.length > 0;
}

nameInput.addEventListener('input', function(e) {
    if(isNameInputValid()) {
        nameAlert.classList.add('not-show');
    } else {
        nameAlert.classList.remove('not-show');
    }
});

function getZodiacSign(day, month) {
    const zodiacSigns = [
        { name: 'Capricorn', start: [1, 1], end: [1, 19], image: 'zodiac-images/capricorn.png' },
        { name: 'Aquarius', start: [1, 20], end: [2, 18], image: 'zodiac-images/aquarius.png' },
        { name: 'Pisces', start: [2, 19], end: [3, 20], image: 'zodiac-images/pisces.png' },
        { name: 'Aries', start: [3, 21], end: [4, 19], image: 'zodiac-images/aries.png' },
        { name: 'Taurus', start: [4, 20], end: [5, 20], image: 'zodiac-images/taurus.png' },
        { name: 'Gemini', start: [5, 21], end: [6, 20], image: 'zodiac-images/gemini.png' },
        { name: 'Cancer', start: [6, 21], end: [7, 22], image: 'zodiac-images/cancer.png' },
        { name: 'Leo', start: [7, 23], end: [8, 22], image: 'zodiac-images/leo.png' },
        { name: 'Virgo', start: [8, 23], end: [9, 22], image: 'zodiac-images/virgo.png' },
        { name: 'Libra', start: [9, 23], end: [10, 22], image: 'zodiac-images/libra.png' },
        { name: 'Scorpio', start: [10, 23], end: [11, 21], image: 'zodiac-images/scorpio.png' },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21], image: 'zodiac-images/sagittarius.png' },
        { name: 'Capricorn', start: [12, 22], end: [12, 31], image: 'zodiac-images/capricorn.png' }
    ];

    for (let sign of zodiacSigns) {
        if ((month === sign.start[0] && day >= sign.start[1]) || 
            (month === sign.end[0] && day <= sign.end[1])) {
            return sign;
        }
    }
    return zodiacSigns[0]; 
}

function updateZodiacDisplay(day, month) {
    const zodiacResult = document.querySelector('.zodiac-result');
    const zodiacImage = document.querySelector('#zodiac-image');
    const zodiacName = document.querySelector('.zodiac-name');
    
    const zodiac = getZodiacSign(parseInt(day), parseInt(month));
    zodiacImage.src = zodiac.image;
    zodiacImage.alt = zodiac.name;
    zodiacName.textContent = zodiac.name;
    zodiacResult.classList.remove('not-show');
}

function getRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

function runCalculation() {
    if(!isDateInputValid() || !isMonthInputValid() || !isYearInputValid() || !isNameInputValid()){
        return;
    }

    const yourAgeText = document.querySelector('.your-age');
    const greeting = getRandomGreeting();
    yourAgeText.textContent = `${greeting} ${nameInput.value}, umur kamu adalah:`;

    const fullBirth = `${yearInput.value}-${monthInput.value}-${dateInput.value}`;
    const result = calculateAge(fullBirth);

    yearResult.textContent = result.years;
    monthResult.textContent = result.months;
    dateResult.textContent = result.days;

    updateZodiacDisplay(dateInput.value, monthInput.value);
}
