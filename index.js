const list = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus',
                'Fort Worth', 'Indianapolis', 'Charlotte', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Detroit', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee',
                'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Omaha', 'Raleigh', 'Colorado Springs', 'Miami', 'Virginia Beach', 'Oakland',
                'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans'];
const searchBar = document.getElementById('typeahead');
var suggestions = [];

searchBar.addEventListener('input', (event) => {
    const input = event.target.value;
    if(input.length > 0) {
        const regex = new RegExp(`^${input}`, 'i');
        suggestions = list.sort().filter(v => regex.test(v));
    } else {
        suggestions = []
    }
    displaySuggestions();
});

function displaySuggestions() {
    document.getElementById('suggestions').innerHTML = (suggestions.map(element => '<li>'+element+'</li>')).join('');
}