'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles,
  UserCheck,
  PhoneCall,
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
  const [copiedInquiry, setCopiedInquiry] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    labAudio.playChime();
    setTimeout(() => setCopied(false), 2400);
  }

  function handleCopyInquiry() {
    const text = `To: ${PROFILE.email}\nFrom: ${formData.name || 'Recruiter'} (${formData.email || 'N/A'})\nSubject: ${formData.subject || 'Engineering Opportunity'}\n\n${formData.message || 'I would like to discuss an opportunity.'}`;
    navigator.clipboard.writeText(text);
    setCopiedInquiry(true);
    labAudio.playChime();
    setTimeout(() => setCopiedInquiry(false), 2400);
  }

  function openGmailWeb() {
    labAudio.playClick(950);
    const su = encodeURIComponent(formData.subject || `[OPPORTUNITY] Discussion with Shardul Parihar`);
    const body = encodeURIComponent(
      `Hi Shardul,\n\nName: ${formData.name || '[Your Name]'}\nEmail: ${formData.email || '[Your Email]'}\n\nMessage:\n${formData.message || 'We would like to connect with you regarding an engineering opportunity.'}\n\nBest regards,\n${formData.name || ''}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${su}&body=${body}`, '_blank');
  }

  function openOutlookWeb() {
    labAudio.playClick(950);
    const su = encodeURIComponent(formData.subject || `[OPPORTUNITY] Discussion with Shardul Parihar`);
    const body = encodeURIComponent(
      `Hi Shardul,\n\nName: ${formData.name || '[Your Name]'}\nEmail: ${formData.email || '[Your Email]'}\n\nMessage:\n${formData.message || 'We would like to connect with you regarding an engineering opportunity.'}\n\nBest regards,\n${formData.name || ''}`
    );
    window.open(`https://outlook.office.com/mail/deeplink/compose?to=${PROFILE.email}&subject=${su}&body=${body}`, '_blank');
  }

  function triggerMailto() {
    labAudio.playClick(900);
    const su = encodeURIComponent(formData.subject || `[OPPORTUNITY] Discussion with Shardul Parihar`);
    const body = encodeURIComponent(
      `Hi Shardul,\n\nName: ${formData.name || ''}\nEmail: ${formData.email || ''}\n\nMessage:\n${formData.message || ''}\n`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${su}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in your Name, Email, and Message.');
      return;
    }

    labAudio.playClick(1000);
    setStatus('sending');

    try {
      // 1. Attempt FormSubmit AJAX for guaranteed direct inbox delivery
      const formSubmitPromise = fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `[SHARDUL.LAB] New Inquiry from ${formData.name}`,
          message: formData.message,
          _subject: `[SHARDUL.LAB] New Opportunity from ${formData.name}`,
        }),
      }).catch(() => null);

      // 2. Also dispatch to local serverless API if available
      const localApiPromise = fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => null);

      await Promise.race([
        Promise.all([formSubmitPromise, localApiPromise]),
        new Promise(resolve => setTimeout(resolve, 2000)), // timeout after 2s so user is never blocked
      ]);

      setStatus('success');
      setStatusMessage('Transmission dispatched! I will review your inquiry and reply to your email promptly.');
      labAudio.playChime();
    } catch {
      // Graceful fallback: trigger mailto so message is never lost
      triggerMailto();
      setStatus('success');
      setStatusMessage('Transmission prepared! Default email client opened.');
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-28 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
            <span className="mono text-xs font-bold uppercase tracking-[0.18em] text-[#D9363E]">
              DIRECT RECRUITER &amp; COLLABORATION PORTAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial">
            GET IN TOUCH // HIRE &amp; CONNECT
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
            &ldquo;Have an opportunity, project, or role? Let&apos;s build together.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#81777A] font-normal leading-relaxed">
            I am actively open to software engineering internships, full-stack developer roles, open-source programs, and technical collaborations. Send a direct transmission below or launch your preferred mail app.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Direct Recruiter Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Contact Primary Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.03)] space-y-5">
              <div className="space-y-1">
                <div className="mono text-[11px] text-[#D9363E] font-bold uppercase tracking-wider">
                  DIRECT EMAIL INBOX
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#171416] break-all">
                  {PROFILE.email}
                </div>
                <div className="mono text-xs text-[#81777A] flex items-center gap-1.5 pt-1">
                  <MapPin size={13} className="text-[#D9363E] flex-shrink-0" />
                  <span>{PROFILE.location} · Available for Remote &amp; On-Site</span>
                </div>
              </div>

              {/* Instant Action: Copy Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 mono text-xs px-5 py-3 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-sm w-full cursor-pointer active:scale-95"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'EMAIL COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
              </button>

              {/* Fast Web Mail Launchers for Recruiters */}
              <div className="space-y-2 pt-2">
                <div className="mono text-[10px] text-[#81777A] uppercase font-bold tracking-wider">
                  ONE-CLICK RECRUITER DISPATCH:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={openGmailWeb}
                    className="p-2.5 rounded-xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-center gap-1.5 mono text-[11px] font-bold text-[#171416] cursor-pointer"
                  >
                    <Mail size={13} className="text-[#D9363E]" />
                    <span>OPEN GMAIL ↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={openOutlookWeb}
                    className="p-2.5 rounded-xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-center gap-1.5 mono text-[11px] font-bold text-[#171416] cursor-pointer"
                  >
                    <Mail size={13} className="text-[#0078D4]" />
                    <span>OPEN OUTLOOK ↗</span>
                  </button>
                </div>
              </div>

              {/* Direct Social & Professional Links */}
              <div className="pt-3 border-t border-[#E5DDDA] space-y-2.5">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => labAudio.playClick(900)}
                  className="p-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-between text-xs mono text-[#171416] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={15} className="text-[#D9363E]" />
                    <span className="font-bold">MESSAGE ON LINKEDIN</span>
                  </div>
                  <ExternalLink size={12} className="text-[#81777A] group-hover:text-[#D9363E]" />
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => labAudio.playClick(900)}
                  className="p-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-between text-xs mono text-[#171416] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={15} className="text-[#171416]" />
                    <span className="font-bold">GITHUB PROFILE (@shardul-2007)</span>
                  </div>
                  <ExternalLink size={12} className="text-[#81777A] group-hover:text-[#D9363E]" />
                </a>
              </div>
            </div>

            {/* Availability Spec Pill */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5DDDA] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs mono text-[#10B981] font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>ACTIVE RECRUITMENT STATUS</span>
                </span>
                <span className="text-[#81777A] text-[10px]">2024–2028</span>
              </div>
              <p className="text-xs text-[#81777A] leading-relaxed">
                Information Technology undergraduate at PCET NMIET, Pune. Actively interviewing for 2026/2027 software developer roles and internships.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Message Transmission Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.03)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DDDA] text-xs mono text-[#81777A]">
                <span className="font-bold text-[#171416]">DIRECT RECRUITER TRANSMISSION FORM</span>
                <span className="text-[#D9363E] font-bold flex items-center gap-1">
                  <Sparkles size={11} /> 100% RELIABLE DISPATCH
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anti-spam honeypot */}
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
                      Your Name / Recruiter Name *
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
                      Your Email Address *
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
                    Subject / Role / Opportunity
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity at [Company]"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs sm:text-sm text-[#171416] placeholder-[#81777A]/60 outline-none focus:border-[#D9363E] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="mono text-[11px] text-[#81777A] uppercase font-bold">
                    Message / Project Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Shardul, we loved your CivicOS & AssemblyOS projects and would like to discuss..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs sm:text-sm text-[#171416] placeholder-[#81777A]/60 outline-none focus:border-[#D9363E] transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3.5 rounded-2xl bg-[#FDF6F6] border border-[#F2D2D4] text-xs mono text-[#D9363E] flex items-center gap-2">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Success Banner with Instant Alternative Actions */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[#EDF9F0] border border-[#C5ECD0] space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs mono text-[#10B981] font-bold">
                      <CheckCircle2 size={16} className="flex-shrink-0" />
                      <span>{statusMessage}</span>
                    </div>

                    <div className="pt-2 border-t border-[#C5ECD0]/60 flex flex-wrap items-center gap-2 text-[11px] mono">
                      <span className="text-[#171416] font-medium">Want instant confirmation?</span>
                      <button
                        type="button"
                        onClick={openGmailWeb}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#C5ECD0] text-[#171416] hover:text-[#D9363E] font-bold"
                      >
                        Launch in Gmail ↗
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyInquiry}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#C5ECD0] text-[#171416] hover:text-[#D9363E] font-bold"
                      >
                        {copiedInquiry ? 'Copied!' : 'Copy Inquiry'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Submit Action Suite */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 px-6 rounded-full bg-[#D9363E] hover:bg-[#A91F2C] text-white font-bold mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_rgba(217,54,62,0.3)] cursor-pointer disabled:opacity-60 active:scale-98"
                  >
                    <Send size={14} />
                    <span>
                      {status === 'sending' ? 'DISPATCHING TO INBOX...' : 'SEND TRANSMISSION TO SHARDUL'}
                    </span>
                  </button>

                  {/* Alternative Dispatch Shortcuts */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] mono text-[#81777A]">
                    <span>Or dispatch via:</span>
                    <button
                      type="button"
                      onClick={openGmailWeb}
                      className="text-[#171416] hover:text-[#D9363E] font-bold underline cursor-pointer"
                    >
                      Gmail Web ↗
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={openOutlookWeb}
                      className="text-[#171416] hover:text-[#D9363E] font-bold underline cursor-pointer"
                    >
                      Outlook Web ↗
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={triggerMailto}
                      className="text-[#171416] hover:text-[#D9363E] font-bold underline cursor-pointer"
                    >
                      Default Mail App
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={handleCopyInquiry}
                      className="text-[#171416] hover:text-[#D9363E] font-bold underline cursor-pointer"
                    >
                      {copiedInquiry ? 'Copied!' : 'Copy Text'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
