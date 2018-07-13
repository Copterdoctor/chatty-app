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

"dependencies": {
    "randomcolor": "^0.5.3",
    "react": "16.4.1",
    "react-dom": "16.4.1",
    "react-retro-hit-counter": "^1.0.1"
    "express": "^4.16.3",
    "ws": "^5.2.2",
    "uuid": "^3.3.2"
}

"devDependencies": {
    "babel-core": "6.26.3",
    "babel-loader": "7.1.5",
    "babel-preset-es2015": "6.24.1",
    "babel-preset-react": "6.24.1",
    "babel-preset-stage-0": "6.24.1",
    "css-loader": "1.0.0",
    "node-sass": "4.9.2",
    "sass-loader": "7.0.3",
    "sockjs-client": "^1.1.5",
    "style-loader": "0.21.0",
    "webpack-cli": "^3.0.8",
    "webpack": "^4.15.1",
    "webpack-dev-server": "3.1.4"
    }
    
#Screenshots
![Chatty App](https://github.com/Copterdoctor/chatty-app/blob/master/chatty-server/screenshots/ChattyApp.png)
