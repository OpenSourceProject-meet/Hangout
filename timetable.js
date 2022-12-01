const express = require('express');
const { Builder, Capabilities, By, until } = require('selenium-webdriver');



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
    let caps = new Capabilities();
    caps.setPageLoadStrategy("eager"); //cacsspabilities : for speed up

    driver = await new Builder().withCapabilities(caps).forBrowser('chrome').build();
    await driver.get('https://everytime.kr/login');
    //input id, pwd.
    await driver.findElement(By.css('[name="userid"]')).sendKeys("summer2788");
    await driver.findElement(By.css('[name="password"]')).sendKeys("whddms123!");
    await driver.findElement(By.css('[type="submit"]')).click();

    //my time table 
    await driver.get("https://everytime.kr/timetable");
    //check if time table is fully loaded.
    await driver.wait(until.elementLocated(By.className('wrap')), 30000, 'Timed out after 30 seconds', 5000);
    //get timetable
    let elements = await driver.findElements(By.className('wrap'));

    for (let e of elements) {
        console.log(await e.getText());
    }




};

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


