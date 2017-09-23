import { AngularComponentPage } from './app.po';

describe('angular-component App', function() {
  let page: AngularComponentPage;

  beforeEach(() => {
    page = new AngularComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
