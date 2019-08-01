const statesList = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus',
                'Fort Worth', 'Indianapolis', 'Charlotte', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Detroit', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee',
                'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Omaha', 'Raleigh', 'Colorado Springs', 'Miami', 'Virginia Beach', 'Oakland',
                'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Tampa', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Riverside', 'Corpus Christi',
                'Lexington', 'Stockton', 'St. Louis', 'Saint Paul', 'Henderson', 'Pittsburgh', 'Cincinnati', 'Anchorage', 'Greensboro', 'Plano', 'Newark', 'Lincoln', 'Orlando', 'Irvine', 'Toledo',
                'Jersey City', 'Chula Vista', 'Durham', 'Fort Wayne', 'St. Petersburg', 'Laredo', 'Buffalo', 'Madison', 'Lubbock', 'Chandler', 'Scottsdale', 'Reno', 'Glendale', 'Norfolk',
                'Winston-Salem', 'North Las Vegas', 'Gilbert', 'Chesapeake', 'Irving', 'Hialeah', 'Garland', 'Fremont', 'Richmond', 'Boise', 'Baton Rouge', 'Des Moines'];

class Typeahead {
    constructor(containerID) {
        document.getElementById(containerID).innerHTML = '<input id=\'typeahead\' type=\'text\'></input><ul id=\'suggestions\'></ul>';
        addEventListeners();
    }
}

function addEventListeners() {
    const searchBar = document.getElementById('typeahead');
    const suggestionDisplay = document.getElementById('suggestions');

    let suggestionLiElements;
    let firstOption;
    let lastOption;

    searchBar.addEventListener('input', (event) => {
        const input = event.target.value;
        if (input.length > 0) {
            displaySuggestions(input);
        } else {
            displaySuggestions(null);
        }
        suggestionLiElements = document.getElementsByClassName('suggestion');
        firstOption = suggestionLiElements[0];
        lastOption = suggestionLiElements[suggestionLiElements.length - 1];
        toggleHighlight(firstOption)
    });

    suggestionDisplay.addEventListener('click', (event) => {
        searchBar.value = event.target.textContent;
        displaySuggestions(null);
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
        toggleHighlight(event.target);
    });

    searchBar.addEventListener('keydown', (event) => {
        const previousOption = document.getElementById('highlight');
        if (event.keyCode === 40) {                 //down-arrow key
            event.preventDefault();
            toggleHighlight(previousOption);
            previousOption.nextSibling !== null ? toggleHighlight(previousOption.nextSibling) : toggleHighlight(firstOption);
        } else if (event.keyCode === 38) {          //up-arrow key
            event.preventDefault();
            toggleHighlight(previousOption);
            previousOption.previousSibling !== null ? toggleHighlight(previousOption.previousSibling) : toggleHighlight(lastOption);
        } else if (event.keyCode === 13) {          //enter key
            event.preventDefault();
            searchBar.value = previousOption.textContent;
            displaySuggestions(null);
        }
    });
}

function displaySuggestions(input) {
    let suggestions;
    if (input === null) {
        suggestions = [];
    } else {
        const regex = new RegExp(`^${input}`, 'i');
        suggestions = statesList.sort().filter(word => regex.test(word));
    }
    document.getElementById('suggestions').innerHTML = suggestions.reduce((emptyString, suggestion) => emptyString + '<li class=\'suggestion\'>'+suggestion+'</li>', '');
}

function toggleHighlight(HTMLElement) {
    HTMLElement.id = HTMLElement.id === 'highlight' ? null : 'highlight';
}
