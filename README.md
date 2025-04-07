
<h1>
    <img src="frontend/public/icon.svg"
    width="40"
    height="40"
    style="float:left; margin-right: 10px;"
    >
    Google Trendle
</h1>


Google Trendle is a word game, aimed at guessing the trend in popularity of given topics over time.

## Overview
Implemented as a full-stack application using PostgreSQL, Redis, Flask, ReactJS, and Node.js. The Mantine component library is used for the frontend UI. SerpAPI is used to fetch data from Google Trends, due to consistent invalid 429 Too Many Request errors with the Pytrends library.

## How To Run
1. Clone the repository using ```git clone https://github.com/TubTubTub/google-trendle.git```
2. Create an ```.env``` file using ```.env.example``` as a template
3. Run the ```docker-compose.yml``` file and navigate to http://localhost:8080
4. If using an external address for the backend, change environment variables and reconfigure ```docker-compose.yml``` to use ```nginx.conf``` instead

## Example
Currently deployed at https://trendle.tubtubtub.com using Google Cloud Run.

> [!WARNING]
> Due to the free tier of serverless deployment, visiting the website may require a cold-start, and take up to a minute to load
> Due to limit on free requests using SerpAPI, the game may be unserviceable