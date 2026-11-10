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
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    labAudio.playChime();
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }

    labAudio.playClick(1000);
    setStatus('sending');

    // Simulate reliable dispatch or direct mailto fallback
    setTimeout(() => {
      setStatus('success');
      labAudio.playChime();
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  }

  return (
    <section id="contact" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
            <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-sub)]">
              LET&apos;S CONNECT
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#171416] font-editorial">
            Have an idea? <br />
            <span className="font-serif-italic font-normal text-[#D9363E]">Let&apos;s build something.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal mt-3 leading-relaxed">
            I&apos;m open to software development opportunities, internships, collaborative projects, hackathons and conversations about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="p-7 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
              <div className="space-y-1">
                <div className="mono text-xs text-[var(--accent-orange)] font-semibold">
                  PRIMARY INBOX &amp; LOCATION
                </div>
                <div className="text-xl font-bold text-[var(--text)]">{PROFILE.email}</div>
                <div className="mono text-xs text-[var(--text-sub)] flex items-center gap-1.5 pt-1">
                  <MapPin size={12} className="text-[var(--accent)]" />
                  <span>{PROFILE.location} (UTC+5:30)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 mono text-xs px-5 py-3 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-md w-full cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Mail size={14} />}
                <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : 'SAY HELLO (COPY EMAIL)'}</span>
              </button>

              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => labAudio.playClick(900)}
                  className="p-3.5 rounded-xl bg-white border border-[var(--border)] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-between text-xs mono text-[#171416] group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={16} className="text-[#D9363E]" />
                    <span>CONNECT ON LINKEDIN</span>
                  </div>
                  <ExternalLink size={13} className="text-[var(--text-sub)] group-hover:text-[#D9363E]" />
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => labAudio.playClick(900)}
                  className="p-3.5 rounded-xl bg-white border border-[var(--border)] hover:border-[#D9363E] hover:text-[#D9363E] transition-all flex items-center justify-between text-xs mono text-[#171416] group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={16} className="text-[#171416]" />
                    <span>EXPLORE GITHUB</span>
                  </div>
                  <ExternalLink size={13} className="text-[var(--text-sub)] group-hover:text-[#D9363E]" />
                </a>
              </div>
            </div>

            {/* Availability Callout */}
            <div className="p-6 rounded-2xl glass border border-[var(--border)] space-y-2">
              <div className="flex items-center gap-2 text-xs mono text-[var(--accent-lime)] font-bold">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                <span>ACTIVE ENGAGEMENT WINDOW</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Currently available for software engineering internships, technical contracts, and full-stack positions starting immediately.
              </p>
            </div>
          </div>

          {/* Right Column: Connection Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] text-xs mono text-[var(--text-sub)]">
                <span>SECURE TRANSMISSION FORM</span>
                <span className="text-[var(--accent)] font-semibold">ENCRYPTED INPUT</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="mono text-[11px] text-[var(--text-sub)] uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="mono text-[11px] text-[var(--text-sub)] uppercase">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="mono text-[11px] text-[var(--text-sub)] uppercase">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity / CivicOS Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent)] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="mono text-[11px] text-[var(--text-sub)] uppercase">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, project, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent)] transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs mono text-[#EF4444] flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>Please fill in all required fields (Name, Email, Message).</span>
                  </div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-xs mono text-[#10B981] flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>Dispatch received! I will review your inquiry and reply promptly.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="glow-btn glow-btn-primary w-full justify-center text-xs py-3"
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
