import express from 'express'
import fs from 'fs'

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/',(req,res)=>{
    fs.readdir('./files_db/',(err,files)=>{
      const DB=files
      res.render('home',{ file_DB : DB })
    })
});

// get does not have req.body like post request .... it has req.query 

app.post('/create' ,(req,res)=>{
  fs.writeFile(`./files_db/${req.body.title.split(' ').join('')}.txt`, `${req.body.content}`,'utf8', (err)=>{
    console.log(err)
    res.redirect('/')
  })
  console.log(req.body.title)
})

