const statesList = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus',
                'Fort Worth', 'Indianapolis', 'Charlotte', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Detroit', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee',
                'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Omaha', 'Raleigh', 'Colorado Springs', 'Miami', 'Virginia Beach', 'Oakland',
                'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Tampa', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Riverside', 'Corpus Christi',
                'Lexington', 'Stockton', 'St. Louis', 'Saint Paul', 'Henderson', 'Pittsburgh', 'Cincinnati', 'Anchorage', 'Greensboro', 'Plano', 'Newark', 'Lincoln', 'Orlando', 'Irvine', 'Toledo',
                'Jersey City', 'Chula Vista', 'Durham', 'Fort Wayne', 'St. Petersburg', 'Laredo', 'Buffalo', 'Madison', 'Lubbock', 'Chandler', 'Scottsdale', 'Reno', 'Glendale', 'Norfolk',
                'Winston-Salem', 'North Las Vegas', 'Gilbert', 'Chesapeake', 'Irving', 'Hialeah', 'Garland', 'Fremont', 'Richmond', 'Boise', 'Baton Rouge', 'Des Moines'];
const searchBar = document.getElementById('typeahead');
const suggestionDisplay = document.getElementById('suggestions');

let suggestions;
let HTMLSuggestions;
let firstOption;

searchBar.addEventListener('input', (event) => {
    const input = event.target.value;
    if (input.length > 0) {
        const regex = new RegExp(`^${input}`, 'i');
        suggestions = statesList.sort().filter(word => regex.test(word));
    } else {
        suggestions = [];
    }
    displaySuggestions();
    HTMLSuggestions = Array.from(document.querySelectorAll('li.suggestion'));
    firstOption = HTMLSuggestions[0];
    lastOption = HTMLSuggestions[HTMLSuggestions.length - 1];
    toggleHighlight(firstOption)
});

suggestionDisplay.addEventListener('click', (event) => {
    searchBar.value = event.target.textContent;
    suggestions = [];
    displaySuggestions();
});

suggestionDisplay.addEventListener('mouseover', (event) => {
    if (event.target !== firstOption) {
        toggleHighlight(event.target);
        if (firstOption.id === 'highlight') {
            toggleHighlight(firstOption);
        }
    } else if (firstOption.id !== 'highlight') {
        toggleHighlight(firstOption);
    }
});

suggestionDisplay.addEventListener('mouseout', (event) => {
    event.target.id = null;
});

searchBar.addEventListener('keydown', (event) => {
    previousOption = document.getElementById('highlight');
    if (event.keyCode === 40) {
        event.preventDefault();
        toggleHighlight(previousOption);
        previousOption.nextSibling !== null ? toggleHighlight(previousOption.nextSibling) : toggleHighlight(firstOption);
    } else if (event.keyCode === 38) {
        event.preventDefault();
        toggleHighlight(previousOption);
        previousOption.previousSibling !== null ? toggleHighlight(previousOption.previousSibling) : toggleHighlight(lastOption);
    } else if (event.keyCode === 13) {
        event.preventDefault();
        searchBar.value = previousOption.textContent;
    }
});

function displaySuggestions() {
    document.getElementById('suggestions').innerHTML = (suggestions.map(element => '<li class=\'suggestion\'>'+element+'</li>')).join('');
}

function toggleHighlight(HTMLElement) {
    HTMLElement.id === 'highlight' ? HTMLElement.id = null : HTMLElement.id = 'highlight';
}