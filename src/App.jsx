import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from './supabase';
import Chart from 'chart.js/auto';

const LOGO_URL = '/baggedup.logo.png'; // Your logo file

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
    // --- AUTH & UI STATES ---
    const [session, setSession] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [authMessage, setAuthMessage] = useState('');
    
    // --- CORE DATA ---
    const [settings, setSettings] = useState({ unit: 'ft', maxPower: 350, country: 'New Zealand' });
    const [activeBagId, setActiveBagId] = useState('');
    const [bags, setBags] = useState([]);
    const [discs, setDiscs] = useState([]);
    
    // --- UI NAVIGATION ---
    const [view, setView] = useState('active'); 
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chartMode, setChartMode] = useState('path'); // 'path' or 'matrix'
    const [editing, setEditing] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [dbQuery, setDbQuery] = useState('');
    const [suggestionPool, setSuggestionPool] = useState(null);
    const [communitySuggestions, setCommunitySuggestions] = useState([]);
    const [showCommunityAdd, setShowCommunityAdd] = useState(false);
    const [communityFormData, setCommunityFormData] = useState({name: '', brand: '', speed: 5, glide: 5, turn: 0, fade: 2.5});

    const chartRef = useRef(null);

    // --- AUTHENTICATION ---
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

    // --- DATABASE SYNCING ---
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
            const { data: cs } = await supabase.from('community_suggestions').select('*');
            if (cs) setCommunitySuggestions(cs);
        };
        loadData();
    }, [session]);

    // --- CLOUD MUTATIONS ---
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
        if (confirm('Are you sure you want to delete this bag? All discs in it will be moved to storage.')) {
            // Move all discs from this bag to storage (set bag_id to null)
            await supabase.from('discs').update({ bag_id: null }).eq('bag_id', id);
            // Delete the bag
            await supabase.from('bags').delete().eq('id', id);
            // Update local state
            const updatedBags = bags.filter(b => b.id !== id);
            setBags(updatedBags);
            // If deleted bag was active, switch to first available bag
            if (activeBagId === id && updatedBags.length > 0) {
                setActiveBagId(updatedBags[0].id);
            } else if (updatedBags.length === 0) {
                // Create default bag if none exist
                const { data: nb } = await supabase.from('bags').insert({ user_id: session.user.id, name: 'Main Bag' }).select().single();
                if (nb) { setBags([nb]); setActiveBagId(nb.id); }
            }
        }
    };

    const addDiscToDB = async (discObj) => {
        const isNotInFactory = !FACTORY_DB.some(d => d.Model.toLowerCase() === discObj.name.toLowerCase());
        
        // Save to community_suggestions if not in factory database
        if (isNotInFactory) {
            const alreadyInCommunity = communitySuggestions.some(cs => cs.name.toLowerCase() === discObj.name.toLowerCase() && cs.brand.toLowerCase() === (discObj.brand || '').toLowerCase());
            
            if (!alreadyInCommunity) {
                const communityPayload = {
                    name: discObj.name,
                    brand: discObj.brand || '',
                    speed: parseFloat(discObj.speed),
                    glide: parseFloat(discObj.glide),
                    turn: parseFloat(discObj.turn),
                    fade: parseFloat(discObj.fade)
                };
                try {
                    const { data: csData } = await supabase.from('community_suggestions').insert(communityPayload).select().single();
                    if (csData) {
                        setCommunitySuggestions([...communitySuggestions, csData]);
                    }
                } catch (err) {
                    console.log('Community suggestion already exists or error:', err);
                }
            }
        }
        
        const payload = { ...discObj, user_id: session.user.id };
        delete payload.id; 
        const { data } = await supabase.from('discs').insert(payload).select().single();
        if (data) setDiscs([...discs, data]);
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

    // --- PHYSICS & GAP ANALYSIS ---
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
            const p = i / 100; 
            const x = ((Math.sin(p * Math.PI * 0.75) * (s.turn * -10)) + (Math.pow(p, 2.5) * (s.fade * -8))) * Math.pow(p, 1.8);
            points.push({ x, y: settings.unit === 'm' ? p * s.dist * 0.3048 : p * s.dist });
        } return points;
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

    // --- CHART RENDERING ---
    useEffect(() => {
        if(!session) return;
        const filtered = discs.filter(d => {
            if (view === 'graveyard') return d.status === 'lost';
            if (view === 'favorites') return d.favorite;
            if (view === 'storage') return d.status === 'active' && !d.bag_id;
            return d.bag_id === activeBagId && d.status === 'active';
        });

        const canvas = document.getElementById('mainChart');
        if (canvas) {
            if (chartRef.current) chartRef.current.destroy();
            chartRef.current = new Chart(canvas.getContext('2d'), {
                type: 'scatter',
                data: { datasets: filtered.map(d => ({ 
                    label: d.name, 
                    data: chartMode === 'path' ? calculatePath(d) : [{x: getStats(d).stability, y: parseFloat(d.speed)}],
                    borderColor: d.color, backgroundColor: d.color, showLine: chartMode === 'path', 
                    pointRadius: chartMode === 'path' ? 0 : 8, borderDash: d.is_idea ? [5, 5] : [], opacity: d.is_idea ? 0.6 : 1, borderWidth: 3
                })) },
                options: { 
                    responsive: true, maintainAspectRatio: false, 
                    scales: { 
                        x: { min: chartMode==='path'?-100:-6, max: chartMode==='path'?100:6, reverse: chartMode!=='path', grid: { color: '#1e293b' } }, 
                        y: { 
                            min: 0, 
                            max: chartMode==='path'?(settings.unit==='m'?180:550):14, 
                            grid: { color: '#1e293b' },
                            ticks: chartMode === 'path' ? {} : { 
                                stepSize: 1,
                                callback: function(value) { return value; }
                            }
                        } 
                    }, 
                    plugins: { legend: { display: false } } 
                }
            });
        }
    }, [discs, activeBagId, view, session, settings, chartMode]);

    // --- AUTH RENDER ---
    if (!session) return (
        <div className="h-[100dvh] w-full flex items-center justify-center bg-[#0b0f1a] p-6">
            <div className="w-full max-w-md text-center">
                <img src={LOGO_URL} alt="BaggedUp Logo" className="h-48 w-48 mx-auto mb-8 object-contain" />
                {authMessage && <div className="p-4 mb-4 bg-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold uppercase">{authMessage}</div>}
                <form onSubmit={(e) => handleLogin(e, 'login')} className="space-y-4">
                    <input type="email" placeholder="EMAIL" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} className="w-full bg-slate-900 p-5 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500" />
                    <input type="password" placeholder="PASSWORD" value={authPassword} onChange={e=>setAuthPassword(e.target.value)} className="w-full bg-slate-900 p-5 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500" />
                    <button type="submit" className="w-full bg-orange-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl">Log In</button>
                    <button type="button" onClick={(e) => handleLogin(e, 'signup')} className="w-full text-orange-500 font-bold uppercase text-xs pt-2">Register New Account</button>
                </form>
            </div>
        </div>
    );

    return (
        <div className="h-[100dvh] w-full bg-[#0b0f1a] flex flex-col overflow-hidden text-slate-200">
            <style>{`
                .glass { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); }
                input[type="range"] { -webkit-appearance: none; background: #1e293b; height: 6px; border-radius: 10px; }
                input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%; background: #f97316; border: 2px solid #0b0f1a; }
            `}</style>

            {/* --- SIDEBAR OVERLAY --- */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-[100] flex">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-72 h-full bg-slate-900 border-r border-slate-800 p-8 flex flex-col gap-6">
                        <img src={LOGO_URL} alt="BaggedUp Logo" className="h-12 w-12 object-contain" />
                        {[
                            { id: 'active', label: 'My Bag', icon: '🎒' },
                            { id: 'storage', label: 'Storage', icon: '📦' },
                            { id: 'favorites', label: 'Collection', icon: '⭐' },
                            { id: 'graveyard', label: 'Lost & Found', icon: '🪦' }
                        ].map(item => (
                            <button key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); }} className={`flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs transition ${view === item.id ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>
                                <span className="text-xl">{item.icon}</span> {item.label}
                            </button>
                        ))}
                        <button onClick={() => { setShowSettings(true); setSidebarOpen(false); }} className="mt-auto flex items-center gap-4 p-4 text-slate-500 font-black uppercase text-xs">⚙️ Settings</button>
                        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-4 p-4 text-red-500 font-black uppercase text-xs">✕ Log Out</button>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-50 glass sticky top-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="text-2xl">☰</button>
                    <img src={LOGO_URL} alt="BaggedUp Logo" className="h-10 w-10 object-contain" />
                </div>
                <div className="bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700 flex items-center gap-2">
                    <select value={activeBagId} onChange={(e) => setActiveBagId(e.target.value)} className="bg-transparent text-[10px] font-black uppercase outline-none text-orange-500">
                        {bags.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                    <button onClick={() => {const n=prompt("Rename Bag:"); if(n) updateBagName(activeBagId, n);}} className="text-slate-500 text-xs">✎</button>
                </div>
                <button onClick={() => setShowSearch(true)} className="bg-orange-600 w-10 h-10 rounded-full font-black text-xl flex items-center justify-center shadow-lg">+</button>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-grow overflow-y-auto pb-24">
                
                {/* Gap Analysis Ticker */}
                {gapAnalysis.filter && view === 'active' && (
                    <div className="px-4 pt-4">
                        <button onClick={() => setSuggestionPool(FACTORY_DB.filter(gapAnalysis.filter).slice(0, 5))} className="w-full bg-blue-500/10 border border-blue-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-blue-400 animate-pulse">
                            {gapAnalysis.text} — View Suggestions
                        </button>
                    </div>
                )}

                {/* Chart Section */}
                <section className="p-4 lg:p-8">
                    <div className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800 p-4 shadow-2xl overflow-hidden">
                        <div className="flex bg-slate-800/50 p-1 rounded-2xl mb-4 w-full max-w-xs mx-auto">
                            <button onClick={() => setChartMode('path')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition ${chartMode === 'path' ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>Flight Path</button>
                            <button onClick={() => setChartMode('matrix')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition ${chartMode === 'matrix' ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>Stability</button>
                        </div>
                        <div className="h-[400px] lg:h-[700px] w-full"><canvas id="mainChart"></canvas></div>
                    </div>
                </section>

                {/* Inventory Cards */}
                <section className="px-4 lg:px-8 space-y-4 max-w-5xl mx-auto">
                    <h2 className="px-2 italic text-[10px] font-black uppercase text-slate-500 tracking-widest">{view} Inventory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {discs.filter(d => {
                            if(view === 'graveyard') return d.status === 'lost';
                            if(view === 'favorites') return d.favorite;
                            if(view === 'storage') return d.status === 'active' && !d.bag_id;
                            return d.bag_id === activeBagId && d.status === 'active';
                        }).map(d => (
                            <div key={d.id} className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] flex flex-col gap-4 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: d.color }} />
                                <div className="flex justify-between items-start">
                                    <div className="min-w-0 pr-4">
                                        <h4 className="font-black text-sm uppercase italic leading-none mb-1 truncate">{d.name} {d.aces > 0 && `🏆 ${d.aces}`}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase truncate">{d.brand} • {d.plastic || 'Premium'} • {d.weight}g</p>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        <button onClick={() => setEditing(d)} className="text-slate-500 hover:text-white transition">✎</button>
                                        <button onClick={() => deleteDiscInDB(d.id)} className="text-slate-500 hover:text-red-500 transition">✕</button>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-end">
                                    <div className="flex gap-2 text-center">
                                        {[d.speed, d.glide, d.turn, d.fade].map((val, i) => (
                                            <div key={i} className="bg-slate-800/50 px-2 py-1 rounded-lg"><div className="text-[7px] font-black text-slate-600 uppercase">{['S','G','T','F'][i]}</div><div className="text-[10px] font-black text-slate-300">{val}</div></div>
                                        ))}
                                    </div>
                                    {!d.is_idea && (
                                        <div className="flex-grow ml-6">
                                            <div className="flex justify-between text-[8px] font-black text-slate-700 uppercase mb-1"><span>New</span><span>Beat</span></div>
                                            <input type="range" min="0" max="1" step="0.05" value={d.wear} onChange={(e) => updateDiscInDB({...d, wear: parseFloat(e.target.value)})} className="w-full" />
                                        </div>
                                    )}
                                    {d.is_idea && <button onClick={() => updateDiscInDB({...d, is_idea: false})} className="bg-emerald-600 text-[8px] font-black uppercase px-3 py-1.5 rounded-full ml-4">Bought</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* --- SEARCH DIRECTORY --- */}
            {showSearch && !showCommunityAdd && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex flex-col pt-safe">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-black italic text-orange-500 uppercase">Search</h2>
                        <button onClick={() => { setShowSearch(false); setDbQuery(''); }} className="text-2xl">✕</button>
                    </div>
                    <input autoFocus placeholder="DISC MODEL..." value={dbQuery} onChange={e => setDbQuery(e.target.value)} className="w-full bg-slate-900 p-6 rounded-3xl border border-slate-800 font-black text-[16px] uppercase italic text-white mb-6 outline-none focus:border-orange-500" />
                    <div className="flex-grow overflow-y-auto space-y-3 pb-10">
                        {/* Factory Discs */}
                        {FACTORY_DB.filter(d => d.Model.toLowerCase().includes(dbQuery.toLowerCase())).map(d => (
                            <div key={d.Model} onClick={() => { addDiscToDB({name: d.Model, brand: d.Manufacturer, speed: d.Speed, glide: d.Glide, turn: d.Turn, fade: d.Fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random()*360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true}); setShowSearch(false); }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center cursor-pointer hover:border-orange-500 transition">
                                <div><div className="font-black uppercase italic text-lg">{d.Model}</div><div className="text-[10px] font-bold text-slate-500 uppercase">{d.Manufacturer} • {d.Speed}/{d.Glide}/{d.Turn}/{d.Fade}</div></div>
                                <div className="text-orange-500 font-black text-xl">+</div>
                            </div>
                        ))}
                        
                        {/* Community Suggestions */}
                        {communitySuggestions.filter(d => d.name.toLowerCase().includes(dbQuery.toLowerCase())).map(d => (
                            <div key={d.id} onClick={() => { addDiscToDB({name: d.name, brand: d.brand, speed: d.speed, glide: d.glide, turn: d.turn, fade: d.fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random()*360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true}); setShowSearch(false); }} className="p-6 bg-emerald-900/20 rounded-2xl border border-emerald-600/30 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition">
                                <div><div className="font-black uppercase italic text-lg text-emerald-400">{d.name}</div><div className="text-[10px] font-bold text-emerald-600 uppercase">{d.brand} • {d.speed}/{d.glide}/{d.turn}/{d.fade} • Community</div></div>
                                <div className="text-emerald-500 font-black text-xl">+</div>
                            </div>
                        ))}
                        
                        {/* Can't Find Button */}
                        {dbQuery && FACTORY_DB.filter(d => d.Model.toLowerCase().includes(dbQuery.toLowerCase())).length === 0 && communitySuggestions.filter(d => d.name.toLowerCase().includes(dbQuery.toLowerCase())).length === 0 && (
                            <button onClick={() => { setCommunityFormData({name: dbQuery, brand: '', speed: 5, glide: 5, turn: 0, fade: 2.5}); setShowCommunityAdd(true); }} className="w-full p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl text-blue-400 font-black uppercase text-sm hover:border-blue-500 transition">
                                Can't find your disc? Add to Global Directory
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* --- COMMUNITY ADD MODAL --- */}
            {showCommunityAdd && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex items-center justify-center overflow-y-auto">
                    <form onSubmit={async e => {
                        e.preventDefault();
                        addDiscToDB({...communityFormData, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random()*360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true});
                        setShowCommunityAdd(false);
                        setShowSearch(false);
                        setDbQuery('');
                        setCommunityFormData({name: '', brand: '', speed: 5, glide: 5, turn: 0, fade: 2.5});
                    }} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 w-full max-w-lg space-y-4 my-auto">
                        <div className="flex justify-between"><h3 className="text-2xl font-black italic uppercase text-blue-500">Add to Global Directory</h3><button type="button" onClick={()=>{ setShowCommunityAdd(false); }}>✕</button></div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Help the community by adding this disc! It will be available to all pilots.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" value={communityFormData.name} onChange={(e) => setCommunityFormData({...communityFormData, name: e.target.value})} placeholder="DISC MODEL" className="bg-slate-800 p-4 rounded-xl font-bold uppercase text-[16px] text-white outline-none"/>
                            <input type="text" value={communityFormData.brand} onChange={(e) => setCommunityFormData({...communityFormData, brand: e.target.value})} placeholder="MANUFACTURER" className="bg-slate-800 p-4 rounded-xl font-bold uppercase text-[16px] text-white outline-none"/>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            {['speed', 'glide', 'turn', 'fade'].map((l, i) => {
                                const constraints = {speed: {min: 1, max: 13}, glide: {min: 1, max: 7}, turn: {min: -5, max: 3}, fade: {min: 0, max: 4}};
                                const {min, max} = constraints[l];
                                return (<div key={l}><span className="text-[8px] font-black text-slate-500 uppercase">{['Spd','Gld','Trn','Fde'][i]}</span><input type="number" min={min} max={max} step="0.5" value={communityFormData[l]} onChange={(e) => setCommunityFormData({...communityFormData, [l]: parseFloat(e.target.value)})} className="bg-slate-800 p-3 rounded-xl font-black text-center w-full text-[16px]"/></div>);
                            })}
                        </div>
                        <button type="submit" className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl hover:bg-blue-700 transition">Add to Directory</button>
                        <button type="button" onClick={() => setShowCommunityAdd(false)} className="w-full py-3 text-slate-400 font-black uppercase text-xs hover:text-slate-300 transition">Cancel</button>
                    </form>
                </div>
            )}

            {/* --- GAP ANALYSIS SUGGESTIONS MODAL --- */}
            {suggestionPool && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex flex-col pt-safe">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-black italic text-blue-500 uppercase">Suggested Discs</h2>
                        <button onClick={() => setSuggestionPool(null)} className="text-2xl">✕</button>
                    </div>
                    <div className="flex-grow overflow-y-auto space-y-3 pb-10">
                        {suggestionPool.map(d => (
                            <div key={d.Model} onClick={() => { addDiscToDB({name: d.Model, brand: d.Manufacturer, speed: d.Speed, glide: d.Glide, turn: d.Turn, fade: d.Fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random()*360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true}); setSuggestionPool(null); }} className="p-6 bg-blue-900/20 rounded-2xl border border-blue-600/30 flex justify-between items-center cursor-pointer hover:border-blue-500 transition">
                                <div><div className="font-black uppercase italic text-lg text-blue-400">{d.Model}</div><div className="text-[10px] font-bold text-blue-600 uppercase">{d.Manufacturer} • {d.Speed}/{d.Glide}/{d.Turn}/{d.Fade}</div></div>
                                <div className="text-blue-500 font-black text-xl">+</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- FULL EDIT MODAL --- */}
            {editing && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex items-center justify-center overflow-y-auto">
                    <form onSubmit={e => {
                        e.preventDefault(); const fd = new FormData(e.target);
                        const distValue = parseFloat(fd.get('d'));
                        const savedDist = settings.unit === 'm' ? distValue / 0.3048 : distValue; // Convert meters back to feet for storage
                        updateDiscInDB({
                            ...editing, name: fd.get('n'), brand: fd.get('b'), plastic: fd.get('pl'), weight: fd.get('wt'), bag_id: fd.get('bag') || null, status: fd.get('lost') === 'on' ? 'lost' : 'active', 
                            speed: parseFloat(fd.get('s')), glide: parseFloat(fd.get('g')), turn: parseFloat(fd.get('t')), fade: parseFloat(fd.get('f')), color: fd.get('c'), 
                            max_dist: savedDist, aces: parseInt(fd.get('a')), favorite: fd.get('fav') === 'on', is_idea: false
                        });
                        setEditing(null);
                    }} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 w-full max-w-lg space-y-4 my-auto">
                        <div className="flex justify-between"><h3 className="text-2xl font-black italic uppercase text-orange-500">Edit Disc</h3><button type="button" onClick={()=>setEditing(null)}>✕</button></div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="n" defaultValue={editing.name} placeholder="MODEL" className="bg-slate-800 p-4 rounded-xl font-bold uppercase text-[16px] text-white outline-none"/>
                            <select name="bag" defaultValue={editing.bag_id || ''} className="bg-slate-800 p-4 rounded-xl text-[16px] text-white">
                                <option value="">Storage</option>
                                {bags.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="pl" defaultValue={editing.plastic} placeholder="PLASTIC" className="bg-slate-800 p-4 rounded-xl uppercase text-[16px] text-white"/>
                            <input name="wt" defaultValue={editing.weight} placeholder="WEIGHT" className="bg-slate-800 p-4 rounded-xl text-[16px] text-white"/>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            {['s','g','t','f'].map((l, i) => {
                                const constraints = {'s': {min: 1, max: 13}, 'g': {min: 1, max: 7}, 't': {min: -5, max: 3}, 'f': {min: 0, max: 4}};
                                const {min, max} = constraints[l];
                                return (<div key={l}><span className="text-[8px] font-black text-slate-500 uppercase">{['Spd','Gld','Trn','Fde'][i]}</span><input name={l} type="number" min={min} max={max} step="0.5" defaultValue={[editing.speed, editing.glide, editing.turn, editing.fade][i]} className="bg-slate-800 p-3 rounded-xl font-black text-center w-full text-[16px]"/></div>);
                            })}
                        </div>
                        <div className="bg-slate-800 p-4 rounded-xl">
                             <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-1"><span>Power Callibration</span><span className="text-orange-500">{(settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)).toFixed(0)}{settings.unit}</span></div>
                             <input name="d" type="range" min={settings.unit === 'm' ? 15 : 50} max={settings.unit === 'm' ? 198 : 650} step="1" defaultValue={settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)} className="w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800 p-3 rounded-xl"><span className="text-[8px] font-black text-slate-500 uppercase">Aces</span><input name="a" type="number" defaultValue={editing.aces || 0} className="bg-transparent font-black text-orange-500 w-full text-[16px]"/></div>
                            <div className="bg-slate-800 p-3 rounded-xl"><span className="text-[8px] font-black text-slate-500 uppercase">Path Color</span><input name="c" type="color" defaultValue={editing.color} className="w-full h-6 bg-transparent"/></div>
                        </div>
                        <div className="flex gap-2">
                            <label className="flex-1 bg-slate-800 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase text-slate-500"><input name="fav" type="checkbox" defaultChecked={editing.favorite} className="accent-orange-500 h-5 w-5"/>Collection</label>
                            <label className="flex-1 bg-red-900/20 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase text-red-500"><input name="lost" type="checkbox" defaultChecked={editing.status === 'lost'} className="accent-red-500 h-5 w-5"/>Lost Disc</label>
                        </div>
                        <button type="submit" className="w-full bg-orange-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl">Sync to Cloud</button>
                    </form>
                </div>
            )}

            {/* --- SETTINGS --- */}
            {showSettings && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex items-center justify-center">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 w-full max-w-md space-y-6">
                        <h2 className="text-2xl font-black italic uppercase text-orange-500">Pilot Settings</h2>
                        <div className="flex flex-col gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <span className="text-[10px] font-black uppercase text-slate-500">Home Territory</span>
                            <input value={settings.country || ''} onChange={(e) => setSettings({...settings, country: e.target.value})} className="bg-transparent font-black text-white uppercase outline-none"/>
                        </div>
                        <button onClick={() => setSettings({...settings, unit: settings.unit === 'ft' ? 'm' : 'ft'})} className="w-full bg-slate-800 p-5 rounded-2xl font-black text-xs uppercase flex justify-between"><span>Unit System</span><span className="text-blue-500">{settings.unit === 'ft' ? 'Feet' : 'Meters'}</span></button>
                        <div className="bg-slate-800 p-5 rounded-2xl space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>Global Max Power</span><span className="text-orange-500">{settings.maxPower}{settings.unit}</span></div>
                            <input type="range" min="100" max="600" step="10" value={settings.maxPower} onChange={(e) => setSettings({...settings, maxPower: Number(e.target.value)})} className="w-full" />
                        </div>
                        <button onClick={() => { saveSettings(settings); setShowSettings(false); }} className="w-full bg-orange-600 py-5 rounded-2xl font-black uppercase text-white shadow-xl">Save & Close</button>
                        <div className="space-y-2">
                            <h3 className="text-[10px] font-black uppercase text-slate-500">Your Bags</h3>
                            {bags.map(bag => (
                                <div key={bag.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl">
                                    <span className={`text-sm font-black uppercase ${bag.id === activeBagId ? 'text-orange-500' : 'text-slate-400'}`}>{bag.name}</span>
                                    {bags.length > 1 && (
                                        <button onClick={() => deleteBag(bag.id)} className="text-red-500 hover:text-red-400 transition text-xs font-black">✕</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button onClick={() => {const n=prompt("New Bag Name:"); if(n) createBag(n); setShowSettings(false);}} className="w-full py-4 text-xs font-black uppercase text-slate-500">Create New Bag</button>
                    </div>
                </div>
            )}
        </div>
    );
}