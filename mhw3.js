
//Keys and endpoints
const key_weather_api = '87c3be4e1b944d2b926203022232804';		
const forecast_endpoint = 'https://api.weatherapi.com/v1/future.json?' 




//Key and secret for Amadeus OAuth2.0 
const key_amadeus = 'PgGTByJ0dsFOZdGYvASR17Gu34GxjzbG'
const secret_amadeus = '5RZt7AsX55CPBMVm'
const amadeus_api_endpoint_token = 'https://test.api.amadeus.com/v1/security/oauth2/token' 
const amadeus_api_endpoint = 'https://test.api.amadeus.com/v2/shopping/flight-offers?'






function onJsonWeather(json){
    console.log('JSON ricevuto');

    const library = document.querySelector('#meteo');
    library.innerHTML = '';

  

    const results_day = json.forecast;
  
    if(results_day == null)
    {
      const errore = document.createElement("h3"); 
      errore.textContent = " Non sono disponibili previsioni meteo per tale giorno di partenza !";
      library.appendChild(errore);
      return
      }

    const container = document.createElement('div');
    container.classList.add('b_a_r');

    
    const citta = json.location.name;  
    const country = json.location.country;

    const testo = document.createElement('h3');
    testo.textContent= "Previsioni  meteo " + citta + ' (' + country +')' + " il giorno d'arrivo (" + date + ") " + ": " ;
    const date = results_day.forecastday[0].date;

    const max_temp_data = results_day.forecastday[0].day.maxtemp_c;
    const max_temp = document.createElement('div');
    max_temp.textContent = 'Temperatura massima : ' + max_temp_data + '°';

    const min_temp_data = results_day.forecastday[0].day.mintemp_c;
    const min_temp = document.createElement('div');
    min_temp.textContent = 'Temperatura minima : ' + min_temp_data + '°';

    const vento_data = results_day.forecastday[0].day.maxwind_kph;
    const vento = document.createElement('div');
    vento.textContent = 'Vento : ' + vento_data + ' Km/h';

    const umidita_data = results_day.forecastday[0].day.avghumidity;
    const umidita = document.createElement('div');
    umidita.textContent = 'Percentuale di umidità : ' +umidita_data + '%';

    const icona = results_day.forecastday[0].day.condition.icon;
    const img = document.createElement('img');
    img.classList.add('formato');
    img.src= icona;


    const album = document.createElement('div');
    album.classList.add('meteo');

    container.appendChild(max_temp);
    container.appendChild(min_temp);
    container.appendChild(vento);
    container.appendChild(umidita);

    
    album.appendChild(img);
    album.appendChild(container);
    
    library.appendChild(testo);
    library.appendChild(album);

    
}


