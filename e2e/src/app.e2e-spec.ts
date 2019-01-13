import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('Koffie App Protractor', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', function() {
    browser.get('http://localhost:4200');
    browser.waitForAngularEnabled(false);

    expect(browser.getTitle()).toEqual('Koffie App');
  });

  it('should add a drink', function() {
    browser.get('http://localhost:4200/drinks');

    element(by.css('input')).sendKeys('Test');
    // element(by.cssContainingText('label', 'Naam:')).element(by.id('drinkName')).sendKeys('Test');
    element(by.buttonText('Toevoegen')).click();

    expect(element.all(by.css('a')).getText()).toContain('●Test');
  });

  /*
  it('should delete a drink', function() {
    browser.get('http://localhost:4200/drinks');
    browser.sleep(2000);

    const byTest = element(by.cssContainingText('.badge', '●Test'));
    byTest.element(by.buttonText('x')).click();

    expect(browser.isElementPresent(by.cssContainingText('.badge', '●Test'))).toBeUndefined();
  }); */
});
