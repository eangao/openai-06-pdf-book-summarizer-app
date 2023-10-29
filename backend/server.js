//import modules: express, dotenv
const express = require("express");
const dotenv = require("dotenv");
const app = express();

//accept json data in requests
app.use(express.json());

//setup environment variables
dotenv.config();

//OpenAIApi Configuration
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//build openai instance using OpenAIApi
const openai = new OpenAIApi(configuration);

//build the runCompletion which sends a request to the OPENAI Completion API
async function runCompletion(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 50,
  });
  return response;
}

const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "pdfsummary") });

app.post("/api/pdfsummary", upload.single("pdf"), async (req, res) => {
  try {
    // res.json({ file: req.file, body: req.body });
    const { maxWords } = req.body;
    const pdfFile = req.file;
  } catch (error) {
    console.error("An error occured: ", error);
    res.status(500).json({ error });
  }
});

//set the PORT
const PORT = process.env.PORT || 5000;

//start the server on the chosen PORT
app.listen(PORT, console.log(`Server started on port ${PORT}`));

const { encode, decode } = require("gpt-3-encoder");

const x = encode("This is some text");
const cost_per_token = 1.5 / 1000000;
console.log(4000 * cost_per_token);
