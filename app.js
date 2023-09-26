function countrysinf (done) {
    const results = fetch("https://restcountries.com/v3.1/all");
    results
    .then(response => response.json())
    .then(data => {
        done(data);
    })
}

countrysinf(data => {
    console.log(data);
    data.forEach(country => {
        
        const myUL = document.querySelector('.cards')
        const li = document.createElement('li');
        const languages = Object.values(country.languages).map(language => language);
        console.log(languages);


        li.innerHTML = `<img src="${country.flags.svg}" alt="flag">
        <h1>${country.name.common}</h1>
        <h2>${country.name.official}</h2>
        <p>${languages.join(', ')}</p>
        <p>${country.capital}</p>
        <p>${country.flag}</p>`;


        li.classList.add('card');
        myUL.append(li);
    });

    
})