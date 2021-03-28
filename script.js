(function() {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function() {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 1000);
        //setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let luhend = "AM";

            if(h === 0){
                h = 12;
            }

            if(h > 12){
                h = h - 12;
                luhend = "PM";
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + luhend;

            setTimeout(updateClock, 250);
        }

    });

    // forms
    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let r1 = document.getElementById("r1");
        let r2 = document.getElementById("r2");
        var letters = /^[A-Za-z]+$/;

        if(!fname.value.match(letters)){
            alert("Palun sisesta korrektne eesnimi!");
            fname.focus();
            return;
        } else if(!lname.value.match(letters)){
            alert("Palun sisesta korrektne perenimi!");
            lname.focus();
            return;
        } else if(!r1.checked && !r2.checked){
            alert("Palun vali maksemeetod!");
            r1.focus();
            return;
        } else if (linn.value === "") {
            alert("Palun valige linn nimekirjast!");
            linn.focus();
            return;
        }
        else {
            if(linn.value === "tln"){
                if(kontaktivaba.checked && kingitus.checked){
                    e.innerHTML = "6,00 &euro;";
                }
                else if(kingitus.checked && !kontaktivaba.checked){
                    e.innerHTML = "5,00 &euro;";
                }
                else if(!kingitus.checked && kontaktivaba.checked){
                    e.innerHTML = "1,00 &euro;";
                }
                else {
                    e.innerHTML = "0,00 &euro;";
                }
            }
            if(linn.value === "trt"){
                if(kontaktivaba.checked && kingitus.checked){
                    e.innerHTML = "8,50 &euro;";
                }
                else if(kingitus.checked && !kontaktivaba.checked){
                    e.innerHTML = "7,50 &euro;";
                }
                else if(!kingitus.checked && kontaktivaba.checked){
                    e.innerHTML = "3,50 &euro;";
                }
                else{
                    e.innerHTML = "2,50 &euro;";
                }
            }
            if(linn.value === "nrv"){
                if(kontaktivaba.checked && kingitus.checked){
                    e.innerHTML = "8,50 &euro;";
                }
                else if(kingitus.checked && !kontaktivaba.checked){
                    e.innerHTML = "7,50 &euro;";
                }
                else if(!kingitus.checked && kontaktivaba.checked){
                    e.innerHTML = "3,50 &euro;";
                }
                else{
                    e.innerHTML = "2,50 &euro;";
                }
            }
            if(linn.value === "prn"){
                if(kontaktivaba.checked && kingitus.checked){
                    e.innerHTML = "9,00 &euro;";
                }
                else if(kingitus.checked && !kontaktivaba.checked){
                    e.innerHTML = "8,00 &euro;";
                }
                else if(!kingitus.checked && kontaktivaba.checked){
                    e.innerHTML = "4,00 &euro;";
                }
                else{
                    e.innerHTML = "3,00 &euro;";
                }
            }
        }
        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
let map;
function GetMap() {
    "use strict";
    let oldPoint = new Microsoft.Maps.Location(
            58.38104,
            26.71992
        );
    let newPoint = new Microsoft.Maps.Location(
        58.04349,
        26.46894
    );
    let centerPoint = new Microsoft.Maps.Location(
        58.216153,
        26.614031
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
    });
    infobox.setMap(map);

    let pushpin = new Microsoft.Maps.Pushpin(oldPoint, {
            title: 'Tartu Ülikool',
        });
    let pushpin2 = new Microsoft.Maps.Pushpin(newPoint, {
        title: 'Tehvandi Spordikeskus'
    });
    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: "Tartu ülikool on Eesti vanim ülikool."
    };
    pushpin2.metadata = {
        title: 'Tehvandi Spordikeskus',
        description: 'Tehvandi Spordikeskus asub Nüpli külas, Otepää vallas. Spordikeskuse suunitlus on olla kvaliteetne ja mitmekülgsete võimalustega treening- ja võistluskeskus.'
    };
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    infobox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);
    function pushpinClicked(e) {
        if (e.target.metadata) {
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

