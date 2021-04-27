# Travel Planner App
A Node.js travel planner app that creates profiles for planned travel destinations from data drawn pulled from various APIs.

## Features
- Captures user inputs for travel destinations and builds profiles comprising of the following:
    - Travel destination: City, Country
    - Featured image of the city. Where this is not available a featured image of the country is displayed
    - Typical weather for the planned departure date where this is available
    - Countdown to the departure date
- User can save or remove destinations from the planner

## Development
- Development environment e.g. Visual Studio Code
- [Express Node.js](https://expressjs.com/)
- [Webpack](https://webpack.js.org/)
- [GeoNames API](https://www.geonames.org/) for longitude and latitude data
- [Weatherbit API](https://www.weatherbit.io/) for weather data
- [Pixabay API](https://pixabay.com/service/about/api/) for featured image
- [Github](https://github.com/) for version control
- [Heroku cloud web hosting](https://www.heroku.com/)

## Dependencies
- [Node.js with npm](https://nodejs.org/)
- [express](https://www.npmjs.com/package/express)
- [@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)
- [spin.js](https://spin.js.org/)
- [webpack](https://www.npmjs.com/package/webpack)
- [webpack-cli](https://www.npmjs.com/package/webpack-cli)

## devDependencies
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [babel-loader](https://www.npmjs.com/package/babel-loader)
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
- [css-loader](https://www.npmjs.com/package/css-loader)
- [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack)
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
- [jest](https://www.npmjs.com/package/jest)
- [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)
- [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
- [sass](https://www.npmjs.com/package/sass)
- [sass-loader](https://www.npmjs.com/package/sass-loader)
- [style-loader](https://www.npmjs.com/package/style-loader)
- [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)
- [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)
- [workbox-webpack-plugin](https://www.npmjs.com/package/workbox-webpack-plugin)

## Installation
- Install Node.js using installer from https://nodejs.org
- Create and navigate to the project folder from the the command line
- Copy the project files from this repo into the root folder of your project
- [Install remaining dependencies from the command line](https://docs.npmjs.com/cli/v7/commands/npm-install)

- Create a .env file in the root folder of your project. Add your GeoNames, Weatherbit and Pixabay API keys to this file

## Run the Project
### Build your project from the commend line:

`npm run build-prod`

### Start the server from the command line:

`npm run start`

### View the app in your browser at:
http://localhost:5000

## Deployment
The Travel Planner App is hosted for demonstration purposes at https://ngw-travel-planner-app.herokuapp.com/

## Release History
- 1.0.0
    - First release - 27 Apr 2021

## About this Project
This project is a requirement on the [Udacity Frontend Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011/)

## Developer
Gbenga Oso