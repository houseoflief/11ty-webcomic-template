const now = new Date();
const fs = require('fs')
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let questions = [
    '\nWhat do you want to call your post?\n>',
    '\nWrite a 1-2 sentence description for your post.\n>',
    '\nThanks! What is the filepath for your image?\n>',
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
    let description = answers[1];
    let image = answers[2];
    // close at the end
    rl.close();

    const filePath = generateFilePath( title );
    const content = generateContent(title,image,description);
    fs.writeFile(filePath, content, { flag: 'w+' }, (err) => {
        if (err) return console.log(err);
        console.log(`Created ${filePath}`);
    });

    console.log(`\nThanks! Here's your post so far:\nTitle: ${title}\nDescription: ${description}\nImage: ${image}\n`);
})();
};

function generateFilePath(name) {
    return path.join(__dirname, '..', 'comic', `${name}.md`);
}

function generateContent(title,image,description) {
    return `---\ntitle: ${title}\nimages: ['${image}']\ntags: \ndescription: ${description}\ndate: ${ now }\n---`;
}

