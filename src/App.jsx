import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from './supabase';
import Chart from 'chart.js/auto';

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

    const [settings, setSettings] = useState({ unit: 'ft', maxPower: 350, country: 'New Zealand' });
    const [activeBagId, setActiveBagId] = useState('');
    const [bags, setBags] = useState([]);
    const [discs, setDiscs] = useState([]);
    
    const [view, setView] = useState('active'); 
    const [editing, setEditing] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [roundStep, setRoundStep] = useState(0); 
    const [dbQuery, setDbQuery] = useState('');
    const [suggestionPool, setSuggestionPool] = useState(null);
    const [celebrate, setCelebrate] = useState(null);

    const fChartRef = useRef(null);
    const mChartRef = useRef(null);

    // --- AUTHENTICATION ---
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e, type) => {
        e.preventDefault();
        setAuthLoading(true);
        const { error } = type === 'signup' 
            ? await supabase.auth.signUp({ email: authEmail, password: authPassword })
            : await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) alert(error.message);
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setDiscs([]); setBags([]); setActiveBagId('');
        setShowSettings(false);
    };

    // --- DATABASE SYNCING ---
    useEffect(() => {
        if (!session?.user) return;
        const loadData = async () => {
            // Load Settings
            let { data: set } = await supabase.from('settings').select('*').eq('user_id', session.user.id).single();
            if (set) setSettings({ unit: set.unit, maxPower: set.max_power, country: set.country });
            else await supabase.from('settings').insert({ user_id: session.user.id });

            // Load Bags
            const { data: b } = await supabase.from('bags').select('*');
            if (b && b.length > 0) { setBags(b); setActiveBagId(b[0].id); }
            else { 
                const { data: newBag } = await supabase.from('bags').insert({ user_id: session.user.id, name: 'Tour Bag' }).select().single();
                setBags([newBag]); setActiveBagId(newBag.id);
            }

            // Load Discs
            const { data: d } = await supabase.from('discs').select('*');
            if (d) setDiscs(d);
        };
        loadData();
    }, [session]);

    // --- CLOUD MUTATIONS ---
    const saveSettings = async (newSettings) => {
        setSettings(newSettings);
        await supabase.from('settings').update({ unit: newSettings.unit, max_power: newSettings.maxPower, country: newSettings.country }).eq('user_id', session.user.id);
    };

    const createBag = async (name) => {
        const { data } = await supabase.from('bags').insert({ user_id: session.user.id, name }).select().single();
        if (data) { setBags([...bags, data]); setActiveBagId(data.id); setView('active'); }
    };

    const updateBagName = async (id, name) => {
        setBags(bags.map(b => b.id === id ? { ...b, name } : b));
        await supabase.from('bags').update({ name }).eq('id', id);
    };

    const addDiscToDB = async (discObj) => {
        const payload = { ...discObj, user_id: session.user.id };
        delete payload.id; 
        const { data } = await supabase.from('discs').insert(payload).select().single();
        if (data) setDiscs([...discs, data]);
    };

    const updateDiscInDB = async (updatedDisc) => {
        setDiscs(discs.map(d => d.id === updatedDisc.id ? updatedDisc : d));
        const payload = { ...updatedDisc };
        delete payload.id; delete payload.user_id; delete payload.created_at;
        await supabase.from('discs').update(payload).eq('id', updatedDisc.id);
    };

    const deleteDiscInDB = async (id) => {
        setDiscs(discs.filter(d => d.id !== id));
        await supabase.from('discs').delete().eq('id', id);
    };

    // --- PHYSICS & LOGIC ---
    const getStats = (d) => {
        const w = parseFloat(d.wear) || 0;
        const turn = parseFloat(d.turn) - (w * 4.5);
        const fade = Math.max(0, parseFloat(d.fade) * (1 - w * 1.3));
        const dist = d.max_dist ? parseFloat(d.max_dist) : (parseFloat(settings.maxPower) * (0.4 + (parseFloat(d.speed)/12 * 0.6)));
        return { turn, fade, stability: turn + fade, dist };
    };

    const calculatePath = (d) => {
        const s = getStats(d); const points = [];
        for (let i = 0; i <= 100; i++) {
            const p = i / 100; const x = ((Math.sin(p * Math.PI * 0.75) * (s.turn * -12)) + (Math.pow(p, 3) * (s.fade * -18))) * Math.pow(p, 2.5);
            points.push({ x, y: settings.unit === 'm' ? p * s.dist * 0.3048 : p * s.dist });
        } return points;
    };

    const gapAnalysis = useMemo(() => {
        const active = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
        if (active.length === 0) return { text: "Bag is Empty", filter: (d) => true };
        const hasOSApproach = active.some(d => d.speed <= 4 && parseFloat(d.fade) >= 2.5);
        const hasUSMid = active.some(d => d.speed >= 4 && d.speed <= 6 && parseFloat(d.turn) <= -1.5);
        const hasOSDriver = active.some(d => d.speed >= 9 && (parseFloat(d.turn) + parseFloat(d.fade)) >= 3.5);

        if (!hasOSApproach) return { text: "Missing: OS Approach", filter: (d) => d.Speed <= 4 && d.Fade >= 2.5 };
        if (!hasUSMid) return { text: "Missing: US Midrange", filter: (d) => d.Speed >= 4 && d.Speed <= 6 && d.Turn <= -2 };
        if (!hasOSDriver) return { text: "Missing: OS Utility", filter: (d) => d.Speed >= 9 && (d.Turn + d.Fade) >= 3.5 };
        return { text: "Optimized", filter: null };
    }, [discs, activeBagId]);

    // --- CHART RENDERING ---
    useEffect(() => {
        if(!session) return;
        const filtered = discs.filter(d => {
            if (view === 'graveyard') return d.status === 'lost';
            if (view === 'favorites') return d.favorite;
            if (view === 'storage') return d.status === 'active' && !d.bag_id;
            return d.bag_id === activeBagId && d.status === 'active';
        });

        const fCanvas = document.getElementById('fChart');
        const mCanvas = document.getElementById('mChart');

        if (fCanvas && mCanvas) {
            if (fChartRef.current) fChartRef.current.destroy();
            if (mChartRef.current) mChartRef.current.destroy();

            const chartConfig = (id) => ({
                type: 'scatter',
                data: { datasets: filtered.map(d => ({ 
                    label: d.name, data: id === 'fChart' ? calculatePath(d) : [{x: getStats(d).stability, y: parseFloat(d.speed)}],
                    borderColor: d.color, backgroundColor: d.color, showLine: id==='fChart', pointRadius: id==='fChart'?0:8, borderDash: d.is_idea ? [5, 5] : [], opacity: d.is_idea ? 0.6 : 1, borderWidth: 3
                })) },
                options: { responsive: true, maintainAspectRatio: false, scales: { x: { min: id==='fChart'?-100:-6, max: id==='fChart'?100:6, reverse: id!=='fChart', grid: { color: '#1e293b' } }, y: { min: 0, max: id==='fChart'?(settings.unit==='m'?180:550):14, grid: { color: '#1e293b' } } }, plugins: { legend: { display: false } } }
            });

            fChartRef.current = new Chart(fCanvas.getContext('2d'), chartConfig('fChart'));
            mChartRef.current = new Chart(mCanvas.getContext('2d'), chartConfig('mChart'));
        }
    }, [discs, activeBagId, view, session, settings]);

    // --- RENDER LOGIN ---
    if (!session) return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#0b0f1a]">
            <div className="bg-slate-900 p-16 lg:p-20 rounded-[4rem] border border-slate-800 w-full max-w-xl text-center shadow-2xl">
                <div className="text-8xl mb-6 italic select-none font-black" style={{background: 'linear-gradient(135deg, #ff6600, #ff9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>B</div>
                <h1 className="text-5xl font-black italic text-white mb-2 uppercase tracking-tighter">BaggedUp</h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] mb-10 tracking-widest leading-none">Cloud Authentication</p>
                <form onSubmit={(e) => handleLogin(e, 'login')} className="space-y-4 mb-6">
                    <input type="email" placeholder="EMAIL" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} required className="w-full bg-slate-800 p-6 rounded-[2rem] text-center font-black text-sm uppercase outline-none focus:border-[#ff6600] border-2 border-transparent transition-all text-white"/>
                    <input type="password" placeholder="PASSWORD" value={authPassword} onChange={e=>setAuthPassword(e.target.value)} required className="w-full bg-slate-800 p-6 rounded-[2rem] text-center font-black text-sm uppercase outline-none focus:border-[#ff6600] border-2 border-transparent transition-all text-white"/>
                    <button type="submit" disabled={authLoading} className="w-full bg-[#ff6600] py-6 rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl hover:bg-orange-500 transition">Log In</button>
                    <button type="button" onClick={(e) => handleLogin(e, 'signup')} disabled={authLoading} className="w-full bg-transparent text-[#ff6600] py-4 font-black uppercase text-xs hover:text-white transition">Or Register New Account</button>
                </form>
            </div>
        </div>
    );

    // --- RENDER APP ---
    return (
        <div className="flex h-screen w-screen bg-[#0b0f1a] overflow-hidden text-slate-200 font-sans antialiased">
            <style>{`
                ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
                .chart-wrapper { position: relative; height: 350px; width: 100%; background: rgba(15, 23, 42, 0.4); border-radius: 2rem; border: 1px solid rgba(51, 65, 85, 0.3); padding: 1rem; }
                @media (min-width: 1024px) { .chart-wrapper { height: calc(100vh - 180px); padding: 2rem; } }
                input[type="range"] { -webkit-appearance: none; background: #1e293b; height: 6px; border-radius: 10px; }
                input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%; background: #ff6600; cursor: pointer; border: 2px solid #0b0f1a; }
            `}</style>
            
            <nav className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-10 gap-10 z-30 shrink-0">
                <div className="text-3xl italic select-none font-black" style={{background: 'linear-gradient(135deg, #ff6600, #ff9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>B</div>
                <button onClick={() => setView('active')} className={`p-3 rounded-2xl transition ${view === 'active' ? 'bg-[#ff6600]' : 'text-slate-500 hover:text-white'}`}>🎒</button>
                <button onClick={() => setView('storage')} className={`p-3 rounded-2xl transition ${view === 'storage' ? 'bg-blue-600' : 'text-slate-500 hover:text-white'}`}>📦</button>
                <button onClick={() => setView('favorites')} className={`p-3 rounded-2xl transition ${view === 'favorites' ? 'bg-amber-500' : 'text-slate-500 hover:text-white'}`}>⭐</button>
                <button onClick={() => setView('graveyard')} className={`p-3 rounded-2xl transition ${view === 'graveyard' ? 'bg-red-600' : 'text-slate-500 hover:text-white'}`}>🪦</button>
                <button onClick={() => setShowSettings(true)} className="mt-auto p-3 text-slate-600 hover:text-white transition">⚙️</button>
            </nav>

            <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 lg:px-8 bg-[#0b0f1a]/80 backdrop-blur-md z-20 sticky top-0 overflow-x-auto whitespace-nowrap">
                    <div className="flex gap-4 items-center">
                        <div className="bg-slate-900 px-4 py-1.5 rounded-full border border-slate-700 flex items-center gap-3">
                            <select value={activeBagId} onChange={(e) => {setActiveBagId(e.target.value); setView('active');}} className="bg-transparent text-[10px] font-black uppercase outline-none text-[#ff6600]">
                                {bags.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                            <button onClick={() => {const n=prompt("Rename Bag:"); if(n) updateBagName(activeBagId, n);}} className="text-slate-500 hover:text-white transition text-xs">✎</button>
                        </div>
                        <button onClick={() => {const n=prompt("New Bag Name:"); if(n) createBag(n);}} className="text-[9px] font-black text-slate-500 uppercase border border-slate-800 px-4 py-1.5 rounded-full hover:bg-slate-800 transition">New Bag</button>
                        <button onClick={() => setRoundStep(1)} className="bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase hover:bg-emerald-600 hover:text-white transition">Play Round</button>
                        {gapAnalysis.filter && view === 'active' && (
                            <button onClick={() => setSuggestionPool(FACTORY_DB.filter(gapAnalysis.filter).slice(0, 5))} className="animate-pulse text-[9px] font-black text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20 uppercase whitespace-nowrap">
                                {gapAnalysis.text}
                            </button>
                        )}
                    </div>
                    <button onClick={() => setShowSearch(true)} className="bg-[#ff6600] px-6 py-2 rounded-full text-[10px] font-black uppercase shadow-xl hover:bg-orange-500 transition tracking-widest shrink-0 ml-4">Add a Disc</button>
                </header>
                <main className="flex-grow p-6 lg:p-10 flex flex-col lg:flex-row gap-8 overflow-y-auto">
                    <div className="chart-wrapper shadow-2xl"><canvas id="fChart"></canvas></div>
                    <div className="chart-wrapper shadow-2xl"><canvas id="mChart"></canvas></div>
                </main>
            </div>

            <aside className="hidden xl:flex w-[400px] bg-[#0f172a] border-l border-slate-800 flex-col overflow-hidden shrink-0">
                <div className="p-8 border-b border-slate-800 bg-[#0b0f1a]/30 italic text-xs font-black uppercase text-slate-500 tracking-widest">{view.toUpperCase()} Inventory</div>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                    {discs.filter(d => {
                        if(view === 'graveyard') return d.status === 'lost';
                        if(view === 'favorites') return d.favorite;
                        if(view === 'storage') return d.status === 'active' && !d.bag_id;
                        return d.bag_id === activeBagId && d.status === 'active';
                    }).map(d => (
                        <div key={d.id} className={`bg-slate-800/40 p-5 rounded-[2.5rem] border border-slate-800 transition hover:border-slate-700 shadow-sm ${d.is_idea ? 'opacity-60 border-dashed' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col min-w-0">
                                    <span className="font-black text-sm uppercase italic truncate leading-none" style={{color: d.color}}>{d.name} {d.aces > 0 && `🏆 ${d.aces}`}</span>
                                    <span className="text-[9px] text-slate-500 font-bold uppercase mt-1 italic leading-tight">{d.plastic || 'Factory'} • {d.weight ? d.weight + 'g' : '175g'}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    {view === 'graveyard' ? (
                                        <button onClick={() => setEditing(d)} className="text-[8px] bg-emerald-600 text-white px-3 py-1 rounded-lg font-black uppercase shadow-lg hover:bg-emerald-500">RECOVER</button>
                                    ) : d.is_idea ? (
                                        <a href={`https://www.google.com/search?q=buy+${d.brand}+${d.name}+${settings.country}`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 p-1 hover:text-white">🛒</a>
                                    ) : (
                                        <button onClick={() => setEditing(d)} className="text-xs text-slate-500 hover:text-white transition p-1">✎</button>
                                    )}
                                    <button onClick={() => deleteDiscInDB(d.id)} className="text-xs text-slate-500 hover:text-red-500 transition p-1">✕</button>
                                </div>
                            </div>
                            {d.lost_note && d.status === 'lost' && <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-xl mb-3 text-[9px] text-red-200 font-bold uppercase">LOST @ {d.lost_note}</div>}
                            {!d.is_idea && d.status !== 'lost' && (
                                <div className="mt-2"><div className="flex justify-between text-[8px] font-black text-slate-700 uppercase mb-1"><span>New</span><span>Beaten</span></div>
                                <input type="range" min="0" max="1" step="0.05" value={d.wear} onChange={(e) => updateDiscInDB({...d, wear: parseFloat(e.target.value)})} className="w-full" /></div>
                            )}
                            {d.is_idea && <button onClick={() => addDiscToDB({...d, is_idea: false})} className="w-full py-2 mt-2 bg-emerald-600/20 text-emerald-400 rounded-xl text-[9px] font-black uppercase hover:bg-emerald-500 hover:text-white transition">Claim Ownership</button>}
                        </div>
                    ))}
                </div>
            </aside>

            {editing && (
                <div className="fixed inset-0 bg-black/95 z-[600] flex items-center justify-center p-4 backdrop-blur-xl">
                    <form onSubmit={e => {
                        e.preventDefault(); const fd = new FormData(e.target);
                        const wasLost = editing.status === 'lost';
                        updateDiscInDB({
                            ...editing, name: fd.get('n'), brand: fd.get('b'), plastic: fd.get('pl'), weight: fd.get('wt'), bag_id: fd.get('bag') || null, status: 'active', 
                            speed: parseFloat(fd.get('s')), glide: parseFloat(fd.get('g')), turn: parseFloat(fd.get('t')), fade: parseFloat(fd.get('f')), color: fd.get('c'), 
                            max_dist: parseFloat(fd.get('d')), aces: parseInt(fd.get('a')), favorite: fd.get('fav') === 'on', is_idea: false
                        });
                        setEditing(null);
                        if (wasLost) { setCelebrate(editing.name); setTimeout(() => setCelebrate(null), 3000); }
                    }} className="bg-slate-900 p-10 lg:p-14 rounded-[4rem] border border-slate-800 w-full max-w-lg space-y-6 shadow-2xl">
                        <h3 className="text-3xl font-black italic uppercase text-[#ff6600] leading-none">Calibration</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="n" defaultValue={editing.name} className="bg-slate-800 p-4 rounded-2xl outline-none font-bold uppercase text-xs border-2 border-transparent focus:border-[#ff6600] text-white"/>
                            <select name="bag" defaultValue={editing.bag_id || ''} className="bg-slate-800 p-4 rounded-2xl outline-none uppercase text-xs text-white border border-slate-700">
                                <option value="">Move to Storage</option>
                                {bags.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="pl" defaultValue={editing.plastic} placeholder="PLASTIC" className="bg-slate-800 p-4 rounded-2xl outline-none uppercase text-[10px] font-bold text-white border border-slate-700"/>
                            <input name="wt" defaultValue={editing.weight} placeholder="WEIGHT (G)" className="bg-slate-800 p-4 rounded-2xl outline-none uppercase text-[10px] font-bold text-white border border-slate-700"/>
                        </div>
                        <div className="grid grid-cols-4 gap-3 text-center">
                            {['s','g','t','f'].map((l, i) => (<div key={l}><span className="text-[8px] font-black text-slate-500 uppercase mb-1 block">{['Spd','Gld','Trn','Fde'][i]}</span><input name={l} defaultValue={[editing.speed, editing.glide, editing.turn, editing.fade][i]} className="bg-slate-800 p-3 rounded-2xl font-black text-center w-full border border-slate-700 text-white"/></div>))}
                        </div>
                        <div className="bg-slate-800 p-6 rounded-[2rem] border border-slate-700">
                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest italic"><span>Power Cal</span><span className="text-[#ff6600] font-black">{(settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)).toFixed(0)}{settings.unit}</span></div>
                            <input name="d" type="range" min="50" max="650" step="10" defaultValue={editing.max_dist || getStats(editing).dist} className="w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800 p-4 rounded-2xl"><span className="text-[9px] font-black text-slate-500 mb-1 block italic">Aces</span><input name="a" type="number" defaultValue={editing.aces || 0} className="bg-transparent font-black text-amber-500 outline-none w-full text-lg leading-none"/></div>
                            <div className="bg-slate-800 p-4 rounded-2xl"><span className="text-[9px] font-black text-slate-500 mb-1 block italic">Path Color</span><input name="c" type="color" defaultValue={editing.color} className="bg-transparent w-full h-8 cursor-pointer shadow-inner border-none"/></div>
                        </div>
                        <label className="flex items-center gap-4 bg-slate-800 p-5 rounded-2xl cursor-pointer text-[10px] uppercase font-black text-slate-500"><input name="fav" type="checkbox" defaultChecked={editing.favorite} className="w-6 h-6 accent-[#ff6600] rounded-lg"/><span>Star Collection</span></label>
                        <button type="submit" className="w-full bg-[#ff6600] py-5 rounded-[2rem] font-black uppercase text-xs shadow-xl active:scale-95 transition">Sync to Cloud</button>
                        <button type="button" onClick={() => setEditing(null)} className="w-full text-[10px] font-black text-slate-600 uppercase hover:text-white">Cancel</button>
                    </form>
                </div>
            )}

            {showSearch && (
                <div className="fixed inset-0 bg-black/95 z-[600] p-10 flex flex-col items-center backdrop-blur-md">
                    <div className="max-w-2xl w-full h-full flex flex-col">
                        <div className="flex justify-between items-center mb-10 text-[#ff6600] font-black italic text-4xl uppercase"><span>Directory</span><button onClick={() => setShowSearch(false)} className="text-slate-500 text-2xl font-black hover:text-white">✕</button></div>
                        <input autoFocus placeholder="SEARCH MODELS..." onChange={e => setDbQuery(e.target.value)} className="w-full bg-slate-900 p-8 rounded-[2.5rem] border border-slate-700 font-black text-2xl mb-8 outline-none uppercase italic focus:border-[#ff6600] text-white shadow-2xl"/>
                        <div className="space-y-4 overflow-y-auto">
                            {FACTORY_DB.filter(d => d.Model.toLowerCase().includes(dbQuery.toLowerCase())).map(d => (
                                <div key={d.Model} onClick={() => { addDiscToDB({name: d.Model, brand: d.Manufacturer, speed: d.Speed, glide: d.Glide, turn: d.Turn, fade: d.Fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random()*360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true}); setShowSearch(false); }} className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 hover:bg-orange-600/10 cursor-pointer flex justify-between items-center transition-all group shadow-sm">
                                    <div><div className="font-black uppercase italic text-lg leading-tight mb-1 italic">{d.Manufacturer} {d.Model}</div><div className="text-[10px] font-bold text-slate-500 uppercase">{d.Speed}/{d.Glide}/{d.Turn}/{d.Fade}</div></div>
                                    <div className="bg-orange-600/10 text-orange-500 px-6 py-2 rounded-full font-black text-[10px] border border-orange-500/20 group-hover:bg-orange-600 group-hover:text-white transition-all">Add Idea</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showSettings && (
                <div className="fixed inset-0 bg-black/95 z-[500] flex items-center justify-center p-10 backdrop-blur-md">
                    <div className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 w-full max-w-md space-y-6 shadow-2xl">
                        <h2 className="text-3xl font-black italic uppercase text-[#ff6600] tracking-tighter">Pilot Settings</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2 bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-sm"><span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Home Territory</span><input value={settings.country || ''} onChange={(e) => setSettings({...settings, country: e.target.value})} className="bg-slate-700 p-3 rounded-xl font-black text-xs uppercase outline-none focus:ring-2 ring-[#ff6600] mt-1 text-white"/></div>
                            <button onClick={() => setSettings({...settings, unit: settings.unit === 'ft' ? 'm' : 'ft'})} className="w-full bg-slate-800 p-6 rounded-3xl font-black text-xs uppercase flex justify-between border border-slate-700 shadow-sm"><span>System</span><span className="text-blue-500">{settings.unit === 'ft' ? 'Feet' : 'Meters'}</span></button>
                            <div className="bg-slate-800 p-6 rounded-[2rem] space-y-4 border border-slate-700">
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none italic italic"><span>My max distance (Flat 12 Speed)</span><span className="text-[#ff6600] font-black">{(settings.unit === 'm' ? (settings.maxPower || 350) * 0.3048 : (settings.maxPower || 350)).toFixed(0)}{settings.unit}</span></div>
                                <input type="range" min="100" max="600" step="10" value={settings.maxPower || 350} onChange={(e) => setSettings({...settings, maxPower: Number(e.target.value) || 350})} className="w-full" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button onClick={handleLogout} className="w-1/3 bg-red-900/40 text-red-500 py-4 rounded-[2rem] font-black uppercase text-[10px] border border-red-500/30 hover:bg-red-600 hover:text-white transition">Log Out</button>
                            <button onClick={() => { saveSettings(settings); setShowSettings(false); }} className="w-2/3 bg-[#ff6600] py-4 rounded-[2rem] font-black uppercase text-xs active:scale-95 transition shadow-xl">Save to Cloud</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}