const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());
// load the configuration of openai
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
// create a new openai object
const openai = new OpenAIApi(configuration);

//api call to chat gpt api
app.post("/gpt-answer", async (req, res) => {
  //try catch for error handling
  try {
    //take input from request
    const { prompt } = req.body;
    console.log(prompt);
    //async call to openai
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 64,
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "An error occurred in the server",
    });
  }
});


//image generation
app.post("/gpt-image", async (req, res) => {
  //try catch for error handling
  try {
    //take input from request
    const { prompt } = req.body;
    console.log(prompt);
    //async call to openai
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    return res.status(200).json({
      success: true,
      data: response.data.data[0].url,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "An error occurred in the server",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
