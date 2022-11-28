
// 기본 설정
const express = require("express");
const app = express();
const PORT = 3000;

// 정적 파일 불러오기
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs")

// 라우팅 정의
app.get("/", (req, res) => {
    res.render("index");
});



// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});

