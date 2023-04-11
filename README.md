# send-contact-attachments-via-webhoook
A custom coded action that query for every contact attachment and send each urls alongside with the standard webhook send

The workflow in the sandbox with the code: 

https://app.hubspot.com/workflows/23816749/platform/flow/321459527/edit

The webhook page

https://webhook.site/#!/22decd8c-05df-4722-87bb-cdfdacf16558/59b5ee1c-25bf-404b-9d6d-7624516753ff/1

Field spreadsheet

https://docs.google.com/spreadsheets/d/1HQusNHs3F8OHwEHfC1KsY_ELNWvIPmnpIsQmMLPuzaw/edit

## example of JSON sent to C4C 

```
{
      "zip": null,
      "city": "Cambridge",
      "email": "bh@hubspot.com",
      "address": null,
      "company": "HubSpot",
      "country": null,
      "message": null,
      "campaign": null,
      "lastname": "Halligan (Sample Contact)",
      "firstname": "Brian",
      "lead_name": null,
      "hs_persona": null,
      "mobilephone": null,
      "hs_object_id": 51,
      "contact_number": null,
      "hs_legal_basis": null,
      "lifecyclestage": "lead",
      "hubspot_owner_id": 311325217,
      "c4c_integration_id": null,
      "hs_analytics_source": "OFFLINE",
      "contact_phone_number": null,
      "hs_analytics_source_data_1": "API",
      "hs_analytics_source_data_2": "sample-contact",
      "attachments": [
      {
        "id": 101487148641,
        "extension": "txt",
        "title": "Untitled _65_",
        "default_hosting_url": "https://23816749.fs1.hubspotusercontent-na1.net/hubfs/23816749/Untitled%20_65_.txt",
        "hidden": true
      },
      {
        "id": 102595224124,
        "extension": "txt",
        "title": "rev2",
        "default_hosting_url": "https://23816749.fs1.hubspotusercontent-na1.net/hubfs/23816749/rev2.txt",
        "hidden": true
      },
      {
        "id": 100124302729,
        "extension": "pdf",
        "title": "Document-webhook (1) - Copy",
        "default_hosting_url": "https://23816749.fs1.hubspotusercontent-na1.net/hubfs/23816749/Document-webhook%20(1)%20-%20Copy.pdf",
        "hidden": true
      },
      {
        "id": 99876123753,
        "extension": "pdf",
        "title": "Document-webhook (1)",
        "default_hosting_url": "https://23816749.fs1.hubspotusercontent-na1.net/hubfs/23816749/Document-webhook%20(1).pdf",
        "hidden": true
      }],
      "subscriptionStatuses": [
      {
        "id": "72759926",
        "name": "Customer Service Communication",
        "description": "Receive feedback requests and customer service information.",
        "status": "SUBSCRIBED",
        "sourceOfStatus": "SUBSCRIPTION_STATUS",
        "brandId": null,
        "preferenceGroupName": null,
        "legalBasis": null,
        "legalBasisExplanation": null
      }]
    }
```
