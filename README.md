
## Create Pizza App

 A test project for using Apollo with redux in a sample project.

 Backend is provided by [waldo.photos/pizza](http://core-graphql.dev.waldo.photos/pizza)


#### Main Dependencies

 * [React](https://github.com/facebook/react)
 * [React Router](https://github.com/ReactTraining/react-router)
 * [Apollo](https://github.com/apollographql/react-apollo)
 * [Redux](https://github.com/reduxjs/redux) 
 * [Styled Components](https://github.com/styled-components/styled-components)
 * [Formik](https://github.com/jaredpalmer/formik)
 * [Yup](https://github.com/jquense/yup)
 * [Webpack](https://github.com/webpack/webpack)
 * [Babel](https://github.com/babel/babel)

#### Code Quality Tools

 * [eslint](https://github.com/eslint/eslint)
 * [stylelint](https://github.com/stylelint/stylelint)
 * [jest](https://github.com/facebook/jest)
 * [enzyme](https://github.com/airbnb/enzyme)
 * [.editorconfig](http://editorconfig.org/)



## Installation

 Run
 ```yarn install```
 
 Vendors dll files should be generated automatically in `/public/vendors-[hash].js` every time you change your dependencies.

 ## Development

 Development server is provided by [express framework](https://github.com/expressjs/express). Webpack is injected to the app through [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware).
 
 To start the server just run: `yarn dev`
 
 ## Production
  
 Project files are generated into the `/public` folder using `yarn build:production` command.
 
 1) Use `yarn build:production` in order to build the static files.
 
 2) Use `yarn prod` command in order to start the app. This will start express server.

 ## Deployment on Heroku
 
 This application is Heroku ready. All you have to do is set `config:set NPM_CONFIG_PRODUCTION=false` in your your config. Everything else is prepared.
 
 ## Docker
 
 The development process is not dockerized. However, it is possible to run a production application from docker container:
 
 ```
 docker-compose up
 ```
