# Playwright End-to-End Tests for SSLs.com

This repository contains end-to-end tests using Playwright for the SSLs.com website.

## Prerequisites

Before running the tests, ensure you have the following prerequisites installed:

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/NCtestrepo.git
```

2. Navigate to the cloned repository:
   
```bash
cd NCtestrepo
```

3. Install dependencies:
```bash
npm install
```

## Running the Tests

To run the tests, execute the following command:

```bash
npm test
```
This command will launch the Playwright test runner and execute all test cases defined in the tests directory.

## Test Cases
The test cases are defined in the tests directory. Each test file contains one or more test scenarios. You can modify these test files or add new ones according to your requirements.

## Configuration 
The Playwright test configuration is defined in the playwright.config.js file. You can configure the browser type, test timeout, and other settings in this file. 

## Environment Variables [ToDo]
You can use environment variables to configure test parameters such as URLs, credentials, etc. Refer to the test files for examples of how to use environment variables in tests.

## Contributing
If you find any issues or want to contribute improvements to the tests, feel free to open a pull request or submit an issue in the GitHub repository.
