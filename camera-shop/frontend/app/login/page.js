'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // ✨ Email биш Username явуулна
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access', data.access);
        router.push('/');
      } else {
        setMessage('❌ Нэвтрэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Нэвтрэхэд алдаа:', error);
      setMessage('❌ Сервертэй холбогдож чадсангүй.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">🔐 Нэвтрэх</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Нэр</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/50 bg-white/20 py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Таны нэр"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/50 bg-white/20 py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Таны нууц үг"
            />
          </div>

          {message && <p className="text-center text-red-100">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            ✅ Нэвтрэх
          </button>

          <p className="text-center text-white mt-4">
            Бүртгэлгүй юу?{' '}
            <Link href="/register" className="underline hover:text-blue-200">
              Бүртгүүлэх
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
