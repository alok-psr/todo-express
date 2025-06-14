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

// .get for '/' whenever the user on the default '/' page we read the files_db and show the available tasks .. mainly their title 
app.get('/',(req,res)=>{
    fs.readdir('./files_db/',(err,files)=>{
      res.render('home',{ fileNames : files })
    })
});



// .post for 'create' ==> when the data recieved from the user (title and content of the task) we create a new file in the files_db

// get does not have req.body like post request .... it has req.query 
app.post('/create' ,(req,res)=>{
  if (req.body.title == false ){
    console.log('fuckUBitch')
    res.redirect('/')
  } 
  else{

    fs.writeFile(`./files_db/${req.body.title.split(' ').join('')}.txt`, `${req.body.content}`,'utf8', (err)=>{
      console.log(err)
      res.redirect('/')
    })
    console.log(req.body.title)
  }
})

// on files/:fn fn is the name of the file given which is selected by the user to oopen from the home.ejs side
app.get('/files/:fn',(req,res)=>{
  fs.readFile(`./files_db/${req.params.fn.substring(1,req.params.fn.length)}`,'utf8',(err,data)=>{
    if (err) {console.log(err)}
    else console.log(data)
    fs.readdir('./files_db',(err,file_name)=>{
      res.render('home',{fileNames:file_name,file_cnt:data})
      console.log('done')
    })
  })
})
