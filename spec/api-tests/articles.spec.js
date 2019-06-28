const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = chai;

module.exports = request => {
  const articleKeys = [
    'article_id',
    'title',
    'votes',
    'topic',
    'author',
    'created_at',
    'comment_count'
  ];
  describe.only('/articles', () => {
    describe('GET default behaviour', () => {
      it('status:200 responds with array of article objects', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            // Shallow test whole array
            articles.every(article =>
              expect(article).to.have.keys(...articleKeys)
            );

            //Thorough test of sample object
            const testArt = articles.find(
              article => article.title === "They're not exactly dogs, are they?"
            );
            expect(testArt.topic).to.equal('mitch');
            expect(testArt.votes).to.equal(0);
            expect(testArt.author).to.equal('butter_bridge');
            expect(testArt.comment_count).to.equal(2);
            expect(body.total_count).to.equal(12);
          });
      });
      it('status:200 default sorting is descending by created_at', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('created_at');
          });
      });
      xit('status:200 default limit of number of articles is 10', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(10);
          });
      });
      it('status:200 default start page is 1');
    });
    describe('GET with sorting queries', () => {
      it('status:200 can be sorted by specified column', () => {
        return request
          .get('/api/articles?sort_by=comment_count')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('comment_count');
          });
      });
      it('status:200 can be sorted in a specified order', () => {
        return request
          .get('/api/articles?order=asc')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.ascendingBy('created_at');
          });
      });
      it('status:200 ignores unknown query keys', () => {
        return request
          .get('/api/articles?random=true')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('created_at');
          });
      });
      it('status:400 invalid sort_by value', () => {
        return request.get('/api/articles?sort_by=age').expect(400);
      });
      it('status:200 ignores unknown sort orders', () => {
        return request
          .get('/api/articles?order=random')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('created_at');
          });
      });
      it('status:200 sort_by and order can be combined', () => {
        return request
          .get('/api/articles?sort_by=votes&order=asc')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.ascendingBy('votes');
          });
      });
    });
    describe('GET with filtering queries', () => {
      it('status:200 can be filtered by author', () => {
        return request
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(3);
            articles.every(
              article => expect(article.author) === 'butter_bridge'
            );
            articles.every(article =>
              expect(article).to.have.keys(articleKeys)
            );
          });
      });
      it('status:200 can be filtered by topic', () => {
        return request
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(11);
            articles.every(article => expect(article.topic) === 'mitch');
            articles.every(article =>
              expect(article).to.have.keys(articleKeys)
            );
          });
      });
      it('status:400 if the author is not found', () => {
        return request
          .get('/api/articles?author=tolkien')
          .expect(400);
      });
      it('status:400 if the topic is not found', () => {
        return request
          .get('/api/articles?topic=trees')
          .expect(400);
      });
    });
    describe('GET with pagination', () => {
      it('status:200 number of articles returned can be limited using limit query');
    });
    describe('disallowed methods', () => {
      it('status:405', () => {
        const methods = ['post', 'patch', 'put', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/articles').expect(405);
          })
        );
      });
    });
  });

}