
# Wall-Controller

Im Rahmen der Abschlussarbeit *The Wall - Plattform für großflächige interaktive Inhalte*  wurde eine Plattform entwickelt, die aus vier wichtigen Komponenten besteht.
## The Wall
**Wall-Screen**
*Vue 3 Typscript*

Auf dem Wall-Screen werden die interaktiven Inhalte die sogenannten Wall-Apps angezeigt. Die Wall-Screem ist
für große Bildschirme und für ein großes Publikum gedacht,

**Wall-Server**
*Spring Boot*

Der Wall-Server ermöglicht die Interaktion zur Wall-Screen und den den Wall-Apps auf der Wall-Screen.
Dazu verwaltete er die Inhalte der Wall-Screen und regelt auch den Ablauf der Wall-Apps.

**Wall-UI-Config**
*Rest-Schnittstelle/Thymleaf*

Die Wall-UI-Config eröglicht Administratoren den Ablauf der Wall-Apps zu beeinflussen, Wall-Messages zu erstellen und sich die nächste Wall-App anschauen zu lassen.

**Wall-Controller**
*Vue 3 Typscript*

Der Wall-Controller nimmt die Interaktion der Nutzer auf und leitet diese an den Wall-Server weiter. Genauso
empfängt er auch Interaktionen vom Wall-Server.

## Interaction-Controls
Folgende Interaction-Controls bietet der Wall-Controller und diese können auch beliebig erweitert werden
- Swipe
- Selection (radio oder checkbox)
- TextInput
- Handybewegung (Devicemotion und Deviceorientation)
- Pfeil-Tasten

**Die Handybewegung wird nur im Secured Context (HTTPS) erkannt.**

## Lokal laufen lassen

Dependencies installieren
```bash
  npm install
```
Wall-Controller starten

```bash
  npm run dev
```

Um die Funktionen des Wall-Controllers nutzen zu können, muss der Wall-Server und die Wall-Screen auf dem selben Server und Port laufen. Um die komplette Plattform laufen zu lassen, müssen folgende Schritte durchgeführt werden:
