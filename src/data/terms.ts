export type Category = 'MALEREI' | 'GRAFIK' | 'PLASTIK' | 'KOMPOSITION';

export interface Term {
  id: string;
  term: string;
  definition: string;
  category: Category;
  subCategory?: string;
  forbiddenWords?: string[]; // For Taboo
}

export const TERMS: Term[] = [
  // 1. MALEREI
  // A. Farbe & Funktion
  {
    id: 'lokalfarbe',
    term: 'Lokalfarbe',
    definition: 'Die objektive „Eigentliche Farbe“ des Gegenstands (z.B. Himmel = Blau).',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Gegenstand', 'Eigentlich', 'Objektiv', 'Blau']
  },
  {
    id: 'erscheinungsfarbe',
    term: 'Erscheinungsfarbe',
    definition: 'Die Farbe unter Einfluss von Atmosphäre und Licht (z.B. Schnee im Schatten = Violett).',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Licht', 'Atmosphäre', 'Schatten', 'Einfluss']
  },
  {
    id: 'ausdrucksfarbe',
    term: 'Ausdrucksfarbe',
    definition: 'Farbe als Träger von Emotionen, losgelöst vom Gegenstand (z.B. Expressionismus).',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Emotionen', 'Gefühl', 'Gegenstand', 'Losgelöst']
  },
  {
    id: 'symbolfarbe',
    term: 'Symbolfarbe',
    definition: 'Farbe mit fester kultureller/religiöser Bedeutung (z.B. Gold = göttlich).',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Bedeutung', 'Kultur', 'Religion', 'Gold']
  },
  {
    id: 'autonome-farbe',
    term: 'Autonome Farbe',
    definition: 'Farbe als reines Gestaltungsmittel (Abstrakte Malerei).',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Gestaltung', 'Mittel', 'Abstrakt', 'Rein']
  },
  {
    id: 'signalfarbe',
    term: 'Signalfarbe',
    definition: 'Farbe, die optisch sofort ins Auge springt (Warnwirkung).',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Auge', 'Warnung', 'Optisch', 'Springt']
  },
  {
    id: 'valeur',
    term: 'Valeur',
    definition: 'Der Helligkeitswert (Tonwert) einer Farbe.',
    category: 'MALEREI',
    subCategory: 'Farbe & Funktion',
    forbiddenWords: ['Helligkeit', 'Tonwert', 'Wert', 'Abstufung']
  },
  // B. Farbauftrag (Faktur) & Technik
  {
    id: 'duktus',
    term: 'Duktus',
    definition: 'Die „Handschrift“ des Pinsels (z.B. expressiv, nervös, glatt, unsichtbar).',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Handschrift', 'Pinsel', 'Strich', 'Führung']
  },
  {
    id: 'pastos',
    term: 'Pastos / Impasto',
    definition: 'Dicker, reliefartiger Farbauftrag (Pinselstriche deutlich sichtbar).',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Dick', 'Relief', 'Sichtbar', 'Auftrag']
  },
  {
    id: 'lasur',
    term: 'Lasur / Lasierend',
    definition: 'Dünne, durchscheinende Schichten (Tiefenlicht).',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Dünn', 'Durchscheinend', 'Schicht', 'Tiefenlicht']
  },
  {
    id: 'alla-prima',
    term: 'Alla-prima',
    definition: '„Auf das Erste“; Nass-in-Nass, ohne Untermalung in einem Zug gemalt.',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Erste', 'Nass', 'Zug', 'Untermalung']
  },
  {
    id: 'dripping',
    term: 'Dripping',
    definition: 'Getropfte/gespritze Farbe (Pollock).',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Tropfen', 'Spritzen', 'Pollock', 'Action Painting']
  },
  {
    id: 'pointillismus',
    term: 'Pointillismus',
    definition: 'Bildaufbau aus Farbpunkten (optische Mischung).',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Punkte', 'Mischung', 'Optisch', 'Seurat']
  },
  {
    id: 'grisaille',
    term: 'Grisaille',
    definition: 'Malerei nur in Grautönen (Steinimitation).',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Grau', 'Stein', 'Imitation', 'Ton']
  },
  {
    id: 'trompe-loeil',
    term: 'Trompe-l’œil',
    definition: 'Augentäuschung; extrem realistische Darstellung.',
    category: 'MALEREI',
    subCategory: 'Farbauftrag & Technik',
    forbiddenWords: ['Täuschung', 'Auge', 'Realistisch', 'Illusion']
  },
  // C. Kontraste
  {
    id: 'komplementaerkontrast',
    term: 'Komplementärkontrast',
    definition: 'Gegenüberliegende Farben (Rot/Grün, Blau/Orange) steigern sich gegenseitig.',
    category: 'MALEREI',
    subCategory: 'Kontraste',
    forbiddenWords: ['Gegenüber', 'Steigern', 'Rot', 'Grün']
  },
  {
    id: 'hell-dunkel-kontrast',
    term: 'Hell-Dunkel-Kontrast',
    definition: 'Erzeugt Dramatik und Plastizität.',
    category: 'MALEREI',
    subCategory: 'Kontraste',
    forbiddenWords: ['Dramatik', 'Plastizität', 'Licht', 'Schatten']
  },
  {
    id: 'kalt-warm-kontrast',
    term: 'Kalt-Warm-Kontrast',
    definition: 'Erzeugt oft Raumtiefe (Blau weicht zurück, Rot/Orange tritt hervor = Farbperspektive).',
    category: 'MALEREI',
    subCategory: 'Kontraste',
    forbiddenWords: ['Raumtiefe', 'Temperatur', 'Blau', 'Rot']
  },
  {
    id: 'qualitaetskontrast',
    term: 'Qualitätskontrast',
    definition: 'Reine (bunte) Farben vs. getrübte (stumpfe) Farben.',
    category: 'MALEREI',
    subCategory: 'Kontraste',
    forbiddenWords: ['Rein', 'Getrübt', 'Stumpf', 'Bunt']
  },
  {
    id: 'quantitaetskontrast',
    term: 'Quantitätskontrast',
    definition: 'Mengenverhältnis (z.B. viel dunkle Fläche vs. kleiner heller Fleck).',
    category: 'MALEREI',
    subCategory: 'Kontraste',
    forbiddenWords: ['Menge', 'Verhältnis', 'Größe', 'Fläche']
  },
  {
    id: 'simultankontrast',
    term: 'Simultankontrast',
    definition: 'Das Auge erzeugt physiologisch die Komplementärfarbe an Grenzflächen.',
    category: 'MALEREI',
    subCategory: 'Kontraste',
    forbiddenWords: ['Auge', 'Physiologisch', 'Grenze', 'Komplementär']
  },
  // D. Licht & Raumillusion
  {
    id: 'chiaroscuro',
    term: 'Chiaroscuro',
    definition: 'Hartes, dramatisches Hell-Dunkel (Barock, Caravaggio).',
    category: 'MALEREI',
    subCategory: 'Licht & Raumillusion',
    forbiddenWords: ['Hart', 'Dramatisch', 'Barock', 'Caravaggio']
  },
  {
    id: 'luftperspektive',
    term: 'Luftperspektive',
    definition: 'Verblauung und Unschärfe in der Ferne (Landschaftsmalerei).',
    category: 'MALEREI',
    subCategory: 'Licht & Raumillusion',
    forbiddenWords: ['Blau', 'Unschärfe', 'Ferne', 'Landschaft']
  },
  {
    id: 'modellierung',
    term: 'Modellierung',
    definition: 'Das Erzeugen von körperlichem Volumen durch Farbabstufung.',
    category: 'MALEREI',
    subCategory: 'Licht & Raumillusion',
    forbiddenWords: ['Körper', 'Volumen', 'Abstufung', 'Formen']
  },

  // 2. GRAFIK
  // A. Die Linie & Zeichnung
  {
    id: 'lineament',
    term: 'Lineament',
    definition: 'Das Gesamgefüge aller Linien.',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Gefüge', 'Gesamt', 'Struktur', 'Alle']
  },
  {
    id: 'umrisslinie',
    term: 'Umrisslinie (Kontur)',
    definition: 'Begrenzt die Form nach außen.',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Außen', 'Grenze', 'Form', 'Rand']
  },
  {
    id: 'binnenzeichnung',
    term: 'Binnenzeichnung',
    definition: 'Strukturiert das Innere (Falten, Muskeln).',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Innen', 'Struktur', 'Falten', 'Muskeln']
  },
  {
    id: 'kreuzschraffur',
    term: 'Kreuzschraffur',
    definition: 'Verdichtung für Dunkelheit (Schraffur).',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Kreuz', 'Dunkelheit', 'Verdichtung', 'Überlagern']
  },
  {
    id: 'formschraffur',
    term: 'Formschraffur',
    definition: 'Linien folgen der Wölbung (Körperlichkeit).',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Wölbung', 'Folgen', 'Körper', 'Rundung']
  },
  {
    id: 'schummern',
    term: 'Schummern',
    definition: 'Flächiges Reiben (weiche Übergänge).',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Reiben', 'Weich', 'Übergang', 'Flächig']
  },
  {
    id: 'lavierung',
    term: 'Lavierung',
    definition: 'Wässriger Auftrag (Tusche), ähnlich Aquarell.',
    category: 'GRAFIK',
    subCategory: 'Linie & Zeichnung',
    forbiddenWords: ['Wasser', 'Tusche', 'Aquarell', 'Pinsel']
  },
  // B. Drucktechniken
  {
    id: 'hochdruck',
    term: 'Hochdruck',
    definition: 'Erhabene Teile drucken (Stempel-Prinzip).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Erhaben', 'Stempel', 'Oben', 'Drucken']
  },
  {
    id: 'holzschnitt',
    term: 'Holzschnitt',
    definition: 'Harte Kanten, expressiv (Hochdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Holz', 'Hart', 'Kante', 'Expressiv']
  },
  {
    id: 'linolschnitt',
    term: 'Linolschnitt',
    definition: 'Weicher, flächiger (Hochdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Linoleum', 'Weich', 'Flächig', 'Material']
  },
  {
    id: 'tiefdruck',
    term: 'Tiefdruck',
    definition: 'Vertiefungen drucken (Papier wird in Rillen gepresst).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Tief', 'Rillen', 'Pressen', 'Vertiefung']
  },
  {
    id: 'kupferstich',
    term: 'Kupferstich',
    definition: 'Sehr feine, technisch präzise Linien (Burin, Tiefdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Kupfer', 'Fein', 'Präzise', 'Burin']
  },
  {
    id: 'radierung',
    term: 'Radierung',
    definition: 'Ätzung mit Säure, freiere Linienführung (Tiefdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Säure', 'Ätzen', 'Frei', 'Chemie']
  },
  {
    id: 'kaltnadelradierung',
    term: 'Kaltnadelradierung',
    definition: 'Direktes Ritzen, erzeugt Grat (samtige Linie, Tiefdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Ritzen', 'Grat', 'Samtig', 'Nadel']
  },
  {
    id: 'lithografie',
    term: 'Lithografie',
    definition: 'Steindruck (Fett stößt Wasser ab), wirkt kreideartig/zeichnerisch (Flachdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Stein', 'Fett', 'Wasser', 'Kreide']
  },
  {
    id: 'serigrafie',
    term: 'Serigrafie (Siebdruck)',
    definition: 'Schablonentechnik, flächig (Pop Art, Durchdruck).',
    category: 'GRAFIK',
    subCategory: 'Drucktechniken',
    forbiddenWords: ['Sieb', 'Schablone', 'Pop Art', 'Durch']
  },

  // 3. PLASTIK / SKULPTUR / OBJEKT
  // A. Verfahren & Material
  {
    id: 'plastik-additiv',
    term: 'Plastik (Additiv)',
    definition: 'Aufbauendes Verfahren (Ton, Wachs, Guss) – „Antragen“.',
    category: 'PLASTIK',
    subCategory: 'Verfahren & Material',
    forbiddenWords: ['Aufbau', 'Ton', 'Wachs', 'Antragen']
  },
  {
    id: 'skulptur-subtraktiv',
    term: 'Skulptur (Subtraktiv)',
    definition: 'Wegnehmendes Verfahren (Stein, Holz) – „Abtragen“.',
    category: 'PLASTIK',
    subCategory: 'Verfahren & Material',
    forbiddenWords: ['Wegnehmen', 'Stein', 'Holz', 'Abtragen']
  },
  {
    id: 'montage-assemblage',
    term: 'Montage / Assemblage',
    definition: 'Zusammenfügen von (Fremd-)Objekten.',
    category: 'PLASTIK',
    subCategory: 'Verfahren & Material',
    forbiddenWords: ['Zusammen', 'Objekte', 'Fremd', 'Fügen']
  },
  {
    id: 'installation',
    term: 'Installation',
    definition: 'Ortsgebundene Anordnung im Raum.',
    category: 'PLASTIK',
    subCategory: 'Verfahren & Material',
    forbiddenWords: ['Ort', 'Raum', 'Anordnung', 'Gebunden']
  },
  {
    id: 'kinetische-plastik',
    term: 'Kinetische Plastik',
    definition: 'Bewegliche Objekte (Mobiles).',
    category: 'PLASTIK',
    subCategory: 'Verfahren & Material',
    forbiddenWords: ['Bewegung', 'Mobile', 'Kinetik', 'Dynamisch']
  },
  // B. Körper & Haltung
  {
    id: 'kontrapost',
    term: 'Kontrapost',
    definition: 'Harmonischer Ausgleich (Standbein/Spielbein, Beckenschiefstand).',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Standbein', 'Spielbein', 'Becken', 'Ausgleich']
  },
  {
    id: 'ponderation',
    term: 'Ponderation',
    definition: 'Gewichtsverteilung der Massen.',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Gewicht', 'Masse', 'Verteilung', 'Balance']
  },
  {
    id: 'figura-serpentinata',
    term: 'Figura serpentinata',
    definition: 'Geschraubte Drehung (Manierismus).',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Drehung', 'Schraube', 'Manierismus', 'Schlange']
  },
  {
    id: 'fruchtbarer-moment',
    term: 'Fruchtbarer Moment',
    definition: 'Der Zeitpunkt kurz vor oder nach dem Höhepunkt einer Handlung.',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Zeitpunkt', 'Höhepunkt', 'Handlung', 'Kurz']
  },
  {
    id: 'torso',
    term: 'Torso',
    definition: 'Unvollständiger Körper (Fragment).',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Unvollständig', 'Körper', 'Fragment', 'Teil']
  },
  {
    id: 'non-finito',
    term: 'Non-finito',
    definition: 'Das bewusst Unvollendete (Figur steckt noch im Stein).',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Unvollendet', 'Stein', 'Bewusst', 'Stecken']
  },
  {
    id: 'tektonik',
    term: 'Tektonik',
    definition: 'Der statische Aufbau / das Gerüst der Figur.',
    category: 'PLASTIK',
    subCategory: 'Körper & Haltung',
    forbiddenWords: ['Statik', 'Aufbau', 'Gerüst', 'Struktur']
  },
  // C. Raumbezug & Ansicht
  {
    id: 'allansichtigkeit',
    term: 'Allansichtigkeit',
    definition: 'Muss umrundet werden.',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Rund', 'Umrunden', 'Alle', 'Seiten']
  },
  {
    id: 'einansichtigkeit',
    term: 'Einansichtigkeit',
    definition: 'Für eine Hauptseite konzipiert (Nische).',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Eine', 'Seite', 'Nische', 'Haupt']
  },
  {
    id: 'raumweisend',
    term: 'Raumweisend',
    definition: 'Greift aktiv in den Raum (ausgestreckte Glieder).',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Greifen', 'Raum', 'Aktiv', 'Glieder']
  },
  {
    id: 'raumoffen',
    term: 'Raumoffen',
    definition: 'Raum dringt in die Plastik ein (Löcher, Durchbrüche).',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Dringen', 'Loch', 'Durchbruch', 'Offen']
  },
  {
    id: 'blockhaft',
    term: 'Blockhaft / Kernhaft',
    definition: 'Geschlossenes Volumen, Raum wird abgewiesen.',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Geschlossen', 'Block', 'Abweisen', 'Volumen']
  },
  {
    id: 'bas-relief',
    term: 'Bas-Relief (Flach)',
    definition: 'Kaum Erhebung (Relief).',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Flach', 'Erhebung', 'Wenig', 'Kaum']
  },
  {
    id: 'haut-relief',
    term: 'Haut-Relief (Hoch)',
    definition: 'Starke Erhebung (Relief).',
    category: 'PLASTIK',
    subCategory: 'Raumbezug & Ansicht',
    forbiddenWords: ['Hoch', 'Stark', 'Erhebung', 'Viel']
  },
  // D. Oberfläche
  {
    id: 'haptik',
    term: 'Haptik',
    definition: 'Tastrückmeldung (glatt, rau, poliert).',
    category: 'PLASTIK',
    subCategory: 'Oberfläche',
    forbiddenWords: ['Tasten', 'Fühlen', 'Glatt', 'Rau']
  },
  {
    id: 'fassung',
    term: 'Fassung',
    definition: 'Bemalung einer Skulptur.',
    category: 'PLASTIK',
    subCategory: 'Oberfläche',
    forbiddenWords: ['Bemalung', 'Farbe', 'Skulptur', 'Anstrich']
  },

  // 4. KOMPOSITION & BILDAUFBAU
  {
    id: 'goldener-schnitt',
    term: 'Goldener Schnitt',
    definition: 'Harmonisches Teilungsverhältnis (ca. 1:1,618).',
    category: 'KOMPOSITION',
    subCategory: 'Komposition',
    forbiddenWords: ['Harmonie', 'Verhältnis', 'Teilung', 'Mathematik']
  },
  {
    id: 'dreieckskomposition',
    term: 'Dreieckskomposition',
    definition: 'Wirkt stabil, ruhig, sakral (Renaissance).',
    category: 'KOMPOSITION',
    subCategory: 'Komposition',
    forbiddenWords: ['Dreieck', 'Stabil', 'Ruhig', 'Sakral']
  },
  {
    id: 'diagonalkomposition',
    term: 'Diagonalkomposition',
    definition: 'Wirkt dynamisch, bewegt (Barock).',
    category: 'KOMPOSITION',
    subCategory: 'Komposition',
    forbiddenWords: ['Diagonal', 'Dynamisch', 'Bewegt', 'Barock']
  },
  {
    id: 'staffelung',
    term: 'Staffelung',
    definition: 'Hintereinanderreihung für Raumtiefe.',
    category: 'KOMPOSITION',
    subCategory: 'Komposition',
    forbiddenWords: ['Hintereinander', 'Reihe', 'Tiefe', 'Raum']
  },
  {
    id: 'streuung-ballung',
    term: 'Streuung vs. Ballung',
    definition: 'Verteilung der Elemente.',
    category: 'KOMPOSITION',
    subCategory: 'Komposition',
    forbiddenWords: ['Verteilung', 'Elemente', 'Viel', 'Wenig']
  },
  {
    id: 'anschnitt',
    term: 'Anschnitt',
    definition: 'Motiv ragt über den Bildrand (Schnappschuss-Effekt).',
    category: 'KOMPOSITION',
    subCategory: 'Komposition',
    forbiddenWords: ['Rand', 'Ragen', 'Schnappschuss', 'Bild']
  }
];
