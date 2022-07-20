
// Test fixed and ready for lounch
// RunUpdateSnapshots: yarn update-snapshots:dev --spec "src/integration/snapshot/homepage.spec.js"
// RunTest: yarn test:snapshot:dev --spec "src/integration/snapshot/homepage.spec.js"

describe.skip('Page Home', () => {

  before(() => {
    cy.newLogin();
  });

  it('sign-up-form', () => {
    cy.compareSnapshot('example',{errorThreshold: 0.1});
  }
  )
})