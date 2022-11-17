const a = '';
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function printSentence() {
    console.log("Hello World")
    if (a.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("Will be printed after 2 seconds");
    }
    console.log("Bye World")
}

printSentence();