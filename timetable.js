const express = require('express');
const { Builder, By } = require('selenium-webdriver');

const app = express();
const port = 3001;
app.get('/', async (request, response) => {
    // Web Scraping Code here
    try {
        const data = await timetable();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({
            message: 'Server error occurred',
        });
    }
});



async function timetable() {

    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://everytime.kr/login');



};

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


