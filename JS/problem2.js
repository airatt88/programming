/*let a = 20, b = 25;
let ab = Number(String(a) + String(b));
let scuared = (a+b)**2;
    console.log(ab === scuared);
*/
function is2025Number(a, b) {
    let ab = Number(String(a) + String(b));
    return ab === (a+b)**2;
}
function find2025Numbers(MaxDigits) {
    let sum = 0;


    for (let a = 1; a < 10 ** (MaxDigits / 2); a++) {
        if (a % 100 === 0) console.log(`Checking a=${a}...`); //shows progress
        for (let b = 1; b < 10 ** (MaxDigits / 2); b++) {
            let ab = Number(String(a) + String(b));
            if (ab.toString().length > MaxDigits) break;

            if (is2025Number(a, b)) {
                console.log(`Found: ${ab} (a=${a}, b=${b})`);
                sum += ab;
            }
        }
    }


    return sum;
}


console.log("T(4) =", find2025Numbers(4));
