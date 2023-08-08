/***************
* Following the code of the custom coded action.
* It's implied that the body of a default hubpot webhook is received from a previous action
* This code should fetch all the attachments in the egnagements
* and add them with their ID at the end of the quey body
****************/

// const hubspot = require('@hubspot/api-client');
// const request = require('request');
const axios = require('axios');

// const hubspotClient = new hubspot.Client({ accessToken: process.env.HAPIKEY });

exports.main = async (event, callback) => {
  // const webhookBody = JSON.parse(event.inputFields['hs_server_response']);
  const webhookBody = {"lastname":event.inputFields['lastname'], "zip":event.inputFields['zip'], "hs_analytics_last_touch_converting_campaign":event.inputFields['hs_analytics_last_touch_converting_campaign'], "hs_analytics_first_touch_converting_campaign":event.inputFields['hs_analytics_first_touch_converting_campaign'], "hs_legal_basis":event.inputFields['hs_legal_basis'], "pitched_or_flat_roof_training_":event.inputFields['pitched_or_flat_roof_training_'], "message":event.inputFields['message'], "c4c_contact_id":event.inputFields['c4c_contact_id'], "hs_marketable_status":event.inputFields['hs_marketable_status'], "hs_object_id":event.inputFields['hs_object_id'], "contact_number":event.inputFields['contact_number'], "house_number":event.inputFields['house_number'], "hs_analytics_source":event.inputFields['hs_analytics_source'], "city":event.inputFields['city'], "mobilephone":event.inputFields['mobilephone'], "phone":event.inputFields['phone'], "lead_name":event.inputFields['lead_name'], "campaign":event.inputFields['campaign'], "contact_owner_crm":event.inputFields['contact_owner_crm'], "hs_analytics_source_data_1":event.inputFields['hs_analytics_source_data_1'], "hs_email_last_send_date":event.inputFields['hs_email_last_send_date'], "hs_analytics_source_data_2":event.inputFields['hs_analytics_source_data_2'], "lifecyclestage":event.inputFields['lifecyclestage'], "address":event.inputFields['address'], "country":event.inputFields['country'], "hs_persona":event.inputFields['hs_persona'], "firstname":event.inputFields['firstname'], "email":event.inputFields['email'], "company":event.inputFields['company'], "lead_type":event.inputFields['lead_type']};
  const contactId = event.inputFields['hs_object_id'];
  // const apiKey = process.env.HAPIKEY;
  const headers = { "Authorization": "Bearer " + process.env.HAPIKEY };

  const attachments = [];
  const { data: { results: engagements } } = await axios.get(`https://api.hubapi.com/crm-associations/v1/associations/${contactId}/HUBSPOT_DEFINED/9`, { headers: headers });
  /** response example
    { "results": [ 30456250483, 30542931549, 30942006137, 31303812866, 32598911865 ], "hasMore": false, "offset": 32598911865 }
    */
  if (engagements.lenght != 0) {
    engagements.forEach(async engagement => {
      const enga = await axios.get(`https://api.hubapi.com/engagements/v1/engagements/${engagement}`, { headers: headers });
      // { "engagement": { "id": 30456250483, "portalId": 23816749, "active": true, "createdAt": 1674661824904, "lastUpdated": 1674661824904, "createdBy": 49259232, "modifiedBy": 49259232, "ownerId": 311325221, "type": "NOTE", "timestamp": 1674661824904, "allAccessibleTeamIds": [], "queueMembershipIds": [], "bodyPreviewIsTruncated": false }, "associations": { "contactIds": [ 51 ], "companyIds": [], "dealIds": [], "ownerIds": [], "workflowIds": [], "ticketIds": [], "contentIds": [], "quoteIds": [], "marketingEventIds": [] }, 
      // "attachments": [ { "id": 99876123753 } ], "metadata": {} }
      if (enga.data.attachments.lenght != 0) {
        const atch = await axios.get(`https://api.hubapi.com/filemanager/api/v2/files/${enga.data.attachments[0].id}`, { headers: headers });
        let x = { id: atch.data.id, extension: atch.data.extension, title: atch.data.title, default_hosting_url: atch.data.default_hosting_url, hidden: atch.data.hidden };
        attachments.push(x);
      }
    });
  }
  webhookBody.attachments = attachments;
  const subsPref = await axios.get(`https://api.hubapi.com/communication-preferences/v3/status/email/${webhookBody.email}`, { headers: headers });
  webhookBody.subscriptionStatuses = subsPref.data.subscriptionStatuses;
  /*if (webhookBody.hubspot_owner_id != null) {
    const ownerEmail = await axios.get(`https://api.hubapi.com/crm/v3/owners/${webhookBody.hubspot_owner_id}?idProperty=id&archived=false`, { headers: headers });
    webhookBody.contact_owner_crm = ownerEmail.data.email;
  }
  else {
    webhookBody.contact_owner_crm = null;
  }*/
  //console.log(ownerEmail.data.email);


  callback({
    outputFields: {
      webhookBody: webhookBody
    }
  });
}
