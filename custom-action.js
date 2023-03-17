/***************
* Following the code of the custom coded action.
* It's implied that the body of a default hubpot webhook is received from a previous action
* This code should fetch all the attachments in the egnagements
* and add them with their ID at the end of the quey body
****************/

const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ accessToken: process.env.HAPIKEY });

exports.main = async (event, callback) => {
  const webhookBody = event.inputFields['hs_server_response'].json();
  const contactId = event.inputFields['hs_object_id'];
  const apiKey = process.env.HAPIKEY;
  // console.log(email);
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
  
  
  fetch(`https://api.hubapi.com/crm-associations/v1/associations/${contactId}/HUBSPOT_DEFINED/9`, { headers: headers })
    .then(response => response.json()) /*
    response example
    { "results": [ 30456250483, 30542931549, 30942006137, 31303812866, 32598911865 ], "hasMore": false, "offset": 32598911865 }
    */
    .then(data => {
      // to be done: 
      // query each engagement for attachments
      // get all attachments IDs to send to C4C
      
    })
    .catch(error => {
      // Log any errors to the console
      console.error(error);
    });

  callback({
    outputFields: {
      email: email
    }
  });
}


