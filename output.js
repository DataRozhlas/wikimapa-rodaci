!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){var o="https://data.irozhlas.cz";"localhost"===window.location.hostname&&(o="http://localhost:8000/samizdat");var n=new mapboxgl.Map({container:"map",style:o+"/wikimapa-rodaci/data/style.json",zoom:6.85,maxZoom:11,attributionControl:!1,center:[15.3350758,49.7417517]});function r(e){return e.replace(/ \(.*?\)/g,"")}n.getCanvas().style.cursor="default",n.fitBounds([[12.09,51.06],[18.87,48.55]]),n.addControl(new mapboxgl.NavigationControl),n.addControl(new mapboxgl.AttributionControl({compact:!0,customAttribution:"obrazový podkres <a target='_blank' href='https://samizdat.cz'>Samizdat</a>, data <a target='_blank' href='https://vdp.cuzk.cz/'>ČÚZK</a> a <a target='_blank' href='https://cs.wikipedia.org/wiki/Hlavn%C3%AD_strana'>Wikipedia</a>"})),n.scrollZoom.disable(),n.on("click",function(){return n.scrollZoom.enable()}),n.on("load",function(){n.loadImage(o+"/wikimapa-rodaci/data/kol.png",function(e,t){if(e)throw e;n.addImage("ico",t,{sdf:"true"})}),fetch("".concat(o,"/wikimapa-rodaci/data/data.json")).then(function(e){return e.json()}).then(function(e){return function(e){e.features.forEach(function(t,o){e.features[o].properties.rodstr=r(t.properties.rod)}),n.addLayer({id:"obce",type:"symbol",source:{type:"geojson",data:e},layout:{"icon-image":"ico","icon-size":["interpolate",["linear"],["get","pv"],80,.05,2117350,.35],"icon-allow-overlap":!0,"icon-ignore-placement":!0,"icon-optional":!0,"text-field":["format",["get","rodstr"],{},"\n",{},["get","Nazev"],{"font-scale":.7,"text-font":["literal",["Open Sans Regular"]]}],"symbol-sort-key":["-",1,["get","pv"]],"text-size":["interpolate",["linear"],["get","pv"],80,10,2117350,30],"text-font":["Open Sans Bold"],"text-offset":[0,.3],"text-anchor":"top"},paint:{"icon-color":"#3182bd","icon-opacity":.3,"text-color":"#d52834","text-opacity":1,"text-halo-color":"white","text-halo-width":1,"text-halo-blur":1}})}(e)}),n.on("mousemove",function(e){n.queryRenderedFeatures(e.point,{layers:["obce"]}).length>0?n.getCanvas().style.cursor="pointer":n.getCanvas().style.cursor="grab"}),n.on("click",function(e){var t,o,a=n.queryRenderedFeatures(e.point,{layers:["obce"]});a.length>0?(t=a[0].properties.rod,o=a[0].properties.Nazev,fetch("https://cs.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&origin=*&exsentences=3&exintro=true&explaintext=true&titles=".concat(encodeURI(t))).then(function(e){return e.json()}).then(function(e){if("query"in e){var n=Object.values(e.query.pages)[0].extract;document.getElementById("legend_top").innerHTML="<b>".concat(r(t),"</b> (").concat(o,")"),document.getElementById("canc").innerHTML="".concat(r(n),' [<a target="_blank" rel="noopener noreferrer" href="https://cs.wikipedia.org/wiki/').concat(t,'">více</a>]')}})):(document.getElementById("legend_top").innerHTML="<b>Vyberte osobnost.</b>",document.getElementById("canc").innerHTML="")})}),["focus","input"].forEach(function(e){document.querySelector("#inp-geocode").addEventListener(e,function(){document.querySelector("#inp-geocode").style["border-color"]="black"})}),document.getElementById("frm-geocode").onsubmit=function(e){e.preventDefault();var t=document.getElementById("inp-geocode").value;""===t?n.flyTo({center:[15.3350758,49.7417517],zoom:7}):fetch("https://api.mapy.cz/geocode?query=".concat(t)).then(function(e){return e.text()}).then(function(e){var t=document.createElement("div");if(t.innerHTML=e,t.querySelector("item[x]")){var o=parseFloat(t.querySelector("item[x]").getAttribute("x")),r=parseFloat(t.querySelector("item[y]").getAttribute("y"));o<12||o>19||r<48||r>52?document.querySelector("#inp-geocode").style["border-color"]="red":n.flyTo({center:[o,r],zoom:14})}else document.querySelector("#inp-geocode").style["border-color"]="red"},"xml")}}]);