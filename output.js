!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){var o="https://data.irozhlas.cz";"localhost"==window.location.hostname&&(o="http://localhost");var n=new mapboxgl.Map({container:"map",style:o+"/wikimapa-rodaci/data/style.json",zoom:6.85,maxZoom:11,attributionControl:!1,center:[15.3350758,49.7417517]});n.getCanvas().style.cursor="default",n.fitBounds([[12.09,51.06],[18.87,48.55]]),n.addControl(new mapboxgl.NavigationControl),n.addControl(new mapboxgl.AttributionControl({compact:!0,customAttribution:'obrazový podkres <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="https://vdp.cuzk.cz/">ČÚZK</a> a <a target="_blank" href="https://cs.wikipedia.org/wiki/Hlavn%C3%AD_strana">Wikipedia</a>'})),n.scrollZoom.disable(),n.on("click",function(e){n.scrollZoom.enable()}),n.on("load",function(){var e=new XMLHttpRequest;e.addEventListener("load",function(e){return t=JSON.parse(e.target.response),void n.addLayer({id:"obce",type:"symbol",source:{type:"geojson",data:t},layout:{"icon-image":"circle-11","icon-size":.5,"icon-ignore-placement":!0,"icon-optional":!0,"text-field":"{rod}","symbol-sort-key":["-",1,["get","pv"]],"text-size":["interpolate",["linear"],["get","pv"],80,10,2117350,30],"text-font":["Open Sans Regular"],"text-offset":[0,.3],"text-anchor":"top"},paint:{"icon-color":"#3182bd","icon-opacity":.5,"text-color":"#3182bd","text-opacity":.9,"text-halo-color":"white","text-halo-width":2,"text-halo-blur":1}});var t}),e.open("GET",o+"/wikimapa-rodaci/data/data.json"),e.send(),n.on("mousemove",function(e){n.queryRenderedFeatures(e.point,{layers:["obce"]}).length>0?n.getCanvas().style.cursor="pointer":n.getCanvas().style.cursor="grab"}),n.on("click",function(e){var t,o,r=n.queryRenderedFeatures(e.point,{layers:["obce"]});r.length>0?(document.getElementById("legend_top").innerHTML="<b>"+r[0].properties.rod+"</b> ("+r[0].properties.Nazev+")",t=r[0].properties.rod,(o=new XMLHttpRequest).addEventListener("load",function(e){var o=JSON.parse(e.target.response);"query"in o&&(document.getElementById("canc").innerHTML=Object.values(o.query.pages)[0].extract.slice(0,200)+'... [<a rel="noopener noreferrer" target="_blank" href="https://cs.wikipedia.org/wiki/'+t+'">více</a>]')}),o.open("GET","https://cs.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&origin=*&exintro=true&explaintext=true&titles="+encodeURI(t)),o.send()):(document.getElementById("legend_top").innerHTML="<b>Vyberte osobnost.</b>",document.getElementById("canc").innerHTML="")})}),$("#inp-geocode").on("focus input",function(){return $("#inp-geocode").css("border-color","black")}),document.getElementById("frm-geocode").onsubmit=function(e){e.preventDefault();var t=document.getElementById("inp-geocode").value;""===t?n.flyTo({center:[15.3350758,49.7417517],zoom:7}):$.get("https://api.mapy.cz/geocode?query=".concat(t),function(e){if(void 0!==$(e).find("item").attr("x")){var t=parseFloat($(e).find("item").attr("x")),o=parseFloat($(e).find("item").attr("y"));t<12||t>19||o<48||o>52?$("#inp-geocode").css("border-color","red"):n.flyTo({center:[t,o],zoom:14})}else $("#inp-geocode").css("border-color","red")},"xml")}}]);