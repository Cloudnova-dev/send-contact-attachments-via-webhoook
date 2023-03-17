/***************
* Following the code of the custom coded action.
* It's implied that the body of a default hubpot webhook is received from a previous action
* This code should fetch all the attachments in the egnagements
* and add them with their ID at the end of the quey body
****************/

const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ accessToken: process.env.HAPIKEY });

exports.main = async (event, callback) => {
  const email = event.inputFields['hs_server_response'];
  const contactId = event.inputFields['hs_object_id'];
  const apiKey = process.env.HAPIKEY;
  // console.log(email);
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
  
  
  fetch(`https://api.hubapi.com/crm-associations/v1/associations/${contactId}/HUBSPOT_DEFINED/9`, { headers: headers })
    .then(response => response.json())
    .then(data => {
      // to be done
      
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


