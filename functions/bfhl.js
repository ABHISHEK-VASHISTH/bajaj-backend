exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { data, file_b64 } = JSON.parse(event.body);
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB,
      }),
    };
  } else if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ operation_code: 1 }),
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
};
