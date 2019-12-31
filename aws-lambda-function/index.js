		/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
//--------------------------------------------------------------------------
// SimpelWürfel, beziehungsweise SimpleDice: (C) 2017 STVS Studios
// Based on this template: https://github.com/alexa/skill-sample-nodejs-fact
// V1 with "ONE DICE MODE"
//--------------------------------------------------------------------------
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "SKILL ID HERE";

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'SimpleDice',
            GET_FACT_MESSAGE: "I rolled a dice. I got ",
            WELCOME_MESSAGE: 'Welcome to SimpleDice. You can say throw a dice with SimpleDice,to throw a dice, or, you can say stop... What can I help you with?',
            HELP_MESSAGE: 'You can say throw a dice with SimpleDice,to throw a dice, or, you can say stop... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            END_NAME: '.',
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'SimpleDice',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-GB': {
        translation: {
            SKILL_NAME: 'SimpleDice',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'de': {
        translation: {
            SKILL_NAME: 'SimpelWürfel',
            GET_FACT_MESSAGE: 'Ich habe gewürfelt. Es ist eine ',
            WELCOME_MESSAGE: 'Willkommen bei SimpelWürfel. Du kannst, „Würfel mit SimpelWürfel“,sagen, um zu würfeln, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_MESSAGE: 'Du kannst, „Würfel mit SimpelWürfel“,sagen, um zu würfeln, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
            END_NAME: '.',
        },
    },
};

const handlers = {
	//IMPORTANT INTENTS, SessionEndedRequest FIXED AN ERROR FOR ENGLISH SPEAKERS
    'LaunchRequest': function () {
        const speechOutput = this.t('WELCOME_MESSAGE');
        const reprompt = this.t('WELCOME_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
   'SessionEndedRequest': function () {
        const speechOutput = this.t('STOP_MESSAGE');
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
	//ONE DICE MODE
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random number between one and six
        // Use this.t() to get corresponding language data
		this.attributes["guessNumber"] = Math.floor(Math.random() * 6) +1;
		var targetNum = this.attributes["guessNumber"];
		
        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + targetNum;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), this.t('GET_FACT_MESSAGE') + targetNum + this.t('END_NAME'));
    },
	//OBLIGATORY INTENTS
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        const speechOutput = this.t('STOP_MESSAGE');
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = this.t('STOP_MESSAGE');
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
