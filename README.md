# _{Inventory App}_

#### _{An application to help automate the physical inventory for libraries using ExLibris Alma.}, {02/21/2019}_

#### By _**{Chris Underwood}**_

## Description

_{ The current version of the application grabs a barcode via a barcode scanning and automatically send the barcode to an ALMA API and returns an object that contains the bib, holdings, and item records. Selected fields are shown on the screen. There is a next field on the screen that maps to item_note_3 where notes can be saved. When the Update Inventory button is pressed, the object is returned with item_note_3 and a new date object in inventory_date for today's date. The application has a React frontend and a node backend each with their own servers. }_

## Setup/Installation Requirements

* Make sure you have Node.js installed globally
* Clone or fork the files to a location of your choice
* Go to the folder/location of the download or where you have moved the files
* On your terminal go to backend.
* Run npm i
* At the root of backend create an .env file
* Fill in the data for the 4 environmental variables: EXLIBRIS_API_ROOT, EXLIBRIS_API_PATH, EXLIBRIS_API_BIB_GET_KEY, EXLIBRIS_API_BIB_UPDATE_KEY
* At the terminal type npm run start to start the backend server.
* In your web browser, navigate to localhost:9000 to see if the server is running.
* On a new terminal instance, navigate to frontend
* Run npm i
* On the terminal run npm run start to start the front end server.
* Navigate to localhost:3000 to see if the frontend is live


_{Leave nothing to chance! You want it to be easy for potential users, employers and collaborators to run your app. Do I need to run a server? How should I set up my databases? Is there other code this app depends on?}_

## Known Bugs

_{ At this time, the application is behaving as designed. We have plans to add more features such as adding more options for updating data and reviewing security options. }_

## Support and contact details
_{ https://knowledge.exlibrisgroup.com/Alma, libsys-group at brandeis dot edu }_

## Technologies Used

_{ Node.js. React.js, vanilla JavaScript, Express.js, nodemon, axios, body-parser }_

### License

*{MIT License

Copyright (c) [2020] [Brandeis University Library]

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
SOFTWARE.}*

Copyright (c) 2020 **_{Chris Underwood, Library Applicaiton Developer, Brandeis University}_**
