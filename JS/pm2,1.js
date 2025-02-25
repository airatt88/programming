function is2025Number(a, b) {
    let ab = Number(String(a) + String(b));
    return ab === (a+b)**2;
}
function find2025NumbersOptimized(MaxDigits) {
    let sum = 0;
    let maxValue = 10 ** MaxDigits;

    for (let c = 1; c * c < maxValue; c++) {  // Only go up to √maxValue
        let ab = c * c; // Calculate ab directly
        let str = String(ab);

        for (let split = 1; split < str.length; split++) {
            let a = Number(str.slice(0, split));
            let b = Number(str.slice(split));

            if (String(a) + String(b) === String(ab) && a + b === c && b > 0 && !String(b).startsWith('0')) {
                
                console.log(`Found: ${ab} (a=${a}, b=${b})`);
                sum += ab;
            }
        }
    }

    return sum;
}

console.log("T(16) =", find2025NumbersOptimized(16));

