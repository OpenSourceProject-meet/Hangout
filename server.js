
// 기본 설정
const express = require("express");
const app = express();
const PORT = 3000;

// 정적 파일 불러오기
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })) //middleware 정의. information coming from form acess 가능하게 함
app.use(express.json()); //can allow parse json information from the body

app.set("view engine", "ejs") //동적 파일 rendering

// 라우팅 정의
app.get("/", (req, res) => {
    res.render("index");
});


const userRouter = require('./routes/users')
app.use('/users', userRouter)


// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});



