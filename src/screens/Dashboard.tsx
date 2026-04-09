import React, { useState } from "react";
import { MobileFrame } from "../ui/shell";
import { Button, Card, Badge, Divider } from "../ui/primitives";
import { Link } from "react-router";

// ── Veri ─────────────────────────────────────────────────────────────────────
const ILANLAR = [
  { id: "LD-1246", nereden: "Berlin",  nereye: "Hamburg",   alt: "Bugün 10:00–12:00",       durum: "teklif" as const },
  { id: "LD-1245", nereden: "Münih",   nereye: "Stuttgart", alt: "5 Şub · Soğutmalı Araç",  durum: "atandi" as const },
  { id: "LD-1244", nereden: "Leipzig", nereye: "Dresden",   alt: "Yolda · TTS 16:40",        durum: "yolda"  as const },
];

const TEKLIFLER = [
  { id: "t1", ilan: "Berlin → Hamburg",  surucu: "Alex M.", puan: 4.8, sefer: 192, ucret: "₺12.400", arac: "Tenteli TIR",  avatar: "AM", sure: "25 dk" },
  { id: "t2", ilan: "Berlin → Hamburg",  surucu: "Nina K.", puan: 4.9, sefer: 96,  ucret: "₺11.750", arac: "Kapalı Kasa", avatar: "NK", sure: "40 dk" },
  { id: "t3", ilan: "Leipzig → Dresden", surucu: "Sam R.",  puan: 4.6, sefer: 58,  ucret: "₺4.200",  arac: "Kamyonet",   avatar: "SR", sure: "55 dk" },
];

const BILDIRIMLER = [
  { ikon: "💬", metin: "Alex M. Berlin → Hamburg ilanınıza teklif gönderdi.", zaman: "2 dk",  okunmadi: true  },
  { ikon: "📦", metin: "#LD-1245 numaralı ilanınız yüklendi olarak işaretlendi.", zaman: "18 dk", okunmadi: true  },
  { ikon: "✉️", metin: "Sürücü Nina K. size yeni bir mesaj gönderdi.", zaman: "1 sa",  okunmadi: false },
];

const ISTATISTIKLER = [
  { deger: "42",    etiket: "Toplam İlan",   renk: "bg-blue-50 text-blue-600"    },
  { deger: "₺186K", etiket: "Toplam Taşıma", renk: "bg-emerald-50 text-emerald-700" },
  { deger: "4.9",   etiket: "Puanınız",      renk: "bg-amber-50 text-amber-600"  },
  { deger: "%98",   etiket: "Tamamlanma",    renk: "bg-purple-50 text-purple-600" },
];

const DURUM_CFG = {
  teklif: { label: "Teklif Bekleniyor", cls: "bg-blue-50 text-blue-600"        },
  atandi: { label: "Atandı",            cls: "bg-emerald-50 text-emerald-700"  },
  yolda:  { label: "Yolda",             cls: "bg-amber-50 text-amber-600"      },
};

