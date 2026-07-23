import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us - Office Location & Contact Details | Criti Developers',
  description: 'Get in touch with Criti Developers in Payyannur, Kannur. Discuss your house construction, interior design, or renovation requirements with our expert team.',
  keywords: 'contact criti developers, construction office kannur, architects payyannur contact, home building consulting payyannur, phone number builders kannur',
  openGraph: {
    title: 'Contact Us - Office Location & Contact Details | Criti Developers',
    description: 'Get in touch with Criti Developers in Payyannur, Kannur. Discuss your house construction, interior design, or renovation requirements with our expert team.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
