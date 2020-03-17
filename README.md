[![KAFE Logo](https://www.kafe.or.kr/images/kor/layout/logo.gif)](https://webinar.kafe.or.kr)

KAFE Webinar Player lets you play KAFE Webinar(BigBlueButton) Recordings.
This code written cross-platform desktop applications using JavaScript, HTML and CSS.
It is based on [Node.js](https://nodejs.org/) and [Electron framework](https://www.electronjs.org/).

## Build

- Install [Node.js](https://nodejs.org)
- Install [Electron Builder](https://www.electron.build/)

```sh
npm install -g electron-builder
```

- Download this repo and install modules

```sh
git clone https://github.com/kafe-federation/webinar-player
cd webinar-player
npm install
```

## Run Application

```sh
npm start
```

## Build Installer

```sh
electron-builder build --win # for windows
electron-builder build --mac # for mac os
```
