'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Linkedin,
  Github,
  MapPin,
  Check,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    labAudio.playChime();
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    labAudio.playClick(1000);
    setStatus('sending');

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Dispatch received! I will review your message and reply promptly.');
        labAudio.playChime();
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        // Fallback to mailto
        triggerMailtoFallback();
      }
    } catch {
      // Offline or static export fallback
      triggerMailtoFallback();
    }
  }

  function triggerMailtoFallback() {
    const subjectLine = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const bodyContent = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subjectLine}&body=${bodyContent}`;
    setStatus('success');
    setStatusMessage('Transmission client opened via direct mailto. Your message has been prepared for dispatch.');
    labAudio.playChime();
  }

  return (
    <section id="contact" className="py-28 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] tech-grid overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
            <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[#D9363E]">
              FINAL CONNECTION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
            SECURE TRANSMISSION
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
            &ldquo;Have an idea? Let&apos;s build something.&rdquo;
          </p>
          <p className="text-sm sm:text-base text-[#81777A] font-normal leading-relaxed">
            I&apos;m open to software development opportunities, full-stack engineering internships, collaborative open-source projects, and technical dialogues.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)] space-y-6">
              <div className="space-y-1">
                <div className="mono text-xs text-[#D9363E] font-bold uppercase">
                  PRIMARY INBOX &amp; LOCATION
                </div>
                <div className="text-xl font-bold text-[#171416]">{PROFILE.email}</div>
                <div className="mono text-xs text-[#81777A] flex items-center gap-1.5 pt-1">
                  <MapPin size={13} className="text-[#D9363E]" />
                  <span>{PROFILE.location} (UTC+5:30)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 mono text-xs px-5 py-3 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-[0_6px_20px_rgba(217,54,62,0.25)] w-full cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Mail size={14} />}
                <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : 'SAY HELLO (COPY EMAIL)'}</span>
              </button>

              <div className="pt-4 border-t border-[#E5DDDA] space-y-3">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => labAudio.playClick(900)}
                  className="p-3.5 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-between text-xs mono text-[#171416] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={16} className="text-[#D9363E]" />
                    <span className="font-bold">CONNECT ON LINKEDIN</span>
                  </div>
                  <ExternalLink size={13} className="text-[#81777A] group-hover:text-[#D9363E]" />
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => labAudio.playClick(900)}
                  className="p-3.5 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-between text-xs mono text-[#171416] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={16} className="text-[#171416]" />
                    <span className="font-bold">EXPLORE GITHUB</span>
                  </div>
                  <ExternalLink size={13} className="text-[#81777A] group-hover:text-[#D9363E]" />
                </a>
              </div>
            </div>

            {/* Availability Callout */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.02)] space-y-2">
              <div className="flex items-center gap-2 text-xs mono text-[#10B981] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>ACTIVE ENGAGEMENT WINDOW</span>
              </div>
              <p className="text-xs text-[#81777A] leading-relaxed">
                Currently available for software engineering internships, open-source programs, and technical collaborations starting immediately.
              </p>
            </div>
          </div>

          {/* Right Column: Connection Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DDDA] text-xs mono text-[#81777A]">
                <span>SECURE TRANSMISSION FORM</span>
                <span className="text-[#D9363E] font-bold">ENCRYPTED INPUT</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="mono text-[11px] text-[#81777A] uppercase font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs sm:text-sm text-[#171416] placeholder-[#81777A]/60 outline-none focus:border-[#D9363E] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="mono text-[11px] text-[#81777A] uppercase font-bold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs sm:text-sm text-[#171416] placeholder-[#81777A]/60 outline-none focus:border-[#D9363E] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="mono text-[11px] text-[#81777A] uppercase font-bold">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity / CivicOS Inquiry"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs sm:text-sm text-[#171416] placeholder-[#81777A]/60 outline-none focus:border-[#D9363E] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="mono text-[11px] text-[#81777A] uppercase font-bold">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, project, or opportunity..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs sm:text-sm text-[#171416] placeholder-[#81777A]/60 outline-none focus:border-[#D9363E] transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3.5 rounded-2xl bg-[#FDF6F6] border border-[#F2D2D4] text-xs mono text-[#D9363E] flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{statusMessage || 'Please fill in all required fields (Name, Email, Message).'}</span>
                  </div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[#EDF9F0] border border-[#C5ECD0] text-xs mono text-[#10B981] flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>{statusMessage || 'Dispatch received! I will review your inquiry and reply promptly.'}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 px-6 rounded-full bg-[#D9363E] hover:bg-[#A91F2C] text-white font-bold mono text-xs flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_rgba(217,54,62,0.3)] cursor-pointer disabled:opacity-60"
                >
                  <Send size={14} />
                  <span>{status === 'sending' ? 'TRANSMITTING MESSAGE...' : 'SEND DIRECT TRANSMISSION'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
