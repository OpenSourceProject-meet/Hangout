# Hangout :shipit:    

<img src="thumbnail.png" alt="Hang Out!" height="256px" align="left">

<a href="https://opensource.facebook.com/support-ukraine">
  <img src="https://img.shields.io/badge/Support-Ukraine-FFD500?style=flat&labelColor=005BBB" alt="Support Ukraine - Help Provide Humanitarian Aid to Ukraine." />
</a>
<br>
This is an Open Source Project that aims at making it convenient for friends to match their schedule and discover new places to hang out near SKKU.


We noticed that it was visually difficult for a bunch of friends to conveniently compare their schedules and meet at a specific time and location. Moreover, friends tend to go to the same places and have trouble in discovering new places to hang out. Our web page solves both of these issues as we use the timetable function of Everytime, wide-used college mobile, to display and compare the time available with the friend you want and we use the Naver Map API to help you discover new places around SKKU.



<br>
<br>

## Table of Contents
* Instructions and Navigation
* Dependencies
* Example
* Release
* Works
* License

## Instructions and Navigations

* Our code is written in Javascript, and developed in Node.js environment.
* Our code use Selenium Web Driber, If you run the sever, install Selenium (Download the Selenium Driber `chromedriver_linux64(or window or Mac).zip` from [here](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/) and put it in 
* Our program also uses the Naver Map API, so if you want to use it on local you must create a Naver Cloud Account and register your localhost url to the Naver Map API.
## Depenencies
```javascripty
expressjs / cors: "~> 2.8.5",
mde / ejs: "~> 3.1.8",
xpressjs / express: "~> 4.18.2",
node: "~> 5.5.0", file: "package.json",
tttro/node-html-parser: "~> 5.5.0", 
SeleniumHQ/Selenium: "~> 4.6.1",
```

## Example
1. Main page  
![image](public/img/main.png)
Login to Everytime by Let's Meet.
2. Time table 
![image](public/img/include_friends.png)
When logged in, choose friends to overlap timetables.
3. Map
![image](public/img/map.png)
Choose categories and select where to go.
4. Demo video  
[youtube](https://www.youtube.com/watch?v=IFPoISu1zbA)  

### Release 

| Version  |       Key features                  | OS required                        |
| -------- | ------------------------------------| -----------------------------------|
|  v.1.0.0 | Crawling Everytime timetable data / Using Naver Map ap | Chrome browser |




## Works

- Kim Dong Hyun: Frontend developer / Web designer

> 1. Construct out design of Web pages
> 2. Collect Naver map api data
> 3. Design the thumbnail

- Park Jin suk: Product manager

> 1. Plan web service
> 2. Apply Naver map api
> 3. Manage/Control Git repository

- Park Jongeun: Back-End

> 1.  Construct timetable and do Crawling
> 2.  Maintain sever
> 3.  Mangage Dependencies

## [License]
Hangout follow MIT lICESNSE and is freely available for free and may be redistributed under unlimited conditions

## 우수프로젝트 시상 프로그램에 지원합니다
