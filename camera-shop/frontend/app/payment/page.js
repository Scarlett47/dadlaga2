'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setIsPaying(true);

    // Mock төлбөрийн процесс
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);

      // 2 секундийн дараа амжилтын хуудсанд оруулах
      setTimeout(() => {
        router.push('/payment/success');
      }, 2000);
    }, 2000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>💳 Төлбөр төлөх</h1>

      {paymentSuccess ? (
        <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 Төлбөр амжилттай төлөгдлөө!</p>
      ) : (
        <button
          onClick={handlePayment}
          disabled={isPaying}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {isPaying ? 'Төлбөр хийж байна...' : '💳 Төлбөр төлөх'}
        </button>
      )}

      <br /><br />
      <Link href="/">⬅ Нүүр хуудас руу буцах</Link>
    </div>
  );
}
