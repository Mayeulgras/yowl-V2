import React, { useState } from 'react';
import { ArrowLeft } from "react-feather";
import { Link } from 'react-router-dom';


const CGU = () => {

    return (
        
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
       <Link to="/profil">
        <ArrowLeft style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }} />
      </Link>

            <p style={{ textAlign: 'justify' }}>
                1- Acceptance of Terms<br />
                By using the Application, you agree to be bound by these CGU. If you do not accept these CGUs in their entirety, you are not authorized to use the Application.<br />
                <br />
                2- Description of the Application<br />
                The Application is designed to enable users to publish business information and exchange ideas in a professional context. It offers features such as message publishing and user profile creation.<br />
                <br />
                3- Registration and user account<br />
                To use certain features of the Application, you will need to create a user account. You agree to provide accurate, complete and up-to-date information when registering, and to maintain the security of your account. You are solely responsible for all activities that occur under your account.<br />
                <br />
                4- Permitted use<br />
                You agree to use the Application in accordance with all applicable laws, rules and regulations. You agree not to use the Application for any purpose that is unlawful or prohibited by these CGU.<br />
                <br />
                5- User Content<br />
                You are solely responsible for any content you publish on the Application. By posting content, you warrant that you have the right to do so and that such content does not infringe any third party rights.<br />
                <br />
                6- Intellectual property rights<br />
                All intellectual property rights in the Application and its content (except user content) are owned by SUIT or its licensors. No right, title or interest in any such intellectual property rights is transferred to you.<br />
                <br />
                7- Limitation of liability<br />
                To the fullest extent permitted by applicable law, SUIT disclaims all liability for any direct, indirect, incidental, special, consequential or exemplary damages resulting from the use of the Application or any content available on the Application.<br />
                <br />
                8- Modifications to the GCU<br />
                We reserve the right to modify these CGU at any time. Modifications will take effect as soon as they are published on the Application. We encourage you to review the CGU regularly to ensure that you understand the terms and conditions that apply to your use of the Application.<br />
                <br />
                9- Applicable law and jurisdiction<br />
                These CGU shall be governed by and construed in accordance with the laws of France. Any dispute arising out of or in connection with these CGU shall be subject to the exclusive jurisdiction of the courts of Paris, France.<br />
                <br />
                By using the Application, you agree to be bound by these CGU. If you have any questions about these CGUs, please contact us at suit@gmail.com.
                Done at Paris, on 29/01/2024.
            </p>
        </div>
    );
};

export default CGU;