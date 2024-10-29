import { useEffect } from 'react';
import { validUser } from '../Api/Auth.js';
import { useNavigate } from "react-router-dom";

function Start() {
    const pageRoute = useNavigate();

    useEffect(() => {
        
        const isValid = async () => {
      
                const data = await validUser();
                
                if (!data?.user) {
                    pageRoute("/login");
                } else {
                    pageRoute("/chats");
                }
            
        };

        isValid();
    }, [pageRoute]);

    return (
        <>
            <div>
                <h1>Loding...</h1>
           </div>
        </>
    );
}

export default Start;
