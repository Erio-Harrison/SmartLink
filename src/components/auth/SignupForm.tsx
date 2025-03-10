'use client';

import React from 'react';

interface SignupFormProps {
  handleAuth: (e: React.FormEvent) => void;
}

export default function SignupForm({ handleAuth }: SignupFormProps) {
  return (
    <form onSubmit={handleAuth} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm text-text-primary-70">Username</label>
        <input
          type="text"
          className="w-full border bg-bg-tertiary rounded-lg px-4 py-2 text-text-primary-70"
          placeholder="Your username"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-text-primary-70">Email</label>
        <input
          type="email"
          className="w-full border bg-bg-tertiary rounded-lg px-4 py-2 text-text-primary-70"
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-text-primary-70">Password</label>
        <input
          type="password"
          className="w-full border bg-bg-tertiary rounded-lg px-4 py-2 text-text-primary-70"
          placeholder="••••••••"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-text-primary-70">Confirm Password</label>
        <input
          type="password"
          className="w-full border bg-bg-tertiary rounded-lg px-4 py-2 text-text-primary-70"
          placeholder="••••••••"
        />
      </div>
      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 border-text-primary-30 bg-bg-tertiary rounded"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-text-primary-30">
          I agree to the Terms of Service and Privacy Policy
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium transition transform hover:bg-gradient-to-r hover:from-accent-primary-80 hover:to-accent-secondary-80"
      >
        Sign Up
      </button>
    </form>
  );
}