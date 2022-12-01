const express = require('express');
const router = express.Router();
const { Builder, Capabilities, By, until } = require('selenium-webdriver');
const user = { id: "000", pw: "000" };


// when valid id+pwd input, => crawling stage 
router.post("/accept", async (req, res) => {

    // res.redirect("/");
    const isValid = true;
    if (isValid) {
        user.id = req.body.userid;
        user.pw = req.body.password;
    }
    console.log(user);
    // Web Scraping Code here

    const data = await timetable();
    res.render("index", { timetable: data })




});


async function timetable() {
    let caps = new Capabilities();
    caps.setPageLoadStrategy("eager"); //capabilities : for speed up

    driver = await new Builder().withCapabilities(caps).forBrowser('chrome').build();
    await driver.get('https://everytime.kr/login');

    //input id, pwd.
    await driver.findElement(By.css('[name="userid"]')).sendKeys(user.id);
    await driver.findElement(By.css('[name="password"]')).sendKeys(user.pw);
    await driver.findElement(By.css('[type="submit"]')).click();

    //my time table 
    await driver.get("https://everytime.kr/timetable");
    //check if time table is fully loaded.
    await driver.wait(until.elementLocated(By.xpath('//*[@id="container"]/div')), 30000, 'Timed out after 30 seconds', 5000);
    // Get element with tag name 'table'
    let element = await driver.findElement(By.xpath('//*[@id="container"]/div'));
    // // Get all the elements available with class name 'tablebody'
    // let elements = await element.findElements(By.className("tablebody"));
    return await element.getAttribute('outerHTML');





};

module.exports = router;