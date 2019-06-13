/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* todo:\r\n- závorky u jmen - na mapě a v titulku popisku\r\n- menší kolečka?\r\n- jména měst?\r\n*/\nvar host = \"https://data.irozhlas.cz\";\n\nif (window.location.hostname === \"localhost\") {\n  host = \"http://localhost:8000/samizdat\";\n}\n\nvar map = new mapboxgl.Map({\n  container: \"map\",\n  style: host + \"/wikimapa-rodaci/data/style.json\",\n  zoom: 6.85,\n  maxZoom: 11,\n  attributionControl: false,\n  center: [15.3350758, 49.7417517]\n});\nmap.getCanvas().style.cursor = \"default\";\nmap.fitBounds([[12.09, 51.06], [18.87, 48.55]]);\nmap.addControl(new mapboxgl.NavigationControl());\nmap.addControl(new mapboxgl.AttributionControl({\n  compact: true,\n  customAttribution: \"obrazový podkres <a target='_blank' href='https://samizdat.cz'>Samizdat</a>, data <a target='_blank' href='https://vdp.cuzk.cz/'>ČÚZK</a> a <a target='_blank' href='https://cs.wikipedia.org/wiki/Hlavn%C3%AD_strana'>Wikipedia</a>\"\n}));\nmap.scrollZoom.disable(); // zoom myší teprve až po interakci s mapou\n\nmap.on(\"click\", function () {\n  return map.scrollZoom.enable();\n});\n\nfunction odzavorkuj(string) {\n  return string.replace(/ \\(.*?\\)/g, \"\");\n}\n\nfunction getCanc(jmeno, obec) {\n  var r = new XMLHttpRequest();\n  r.addEventListener(\"load\", function (e) {\n    var prs = JSON.parse(e.target.response);\n\n    if (\"query\" in prs) {\n      var text = Object.values(prs.query.pages)[0].extract;\n      document.getElementById(\"legend_top\").innerHTML = \"<b>\".concat(odzavorkuj(jmeno), \"</b> (\").concat(obec, \")\");\n      document.getElementById(\"canc\").innerHTML = \"\".concat(odzavorkuj(text), \" [<a target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\" href=\\\"https://cs.wikipedia.org/wiki/\").concat(jmeno, \"\\\">v\\xEDce</a>]\");\n    }\n  });\n  r.open(\"GET\", \"https://cs.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&origin=*&exsentences=5&exintro=true&explaintext=true&titles=\" + encodeURI(jmeno));\n  r.send();\n}\n\nfunction vlozObce(data) {\n  map.addLayer({\n    id: \"obce\",\n    type: \"symbol\",\n    source: {\n      type: \"geojson\",\n      data: data\n    },\n    layout: {\n      \"icon-image\": \"ico\",\n      \"icon-size\": [\"interpolate\", [\"linear\"], [\"get\", \"pv\"], 80, 0.05, 2117350, 0.35],\n      \"icon-allow-overlap\": true,\n      \"icon-ignore-placement\": true,\n      \"icon-optional\": true,\n      \"text-field\": \"{rod}\",\n      \"symbol-sort-key\": [\"-\", 1, [\"get\", \"pv\"]],\n      \"text-size\": [\"interpolate\", [\"linear\"], [\"get\", \"pv\"], 80, 10, 2117350, 30],\n      \"text-font\": [\"Open Sans Regular\"],\n      \"text-offset\": [0, 0.3],\n      \"text-anchor\": \"top\"\n    },\n    paint: {\n      \"icon-color\": \"#3182bd\",\n      \"icon-opacity\": 0.3,\n      \"text-color\": \"#d52834\",\n      \"text-opacity\": 1,\n      \"text-halo-color\": \"white\",\n      \"text-halo-width\": 1,\n      \"text-halo-blur\": 1\n    }\n  });\n}\n\nmap.on(\"load\", function () {\n  map.loadImage(host + \"/wikimapa-rodaci/data/kol.png\", function (error, image) {\n    if (error) throw error;\n    map.addImage(\"ico\", image, {\n      sdf: \"true\"\n    });\n  });\n  var r = new XMLHttpRequest();\n  r.addEventListener(\"load\", function (e) {\n    return vlozObce(JSON.parse(e.target.response));\n  });\n  r.open(\"GET\", host + \"/wikimapa-rodaci/data/data.json\");\n  r.send();\n  map.on(\"mousemove\", function (e) {\n    var d = map.queryRenderedFeatures(e.point, {\n      layers: [\"obce\"]\n    });\n\n    if (d.length > 0) {\n      map.getCanvas().style.cursor = \"pointer\";\n    } else {\n      map.getCanvas().style.cursor = \"grab\";\n    }\n  });\n  map.on(\"click\", function (e) {\n    var d = map.queryRenderedFeatures(e.point, {\n      layers: [\"obce\"]\n    });\n\n    if (d.length > 0) {\n      getCanc(d[0].properties.rod, d[0].properties.Nazev);\n    } else {\n      document.getElementById(\"legend_top\").innerHTML = \"<b>Vyberte osobnost.</b>\";\n      document.getElementById(\"canc\").innerHTML = \"\";\n    }\n  });\n});\n$(\"#inp-geocode\").on(\"focus input\", function () {\n  return $(\"#inp-geocode\").css(\"border-color\", \"black\");\n}); // geocoder\n\nvar form = document.getElementById(\"frm-geocode\");\n\nform.onsubmit = function submitForm(event) {\n  event.preventDefault();\n  var text = document.getElementById(\"inp-geocode\").value;\n\n  if (text === \"\") {\n    map.flyTo({\n      center: [15.3350758, 49.7417517],\n      zoom: 7\n    });\n  } else {\n    $.get(\"https://api.mapy.cz/geocode?query=\".concat(text), function (data) {\n      if (typeof $(data).find(\"item\").attr(\"x\") === \"undefined\") {\n        $(\"#inp-geocode\").css(\"border-color\", \"red\");\n        return;\n      }\n\n      var x = parseFloat($(data).find(\"item\").attr(\"x\"));\n      var y = parseFloat($(data).find(\"item\").attr(\"y\"));\n\n      if (x < 12 || x > 19 || y < 48 || y > 52) {\n        // omezení geosearche na česko, plus mínus\n        $(\"#inp-geocode\").css(\"border-color\", \"red\");\n        return;\n      }\n\n      map.flyTo({\n        center: [x, y],\n        zoom: 14\n      });\n    }, \"xml\");\n  }\n};\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ })

/******/ });