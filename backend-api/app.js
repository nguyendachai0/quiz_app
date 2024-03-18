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
    if (logoFile) {
        newSubject.Logo = logoFile.filename; // Only update the logo if a new file was provided
    } 
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
app.put('/api/subjects/:id', upload.single('Logo'),(req, res) => {
    const { id } = req.params;
    const dataFilePath = path.join(__dirname, 'db', 'Subjects.js');
    const updatedSubject = req.body;
    const logoFile = req.file;
    if (logoFile) {
        updatedSubject.Logo = logoFile.filename; // Only update the logo if a new file was provided
    } 
    try {   
      const data = readFileData(dataFilePath);
      dataToEdit = data.map(subject => subject.Id === id ? updatedSubject : subject);
      writeFileData(dataFilePath,dataToEdit);
                res.status(201).send('Subject added.');
            } catch (error) {
                console.error("Error adding subject:", error);
                res.status(500).send('Error adding subject.');
            }
});
app.delete('/api/subjects/:id', (req, res) => {
    const { id } = req.params;
    const dataFilePath = path.join(__dirname, 'db', 'Subjects.js');
    let data = readFileData(dataFilePath);
    data = data.filter(subject => subject.Id !== id);
    writeFileData(dataFilePath, data);
    res.send('Subject deleted.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
