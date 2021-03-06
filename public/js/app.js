const formCuaca = document.querySelector('form');
const search = document.querySelector('input');
const massageOne = document.querySelector('#msOne');
const massageTwo = document.querySelector('#msTwo');
const massageTree = document.querySelector('#msTree'); 

formCuaca.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    massageOne.textContent = 'Loading...';
    massageTwo.textContent = '';
        fetch('/cuaca?alamat='+ location).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                massageOne.textContent=data.error;
            }else{
                massageOne.textContent='Longitude nya dari '+ data.forecast.alamat+' '+data.forecast.long;
                massageTwo.textContent='Latitude nya dari '+ data.forecast.alamat+' '+data.forecast.lati;
                massageTree.textContent='Temperatur nya adalah '+ data.forecast.temperature + ' C';
            }
        })
    })
})