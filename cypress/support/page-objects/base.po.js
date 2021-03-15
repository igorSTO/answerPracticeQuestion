/// <reference types="cypress" />

export class Base {
    constructor() {
        this.courses = '.card-body';
        this.section = '.caption';
        this.questionMark = 'button [title="Hints"]';
        this.hint = '.hint-body';
        this.closeHint = 'button .mi-close';
        this.alert = '.alert';
        this.titleSection = '.breadcrumb-item';
        this.iframe = '#iFrameResizer0';
        this.firstSelfStudyDropdown = '.select2-selection';
        this.firstSelfStudyDropdownOptions = '.select2-results__options';
        this.incorrectAnswerMessage = '.feedback.note-danger';
        this.correctAnswerMessage = '.feedback.note-success';

        this.courseDashboard = {
            unitOne: 'Communication: What and Why',
            unitOneItems: {
                chapterTwo: 'Chapter 2: The Self, Perception, and Communication',
                chapterTwoItems: {
                    selfConceptDefined: 'The Self-Concept Defined',
                }
            },
        }

    }

    clickElement({ element = '', index = 0 }) {
        cy.get(element).eq(index).click({ force: true })
    }

    clickContainElement({ element = '', index = 0 }) {
        cy.contains(element).eq(index).click({ force: true })
    }

    iframeSection(index = 0) {
        cy.wait(5000)
        cy.get(this.iframe).then($element => {
            const $body = $element.contents().find('body')
            let form = cy.wrap($body)

            cy.log('expect section')
            form = cy.wrap($body)
            form.find(this.section).eq(index).as('section')
            cy.fixture("messages.json").then((message) => {
                cy.get('@section').should(($expectedText) => {
                    expect($expectedText.text()).to.include(message.selfStudyTitle);
                })
            });
        })
    }

    chooseFirstQuestionMark(index = 0) {
        cy.get(this.iframe).then($element => {
            const $body = $element.contents().find('body')
            let form = cy.wrap($body)

            cy.log('choose question mark')
            form = cy.wrap($body)
            form.find(this.questionMark).eq(index).click({ force: true })
            form = cy.wrap($body)
            form.find(this.hint).eq(index).as('hint')
            cy.fixture("messages.json").then((message) => {
                cy.get('@hint').should(($expectedText) => {
                    expect($expectedText.text()).to.include(message.hint);
                })
            });
        })
    }

    clickDismissHint(index = 0) {
        cy.get(this.iframe).then($element => {
            const $body = $element.contents().find('body')
            let form = cy.wrap($body)

            cy.log('click X to dismiss the hint box for question mark')
            form = cy.wrap($body)
            form.find(this.closeHint).eq(index).click({ force: true })
            form = cy.wrap($body)
            form.find(this.alert).eq(index).as('hint')
            cy.get('@hint').should('not.have.attr', 'hint')
        })
    }

    chooseAnswer({ index = 0, options, color, url, coordinate, message, el }) {
        cy.get(this.iframe).then($element => {
            const $body = $element.contents().find('body')
            let form = cy.wrap($body)

            cy.log('select questions marks with Answer')
            form = cy.wrap($body)
            form.find(this.firstSelfStudyDropdown).eq(index).click({ force: true })
            form = cy.wrap($body)
            form.find(this.firstSelfStudyDropdownOptions).contains(options).click({ force: true })

            cy.log('expect answer')
            form = cy.wrap($body)
            form.find(el).eq(index).should('contain', message)
                .and('have.css', 'background-color', color)

            cy.log('expect icon image')
            form = cy.wrap($body)
            form.find(el).eq(index).as('before')
            cy.get('@before')
                .before('background')
                .should('contain', `${url} repeat scroll ${coordinate}`);
        })
    }
}

export const base = new Base();