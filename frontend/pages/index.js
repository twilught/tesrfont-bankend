import { useEffect, useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/hello`;
        console.log('📡 Fetching from:', apiUrl); // ดูว่า env อ่านได้ไหม

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log('✅ Response:', data);
                setMessage(data.message);
            })
            .catch((err) => console.error('❌ Fetch error:', err));
    }, []);

    return (
        <div>
            <h1>Next.js Frontend</h1>
            <p>{message}</p>
        </div>
    );
}