// ── Bileşenler ────────────────────────────────────────────────────────────────
function DurumBadge({ durum }: { durum: keyof typeof DURUM_CFG }) {
  const d = DURUM_CFG[durum];
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${d.cls}`}>
      {d.label}
    </span>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle, badge, rightEl }: {
  icon: string; title: string; subtitle?: string;
  badge?: React.ReactNode; rightEl?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-3">
      <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-content text-base leading-none flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-neutral-800 leading-tight">{title}</p>
        {subtitle && <p className="text-[11px] text-neutral-400 mt-0.5">{subtitle}</p>}
      </div>
      {badge}
      {rightEl}
    </div>
  );
}

// ── Ana Ekran ─────────────────────────────────────────────────────────────────
export function Dashboard() {
  const saat = new Date().getHours();
  const selam = saat < 12 ? "Günaydın" : saat < 18 ? "İyi günler" : "İyi akşamlar";

  return (
    <MobileFrame title="Ana Sayfa">
      <div className="p-3 flex flex-col gap-3 bg-neutral-50 min-h-screen">

        {/* ── Hoşgeldin bandı ── */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div>
            <p className="text-xs text-neutral-400 font-medium">{selam} 👋</p>
            <p className="text-lg font-extrabold text-neutral-800 leading-tight">Furkan K.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white border border-neutral-200 rounded-xl flex items-center justify-center">
              <span className="text-base">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-bold">
              FK
            </div>
          </div>
        </div>

        {/* ── Hero — Yük İlanı Ver ── */}
        <Link to="/create-load">
          <div className="relative bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-2xl p-5 overflow-hidden flex items-center justify-between shadow-lg shadow-emerald-200">
            {/* Arka plan dekor */}
            <div className="absolute -top-6 -left-4 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 left-16 w-28 h-28 bg-white/5 rounded-full" />
            {/* Metin */}
            <div className="relative z-10">
              <p className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Hızlı İlan</p>
              <p className="text-xl font-extrabold text-white leading-tight">+ Yük İlanı Ver</p>
              <p className="text-[11px] text-emerald-100 mt-1">200+ onaylı sürücüye ulaş</p>
            </div>
            {/* TIR illüstrasyon */}
            <div className="relative z-10 opacity-90 text-5xl select-none">🚛</div>
          </div>
        </Link>

        {/* ── İstatistikler ── */}
        <SectionCard>
          <SectionHeader icon="📊" title="Genel Bakış" subtitle="Tüm zamanlar" />
          <div className="grid grid-cols-2 gap-2 px-3 pb-3">
            {ISTATISTIKLER.map((s, i) => (
              <div key={i} className={`rounded-xl p-3 flex items-center gap-3 ${s.renk.split(" ")[0]}`}>
                <div>
                  <p className={`text-lg font-extrabold leading-none ${s.renk.split(" ")[1]}`}>{s.deger}</p>
                  <p className="text-[10px] text-neutral-500 font-medium mt-1">{s.etiket}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Aktif İlanlar ── */}
        <SectionCard>
          <SectionHeader
            icon="🚚"
            title="Aktif İlanlar"
            subtitle="Açık ve devam eden ilanlar"
            badge={<span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">3 Aktif</span>}
          />
          <div className="border-t border-neutral-100">
            {ILANLAR.map((ilan, i) => (
              <div key={ilan.id}>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-[13px] font-bold text-neutral-800">{ilan.nereden} → {ilan.nereye}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{ilan.alt}</p>
                  </div>
                  <DurumBadge durum={ilan.durum} />
                </div>
                {i < ILANLAR.length - 1 && <div className="h-px bg-neutral-100 mx-4" />}
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-100 px-4 py-2.5">
            <Link to="/loads" className="flex items-center justify-center gap-1 text-[13px] font-bold text-emerald-600">
              Tüm ilanları gör <span>→</span>
            </Link>
          </div>
        </SectionCard>

        {/* ── Gelen Teklifler ── */}
        <SectionCard>
          <SectionHeader
            icon="👥"
            title="Gelen Teklifler"
            subtitle="İlanlarınıza gelen sürücü teklifleri"
            badge={<span className="text-[10px] font-bold text-white bg-blue-500 px-2.5 py-1 rounded-full">3 Yeni</span>}
          />
          <div className="border-t border-neutral-100 flex flex-col gap-2 p-3">
            {TEKLIFLER.map((teklif) => (
              <div key={teklif.id} className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                {/* Üst: avatar + isim + fiyat */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {teklif.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-800">{teklif.surucu}</p>
                    <p className="text-[11px] text-neutral-400">⭐ {teklif.puan} · {teklif.sefer} sefer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-emerald-600">{teklif.ucret}</p>
                    <p className="text-[10px] text-neutral-400">teklif fiyatı</p>
                  </div>
                </div>
                {/* Etiketler */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">{teklif.ilan}</span>
                  <span className="text-[10px] text-neutral-500 bg-white border border-neutral-200 px-2 py-1 rounded-lg">🚛 {teklif.arac}</span>
                  <span className="text-[10px] text-neutral-500 bg-white border border-neutral-200 px-2 py-1 rounded-lg">⏱ {teklif.sure} sonra</span>
                </div>
                {/* Aksiyon butonları */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-[11px] font-semibold text-neutral-600 bg-white border border-neutral-200 rounded-lg">Profili Gör</button>
                  <button className="flex-1 py-2 text-[11px] font-semibold text-emerald-600 bg-white border border-emerald-300 rounded-lg">Mesaj</button>
                  <button className="flex-[1.3] py-2 text-[11px] font-bold text-white bg-emerald-600 rounded-lg">Kabul Et</button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-3">
            <button className="w-full text-[12px] font-semibold text-neutral-500 text-center">Tüm teklifleri gör</button>
          </div>
        </SectionCard>

        {/* ── Bildirimler ── */}
        <SectionCard>
          <SectionHeader
            icon="🔔"
            title="Bildirimler"
            subtitle="Son güncellemeler"
            badge={<span className="text-[10px] font-bold text-white bg-red-500 px-2.5 py-1 rounded-full">2</span>}
            rightEl={<Link to="/notifications" className="text-[11px] font-semibold text-emerald-600 ml-2">Tümü →</Link>}
          />
          <div className="border-t border-neutral-100">
            {BILDIRIMLER.map((b, i) => (
              <div key={i}>
                <div className={`flex items-start gap-3 px-4 py-3 ${b.okunmadi ? "bg-emerald-50/40" : ""}`}>
                  <div className="mt-0.5">
                    {b.okunmadi && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1" />}
                  </div>
                  <span className="text-base leading-none flex-shrink-0">{b.ikon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] leading-snug ${b.okunmadi ? "font-semibold text-neutral-800" : "text-neutral-600"}`}>{b.metin}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">{b.zaman} önce</p>
                  </div>
                </div>
                {i < BILDIRIMLER.length - 1 && <div className="h-px bg-neutral-100 mx-4" />}
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="h-2" />
      </div>
    </MobileFrame>
  );
}
