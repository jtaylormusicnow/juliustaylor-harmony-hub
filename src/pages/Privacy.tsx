
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/signup" className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Signup
            </Link>
            <h1 className="text-3xl font-display font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Effective Date: 01/12/2025</p>
          </div>
          
          <div className="space-y-8 mb-8">
            <section className="prose prose-zinc dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mt-6">1. Information We Collect</h3>
              <p>We may collect personal information such as your name, email address, and usage data when you interact with our website or services.</p>
              
              <h3 className="text-xl font-semibold mt-6">2. How We Use Your Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and improve our services.</li>
                <li>To communicate with you regarding updates and promotional content.</li>
                <li>To ensure security and prevent fraud.</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6">3. How We Protect Your Information</h3>
              <p>We implement industry-standard security measures to safeguard your personal data. However, no online service is completely secure, and we cannot guarantee absolute security.</p>
              
              <h3 className="text-xl font-semibold mt-6">4. Third-Party Services</h3>
              <p>We may use third-party services (e.g., payment processors, analytics tools) that have their own privacy policies. We are not responsible for how these third parties handle your information.</p>
              
              <h3 className="text-xl font-semibold mt-6">5. Cookies and Tracking</h3>
              <p>We use cookies to enhance user experience and collect analytics. You can disable cookies through your browser settings, but some features may not function properly.</p>
              
              <h3 className="text-xl font-semibold mt-6">6. Your Rights</h3>
              <p>You may request access to, correction, or deletion of your personal information by contacting us.</p>
              
              <h3 className="text-xl font-semibold mt-6">7. Changes to This Policy</h3>
              <p>We reserve the right to update this Privacy Policy. Changes will be posted on this page with an updated effective date.</p>
              
              <h3 className="text-xl font-semibold mt-6">8. Contact Us</h3>
              <p>If you have any questions about our Privacy Policy, please contact us at taylormade@jtaylormusicnow.com</p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
