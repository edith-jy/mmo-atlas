# MMO Atlas 
An interactive website for exploring MMO games using MMO Games API. 

## About
MMO Atlas lets users browse MMO games alphabetically using an A-Z navigation. Games are displayed as cards, and selecting a game opens a popup with additional information such as it's description, grenre, platform, and release date. 

The project uses a NodeJS and Express server to request data from the API while keeping the RapidAPI key hidden from the frontend. 

## Technologies 
- HTML 
- CSS 
- JavaScript 
- NodeJS 
- Express 
- RapidAPI 
- MMO Games API 

## Local Development
 You will need [NodeJS](https://nodejs.org) to work on this project. After downloading the project, install the dependencis: npm install  
 Create a `.env` file based `.env.example` and add you RapidAPI key: RAPIDAPI_KEY=your_key_here 
 Then start te server: npm run start 
 The website will be availble at: http://localhost:3000

## Vercel
The project can be deployed to Vercel using its Express support. 
When deplouing, add `RAPIDAPI_KEY` as an Environment Variable in Vercel. The API key should not be uploaded to GitHub or included directly in the frontend code. 