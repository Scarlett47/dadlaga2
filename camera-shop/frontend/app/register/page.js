'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        setMessage('❌ Бүртгүүлэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Бүртгүүлэхэд алдаа:', error);
      setMessage('❌ Сервертэй холбогдож чадсангүй.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">📝 Бүртгүүлэх</h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Нэр</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/50 bg-white/20 py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Таны нэр"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Имэйл</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/50 bg-white/20 py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Таны имэйл"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/50 bg-white/20 py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Нууц үг"
            />
          </div>

          {message && <p className="text-center text-red-100">{message}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            ✅ Бүртгүүлэх
          </button>

          <p className="text-center text-white mt-4">
            Аль хэдийн бүртгэлтэй юу?{' '}
            <Link href="/login" className="underline hover:text-green-200">
              Нэвтрэх
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
