#   MojaJura

https://mojajura.herokuapp.com/#

![Alt text](
     https://github.com/Luqapo/MojaJura/blob/master/img/Zrzut%20ekranu%20z%202018-09-19%2016-18-51%20%5Bwww.imagesplitter.net%5D.jpeg
    )

Aplikacja służąca do rejstrowania swoich przjść wspinaczkowych,z założenia ma posiadać rozbudowaną baze dróg.

Technologie użyte: React, Redux, HTML5, CSS3, Webpack, NODE.js, Express.js, mongoDB.

# Instalacja: 
    - sklonować repozytorium,
    - zainstalować Json-server,
    - uruchomić npm i(w repozytorium jest plik package.json który zawiera potrzebne zależności),
    - uruchomić Json-server w katalogu DB z ustalonym portem komendą -  'json-server --watch --port 3010 jura.json',
    - uruchomić Webpack w głownym katalogu projektu komendą -  'webpack run build',
    
# Funcjonalności:
  - aplikacja generuje wszystki listy na podstawie bazy danych,
  - możliwość logowania,
  - możliwość dodawania swoich przejść,
  - możliwość dodawania nowych dróg do bazy


# ToDo:
- dopracować zależności związane z logowaniem(możliwość rozbudowywania bazy tylko przez użytkowników z uprawnieniami, możliwość   dodawania przejść tylko przez zalogowanych użytkowników, listy przejść podpięte pod konkretnych użytkowników)
- dopasowanie aplikacji do pracy na różnych urządzeniach - RWD (prawdopodobie zastosowanie reactstrap),
- ogólna porpawa wyglądu aplikacji (porawa czytelnośći list, dopracowanie menu),
- uruchomić aplikacje !!!
- hasło rozwiązać przez sume kontrolną
- błedy nie wyrzucać w konsoli tylko w okienku !
 

  
