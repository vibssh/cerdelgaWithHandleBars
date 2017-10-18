 var _pamQuestionnaireData = (function (window) {
   var _answersData = {
     answers: [{
         id: 0,
         text: 'Disagree Strongly',
         iconUrl: '',
         points: 1
       },
       {
         id: 1,
         text: 'Disagree',
         iconUrl: '',
         points: 2
       },
       {
         id: 2,
         text: 'Agree',
         iconUrl: '',
         points: 3
       },
       {
         id: 3,
         text: 'Strongly Agree',
         iconUrl: '',
         points: 4
       },
       {
         id: 4,
         text: 'Not Applicable',
         iconUrl: '',
         points: 0
       }
     ]
   };

   var init = function () {
     var qData = {
       //Answers Array
       answers: [
         {
          id: 0,
          text: 'Disagree Strongly',
          iconUrl: '',
          points: 1
          },
          {
            id: 1,
            text: 'Disagree',
            iconUrl: '',
            points: 2
          },
          {
            id: 2,
            text: 'Agree',
            iconUrl: '',
            points: 3
          },
          {
            id: 3,
            text: 'Strongly Agree',
            iconUrl: '',
            points: 4
          },
          {
            id: 4,
            text: 'Not Applicable',
            iconUrl: '',
            points: 0
          }
        ],

       // Questionnaire Data
       questions: [
         {
           id: 0,
           text: 'I am the person who is responsible for taking care of my health',
           answers: _answersData.answers
         },
         {
           id: 1,
           text: 'Taking an active role in my own healthcare is the most important thing that affects my health',
           answers: _answersData.answers
         },
         {
           id: 2,
           text: 'I know what each of my prescribed medications do',
           answers: _answersData.answers
         },
         {
           id: 3,
           text: 'I am confident that I can tell whether I need to go to the doctor or whether I can take care of a health problem myself',
           answers: _answersData.answers
         },
         {
           id: 4,
           text: 'I am confident that I can tell a doctor or nurse concerns I have even when he or she does not ask',
           answers: _answersData.answers
         },
         {
           id: 5,
           text: 'I am confident that I can carry out medical treatments I may need to do at home',
           answers: _answersData.answers
         },
         {
           id: 6,
           text: 'I have been able to maintain lifestyle changes, like healthy eating or exercising',
           answers: _answersData.answers
         },
         {
           id: 7,
           text: 'I know how to prevent problems with my health',
           answers: _answersData.answers
         },
         {
           id: 8,
           text: 'I am confident I can work out solutions when new problems arise with my health',
           answers: _answersData.answers
         },
         {
           id: 9,
           text: 'I am confident that I can maintain lifestyle changes, like healthy eating and exercising, even during times of stress',
           answers: _answersData.answers
         }
       ]
     };

     return qData;
   }

   return {
     init: init
   }
 }(window));