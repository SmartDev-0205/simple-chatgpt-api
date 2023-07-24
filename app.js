const express = require("express");
const openai_1 = require("openai");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const configuration = new openai_1.Configuration({
  apiKey: "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",
});
const openai = new openai_1.OpenAIApi(configuration);
require("dotenv").config();

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log("waiting response", message);
  let response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "In your response, splite text with line break, for normal text,cover with <p> tag,and for the code ,cover with div tag that has 10px padding and background #3d4452,text-wrap: wrap;,white-space:pre-wrap.Also for code div ,at the header I want to show  'copy code' link that copy the code at left.And  set color for copy code #3C8B65 when hover.Header's class should be flex,justify-content:left,aligh-items:center and gap is 4px.Lastly for the code please give me beauify code.",
      },
      { role: "user", content: message },
    ],
  });
  let botReply = response.data.choices[0].message.content;
  console.log("This is the result", botReply);
  res.send({ reply: botReply });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
