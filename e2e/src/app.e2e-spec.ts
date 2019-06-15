import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('Koffie App Protractor', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', function() {
    browser.get('http://localhost:4200');
    browser.waitForAngularEnabled(true);

    expect(browser.getTitle()).toEqual('Koffie App');
  });

  it('should have drinks', function() {
    browser.get('http://localhost:4200/drinks');
    browser.waitForAngularEnabled(true);

    expect(element.all(by.css('a')).getText()).toContain('●Zwart');
  });

  it('should have employees', function() {
    browser.get('http://localhost:4200/employees');
    browser.waitForAngularEnabled(true);

    expect(element.all(by.css('a')).getText()).toContain('●Sanne Pell');
  });

  /*
  it('should add a drink', function() {
    browser.get('http://localhost:4200/drinks');

    element(by.css('input')).sendKeys('Test');
    // element(by.cssContainingText('label', 'Naam:')).element(by.id('drinkName')).sendKeys('Test');
    element(by.buttonText('Toevoegen')).click();

    expect(element.all(by.css('a')).getText()).toContain('●Test');
  });

  it('should delete a drink', function() {
    browser.get('http://localhost:4200/drinks');
    browser.sleep(2000);

    const byTest = element(by.cssContainingText('.badge', '●Test'));
    byTest.element(by.buttonText('x')).click();

    expect(browser.isElementPresent(by.cssContainingText('.badge', '●Test'))).toBeUndefined();
  }); */
});