function onJson(json){

    console.log('JSON ricevuto');

    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    if (json.status == 400) {
      const errore = document.createElement("h3"); 
      const messaggio = document.createTextNode(json.detail); 
      errore.appendChild(messaggio); 
      library.appendChild(errore);
      return
      }

    const results = json.data;
    if(results.length == 0)
    {
    const errore = document.createElement("h3"); 
    const messaggio = document.createTextNode("Nessun volo trovato per questa destinazione e/o date !"); 
    errore.appendChild(messaggio); 
    library.appendChild(errore);
    }

    for(result of results)
    {
      if(result != null){
        const prezzo_data = result.price.total;
        const valuta = result.price.currency;
        const content = document.createElement('div');
        content.textContent = 'Prezzo biglietto : ' + prezzo_data + ' ' + valuta;
        content.classList.add('prezzo');
        content.classList.add('color');
        

        const biglietto = document.createElement('div');
        biglietto.classList.add('biglietto');

        const scritt_a = document.createElement('div');
        scritt_a.classList.add('b_a_r');
        

        const andata = document.createElement('div');
        andata.classList.add('b_a_r');

        const destinazione = document.createElement('div');
        destinazione.classList.add('b_a_r');


        const stanghetta = document.createElement('div');
        stanghetta.classList.add('linea');
        
        

       
           

        // ritorno 
        const biglietto_r = document.createElement('div');
        biglietto_r.classList.add('biglietto');

        const scritt_r = document.createElement('div');
        scritt_r.classList.add('b_a_r');
        

        const andata_r = document.createElement('div');
        andata_r.classList.add('b_a_r');

        const destinazione_r = document.createElement('div');
        destinazione_r.classList.add('b_a_r');

        //ANDATA
        const biglietto_andata = document.createElement('div');
        biglietto_andata.classList.add('aeroporto');
        biglietto_andata.textContent= 'Andata : ';

        const durata_a_data = result.itineraries[0].duration;
        const durata_a =  document.createElement('div');
        durata_a.textContent = 'Durata volo : ' + durata_a_data;

        const velivolo_a_data = result.itineraries[0].segments[0].aircraft.code;
        const velivolo_a =  document.createElement('div');
        velivolo_a.textContent = 'Codice velivolo : ' + velivolo_a_data;

        const compagnia_a_data = result.itineraries[0].segments[0].carrierCode;
        const compagnia_a =  document.createElement('div');
        compagnia_a.textContent = 'Codice compagnia aerea : ' + compagnia_a_data;

        const disp_a_data = result.numberOfBookableSeats;
        const disp_a =  document.createElement('div');
        disp_a.textContent = 'Posti disponibili : ' + disp_a_data;

        

        // Caratteristiche partenza
        const a_partenza_data = result.itineraries[0].segments[0].departure.iataCode;
        const a_partenza =  document.createElement('div');
        a_partenza.classList.add('aeroporto');
        a_partenza.textContent = 'Aeroporto di partenza : ' + a_partenza_data;

        const a_partenza_terminal_data = result.itineraries[0].segments[0].departure.terminal;
        const a_partenza_terminal =  document.createElement('div');
        a_partenza_terminal.textContent = 'Terminal : ' + a_partenza_terminal_data;
        a_partenza_terminal.classList.add('color');
        
        const a_partenza_chiusura_gate_data = result.itineraries[0].segments[0].departure.at;
        const a_partenza_chiusura_gate =  document.createElement('div');
        a_partenza_chiusura_gate.textContent = 'Orario chiusura del gate : ' + a_partenza_chiusura_gate_data;
        a_partenza_chiusura_gate.classList.add('color');

        // Caratteristiche destinazione

        const a_destinazione_data = result.itineraries[0].segments[0].arrival.iataCode;
        const a_destinazione =  document.createElement('div');
        a_destinazione.classList.add('aeroporto');
        a_destinazione.textContent = 'Aeroporto di destinazione : ' + a_destinazione_data;

        const a_destinazione_terminal_data = result.itineraries[0].segments[0].arrival.terminal;
        const a_destinazione_terminal =  document.createElement('div');
        a_destinazione_terminal.textContent = 'Terminal : ' + a_destinazione_terminal_data;
        
        const a_destinazione_chiusura_gate_data = result.itineraries[0].segments[0].arrival.at;
        const a_destinazione_chiusura_gate =  document.createElement('div');
        a_destinazione_chiusura_gate.textContent = 'Orario arrivo : ' + a_destinazione_chiusura_gate_data;
        a_destinazione_chiusura_gate.classList.add('color');

         //RITORNO
         const biglietto_ritorno = document.createElement('div');
         biglietto_ritorno.classList.add('aeroporto');
         biglietto_ritorno.textContent= 'Ritorno : ';
 
         const durata_r_data = result.itineraries[1].duration;
         const durata_r =  document.createElement('div');
         durata_r.textContent = 'Durata volo : ' + durata_r_data;
 
         const velivolo_r_data = result.itineraries[1].segments[0].aircraft.code;
         const velivolo_r =  document.createElement('div');
         velivolo_r.textContent = 'Codice velivolo : ' + velivolo_r_data;
 
         const compagnia_r_data = result.itineraries[1].segments[0].carrierCode;
         const compagnia_r =  document.createElement('div');
         compagnia_r.textContent = 'Codice compagnia aerea : ' + compagnia_r_data;
 
        // Caratteristiche partenza
        const r_partenza_data = result.itineraries[1].segments[0].departure.iataCode;
        const r_partenza =  document.createElement('div');
        r_partenza.classList.add('aeroporto');
        r_partenza.textContent = 'Aeroporto di partenza : ' + r_partenza_data;

        const r_partenza_terminal_data = result.itineraries[1].segments[0].departure.terminal;
        const r_partenza_terminal =  document.createElement('div');
        r_partenza_terminal.textContent = 'Terminal : ' + r_partenza_terminal_data;
        r_partenza_terminal.classList.add('color');
        
        const r_partenza_chiusura_gate_data = result.itineraries[1].segments[0].departure.at;
        const r_partenza_chiusura_gate =  document.createElement('div');
        r_partenza_chiusura_gate.textContent = 'Orario chiusura del gate : ' + r_partenza_chiusura_gate_data;
        r_partenza_chiusura_gate.classList.add('color');

        // Caratteristiche destinazione

        const r_destinazione_data = result.itineraries[1].segments[0].arrival.iataCode;
        const r_destinazione =  document.createElement('div');
        r_destinazione.classList.add('aeroporto');
        r_destinazione.textContent = 'Aeroporto di destinazione : ' + r_destinazione_data;

        const r_destinazione_terminal_data = result.itineraries[1].segments[0].arrival.terminal;
        const r_destinazione_terminal =  document.createElement('div');
        r_destinazione_terminal.textContent = 'Terminal : ' + r_destinazione_terminal_data;
        
        const r_destinazione_chiusura_gate_data = result.itineraries[1].segments[0].arrival.at;
        const r_destinazione_chiusura_gate =  document.createElement('div');
        r_destinazione_chiusura_gate.textContent = 'Orario arrvio : ' + r_destinazione_chiusura_gate_data;
        r_destinazione_chiusura_gate.classList.add('color');



        //-----------------------------------------//
        const album = document.createElement('div');
        album.classList.add('book');

        scritt_a.appendChild(biglietto_andata);
        scritt_a.appendChild(durata_a);
        scritt_a.appendChild(compagnia_a);
        scritt_a.appendChild(velivolo_a);
        scritt_a.appendChild(disp_a);

        scritt_r.appendChild(biglietto_ritorno);
        scritt_r.appendChild(durata_r);
        scritt_r.appendChild(compagnia_r);
        scritt_r.appendChild(velivolo_r);
        
     

       andata.appendChild(a_partenza);
       andata.appendChild(a_partenza_terminal);
       andata.appendChild(a_partenza_chiusura_gate);


       destinazione.appendChild(a_destinazione);
       destinazione.appendChild(a_destinazione_terminal);
       destinazione.appendChild(a_destinazione_chiusura_gate); 

       andata_r.appendChild(r_partenza);
       andata_r.appendChild(r_partenza_terminal);
       andata_r.appendChild(r_partenza_chiusura_gate);


       destinazione_r.appendChild(r_destinazione);
       destinazione_r.appendChild(r_destinazione_terminal);
       destinazione_r.appendChild(r_destinazione_chiusura_gate); 


        biglietto.appendChild(scritt_a);
        biglietto.appendChild(andata);
        biglietto.appendChild(destinazione);

        biglietto_r.appendChild(scritt_r);
        biglietto_r.appendChild(andata_r);
        biglietto_r.appendChild(destinazione_r);

       
       
        album.appendChild(content);
        album.appendChild(biglietto);
        album.appendChild(stanghetta);
        album.appendChild(biglietto_r);

        library.appendChild(album);
        
      }
        
    }
}


