# Pet store tests

## Why Playwright
For testing Pet store CRUD with API I chose playwright framework as it is a very powerfull tool which combines a lot of instruments for testing.
It it very easy to set up and start to write new tests
Also it allows not only create API tests but UI as well, so in the end we can have all the tests in the same place

## Approach
I created only one file which contains all the tests for CRUD for Pet store API domain. I decided to put everything in one file to show how easy can automated testing statred with this tool.
Before each test I create new randomised instance of the pet in API and work with it in scenario itself.

## How to run tests
1. Up pet store application, follow instructions in readme of this project https://github.com/swagger-api/swagger-petstore
2. Install node.js https://nodejs.org/en
3. Navigate to this project directory and perform `npm install`
4. Then activate Playwright with `npm init playwright`                            
5. Run `npx playwright test`
6. Report will be automativally open in your default browser
