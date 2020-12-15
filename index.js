const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

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
        'The Unlicense',
      ],
      filter: function (val) {
        if(val === "MIT License")
        return "![MIT  ](https://img.shields.io/badge/MIT-License-orange)";
        if(val === "GNU General Public License v2.0")
        return "![GNUv2](https://img.shields.io/badge/GNU-General%20Public%20License%20v2.0-lightgrey)";
        if(val === "GNU General Public License v3.0")
        return "![GNUv3](https://img.shields.io/badge/GNU-General%20Public%20License%20v3.0-yellowgreen)";          
        if(val === "The Unlicense")
        return "![TheUnlicense](https://img.shields.io/badge/The%20-Unlicense-blue)";
      },
    },
  
  ]);
};

const generateHTML = (answers) =>    
// function myTag(strings, personExp, ageExp) {
//     let str0 = strings[0]; // "That "
//     let str1 = strings[1]; // " is a "
  
    // There is technically a string after
    // the final expression (in our example),
    // but it is empty (""), so disregard.
    // let str2 = strings[2];
  
  //   let ageStr;
  //   if (ageExp > 99){
  //     ageStr = 'centenarian';
  //   } else {
  //     ageStr = 'youngster';
  //   }
  
  //   // We can even return a string built using a template literal
  //   return `${str0}${personExp}${str1}${ageStr}`;
  // }
  
`# ${answers.title}                       
${answers.license}


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
${answers.license.substring(2,7)} License
`;



// Bonus using async/await and try/catch
const init = async () => {
console.log('hi');
try {
const answers = await promptUser();

console.log(`All answers: ${answers.title}`);
console.log(`License text: ${answers.license}`);

const html = generateHTML(answers);

await writeFileAsync('test.md', html);

console.log('Successfully wrote to test.md');
} catch (err) {
console.log(err);
}
};

init();