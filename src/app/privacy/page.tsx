export default function Privacy() {
    return (
        <div className="p-5 -mt-15">

            <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>
            
            <p className="text-center mb-5"><strong>Effective Date:</strong> { new Date("2025-08-29").toLocaleDateString()}</p>

            <p>At RateMySociety.co.uk, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. <br/>This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to protect your data.</p>
            <p className="mb-5">By using our website, you agree to the terms outlined in this Privacy Policy.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="mb-5">
                <li><strong>Browser Fingerprints:</strong> We use browser fingerprinting technology to identify and distinguish users. This includes information such as your browser type, operating system, device type, screen resolution, and other device-specific data. This helps us improve your user experience, reduce abuse, and ensure the functionality of the website.</li>
                <li><strong>IP Addresses:</strong> When you visit RateMySociety.co.uk, your IP address is logged. This data helps us manage the website, troubleshoot issues, and enhance site performance. It may also help us detect and prevent malicious activity.</li>
                <li><strong>User Reviews:</strong> We collect the review that you voluntarily submit about a society. This information is directly provided by you and is used for the purpose of displaying your review on the website.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="mb-5">
                <li><strong>Improving Website Functionality:</strong> The browser fingerprint and IP address data we collect help us understand how visitors interact with our site, which allows us to improve site performance and user experience.</li>
                <li><strong>Review Display:</strong> Your submitted review is displayed on the website for other users to view, based on the information you have provided.</li>
                <li><strong>Analytics:</strong> We may integrate third-party analytics services (such as Google Analytics) to help us track and analyze user interactions with the site. This will assist us in improving site performance, content, and overall user experience.</li>
                <li><strong>Advertising:</strong> We may use third-party advertising networks or services. These services may use your information, including IP addresses and browser fingerprints, to display personalized ads that are more relevant to you. You may be able to opt-out of personalized ads through the settings in your browser or via the ad network’s opt-out page.</li>
            </ul>

            <h2>3. Cookies</h2>
            <p className="mb-5">RateMySociety.co.uk may use cookies to enhance your browsing experience. Cookies are small files stored on your device that allow us to recognize you and remember your preferences for future visits. You can control cookies through your browser settings, and you may choose to disable cookies if you prefer.</p>

            <h2>4. Data Security</h2>
            <p className="mb-5">We take the security of your personal information seriously. While no data transmission method or storage system is 100% secure, we employ a variety of administrative, technical, and physical measures to safeguard your data against unauthorized access, disclosure, alteration, or destruction.</p>

            <h2>5. Sharing Your Information</h2>
            <p>We do not sell or share your personal data with third parties, except as required by law or in the following circumstances:</p>
            <ul className="mb-5">
                <li>To third-party service providers who help us with website hosting, analytics, or other functions that are necessary for the operation of the site.</li>
                <li>In the case of a merger, acquisition, or sale of RateMySociety.co.uk, in which your information may be transferred as part of the business transaction.</li>
            </ul>

            <h2>6. Your Rights and Choices</h2>
            <p>As a user, you have the following rights:</p>
            <ul className="mb-5">
                <li><strong>Access and Correction:</strong> You have the right to access the personal information we hold about you and request corrections if necessary.</li>
                <li><strong>Opt-out of Analytics and Ads:</strong> If you no longer wish to receive analytics tracking or personalized ads, you can disable cookies through your browser settings or opt-out using tools provided by ad networks or analytics services.</li>
                <li><strong>Deletion of Reviews:</strong> You can request the removal of your submitted review by contacting us at <a className="text-blue-500 hover:text-blue-800 transition duration-100" href="mailto:reviews@ratemysociety.co.uk">reviews@ratemysociety.co.uk</a></li>
                <li><strong>Deletion of User data:</strong> You can request the removal of your user data by contacting us at <a className="text-blue-500 hover:text-blue-800 transition duration-100" href="mailto:privacy@ratemysociety.co.uk">privacy@ratemysociety.co.uk</a>. Please not this will also facilitate the removal of any and all reviews left by you.</li>
            </ul>

            <h2>7. Changes to This Privacy Policy</h2>
            <p className="mb-5">We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will become effective as soon as it is published. We encourage you to review this policy periodically for any updates.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:</p>
            <p>Email: <a className="text-blue-500 hover:text-blue-800 transition duration-100" href="mailto:privacy@ratemysociety.co.uk">privacy@ratemysociety.co.uk</a></p>

        </div>
    )
}