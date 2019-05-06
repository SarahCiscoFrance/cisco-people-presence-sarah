const axios = require("axios");

exports.registerHttpFeedback = () => {
  axios({
    method: "get",
    url: process.env.CODECS_MANAGER_API + "/codecs/app/presence"
  })
    .then(response => {
      const codecs = response.data.codecs;

      for (const index in codecs) {
        const codec = codecs[index];

        register(codec);
      }
    })
    .catch(err => console.log(err));
};

const register = codec => {
  const xml = `<Command>
  <HttpFeedback>
  <Register>
  <FeedbackSlot>${process.env.REGISTER_SLOT}</FeedbackSlot>
  <ServerUrl>${process.env.HTTP_FEEDBACK_URL}</ServerUrl>
  <Format>JSON</Format>
  <Expression>/Status/RoomAnalytics/</Expression>
  </Register>
  </HttpFeedback>
  </Command>`;

  axios({
    method: "POST",
    url: `http://${codec.ip}/putxml`,
    headers: {
      Authorization: `Basic ${Buffer.from(
        codec.login + ":" + codec.password
      ).toString("base64")}`,
      "Content-Type": "text/xml"
    },
    data: xml
  })
    .then(response => {
      if (!response.data.includes('HttpFeedbackRegisterResult status="OK"')) {
        sendError(codec, response.data);
      }
    })
    .catch(err => sendError(codec, err.message));
};

const sendError = (codec, data) => {
  const markdown = `### Une erreur est survenue lors du HttpFeedback Register sur le codec suivant : _${
    codec.name
  }_\n\nVoici la description de l'erreur : \`${data}\``;

  axios({
    url: "https://api.ciscospark.com/v1/messages",
    method: "post",
    headers: {
      Authorization:
        "Bearer ZjMzYWViNTgtNmYzZC00NjczLWI5ZTItNzc3MjIzOTNjYTM1YjhlMGY3NzQtMTFk"
    },
    data: {
      markdown: markdown,
      roomId:
        "Y2lzY29zcGFyazovL3VzL1JPT00vMWNmNjhkZTAtMThhOS0xMWU4LWJjNDQtYWI4NzRmMTM2ZjRl"
    }
  }).catch(error => console.log(error));
};
