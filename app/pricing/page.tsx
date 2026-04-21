"use client";

import React, { useState } from 'react';
import { FiCheck, FiChevronDown, FiPlus, FiMinus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: ["3 Projects", "Public Shares", "Community Support", "Standard Editor", "1GB Storage"],
      button: "Start for Free",
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Pro",
      monthlyPrice: 19,
      yearlyPrice: 15,
      features: ["Unlimited Projects", "Private Shares", "Priority Support", "Advanced Editor", "10GB Storage", "Cloud Sync"],
      button: "Get Started",
      popular: true,
      color: "from-red-600 to-rose-600"
    },
    {
      name: "Team",
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: ["Everything in Pro", "Collaboration Tools", "Team Management", "Custom Domains", "Enterprise Support"],
      button: "Contact Us",
      popular: false,
      color: "from-purple-600 to-pink-600"
    }
  ];

  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel your subscription at any time from your settings. You will have access to your pro features until the end of your billing cycle."
    },
    {
      q: "What is the 'Standard Editor' vs 'Advanced Editor'?",
      a: "The Advanced Editor includes features like AI-powered code completion, advanced debugging tools, and deeper theme customization options."
    },
    {
      q: "Do you offer discounts for students?",
      a: "Absolutely! Students can get the Pro plan for free for one year. Just verify your student status with your .edu email."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 animate-in fade-in duration-700">
      
      {/* Header & Toggle */}
      <div className="text-center mb-24">
        <h1 className="text-6xl md:text-[8rem] font-black text-slate-950 dark:text-white mb-8 tracking-tighter leading-[0.9]">
          Choose Your <span className="text-red-600">Plan</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xl font-semibold tracking-tight mb-16">
          Unlock the full potential of D-Code with our flexible, <br className="hidden md:block" /> precision-engineered pricing options.
        </p>

        {/* Custom Toggle */}
        <div className="flex items-center justify-center gap-6 mb-12 scale-110">
          <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${!isYearly ? 'text-red-600' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-9 rounded-full bg-slate-200 dark:bg-slate-800 p-1.5 transition-all duration-500 relative shadow-inner"
          >
            <div className={`w-6 h-6 rounded-full bg-red-600 shadow-lg shadow-red-600/40 transition-all duration-500 transform ${isYearly ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${isYearly ? 'text-red-600' : 'text-slate-400'}`}>Yearly</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-500/20">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`group relative p-10 rounded-[3rem] border transition-all duration-700 hover:translate-y-[-12px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl ${
              plan.popular 
                ? 'border-red-500/50 shadow-2xl shadow-red-600/10 dark:shadow-red-500/5 ring-2 ring-red-500/20' 
                : 'border-slate-200/50 dark:border-slate-800/50 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-linear-to-r from-red-600 to-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ring-4 ring-white dark:ring-slate-950">
                Most Popular
              </div>
            )}

            <div className="mb-10">
              <h2 className={`text-3xl font-black mb-6 tracking-tighter ${plan.popular ? 'text-red-600 dark:text-red-400' : 'text-slate-950 dark:text-white'}`}>
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1">
                <span className={`text-6xl font-black tracking-tighter ${plan.popular ? 'text-slate-950 dark:text-white' : 'text-slate-950 dark:text-white'}`}>
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">/mo</span>
              </div>
              {isYearly && plan.monthlyPrice > 0 && (
                <p className="text-emerald-500 text-xs font-black mt-3 uppercase tracking-widest">Billed annually</p>
              )}
            </div>

            <ul className="space-y-5 mb-12">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-4 text-sm font-semibold tracking-tight">
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <FiCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 dark:text-slate-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => toast.success("Secure checkout opening...", { icon: '🔒' })}
              className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl ${
                plan.popular 
                  ? 'bg-red-600 text-white shadow-red-600/30 hover:bg-red-700' 
                  : 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto border-t border-slate-200/50 dark:border-slate-800/50 pt-24 mb-20">
        <h2 className="text-5xl md:text-6xl font-black text-center text-slate-950 dark:text-white mb-16 tracking-tighter leading-[1.1]">
          Frequently Asked <br /> <span className="text-red-600">Questions</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-red-500/30"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-slate-950 dark:text-white tracking-tight">{faq.q}</span>
                <FiChevronDown className={`w-6 h-6 transition-transform duration-500 ${openFaq === idx ? 'rotate-180' : ''} text-red-500`} />
              </button>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-60 p-8 pt-0' : 'max-h-0'}`}>
                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-semibold tracking-tight">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
