import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Criti Developers',
  description: 'Privacy Policy for Criti Developers LLP - House Construction, Interiors & Architectural Design in Kannur.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-8 font-heading">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none font-body text-secondary/80">
          <p className="text-sm text-gray-500 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Introduction
            </h2>
            <p>
              Criti Developers LLP (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Information We Collect
            </h2>
            <p>We may collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Name and contact information (phone number, email address)</li>
              <li>Project requirements and details</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Send you project updates and communications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Information Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none pl-0 mt-4 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:info@critidesigns.com" className="text-primary hover:underline">info@critidesigns.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+917306612105" className="text-primary hover:underline">+91 73066 12105</a></li>
              <li><strong>Address:</strong> Criti Developers LLP, AHAMMED COMPLEX, Thayineri Road, Payyanur, Kerala 670307, India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

