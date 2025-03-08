
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Terms = () => {
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
            <h1 className="text-3xl font-display font-bold mb-2">Terms and Conditions & Privacy Policy</h1>
            <p className="text-muted-foreground">Effective Date: 01/12/2025</p>
          </div>
          
          <div className="space-y-8 mb-8">
            <section className="prose prose-zinc dark:prose-invert max-w-none">
              <h2 className="text-2xl font-display font-bold">Terms and Conditions</h2>
              
              <h3 className="text-xl font-semibold mt-6">1. Introduction</h3>
              <p>Welcome to JuliusTaylor Harmony Hub ("we," "our," "us"). By accessing or using our website, services, or products, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
              
              <h3 className="text-xl font-semibold mt-6">2. Eligibility</h3>
              <p>You must be at least 18 years old to use our services. By using our platform, you represent and warrant that you meet this eligibility requirement.</p>
              
              <h3 className="text-xl font-semibold mt-6">3. Use of Services</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>You agree to use our website and services only for lawful purposes.</li>
                <li>You may not attempt to gain unauthorized access to our systems or interfere with our operations.</li>
                <li>Any use of our content without permission is strictly prohibited.</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6">4. Intellectual Property</h3>
              <p>All beats and original music production created by JuliusTaylor Harmony Hub remain the sole property of JuliusTaylor. Users retain ownership of all other content they upload, including text, images, and videos. By uploading content, users grant us a limited, non-exclusive license to display it on our platform for functionality and promotional purposes.</p>
              
              <h3 className="text-xl font-semibold mt-6">5. User-Generated Content</h3>
              <p>If you submit content (comments, reviews, uploads, etc.), you retain full ownership of your content, except for beats and original compositions created by JuliusTaylor Harmony Hub, which remain our exclusive property. By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content for operational and promotional purposes within the platform.</p>
              
              <h3 className="text-xl font-semibold mt-6">6. Termination</h3>
              <p>We reserve the right to terminate or suspend your access to our services for violations of these Terms or any illegal or harmful activity.</p>
              
              <h3 className="text-xl font-semibold mt-6">7. Limitation of Liability</h3>
              <p>We are not liable for any indirect, incidental, or consequential damages resulting from your use of our services. Your use of our platform is at your own risk.</p>
              
              <h3 className="text-xl font-semibold mt-6">8. Governing Law</h3>
              <p>These Terms shall be governed by and interpreted in accordance with the laws of the United States of America.</p>
            </section>
            
            <section className="prose prose-zinc dark:prose-invert max-w-none">
              <h2 className="text-2xl font-display font-bold">Privacy Policy</h2>
              
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
              <p>We reserve the right to update this Terms and Privacy Policy. Changes will be posted on this page with an updated effective date.</p>
              
              <h3 className="text-xl font-semibold mt-6">8. Contact Us</h3>
              <p>If you have any questions about our Terms or Privacy Policy, please contact us at taylormade@jtaylormusicnow.com</p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
