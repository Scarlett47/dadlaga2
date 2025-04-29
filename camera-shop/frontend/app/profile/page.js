'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (!access) {
      router.push('/login');
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });

        if (res.status === 401) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        setProfileData((prev) => ({
          ...prev,
          username: data.username,
          email: data.email,
        }));
      } catch (error) {
        console.error('Профайл авахад алдаа:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    router.push('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const access = localStorage.getItem('access');
      const res = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('🎉 Мэдээлэл амжилттай хадгалагдлаа!');
        setProfileData((prev) => ({
          ...prev,
          current_password: '',
          new_password: '',
          confirm_password: '',
        }));
      } else {
        setMessage(`❌ Алдаа: ${data.error}`);
      }
    } catch (error) {
      console.error('Хадгалах үед алдаа:', error);
      setMessage('❌ Сервертэй холбогдож чадсангүй.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">👤 Миний профайл</h1>

        {loading ? (
          <p className="text-gray-500">Уншиж байна...</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-6 text-left">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Нэр</label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Имэйл</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="border-t pt-4">
              <h2 className="text-lg font-bold text-gray-700 mb-4">🔒 Нууц үг солих (заавал биш)</h2>

              <label className="block text-gray-700 mb-2">Одоогийн нууц үг</label>
              <input
                type="password"
                name="current_password"
                value={profileData.current_password}
                onChange={handleChange}
                className="w-full mb-4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <label className="block text-gray-700 mb-2">Шинэ нууц үг</label>
              <input
                type="password"
                name="new_password"
                value={profileData.new_password}
                onChange={handleChange}
                className="w-full mb-4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <label className="block text-gray-700 mb-2">Шинэ нууц үг давтах</label>
              <input
                type="password"
                name="confirm_password"
                value={profileData.confirm_password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {message && (
              <div className="text-center text-gray-700">{message}</div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {isSaving ? 'Хадгалж байна...' : '✅ Хадгалах'}
            </button>
          </form>
        )}

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
        >
          🔓 Гарах
        </button>

        <div className="mt-6">
          <Link href="/" className="text-blue-500 hover:underline">
            ⬅ Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    </div>
  );
}
