// Consumentenprijslijst 2026, aangeleverd op 31 oktober 2026 (inclusief btw).
// De gewichten 20/15 kg gelden voor de vier Dungking-meststoffen.
// KingSeed-emmers blijven in liters zoals op de aangeleverde prijslijst.
export const priceUpdate = '2026-10-31';
const fertilizer = [
  { packaging: 'Zak · 20 kg', cents: 5810, photo: 'Zak' },
  { packaging: 'Emmer · 15 kg', cents: 4995, photo: 'Emmer' },
];
export const productPrices = {
  startersmest: fertilizer,
  gazonmest: fertilizer,
  bordermest: fertilizer,
  aanplantmest: fertilizer,
  kingseed: [
    { packaging: 'Emmer · 20 liter', cents: 9750 },
    { packaging: 'Emmer · 10 liter', cents: 5990 },
    { packaging: 'Zak · 2 kg', cents: 3025, photo: 'Zak 2 kg' },
  ],
  vitalmix: [{ packaging: 'Zak · 50 liter', cents: 1455 }],
  'novaferm-viva': [{ packaging: 'Fles · 1 liter', cents: 5595 }],
};
export const businessPriceNote = 'Neem voor zakelijke prijzen en mogelijkheden contact met ons op.';
