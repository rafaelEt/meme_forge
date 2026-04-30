import { Coffee, Pizza, Heart, ArrowLeft } from 'lucide-react'
import Lumi from "@rafael_et/lumi-sdk";

const PACKAGES = [
  {
    id: import.meta.env.VITE_COFFEE_PKG_ID,
    name: 'Buy a Coffee',
    price: '200',
    description: 'Keep the caffeine flowing for a night of debugging.',
    icon: <Coffee className="text-amber-600" size={24} />,
    color: 'bg-amber-50',
  },
  {
    id: import.meta.env.VITE_LUNCH_PKG_ID,
    name: 'Buy Lunch',
    price: '500',
    description: 'Fuel a productive afternoon of shipping new features.',
    icon: <Pizza className="text-orange-600" size={24} />,
    color: 'bg-orange-50',
    popular: true,
  },
  {
    id: import.meta.env.VITE_APERICIATE_PKG_ID,
    name: 'Appreciate',
    price: '1000',
    description: 'The ultimate "thank you" for helping the project grow.',
    icon: <Heart className="text-rose-600" size={24} />,
    color: 'bg-rose-50',
  },
]

export default function SupportPage() {
  const lumi = new Lumi();

  const handlePayment = async (packageId) => {
    // 1. Trigger the UI flow
    const result = await lumi.pay({ packageId });

    if (result.status === "success") {
        // 2. Verify payment status with Lumi using the tx_ref
        const response = await fetch(`https://api.lumi.et/api/v1/payment/verify/${result.tx_ref}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SECRET_KEY}`
        },
        body: JSON.stringify({ tx_ref: result.tx_ref })
        });

        const verification = await response.json();
        
        if (verification.status === "success") {
        // 3. Grant access to your app features
            alert("thank you payment recieved");
        }
    }
  }

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans">
      <header className="h-14 border-b border-stone-100 bg-white flex items-center px-6">
        <a href="/" className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft size={16} />
          Back to Editor
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center mb-12">
          <h1 className="text-3xl font-semibold text-stone-900 mb-3">Support MemeForge</h1>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            MemeForge is free to use and open source. If it saved you time, 
            consider supporting its development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative flex flex-col bg-white border ${pkg.popular ? 'border-stone-900 shadow-md' : 'border-stone-200'} rounded-2xl p-8 transition-transform hover:-translate-y-1`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className={`w-12 h-12 ${pkg.color} rounded-xl flex items-center justify-center mb-6`}>
                {pkg.icon}
              </div>

              <h3 className="text-lg font-semibold text-stone-900 mb-2">{pkg.name}</h3>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-stone-900">{pkg.price}</span>
                <span className="text-sm font-medium text-stone-500 uppercase">Birr</span>
              </div>

              <p className="text-sm text-stone-400 leading-relaxed mb-8">
                {pkg.description}
              </p>

              <button onClick={() => handlePayment(pkg.id)} className={`mt-auto w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                pkg.popular 
                  ? 'bg-stone-900 text-white hover:bg-stone-800' 
                  : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-[11px] text-stone-400 max-w-xs text-center">
          Secure payments handled via Chapa or Telebirr. 
          No subscription, just a one-time thank you.
        </p>
      </main>
    </div>
  )
}