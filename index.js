

exports.handler = async(event,context) => {



console.log(event["payload"]);

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const rental_agreement = "This rental agreement is between John Smith (Landlord) and Jane Doe (Tenant) for the property located at 123 Main St, Anytown USA. The agreement begins on January 1st/ 2022 and ends on December 31st, 2023. Rent is due on the 1st of each month. Any late payments will incur a fee of $50. The tenant is responsible for utilities and internet. The landlord is responsible for property maintenance. Any damage to the property caused by the tenant will be the responsibility of the tenant to repair or reimburse the landlord."
const response = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: `Please extract the tenant name and start date\n ${rental_agreement}`,
  max_tokens:1024,
  n:1,
  stop:null,
  temperature:0.5,
});
const body = JSON.stringify(response.data.choices[0].text);
const responseObj = {
    statusCode: 200,
    body: body
};
return responseObj;
};

