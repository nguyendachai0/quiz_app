const express = require('express');
// const fileUpload = require('express-fileupload');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: '../app/assets/images/logos/',
    filename: function(req, file, cb){
        cb(null, Date.now() + '.'+ file.mimetype.split('/')[1])
    }
}
)
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({storage: storage});
const cors = require('cors');
const PORT = 3000;
app.use(cors());
const readFileData = (dataFilePath) => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};
const writeFileData = (dataFilePath,data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.post('/api/subjects', upload.single('Logo'), (req, res) => {
    const dataFilePath = path.join(__dirname, 'db', 'Subjects.js');
    const newSubject = req.body;
    const logoFile = req.file; 
    newSubject.Logo = logoFile.filename;
    try {
      const data = readFileData(dataFilePath);
                data.push(newSubject); 
                writeFileData(dataFilePath,data);
                res.status(201).send('Subject added.');
            } catch (error) {
                console.error("Error adding subject:", error);
                res.status(500).send('Error adding subject.');
            }
})
app.get('/api/subjects', (req, res) => {
    const data = readFileData();
    res.json(data);
});
// app.post('/api/subjects',  (req, res) => {
//     console.log(req);
//     const newSubject = req.body;
//     const logoFile = req.file; 
//     console.log(logoFile);
//     console.log("Receivedt new subject:", newSubject);
//     console.log("Received logo file:", logoFile);
//     try {
//         const data = readFileData();
//         data.push(newSubject); 
//         writeFileData(data);
//         res.status(201).send('Subject added.');
//     } catch (error) {
//         console.error("Error adding subject:", error);
//         res.status(500).send('Error adding subject.');
//     }
// });
app.put('/api/subjects/:id', (req, res) => {
    const { id } = req.params;
    const updatedSubject = req.body;
    let data = readFileData();
    data = data.map(subject => subject.id === id ? updatedSubject : subject);
    writeFileData(data);
    res.send('Subject updated.');
});
app.delete('/api/subjects/:id', (req, res) => {
    const { id } = req.params;
    let data = readFileData();
    data = data.filter(subject => subject.id !== id);
    writeFileData(data);
    res.send('Subject deleted.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
