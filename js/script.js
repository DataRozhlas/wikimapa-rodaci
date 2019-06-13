let host = 'https://data.irozhlas.cz'
if (window.location.hostname == 'localhost') {
    host = 'http://localhost'
}

var map = new mapboxgl.Map({
    container: "map",
    style: host + '/wikimapa-rodaci/data/style.json',
    zoom: 6.85,
    maxZoom: 11,
    attributionControl: false,
    center: [15.3350758, 49.7417517],
});

map.getCanvas().style.cursor = 'default';
map.fitBounds([[12.09,51.06],[18.87,48.55]]);

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.AttributionControl({
    compact: true,
    customAttribution: 'obrazový podkres <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="https://vdp.cuzk.cz/">ČÚZK</a> a <a target="_blank" href="https://cs.wikipedia.org/wiki/Hlavn%C3%AD_strana">Wikipedia</a>',
}));

map.scrollZoom.disable(); // zoom myší teprve až po interakci s mapou
map.on("click", function(e) {
    map.scrollZoom.enable();
});

function getCanc(jmeno) {
  const r = new XMLHttpRequest();
    r.addEventListener('load', function(e) {
      let prs = JSON.parse(e.target.response)
      if ('query' in prs) {
        document.getElementById('canc').innerHTML = Object.values(prs.query.pages)[0].extract.slice(0, 200) + '... [<a rel="noopener noreferrer" target="_blank" href="https://cs.wikipedia.org/wiki/' + jmeno + '">více</a>]'
      }
    });
    r.open('GET', 'https://cs.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&origin=*&exintro=true&explaintext=true&titles=' + encodeURI(jmeno));
    r.send();
}

function vlozObce(data) {
    map.addLayer({
        'id': 'obce',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': data,
        },
        'layout': {
            'icon-image': 'ico',
            'icon-size': [
              'interpolate',
              ['linear'],
              ['get', 'pv'],
              80, 0.1,
              2117350, 0.7
            ],
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'icon-optional': true,
            'text-field': '{rod}' ,
            'symbol-sort-key': ['-', 1, ['get', 'pv']],
            'text-size': [
              'interpolate',
              ['linear'],
              ['get', 'pv'],
              80, 10,
              2117350, 30
            ],
            'text-font': ['Open Sans Regular'],
            'text-offset': [0, 0.3],
            'text-anchor': 'top'
        },
        'paint': {
          'icon-color': '#3182bd',
          'icon-opacity': 0.3,
          'text-color': '#d52834',
          'text-opacity': 1,
          'text-halo-color': 'white',
          'text-halo-width': 2,
          'text-halo-blur': 1,
        }
    });
}

map.on('load', function() {
  map.loadImage(host + '/wikimapa-rodaci/data/kol.png', function(error, image) {
    if (error) throw error;
      map.addImage('ico', image, {
        'sdf': 'true'
      });
  })
    const r = new XMLHttpRequest();
    r.addEventListener('load', e => vlozObce(JSON.parse(e.target.response)));
    r.open('GET', host + '/wikimapa-rodaci/data/data.json');
    r.send();

    map.on('mousemove', function (e) {
      var d = map.queryRenderedFeatures(e.point, {
          layers: ['obce']
      });
      if (d.length > 0) {
        map.getCanvas().style.cursor = 'pointer'
      } else {
        map.getCanvas().style.cursor = 'grab'
      }
    });
    
    map.on('click', function(e) {
        var d = map.queryRenderedFeatures(e.point, {
            layers: ['obce']
        });
        if (d.length > 0) {
            document.getElementById('legend_top').innerHTML = '<b>' + d[0].properties['rod'] + '</b> (' 
              + d[0].properties['Nazev'] 
              + ')'
            getCanc(d[0].properties['rod'])
        } else {
            document.getElementById('legend_top').innerHTML = '<b>Vyberte osobnost.</b>'
            document.getElementById('canc').innerHTML = ''
        }
    });
});

$("#inp-geocode").on("focus input", () => $("#inp-geocode").css("border-color", "black"));
  // geocoder
  const form = document.getElementById("frm-geocode");
  form.onsubmit = function submitForm(event) {
    event.preventDefault();
    const text = document.getElementById("inp-geocode").value;
    if (text === "") {
      map.flyTo({
        center: [15.3350758, 49.7417517],
        zoom: 7,
      });
    } else {
      $.get(`https://api.mapy.cz/geocode?query=${text}`, (data) => {
        if (typeof $(data).find("item").attr("x") === "undefined") {
          $("#inp-geocode").css("border-color", "red");
          return;
        }
        const x = parseFloat($(data).find("item").attr("x"));
        const y = parseFloat($(data).find("item").attr("y"));
        if (x < 12 || x > 19 || y < 48 || y > 52) { // omezení geosearche na česko, plus mínus
          $("#inp-geocode").css("border-color", "red");
          return;
        }
        map.flyTo({
          center: [x, y],
          zoom: 14,
        });
      }, "xml");
    }
  };