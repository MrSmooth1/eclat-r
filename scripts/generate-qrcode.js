// Génère le QR code des cartes de visite vers la page /reserver.
// Usage : npm run qrcode            → https://www.eclatresidences.com/reserver
//         npm run qrcode -- <url>   → URL personnalisée
// ⚠ N'imprimez le QR code qu'APRÈS avoir vérifié que l'URL s'ouvre correctement en HTTPS.
import fs from 'node:fs/promises';
import QRCode from 'qrcode';

const url = process.argv[2] || 'https://www.eclatresidences.com/reserver';
await fs.mkdir('qrcode', { recursive: true });
const opts = { errorCorrectionLevel: 'H', margin: 2, color: { dark: '#161513', light: '#ffffff' } };
await QRCode.toFile('qrcode/qr-reserver.png', url, { ...opts, width: 1200 });
await fs.writeFile('qrcode/qr-reserver.svg', await QRCode.toString(url, { ...opts, type: 'svg' }));
console.log(`QR code généré pour ${url} → qrcode/qr-reserver.png et qrcode/qr-reserver.svg`);
