var _BookData = (function (window) {

  var init = function () {
    var _BookDetails = {
      "Topic": [{
          "TopicTitle": "Introduction",
          "Icon": "/images/icons/sprite_introduction.png",
          "Filter": false,
          "Dose": false,          
          "OrderProdCode": "8000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "Welcome",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/Welcome-Level-",
              "StartPageNumber": 1,
              "Levels": [1, 2, 3, 4]
            }

          ]
        },
        {
          "TopicTitle": "About Gaucher Disease",
          "Icon": "/images/icons/sprite_aboutgaucher.png",
          "Filter": true,
          "Dose": false,    
          "OrderProdCode": "1000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "What is Gaucher Disease?",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 3,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 2,
              "PagesTitle": "Type 1 Gaucher Disease",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 7,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 3,
              "PagesTitle": "How is Gaucher Disease inherited?",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 11,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 4,
              "PagesTitle": "Checking and Monitoring Gaucher Disease",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutGaucher-Level-",
              "StartPageNumber": 15,
              "Levels": [1, 2, 3, 4]
            },
            {
              "Id": 5,
              "PagesTitle": "Is there a cure?",
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
          "Dose": true,    
          "OrderProdCode": "2000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "What is it? ",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 2
            },
            {
              "Id": 2,
              "PagesTitle": "How do you take it?",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 5
            },
            {
              "Id": 3,
              "PagesTitle": "Travelling with Cerdelga<sup>&reg;</sup>",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/AboutCerdelga-Level-",
              "StartPageNumber": 11
            },
            {
              "Id": 4,
              "PagesTitle": "Taking your medication as recommended",
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
          "Dose": false,    
          "OrderProdCode": "3000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "Preparing for an appointment",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 1,
              "Levels": [1]
            },
            {
              "Id": 2,
              "PagesTitle": "What are the goals for my treatment?",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 6,
              "Levels": [1]
            },
            {
              "Id": 3,
              "PagesTitle": "Who to contact",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 9,
              "Levels": [1]
            },

            {
              "Id": 4,
              "PagesTitle": "Preparing for an appointment",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 1,
              "Levels": [2, 3]
            },

            {
              "Id": 5,
              "PagesTitle": "What are the goals for my treatment?",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 6,
              "Levels": [2, 3]
            },
            {
              "Id": 6,
              "PagesTitle": "Who to contact",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 11,
              "Levels": [2, 3]
            },

            {
              "Id": 7,
              "PagesTitle": "Preparing for an appointment",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/TalkingToHCP-Level-",
              "StartPageNumber": 1,
              "Levels": [4]
            },
            {
              "Id": 8,
              "PagesTitle": "What are the goals for my treatment?",
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
          "Dose": false,    
          "OrderProdCode": "4000",
          "OrderDesc": "",
          "Pages": [{
            "Id": 1,
            "PagesTitle": "Support Networks",
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
          "Dose": false,    
          "OrderProdCode": "5000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 2,
              "PagesTitle": "Myths and misconceptions",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 3, 4]
            },
            {
              "Id": 3,
              "PagesTitle": "Dealing with daily hassles",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 3, 4]
            },
            {
              "Id": 4,
              "PagesTitle": "Remembering and establishing new routines",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/KeepingOnTopOfTreatment-Level-",
              "StartPageNumber": 2,
              "Levels": [1, 2, 3]
            },
            {
              "Id": 5,
              "PagesTitle": "Long-term planning",
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
          "Dose": false,    
          "OrderProdCode": "6000",
          "OrderDesc": "",
          "Pages": [{
            "Id": 1,
            "PagesTitle": "Your health comes first",
            "OrderDesc": "",
            "FileUrl": "/assets/pdfs/HealthyLifeStyles-Level-",
            "StartPageNumber": 2,
            "Levels": [4]
          }]
        },

        {
          "TopicTitle": "Glossary",
          "Icon": "/images/icons/sprite_introduction.png",
          "Filter": false,
          "Dose": false,
          "OrderProdCode": "7000",
          "OrderDesc": "",
          "Pages": [{
              "Id": 1,
              "PagesTitle": "Glossary of terms",
              "OrderDesc": "",
              "FileUrl": "/assets/pdfs/GlossaryOfTerms-Level-",
              "StartPageNumber": 1,
              "Levels": [1, 2, 3, 4]
            }
          ]
        }
      ]
    };

    return _BookDetails;
  }

  return {
    init: init
  }
}(window));