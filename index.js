const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

//promisify the file object for Async operation
const writeFileAsync = util.promisify(fs.writeFile);

//use the inquirer library for input from the user
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of your project?',
    },      
    {
      type: 'input',
      name: 'description',
      message: 'Please describe your project?',
    },
    {
      type: 'input',
      name: 'install',
      message: 'Please provide the installion instructions?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide the usage information?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please provide test instructions?',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Enter contribution information?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What License would you like?',
      choices: [
        'MIT License',
        'GNU General Public License v2.0',
        'GNU General Public License v3.0',
        'Mozilla Public License 2.0',          
        'Unlicense',
      ],
      
    },
  
  ]);
};
//generate the readme file from the inputs of the user
const generateREADME = (answers) => { 
  
  function convertToBadge (val) {
    if(val === "MIT License")
    return "![MIT  ](https://img.shields.io/badge/MIT-License-orange)";
    if(val === "GNU General Public License v2.0")
    return "![GNUv2](https://img.shields.io/badge/GNU-General%20Public%20License%20v2.0-lightgrey)";
    if(val === "GNU General Public License v3.0")
    return "![GNUv3](https://img.shields.io/badge/GNU-General%20Public%20License%20v3.0-yellowgreen)";          
    if(val === "Mozilla Public License 2.0")
    return "![Mozilla](https://img.shields.io/badge/Mozilla-Public%20License%202.0-brightgreen)";
    if(val === "Unlicense")
    return "![TheUnlicense](https://img.shields.io/badge/The%20-Unlicense-blue)";
  };
  
 //template literal wtih placeholders used to format where the user 
 //input is placed
  return `# ${answers.title}                       
  ${convertToBadge(answers.license)}


  ## Description
  ${answers.description}

  ## Table of Contents

  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)
  * [License](#License)

  ## Installation
  ${answers.install}

  ## Usage
  ${answers.usage}

  ## Contributing
  ${answers.contribution}


  ## Tests
  ${answers.tests}

  ## Questions
  GitHub profile: https://github.com/${answers.github}

  Contact me at: ${answers.email} with any additional questions.

  ## License
  This application is covered under the ${answers.license} 
  `;

};


// Uses async/await and try/catch
const init = async () => {
console.log('hi');
try {
const answers = await promptUser();

const html = generateREADME(answers);

await writeFileAsync('proGeneratorREADME.md', html);

console.log('Successfully wrote to test.md');
} catch (err) {
console.log(err);
}
};

init();