import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('Koffie App Protractor', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', function() {
    // browser.get('http://koffie.gledant.nl');
    browser.get('http://localhost:4200');

    expect(browser.getTitle()).toEqual('Koffie App');
  });

  it('should add a drink', function() {
    // browser.get('http://koffie.gledant.nl/drinks');
    browser.get('http://localhost:4200/drinks');

    const list = element.all(by.css('.drinks li'));
    let temp = list.length;
    temp++;

    element(by.cssContainingText('label', 'Naam:')).element(by.id('drinkName')).sendKeys('Test');
    element(by.buttonText('Toevoegen')).click();

    expect(list.length).toBe(temp);
  });
});
