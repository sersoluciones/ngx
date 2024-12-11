export function calculateDv(nit: string) {
    let x = 0;
    const _nit = nit.replace(/\D+/g, '');
    let z = _nit.length;

    let arr = new Array(16);
    arr[1] = 3;
    arr[2] = 7;
    arr[3] = 13;
    arr[4] = 17;
    arr[5] = 19;
    arr[6] = 23;
    arr[7] = 29;
    arr[8] = 37;
    arr[9] = 41;
    arr[10] = 43;
    arr[11] = 47;
    arr[12] = 53;
    arr[13] = 59;
    arr[14] = 67;
    arr[15] = 71;

    let y = 0;
    for (let i = 0; i < z; i++) {
        y = parseInt(_nit.substring(i, i + 1));
        x += (y * arr[z - i]);
    }

    y = x % 11;

    if (y > 1) {
        return 11 - y;
    } else {
        return y;
    }
}
