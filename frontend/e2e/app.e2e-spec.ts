import { MsfnPage } from './app.po';

describe('msfn App', () => {
  let page: MsfnPage;

  beforeEach(() => {
    page = new MsfnPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
