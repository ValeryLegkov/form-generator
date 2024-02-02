import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white text-black text-xl flex min-h-screen flex-col p-24">
      Примеры
      <Link className="text-blue-900 mt-4" href="form/ba960eca-ed9d-499c-84aa-25cfc9d0ac93">
        Форма 1
      </Link>
      <Link className="text-red-900" href="form/dfe41043-0bf0-4047-97d5-3d4f865803c1">
        Форма 2
      </Link>
    </main>
  );
}
