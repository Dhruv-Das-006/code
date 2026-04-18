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
      color: "from-indigo-600 to-purple-600"
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
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
          Choose Your <span className="text-indigo-600">Plan</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg mb-12">
          Unlock the full potential of D-Code with our flexible pricing options.
        </p>

        {/* Custom Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm font-bold ${!isYearly ? 'text-indigo-600' : 'text-zinc-500'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 p-1 transition-colors relative"
          >
            <div className={`w-6 h-6 rounded-full bg-indigo-600 transition-all duration-300 transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isYearly ? 'text-indigo-600' : 'text-zinc-500'}`}>Yearly</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase">
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
            className={`group relative p-8 rounded-[40px] border transition-all duration-500 hover:translate-y-[-8px] ${
              plan.popular 
                ? 'bg-zinc-900 border-zinc-800 shadow-2xl shadow-indigo-500/20' 
                : 'bg-white dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h2 className={`text-2xl font-black mb-4 ${plan.popular ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-zinc-500 text-sm">/mo</span>
              </div>
              {isYearly && plan.monthlyPrice > 0 && (
                <p className="text-emerald-500 text-xs font-bold mt-2">Billed annually</p>
              )}
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <div className={`p-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400`}>
                    <FiCheck className="w-3 h-3" />
                  </div>
                  <span className={plan.popular ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => toast.success("Secure checkout opening...", { icon: '🔒' })}
              className={`w-full py-4 rounded-full font-black text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg ${
                plan.popular 
                  ? 'bg-white text-zinc-900 shadow-white/10 hover:bg-zinc-100' 
                  : 'bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700'
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 pt-20">
        <h2 className="text-4xl font-black text-center text-zinc-900 dark:text-white mb-12">
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="font-bold text-zinc-900 dark:text-white">{faq.q}</span>
                <FiChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
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
