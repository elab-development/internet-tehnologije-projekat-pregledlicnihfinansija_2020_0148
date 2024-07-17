# Pregled Ličnih Finansija

Aplikacija za pregled ličnih finansija pruža korisnicima mogućnost efikasnog praćenja, planiranja i upravljanja njihovim finansijama. Korisnici se mogu regostrovati i time dobijaju mogućnost upotrebe aplikacije. Nakon što se uloguju, unose svoje transakcije i određuju kategoriju kojoj one pripadaju. Korisnici u svakom trenutku imaju pun uvid u svoje transakcije i sami smišljaju najoptimaliniji način upotrebe svojih finansija.

## Funkcionalnosti

- Dodavanje, izmena i brisanje transakcija
- Kategorizacija transakcija
- Kviz vezan za upravljanje finansijama
- Admin panel
- Praćenje popularnosti kripto valuta

## Tehnologije Korišćene

- **Frontend:** HTML, CSS, React
- **Backend:** Laravel
- **Baza Podataka:** MySQL

## Instalacija i Pokretanje

1. Klonirajte repozitorijum:

   ```
   git clone https://github.com/elab-development/internet-tehnologije-projekat-pregledlicnihfinansija_2020_0148.git
   ```

2. Pokretanje backend-a:

Pokrenite Apache server i MySQL bazu podataka (možete koristiti XAMPP ili WAMP). Kreirajte novu bazu podataka u phpMyAdmin-u i dajte joj bilo koji naziv. Otvorite folder pregledLicnihFinansija u nekom code editoru(preporučen je Visual Studio Code).
Podesite konekciju ka bazi podataka u .env fajlu tako što upisujete ime koje ste dali bazi.

Zatim otvarate terminal unutar foldera i pokrecete sledeće komande:

   ```
    php artisan migrate:fresh --seed
  ```

Ova komanda popunjava bazu podacima.

   ```
    php artisan serve
   ```

Ova komanda pokreće backend aplikacije.

3. Pokretanje frontend-a:

Otvorite folder react_domaci u nekom code editoru(preporučen je Visual Studio Code).

Zatim otvarate terminal unutar foldera i pokrecete sledeću komandu:

   ```
    npm start
   ```

Na taj način pokrećete frontend aplikacije. Od ovog trenutka možete koristiti aplikaciju.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/1IMeAlJr)
