'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaStaylinked } from "react-icons/fa";
import { Lock } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // After authentication, navigate to the chat page
    router.push('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary pt-6">
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-5">
          <div className="relative inline-block">
            <svg width="50" height="62" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="38%" y1="0%" x2="88%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-primary)" />
                  <stop offset="100%" stopColor="var(--accent-secondary)" />
                </linearGradient>
              </defs>
              <path d="M22.4393 11.4393C23.0251 12.0251 23.0251 12.9749 22.4393 13.5607L21.5607 14.4393C20.9749 15.0251 20.0251 15.0251 19.4393 14.4393L12.0607 7.06066C11.4749 6.47487 10.5251 6.47487 9.93934 7.06066L7.06066 9.93934C6.47487 10.5251 6.47487 11.4749 7.06066 12.0607L10.1789 15.1789C10.3883 15.3883 10.655 15.531 10.9453 15.5891L12.5547 15.9109C12.845 15.969 13.1117 16.1117 13.3211 16.3211L15.9393 18.9393C16.5251 19.5251 16.5251 20.4749 15.9393 21.0607L14.0607 22.9393C13.4749 23.5251 12.5251 23.5251 11.9393 22.9393L1.06066 12.0607C0.474874 11.4749 0.474874 10.5251 1.06066 9.93934L9.93934 1.06066C10.5251 0.474875 11.4749 0.474874 12.0607 1.06066L22.4393 11.4393Z" fill="url(#gradient)"/>
              <path d="M1.56066 19.5607C0.974874 18.9749 0.974874 18.0251 1.56066 17.4393L2.43934 16.5607C3.02513 15.9749 3.97487 15.9749 4.56066 16.5607L11.9393 23.9393C12.5251 24.5251 13.4749 24.5251 14.0607 23.9393L16.9393 21.0607C17.5251 20.4749 17.5251 19.5251 16.9393 18.9393L13.8211 15.8211C13.6117 15.6117 13.345 15.469 13.0547 15.4109L11.4453 15.0891C11.155 15.031 10.8883 14.8883 10.6789 14.6789L8.06066 12.0607C7.47487 11.4749 7.47487 10.5251 8.06066 9.93934L9.93934 8.06066C10.5251 7.47487 11.4749 7.47487 12.0607 8.06066L22.9393 18.9393C23.5251 19.5251 23.5251 20.4749 22.9393 21.0607L14.0607 29.9393C13.4749 30.5251 12.5251 30.5251 11.9393 29.9393L1.56066 19.5607Z" fill="url(#gradient)"/>
            </svg>
          </div>
          <h1 className="mt-1 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
            SmartLink
          </h1>
          <p className="mt-3 text-text-primary-30">Seamlessly connect with both people and AI, enhancing your conversations like never before</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-bg-primary backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-center text-text-primary-70 mb-4">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            {isLogin ? (
              <LoginForm handleAuth={handleAuth} />
            ) : (
              <SignupForm handleAuth={handleAuth} />
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-[1.5px] border-text-primary-10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-bg-primary text-text-primary-70 text-sm">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-2.5 px-4 border border-text-primary-5 bg-bg-tertiary-80 rounded-lg flex items-center justify-center gap-2"
              >
                <FcGoogle />
                <span className='text-text-primary'>Google</span>
              </button>
              <button
                type="button"
                className="py-2.5 px-4 border border-text-primary-5 bg-bg-tertiary-80 rounded-lg flex items-center justify-center gap-2"
              >
                <FaGithub />
                <span>GitHub</span>
              </button>
            </div>

            <p className="text-center mt-6 text-text-primary-30 text-sm">
              {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-text-primary-70 hover:text-accent-primary"
              >
                {isLogin ? 'Sign Up Now' : 'Log In Now'}
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-3 text-center">
          <div className="p-2 inline-flex items-center gap-2 text-sm text-accent-primary">
            <Lock size={12}/>
            <span className='text-text-primary-30'>End-to-end encryption, worry-free security</span>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      {/* <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-[#00E5FF] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-[#7B68EE] opacity-5 blur-3xl"></div>
      </div> */}
    </div>
  );
}