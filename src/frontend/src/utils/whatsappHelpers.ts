import { CartItem } from '../context/CartContext';

const WHATSAPP_NUMBER = '917045899262';

export function formatOrderMessage(items: CartItem[]): string {
  const lines: string[] = [];

  lines.push('🌟 *New Order — Miss Luxe*');
  lines.push('');
  lines.push('*Order Details:*');
  lines.push('─────────────────────');

  items.forEach((item) => {
    const lineTotal = item.price * item.quantity;
    lines.push(`• ${item.name}`);
    lines.push(`  Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${lineTotal.toLocaleString('en-IN')}`);
  });

  lines.push('─────────────────────');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  lines.push(`*Total: ₹${total.toLocaleString('en-IN')}*`);
  lines.push('');
  lines.push('💳 *Prepaid Orders Only*');
  lines.push('Prices inclusive of premium packaging.');
  lines.push('');
  lines.push('Please share your delivery address and preferred payment method to confirm your order.');
  lines.push('');
  lines.push('Thank you for choosing Miss Luxe. 🖤✨');

  return lines.join('\n');
}

export function generateWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatProductForWhatsApp(productName: string, price: number): string {
  const lines: string[] = [];

  lines.push('🌟 *Order Enquiry — Miss Luxe*');
  lines.push('');
  lines.push(`*Product:* ${productName}`);
  lines.push(`*Price:* ₹${price.toLocaleString('en-IN')}`);
  lines.push('');
  lines.push('💳 *Prepaid Orders Only*');
  lines.push('Prices inclusive of premium packaging.');
  lines.push('');
  lines.push('Please share your delivery address and preferred payment method to confirm your order.');
  lines.push('');
  lines.push('Thank you for choosing Miss Luxe. 🖤✨');

  return lines.join('\n');
}

export function formatBundleForWhatsApp(bundleName: string, price: number): string {
  const lines: string[] = [];

  lines.push('🎁 *Gift Box Order — Miss Luxe*');
  lines.push('');
  lines.push(`*Gift Box:* ${bundleName}`);
  lines.push(`*Price:* ₹${price.toLocaleString('en-IN')}`);
  lines.push('');
  lines.push('💳 *Prepaid Orders Only*');
  lines.push('Prices inclusive of premium packaging.');
  lines.push('');
  lines.push('Please share your delivery address and preferred payment method to confirm your order.');
  lines.push('');
  lines.push('Thank you for choosing Miss Luxe. 🖤✨');

  return lines.join('\n');
}
