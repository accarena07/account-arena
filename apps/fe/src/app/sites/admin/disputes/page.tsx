"use client";

import { useMemo, useState } from "react";
import AdminActionModal from "../components/AdminActionModal";
import AdminPageFooter from "../components/AdminPageFooter";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminStatusBadge from "../components/AdminStatusBadge";
import AdminTableCard from "../components/AdminTableCard";
import { disputeRows } from "../data/disputes";
import type { DisputeRow, DisputeStatus } from "../types";

export default function DisputesPage() {
  const [rows, setRows] = useState<DisputeRow[]>(disputeRows);
  const [modalType, setModalType] = useState<"log" | "action" | null>(null);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [nextStatus, setNextStatus] = useState<DisputeStatus>("under_review");
  const [actionNote, setActionNote] = useState("");

  const selectedDispute = useMemo(() => rows.find((item) => item.id === selectedDisputeId) ?? null, [rows, selectedDisputeId]);
  const openDisputes = rows.filter((item) => item.status === "open" || item.status === "under_review").length;
  const resolvedDisputes = rows.filter((item) => item.status === "resolved").length;

  function openLogModal(ticket: DisputeRow) {
    setSelectedDisputeId(ticket.id);
    setModalType("log");
  }

  function openActionModal(ticket: DisputeRow) {
    setSelectedDisputeId(ticket.id);
    setModalType("action");
    setNextStatus(ticket.status === "open" ? "under_review" : "resolved");
    setActionNote("");
  }

  function closeModal() {
    setModalType(null);
    setSelectedDisputeId(null);
    setActionNote("");
  }

  function applyDisputeAction() {
    if (!selectedDispute) return;
    setRows((prev) =>
      prev.map((item) =>
        item.id === selectedDispute.id
          ? {
              ...item,
              status: nextStatus,
              action: nextStatus === "resolved" ? "View Log" : item.action,
            }
          : item,
      ),
    );
    closeModal();
  }

  return (
    <>
      <AdminPageHeader
        description="Mediate and resolve conflicts between buyers and sellers"
        searchPlaceholder="Search tickets, orders..."
        title="Admin Dispute Resolution"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-2xl">
                report_problem
              </span>
            </div>
            <span className="bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest italic">
              ACTIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic leading-none mb-2">
              Open Disputes
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {openDisputes} Tickets
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl font-bold">
                done_all
              </span>
            </div>
            <div className="flex items-center space-x-1.5 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-500/20">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xs font-bold">
                trending_up
              </span>
              <span className="text-green-600 dark:text-green-400 text-[11px] font-black uppercase">
                +18.4%
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic leading-none mb-2">
              Resolved (This Month)
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {resolvedDisputes} Cases
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                schedule
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic leading-none mb-2">
              Average Resolution Time
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              4h 22m
            </h3>
          </div>
        </div>
      </div>

      <AdminTableCard
        actions={
          <button className="group flex w-full items-center justify-center space-x-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 md:w-auto" type="button">
            <span className="material-symbols-outlined text-lg text-slate-400 transition-colors group-hover:text-slate-600">
              filter_list
            </span>
            <span>Filter</span>
          </button>
        }
        description="Monitoring all active and historical dispute cases"
        title="Dispute Management"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Ticket ID
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Related Order
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Initiator
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Reason
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Created Date
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-center">
                  Priority
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Status
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group"
                >
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-[#21337e] dark:text-blue-400 tracking-tighter uppercase italic">
                      {ticket.id}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {ticket.order}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                      {ticket.desc}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border border-slate-200 dark:border-slate-700 ${ticket.initiatorColor || "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"}`}
                      >
                        {ticket.initiator}
                      </div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {ticket.initiatorType}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed max-w-50">
                      {ticket.reason}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-500 font-medium">
                    <span className="block">{ticket.date.split(",")[0]}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tabular-nums">
                      {ticket.date.split(",")[1]}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`text-[9px] font-black px-2.5 py-1 rounded-md tracking-widest border italic inline-block w-20 ${
                        ticket.priority === "HIGH"
                          ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                          : ticket.priority === "MEDIUM"
                            ? "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                            : "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <AdminStatusBadge pulse status={ticket.status} />
                  </td>
                  <td className="px-8 py-5 text-right">
                    {ticket.action === "View Log" ? (
                      <button
                        className="px-5 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        onClick={() => openLogModal(ticket)}
                        type="button"
                      >
                        View Log
                      </button>
                    ) : (
                      <button
                        className="px-5 py-2 bg-[#21337e] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                        onClick={() => openActionModal(ticket)}
                        type="button"
                      >
                        Take Action
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-50 bg-slate-50/30 px-8 py-6 dark:border-slate-800 dark:bg-slate-800/20 md:flex-row">
          <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic text-center md:text-left">
            Showing 1 to 4 of 24 open disputes
          </p>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-tighter disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all"
              disabled
              type="button"
            >
              Previous
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#21337e] text-white text-xs font-black uppercase shadow-lg shadow-blue-500/20" type="button">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase hover:bg-white dark:hover:bg-slate-800 transition-all" type="button">
              2
            </button>
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-tighter hover:bg-white dark:hover:bg-slate-800 transition-all" type="button">
              Next
            </button>
          </div>
        </div>
      </AdminTableCard>

      <AdminActionModal
        cancelLabel="Tutup"
        description="Riwayat aktivitas dispute untuk audit trail."
        onClose={closeModal}
        open={modalType === "log" && Boolean(selectedDispute)}
        title={`Dispute Log ${selectedDispute?.id ?? ""}`}
      >
        {selectedDispute ? (
          <div className="space-y-4 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="font-semibold text-slate-900 dark:text-white">Order: {selectedDispute.order}</p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{selectedDispute.reason}</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <p className="text-xs text-slate-400">Created</p>
                <p className="font-medium">Ticket dibuat oleh {selectedDispute.initiatorType} ({selectedDispute.initiator})</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <p className="text-xs text-slate-400">Latest Update</p>
                <p className="font-medium">
                  Status saat ini: <span className="capitalize">{selectedDispute.status.replace("_", " ")}</span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </AdminActionModal>

      <AdminActionModal
        confirmLabel="Submit Action"
        description={`Atur langkah tindak lanjut untuk ${selectedDispute?.id ?? "dispute"}.`}
        onClose={closeModal}
        onConfirm={applyDisputeAction}
        open={modalType === "action" && Boolean(selectedDispute)}
        title="Take Action"
        tone={nextStatus === "resolved" ? "default" : "danger"}
      >
        {selectedDispute ? (
          <div className="space-y-4 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="font-semibold text-slate-900 dark:text-white">{selectedDispute.id} • {selectedDispute.order}</p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{selectedDispute.reason}</p>
            </div>
            <label className="block font-semibold text-slate-600 dark:text-slate-300">
              Next Status
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                onChange={(event) => setNextStatus(event.target.value as DisputeStatus)}
                value={nextStatus}
              >
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </label>
            <label className="block font-semibold text-slate-600 dark:text-slate-300">
              Action Note
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                onChange={(event) => setActionNote(event.target.value)}
                placeholder="Catatan mediasi / keputusan admin..."
                rows={3}
                value={actionNote}
              />
            </label>
          </div>
        ) : null}
      </AdminActionModal>

      <AdminPageFooter thirdLinkLabel="Resolution Guidelines" />
    </>
  );
}
