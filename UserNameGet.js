import React, { useState, useEffect } from 'react';

const UserNameGet = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user/single-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uId: userId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setUserData(data.User);
            setError(null);
        } catch (error) {
            setError(error.message);
            setUserData(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* No input field for userId since it's retrieved from localStorage */}
                <button type="submit">Get User Data</button>
            </form>

            {error && <p>{error}</p>}

            {userData && (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone Number: {userData.phoneNumber}</p>
                    {/* Add more fields as needed */}
                </div>
            )}
        </div>
    );
};

export default UserNameGet;
