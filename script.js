const weather = document.getElementById('weather')
const temp = document.getElementById('temp')
const temp_min = document.getElementById('min')
const temp_max = document.getElementById('max')

function setNull(){
  weather.innerHTML = temp.innerHTML = temp_max.innerHTML = temp_min.innerHTML = ""
}

function setColor(temp){
  let color
 if(temp<=10){
    color = "darkblue"
 }
 if(temp>10 && temp<=20){
  color = "blue"
}
if(temp>20 && temp<=30){
  color = "creem"
}
if(temp>30 && temp<=40){
  color = "yellow"
}
if(temp>40 && temp<=50){
   color = "darkyellow"
}
if(temp>50 && temp<=60){
  color = "red"
}
return(color)
}

function setGif(weather){
  let gif
  if(weather == 'Clouds'){
    gif = 'https://media.giphy.com/media/ihNA2Ep5iKGJK9gOd5/giphy.gif'
  }
  if(weather == 'Rain'){
    gif = 'https://media.giphy.com/media/kD0D4iR68X2kkexXE1/giphy.gif'
  }
  if(weather == ''){
    gif = '' 
  }
  if(weather == 'Clear'){
    gif = 'https://media.giphy.com/media/UnyblOs6hGx9Mli7jq/giphy.gif' 
  }
  return(gif)
}


async function getWeather(){
    const city = document.getElementById('city').value
  if(city.length>0){
    const key = '32b467af083e78ec77d12b5e62f4c41e'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&apikey='+key+''
    setNull()
    weather.innerHTML = "<img width='50' hieght='50'  src='https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/images/loading.gif'>"
   try{
     const res = await fetch(url)
     const data = await res.json()
    
   console.log( data.weather[0].main+" "+data.main.temp+" "+data.sys.country);
    weather.innerHTML = '<div class="label">weather</div>'+data.weather[0].main+'<img src="'+setGif(data.weather[0].main)+'" id="icon">'
    if((data.main.temp+data.main.temp_min+data.main.temp_max)/3!=data.main.temp){
      temp.innerHTML = '<div class="label">temp</div><div style="color: '+setColor(data.main.temp)+'">'+data.main.temp+'</div>'
      temp_min.innerHTML = '<div class="label">min</div><div style="color: '+setColor(data.main.temp_min)+'">'+data.main.temp_min+'</div>'
      temp_max.innerHTML = '<div class="label">max</div><div style="color: '+setColor(data.main.temp_max)+'">'+data.main.temp_max+'</div>'
    }
    else{
      temp.innerHTML = '<div class="label">temp</div><div style="color: '+setColor(data.main.temp)+'">'+data.main.temp+'</div>'
    }

    }
    catch(e){
      weather.innerHTML = "<div class='err'>Couldn't get weather of "+city+"</div>"
    }
  }
}
