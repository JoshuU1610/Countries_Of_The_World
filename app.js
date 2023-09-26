const inputSearch = document.getElementById('Input-Search')
const myUL = document.querySelector('.cards');

function countrysinf (done) {
    const results = fetch("https://restcountries.com/v3.1/all");
    results
    .then(response => response.json())
    .then(data => {
        done(data);
    })
}

// function countrysclim (done1, lat, lon) {
//     const climaResponse = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e07ea757fc89cb3ee1352cc6930ee193`);

//     climaResponse
//     .then(response => response.jason())
//     .then(data1 => {
//         done1(data1)
//     })
// }

// countrysclim(async data1, lat, lon => {
//     console.log(data1);
// })

countrysinf(async data => {
    console.log(data);
    data.forEach(async country => {
        
        
        const li = document.createElement('li');
        console.log(country.code);
        console.log('languages' in country);
        let languages = ' ';
        if('languages' in country){
            languages = Object.values(country?.languages).toLocaleString();
        } else {
            languages = 'Dont Have';
        }
        let lat = country.latlng[0];
        let lon = country.latlng[1];
        console.log(lat);
        console.log(lon);
        
        console.log(clima);

        li.innerHTML = `<img src="${country.flags.svg}" alt="flag">
        <h1>${country.name.common}</h1>
        <h2>${country.name.official}</h2>
        <p><span>Languages:</span> ${languages}</p>
        <p><span>Capital:</span> ${country.capital}</p>
        <p><span>Code:</span> ${country.flag}</p>
        <p>clima: ${clima}</p>`;
        


        li.classList.add('card');
        li.classList.add('hide');
        myUL.append(li);
    });

    
})

inputSearch.addEventListener('keyup', e => {
    const valorFiltro = inputSearch.value.toLowerCase();
    const lista = document.querySelector(".cards"); 
    const elementos = lista.getElementsByTagName("li");
    const regex = /^\s*$/;

    for (let i = 0; i < elementos.length; i++) {
        const h1 = elementos[i].getElementsByTagName("h1")[0];
        const textoH1 = h1.textContent.toLowerCase();
        let coincide = true;
        
        for (let j = 0; j < valorFiltro.length; j++) {
          if (textoH1[j] !== valorFiltro[j]) {
            coincide = false;
            break;
          }
        }
    
        if (coincide) {
          elementos[i].style.display = "block";
        } else {
          elementos[i].style.display = "none";
        }
      }

      

    if(inputSearch.value === '' || regex.test(inputSearch)){
        for (let i = 0; i < elementos.length; i++){
            elementos[i].style.display = "none";
        }
    }
    
})