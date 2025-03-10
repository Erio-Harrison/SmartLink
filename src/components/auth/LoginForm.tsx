'use client';

import React from 'react';

interface LoginFormProps {
  handleAuth: (e: React.FormEvent) => void;
}

export default function LoginForm({ handleAuth }: LoginFormProps) {
  return (
    <form onSubmit={handleAuth} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm text-text-primary-70">Email</label>
        <input
          type="email"
          className="w-full border bg-bg-tertiary rounded-lg px-4 py-3 text-text-primary-70"
          placeholder="your@email.com"
          defaultValue="u7541840@gmail.com"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="block text-sm text-text-primary-70">Password</label>
          <a href="#" className="text-sm text-accent-primary-80 hover:underline">
            Forgot Password?
          </a>
        </div>
        <input
          type="password"
          className="w-full border bg-bg-tertiary rounded-lg px-4 py-3 text-text-primary-70"
          placeholder="••••••••"
        />
      </div>
      {/* <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 border-white/10 bg-white/5 rounded accent-[#00E5FF]"
        />
        <label htmlFor="remember" className="ml-2 text-sm text-[#9E9E9E]">
          Remember Me
        </label>
      </div> */}
      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium transition transform hover:bg-gradient-to-r hover:from-accent-primary-80 hover:to-accent-secondary-80"
      >
        Log In
      </button>
    </form>
  );
}