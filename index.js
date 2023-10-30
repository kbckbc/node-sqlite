const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

//서버에서 정적 페이지 폴더 할당하기(index.html 띄우는것 처럼..)
app.use(express.static('public')); 

// Set EJS as templating engine 
// EJS 를 사용 하는 이유는 static 페이지에 값을 넘기기 위함이다.
// EJS, PUG가 많이 쓰이는데 EJS 는 자바스크립트의 연장이라 처음 배우기가 쉽고
// PUG 는 자체 문법이 있어서 첨에 배우는데 조금 더 걸린다. 
app.set('view engine', 'ejs');

// route 설정
app.use('/sqlite', require('./routes/sqlite'));


app.get('/', (req, res) => { 
  
    // The render method takes the name of the HTML 
    // page to be rendered as input. 
    // This page should be in views folder in 
    // the root directory. 
    // We can pass multiple properties and values 
    // as an object, here we are passing the only name 
    res.render('sqlite', {data:[]}); 
}); 

// start the app
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
