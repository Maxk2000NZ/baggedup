import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from './supabase';
import Chart from 'chart.js/auto';

const LOGO_URL = '/baggedup.logo.png';

const FACTORY_DB = [
    {Manufacturer:"Innova",Model:"Destroyer",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Innova",Model:"Wraith",Speed:11,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discraft",Model:"Zeus",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discraft",Model:"Nuke",Speed:13,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"MVP",Model:"Wave",Speed:11,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Discmania",Model:"DD3",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Grace",Speed:11,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Axiom",Model:"Time-Lapse",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Innova",Model:"Shryke",Speed:13,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Infinite Discs",Model:"Emperor",Speed:12,Glide:5,Turn:-1,Fade:2.5},
    {Manufacturer:"Innova",Model:"Mamba",Speed:11,Glide:6,Turn:-5,Fade:1},
    {Manufacturer:"Discraft",Model:"Hades",Speed:12,Glide:6,Turn:-3,Fade:2},
    {Manufacturer:"Innova",Model:"Tern",Speed:12,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Rive",Speed:13,Glide:5,Turn:0,Fade:3.5},
    {Manufacturer:"Discmania",Model:"DD1",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discraft",Model:"Scorch",Speed:11,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"MVP",Model:"Photon",Speed:11,Glide:5,Turn:-1.5,Fade:2.5},
    {Manufacturer:"Innova",Model:"Boss",Speed:13,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Westside",Model:"Sword",Speed:12,Glide:5,Turn:-0.5,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Guld",Speed:13,Glide:5,Turn:-0.5,Fade:3},
    {Manufacturer:"Innova",Model:"Firebird",Speed:9,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"TeeBird",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Axiom",Model:"Crave",Speed:6.5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Latitude 64",Model:"River",Speed:7,Glide:7,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"Leopard3",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discraft",Model:"Athena",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"FD",Speed:7,Glide:6,Turn:0,Fade:1},
    {Manufacturer:"Discraft",Model:"Undertaker",Speed:9,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"Thunderbird",Speed:9,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"PD",Speed:10,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Felon",Speed:9,Glide:3,Turn:0.5,Fade:4},
    {Manufacturer:"MVP",Model:"Volt",Speed:8,Glide:5,Turn:-0.5,Fade:2},
    {Manufacturer:"Innova",Model:"Valkyrie",Speed:9,Glide:4,Turn:-2,Fade:2},
    {Manufacturer:"Axiom",Model:"Insanity",Speed:9,Glide:5,Turn:-2,Fade:1.5},
    {Manufacturer:"Discmania",Model:"Essence",Speed:8,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Innova",Model:"Roadrunner",Speed:9,Glide:5,Turn:-4,Fade:1},
    {Manufacturer:"Innova",Model:"Eagle",Speed:7,Glide:4,Turn:-1,Fade:3},
    {Manufacturer:"Discraft",Model:"Buzzz",Speed:5,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Axiom",Model:"Hex",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"Mako3",Speed:5,Glide:5,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Roc3",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"MVP",Model:"Reactor",Speed:5,Glide:5,Turn:-0.5,Fade:1.5},
    {Manufacturer:"Latitude 64",Model:"Fuse",Speed:5,Glide:6,Turn:-1,Fade:0},
    {Manufacturer:"Innova",Model:"Rollo",Speed:5,Glide:6,Turn:-4,Fade:1},
    {Manufacturer:"MVP",Model:"Uplink",Speed:5,Glide:5,Turn:-3,Fade:0.5},
    {Manufacturer:"Kastaplast",Model:"Svea",Speed:5,Glide:6,Turn:-1,Fade:0},
    {Manufacturer:"Axiom",Model:"Paradox",Speed:5,Glide:4,Turn:-4,Fade:0},
    {Manufacturer:"Dynamic Discs",Model:"EMac Truth",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"Meteor",Speed:5,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"Discmania",Model:"Origin",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Axiom",Model:"Pyro",Speed:5,Glide:4,Turn:0,Fade:2.5},
    {Manufacturer:"Discraft",Model:"Zone",Speed:4,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Axiom",Model:"Pixel",Speed:2,Glide:4,Turn:0,Fade:0.5},
    {Manufacturer:"MVP",Model:"Glitch",Speed:1,Glide:7,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Aviar",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Axiom",Model:"Envy",Speed:3,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Gateway",Model:"Wizard",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"Luna",Speed:3,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Kastaplast",Model:"Berg",Speed:1,Glide:1,Turn:0,Fade:2},
    {Manufacturer:"Axiom",Model:"Proxy",Speed:3,Glide:3,Turn:-1,Fade:0.5},
    {Manufacturer:"Discmania",Model:"P2",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Pure",Speed:3,Glide:3,Turn:-0.5,Fade:0.5},
    {Manufacturer:"MVP",Model:"Watt",Speed:2,Glide:5,Turn:-0.5,Fade:0.5},
    {Manufacturer:"Prodigy",Model:"Pa-3",Speed:3,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Westside",Model:"Harp",Speed:4,Glide:3,Turn:0,Fade:3}
];

export default function App() {
    const [session, setSession] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [authMessage, setAuthMessage] = useState('');
    const [settings, setSettings] = useState({ unit: 'ft', maxPower: 350, country: 'New Zealand' });
    const [activeBagId, setActiveBagId] = useState('');
    const [bags, setBags] = useState([]);
    const [discs, setDiscs] = useState([]);
    const [view, setView] = useState('active');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chartMode, setChartMode] = useState('path');
    const [editing, setEditing] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [dbQuery, setDbQuery] = useState('');
    const [suggestionPool, setSuggestionPool] = useState(null);
    const [communitySuggestions, setCommunitySuggestions] = useState([]);
    const [showCommunityAdd, setShowCommunityAdd] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [showPlayRound, setShowPlayRound] = useState(false);
    const [roundChecked, setRoundChecked] = useState({});
    const [lostComment, setLostComment] = useState({});
    const [roundBagId, setRoundBagId] = useState('');
    const [communityFormData, setCommunityFormData] = useState({name: '', brand: '', speed: 5, glide: 5, turn: 0, fade: 2.5});

    // Wear slider — local state for smooth dragging, synced to DB on release
    const [localWear, setLocalWear] = useState({});
    const wearDebounce = useRef({});

    // Mobile: one toggled chart
    const chartRef = useRef(null);
    // Desktop: two always-visible charts
    const desktopPathRef = useRef(null);
    const desktopStabRef = useRef(null);

    // Set favicon + load export libraries
    useEffect(() => {
        // Cache-bust favicon
        document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
        const link = document.createElement('link');
        link.type = 'image/png'; link.rel = 'icon';
        link.href = '/BaggedUp.Favicon.png?v=' + Date.now();
        document.head.appendChild(link);

        // Preload jsPDF
        if (!window.jspdf) {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            document.head.appendChild(s);
        }
        // Preload html2canvas
        if (!window.html2canvas) {
            const s2 = document.createElement('script');
            s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            document.head.appendChild(s2);
        }
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e, type) => {
        e.preventDefault();
        setAuthLoading(true);
        if (type === 'signup') {
            const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
            if (error) alert(error.message);
            else setAuthMessage('Check your email inbox!');
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
            if (error) alert(error.message);
        }
        setAuthLoading(false);
    };

    useEffect(() => {
        if (!session?.user) return;
        const loadData = async () => {
            let { data: set } = await supabase.from('settings').select('*').eq('user_id', session.user.id).single();
            if (set) setSettings({ unit: set.unit, maxPower: set.max_power, country: set.country });
            else await supabase.from('settings').insert({ user_id: session.user.id });

            const { data: b } = await supabase.from('bags').select('*');
            if (b?.length) { setBags(b); setActiveBagId(b[0].id); }
            else {
                const { data: nb } = await supabase.from('bags').insert({ user_id: session.user.id, name: 'Main Bag' }).select().single();
                setBags([nb]); setActiveBagId(nb.id);
            }
            const { data: d } = await supabase.from('discs').select('*');
            if (d) setDiscs(d);

            const { data: cs, error: csError } = await supabase.from('community_suggestions').select('*');
            if (csError) console.error('Failed to load community suggestions:', csError);
            else if (cs) setCommunitySuggestions(cs);
        };
        loadData();
    }, [session]);

    const saveSettings = async (newS) => {
        setSettings(newS);
        await supabase.from('settings').update({ unit: newS.unit, max_power: newS.maxPower, country: newS.country }).eq('user_id', session.user.id);
    };

    const createBag = async (name) => {
        const { data } = await supabase.from('bags').insert({ user_id: session.user.id, name }).select().single();
        if (data) { setBags([...bags, data]); setActiveBagId(data.id); setView('active'); }
    };

    const updateBagName = async (id, name) => {
        setBags(bags.map(b => b.id === id ? { ...b, name } : b));
        await supabase.from('bags').update({ name }).eq('id', id);
    };

    const deleteBag = async (id) => {
        if (confirm('Delete this bag? All discs will move to storage.')) {
            await supabase.from('discs').update({ bag_id: null }).eq('bag_id', id);
            await supabase.from('bags').delete().eq('id', id);
            const updatedBags = bags.filter(b => b.id !== id);
            setBags(updatedBags);
            if (activeBagId === id && updatedBags.length > 0) setActiveBagId(updatedBags[0].id);
            else if (updatedBags.length === 0) {
                const { data: nb } = await supabase.from('bags').insert({ user_id: session.user.id, name: 'Main Bag' }).select().single();
                if (nb) { setBags([nb]); setActiveBagId(nb.id); }
            }
        }
    };

    const addDiscToDB = async (discObj) => {
        const isNotInFactory = !FACTORY_DB.some(d => d.Model.toLowerCase() === discObj.name.toLowerCase());
        if (isNotInFactory) {
            const alreadyInCommunity = communitySuggestions.some(cs =>
                cs.model.toLowerCase() === discObj.name.toLowerCase() &&
                cs.brand.toLowerCase() === (discObj.brand || '').toLowerCase()
            );
            if (!alreadyInCommunity) {
                const communityPayload = { model: discObj.name, brand: discObj.brand || '', speed: parseFloat(discObj.speed), glide: parseFloat(discObj.glide), turn: parseFloat(discObj.turn), fade: parseFloat(discObj.fade) };
                try {
                    const { data: csData, error: csError } = await supabase.from('community_suggestions').insert(communityPayload).select().single();
                    if (csError) console.error('Error saving to community_suggestions:', csError);
                    else if (csData) setCommunitySuggestions([...communitySuggestions, csData]);
                } catch (err) { console.error('Community suggestion error:', err); }
            }
        }
        const payload = { ...discObj, user_id: session.user.id };
        delete payload.id;
        const { data, error } = await supabase.from('discs').insert(payload).select().single();
        if (error) console.error('Error saving disc:', error);
        else if (data) setDiscs([...discs, data]);
    };

    const updateDiscInDB = async (u) => {
        setDiscs(discs.map(d => d.id === u.id ? u : d));
        const p = { ...u }; delete p.id; delete p.user_id; delete p.created_at;
        await supabase.from('discs').update(p).eq('id', u.id);
    };

    const deleteDiscInDB = async (id) => {
        setDiscs(discs.filter(d => d.id !== id));
        await supabase.from('discs').delete().eq('id', id);
    };

    // --- WEAR / BEAT-IN PHYSICS ---
    const getStats = (d) => {
        const w = parseFloat(d.wear) || 0;
        const baseTurn = parseFloat(d.turn);
        const baseFade = parseFloat(d.fade);
        const baseSpeed = parseFloat(d.speed);
        const overstability = baseFade + Math.max(0, baseTurn);
        const maxTurnShift = Math.max(0, Math.min(1.5, overstability * 0.5));
        const turn = Math.max(-5, baseTurn - (w * maxTurnShift));
        const maxFadeReduction = baseFade * 0.65;
        const fade = Math.max(0, baseFade - (w * maxFadeReduction));
        const distBoost = w < 0.7 ? 1 + (w * 0.05) : 1 + (0.035 - (w - 0.7) * 0.1);
        const dist = d.max_dist
            ? parseFloat(d.max_dist)
            : parseFloat(settings.maxPower) * (0.4 + (baseSpeed / 12 * 0.6)) * distBoost;
        return { turn, fade, stability: turn + fade, dist };
    };

    const calculatePath = (d) => {
        const s = getStats(d);
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const p = i / 100;
            const x = ((Math.sin(p * Math.PI * 0.75) * (s.turn * -10)) + (Math.pow(p, 2.5) * (s.fade * -8))) * Math.pow(p, 1.8);
            points.push({ x, y: settings.unit === 'm' ? p * s.dist * 0.3048 : p * s.dist });
        }
        return points;
    };

    const gapAnalysis = useMemo(() => {
        const active = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
        if (active.length === 0) return { text: "Bag is Empty", filter: (d) => true };
        const hasOSApproach = active.some(d => d.speed <= 4 && parseFloat(d.fade) >= 2.5);
        const hasUSMid = active.some(d => d.speed >= 4 && d.speed <= 6 && parseFloat(d.turn) <= -1.5);
        const hasOSDriver = active.some(d => d.speed >= 9 && (parseFloat(d.turn) + parseFloat(d.fade)) >= 3.5);
        if (!hasOSApproach) return { text: "Need: OS Approach", filter: (d) => d.Speed <= 4 && d.Fade >= 2.5 };
        if (!hasUSMid) return { text: "Need: US Midrange", filter: (d) => d.Speed >= 4 && d.Speed <= 6 && d.Turn <= -2 };
        if (!hasOSDriver) return { text: "Need: OS Utility", filter: (d) => d.Speed >= 9 && (d.Turn + d.Fade) >= 3.5 };
        return { text: "Optimized", filter: null };
    }, [discs, activeBagId]);

    // --- SHARED CHART CONFIG BUILDER ---
    // forExport=true → draws disc name pill-labels directly on the canvas (export only)
    const buildChartConfig = (filtered, mode, forExport = false) => {

        const exportLabelPlugin = {
            id: 'exportLabels',
            afterDatasetsDraw(chart) {
                if (!forExport) return;
                const ctx = chart.ctx;
                const positions = [];

                chart.data.datasets.forEach((ds, i) => {
                    if (!ds.data?.length) return;
                    const meta = chart.getDatasetMeta(i);
                    if (meta.hidden) return;
                    let px, py;
                    if (mode === 'path') {
                        // Label at ~60% along the path — visible on the curve
                        const idx = Math.floor(meta.data.length * 0.60);
                        const pt = meta.data[Math.min(idx, meta.data.length - 1)];
                        px = pt?.x; py = pt?.y;
                    } else {
                        const pt = meta.data[0];
                        px = pt?.x; py = pt?.y;
                    }
                    if (px == null) return;
                    positions.push({ label: ds.label, color: ds.borderColor, px, py });
                });

                // Nudge overlapping labels apart (5 passes)
                for (let iter = 0; iter < 5; iter++) {
                    for (let a = 0; a < positions.length; a++) {
                        for (let b = a + 1; b < positions.length; b++) {
                            const dx = positions[a].px - positions[b].px;
                            const dy = positions[a].py - positions[b].py;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 30 && dist > 0) {
                                const push = (30 - dist) / 2;
                                const ang = Math.atan2(dy, dx);
                                positions[a].py += Math.sin(ang) * push;
                                positions[b].py -= Math.sin(ang) * push;
                                positions[a].px += Math.cos(ang) * push * 0.4;
                                positions[b].px -= Math.cos(ang) * push * 0.4;
                            }
                        }
                    }
                }

                positions.forEach(({ label, color, px, py }) => {
                    ctx.save();
                    ctx.font = 'bold 11px system-ui, sans-serif';
                    const tw = ctx.measureText(label).width;
                    const bw = tw + 10; const bh = 18; const br = 5;
                    const bx = px - bw / 2; const by = py - bh / 2;
                    ctx.fillStyle = 'rgba(11,15,26,0.80)';
                    ctx.beginPath();
                    ctx.roundRect(bx, by, bw, bh, br);
                    ctx.fill();
                    ctx.fillStyle = color || '#fff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = 'rgba(0,0,0,0.9)';
                    ctx.shadowBlur = 2;
                    ctx.fillText(label, px, py + 1);
                    ctx.restore();
                });
            }
        };

        return {
            type: 'scatter',
            data: {
                datasets: filtered.map(d => ({
                    label: d.name,
                    data: mode === 'path' ? calculatePath(d) : [{ x: getStats(d).stability, y: parseFloat(d.speed) }],
                    borderColor: d.color,
                    backgroundColor: d.color,
                    showLine: mode === 'path',
                    pointRadius: mode === 'path' ? 0 : 9,
                    pointStyle: 'circle',
                    borderDash: d.is_idea ? [5, 5] : [],
                    borderWidth: mode === 'path' ? 1.5 : 2,
                    tension: 0.4,
                    cubicInterpolationMode: 'monotone',
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { min: mode === 'path' ? -100 : -6, max: mode === 'path' ? 100 : 6, reverse: mode !== 'path', grid: { color: '#1e293b' } },
                    y: {
                        min: 0,
                        max: mode === 'path' ? (settings.unit === 'm' ? 180 : 550) : 14,
                        grid: { color: '#1e293b' },
                        ticks: mode === 'path' ? {} : { stepSize: 1, callback: v => v }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        borderColor: '#1e293b',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            title: (items) => items[0]?.dataset?.label || '',
                            label: (item) => {
                                const disc = filtered.find(d => d.name === item.dataset.label);
                                if (!disc) return '';
                                const plastic = disc.plastic || 'Premium';
                                const weight = disc.weight ? disc.weight + 'g' : '';
                                return `${plastic}${weight ? '  •  ' + weight : ''}`;
                            },
                            labelColor: (item) => ({
                                borderColor: item.dataset.borderColor,
                                backgroundColor: item.dataset.backgroundColor,
                                borderRadius: 4,
                            }),
                        },
                        titleFont: { family: 'system-ui', weight: 'bold', size: 13 },
                        bodyFont: { family: 'system-ui', size: 11 },
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        displayColors: true,
                        boxWidth: 10,
                        boxHeight: 10,
                    }
                }
            },
            plugins: forExport ? [exportLabelPlugin] : []
        };
    };

    // --- CHART RENDERING ---
    useEffect(() => {
        if (!session) return;
        const filtered = discs.filter(d => {
            if (view === 'graveyard') return d.status === 'lost';
            if (view === 'favorites') return d.favorite;
            if (view === 'storage') return d.status === 'active' && !d.bag_id;
            return d.bag_id === activeBagId && d.status === 'active';
        });

        // Mobile: single toggled chart
        const mobileCanvas = document.getElementById('mainChart');
        if (mobileCanvas) {
            if (chartRef.current) chartRef.current.destroy();
            chartRef.current = new Chart(mobileCanvas.getContext('2d'), buildChartConfig(filtered, chartMode));
        }

        // Desktop: both charts always visible
        const pathCanvas = document.getElementById('desktopPathChart');
        if (pathCanvas) {
            if (desktopPathRef.current) desktopPathRef.current.destroy();
            desktopPathRef.current = new Chart(pathCanvas.getContext('2d'), buildChartConfig(filtered, 'path'));
        }

        const stabCanvas = document.getElementById('desktopStabChart');
        if (stabCanvas) {
            if (desktopStabRef.current) desktopStabRef.current.destroy();
            desktopStabRef.current = new Chart(stabCanvas.getContext('2d'), buildChartConfig(filtered, 'matrix'));
        }
    }, [discs, activeBagId, view, session, settings, chartMode]);

    // --- AUTH RENDER ---
    if (!session) return (
        <div className="h-[100dvh] w-full flex items-center justify-center bg-[#0b0f1a] p-6">
            <div className="w-full max-w-md text-center">
                <img src={LOGO_URL} alt="BaggedUp Logo" className="h-48 w-48 mx-auto mb-4 object-contain" />
                <h1 className="text-3xl font-black italic uppercase text-white mb-2 tracking-tight">Welcome to <span className="text-orange-500">BaggedUp</span></h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-8">Your disc golf bag, tracked.</p>
                {authMessage && <div className="p-4 mb-4 bg-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold uppercase">{authMessage}</div>}
                <form onSubmit={(e) => handleLogin(e, 'login')} className="space-y-4">
                    <input type="email" placeholder="EMAIL" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full bg-slate-900 p-5 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500" />
                    <input type="password" placeholder="PASSWORD" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full bg-slate-900 p-5 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500" />
                    <button type="submit" className="w-full bg-orange-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl">Log In</button>
                    <button type="button" onClick={(e) => handleLogin(e, 'signup')} className="w-full text-orange-500 font-bold uppercase text-xs pt-2">Register New Account</button>
                </form>
            </div>
        </div>
    );

    // --- FILTERED DISCS (used in both layouts) ---
    const filteredDiscs = discs.filter(d => {
        if (view === 'graveyard') return d.status === 'lost';
        if (view === 'favorites') return d.favorite;
        if (view === 'storage') return d.status === 'active' && !d.bag_id;
        return d.bag_id === activeBagId && d.status === 'active';
    });

    // --- INVENTORY CARD COMPONENT ---
    const InventoryCards = () => (
        <div className="space-y-3">
            {filteredDiscs.map(d => {
                const effectiveWear = localWear[d.id] !== undefined ? localWear[d.id] : (parseFloat(d.wear) || 0);
                const currentStats = getStats({ ...d, wear: effectiveWear });
                return (
                    <div key={d.id} className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] flex flex-col gap-4 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: d.color }} />
                        <div className="flex justify-between items-start">
                            <div className="min-w-0 pr-4">
                                <h4 className="font-black text-sm uppercase italic leading-none mb-1 truncate">{d.name} {d.aces > 0 && `🏆 ${d.aces}`}</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase truncate">{d.brand} • {d.plastic || 'Premium'} • {d.weight}g</p>
                                {d.status === 'lost' && d.lost_note && (
                                    <p className="text-[10px] font-bold text-red-400/70 mt-0.5 truncate">📍 {d.lost_note}</p>
                                )}
                            </div>
                            <div className="flex gap-3 shrink-0">
                                <button
                                    onClick={() => updateDiscInDB({ ...d, favorite: !d.favorite })}
                                    className={`transition text-lg leading-none ${d.favorite ? 'text-yellow-400' : 'text-slate-700 hover:text-yellow-400'}`}
                                    title={d.favorite ? 'Remove from Favourites' : 'Add to Favourites'}
                                >★</button>
                                <button onClick={() => setEditing(d)} className="text-slate-500 hover:text-white transition">✎</button>
                                <button onClick={() => deleteDiscInDB(d.id)} className="text-slate-500 hover:text-red-500 transition">✕</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex gap-2 text-center">
                                {[
                                    { label: 'S', base: d.speed, live: d.speed },
                                    { label: 'G', base: d.glide, live: d.glide },
                                    { label: 'T', base: d.turn, live: currentStats.turn },
                                    { label: 'F', base: d.fade, live: currentStats.fade },
                                ].map((val, i) => {
                                    const worn = effectiveWear > 0;
                                    const changed = worn && val.live !== val.base;
                                    return (
                                        <div key={i} className="bg-slate-800/50 px-2 py-1 rounded-lg">
                                            <div className="text-[7px] font-black text-slate-600 uppercase">{val.label}</div>
                                            <div className={`text-[10px] font-black ${changed ? 'text-orange-400' : 'text-slate-300'}`}>
                                                {val.live.toFixed(changed ? 1 : 0)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {!d.is_idea && (
                                <div className="flex-grow ml-6">
                                    <div className="flex justify-between text-[8px] font-black text-slate-700 uppercase mb-1">
                                        <span>Fresh</span><span>Beat</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="1" step="0.05"
                                        value={localWear[d.id] !== undefined ? localWear[d.id] : d.wear}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            // Update local state instantly for smooth UI
                                            setLocalWear(prev => ({ ...prev, [d.id]: val }));
                                            // Debounce the DB write + chart update
                                            if (wearDebounce.current[d.id]) clearTimeout(wearDebounce.current[d.id]);
                                            wearDebounce.current[d.id] = setTimeout(() => {
                                                updateDiscInDB({ ...d, wear: val });
                                                setLocalWear(prev => { const n = {...prev}; delete n[d.id]; return n; });
                                            }, 400);
                                        }}
                                        className="w-full"
                                    />
                                </div>
                            )}
                            {d.is_idea && (
                                <div className="flex flex-col gap-1.5 ml-4 shrink-0">
                                    <button
                                        onClick={() => updateDiscInDB({ ...d, is_idea: false })}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-[8px] font-black uppercase px-3 py-1.5 rounded-full transition whitespace-nowrap"
                                    >
                                        ✓ Bought
                                    </button>
                                    <button
                                        onClick={() => {
                                            const country = settings.country || 'New Zealand';
                                            const query = encodeURIComponent(`buy ${d.name} ${d.brand} disc golf ${country}`);
                                            window.open(`https://www.google.com/search?q=${query}`, '_blank');
                                        }}
                                        className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 text-[8px] font-black uppercase px-3 py-1.5 rounded-full transition whitespace-nowrap"
                                    >
                                        🛒 Buy One
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="h-[100dvh] w-full bg-[#0b0f1a] flex overflow-hidden text-slate-200">
            <style>{`
                .glass { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); }
                input[type="range"] { -webkit-appearance: none; background: #1e293b; height: 6px; border-radius: 10px; }
                input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%; background: #f97316; border: 2px solid #0b0f1a; }
            `}</style>

            {/* =====================================================
                DESKTOP SIDEBAR (lg+)
            ===================================================== */}
            <div className="hidden lg:flex w-60 h-full bg-slate-900 border-r border-slate-800 p-6 flex-col gap-4 shrink-0">
                <div className="flex justify-center w-full mb-1">
                    <img src={LOGO_URL} alt="BaggedUp Logo" className="h-[4.5rem] w-[4.5rem] object-contain" />
                </div>
                {[
                    { id: 'active', label: 'My Bag', icon: '🎒' },
                    { id: 'storage', label: 'Storage', icon: '📦' },
                    { id: 'favorites', label: 'Favourites', icon: '⭐' },
                    { id: 'graveyard', label: 'Graveyard', icon: '🪦' }
                ].map(item => (
                    <button key={item.id} onClick={() => setView(item.id)} className={`flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs transition ${view === item.id ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <span className="text-xl">{item.icon}</span> {item.label}
                    </button>
                ))}
                <button onClick={() => setShowExport(true)} className="flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs text-purple-400 hover:bg-slate-800 transition">
                    <span className="text-xl">📤</span> Export Bag
                </button>
                <button onClick={() => { setRoundBagId(activeBagId); setRoundChecked({}); setLostComment({}); setShowPlayRound(true); }} className="flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs text-emerald-400 hover:bg-slate-800 transition">
                    <span className="text-xl">🥏</span> Play Round
                </button>
                <button onClick={() => setShowSettings(true)} className="mt-auto flex items-center gap-4 p-4 text-slate-500 font-black uppercase text-xs hover:text-slate-300">⚙️ Settings</button>
                <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-4 p-4 text-red-500 font-black uppercase text-xs hover:text-red-400">✕ Log Out</button>
            </div>

            {/* =====================================================
                MOBILE SIDEBAR OVERLAY
            ===================================================== */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-[100] flex">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-72 h-full bg-slate-900 border-r border-slate-800 p-8 flex flex-col gap-6">
                        <img src={LOGO_URL} alt="BaggedUp Logo" className="h-12 w-12 object-contain" />
                        {[
                            { id: 'active', label: 'My Bag', icon: '🎒' },
                            { id: 'storage', label: 'Storage', icon: '📦' },
                            { id: 'favorites', label: 'Favourites', icon: '⭐' },
                            { id: 'graveyard', label: 'Graveyard', icon: '🪦' }
                        ].map(item => (
                            <button key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); }} className={`flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs transition ${view === item.id ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>
                                <span className="text-xl">{item.icon}</span> {item.label}
                            </button>
                        ))}
                        <button onClick={() => { setShowExport(true); setSidebarOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs text-purple-400 hover:bg-slate-800 transition">
                            <span className="text-xl">📤</span> Export Bag
                        </button>
                        <button onClick={() => { setRoundBagId(activeBagId); setRoundChecked({}); setLostComment({}); setShowPlayRound(true); setSidebarOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs text-emerald-400 hover:bg-slate-800 transition">
                            <span className="text-xl">🥏</span> Play Round
                        </button>
                        <button onClick={() => { setShowSettings(true); setSidebarOpen(false); }} className="mt-auto flex items-center gap-4 p-4 text-slate-500 font-black uppercase text-xs">⚙️ Settings</button>
                        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-4 p-4 text-red-500 font-black uppercase text-xs">✕ Log Out</button>
                    </div>
                </div>
            )}

            {/* =====================================================
                MAIN CONTENT AREA
            ===================================================== */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* HEADER */}
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-50 glass sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="text-2xl lg:hidden">☰</button>
                        <img src={LOGO_URL} alt="BaggedUp Logo" className="h-10 w-10 object-contain lg:hidden" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-orange-500 text-xs pointer-events-none">🎒</span>
                            <select
                                value={activeBagId}
                                onChange={(e) => setActiveBagId(e.target.value)}
                                className="appearance-none bg-slate-800 border border-slate-700 text-orange-500 font-black text-[11px] uppercase pl-8 pr-8 py-2.5 rounded-2xl outline-none cursor-pointer hover:border-orange-500 transition focus:border-orange-500"
                            >
                                {bags.map(b => <option key={b.id} value={b.id} style={{background:'#1e293b'}}>{b.name}</option>)}
                            </select>
                            <span className="absolute right-3 text-slate-500 text-[10px] pointer-events-none">▾</span>
                        </div>
                        <button
                            onClick={() => { const n = prompt("Rename Bag:"); if (n) updateBagName(activeBagId, n); }}
                            className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition flex items-center justify-center text-sm"
                            title="Rename bag"
                        >✎</button>
                    </div>
                    <button onClick={() => setShowSearch(true)} className="bg-orange-600 w-10 h-10 rounded-full font-black text-xl flex items-center justify-center shadow-lg">+</button>
                </header>

                {/* =====================================================
                    MOBILE LAYOUT (below lg): stacked — chart then inventory
                ===================================================== */}
                <main className="lg:hidden flex-1 overflow-y-auto">
                    {gapAnalysis.filter && view === 'active' && (
                        <div className="px-4 pt-4">
                            <button onClick={() => setSuggestionPool(FACTORY_DB.filter(gapAnalysis.filter).slice(0, 5))} className="w-full bg-blue-500/10 border border-blue-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-blue-400 animate-pulse">
                                {gapAnalysis.text} — View Suggestions
                            </button>
                        </div>
                    )}
                    <section className="p-4">
                        <div className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800 p-4 shadow-2xl">
                            <div className="flex bg-slate-800/50 p-1 rounded-2xl mb-4 w-full max-w-xs mx-auto">
                                <button onClick={() => setChartMode('path')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition ${chartMode === 'path' ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>Flight Path</button>
                                <button onClick={() => setChartMode('matrix')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition ${chartMode === 'matrix' ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>Stability</button>
                            </div>
                            <div className="h-[400px] w-full"><canvas id="mainChart"></canvas></div>
                        </div>
                    </section>
                    <section className="px-4 pb-24">
                        <h2 className="px-2 italic text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">{view} Inventory</h2>
                        <InventoryCards />
                    </section>
                </main>

                {/* =====================================================
                    DESKTOP LAYOUT (lg+):
                    Left panel  = both charts side by side (fills remaining width)
                    Right panel = scrollable inventory list (fixed 380px)
                ===================================================== */}
                <div className="hidden lg:flex flex-1 overflow-hidden min-w-0">

                    {/* LEFT: Charts — flex-1 so they fill all space not taken by inventory */}
                    <div className="flex-1 flex flex-col p-5 gap-4 overflow-hidden min-w-0">

                        {/* Gap analysis banner */}
                        {gapAnalysis.filter && view === 'active' && (
                            <button onClick={() => setSuggestionPool(FACTORY_DB.filter(gapAnalysis.filter).slice(0, 5))} className="shrink-0 w-full bg-blue-500/10 border border-blue-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-blue-400 animate-pulse">
                                {gapAnalysis.text} — View Suggestions
                            </button>
                        )}

                        {/* Two charts side by side, filling all remaining vertical space */}
                        <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">

                            {/* Flight Path Chart */}
                            <div className="bg-slate-900/40 rounded-[2rem] border border-slate-800 p-5 flex flex-col min-h-0 overflow-hidden">
                                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3 shrink-0">
                                    ✈ Flight Path
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    <canvas id="desktopPathChart" className="absolute inset-0 w-full h-full"></canvas>
                                </div>
                            </div>

                            {/* Stability Matrix Chart */}
                            <div className="bg-slate-900/40 rounded-[2rem] border border-slate-800 p-5 flex flex-col min-h-0 overflow-hidden">
                                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3 shrink-0">
                                    ◎ Stability Matrix
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    <canvas id="desktopStabChart" className="absolute inset-0 w-full h-full"></canvas>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: Inventory panel — fixed width, full height, scrollable */}
                    <div className="w-[380px] shrink-0 h-full border-l border-slate-800 bg-slate-950/50 flex flex-col">
                        <div className="px-5 py-4 border-b border-slate-800 shrink-0">
                            <span className="italic text-[10px] font-black uppercase text-slate-500 tracking-widest">{view} Inventory</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 pb-6">
                            <InventoryCards />
                        </div>
                    </div>

                </div>
                {/* end desktop layout */}

            </div>
            {/* end main content area */}

            {/* =====================================================
                MODALS (shared, appear over both layouts)
            ===================================================== */}

            {/* SEARCH DIRECTORY */}
            {showSearch && !showCommunityAdd && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-black italic text-orange-500 uppercase">Search</h2>
                        <button onClick={() => { setShowSearch(false); setDbQuery(''); }} className="text-2xl">✕</button>
                    </div>
                    <input autoFocus placeholder="DISC MODEL..." value={dbQuery} onChange={e => setDbQuery(e.target.value)} className="w-full max-w-2xl mx-auto bg-slate-900 p-6 rounded-3xl border border-slate-800 font-black text-[16px] uppercase italic text-white mb-6 outline-none focus:border-orange-500" />
                    <div className="flex-grow overflow-y-auto space-y-3 pb-10 max-w-2xl w-full mx-auto">
                        {FACTORY_DB.filter(d => d.Model.toLowerCase().includes(dbQuery.toLowerCase())).map(d => (
                            <div key={d.Model} onClick={() => { addDiscToDB({ name: d.Model, brand: d.Manufacturer, speed: d.Speed, glide: d.Glide, turn: d.Turn, fade: d.Fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true }); setShowSearch(false); }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center cursor-pointer hover:border-orange-500 transition">
                                <div><div className="font-black uppercase italic text-lg">{d.Model}</div><div className="text-[10px] font-bold text-slate-500 uppercase">{d.Manufacturer} • {d.Speed}/{d.Glide}/{d.Turn}/{d.Fade}</div></div>
                                <div className="text-orange-500 font-black text-xl">+</div>
                            </div>
                        ))}
                        {communitySuggestions.filter(d => d.model.toLowerCase().includes(dbQuery.toLowerCase())).map(d => (
                            <div key={d.id} onClick={() => { addDiscToDB({ name: d.model, brand: d.brand, speed: d.speed, glide: d.glide, turn: d.turn, fade: d.fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true }); setShowSearch(false); }} className="p-6 bg-emerald-900/20 rounded-2xl border border-emerald-600/30 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition">
                                <div><div className="font-black uppercase italic text-lg text-emerald-400">{d.model}</div><div className="text-[10px] font-bold text-emerald-600 uppercase">{d.brand} • {d.speed}/{d.glide}/{d.turn}/{d.fade} • Community</div></div>
                                <div className="text-emerald-500 font-black text-xl">+</div>
                            </div>
                        ))}
                        {dbQuery && FACTORY_DB.filter(d => d.Model.toLowerCase().includes(dbQuery.toLowerCase())).length === 0 && communitySuggestions.filter(d => d.model.toLowerCase().includes(dbQuery.toLowerCase())).length === 0 && (
                            <button onClick={() => { setCommunityFormData({ name: dbQuery, brand: '', speed: 5, glide: 5, turn: 0, fade: 2.5 }); setShowCommunityAdd(true); }} className="w-full p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl text-blue-400 font-black uppercase text-sm hover:border-blue-500 transition">
                                Can't find your disc? Add to Global Directory
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* COMMUNITY ADD */}
            {showCommunityAdd && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex items-center justify-center overflow-y-auto">
                    <form onSubmit={async e => {
                        e.preventDefault();
                        await addDiscToDB({ ...communityFormData, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true });
                        alert(`✅ "${communityFormData.name}" added to your bag and the global directory!`);
                        setShowCommunityAdd(false); setShowSearch(false); setDbQuery('');
                        setCommunityFormData({ name: '', brand: '', speed: 5, glide: 5, turn: 0, fade: 2.5 });
                    }} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 w-full max-w-lg space-y-4 my-auto">
                        <div className="flex justify-between"><h3 className="text-2xl font-black italic uppercase text-blue-500">Add to Global Directory</h3><button type="button" onClick={() => setShowCommunityAdd(false)}>✕</button></div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Help the community by adding this disc! It will be available to all pilots.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" value={communityFormData.name} onChange={(e) => setCommunityFormData({ ...communityFormData, name: e.target.value })} placeholder="DISC MODEL" className="bg-slate-800 p-4 rounded-xl font-bold uppercase text-[16px] text-white outline-none" />
                            <input type="text" value={communityFormData.brand} onChange={(e) => setCommunityFormData({ ...communityFormData, brand: e.target.value })} placeholder="MANUFACTURER" className="bg-slate-800 p-4 rounded-xl font-bold uppercase text-[16px] text-white outline-none" />
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            {['speed', 'glide', 'turn', 'fade'].map((l, i) => {
                                const constraints = { speed: { min: 1, max: 13 }, glide: { min: 1, max: 7 }, turn: { min: -5, max: 3 }, fade: { min: 0, max: 4 } };
                                const { min, max } = constraints[l];
                                return (<div key={l}><span className="text-[8px] font-black text-slate-500 uppercase">{['Spd', 'Gld', 'Trn', 'Fde'][i]}</span><input type="text" inputMode="decimal" value={communityFormData[l]} onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) setCommunityFormData({ ...communityFormData, [l]: Math.max(min, Math.min(max, val)) });
                                    else if (e.target.value === '' || e.target.value === '-') setCommunityFormData({ ...communityFormData, [l]: e.target.value });
                                }} className="bg-slate-800 p-3 rounded-xl font-black text-center w-full text-[16px]" /></div>);
                            })}
                        </div>
                        <button type="submit" className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl hover:bg-blue-700 transition">Add to Directory</button>
                        <button type="button" onClick={() => setShowCommunityAdd(false)} className="w-full py-3 text-slate-400 font-black uppercase text-xs">Cancel</button>
                    </form>
                </div>
            )}

            {/* GAP SUGGESTIONS */}
            {suggestionPool && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-black italic text-blue-500 uppercase">Suggested Discs</h2>
                        <button onClick={() => setSuggestionPool(null)} className="text-2xl">✕</button>
                    </div>
                    <div className="flex-grow overflow-y-auto space-y-3 pb-10 max-w-2xl w-full mx-auto">
                        {suggestionPool.map(d => (
                            <div key={d.Model} onClick={() => { addDiscToDB({ name: d.Model, brand: d.Manufacturer, speed: d.Speed, glide: d.Glide, turn: d.Turn, fade: d.Fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true }); setSuggestionPool(null); }} className="p-6 bg-blue-900/20 rounded-2xl border border-blue-600/30 flex justify-between items-center cursor-pointer hover:border-blue-500 transition">
                                <div><div className="font-black uppercase italic text-lg text-blue-400">{d.Model}</div><div className="text-[10px] font-bold text-blue-600 uppercase">{d.Manufacturer} • {d.Speed}/{d.Glide}/{d.Turn}/{d.Fade}</div></div>
                                <div className="text-blue-500 font-black text-xl">+</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editing && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex items-center justify-center overflow-y-auto">
                    <form onSubmit={e => {
                        e.preventDefault(); const fd = new FormData(e.target);
                        const distValue = parseFloat(fd.get('d'));
                        const savedDist = settings.unit === 'm' ? distValue / 0.3048 : distValue;
                        updateDiscInDB({
                            ...editing, name: fd.get('n'), brand: fd.get('b'), plastic: fd.get('pl'), weight: fd.get('wt'),
                            bag_id: fd.get('bag') || null, status: fd.get('lost') === 'on' ? 'lost' : 'active',
                            speed: parseFloat(fd.get('s')), glide: parseFloat(fd.get('g')), turn: parseFloat(fd.get('t')), fade: parseFloat(fd.get('f')),
                            color: fd.get('c'), max_dist: savedDist, aces: parseInt(fd.get('a')), favorite: fd.get('fav') === 'on', is_idea: false
                        });
                        setEditing(null);
                    }} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 w-full max-w-lg space-y-4 my-auto">
                        <div className="flex justify-between"><h3 className="text-2xl font-black italic uppercase text-orange-500">Edit Disc</h3><button type="button" onClick={() => setEditing(null)}>✕</button></div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="n" defaultValue={editing.name} placeholder="MODEL" className="bg-slate-800 p-4 rounded-xl font-bold uppercase text-[16px] text-white outline-none" />
                            <select name="bag" defaultValue={editing.bag_id || ''} className="bg-slate-800 p-4 rounded-xl text-[16px] text-white">
                                <option value="">Storage</option>
                                {bags.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="b" defaultValue={editing.brand} placeholder="BRAND" className="bg-slate-800 p-4 rounded-xl uppercase text-[16px] text-white outline-none" />
                            <input name="pl" defaultValue={editing.plastic} placeholder="PLASTIC" className="bg-slate-800 p-4 rounded-xl uppercase text-[16px] text-white outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="wt" defaultValue={editing.weight} placeholder="WEIGHT (g)" className="bg-slate-800 p-4 rounded-xl text-[16px] text-white outline-none" />
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            {['s', 'g', 't', 'f'].map((l, i) => {
                                const constraints = { s: { min: 1, max: 13 }, g: { min: 1, max: 7 }, t: { min: -5, max: 3 }, f: { min: 0, max: 4 } };
                                const { min, max } = constraints[l];
                                return (<div key={l}><span className="text-[8px] font-black text-slate-500 uppercase">{['Spd', 'Gld', 'Trn', 'Fde'][i]}</span><input name={l} type="text" inputMode="decimal" defaultValue={[editing.speed, editing.glide, editing.turn, editing.fade][i]} onBlur={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) e.target.value = Math.max(min, Math.min(max, val));
                                }} className="bg-slate-800 p-3 rounded-xl font-black text-center w-full text-[16px]" /></div>);
                            })}
                        </div>
                        <div className="bg-slate-800 p-4 rounded-xl">
                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-1">
                                <span>Power Calibration</span>
                                <span className="text-orange-500">{(settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)).toFixed(0)}{settings.unit}</span>
                            </div>
                            <input name="d" type="range" min={settings.unit === 'm' ? 15 : 50} max={settings.unit === 'm' ? 198 : 650} step="1" defaultValue={settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)} className="w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800 p-3 rounded-xl"><span className="text-[8px] font-black text-slate-500 uppercase">Aces</span><input name="a" type="number" defaultValue={editing.aces || 0} className="bg-transparent font-black text-orange-500 w-full text-[16px]" /></div>
                            <div className="bg-slate-800 p-3 rounded-xl"><span className="text-[8px] font-black text-slate-500 uppercase">Path Color</span><input name="c" type="color" defaultValue={editing.color} className="w-full h-6 bg-transparent" /></div>
                        </div>
                        <div className="flex gap-2">
                            <label className="flex-1 bg-slate-800 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase text-slate-500"><input name="fav" type="checkbox" defaultChecked={editing.favorite} className="accent-orange-500 h-5 w-5" />Collection</label>
                            <label className="flex-1 bg-red-900/20 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase text-red-500"><input name="lost" type="checkbox" defaultChecked={editing.status === 'lost'} className="accent-red-500 h-5 w-5" />Lost Disc</label>
                        </div>
                        <button type="submit" className="w-full bg-orange-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl">Sync to Cloud</button>
                    </form>
                </div>
            )}

            {/* SETTINGS */}
            {showSettings && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex items-center justify-center">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 w-full max-w-md space-y-6">
                        <h2 className="text-2xl font-black italic uppercase text-orange-500">Bag Settings</h2>
                        <div className="flex flex-col gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <span className="text-[10px] font-black uppercase text-slate-500">Home Territory</span>
                            <input value={settings.country || ''} onChange={(e) => setSettings({ ...settings, country: e.target.value })} className="bg-transparent font-black text-white uppercase outline-none" />
                        </div>
                        <button onClick={() => {
                            // maxPower always stored in feet internally; just flip the display unit
                            setSettings({ ...settings, unit: settings.unit === 'ft' ? 'm' : 'ft' });
                        }} className="w-full bg-slate-800 p-5 rounded-2xl font-black text-xs uppercase flex justify-between">
                            <span>Unit System</span><span className="text-blue-500">{settings.unit === 'ft' ? 'Feet' : 'Meters'}</span>
                        </button>
                        <div className="bg-slate-800 p-5 rounded-2xl space-y-4">
                            {/* maxPower stored in feet. Slider displays in current unit. */}
                            {(() => {
                                const displayVal = settings.unit === 'm'
                                    ? Math.round(settings.maxPower * 0.3048)
                                    : settings.maxPower;
                                const displayMin = settings.unit === 'm' ? 30 : 100;
                                const displayMax = settings.unit === 'm' ? 183 : 600;
                                const displayStep = settings.unit === 'm' ? 1 : 5;
                                return (
                                    <>
                                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                            <span>Global Max Power</span>
                                            <span className="text-orange-500">{displayVal}{settings.unit}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={displayMin}
                                            max={displayMax}
                                            step={displayStep}
                                            value={displayVal}
                                            onChange={(e) => {
                                                const v = Number(e.target.value);
                                                const inFeet = settings.unit === 'm' ? Math.round(v / 0.3048) : v;
                                                setSettings({ ...settings, maxPower: inFeet });
                                            }}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-[8px] font-black text-slate-700 uppercase mt-1">
                                            <span>{settings.unit === 'm' ? '30m' : '100ft'}</span>
                                            <span className="text-slate-600">100m / 328ft avg</span>
                                            <span>{settings.unit === 'm' ? '183m' : '600ft'}</span>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                        <button onClick={() => { saveSettings(settings); setShowSettings(false); }} className="w-full bg-orange-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl">Save & Close</button>
                        <div className="space-y-2">
                            <h3 className="text-[10px] font-black uppercase text-slate-500">Your Bags</h3>
                            {bags.map(bag => (
                                <div key={bag.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl">
                                    <span className={`text-sm font-black uppercase ${bag.id === activeBagId ? 'text-orange-500' : 'text-slate-400'}`}>{bag.name}</span>
                                    {bags.length > 1 && <button onClick={() => deleteBag(bag.id)} className="text-red-500 hover:text-red-400 transition text-xs font-black">✕</button>}
                                </div>
                            ))}
                        </div>
                        <button onClick={() => { const n = prompt("New Bag Name:"); if (n) createBag(n); setShowSettings(false); }} className="w-full py-4 text-xs font-black uppercase text-slate-500">Create New Bag</button>
                    </div>
                </div>
            )}


        {/* =====================================================
            EXPORT BAG MODAL
        ===================================================== */}
        {showExport && (() => {
            const exportDiscs = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
            const activeBag = bags.find(b => b.id === activeBagId);

            const runExport = async (format) => {
                setExportLoading(true);
                try {
                    const [{ jsPDF }] = await Promise.all([
                        import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').catch(() => window),
                    ]);
                    const JSPDF = window.jspdf?.jsPDF || jsPDF;

                    // ── Read live canvas aspect ratios from the DOM ──
                    // This ensures we never stretch/squash charts vs what the user sees
                    const getLiveAspect = (id) => {
                        const el = document.getElementById(id);
                        if (!el) return 1.6; // sensible fallback
                        return el.offsetWidth / el.offsetHeight;
                    };
                    const pathAspect = getLiveAspect('desktopPathChart') || getLiveAspect('mainChart') || 1.6;
                    const stabAspect = getLiveAspect('desktopStabChart') || getLiveAspect('mainChart') || 1.3;

                    // ── Render a Chart.js chart off-screen at exact pixel size with labels ──
                    const renderChart = (mode, width, height) => new Promise(resolve => {
                        const offscreen = document.createElement('canvas');
                        offscreen.width = width; offscreen.height = height;
                        offscreen.style.cssText = 'position:absolute;left:-9999px;top:0';
                        document.body.appendChild(offscreen);
                        const cfg = buildChartConfig(exportDiscs, mode, true);
                        cfg.options.animation = false;
                        cfg.options.responsive = false;
                        cfg.options.maintainAspectRatio = false;
                        const ch = new Chart(offscreen.getContext('2d'), cfg);
                        requestAnimationFrame(() => requestAnimationFrame(() => {
                            const url = offscreen.toDataURL('image/png');
                            ch.destroy();
                            document.body.removeChild(offscreen);
                            resolve(url);
                        }));
                    });

                    // ── Load logo ──
                    const loadLogoB64 = async () => {
                        try {
                            const res = await fetch('/baggedup.logo.png');
                            const blob = await res.blob();
                            return await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
                        } catch { return null; }
                    };
                    const loadLogoImg = () => new Promise(r => {
                        const img = new Image(); img.crossOrigin = 'anonymous';
                        img.onload = () => r(img); img.onerror = () => r(null);
                        img.src = '/baggedup.logo.png?' + Date.now();
                    });

                    // ════════════════════════════════════════════
                    // PDF EXPORT
                    // ════════════════════════════════════════════
                    if (format === 'pdf') {
                        const doc = new JSPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                        const W = 210; const H = 297;
                        const dark = [11,15,26]; const orange = [249,115,22]; const slate = [30,41,59];
                        const logoB64 = await loadLogoB64();

                        // ── Page 1: Summary ──
                        doc.setFillColor(...dark); doc.rect(0,0,W,H,'F');
                        if (logoB64) {
                            doc.addImage(logoB64,'PNG',13,11,38,38);
                        } else {
                            doc.setFillColor(...orange); doc.roundedRect(13,11,38,38,5,5,'F');
                            doc.setTextColor(255,255,255); doc.setFontSize(8); doc.setFont('helvetica','bold');
                            doc.text('BAGGED',32,26,{align:'center'}); doc.text('UP',32,36,{align:'center'});
                        }
                        doc.setTextColor(...orange); doc.setFontSize(24); doc.setFont('helvetica','bold');
                        doc.text(activeBag?.name||'My Bag', 57, 24);
                        doc.setTextColor(148,163,184); doc.setFontSize(8); doc.setFont('helvetica','normal');
                        doc.text('BaggedUp — Disc Golf Bag Export', 57, 32);
                        doc.text(new Date().toLocaleDateString('en-NZ',{day:'numeric',month:'long',year:'numeric'}), 57, 40);
                        doc.setDrawColor(...orange); doc.setLineWidth(0.5); doc.line(13,55,W-13,55);

                        const cols = [18,65,100,122,137,152,167,182];
                        doc.setFontSize(7); doc.setFont('helvetica','bold'); doc.setTextColor(...orange);
                        ['Disc','Brand','Plastic','Wt','Spd','Gld','Trn','Fde'].forEach((h,i) => doc.text(h,cols[i],62));
                        doc.setDrawColor(...slate); doc.setLineWidth(0.3); doc.line(13,65,W-13,65);

                        let y = 73;
                        exportDiscs.forEach((d,idx) => {
                            if (y > H-22) { doc.addPage(); doc.setFillColor(...dark); doc.rect(0,0,W,H,'F'); y=20; }
                            const s = getStats(d);
                            if (idx%2===0) { doc.setFillColor(15,23,42); doc.rect(13,y-5,W-26,10,'F'); }
                            const hex=d.color||'#f97316';
                            const cr=parseInt(hex.slice(1,3),16)||249, cg=parseInt(hex.slice(3,5),16)||115, cb=parseInt(hex.slice(5,7),16)||22;
                            doc.setFillColor(cr,cg,cb); doc.rect(13,y-5,2.5,10,'F');
                            doc.setFontSize(8); doc.setFont('helvetica','bold'); doc.setTextColor(255,255,255);
                            doc.text((d.name||'').slice(0,16), cols[0]+2, y);
                            doc.setFont('helvetica','normal'); doc.setTextColor(148,163,184);
                            doc.text((d.brand||'').slice(0,12), cols[1], y);
                            doc.text((d.plastic||'—').slice(0,8), cols[2], y);
                            doc.text(d.weight ? d.weight+'g' : '—', cols[3], y);
                            doc.setTextColor(255,255,255);
                            doc.text(String(d.speed||''), cols[4], y);
                            doc.text(String(d.glide||''), cols[5], y);
                            if (s.turn < (parseFloat(d.turn)||0)-0.1) doc.setTextColor(251,146,60); else doc.setTextColor(255,255,255);
                            doc.text(s.turn.toFixed(1), cols[6], y);
                            if (s.fade < (parseFloat(d.fade)||0)-0.1) doc.setTextColor(251,146,60); else doc.setTextColor(255,255,255);
                            doc.text(s.fade.toFixed(1), cols[7], y);
                            y += 10;
                        });
                        doc.setTextColor(71,85,105); doc.setFontSize(7);
                        doc.text('* Orange = beat-in wear effect', 13, H-12);
                        doc.text('baggedup.vercel.app', W/2, H-6, {align:'center'});

                        // ── Page 2: Flight Paths — preserve live aspect ratio ──
                        // Available content area on A4: W-26 wide, allow up to ~200mm tall
                        const pdfContentW = W - 26; // 184mm
                        const pdfPathH = Math.min(200, pdfContentW / pathAspect);
                        const pdfPathW = pdfPathH * pathAspect; // may be less than full width if very wide
                        const pathPx = 1200; const pathPy = Math.round(pathPx / pathAspect);
                        const pathImg = await renderChart('path', pathPx, pathPy);

                        doc.addPage(); doc.setFillColor(...dark); doc.rect(0,0,W,H,'F');
                        doc.setTextColor(...orange); doc.setFontSize(16); doc.setFont('helvetica','bold');
                        doc.text('Flight Paths', 13, 16);
                        doc.setTextColor(148,163,184); doc.setFontSize(8); doc.setFont('helvetica','normal');
                        doc.text(activeBag?.name||'My Bag', 13, 23);
                        // Center horizontally, start just below heading
                        const pxOff = (W - pdfPathW) / 2;
                        doc.addImage(pathImg,'PNG', pxOff, 28, pdfPathW, pdfPathH);
                        doc.setTextColor(71,85,105); doc.setFontSize(7);
                        doc.text('baggedup.vercel.app', W/2, H-6, {align:'center'});

                        // ── Page 3: Stability Matrix ──
                        const pdfStabH = Math.min(200, pdfContentW / stabAspect);
                        const pdfStabW = pdfStabH * stabAspect;
                        const stabPx = 1200; const stabPy = Math.round(stabPx / stabAspect);
                        const stabImg = await renderChart('matrix', stabPx, stabPy);

                        doc.addPage(); doc.setFillColor(...dark); doc.rect(0,0,W,H,'F');
                        doc.setTextColor(...orange); doc.setFontSize(16); doc.setFont('helvetica','bold');
                        doc.text('Stability Matrix', 13, 16);
                        doc.setTextColor(148,163,184); doc.setFontSize(8); doc.setFont('helvetica','normal');
                        doc.text('Speed vs Stability (Turn + Fade)', 13, 23);
                        const sxOff = (W - pdfStabW) / 2;
                        doc.addImage(stabImg,'PNG', sxOff, 28, pdfStabW, pdfStabH);
                        doc.setTextColor(71,85,105); doc.setFontSize(7);
                        doc.text('baggedup.vercel.app', W/2, H-6, {align:'center'});

                        doc.save(`BaggedUp-${(activeBag?.name||'bag').replace(/\s+/g,'-')}.pdf`);

                    // ════════════════════════════════════════════
                    // PNG STORY / POST EXPORT
                    // ════════════════════════════════════════════
                    } else if (format === 'png-story' || format === 'png-post') {
                        const isStory = format === 'png-story';
                        const CW = 1080;
                        const CH = isStory ? 1920 : 1350; // 9:16 story or 4:5 post
                        const PAD = 52;

                        const logoImg = await loadLogoImg();

                        function rrPath(ctx, x, y, w, h, r) {
                            ctx.beginPath();
                            ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
                            ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
                            ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
                            ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
                            ctx.closePath();
                        }

                        // Compact header: logo left, title right, divider below
                        // Returns the Y position where content should start
                        function drawHeader(ctx, title, subtitle) {
                            const logoSz = 80;
                            if (logoImg) {
                                ctx.drawImage(logoImg, PAD, PAD, logoSz, logoSz);
                            } else {
                                ctx.fillStyle='#f97316'; rrPath(ctx,PAD,PAD,logoSz,logoSz,16); ctx.fill();
                                ctx.fillStyle='#fff'; ctx.font='bold 16px system-ui,sans-serif'; ctx.textAlign='center';
                                ctx.fillText('BAGGED',PAD+logoSz/2,PAD+40); ctx.fillText('UP',PAD+logoSz/2,PAD+60);
                            }
                            ctx.textAlign='left';
                            ctx.fillStyle='#f97316'; ctx.font='bold 50px system-ui,sans-serif';
                            ctx.fillText(title, PAD+logoSz+20, PAD+48);
                            ctx.fillStyle='#475569'; ctx.font='bold 20px system-ui,sans-serif';
                            ctx.fillText(subtitle, PAD+logoSz+20, PAD+76);
                            // divider
                            ctx.strokeStyle='#1e293b'; ctx.lineWidth=2;
                            ctx.beginPath(); ctx.moveTo(PAD,PAD+logoSz+14); ctx.lineTo(CW-PAD,PAD+logoSz+14); ctx.stroke();
                            return PAD + logoSz + 24; // content start Y
                        }

                        function drawFooter(ctx) {
                            ctx.fillStyle='#334155'; ctx.font='bold 20px system-ui,sans-serif';
                            ctx.textAlign='center'; ctx.fillText('baggedup.vercel.app', CW/2, CH-28);
                        }

                        function makeCanvas() {
                            const c = document.createElement('canvas'); c.width=CW; c.height=CH; return c;
                        }

                        // ── Slide 1: Disc Overview ──
                        const s1 = makeCanvas(); const c1 = s1.getContext('2d');
                        c1.fillStyle='#0b0f1a'; c1.fillRect(0,0,CW,CH);
                        const contentTop1 = drawHeader(c1, activeBag?.name||'My Bag', 'BaggedUp • Disc Golf');
                        const footerH = 50;
                        const availH = CH - contentTop1 - footerH;
                        const rowH = Math.min(90, Math.floor(availH / Math.max(exportDiscs.length, 1)));
                        let rowY = contentTop1 + 4;
                        exportDiscs.forEach(d => {
                            c1.fillStyle='#0f172a'; rrPath(c1,PAD,rowY,CW-PAD*2,rowH-8,14); c1.fill();
                            c1.fillStyle=d.color||'#f97316'; rrPath(c1,PAD,rowY,10,rowH-8,4); c1.fill();
                            const fs = Math.min(28, rowH * 0.34);
                            c1.fillStyle='#fff'; c1.font=`bold ${fs}px system-ui,sans-serif`; c1.textAlign='left';
                            c1.fillText(d.name.toUpperCase(), PAD+22, rowY+(rowH-8)*0.44);
                            c1.fillStyle='#64748b'; c1.font=`bold ${Math.min(17,rowH*0.2)}px system-ui,sans-serif`;
                            c1.fillText(`${d.brand} • ${d.plastic||'Premium'}`, PAD+22, rowY+(rowH-8)*0.72);
                            const bw=70,bh=rowH-18,gx=8,sx=CW-PAD-(bw+gx)*4;
                            [d.speed,d.glide,d.turn,d.fade].forEach((v,i)=>{
                                const bx=sx+i*(bw+gx);
                                c1.fillStyle='#1e293b'; rrPath(c1,bx,rowY+5,bw,bh,10); c1.fill();
                                c1.fillStyle='#475569'; c1.font='bold 12px system-ui,sans-serif'; c1.textAlign='center';
                                c1.fillText(['S','G','T','F'][i],bx+bw/2,rowY+20);
                                c1.fillStyle='#fff'; c1.font=`bold ${Math.min(22,rowH*0.26)}px system-ui,sans-serif`;
                                c1.fillText(String(v),bx+bw/2,rowY+bh*0.72+5);
                            });
                            rowY += rowH;
                        });
                        drawFooter(c1);

                        // ── Slides 2 & 3: Charts — render at exact live aspect ratio ──
                        // Chart pixel width = canvas width minus padding on both sides
                        const chartPxW = CW - PAD * 2;

                        // Flight path: use live aspect ratio so it looks identical to app
                        const pathPxH = Math.round(chartPxW / pathAspect);
                        const pathDataUrl = await renderChart('path', chartPxW, pathPxH);
                        const s2 = makeCanvas(); const c2 = s2.getContext('2d');
                        c2.fillStyle='#0b0f1a'; c2.fillRect(0,0,CW,CH);
                        const contentTop2 = drawHeader(c2, 'Flight Paths', activeBag?.name||'My Bag');
                        const pImg = new Image(); pImg.src = pathDataUrl;
                        await new Promise(r => { pImg.onload = r; });
                        // Center the chart in available vertical space
                        const availH2 = CH - contentTop2 - footerH;
                        const scaledPathH = Math.min(pathPxH, availH2);
                        const scaledPathW = scaledPathH * pathAspect;
                        const p2x = (CW - scaledPathW) / 2;
                        const p2y = contentTop2 + (availH2 - scaledPathH) / 2;
                        c2.drawImage(pImg, p2x, p2y, scaledPathW, scaledPathH);
                        drawFooter(c2);

                        // Stability matrix
                        const stabPxH = Math.round(chartPxW / stabAspect);
                        const stabDataUrl = await renderChart('matrix', chartPxW, stabPxH);
                        const s3 = makeCanvas(); const c3 = s3.getContext('2d');
                        c3.fillStyle='#0b0f1a'; c3.fillRect(0,0,CW,CH);
                        const contentTop3 = drawHeader(c3, 'Stability Matrix', 'Speed vs Turn+Fade');
                        const sImg = new Image(); sImg.src = stabDataUrl;
                        await new Promise(r => { sImg.onload = r; });
                        const availH3 = CH - contentTop3 - footerH;
                        const scaledStabH = Math.min(stabPxH, availH3);
                        const scaledStabW = scaledStabH * stabAspect;
                        const s3x = (CW - scaledStabW) / 2;
                        const s3y = contentTop3 + (availH3 - scaledStabH) / 2;
                        c3.drawImage(sImg, s3x, s3y, scaledStabW, scaledStabH);
                        drawFooter(c3);

                        // ── Download / Share ──
                        const baseName = `BaggedUp-${(activeBag?.name||'bag').replace(/\s+/g,'-')}`;
                        const slides = [
                            { canvas: s1, suffix: 'overview' },
                            { canvas: s2, suffix: 'flight-paths' },
                            { canvas: s3, suffix: 'stability' },
                        ];

                        if (isStory && navigator.share && navigator.canShare) {
                            const files = await Promise.all(slides.map(sl => new Promise(res =>
                                sl.canvas.toBlob(blob => res(new File([blob],`${baseName}-${sl.suffix}.png`,{type:'image/png'})))
                            )));
                            if (navigator.canShare({ files })) {
                                try { await navigator.share({ files, title:`My ${activeBag?.name} — BaggedUp` }); setExportLoading(false); return; }
                                catch(e) { /* fall through to download */ }
                            }
                        }

                        for (const sl of slides) {
                            await new Promise(res => sl.canvas.toBlob(blob => {
                                const a = document.createElement('a');
                                a.download = `${baseName}-${sl.suffix}.png`;
                                a.href = URL.createObjectURL(blob); a.click();
                                setTimeout(res, 500);
                            }));
                        }
                    }
                } catch(err) {
                    console.error('Export error:', err);
                    alert('Export failed: ' + err.message);
                }
                setExportLoading(false);
            };

            return (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto">
                    <div className="w-full max-w-md flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black italic text-purple-400 uppercase">📤 Export Bag</h2>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{activeBag?.name} — {exportDiscs.length} discs</p>
                            </div>
                            <button onClick={() => setShowExport(false)} className="text-2xl text-slate-500 hover:text-white">✕</button>
                        </div>

                        {/* PDF Export */}
                        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-3">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">📄</span>
                                <div>
                                    <div className="font-black uppercase text-sm text-white">PDF Report</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">3 pages — summary, flight paths, stability</div>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-600 uppercase font-bold">Download and share via any app — email, WhatsApp, Messenger, etc.</p>
                            <button
                                onClick={() => runExport('pdf')}
                                disabled={exportLoading}
                                className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-4 rounded-2xl font-black uppercase text-sm text-white transition"
                            >
                                {exportLoading ? 'Generating...' : '⬇ Download PDF'}
                            </button>
                        </div>

                        {/* Story / Post PNG Export */}
                        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-3">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">📸</span>
                                <div>
                                    <div className="font-black uppercase text-sm text-white">Social Media — 3 Images</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">Overview · Flight Paths · Stability Matrix</div>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-600 uppercase font-bold">On mobile, tapping Story opens the share sheet. On desktop, 3 PNGs download automatically.</p>
                            <div className="flex gap-3">
                                <button onClick={() => runExport('png-story')} disabled={exportLoading}
                                    className="flex-1 bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 py-4 rounded-2xl font-black uppercase text-xs text-white transition">
                                    {exportLoading ? '⏳' : '📱 Story (9:16)'}
                                </button>
                                <button onClick={() => runExport('png-post')} disabled={exportLoading}
                                    className="flex-1 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 py-4 rounded-2xl font-black uppercase text-xs text-white transition">
                                    {exportLoading ? '⏳' : '🖼 Post (4:5)'}
                                </button>
                            </div>
                            <div className="flex items-start gap-2 bg-slate-800/50 rounded-2xl p-3">
                                <span className="text-base shrink-0">💡</span>
                                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">Instagram → + → Story/Post → select image. Facebook → Stories → Create → Photo.</p>
                            </div>
                        </div>

                        <button onClick={() => setShowExport(false)} className="w-full py-4 bg-slate-800 rounded-2xl font-black uppercase text-xs text-slate-400 hover:bg-slate-700 transition">Close</button>
                    </div>
                </div>
            );
        })()}
        {/* =====================================================
            PLAY ROUND MODAL
        ===================================================== */}
        {showPlayRound && (() => {
            const roundDiscs = discs.filter(d => d.bag_id === roundBagId && d.status === 'active' && !d.is_idea);
            const allChecked = roundDiscs.every(d => roundChecked[d.id]);
            const missingDiscs = roundDiscs.filter(d => !roundChecked[d.id]);

            return (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
                    <div className="w-full max-w-lg mx-auto flex flex-col gap-6 my-auto">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black italic text-emerald-400 uppercase">🥏 Round Check</h2>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Tick every disc you still have</p>
                            </div>
                            <button onClick={() => setShowPlayRound(false)} className="text-2xl text-slate-500 hover:text-white">✕</button>
                        </div>

                        {/* Bag selector */}
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">🎒</span>
                            <select
                                value={roundBagId}
                                onChange={e => { setRoundBagId(e.target.value); setRoundChecked({}); setLostComment({}); }}
                                className="w-full appearance-none bg-slate-800 border border-slate-700 text-orange-500 font-black text-sm uppercase pl-10 pr-8 py-4 rounded-2xl outline-none"
                            >
                                {bags.map(b => <option key={b.id} value={b.id} style={{background:'#1e293b'}}>{b.name}</option>)}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">▾</span>
                        </div>

                        {/* Disc checklist */}
                        <div className="space-y-3">
                            {roundDiscs.map(d => (
                                <div key={d.id} className={`rounded-2xl border p-4 transition ${roundChecked[d.id] ? 'bg-emerald-900/20 border-emerald-600/40' : 'bg-slate-900 border-slate-800'}`}>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setRoundChecked(prev => ({ ...prev, [d.id]: !prev[d.id] }))}
                                            className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-black text-sm transition shrink-0 ${roundChecked[d.id] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600 text-transparent'}`}
                                        >✓</button>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black uppercase italic text-sm truncate" style={{color: d.color}}>{d.name}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase">{d.brand} • {d.plastic || 'Premium'}</div>
                                        </div>
                                        {roundChecked[d.id] && <span className="text-emerald-400 text-xs font-black uppercase shrink-0">✓ Safe</span>}
                                        {!roundChecked[d.id] && <span className="text-red-400 text-xs font-black uppercase shrink-0 animate-pulse">? Missing</span>}
                                    </div>
                                    {/* Lost comment field — shows when NOT ticked */}
                                    {!roundChecked[d.id] && (
                                        <input
                                            type="text"
                                            placeholder="Where did you lose it? (optional)"
                                            value={lostComment[d.id] || ''}
                                            onChange={e => setLostComment(prev => ({ ...prev, [d.id]: e.target.value }))}
                                            className="mt-3 w-full bg-slate-800 border border-red-500/20 rounded-xl px-4 py-2.5 text-[12px] font-bold text-slate-300 placeholder-slate-600 outline-none focus:border-red-500/50"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        {missingDiscs.length > 0 && (
                            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4">
                                <p className="text-red-400 font-black uppercase text-xs">⚠ {missingDiscs.length} disc{missingDiscs.length > 1 ? 's' : ''} missing — will be moved to Graveyard</p>
                            </div>
                        )}

                        {allChecked && (
                            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-4">
                                <p className="text-emerald-400 font-black uppercase text-xs">✓ All discs accounted for — great round!</p>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPlayRound(false)}
                                className="flex-1 py-4 bg-slate-800 rounded-2xl font-black uppercase text-xs text-slate-400 hover:bg-slate-700 transition"
                            >Cancel</button>
                            <button
                                onClick={async () => {
                                    // Move unchecked discs to graveyard with comment
                                    for (const d of missingDiscs) {
                                        const comment = lostComment[d.id] || '';
                                        await updateDiscInDB({
                                            ...d,
                                            status: 'lost',
                                            lost_note: comment,
                                        });
                                    }
                                    setShowPlayRound(false);
                                    if (missingDiscs.length > 0) setView('graveyard');
                                }}
                                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black uppercase text-xs text-white shadow-lg transition"
                            >
                                {missingDiscs.length > 0 ? `Finish Round — Move ${missingDiscs.length} to Graveyard` : 'Finish Round ✓'}
                            </button>
                        </div>
                    </div>
                </div>
            );
        })()}

        </div>
    );
}
