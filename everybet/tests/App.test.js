import App from '../src/App.js';

let appTest;

beforeEach(() => {
    appTest = new App();
});

test("Should instantiate the class", () => {
    expect(appTest).to.be.an.instanceOf(App);
});
