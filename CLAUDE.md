# Nakup – pokyny pre Claude Code

## Dohoda
- **Komunikuj vždy po slovensky, krátko a vecne.**
- **Pred každou zmenou kódu najprv krátko povedz, čo by si zmenil, a počkaj na potvrdenie („áno“).** Čítať súbory môžeš bez pýtania.
- Nakup je **samostatná appka**, nie je súčasťou Macka. (repozitár pipoPD/macka). Nemiešať ich.

## Bezpečnosť – repozitár je VEREJNÝ
- Do kódu nedávaj e-maily, heslá ani osobné údaje. Položky zoznamu sú len vo Firebase.

## O appke
- Spoločný nákupný zoznam pre dvoch ľudí (tie isté 2 účty ako Macka.).
- Beží na GitHub Pages: https://pipopd.github.io/nakup/ (vetva `main`, koreň). Po pushi do `main` sa sama aktualizuje do 1–2 minút.
- Statická PWA bez build kroku: `index.html` (HTML + Tailwind CDN + JS v jednom), `firebase-config.js`, `sw.js`, `manifest.webmanifest`, ikony.
- **Pri každej zmene kódu zvýš verziu cache v `sw.js`** (`nk-cache-vN`).
- Knižnice: Tailwind 3.4.16 (CDN), Phosphor Icons 2.1.1, SortableJS 1.15.2, Firebase SDK 10.14.1 (offline cache zapnutá).

## Firebase
- Projekt `mackine-torty` (zdieľaný s Macka., ale iné dokumenty), prihlásenie e-mail + heslo. Pravidlá povoľujú 2 účty pre `apps/**`.
- `apps/nakup`: `{master: [{key, title}]}` – naučené poradie tovaru (podľa neho sa nové položky zaraďujú).
- `apps/nakup/items/{id}`: `{title, amount, store, completed, pos}` – každá položka zvlášť (aby sa súbežné zmeny z dvoch mobilov neprepisovali); poradie podľa `pos`.

## Funkcie
Pridanie textom alebo hlasom (sk-SK), „rožky 10“ → názov + „10 ks“, viac položiek naraz („mlieko, chlieb a vajcia 10“; pri hlase aj podľa slov – `splitVoice`: číslo k tovaru, prídavné meno -ý/-á/-é/-í/-ie s ďalším slovom, známy viacslovný tovar pokope), našepkávanie z naučeného tovaru (`master`), lišta Späť (5 s) po odškrtnutí/zmazaní/vyčistení, režim do obchodu (veľké písmo, ťuknutie alebo potiahnutie doprava odškrtne, bez úprav/mazania, displej nezhasína; zapamätá sa v zariadení v localStorage `nakup_shop_mode`), množstvo a oddelenie, záložky Na nákup / V košíku, poradie ťahaním alebo šípkami (učí sa), úprava, mazanie, vyčistiť vybavené, vymazať všetko, odhlásenie, značka „offline“.
