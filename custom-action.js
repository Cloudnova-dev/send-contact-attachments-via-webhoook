/***************
* Following the code of the custom coded action.
* It's implied that the body of a default hubpot webhook is received from a previous action
* This code should fetch all the attachments in the egnagements
* and add them with their ID at the end of the quey body
****************/

// const hubspot = require('@hubspot/api-client');
// const hubspotClient = new hubspot.Client({ accessToken: process.env.HAPIKEY });

exports.main = async (event) => {
  const webhookBody = event.inputFields['hs_server_response'].json();
  const contactId = event.inputFields['hs_object_id'];
  const apiKey = process.env.HAPIKEY;
  // console.log(email);
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
  
  const attachments = [];
  const engagements = fetch(`https://api.hubapi.com/crm-associations/v1/associations/${contactId}/HUBSPOT_DEFINED/9`, { headers: headers }).then(response => response.json());
    /* response example
    { "results": [ 30456250483, 30542931549, 30942006137, 31303812866, 32598911865 ], "hasMore": false, "offset": 32598911865 }
    */
    await engagements.results.forEach(engagement => {
      fetch(`https://api.hubapi.com/engagements/v1/engagements/${engagement}`, { headers: headers })
      //     { "engagement": { "id": 30456250483, "portalId": 23816749, "active": true, "createdAt": 1674661824904, "lastUpdated": 1674661824904, "createdBy": 49259232, "modifiedBy": 49259232, "ownerId": 311325221, "type": "NOTE", "timestamp": 1674661824904, "allAccessibleTeamIds": [], "queueMembershipIds": [], "bodyPreviewIsTruncated": false }, "associations": { "contactIds": [ 51 ], "companyIds": [], "dealIds": [], "ownerIds": [], "workflowIds": [], "ticketIds": [], "contentIds": [], "quoteIds": [], "marketingEventIds": [] }, 
      //     "attachments": [ { "id": 99876123753 } ], "metadata": {} }
      .then(data =>{
        if (data.attachments.lenght != 0) {
          attachments.push(data.attachments);
        }
      })
    });

    webhookBody.attachments = attachments;
}
