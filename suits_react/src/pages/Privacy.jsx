import React, { useState, useEffect } from 'react';
import { ArrowLeft } from "react-feather";
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';


const Privacy = () => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const savedCheckedState = localStorage.getItem('privacyAccepted');
        setIsChecked(savedCheckedState === 'true');
      }, []);
    
      const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        localStorage.setItem('privacyAccepted', e.target.checked);
      };

    return (
        
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
        <Link to="/profil">
            <ArrowLeft style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }} />
        </Link>

            <p style={{ textAlign: 'justify' }}>
                SUITS Privacy Policy<br />
                Effective date: 01/22/2024<br />
                <br />
                Welcome to Suits! We are committed to protecting your privacy and securing the information you entrust to us. This privacy policy explains how we collect, use, share and protect your personal data when you use our application.<br />
                <br />
                1. Information Collection<br />
                <br />
                1.1 Information you provide to us<br />
                When using Suits, you may be asked to provide us with certain information, such as your username, e-mail address and other profile information. Your agreement to this is demonstrated by a positive act. We will verify the veracity of your information using two-step verification techniques and through your electronic devices.<br />
                <br />
                1.2 Information collected automatically<br />
                We automatically collect information about how you use the App, including your tweet activity, the hashtags you use and other similar information. You have the choice to refuse this collection of information or to modify your choice at any time. This information is stored in a separate file for a period of time defined by applicable law. Your consent is expressed by a positive act.<br />
                <br />
                1.3 Legitimate purpose of data collection<br />
                All data collection has a predefined and legitimate purpose.<br />
                <br />
                1.4 Cookie policy<br />
                Our cookie policy is predefined and accessible in the settings tab.<br />
                <br />
                2. Use of information<br />
                We use the information we collect to personalize your experience on the application, improve our services and send you relevant notifications. We do not sell your personal information to third parties. If you would like more information, you can access a dedicated page in our application settings.<br />
                <br />
                3. Information sharing<br />
                We share your personal information in a limited and secure way. This may include sharing with trusted partners to improve our services or to meet legal obligations. Their sharing is accessible to you in the dedicated tab in our app, and your choice is free to opt-in or opt-out.<br />
                <br />
                4. Data security<br />
                We take reasonable security measures to protect your information from unauthorized access, alteration, disclosure or destruction. Your data will be stored for a defined period of time depending on the data in question, the specifications of which are accessible on the dedicated page in our application.<br />
                <br />
                5. Privacy by Design<br />
                We follow the principles of "Privacy by Design", integrating privacy protection into the development of our application right from the outset. We minimize data collection, implement robust security measures, and are committed to respecting the privacy of our users.<br />
                <br />
                6. Your choices<br />
                You have control over your data. You can access, correct or delete your personal information at any time, and changes will take effect instantly. In addition, your choices about how your data is processed can be changed at any time.<br />
                <br />
                7. Changes to the Policy<br />
                We may update this Privacy Policy at any time to reflect changes in our practices. The effective date at the top of this page indicates the last modification.<br />
                <br />
                8. Contacting us<br />
                If you have any questions about our privacy policy, please contact us at suits@gmail.com.
            </p>
            <Checkbox 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
                style={{ color: 'white' }}
            >
                I accept the privacy policy
            </Checkbox>
        </div>
    );
};

export default Privacy;