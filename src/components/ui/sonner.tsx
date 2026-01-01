"use client"

import {
  CheckCircle2,
  Info,
  Loader2,
  AlertOctagon,
  AlertTriangle,
  X,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast bg-[#0A0F15]/90 backdrop-blur-2xl border border-white/10 text-white rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 flex gap-3.5 items-center",
          description: "text-slate-400 text-[12px] font-medium leading-relaxed",
          title: "text-[14px] font-bold tracking-tight text-white",
          actionButton: "bg-[#6FE7C1] text-[#0A0F15] font-black text-[11px] uppercase tracking-wider rounded-xl px-4 py-2 hover:bg-[#5ad4af] transition-all active:scale-95",
          cancelButton: "bg-white/5 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl px-4 py-2 hover:bg-white/10 transition-all active:scale-95",
          closeButton: "opacity-0 group-hover:opacity-100 bg-[#0A0F15] hover:bg-white/5 text-white border-white/10 transition-all",
          success: "border-[#11D392]/20",
          error: "border-red-500/20",
          warning: "border-amber-500/20",
          info: "border-blue-500/20",
        },
      }}
      icons={{
        success: <CheckCircle2 className="size-5 text-[#11D392]" />,
        info: <Info className="size-5 text-blue-400" />,
        warning: <AlertTriangle className="size-5 text-amber-500" />,
        error: <AlertOctagon className="size-5 text-red-500" />,
        loading: <Loader2 className="size-5 text-[#6FE7C1] animate-spin" />,
      }}
      closeButton
      {...props}
    />
  )
}

export { Toaster }
