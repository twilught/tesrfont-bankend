import { useEffect, useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // ใช้ URL จาก .env.local
        const apiUrl = `https://express-backend-xdol.onrender.com/api/hello`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error('Fetch error:', err));
    }, []);

    return (
        <div>
            <h1>Next.js Frontend</h1>
            <p>{message}</p>
        </div>
    );
}
