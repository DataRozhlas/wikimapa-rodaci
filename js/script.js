/* todo:
- jména měst?
*/

let host = "https://data.irozhlas.cz";
if (window.location.hostname === "localhost") {
  host = "http://localhost:8000/samizdat";
}

const map = new mapboxgl.Map({
  container: "map",
  style: host + "/wikimapa-rodaci/data/style.json",
  zoom: 6.85,
  maxZoom: 11,
  attributionControl: false,
  center: [15.3350758, 49.7417517],
});

map.getCanvas().style.cursor = "default";
map.fitBounds([[12.09, 51.06], [18.87, 48.55]]);

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.AttributionControl({
  compact: true,
  customAttribution: "obrazový podkres <a target='_blank' href='https://samizdat.cz'>Samizdat</a>, data <a target='_blank' href='https://vdp.cuzk.cz/'>ČÚZK</a> a <a target='_blank' href='https://cs.wikipedia.org/wiki/Hlavn%C3%AD_strana'>Wikipedia</a>",
}));

map.scrollZoom.disable(); // zoom myší teprve až po interakci s mapou
map.on("click", () => map.scrollZoom.enable());

function odzavorkuj(string) {
  return string.replace(/ \(.*?\)/g, "");
}

function getCanc(jmeno, obec) {
  fetch(`https://cs.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&origin=*&exsentences=3&exintro=true&explaintext=true&titles=${encodeURI(jmeno)}`)
    .then(response => response.json())
    .then((prs) => {
      if ("query" in prs) {
        const text = Object.values(prs.query.pages)[0].extract;
        document.getElementById("legend_top").innerHTML = `<b>${odzavorkuj(jmeno)}</b> (${obec})`;
        document.getElementById("canc").innerHTML = `${odzavorkuj(text)} [<a target="_blank" rel="noopener noreferrer" href="https://cs.wikipedia.org/wiki/${jmeno}">více</a>]`;
      }
    });
}

function vlozObce(data) {
  data.features.forEach((val, idx) => {
    data.features[idx].properties.rodstr = odzavorkuj(val.properties.rod);
  });

  map.addLayer({
    id: "obce",
    type: "symbol",
    source: {
      type: "geojson",
      data: data,
    },
    layout: {
      "icon-image": "ico",
      "icon-size": [
        "interpolate",
        ["linear"],
        ["get", "pv"],
        80, 0.05,
        2117350, 0.35,
      ],
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-optional": true,
      "text-field": ["format",
        ["get", "rodstr"], {},
        "\n", {},
        ["get", "Nazev"], { "font-scale": 0.7, "text-font": ["literal", ["Open Sans Regular"]] },
      ],
      "symbol-sort-key": ["-", 1, ["get", "pv"]],
      "text-size": [
        "interpolate",
        ["linear"],
        ["get", "pv"],
        80, 10,
        2117350, 30,
      ],
      "text-font": ["Open Sans Bold"],
      "text-offset": [0, 0.3],
      "text-anchor": "top",
    },
    paint: {
      "icon-color": "#3182bd",
      "icon-opacity": 0.3,
      "text-color": "#d52834",
      "text-opacity": 1,
      "text-halo-color": "white",
      "text-halo-width": 1,
      "text-halo-blur": 1,
    },
  });
}

map.on("load", () => {
  map.loadImage(host + "/wikimapa-rodaci/data/kol.png", (error, image) => {
    if (error) throw error;
    map.addImage("ico", image, {
      sdf: "true",
    });
  });

  fetch(`${host}/wikimapa-rodaci/data/data.json`)
    .then(response => response.json())
    .then(data => vlozObce(data));

  map.on("mousemove", (e) => {
    const d = map.queryRenderedFeatures(e.point, {
      layers: ["obce"],
    });
    if (d.length > 0) {
      map.getCanvas().style.cursor = "pointer";
    } else {
      map.getCanvas().style.cursor = "grab";
    }
  });

  map.on("click", (e) => {
    const d = map.queryRenderedFeatures(e.point, {
      layers: ["obce"],
    });
    if (d.length > 0) {
      getCanc(d[0].properties.rod, d[0].properties.Nazev);
    } else {
      document.getElementById("legend_top").innerHTML = "<b>Vyberte osobnost.</b>";
      document.getElementById("canc").innerHTML = "";
    }
  });
});

["focus", "input"].forEach((e) => {
  document.querySelector("#inp-geocode").addEventListener(e, () => {
    document.querySelector("#inp-geocode").style["border-color"] = "black";
  });
});

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
    fetch(`https://api.mapy.cz/geocode?query=${text}`)
      .then(response => response.text())
      .then((data) => {
        const dataContainer = document.createElement("div");
        dataContainer.innerHTML = data;
        if (!dataContainer.querySelector("item[x]")) {
          document.querySelector("#inp-geocode").style["border-color"] = "red";
          return;
        }

        const x = parseFloat(dataContainer.querySelector("item[x]").getAttribute("x"));
        const y = parseFloat(dataContainer.querySelector("item[y]").getAttribute("y"));
        if (x < 12 || x > 19 || y < 48 || y > 52) { // omezení geosearche na česko, plus mínus
          document.querySelector("#inp-geocode").style["border-color"] = "red";
          return;
        }
        map.flyTo({
          center: [x, y],
          zoom: 14,
        });
      }, "xml");
  }
};
