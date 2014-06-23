# Image surface
Synchronized image display in the browser, using socket.io. Great for showing images on a second screen or projector.

## Setup
Use `npm install` to download all npm dependencies *(express, socket.io, body-parser)*

## Usage
`node index.js` starts a server on localhost:3000. Open the page in a browser to view the surface.
`scripts/` contains scripts to send images to the server.
There are scripts to send a screenshot of the current window to the surface.
