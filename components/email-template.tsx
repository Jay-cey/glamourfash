import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({
  name,
  email,
  message,
}: Readonly<EmailTemplateProps>) => (
  <div style={{ backgroundColor: '#f9fafb', padding: '60px 20px', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: '#1f2937' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
      
      {/* Header */}
      <div style={{ padding: '40px 40px 30px', textAlign: 'center', borderBottom: '1px solid #f3f4f6' }}>
         <h1 style={{ color: '#111827', margin: 0, fontFamily: 'Georgia, serif', fontSize: '32px', letterSpacing: '-0.5px', fontWeight: 'normal' }}>GlamourFash</h1>
         <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>Contact Form Submission</p>
      </div>
      
      {/* Content */}
      <div style={{ padding: '40px' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <p style={{ margin: '0 0 8px', color: '#9ca3af', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Sender</p>
          <p style={{ margin: 0, color: '#111827', fontSize: '18px', fontWeight: 500 }}>{name}</p>
          <a href={`mailto:${email}`} style={{ color: '#d97706', textDecoration: 'none', fontSize: '16px' }}>{email}</a>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ margin: '0 0 8px', color: '#9ca3af', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Message</p>
          <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#374151', lineHeight: '1.8', fontSize: '16px' }}>
            {message}
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
           <a href={`mailto:${email}`} style={{ display: 'inline-block', backgroundColor: '#111827', color: '#ffffff', padding: '16px 32px', borderRadius: '9999px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', letterSpacing: '0.5px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>Reply to {name}</a>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '30px', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '12px' }}>&copy; {new Date().getFullYear()} GlamourFash. All rights reserved.</p>
      </div>
    </div>
  </div>
);
