const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

//서버에서 정적 페이지 폴더 할당하기(index.html 띄우는것 처럼..)
app.use(express.static('public')); 

// route 설정
app.use('/sqlite', require('./routes/sqlite'));

// start the app
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
