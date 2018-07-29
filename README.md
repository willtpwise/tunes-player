# Tunes player

> An iTunes music player, built with Vue.js

A copy of the app is running [here](http://tunes-player.gcbdv.s3-website-us-east-1.amazonaws.com/albums/879376073?term=Bam)

## Supported browsers

Supported on the latest version of the following browsers.

- [x] Safari Mac OS
- [x] Firefox Mac OS
- [x] Safari iOS
- [x] Google Chrome Mac OS

## Supported features

* Auto-search (key entry)
* When a song finishes, it rewinds and can be played again
* Current-song indicators
* Mobile responsive

## Local development

**Prerequisites:** NPM, Node

```
npm i
npm start
```
The app will spin up at [http://localhost:8080](http://localhost:8080)

## Production deployment

```
npm i
npm run build
```
A copy of the production build will appear in `/dist`, ready for deployment to an S3 bucket.

## Tech choices

* Frontend: Vue
* Unit tests: Jest
* State management: Vuex
* Styles: SCSS (no frameworks)
