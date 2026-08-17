import React, { useState } from 'react';
import { X, ArrowRight, Loader2, Sprout } from 'lucide-react';
import { authApi } from '../services/authApi';

interface RegistrationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    language: 'en',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      setLoading(true);

      await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        language: form.language,
      });

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#102C20] border border-[#E7C77C]/30 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full text-[#F3F0E5]/60 hover:text-[#E7C77C] transition-colors"
          aria-label="Close registration"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-7">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-[#E7C77C]/10 border border-[#E7C77C]/30">
              <Sprout className="w-6 h-6 text-[#E7C77C]" />
            </div>
          </div>

          <h2 className="font-serif text-3xl text-[#F3F0E5]">
            Start Your Journey
          </h2>

          <p className="mt-2 text-sm text-[#F3F0E5]/60">
            Create your Farmer's Paradise account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#E7C77C] mb-1.5">
              Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl bg-[#F3F0E5]/5 border border-[#F3F0E5]/15 px-4 py-3 text-[#F3F0E5] placeholder:text-[#F3F0E5]/30 outline-none focus:border-[#E7C77C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#E7C77C] mb-1.5">
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-[#F3F0E5]/5 border border-[#F3F0E5]/15 px-4 py-3 text-[#F3F0E5] placeholder:text-[#F3F0E5]/30 outline-none focus:border-[#E7C77C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#E7C77C] mb-1.5">
              Password *
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="w-full rounded-xl bg-[#F3F0E5]/5 border border-[#F3F0E5]/15 px-4 py-3 text-[#F3F0E5] placeholder:text-[#F3F0E5]/30 outline-none focus:border-[#E7C77C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#E7C77C] mb-1.5">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full rounded-xl bg-[#F3F0E5]/5 border border-[#F3F0E5]/15 px-4 py-3 text-[#F3F0E5] placeholder:text-[#F3F0E5]/30 outline-none focus:border-[#E7C77C] transition-colors"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-6 py-4 rounded-full bg-[#E7C77C] text-[#102C20] font-bold text-sm uppercase tracking-wider hover:bg-[#F4D48B] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;