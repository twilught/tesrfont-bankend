import { useEffect, useState } from 'react';

// 🌍 log ตอน build-time (ฝังลงใน JS bundle)
console.log('🌍 ENV at build:', process.env.NEXT_PUBLIC_API_URL);

export default function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/hello`;
        console.log('🌐 Fetching from:', apiUrl); // ✅ log ตอน runtime (บน browser)

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
            <h1>มายรักก้อง</h1>
            <p>{message}</p>
        </div>
    );
}
