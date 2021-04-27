/**
 * @desc Answer a practice question
 * @link npx cypress run --spec "cypress/integration/practice-question.spec.js"
 * @author Igor Stotskyy
 */

/// <reference types="cypress" />

import { base } from "../../support/page-objects/base.po";

const selfStudytOptions = {
    preconceptions: 'preconceptions',
    perceptions: 'perceptions',
};
const coordinates = {
    red: '-110px -184px',
    green: '-88px -184px',
};
const imageUrl = 'url("https://s3.amazonaws.com/prod-app-webcontent/courses_acrobatiq_com/static/common/img/main-sprite.png")';
const backgroundColor = {
    red: 'rgb(250, 234, 230)',
    green: 'rgb(235, 252, 238)'
};
const messages = {
    incorrectAnswerMessage: "Incorrect. Self-concept is based on relatively enduring and personal perceptions.",
    correctAnswerMessage: "Correct. Self-concept is based on relatively enduring and personal perceptions.",
}

describe('Login to exist user', () => {
    beforeEach('open application', () => {
        cy.visit('/')
        cy.login()
        cy.url().should('contain', '/courses')
        cy.log('Successful login')
        cy.log('yo')
    });

    it('Go to the "The Self-Concept Defined" section and select correct and incorrect practice question', () => {

        base.clickElement({ element: base.courses, index: 1 })
        cy.url().should('contain', '/courses/OUP_EC2_2020');

        base.clickContainElement({ element: base.courseDashboard.unitOne })
        cy.url().should('contain', '/courses/OUP_EC2_2020/unit/communication__what_and_why');

        base.clickContainElement({ element: base.courseDashboard.unitOneItems.chapterTwo })
        cy.url().should('contain', '/courses/OUP_EC2_2020/unit/communication__what_and_why/module/the_self__perception__and_communication');

        base.clickContainElement({ element: base.courseDashboard.unitOneItems.chapterTwoItems.selfConceptDefined })
        cy.url().should('contain', '/courses/OUP_EC2_2020/page/wbp_the_self-concept_defined');
        cy.get(base.titleSection).eq(1).should('have.text', 'The Self-Concept Defined')

        base.iframeSection(1)
        base.chooseFirstQuestionMark()
        base.clickDismissHint()

        base.chooseAnswer({

            options: selfStudytOptions.preconceptions,
            color: backgroundColor.red,
            url: imageUrl,
            coordinate: coordinates.red,
            message: messages.incorrectAnswerMessage,
            el: base.incorrectAnswerMessage

        });

        base.chooseAnswer({

            options: selfStudytOptions.perceptions,
            color: backgroundColor.green,
            url: imageUrl,
            coordinate: coordinates.green,
            message: messages.correctAnswerMessage,
            el: base.correctAnswerMessage

        });

    });
});