/**
 * @desc Answer a practice question
 * @link npx cypress run --spec "cypress/integration/practice-question.spec.js"
 * @author Igor Stotskyy
 */

/// <reference types="cypress" />

import { base } from "../support/page-objects/base.po";

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
}

describe('Login to exist user', () => {
    beforeEach('open application', () => {
        cy.visit('/')
        cy.login()
        cy.url().should('contain', '/courses')
        cy.log('Successful login')
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


        cy.wait(5000)
        cy.get(base.iframe).then($element => {

            const $body = $element.contents().find('body')
            let stripe = cy.wrap($body)

            cy.log('expect Self-Study section')
            stripe = cy.wrap($body)
            stripe.find(base.section).eq(1).as('caption')
            cy.get('@caption').should(($expectedText) => {
                expect($expectedText.text()).to.include('Self-Study');
            })

            cy.log('choose first question mark')
            stripe = cy.wrap($body)
            stripe.find(base.questionMark).eq(0).click({ force: true })
            stripe = cy.wrap($body)
            stripe.find(base.hint).eq(0).as('hint')
            cy.fixture("messages.json").then((message) => {
                cy.get('@hint').should(($expectedText) => {
                    expect($expectedText.text()).to.include(message.hint);
                })
            });


            cy.log('click X to dismiss the hint box for first question mark')
            stripe = cy.wrap($body)
            stripe.find(base.closeHint).eq(0).click({ force: true })
            stripe = cy.wrap($body)
            stripe.find(base.alert).eq(0).as('hint')
            cy.get('@hint').should('not.have.attr', 'hint')

            // #1 incorrect Answer
            cy.log('select first questions marks with incorrect Answer')
            stripe = cy.wrap($body)
            stripe.find(base.firstSelfStudyDropdown).eq(0).click({ force: true })
            stripe = cy.wrap($body)
            stripe.find(base.firstSelfStudyDropdownOptions).contains(selfStudytOptions.preconceptions).click({ force: true })

            cy.log('expect incorrect answer')
            cy.fixture("messages.json").then((message) => {
                stripe = cy.wrap($body)
                stripe.find(base.incorrectAnswerMessage).eq(0).should('contain', message.incorrectAnswerMessage)
                    .and('have.css', 'background-color', backgroundColor.red)
            });

            cy.log('expect red X icon image')
            stripe = cy.wrap($body)
            stripe.find(base.incorrectAnswerMessage).eq(0).as('before')
            cy.get('@before')
                .before('background')
                .should('contain', `${imageUrl} repeat scroll ${coordinates.red}`);

            // #2 correct Answer
            cy.log('select first questions marks with correct Answer')
            stripe = cy.wrap($body)
            stripe.find(base.firstSelfStudyDropdown).eq(0).click({ force: true })
            stripe = cy.wrap($body)
            stripe.find(base.firstSelfStudyDropdownOptions).contains(selfStudytOptions.perceptions).click({ force: true })

            cy.log('expect correct answer')
            cy.fixture("messages.json").then((message) => {
                stripe = cy.wrap($body)
                stripe.find(base.correctAnswerMessage).eq(0).should('contain', message.correctAnswerMessage)
                    .and('have.css', 'background-color', backgroundColor.green)
            });

            cy.log('expect green Check icon image')
            stripe = cy.wrap($body)
            stripe.find(base.correctAnswerMessage).eq(0).as('before')
            cy.get('@before')
                .before('background')
                .should('contain', `${imageUrl} repeat scroll ${coordinates.green}`);

        })
    });
});