const now = new Date();
const fs = require('fs')
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let questions = [
    '\nWhat\'s the name of your image?\n>',
];

newPost()

function newPost() {
(async () => {
    let answers = [];

    // asking questions one by one
    for (let question of questions) {

        // wait for the answer
        let answer = await new Promise(resolve => rl.question(question, resolve));
    
        console.log(`\nYou said: ${answer}`);
    
        answers.push(answer);
    }
    
    let title = answers[0];
    let tag = answers[1];
    // close at the end
    rl.close();

    const filePath = generateFilePath( title );
    const content = generateContent(title);
    fs.writeFile(filePath, content, { flag: 'w+' }, (err) => {
        if (err) return console.log(err);
        console.log(`Created ${filePath}`);
    });

})();
};

function generateFilePath(name) {
    const result = `${name}`.replaceAll(" ", "-").toLowerCase()+'.md';
    return path.join(__dirname, '..', `gallery`, result);
}

function generateContent(title) {
    return `---\ntitle: ${title}\nimages: [''] \ndate: ${ now }\npermalink: false \n---`;
}