function onResponse(response){
    return response.json();
}

function search(event){
    event.preventDefault();

    const partenza_input = document.querySelector('#partenza');
    const partenza_value = encodeURIComponent(partenza_input.value);

    const destinazione_input = document.querySelector('#destinazione');
    const destinazione_value = encodeURIComponent(destinazione_input.value);

    const arrivo_input = document.querySelector('#arrivo');
    const arrivo_value = encodeURIComponent(arrivo_input.value);

    const ritorno_input = document.querySelector('#ritorno');
    const ritorno_value = encodeURIComponent(ritorno_input.value);

    
    // Esegui la richiesta

  fetch("https://test.api.amadeus.com/v2/shopping/flight-offers?" + "originLocationCode=" + partenza_value + "&destinationLocationCode=" + destinazione_value + "&departureDate=" + arrivo_value + '&returnDate='+ ritorno_value + '&adults=1&nonStop=true&max=3',
  {
    headers:
    {
      'Authorization' : 'Bearer ' + token_data.access_token
    }
  }
).then(onResponse).then(onJson);

fetch(forecast_endpoint + 'key=' + key_weather_api +'&q=iata:' + destinazione_value + '&days=1' + '&dt=' + arrivo_value )
.then(onResponse).then(onJsonWeather);



}

const form = document.querySelector('#search_content');
form.addEventListener('submit', search);





function onTokenJson(json)
{
  // Imposta il token global
  token_data = json;
}

function onTokenResponse(response)
{
  return response.json();
}




let token_data;
const num_results = 3;

// All' apertura della pagina richiediamo il token

fetch(amadeus_api_endpoint_token,
    {
        method:'post',
        body: "grant_type=client_credentials&client_id=" + key_amadeus + "&client_secret=" + secret_amadeus,
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(onTokenResponse).then(onTokenJson);