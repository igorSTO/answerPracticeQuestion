export class Base {
    constructor() {
        this.courses = '.card-body';
        this.section = '.caption';
        this.questionMark = 'button [title="Hints"]';
        this.hint = '.hint-body';
        this.closeHint = 'button .mi-close',
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
}

export const base = new Base();