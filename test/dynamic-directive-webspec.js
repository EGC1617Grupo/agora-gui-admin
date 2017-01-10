/* jshint ignore:start */
describe("dynamic-directive tests", function () {
"use strict"; 


  it("should login as admin", function(){
    browser.get('/admin/login')
    var email = element(by.id('emailText'));
    email.sendKeys('admin@agoravoting.com');
    var pass = element(by.id('passwordText'));
    pass.sendKeys('QWERTY33');
    var button = element(by.css('.btn-success'));
    button.click();
    expect(element(by.id('content')).isDisplayed()).toBe(true);
  })

});
/* jshint ignore:end */
