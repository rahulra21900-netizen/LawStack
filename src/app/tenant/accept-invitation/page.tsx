"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { MailOpen, ShieldCheck, Building2, ArrowRight } from "lucide-react";

export default function AcceptInvitationPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    addToast("Invitation Accepted", "You've joined Chandra & Associates as Associate.", "success");
    setTimeout(() => router.push("/workspace/dashboard"), 1200);
  };

  return (
    <AuthShell
      badge="Firm Invitation"
      accent="emerald"
      title="You've been invited to join a firm"
      subtitle="Review the invitation details below and accept to join the firm's practice workspace."
      footer={
        <Link href="/tenant/login" className="text-emerald-400 hover:underline font-semibold">
          Back to Login
        </Link>
      }
      sidePanel={{
        heading: "What accepting does",
        points: [
          "Creates a scoped user record inside the firm's tenant namespace",
          "Assigns you the role specified by the inviting partner",
          "Grants access to matters, documents, and billing per your role",
          "You can leave the workspace at any time from your profile settings",
        ],
      }}
    >
      {accepted ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-white">Invitation accepted</p>
            <p className="text-[11px] text-slate-400 mt-1">Redirecting to your firm workspace...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Chandra & Associates</div>
                <div className="text-[10px] text-slate-500">oakwood.lawstack.com</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <div className="text-slate-500">Invited by</div>
                <div className="text-white font-semibold">Meera Verma</div>
              </div>
              <div>
                <div className="text-slate-500">Role</div>
                <div className="text-white font-semibold">Associate</div>
              </div>
              <div>
                <div className="text-slate-500">Seat type</div>
                <div className="text-white font-semibold">Attorney</div>
              </div>
              <div>
                <div className="text-slate-500">Expires</div>
                <div className="text-white font-semibold">in 5 days</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
            <MailOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <p className="text-[10px] text-slate-400">
              This invitation was sent to your registered email. Verify the sender before accepting.
            </p>
          </div>

          <Button onClick={handleAccept} variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-500" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Accept invitation
          </Button>
        </div>
      )}
    </AuthShell>
  );
}
