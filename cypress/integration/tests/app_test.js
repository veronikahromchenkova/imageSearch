describe('Image Search App Test', function() {

    const url = 'http://localhost:3000/imageSearch';
    const keyword = 'Car';
    const incorrectKeyword = 'Barrrrr';

    it('Visits the Image Search App', function() {
        cy.visit(url)
    })

    it('Types a keyword', function() {
        cy.get('.keywordInput').type(keyword)
    })

    it('Clicks a button to search images', function() {
        cy.get('.submitBtn').click()
    })

    it('Check if there is a loader indicator', function() {
        cy.get('.loader')
    })

    it('Checks if there are images', function() {
        cy.get('.imageList')
        cy.get('img')
    })

    it('Types a different keyword ', function() {
        cy.get('.keywordInput').clear().type(incorrectKeyword)
    })

    it('Clicks a button to search images', function() {
        cy.get('.submitBtn').click()
    })

    it('Checks if there are no images', function() {
        cy.contains('No Results')
    })


})