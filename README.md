Chatty App
=====================

Chatty App is a minamalist real time chat application concept using WebSockets. 
** App is currently in Development and server would have to be redone for actual production deployment **

To get started

Git Clone https://github.com/Copterdoctor/chatty-app.git
cd chatty-app
npm install
npm run build
npm start

Open a second terminal window to start sockets server
cd /chatty-app/chatty-server
npm install
npm start

Goto http://localhost:3000 and enjoy!

You can open multiple windows on localhost to simulate other users or if your computer allows other users should be able to connect via your computers local lan address at port 3000.


### Dependencies

dependencies: 
* randomcolor
* react
* react-dom
* react-retro-hit-counter
* express 
* ws
* uuid


devDependencies: 
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack-cli
* webpack
* webpack-dev-server
    
    
#Screenshots
![Chatty App](https://github.com/Copterdoctor/chatty-app/blob/master/chatty-server/screenshots/ChattyApp.png)
