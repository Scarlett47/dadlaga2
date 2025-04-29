'use client';

import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎉 Төлбөр амжилттай боллоо!</h1>
      <p>Таны захиалгыг амжилттай хүлээн авлаа.</p>
      <br />
      <Link href="/">⬅ Нүүр хуудас руу буцах</Link>
    </div>
  );
}
