function randomString(qnt) {
    const chr = "abcdefghijklmnopqrstuvwxyz123456789";
    let randomString = "";

    for (let i = 0; i < qnt; i++) {
        const index = Math.floor(Math.random() * chr.length);
        randomString += chr[index];
    }
    return randomString;

}

function randomNumber(qnt) {
    const chr = "123456789";
    let randomNumber = "";

    for (let i = 0; i < qnt; i++) {
        const index = Math.floor(Math.random() * chr.length);
        randomNumber += chr[index];
    }
    return Number(randomNumber);

}



module.exports = { randomString, randomNumber };