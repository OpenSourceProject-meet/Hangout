const { Builder, By } = require('selenium-webdriver');



async function timetable() {

    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.youtube.com/c/LambdaTest/videos');

    driver.get('https://everytime.kr/login');



};




