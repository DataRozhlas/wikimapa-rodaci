title: "Smetanova Litomyšl, Mariánské Lázně Jaromíra Soukupa. Mapa Česka ukazuje nejhledanější rodáky"
perex: "Nejslavnějším pražským rodákem je Karel IV., brněnským zase Bohumil Hrabal. Tedy aspoň měřeno počtem zobrazení článků o osobnostech na české Wikipedii. Nejhledanější rodáky českých měst a vesnic zobrazuje interaktivní mapa, kterou připravili datoví novináři serveru iROZHLAS.cz."
styles: ['https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css']
libraries: ['https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js']
options: [noheader, nopic] #wide, noheader (, nopic)
---

<wide>
<form action="?" id="frm-geocode">
	<div class="inputs">
	<input type="text" id="inp-geocode" placeholder="Zadejte obec či adresu...">
	<input type="submit" id="inp-btn" value="Najít">
	</div>
</form>
<div id="map"></div>
<div id="legend">
	<div id="legend_top"><b>Vyberte osobnost.</b></div>
	<div id="canc"></div>
</div>
</wide>

Mezi nejhledanější rodáky patří historické osobnosti i žijící lidé. Celostátním rekordmanem je středověký král Karel IV. Jeho článek si otevřely přes dva miliony lidí. Více než milion přečtení mají další dva krajští "vítězové" - Tomáš Garrigue Masaryk, který se narodil v jihomoravském Hodoníně, a Miloš Zeman ze středočeského Kolína. 

Spolu s nimi se na mapě objevují zpěváci jako Karel Gott, sportovci jako Martina Sábliková, ale také vlastník a moderátor TV Barrandov Jaromír Soukup, nejhledanější rodák Karlovarského kraje. Z řady menších obcí se nejvíce proslavily postavy z minulosti, například prvorepublikový lidovecký politik Mořic Hruban z Brodku u Prostějova nebo Jan Jiří Grasel, loupežník z Nových Syrovic na Vysočině, jehož jméno dalo vzniknout nadávce "grázl". 

V Praze, kde se významní rodáci koncentrují, Karla IV. následují Václav Havel, Lída Baarová, Milada Horáková, Jan Palach a Jiřina Bohdalová. Poslední z porevolučních prezidentů, Václav Klaus, je v pražském žebříčku až jedenáctý, následovaný svým synem Václavem Klausem mladším. Brněnskou jedničku Bohumila Hrabala následuje Libuše Šafránková a Milan Kundera, Jaromíra Nohavicu v Ostravě jeho hudební kolegové Hana Zagorová a Richard Krajčo.

Mapa je inspirovaná [podobným projektem](https://pudding.cool/2019/05/people-map/) amerického serveru The Pudding. Vychází z dat z období mezi červnem 2015 a červnem 2019, která poskytuje česká Wikipedie. U každé obce, která má na Wikipedii uvedené osobnosti v ní narozené, zobrazuje rodáka, jehož záznam má na Wikipedii nejvíce přečtení. Obcí s rodáky, kteří jsou na Wikipedii uvedení, je celkem 1749, tedy asi čtvrtina ze všech českých měst a vesnic.
