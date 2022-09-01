const userKekkonen = {
  username: 'ukekkonen',
  password: 'salsasana',
  name: 'Urho Kekkonen',
}

const userKakkonen = {
  username: 'pkakkonen',
  password: 'chips',
  name: 'Pekka Kakkonen',
}

const blogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  },
]

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'http://localhost:3003/api/users', userKekkonen)
    cy.request('POST', 'http://localhost:3003/api/users', userKakkonen)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#login-username')
    cy.get('#login-password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#login-username').type('ukekkonen')
      cy.get('#login-password').type('salsasana')
      cy.get('#login-button').click()

      cy.contains('Urho Kekkonen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#login-username').type('ukekkonen')
      cy.get('#login-password').type('vääräsalasana')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('log in to application')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.addBlog(blogs[0], userKekkonen)
      cy.addBlog(blogs[1], userKakkonen)
      cy.addBlog(blogs[2], userKakkonen)
      cy.login({ username: 'ukekkonen', password: 'salsasana' })
    })

    it('A blog can be created', function () {
      cy.get('#blogs-list').should(
        'not.contain',
        'Canonical string reduction Edsger W. Dijkstra'
      )
      cy.contains('new blog').click()
      cy.get('#blogform-title').type('First class tests')
      cy.get('#blogform-author').type('Robert C. Martin')
      cy.get('#blogform-url').type(
        'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
      )
      cy.get('#blogform-button').click()

      cy.contains('a new blog First class tests by Robert C. Martin added')
      cy.get('#blogs-list').contains('First class tests Robert C. Martin')
    })

    it('A blog can be liked', function () {
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).as('blogElement')
      cy.get('@blogElement').click()
      cy.get('.tab-view').contains('0 likes')
      cy.get('.tab-view').contains('like').click()

      cy.get('.tab-view').contains('1 likes')
    })

    it('A blog can be removed', function () {
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).as('blogElement')
      cy.get('@blogElement').click()
      cy.get('.tab-view').contains('remove').click()
      cy.contains(`Removed blog ${blogs[0].title} by ${blogs[0].author}`)
      cy.get('html').should(
        'not.contain',
        `${blogs[0].title} ${blogs[0].author}`
      )
    })

    it("Another use's blog cannot be removed", function () {
      cy.login(userKakkonen)
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).as('blogElement')
      cy.get('@blogElement').click()
      cy.get('.tab-view').should('not.contain', 'remove')
    })

    it('Blogs are shown in order of likes', function () {
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).as('blog1')
      cy.contains(`${blogs[1].title} ${blogs[1].author}`).as('blog2')
      cy.contains(`${blogs[2].title} ${blogs[2].author}`).as('blog3')

      cy.likeBlog('blog2', 0)
      cy.likeBlog('blog2', 1)
      cy.likeBlog('blog3', 0)

      cy.get('.blog-entry').eq(0).should('contain', blogs[1].title)
      cy.get('.blog-entry').eq(1).should('contain', blogs[2].title)

      cy.likeBlog('blog1', 0)
      cy.likeBlog('blog1', 1)
      cy.likeBlog('blog1', 2)

      cy.get('.blog-entry').eq(0).should('contain', blogs[0].title)
      cy.get('.blog-entry').eq(1).should('contain', blogs[1].title)
    })
  })
})
