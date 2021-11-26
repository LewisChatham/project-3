[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# My Wishlist Checker

## Table of Contents

- [Link-To-App](#link-to-app)
- [Description](#description)
- [Installation](#installation)
- [Running-The-App](#running-the-app)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Link-To-App

Link to application: https://rocky-reaches-82729.herokuapp.com/

## Description

We wanted to give consumers a quick and easy way of planning their holiday shopping. No longer will they have to struggle to remember each person that they have to buy for, inevitably forget a gift they should've got, or just flat out ending up spending way too much. With our application, you can plan out wishlists for all your loved ones, and save yourself some hassle. This application allows a user to login or signup, and oce they have, they care able to create multiple wishlists and enter a spending limit if they so wish. Within each wishlist a user can add multiple items to the list and check off whether the item was bought.

We started this project in order to learn how to use React and MongoDB better, as well as test our overall coding knowledge and demonstrate.

## Installation

To install your own version that works locally, first, clone the repo to your local repository. Once you ahve done this, type `npm i` while in the root of the folder to install all dependencies (note, please make sure graphql is v15.x.x, and @apollo/server v2.x.x are installed, or the application will not work). make sure you have `MongoDB` installed on your device (and optionally `Robo 3T`). Then type `npm run develop` to start both the express erver and the `React` development server and you can test the app at `localhost:3000`.

## Running-The-App

To deploy your own version of the application, make sure you have a heroku account and a `MongoAtlas` database set up. Follow [these instrucions](https://devcenter.heroku.com/articles/git) to deploy your application to heroku. Once you have done this, go to your MongoAtlas database and find the option to connect application and copy the connection string. Update the connection string with your username, password and database name and go to the heroku page that relates to your application. On the settings tab, find the config vars section and in the `KEY` section, enter `MONGODB_URI` and in the `VALUE` section, enter your updated connection string. Once you have done this, the application should work in full.

## Usage

![demo](./assets/GiftTrackerGif.gif)

## Credits

All of the work in this project was provided by: Matthew Walford, Lewis Chatnam, and Kevin Ryner.
Github profiles below:

Matthew Walford: https://github.com/Esper06

Lewis Chatnam: https://github.com/LewisChatham

Kevin Ryner: https://github.com/kevinjr1998

## License

MIT License

Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
