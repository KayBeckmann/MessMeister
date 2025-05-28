# Prüf-App: Verwaltung von Prüfungen und Anlagen

Eine webbasierte Anwendung zur Verwaltung von Firmen, Benutzern, Kunden, Standorten und Anlagen, inklusive der Planung, Durchführung und Dokumentation von technischen Prüfungen. Dieses Projekt wird mit ExpressJS, PUG und einer SQL-Datenbank (empfohlen: PostgreSQL) entwickelt.

## Übersicht

Das Ziel dieser Anwendung ist es, ein zentrales System für Firmen bereitzustellen, um ihre prüfpflichtigen Anlagen und Geräte zu verwalten. Es ermöglicht eine strukturierte Erfassung von Kunden, deren Standorten und den jeweiligen Anlagen. Ein besonderes Augenmerk liegt auf der flexiblen Definition von Anlagentopologien und der detaillierten Erfassung von Prüfergebnissen sowie der Generierung von Prüfprotokollen.

## Kernfunktionen

* **Mehrstufige Benutzerverwaltung:**
    * **SuperAdmin:** Verwaltet Firmen (Anlegen, Freischalten, Sperren).
    * **Firmen-Admin:** Verwaltet Benutzer innerhalb der eigenen Firma.
    * **User/Prüfer:** Verwaltet Kunden, Standorte, Anlagen und führt Prüfungen durch.
* **Firmenverwaltung:** Firmen können gesperrt werden, wodurch sich deren Benutzer nicht mehr anmelden können.
* **Kunden- & Standortverwaltung:** Jeder Firma können Kunden zugeordnet werden, und jeder Kunde kann mehrere Standorte haben.
* **Anlagenverwaltung:** Jeder Standort kann mehrere Anlagen enthalten.
* **Flexible Anlagentopologie:**
    * Anlegen von individuellen Prüfobjekten (z.B. Leitern, Feuerlöscher) mit UUID, Bezeichnung, Beschreibung und Prüfintervall.
    * Anlegen von hierarchischen Strukturen (z.B. RCD-Kreise mit untergeordneten Sicherungskreisen).
* **Detaillierte Prüfdatenerfassung:**
    * **RCD:** Auslösestrom, Auslösezeit, Prüfdatum, Prüfintervall.
    * **Stromkreis:** Isolationsmesswerte, Schleifenimpedanz, Kurzschlussstrom, Prüfdatum, Prüfintervall.
    * Jede Prüfung wird mit dem Prüfer und dem Datum protokolliert.
* **Dashboard:** Übersicht über die eigenen Kunden und deren nächste fällige Prüfungen.
* **PDF-Protokollierung:** Generierung von PDF-Prüfprotokollen für Standorte, Anlagen oder spezifische Kreise.
* **Aktiv-/Inaktiv-Status:** Nicht mehr genutzte Standorte, Anlagen oder Kreise können deaktiviert werden und erscheinen nicht mehr in Übersichten und Protokollen.
* **Löschlogik:** Sicheres Löschen ist nur möglich, wenn keine untergeordneten Elemente oder Prüfungen vorhanden sind.
* **Responsives Design:** Die Anwendung ist für die Nutzung auf verschiedenen Geräten ausgelegt.

## Technologie-Stack

* **Backend:** Node.js, Express.js
* **Frontend (Server-Side Rendering):** PUG (Jade)
* **Styling & Responsiveness:** Bootstrap (oder ein anderes CSS-Framework)
* **Datenbank:** SQL (Empfehlung: PostgreSQL)
* **ORM / Query Builder:** Sequelize
* **Authentifizierung:** Passport.js (Local Strategy)
* **PDF-Erstellung:** pdfmake (oder Alternative)
* **Sonstige:** bcrypt, express-validator, helmet, csurf, dotenv, uuid, date-fns

## Voraussetzungen

Stellen Sie sicher, dass die folgenden Tools auf Ihrem System installiert sind:

* [Node.js](https://nodejs.org/) (Version 18.x oder höher empfohlen)
* [npm](https://www.npmjs.com/) (wird mit Node.js geliefert)
* [Git](https://git-scm.com/)
* Eine laufende [PostgreSQL](https://www.postgresql.org/)-Instanz (oder eine andere SQL-Datenbank, die von Sequelize unterstützt wird).

## Installation & Setup

Führen Sie die folgenden Schritte aus, um das Projekt lokal einzurichten und zu starten:

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/IhrUsername/IhrRepoName.git](https://github.com/IhrUsername/IhrRepoName.git)
    cd IhrRepoName
    ```

2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

3.  **Datenbank einrichten:**
    * Erstellen Sie eine neue Datenbank in Ihrer SQL-Instanz (z.B. `pruef_app_db`).

4.  **Umgebungsvariablen konfigurieren:**
    * Erstellen Sie eine Datei namens `.env` im Hauptverzeichnis des Projekts.
    * Kopieren Sie den Inhalt aus einer eventuellen `.env.example` oder verwenden Sie die folgende Vorlage und passen Sie die Werte an Ihre Umgebung an:
        ```dotenv
        # Datenbank Konfiguration
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=pruef_app_db
        DB_DIALECT=postgres

        # Session Geheimnis (ersetzen durch einen langen, zufälligen String)
        SESSION_SECRET=a_very_long_and_random_secret_key_for_sessions

        # Server Port
        PORT=3000

        # Node Umgebung (development oder production)
        NODE_ENV=development
        ```

5.  **(Optional) Datenbank-Migrationen ausführen:**
    * Wenn Sie Sequelize-Migrationen verwenden (empfohlen), führen Sie diese aus:
        ```bash
        # Ggf. zuerst sequelize-cli global oder als dev-dependency installieren
        # npm install --save-dev sequelize-cli
        npx sequelize-cli db:migrate
        ```

6.  **Server starten:**
    * Für die Entwicklung (mit automatischem Neustart via nodemon):
        ```bash
        npm run dev
        ```
    * Für den Produktionsbetrieb:
        ```bash
        npm start
        ```

7.  **Anwendung öffnen:**
    * Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:3000` (oder dem Port, den Sie in `.env` konfiguriert haben).

## Nutzung

* **Login:** Melden Sie sich mit einem SuperAdmin-Konto an (dieses muss initial manuell oder über ein Seed-Skript erstellt werden) oder mit einem Firmen-Konto.
* **Navigation:** Nutzen Sie die Navigation, um Firmen, Benutzer, Kunden etc. zu verwalten und Prüfungen zu erfassen.

## Mitwirkung (Optional)

Wenn Sie zur Entwicklung beitragen möchten, folgen Sie bitte diesen Schritten:

1.  Forken Sie das Repository.
2.  Erstellen Sie einen neuen Branch (`git checkout -b feature/MeineTolleFunktion`).
3.  Machen Sie Ihre Änderungen und committen Sie diese (`git commit -m 'Füge MeineTolleFunktion hinzu'`).
4.  Pushen Sie zum Branch (`git push origin feature/MeineTolleFunktion`).
5.  Öffnen Sie einen Pull Request.

## Lizenz (Optional)

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE.md). (Fügen Sie eine `LICENSE.md`-Datei hinzu, wenn Sie eine Lizenz vergeben möchten).

---

*Dieses README wurde am 28. Mai 2025 generiert.*
