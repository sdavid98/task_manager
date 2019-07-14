/*táblázat:
    5 vagy 6 sor, 7 oszlop
    fejléc
    dátom
    ikon hozzáadáshoz
    nap definiálása: nap száma (1-31) + prevmonth/current/next data-attr 

alap/hónap váltásakor (
    1. naptár rajz 
    2. látszó dátum alapján adatkérés
    3. adat kiírása
)

adat props = {
    id : string (6karakter random),
    user: string,
    month: string,
    startDay: int,
    lengt: int(days),
    title: string,
    description: string (mutasson txt/csv-re),
    tag: string,
    duration: int (hours),
    watchers: string (user/self),
    state: string (todo/doing/test/done),
    public: bool,
    comment: string (txt/csv-re),
}

adatbázis: userek, 1 tábla/hónap, tags, 
*/

import drawCalendar from '/drawCalendar.js';

console.log(drawCalendar(2019, 6));