//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

/* https://data.nasa.gov/api/views/gvk9-iz74/rows.json */


/*
document.querySelector('form').addEventListener('submit', nasa)

function nasa(e){
  e.preventDefault()
  let date = document.querySelector('input').value
  console.log(date)
  fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=PX6KQodjwM0QXhS5JSHPYRAp7WyPGe8J2ui06hFi`)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        console.log(response)
        if(response.media_type == "image"){
          document.querySelector('img').src = response.hdurl
        }else{
          document.querySelector('iframe').src = response.url
        }

    })
    .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
} */



// document.querySelector('form').addEventListener('submit', nasa)
//
// function nasa(e){
//   fetch(`https://data.nasa.gov/api/views/gvk9-iz74/rows.json?api_key=cas0ypna9osesCIo8tdXzH9FNEYTFyukdGrUU3z9`)
//   .then(res => res.json())
//   .then(response =>{
//   console.log(response);
//   	return response['data'].map(data => {
//     	return {
//       	name: data[8],
//       	latitude: data[20][1],
//       	longitude: data[20][2],
//         address: `${data[21]}, ${data[22]}, ${data[23]}`,
//     	}
//     });
//   }).then(result => {
//     console.log(result);
//   })
//   .catch(err =>{
//   console.log('this bitch dont work: ', err);
//   })
//   }
//
//   nasa();
  Con = document.querySelector(".container");

fetch(`https://data.nasa.gov/resource/9g7e-7hzz.json?$select=facility,location,city,state`)
  .then(res => res.json())
  .then(response => {
    console.log(response)
    response.forEach(fac => {
      let tr = document.createElement("tr");
      let lat = Number(fac.location.coordinates[0])
      let lon = Number(fac.location.coordinates[1])

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=6c9b1706890d3e9cc03aef706c486639`)
        .then(res => res.json())
        .then(response => {
          let weather = -(response.main.temp)

          tr.innerHTML = `<tr>
          <td>${fac.facility}</td>
          <td>${fac.city}</td>
          <td>${fac.state}</td>
          <td>${weather}</td>
          </tr>
          `

          container.appendChild(tr)
        })
        .catch(err => {
          weather = undefined
        });
    })
  })
  .catch(err => {
    console.log(`error ${err}`)
    alert("error")
  });
