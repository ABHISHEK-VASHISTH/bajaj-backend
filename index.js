const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;
  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = null;

  
  data.forEach((item) => {
    if (!isNaN(item)) numbers.push(item);
    else if (/^[a-zA-Z]+$/.test(item)) alphabets.push(item);
  });


  const lowercaseAlphabets = alphabets.filter((char) => /[a-z]/.test(char));
  if (lowercaseAlphabets.length > 0) {
    highestLowercaseAlphabet = [lowercaseAlphabets.sort().pop()];
  }

  
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKB = 0;

  if (file_b64) {
    fileValid = true;
    fileMimeType = "application/pdf"; 
    fileSizeKB = (Buffer.byteLength(file_b64, 'base64') / 1024).toFixed(2);
  }

  res.json({
    "is_success": true,
    "user_id": "john_doe_17091999",
    "email": "john@xyz.com",
    "roll_number": "ABCD123",
    "numbers": numbers,
    "alphabets": alphabets,
    "highest_lowercase_alphabet": highestLowercaseAlphabet,
    "file_valid": fileValid,
    "file_mime_type": fileMimeType,
    "file_size_kb": fileSizeKB
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ "operation_code": 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
