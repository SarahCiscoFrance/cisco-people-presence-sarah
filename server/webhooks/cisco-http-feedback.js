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
  const xml = `<Command><HttpFeedback><Register command="True"><FeedbackSlot>${
    process.env.REGISTER_SLOT
  }</FeedbackSlot><ServerUrl>${
    process.env.HTTP_FEEDBACK_URL
  }</ServerUrl><Format>JSON</Format><Expression item="1">/Status/RoomAnalytics/</Expression></Register></HttpFeedback></Command>`;

  axios({
    method: "post",
    url: "http://" + codec.ip + "/putxml",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(codec.login + ":" + codec.password).toString("base64"),
      "Content-Type": "text/xml"
    },
    data: xml
  })
    .then(response => {
      if (!response.data.includes('HttpFeedbackRegisterResult status="OK"')) {
        console.log(response.data);
      }
    })
    .catch(err => console.log("Error HTTP Feedback ---", codec.name));
};
