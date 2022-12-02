const express = require('express');
const router = express.Router();
const { Builder, Capabilities, By, until } = require('selenium-webdriver');
const user = { id: "000", pw: "000" };
const subjects = [[], [], [], [], []];
const friendSubjects = []; //3차원 배열 
const friends = [];
const parser = require("node-html-parser");


// when valid id+pswd input, => crawling stage 
router.post("/accept", async (req, res) => {

    // res.redirect("/");
    const isValid = true;
    if (isValid) {
        user.id = req.body.userid;
        user.pw = req.body.password;
    }
    console.log(user);
    // Web Scraping Code here

    await timetable();
    console.log(subjects);
    console.log('friend: ', friends);
    res.render('users/new', { ssubject: subjects, friendss: friends })




});

router.post("/timetable", async (req, res) => {
    console.log("응답");
    console.log(req.body);
    let checkBoxArray = JSON.stringify(req.body);
    checkBoxArray = JSON.parse(checkBoxArray);
    checkBoxArray = checkBoxArray.array;
    console.log(checkBoxArray.length);


    //driver define
    let caps = new Capabilities();
    caps.setPageLoadStrategy("normal"); //capabilities : for speed up

    driver = await new Builder().withCapabilities(caps).forBrowser('chrome').build();
    //순회하며 친구 시간표 크롤링 
    for (let i = 0; i < checkBoxArray.length; i++) {
        if (checkBoxArray[i]) {
            console.log("friends site:  ", friends[i][0]);
            await driver.get('https://everytime.kr' + friends[i][0]);

            //check if time table is fully loaded.
            await driver.wait(until.elementLocated(By.xpath('//*[@id="container"]/div/div[2]/table/tbody/tr')), 30000, 'Timed out after 30 seconds', 5000);
            // Get element with tag name 'table'
            let element = await driver.findElement(By.xpath('//*[@id="container"]/div/div[2]/table/tbody/tr'));

            // // Get all the elements available with class name 'tablebody'
            // let elements = await element.findElements(By.className("tablebody"));
            element = await element.getAttribute('outerHTML');
            let table = parser.parse(element);

            //friend 순회 
            let friendSub = [[], [], [], [], []];
            //td를 뽑아내야함 td 7개 (월,화,수,목,금)
            const td = table.querySelectorAll("tr > td");
            for (var j = 0; j < td.length - 2; j++) {
                let subject = td[j].querySelectorAll(".subject")

                subject.forEach((sb) => {
                    //make object {height: xx , top: xx}
                    // console.log("style은 다음과 같다: ", sb.attributes.style);
                    let tempt = {};
                    let temp = [];
                    b = sb.attributes.style.split(';')
                    // console.log('b: ', b)
                    for (var k = 0; k < 2; k++) {
                        c = b[k].split(':')
                        // console.log('c: ', c)
                        d = c[1].replace('px', '');
                        // console.log('d: ', d)
                        temp.push(parseInt(d, 10));
                    }
                    // b.forEach(element => {
                    //     c = element.split(':')
                    //     console.log('c: ', c)
                    //     d = c[1].replace('px', '');
                    //     temp.push(parseInt(d, 10));
                    // })
                    tempt.height = temp[0];
                    tempt.top = temp[1];
                    friendSub[j].push(tempt);



                });

            };
            //friendSub push
            friendSubjects.push(friendSub);


        }

    }


    console.log("friends: ", friendSubjects);
    res.json(friendSubjects)
    driver.quit();

})


async function timetable() {
    let caps = new Capabilities();
    caps.setPageLoadStrategy("normal"); //capabilities : for speed up

    driver = await new Builder().withCapabilities(caps).forBrowser('chrome').build();
    await driver.get('https://everytime.kr/login');

    //input id, pwd.
    await driver.findElement(By.css('[name="userid"]')).sendKeys(user.id);
    await driver.findElement(By.css('[name="password"]')).sendKeys(user.pw);
    await driver.findElement(By.css('[type="submit"]')).click();

    //my time table 
    await driver.get("https://everytime.kr/timetable");
    //check if time table is fully loaded.
    await driver.wait(until.elementLocated(By.xpath('//*[@id="container"]/div/div[2]/table/tbody/tr')), 30000, 'Timed out after 30 seconds', 5000);
    // Get element with tag name 'table'
    let element = await driver.findElement(By.xpath('//*[@id="container"]/div/div[2]/table/tbody/tr'));
    // // Get all the elements available with class name 'tablebody'
    // let elements = await element.findElements(By.className("tablebody"));
    element = await element.getAttribute('outerHTML');
    let table = parser.parse(element);
    //td를 뽑아내야함 td 7개 (월,화,수,목,금)
    const td = table.querySelectorAll("tr > td");
    for (var i = 0; i < td.length - 2; i++) {
        let subject = td[i].querySelectorAll(".subject")

        subject.forEach((sb) => {
            //make object {height: xx , top: xx}
            // console.log("style은 다음과 같다: ", sb.attributes.style);
            let tempt = {};
            let temp = [];
            b = sb.attributes.style.split(';')
            // console.log('b: ', b)
            for (var k = 0; k < 2; k++) {
                c = b[k].split(':')
                // console.log('c: ', c)
                d = c[1].replace('px', '');
                // console.log('d: ', d)
                temp.push(parseInt(d, 10));
            }
            // b.forEach(element => {
            //     c = element.split(':')
            //     console.log('c: ', c)
            //     d = c[1].replace('px', '');
            //     temp.push(parseInt(d, 10));
            // })
            tempt.height = temp[0];
            tempt.top = temp[1];
            subjects[i].push(tempt);

        });
    };

    //friends

    await driver.get('https://everytime.kr/friend');
    //check if friend table is fully loaded.
    let ele = await driver.wait(until.elementLocated(By.css('.friend')), 10000);
    setTimeout(() => console.log("after"), 60);
    console.log(ele);
    await driver.wait(until.elementLocated(By.xpath('//*[@id="container"]/div[2]')), 30000, 'Timed out after 30 seconds', 5000);
    // Get element with tag name 'table'
    let element2 = await driver.findElement(By.xpath('//*[@id="container"]/div[2]'));
    element2 = await element2.getAttribute('outerHTML');
    let friendList = parser.parse(element2);
    //친구를 뽑아내자 
    const friend = friendList.querySelectorAll(".friend");
    for (var i = 0; i < friend.length; i++) {
        let temfreind = [];
        temfreind.push(friend[i].getAttribute("href"));
        temfreind.push(friend[i].innerText);
        console.log(temfreind);
        friends.push(temfreind);

    }

    driver.quit()


};

module.exports = router;

