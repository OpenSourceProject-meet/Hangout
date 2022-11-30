
// 기본 설정
const express = require("express");
const app = express();
const PORT = 3000;

// 정적 파일 불러오기
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })) //middleware 정의. information coming from form acess 가능하게 함

app.set("view engine", "ejs") //동적 파일 rendering

// 라우팅 정의
app.get("/", (req, res) => {
    res.render("index");
});

// app.get("/user/login", (req, res) => {
//     console.log('success');
//     res.sendFile(__dirname + "/public/html/login.html");
// });

app.post("/user/accept", (req, res) => {
    const isValid = true;
    if (isValid) {
        user.id = req.body.userid;
        user.password = req.body.password;
    }
    console.log(user);
    res.redirect("/");



});



// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});

const user = { id: "000", password: "000" };