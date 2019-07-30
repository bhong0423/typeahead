const list = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus',
                'Fort Worth', 'Indianapolis', 'Charlotte', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Detroit', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee',
                'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Omaha', 'Raleigh', 'Colorado Springs', 'Miami', 'Virginia Beach', 'Oakland',
                'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Tampa', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Riverside', 'Corpus Christi',
                'Lexington', 'Stockton', 'St. Louis', 'Saint Paul', 'Henderson', 'Pittsburgh', 'Cincinnati', 'Anchorage', 'Greensboro', 'Plano', 'Newark', 'Lincoln', 'Orlando', 'Irvine', 'Toledo',
                'Jersey City', 'Chula Vista', 'Durham', 'Fort Wayne', 'St. Petersburg', 'Laredo', 'Buffalo', 'Madison', 'Lubbock', 'Chandler', 'Scottsdale', 'Reno', 'Glendale', 'Norfolk',
                'Winston-Salem', 'North Las Vegas', 'Gilbert', 'Chesapeake', 'Irving', 'Hialeah', 'Garland', 'Fremont', 'Richmond', 'Boise', 'Baton Rouge', 'Des Moines'];
const searchBar = document.getElementById('typeahead');
const selection = document.getElementById('suggestions');
const option = document.querySelectorAll('li');

var suggestions = [];

searchBar.addEventListener('input', (event) => {
    const input = event.target.value;
    if(input.length > 0) {
        const regex = new RegExp(`^${input}`, 'i');
        suggestions = list.sort().filter(v => regex.test(v));
    } else {
        suggestions = [];
    }
    displaySuggestions();
});

selection.addEventListener('click', (event) => {
    searchBar.value = event.target.textContent;
    suggestions = [];
    displaySuggestions();
});

function displaySuggestions() {
    document.getElementById('suggestions').innerHTML = (suggestions.map(element => '<li>'+element+'</li>')).join('');
}