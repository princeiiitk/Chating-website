import { useEffect, useState } from 'react';
import { validUser } from '../Api/Auth.js';
import { useNavigate } from "react-router-dom";

function Start() {
    const pageRoute = useNavigate();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const isValid = async () => {
            try {
                const data = await validUser();

                if (!data?.user) {
                    pageRoute("/login");
                } else {
                    pageRoute("/chats");
                }
            } catch (error) {
                console.error("Error validating user:", error);
                pageRoute("/login"); 
            } finally {
                setLoading(false);
            }
        };

        isValid();
    }, [pageRoute]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <p>Redirecting...</p> 
            )}
        </div>
    );
}

export default Start;
