api_key = 'pk.eyJ1IjoiaGFycmlzaDIwMDEiLCJhIjoiY2tmaWNyYTd1MDJwcDJxbnUxcnJrMzViciJ9.h0hIQ_8J7awhTNhiKLAdoA';
mapboxgl.accessToken = api_key;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.4512, 43.6568],
    zoom: 13
});
var map1 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});
var loc = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
map.addControl(map1);
map.addControl(loc);
map1.on('result', function (r) {
    var ll = r.result.center;
    var len = r.result.context.length;
    if (len === 3) {
        var city = r.result.context[0].text;
        var state = r.result.context[1].text;
        var country = r.result.context[2].text;
    }
    else if (len === 4) {
        var city = r.result.context[1].text;
        var state = r.result.context[2].text;
        var country = r.result.context[3].text;
    }
    else if (len === 5) {
        var city = r.result.context[2].text;
        var state = r.result.context[3].text;
        var country = r.result.context[4].text;
    }
    
    var a = document.getElementById("box");
    var str = '<h1 class="addr">CITY:' + city + '</h1>';
    str += '<h1 class="addr">STATE:' + state + '</h1>';
    str += '<h1 class="addr">COUNTRY:' + country + '</h1>';
    a.innerHTML = str;
    const url = "https://api.covid19india.org/state_district_wise.json";
    fetch(url)
        .then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            let Active,Confirmed,Death;
            
            if (city === "Bengaluru Nagara")
             {
                 city="Bangaluru";
                Active = json[state]["districtData"]["Bengaluru Urban"]["active"]+ json[state]["districtData"]["Bengaluru Rural"]["active"];
                Confirmed = json[state]["districtData"]["Bengaluru Urban"]["confirmed"]+ json[state]["districtData"]["Bengaluru Rural"]["confirmed"];
                Death = json[state]["districtData"]["Bengaluru Urban"]["deceased"]+ json[state]["districtData"]["Bengaluru Rural"]["deceased"];
            }
            else{
                Active = json[state]["districtData"][city]["active"];
                Confirmed = json[state]["districtData"][city]["confirmed"];
                 Death = json[state]["districtData"][city]["deceased"];
            }
            str += '<h1 class="addr">No of Active Cases:' + Active + '</h1>';
            str += '<h1 class="addr">No of Confirmed Cases:' + Confirmed + '</h1>';
            str += '<h1 class="addr">No of Death:' + Death + '</h1>';
            a.innerHTML = str;
        })
});
