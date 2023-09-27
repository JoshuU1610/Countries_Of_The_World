const inputSearch = document.getElementById('Input-Search')
const myUL = document.querySelector('.cards');
const modal = document.querySelector('.modal')

function countrysinf (done) {
    const results = fetch("https://restcountries.com/v3.1/all");
    results
    .then(response => response.json())
    .then(data => {
        done(data);
    })
}

const infoclim = async (a , b) => {
    try {
        const climaResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=e07ea757fc89cb3ee1352cc6930ee193`);
        const data = await climaResponse.json();
        const temp = parseInt(data.main.temp);
        console.log(temp);
        return temp;
    } catch (error) {
        console.error(error);
    }
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
        // console.log(country.code);
        // console.log('languages' in country);
        let languages = ' ';
        if('languages' in country){
            languages = Object.values(country?.languages).toLocaleString();
        } else {
            languages = 'Dont Have';
        }
        let lat = country.latlng[0];
        let lon = country.latlng[1];
        // console.log(lat);
        // console.log(lon);

        li.innerHTML = `<img src="${country.flags.svg}" alt="flag">
        <h1>${country.name.common}</h1>
        <button class="btn--2">See more</button>`;
        

        // li.innerHTML = `<img src="${country.flags.svg}" alt="flag">
        // <h1>${country.name.common}</h1>
        // <h2>${country.name.official}</h2>
        // <p><span>Languages:</span> ${languages}</p>
        // <p><span>Capital:</span> ${country.capital}</p>
        // <p><span>Code:</span> ${country.flag}</p>
        // <p>clima:</p>`;
        

        // console.log(indexOf(country));

        // console.log(data.indexOf(country));
        li.classList.add('card');
        li.classList.add('hide');
        li.setAttribute('index',`${data.indexOf(country)}`)
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
          elementos[i].style.display = "flex";
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

document.addEventListener('click', async e => {
    try{
        e.preventDefault();
    const target = e.target;
    const boton = target.matches('.btn--2');
    const boton2 = target.matches('.btn--3');
    
    
    
    if (boton) {
        const padre = target.parentElement;
        const index = parseInt(padre.getAttribute('index'));
        countrysinf(async data => {
            const flag = data[index].flags.svg;
            let languages = ' ';
            if('languages' in data[index]){
                languages = Object.values(data[index]?.languages).toLocaleString();
            } else {
                languages = 'Dont Have';
            }

            let lat = data[index].latlng[0];
            let lon = data[index].latlng[1];

            const temp = await infoclim(lat,lon);
            
            const clima = temp - 273.15;
            console.log(temp);


            modal.innerHTML = '';

            const div = document.createElement('div');

            div.innerHTML = `
            <img src="${flag}" alt="bandera">
            <h1>${data[index].name.common}</h1>
            <h2>${data[index].name.official}</h2>
            <p><span>Languages:</span> ${languages}</p>
            <p><span>Capital:</span> ${data[index].capital}</p>
            <p><span>Code:</span> ${data[index].flag}</p>
            <p>temperatura: ${clima} °C</p>
            <button class="btn--3">close</button>
            `;

            div.classList.add('modal-container');
            modal.appendChild(div);
        })
        modal.classList.add('modal-show')
    } else if (boton2){
        modal.classList.remove('modal-show')
    }
    } catch(error){
        console.error(error);
    }
  });