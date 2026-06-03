import { useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="w-full max-w-[430px]">

        {/* CARD */}
        <div className="bg-white border border-black/5 rounded-[32px] shadow-[0_10px_60px_rgba(0,0,0,0.06)] p-8 md:p-10">

          {/* SUCCESS ICON */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />

              <div className="relative w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-3">
              Payment Successful
            </h1>

            <p className="text-[15px] leading-7 text-gray-500 max-w-[320px] mx-auto">
              Thanks for supporting{" "}
              <span className="font-semibold text-gray-900">
                MemeForge
              </span>
              . Your contribution helps keep the project alive and growing.
            </p>
          </div>

          {/* RECEIPT */}
          <div className="mt-8 rounded-2xl border border-black/5 bg-[#fafafa] overflow-hidden">

            <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Transaction
              </span>

              <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Confirmed
              </span>
            </div>

            <div className="p-5 space-y-4">

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Status
                </span>

                <span className="text-sm font-medium text-gray-900">
                  Success
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Application
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  MemeForge
                </span>
              </div>

            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate('/')}
            className="
              mt-8
              w-full
              h-14
              rounded-2xl
              bg-black
              text-white
              text-sm
              font-semibold
              transition-all
              hover:scale-[1.01]
              active:scale-[0.99]
              hover:bg-black/90
            "
          >
            Back to App
          </button>

        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Powered securely through Lumi
        </p>

      </div>
    </div>
  );
}