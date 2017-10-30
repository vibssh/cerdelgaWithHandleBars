var _BookData = (function (window) {

  var init = function () {
    var _BookDetails = {
      "Topic": [
        {
          "TopicTitle": "Introduction",
          "Icon": "/images/icons/sprite_introduction.png",
          "Filter": false,
          "AboutCerdelga": false,
          "OrderTab": "Yellow",
          "OrderProdCode": "01000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "Welcome",
              "OrderTab": "Yellow",
              "OrderProdCode": "0100",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/Welcome-Level-",
              "StartPageNumber": 1,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 2,
              "PagesTitle": "Glossary of terms",
              "OrderTab": "Yellow",
              "OrderProdCode": "0110",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/GlossaryOfTerms-Level-",
              "StartPageNumber": 1,
              "Levels": [1, 2, 3, 4]
            }
          ]
        },

      {
          "TopicTitle": "About Gaucher Disease",
          "Icon": "/images/icons/sprite_aboutgaucher.png",
          "Filter": true,
          "OrderTab": "Red",
          "OrderProdCode": "1000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "What is Gaucher Disease?",
              "OrderTab": "Red",
              "OrderProdCode": "1100",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 3,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 2,
              "PagesTitle": "Type 1 Gaucher Disease",
              "OrderTab": "Red",
              "OrderProdCode": "1200",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 7,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 3,
              "PagesTitle": "How is Gaucher Disease inherited?",
              "OrderTab": "Red",
              "OrderProdCode": "1300",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 11,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 4,
              "PagesTitle": "Checking and Monitoring Gaucher Disease",
              "OrderTab": "Red",
              "OrderProdCode": "1400",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 15,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 5,
              "PagesTitle": "Is there a cure?",
              "OrderTab": "Red",
              "OrderProdCode": "1500",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 17,
              "Levels": [1, 2, 3, 4]
            }

          ]
        },
        {
          "TopicTitle": "About Cerdelga® (eliglustat) - All Compulsory ",
          "Icon": "/images/icons/sprite_aboutcerdelga.png",
          "Filter": false,
          "AboutCerdelga": true,
          "OrderTab": "Orange",
          "OrderProdCode": "2000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 6,
              "PagesTitle": "What is it? ",
              "OrderTab": "Orange",
              "OrderProdCode": "2100",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 2

            },
            {
              "Id": 7,
              "PagesTitle": "How do you take it?",
              "OrderTab": "Orange",
              "OrderProdCode": "2300",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 5
            },
            {
              "Id": 8,
              "PagesTitle": "Travelling with Cerdelga<sup>&reg;</sup>",
              "OrderTab": "Orange",
              "OrderProdCode": "2400",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 11
            },
            {
              "Id": 9,
              "PagesTitle": "Taking your medication as recommended",
              "OrderTab": "Orange",
              "OrderProdCode": "2500",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 12
            }

          ]
        },
        {
          "TopicTitle": "Talking to your Specialist Doctor",
          "Icon": "/images/icons/sprite_hcptalk.png",
          "Filter": true,
          "AboutCerdelga": false,
          "OrderTab": "Yellow",
          "OrderProdCode": "3000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 10,
              "PagesTitle": "Preparing for an appointment",
              "OrderTab": "Yellow",
              "OrderProdCode": "3100",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 1,
              "Levels": [1]
            },
            {
              "Id": 11,
              "PagesTitle": "What are the goals for my treatment?",
              "OrderTab": "Yellow",
              "OrderProdCode": "3200",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 6,
              "Levels": [1]
            },
            {
              "Id": 12,
              "PagesTitle": "Who to contact",
              "OrderTab": "Yellow",
              "OrderProdCode": "3300",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 9,
              "Levels": [1]
            },

            {
              "Id": 88,
              "PagesTitle": "Preparing for an appointment",
              "OrderTab": "Yellow",
              "OrderProdCode": "3400",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 1,
              "Levels": [2, 3]
            },

            {
              "Id": 100,
              "PagesTitle": "What are the goals for my treatment?",
              "OrderTab": "Yellow",
              "OrderProdCode": "3500",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 6,
              "Levels": [2, 3]
            },
            {
              "Id": 99,
              "PagesTitle": "Who to contact",
              "OrderTab": "Yellow",
              "OrderProdCode": "3300",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 11,
              "Levels": [2, 3]
            },

            {
              "Id": 78,
              "PagesTitle": "Preparing for an appointment",
              "OrderTab": "Yellow",
              "OrderProdCode": "3100",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 1,
              "Levels": [4]
            },
            {
              "Id": 70,
              "PagesTitle": "What are the goals for my treatment?",
              "OrderTab": "Yellow",
              "OrderProdCode": "3300",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 6,
              "Levels": [4]
            }


          ]
        },
        {
          "TopicTitle": "Talking to Family and Friends",
          "Icon": "/images/icons/sprite_familytalk.png",
          "Filter": true,
          "AboutCerdelga": false,
          "OrderTab": "Green",
          "OrderProdCode": "4000",
          "OrderDesc": "",
          "Pages": [{
            "Id": 13,
            "PagesTitle": "Support Networks",
            "OrderTab": "Green",
            "OrderProdCode": "4100",
            "OrderDesc": "",
            "FileUrl": "/assets/pdfs/TalkingToFamFriends-Level-",
            "StartPageNumber": 2,
            "Levels": [1, 3, 4]
          }]
        },
        {

          "TopicTitle": "Keeping on top of treatment",
          "Icon": "/images/icons/sprite_adherence.png",
          "Filter": true,
          "AboutCerdelga": false,
          "OrderTab": "Blue",
          "OrderProdCode": "5000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 19,
              "PagesTitle": "Myths and misconceptions",
              "OrderTab": "Blue",
              "OrderProdCode": "5100",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 3, 4]
            },
            {
              "Id": 20,
              "PagesTitle": "Dealing with daily hassles",
              "OrderTab": "Blue",
              "OrderProdCode": "5200",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 3, 4]
            },
            {
              "Id": 21,
              "PagesTitle": "Remembering and establishing new routines",
              "OrderTab": "Blue",
              "OrderProdCode": "5300",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 2, 3]
            },
            {
              "Id": 22,
              "PagesTitle": "Long-term planning",
              "OrderTab": "Blue",
              "OrderProdCode": "5400",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 2, 3, 4]
            }
          ]
        },
        {
          "TopicTitle": "Healthy Lifestyle",
          "Icon": "/images/icons/sprite_adherence.png",
          "Filter": true,
          "AboutCerdelga": false,
          "OrderTab": "Blue",
          "OrderProdCode": "6000",
          "OrderDesc": "",
          "Pages": [{
            "Id": 32,
            "PagesTitle": "Your health comes first",
            "OrderTab": "Blue",
            "OrderProdCode": "6100",
            "OrderDesc": "",
            "FileUrl": "/assets/pdfs/HealthyLifeStyles-Level-",
            "StartPageNumber": 2,
            "Levels": [4]
          }]
        }
      ]

    };

    return _BookDetails;
  }

  return {
    init: init
  }
}(window));