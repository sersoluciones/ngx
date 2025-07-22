export function calculateDv(nit: string): number {
    // Limpiar y conservar solo los dígitos
    const cleanNit = nit.replace(/\D+/g, '');

    // Factores predefinidos
    const factors = [0, 3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

    // Convertir string a array de dígitos y calcular la suma ponderada
    const sum = Array.from(cleanNit)
        .map(char => parseInt(char, 10))
        .reduce((acc, digit, index) => {
            const factor = factors[cleanNit.length - index];
            return acc + (digit * factor);
        }, 0);

    // Calcular dígito verificador
    const remainder = sum % 11;
    return remainder > 1 ? 11 - remainder : remainder;
}
