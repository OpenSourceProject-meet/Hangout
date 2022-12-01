const express = require('express');
const pwmodule = require("../pw")
const router = express.Router();


const user = { id: "000", pw: "000" };


// when valid id+pwd input, => crawling stage 
router.post("/accept", async (req, res) => {
    const isValid = true;
    if (isValid) {
        user.id = req.body.userid;

        user.pw = pwmodule.transSpecialToHex(req.body.password);
    }
    console.log(user);

    // Web Scraping Code here

    const data = await crawling();


    res.redirect("/");

});


async function crawling() {
    console.log("crawling start!");
    const response = await fetch("https://everytime.kr/user/login", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "https://everytime.kr/",
        "referrerPolicy": "origin",
        "body": "userid=" + user.id + "&password=" + user.pw + "&redirect=%2F",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const body = await response.text();
    console.log(body); // prints a chock full of HTML richness
    console.log("pw: " + user.pw);
    return body;

}

module.exports = router;