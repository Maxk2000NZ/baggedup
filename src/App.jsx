import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from './supabase';
import Chart from 'chart.js/auto';

const LOGO_URL = '/baggedup.logo.png';
const APP_VERSION = 'v29';

const FACTORY_DB = [
    // ── Original entries ──
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
    {Manufacturer:"Westside",Model:"Harp",Speed:4,Glide:3,Turn:0,Fade:3},
    // ── Innova additions ──
    {Manufacturer:"Innova",Model:"Ape",Speed:13,Glide:5,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"Archon",Speed:11,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Innova",Model:"Beast",Speed:10,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Innova",Model:"Charger",Speed:12,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"Colossus",Speed:14,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Innova",Model:"Corvette",Speed:14,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"Daedalus",Speed:13,Glide:6,Turn:-3,Fade:2},
    {Manufacturer:"Innova",Model:"Dominator",Speed:13,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"Gorgon",Speed:10,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Innova",Model:"Grove",Speed:13,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Innova",Model:"Juggernaut",Speed:12,Glide:4,Turn:1,Fade:4},
    {Manufacturer:"Innova",Model:"Katana",Speed:13,Glide:5,Turn:-3,Fade:3},
    {Manufacturer:"Innova",Model:"Krait",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"Max",Speed:11,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Monster",Speed:10,Glide:3,Turn:0,Fade:5},
    {Manufacturer:"Innova",Model:"Mystere",Speed:11,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Innova",Model:"Orc",Speed:11,Glide:4,Turn:-1,Fade:3},
    {Manufacturer:"Innova",Model:"Sidewinder",Speed:9,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"Innova",Model:"Starfire",Speed:10,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Teedevil",Speed:12,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"TeeRex",Speed:11,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"Viking",Speed:9,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"Innova",Model:"Vulcan",Speed:13,Glide:5,Turn:-4,Fade:2},
    {Manufacturer:"Innova",Model:"Wahoo",Speed:12,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Innova",Model:"XCaliber",Speed:12,Glide:5,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"Archangel",Speed:8,Glide:6,Turn:-4,Fade:1},
    {Manufacturer:"Innova",Model:"Teebird3",Speed:8,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"TL",Speed:7,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"TL3",Speed:8,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"Banshee",Speed:7,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Leopard",Speed:6,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Innova",Model:"Cheetah",Speed:6,Glide:4,Turn:-2,Fade:2},
    {Manufacturer:"Innova",Model:"IT",Speed:7,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Innova",Model:"Hawkeye",Speed:7,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"Gazelle",Speed:6,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Viper",Speed:6,Glide:4,Turn:1,Fade:5},
    {Manufacturer:"Innova",Model:"Atlas",Speed:5,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Innova",Model:"Avatar",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Mako",Speed:4,Glide:5,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Roc",Speed:4,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Gremlin",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Gator",Speed:5,Glide:2,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"Gator3",Speed:5,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Shark",Speed:4,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Shark3",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Caiman",Speed:5.5,Glide:2,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"Panther",Speed:5,Glide:4,Turn:-2,Fade:1},
    {Manufacturer:"Innova",Model:"Aviar Driver",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Aero",Speed:3,Glide:6,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Animal",Speed:2,Glide:1,Turn:0,Fade:1},
    {Manufacturer:"Innova",Model:"Birdie",Speed:1,Glide:2,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Bullfrog",Speed:3,Glide:1,Turn:0,Fade:1},
    {Manufacturer:"Innova",Model:"Classic Aviar",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Colt",Speed:3,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"NS Firefly",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Innova",Model:"Hydra",Speed:3,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Invader",Speed:3,Glide:2,Turn:0,Fade:1},
    {Manufacturer:"Innova",Model:"KC Aviar",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Mirage",Speed:3,Glide:4,Turn:-3,Fade:0},
    {Manufacturer:"Innova",Model:"Nova",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Polecat",Speed:1,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Rat",Speed:4,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Rhyno",Speed:2,Glide:1,Turn:0,Fade:3},
    {Manufacturer:"Innova",Model:"Stud",Speed:3,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Innova",Model:"Toro",Speed:4,Glide:2,Turn:0,Fade:4},
    {Manufacturer:"Innova",Model:"Wedge",Speed:3.5,Glide:3,Turn:-3,Fade:1},
    {Manufacturer:"Innova",Model:"Whale",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Innova",Model:"XD",Speed:3,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Innova",Model:"Xero",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Innova",Model:"Yeti Pro Aviar",Speed:2,Glide:3,Turn:0,Fade:1},
    // ── Discraft additions ──
    {Manufacturer:"Discraft",Model:"Venom",Speed:13,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Crank",Speed:13,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Discraft",Model:"Flash",Speed:10,Glide:5,Turn:-2,Fade:3},
    {Manufacturer:"Discraft",Model:"Force",Speed:12,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Punisher",Speed:12,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Surge",Speed:11,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discraft",Model:"Surge SS",Speed:11,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Discraft",Model:"Drive",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discraft",Model:"Pulse",Speed:11,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Discraft",Model:"Heat",Speed:9,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Discraft",Model:"XL",Speed:7,Glide:4,Turn:-2,Fade:1},
    {Manufacturer:"Discraft",Model:"XS",Speed:8,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Cicada",Speed:7,Glide:6,Turn:-1,Fade:1},
    {Manufacturer:"Discraft",Model:"Cyclone",Speed:7,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"Discraft",Model:"Impact",Speed:6,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Discraft",Model:"Mantis",Speed:8,Glide:4,Turn:-2,Fade:2},
    {Manufacturer:"Discraft",Model:"Passion",Speed:8,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Discraft",Model:"Predator",Speed:9,Glide:4,Turn:1,Fade:4},
    {Manufacturer:"Discraft",Model:"Raptor",Speed:9,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Reaper",Speed:8,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Discraft",Model:"Stalker",Speed:7,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discraft",Model:"Sting",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discraft",Model:"Tracker",Speed:8,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discraft",Model:"Vulture",Speed:10,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"Xpress",Speed:8,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"Discraft",Model:"Zombee",Speed:6,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Discraft",Model:"Buzzz OS",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Buzzz SS",Speed:5,Glide:4,Turn:-2,Fade:1},
    {Manufacturer:"Discraft",Model:"Comet",Speed:4,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discraft",Model:"Drone",Speed:5,Glide:3,Turn:1,Fade:4},
    {Manufacturer:"Discraft",Model:"Hawk",Speed:4,Glide:3,Turn:-2,Fade:2},
    {Manufacturer:"Discraft",Model:"Hornet",Speed:5,Glide:5,Turn:0,Fade:4},
    {Manufacturer:"Discraft",Model:"Malta",Speed:5,Glide:4,Turn:1,Fade:3},
    {Manufacturer:"Discraft",Model:"Sol",Speed:4,Glide:5,Turn:-3,Fade:0},
    {Manufacturer:"Discraft",Model:"Stratus",Speed:5,Glide:4,Turn:-4,Fade:1},
    {Manufacturer:"Discraft",Model:"Swarm",Speed:5,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Discraft",Model:"Wasp",Speed:5,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"APX",Speed:2,Glide:2,Turn:-1,Fade:1},
    {Manufacturer:"Discraft",Model:"Banger-GT",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discraft",Model:"Challenger",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"Fierce",Speed:3,Glide:4,Turn:-2,Fade:0},
    {Manufacturer:"Discraft",Model:"Focus",Speed:2,Glide:2,Turn:-1,Fade:2},
    {Manufacturer:"Discraft",Model:"Kratos",Speed:3,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Discraft",Model:"Magnet",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"Putt'r",Speed:2,Glide:2,Turn:-1,Fade:1},
    {Manufacturer:"Discraft",Model:"Rattler",Speed:2,Glide:2,Turn:-2,Fade:1},
    {Manufacturer:"Discraft",Model:"Ringer",Speed:4,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Discraft",Model:"Roach",Speed:2,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Discraft",Model:"Zone OS",Speed:4,Glide:2,Turn:1,Fade:5},
    // ── Axiom additions ──
    {Manufacturer:"Axiom",Model:"Tantrum",Speed:14.5,Glide:5,Turn:-1.5,Fade:3},
    {Manufacturer:"Axiom",Model:"Panic",Speed:13,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Axiom",Model:"Mayhem",Speed:13,Glide:5,Turn:-1.5,Fade:2},
    {Manufacturer:"Axiom",Model:"Tenacity",Speed:13,Glide:5,Turn:-2.5,Fade:2},
    {Manufacturer:"Axiom",Model:"Defy",Speed:11,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Axiom",Model:"Orbital",Speed:11,Glide:5,Turn:-4,Fade:1},
    {Manufacturer:"Axiom",Model:"Fireball",Speed:9,Glide:3.5,Turn:0,Fade:3.5},
    {Manufacturer:"Axiom",Model:"Wrath",Speed:9,Glide:4.5,Turn:-0.5,Fade:2},
    {Manufacturer:"Axiom",Model:"Virus",Speed:9,Glide:5,Turn:-3.5,Fade:1},
    {Manufacturer:"Axiom",Model:"Rhythm",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Axiom",Model:"Clash",Speed:6,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"Axiom",Model:"Inspire",Speed:6,Glide:5,Turn:-2,Fade:1.5},
    {Manufacturer:"Axiom",Model:"Alias",Speed:4,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Axiom",Model:"Theory",Speed:4,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"Axiom",Model:"Atom",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Axiom",Model:"Anode",Speed:2.5,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Axiom",Model:"Ion",Speed:2.5,Glide:3,Turn:0,Fade:1.5},
    {Manufacturer:"Axiom",Model:"Spin",Speed:2.5,Glide:4,Turn:-2,Fade:0},
    {Manufacturer:"Axiom",Model:"Tempo",Speed:4,Glide:4,Turn:0,Fade:2.5},
    // ── MVP additions ──
    {Manufacturer:"MVP",Model:"Nitro",Speed:13,Glide:4,Turn:-0.5,Fade:3},
    {Manufacturer:"MVP",Model:"Energy",Speed:13,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"MVP",Model:"Catalyst",Speed:13,Glide:5.5,Turn:-2,Fade:2},
    {Manufacturer:"MVP",Model:"Octane",Speed:13,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"MVP",Model:"Dimension",Speed:14.5,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"MVP",Model:"Zenith",Speed:11,Glide:5,Turn:-0.5,Fade:2},
    {Manufacturer:"MVP",Model:"Tesla",Speed:9,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"MVP",Model:"Inertia",Speed:9,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"MVP",Model:"Impulse",Speed:9,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"MVP",Model:"Resistor",Speed:6.5,Glide:4,Turn:0,Fade:3.5},
    {Manufacturer:"MVP",Model:"Servo",Speed:6.5,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"MVP",Model:"Matrix",Speed:5,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"MVP",Model:"Axis",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"MVP",Model:"Vector",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"MVP",Model:"Nomad",Speed:2,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"MVP",Model:"Ohm",Speed:2,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"MVP",Model:"Entropy",Speed:4,Glide:3,Turn:0,Fade:3},
    // ── Streamline ──
    {Manufacturer:"Streamline",Model:"Trace",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Streamline",Model:"Flare",Speed:9,Glide:4,Turn:0,Fade:3.5},
    {Manufacturer:"Streamline",Model:"Lift",Speed:9,Glide:5,Turn:-2,Fade:1.5},
    {Manufacturer:"Streamline",Model:"Drift",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Streamline",Model:"Ascend",Speed:6,Glide:5,Turn:-3,Fade:0.5},
    {Manufacturer:"Streamline",Model:"Runway",Speed:5,Glide:4,Turn:0,Fade:3.5},
    {Manufacturer:"Streamline",Model:"Echo",Speed:5,Glide:5,Turn:-1.5,Fade:1},
    {Manufacturer:"Streamline",Model:"Stabilizer",Speed:5,Glide:3.5,Turn:0,Fade:3},
    {Manufacturer:"Streamline",Model:"Pilot",Speed:2,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Streamline",Model:"Range",Speed:2,Glide:1,Turn:-0.5,Fade:0.5},
    // ── Discmania additions ──
    {Manufacturer:"Discmania",Model:"Astronaut",Speed:12,Glide:6,Turn:-4,Fade:1},
    {Manufacturer:"Discmania",Model:"CD1",Speed:9,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discmania",Model:"CD2",Speed:9,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"CD3",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"Cloud Breaker",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discmania",Model:"DD2",Speed:13,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Discmania",Model:"DDX",Speed:12,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"Enigma",Speed:12,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"FD1",Speed:7,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"FD2",Speed:7,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"FD3",Speed:9,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"Instinct",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"Neo Instinct",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"Neo Essence",Speed:8,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Discmania",Model:"Neo Enigma",Speed:12,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"Neo Splice",Speed:9,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"Splice",Speed:9,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"Tilt",Speed:9,Glide:1,Turn:1,Fade:6},
    {Manufacturer:"Discmania",Model:"Vanguard",Speed:9,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"MD1",Speed:5,Glide:6,Turn:0,Fade:0},
    {Manufacturer:"Discmania",Model:"MD2",Speed:4,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"MD3",Speed:5,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"MD3x",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"MD4",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"MD5",Speed:5,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"Maestro",Speed:4,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"Method",Speed:5,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"Mutant",Speed:5,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"CD Craze",Speed:10,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"DD2 Frenzy",Speed:13,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Discmania",Model:"PD1",Speed:10,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"PD2",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"PD3",Speed:11,Glide:3,Turn:0,Fade:5},
    {Manufacturer:"Discmania",Model:"PD2 Chaos",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"TD Rush",Speed:10,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discmania",Model:"GM Gremlin",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"MD2 Fiend",Speed:4,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"P1",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Discmania",Model:"P1 Maniac",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Discmania",Model:"P2X",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"P3X",Speed:3,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"P4",Speed:4,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"Link",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"Logic",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"Drop",Speed:4,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"Tactic",Speed:4,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"Razor Claw",Speed:4,Glide:2,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"Sensei",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"Spore",Speed:1,Glide:7,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"Notion",Speed:2,Glide:3,Turn:-1,Fade:0},
    {Manufacturer:"Discmania",Model:"Rainmaker",Speed:2,Glide:3,Turn:0.5,Fade:0.5},
    {Manufacturer:"Discmania",Model:"CD Hysteria",Speed:11,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"PD Freak",Speed:10,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"DD Hysteria",Speed:11,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"P2 Psycho",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"EXO Hard Tactic",Speed:4,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"EXO Soft Link",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"Neo Method",Speed:5,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"MD6",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"Neo DD",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discmania",Model:"PD4",Speed:10,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"TD2",Speed:11,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discmania",Model:"FD4",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"CD4",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"DD4",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Discmania",Model:"MD7",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Discmania",Model:"Neo MD3",Speed:5,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Discmania",Model:"Neo PD2",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Discmania",Model:"Neo PD3",Speed:11,Glide:3,Turn:0,Fade:5},
    {Manufacturer:"Discmania",Model:"PD5",Speed:10,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Discmania",Model:"TD3",Speed:10,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Discmania",Model:"DD5",Speed:12,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"CD5",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Discmania",Model:"FD5",Speed:7,Glide:5,Turn:0,Fade:2},
    // ── Kastaplast additions ──
    {Manufacturer:"Kastaplast",Model:"Alva",Speed:11,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Vass",Speed:12,Glide:5,Turn:-1.5,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Krut",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Kastaplast",Model:"Rask",Speed:14,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Kastaplast",Model:"Falk",Speed:9,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Kastaplast",Model:"Lots",Speed:9,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Stal",Speed:9,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Kastaplast",Model:"Malm",Speed:10,Glide:4,Turn:0,Fade:2.5},
    {Manufacturer:"Kastaplast",Model:"Idog",Speed:7,Glide:5,Turn:-0.5,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Stig",Speed:6,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Kastaplast",Model:"Göte",Speed:4,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Kastaplast",Model:"Kaxe",Speed:6,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Kaxe Z",Speed:6,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Järn",Speed:4.5,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Kastaplast",Model:"Reko",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Kastaplast",Model:"Reko X",Speed:3,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Berg X",Speed:1,Glide:1,Turn:1,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Tuff",Speed:3,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Kastaplast",Model:"Sten",Speed:1,Glide:3,Turn:0,Fade:1},
    // ── Westside additions ──
    {Manufacturer:"Westside",Model:"Adder",Speed:13,Glide:5,Turn:0,Fade:4},
    {Manufacturer:"Westside",Model:"Catapult",Speed:14,Glide:4,Turn:-0.5,Fade:3},
    {Manufacturer:"Westside",Model:"Destiny",Speed:14,Glide:6,Turn:-2,Fade:3},
    {Manufacturer:"Westside",Model:"Giant",Speed:13,Glide:4,Turn:0,Fade:3.5},
    {Manufacturer:"Westside",Model:"King",Speed:14,Glide:5,Turn:-1,Fade:4},
    {Manufacturer:"Westside",Model:"Prince",Speed:13,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Westside",Model:"Queen",Speed:14,Glide:5,Turn:-3,Fade:2},
    {Manufacturer:"Westside",Model:"Tide",Speed:12,Glide:6,Turn:-0.5,Fade:3},
    {Manufacturer:"Westside",Model:"War Horse",Speed:13,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Westside",Model:"World",Speed:14,Glide:4,Turn:-0.5,Fade:3},
    {Manufacturer:"Westside",Model:"Ahti",Speed:9,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Westside",Model:"Fortress",Speed:10,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Westside",Model:"Hatchet",Speed:9,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Westside",Model:"Longbowman",Speed:9,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Westside",Model:"Sampo",Speed:10,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"Westside",Model:"Seer",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Westside",Model:"Stag",Speed:8,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Westside",Model:"Underworld",Speed:7,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Westside",Model:"Anvil",Speed:4,Glide:2,Turn:0,Fade:4},
    {Manufacturer:"Westside",Model:"Bard",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Westside",Model:"Pine",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Westside",Model:"Warship",Speed:5,Glide:6,Turn:0,Fade:1},
    {Manufacturer:"Westside",Model:"Crown",Speed:3,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Westside",Model:"Maiden",Speed:3,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Westside",Model:"Shield",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Westside",Model:"Swan",Speed:3,Glide:3,Turn:-1,Fade:0},
    {Manufacturer:"Westside",Model:"Swan 1 Reborn",Speed:3,Glide:3,Turn:-2.5,Fade:0},
    // ── RPM Discs (NZ!) ──
    {Manufacturer:"RPM",Model:"Kahu",Speed:13,Glide:5,Turn:-1.3,Fade:2.5},
    {Manufacturer:"RPM",Model:"Kiwi",Speed:9.8,Glide:3.1,Turn:-0.4,Fade:3.1},
    {Manufacturer:"RPM",Model:"Tara Iti",Speed:10,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"RPM",Model:"Huia",Speed:7,Glide:4.7,Turn:-0.1,Fade:2.2},
    {Manufacturer:"RPM",Model:"Pekapeka",Speed:9,Glide:5.1,Turn:-2.7,Fade:1.2},
    {Manufacturer:"RPM",Model:"Ruru",Speed:2.7,Glide:3.2,Turn:-0.1,Fade:1},
    {Manufacturer:"RPM",Model:"Takapu",Speed:2.1,Glide:3.2,Turn:-0.1,Fade:1.9},
    {Manufacturer:"RPM",Model:"Tui",Speed:3.1,Glide:4.2,Turn:-1.1,Fade:0.2},
    // ── Prodigy Discs ──
    {Manufacturer:"Prodigy",Model:"D Model OS",Speed:13,Glide:5,Turn:0,Fade:4},
    {Manufacturer:"Prodigy",Model:"D Model S",Speed:13,Glide:6,Turn:0,Fade:2},
    {Manufacturer:"Prodigy",Model:"D1",Speed:12,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Prodigy",Model:"D2",Speed:12,Glide:6,Turn:-1,Fade:3},
    {Manufacturer:"Prodigy",Model:"D3",Speed:13,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Prodigy",Model:"D4",Speed:12,Glide:6,Turn:-3,Fade:2},
    {Manufacturer:"Prodigy",Model:"Falcor",Speed:13,Glide:6,Turn:-1,Fade:2.5},
    {Manufacturer:"Prodigy",Model:"Reverb",Speed:13,Glide:5,Turn:0,Fade:3.5},
    {Manufacturer:"Prodigy",Model:"X1",Speed:13,Glide:3,Turn:0,Fade:5},
    {Manufacturer:"Prodigy",Model:"X2",Speed:12,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Prodigy",Model:"X3",Speed:12,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Prodigy",Model:"X4",Speed:12,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Prodigy",Model:"F1",Speed:8,Glide:4,Turn:-1,Fade:3},
    {Manufacturer:"Prodigy",Model:"F2",Speed:7,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Prodigy",Model:"F3",Speed:8,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Prodigy",Model:"F5",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Prodigy",Model:"F7",Speed:7,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"Prodigy",Model:"F9",Speed:8,Glide:6,Turn:-4,Fade:0.5},
    {Manufacturer:"Prodigy",Model:"FX-2",Speed:9,Glide:4,Turn:-0.5,Fade:3},
    {Manufacturer:"Prodigy",Model:"FX-3",Speed:9,Glide:4,Turn:-1.5,Fade:2},
    {Manufacturer:"Prodigy",Model:"FX-4",Speed:9,Glide:4,Turn:-2,Fade:2},
    {Manufacturer:"Prodigy",Model:"H3",Speed:11,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Prodigy",Model:"M1",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Prodigy",Model:"M2",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Prodigy",Model:"M3",Speed:5,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Prodigy",Model:"M4",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Prodigy",Model:"MX-3",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Prodigy",Model:"A1",Speed:3,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Prodigy",Model:"A2",Speed:3,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Prodigy",Model:"A3",Speed:4,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Prodigy",Model:"A4",Speed:4,Glide:4,Turn:-1,Fade:2},
    {Manufacturer:"Prodigy",Model:"Distortion",Speed:4,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Prodigy",Model:"PX-3",Speed:3,Glide:4,Turn:0,Fade:2.5},
    // ── Latitude 64 additions ──
    {Manufacturer:"Latitude 64",Model:"Ballista Pro",Speed:14,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Ballista",Speed:14,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Cutlass",Speed:13,Glide:5,Turn:0,Fade:3.5},
    {Manufacturer:"Latitude 64",Model:"Blitz",Speed:11,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Latitude 64",Model:"Bolt",Speed:13,Glide:6,Turn:-2,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Flow",Speed:11,Glide:6,Turn:-0.5,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Gladiator",Speed:13,Glide:5,Turn:0,Fade:3.5},
    {Manufacturer:"Latitude 64",Model:"Halo",Speed:13,Glide:5,Turn:-0.5,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Havoc",Speed:13,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Knight",Speed:14,Glide:4,Turn:-1.5,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Fury",Speed:9,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Honor",Speed:9,Glide:5,Turn:0,Fade:2.5},
    {Manufacturer:"Latitude 64",Model:"Brave",Speed:7,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Bryce",Speed:9,Glide:6,Turn:-2,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Culverin",Speed:9,Glide:5,Turn:-0.5,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Diamond",Speed:8,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Explorer",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Falchion",Speed:8,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Glory",Speed:7,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Anchor",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Latitude 64",Model:"Claymore",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Compass",Speed:5,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Core",Speed:6,Glide:5,Turn:-0.5,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Fuji",Speed:4,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Gobi",Speed:6,Glide:5,Turn:-0.5,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Mace",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Medius",Speed:5,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Latitude 64",Model:"Beetle",Speed:1,Glide:7,Turn:-1,Fade:0},
    {Manufacturer:"Latitude 64",Model:"Caltrop",Speed:2,Glide:2,Turn:0,Fade:0},
    {Manufacturer:"Latitude 64",Model:"Dagger",Speed:2,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Faith",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Gauntlet",Speed:2,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Hope",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Keystone",Speed:2,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Mercy",Speed:2,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Peak",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Latitude 64",Model:"Spike",Speed:4,Glide:3,Turn:-1,Fade:1},
    // ── Clash Discs ──
    {Manufacturer:"Clash Discs",Model:"Cinnamon",Speed:9,Glide:5,Turn:-1.5,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Pepper",Speed:11,Glide:5,Turn:0,Fade:4},
    {Manufacturer:"Clash Discs",Model:"Sage",Speed:12,Glide:6,Turn:-1,Fade:3},
    {Manufacturer:"Clash Discs",Model:"Salt",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Clash Discs",Model:"Spice",Speed:10,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Clash Discs",Model:"Vanilla",Speed:11,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Wild Honey",Speed:12,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Cookie",Speed:7,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Ginger",Speed:9,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Lotus",Speed:8,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Millet",Speed:7,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Soda",Speed:7,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Berry",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Cherry",Speed:5,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Guava",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Mango",Speed:5,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Clash Discs",Model:"Peach",Speed:4,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Butter",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Candy",Speed:3,Glide:3,Turn:-1,Fade:1},
    {Manufacturer:"Clash Discs",Model:"Fudge",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Clash Discs",Model:"Mint",Speed:4,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Clash Discs",Model:"Peppermint",Speed:4,Glide:2,Turn:0,Fade:4},
    {Manufacturer:"Clash Discs",Model:"Popcorn",Speed:3,Glide:3,Turn:0,Fade:1},
    // ── Mint Discs ──
    {Manufacturer:"Mint Discs",Model:"Profit",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Mint Discs",Model:"UFO",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Mint Discs",Model:"Bullet",Speed:2,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Mint Discs",Model:"Pickle",Speed:2,Glide:3.5,Turn:0,Fade:1.5},
    {Manufacturer:"Mint Discs",Model:"Lasso",Speed:3,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Mint Discs",Model:"Bobcat",Speed:5,Glide:4,Turn:0,Fade:2.5},
    {Manufacturer:"Mint Discs",Model:"Taco",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Mint Discs",Model:"Mustang",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Mint Discs",Model:"Lobster",Speed:5,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"Mint Discs",Model:"Salamander",Speed:6,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Mint Discs",Model:"Grackle",Speed:7,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Mint Discs",Model:"Alpha",Speed:8,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Mint Discs",Model:"Jackalope",Speed:8,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Mint Discs",Model:"Phoenix",Speed:9,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"Mint Discs",Model:"Diamondback",Speed:9,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Mint Discs",Model:"Freetail",Speed:10,Glide:5,Turn:-4,Fade:1},
    {Manufacturer:"Mint Discs",Model:"Longhorn",Speed:11,Glide:4,Turn:-1,Fade:2.5},
    {Manufacturer:"Mint Discs",Model:"Goat",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Mint Discs",Model:"Idol",Speed:13,Glide:5,Turn:-1,Fade:2.5},
    // ── Dynamic Discs additions ──
    {Manufacturer:"Dynamic Discs",Model:"Captain",Speed:13,Glide:5,Turn:-2,Fade:2},
    {Manufacturer:"Dynamic Discs",Model:"Enforcer",Speed:12,Glide:4,Turn:0.5,Fade:4},
    {Manufacturer:"Dynamic Discs",Model:"Sergeant",Speed:11,Glide:4,Turn:0,Fade:2.5},
    {Manufacturer:"Dynamic Discs",Model:"Sheriff",Speed:13,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Dynamic Discs",Model:"Trespass",Speed:12,Glide:5,Turn:-0.5,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Sockibomb General",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Dynamic Discs",Model:"General",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Dynamic Discs",Model:"Freedom",Speed:14,Glide:5,Turn:-3,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Convict",Speed:9,Glide:4,Turn:-0.5,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Escape",Speed:9,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Dynamic Discs",Model:"Getaway",Speed:9,Glide:5,Turn:-0.5,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Maverick",Speed:7,Glide:4,Turn:-1.5,Fade:2},
    {Manufacturer:"Dynamic Discs",Model:"Truth",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Dynamic Discs",Model:"Justice",Speed:5,Glide:3,Turn:0.5,Fade:4},
    {Manufacturer:"Dynamic Discs",Model:"Suspect",Speed:4,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Verdict",Speed:5,Glide:4,Turn:0,Fade:3.5},
    {Manufacturer:"Dynamic Discs",Model:"Evidence",Speed:5,Glide:5,Turn:-1,Fade:0},
    {Manufacturer:"Dynamic Discs",Model:"Patrol",Speed:5,Glide:5,Turn:-3,Fade:1},
    {Manufacturer:"Dynamic Discs",Model:"Agent",Speed:2,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Dynamic Discs",Model:"Culprit",Speed:4,Glide:2,Turn:0,Fade:3.5},
    {Manufacturer:"Dynamic Discs",Model:"Deputy",Speed:3,Glide:4,Turn:-1.5,Fade:0},
    {Manufacturer:"Dynamic Discs",Model:"Guard",Speed:2,Glide:5,Turn:0,Fade:0.5},
    {Manufacturer:"Dynamic Discs",Model:"Judge",Speed:2,Glide:4,Turn:0,Fade:1},
    {Manufacturer:"Dynamic Discs",Model:"Slammer",Speed:3,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Warden",Speed:3,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"Dynamic Discs",Model:"Evader",Speed:7,Glide:4,Turn:0,Fade:2.5},
    // ── Trash Panda ──
    {Manufacturer:"Trash Panda",Model:"Inner Core",Speed:2,Glide:4,Turn:-0.5,Fade:0},
    {Manufacturer:"Trash Panda",Model:"Canyon",Speed:4,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Trash Panda",Model:"Dune",Speed:5,Glide:5,Turn:-1,Fade:0},
    {Manufacturer:"Trash Panda",Model:"Ozone",Speed:8,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Trash Panda",Model:"Procyon",Speed:11.5,Glide:5,Turn:-1,Fade:2},
    // ── Gateway additions ──
    {Manufacturer:"Gateway",Model:"Realm",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Gateway",Model:"Ether",Speed:12,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Gateway",Model:"Aura",Speed:12,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Gateway",Model:"Assassin",Speed:9,Glide:6,Turn:-1.5,Fade:1},
    {Manufacturer:"Gateway",Model:"Blade",Speed:9,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Gateway",Model:"Spear",Speed:9,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Gateway",Model:"Journey",Speed:12,Glide:6,Turn:-2,Fade:1},
    {Manufacturer:"Gateway",Model:"Spirit",Speed:12,Glide:4,Turn:0,Fade:4},
    {Manufacturer:"Gateway",Model:"Element",Speed:5,Glide:5,Turn:-1,Fade:1},
    {Manufacturer:"Gateway",Model:"Prophecy",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Gateway",Model:"Mystic",Speed:5,Glide:5,Turn:-3,Fade:0},
    {Manufacturer:"Gateway",Model:"Warrior",Speed:5,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Gateway",Model:"Chief",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Gateway",Model:"Chief OS",Speed:3,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"Gateway",Model:"Ghoul",Speed:3,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Gateway",Model:"Houdini",Speed:3,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"Gateway",Model:"Magic",Speed:2,Glide:3,Turn:-1,Fade:0},
    {Manufacturer:"Gateway",Model:"Voodoo",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Gateway",Model:"Devilhawk",Speed:5,Glide:5,Turn:-1,Fade:1},
    // ── DGA ──
    {Manufacturer:"DGA",Model:"Torrent",Speed:14,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"DGA",Model:"Tempest",Speed:13,Glide:5,Turn:-3,Fade:2},
    {Manufacturer:"DGA",Model:"Hurricane",Speed:12,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"DGA",Model:"Rogue",Speed:11,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"DGA",Model:"Sail",Speed:11,Glide:5,Turn:-5,Fade:1},
    {Manufacturer:"DGA",Model:"Hellfire",Speed:10,Glide:3,Turn:0,Fade:5},
    {Manufacturer:"DGA",Model:"Pipeline",Speed:8,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"DGA",Model:"Tsunami",Speed:10,Glide:3,Turn:0,Fade:4},
    {Manufacturer:"DGA",Model:"Undertow",Speed:10,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"DGA",Model:"Aftershock",Speed:4,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"DGA",Model:"Quake",Speed:5,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"DGA",Model:"Shockwave",Speed:4,Glide:2,Turn:0,Fade:3},
    {Manufacturer:"DGA",Model:"Squall",Speed:6,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"DGA",Model:"Blowfly II",Speed:2,Glide:3,Turn:-1,Fade:1},
    {Manufacturer:"DGA",Model:"Bowfly",Speed:2,Glide:2,Turn:0,Fade:2},
    {Manufacturer:"DGA",Model:"Breaker",Speed:3,Glide:3,Turn:0,Fade:3},
    {Manufacturer:"DGA",Model:"Gumbputt",Speed:2,Glide:2,Turn:0,Fade:2},
    {Manufacturer:"DGA",Model:"Reef",Speed:2,Glide:2,Turn:-1,Fade:1},
    {Manufacturer:"DGA",Model:"Steady",Speed:2,Glide:3,Turn:0,Fade:2},
    {Manufacturer:"DGA",Model:"Surf",Speed:3,Glide:3,Turn:-1,Fade:1},
    {Manufacturer:"DGA",Model:"Titanic",Speed:2,Glide:2,Turn:0,Fade:2},
    // ── Millennium ──
    {Manufacturer:"Millennium",Model:"Scorpius",Speed:12,Glide:5,Turn:-1,Fade:3},
    {Manufacturer:"Millennium",Model:"Orion LF",Speed:9,Glide:5,Turn:-1,Fade:2},
    {Manufacturer:"Millennium",Model:"Aurora MS",Speed:4,Glide:5,Turn:0,Fade:0},
    // ── Doomsday ──
    {Manufacturer:"Doomsday",Model:"Apocalypse",Speed:13,Glide:1,Turn:1,Fade:6},
    {Manufacturer:"Doomsday",Model:"Oblivion",Speed:12,Glide:4,Turn:-1,Fade:3},
    {Manufacturer:"Doomsday",Model:"Desolation",Speed:5,Glide:5,Turn:0,Fade:2},
    {Manufacturer:"Doomsday",Model:"Gloom",Speed:2,Glide:3,Turn:-1,Fade:1},
    {Manufacturer:"Doomsday",Model:"Despair",Speed:5,Glide:4,Turn:-1,Fade:1},
    {Manufacturer:"Doomsday",Model:"Ice Age",Speed:7,Glide:4,Turn:0,Fade:3},
    {Manufacturer:"Doomsday",Model:"Flat Earth",Speed:3,Glide:3,Turn:0,Fade:1},
    {Manufacturer:"Doomsday",Model:"Scope",Speed:4,Glide:4,Turn:0,Fade:2},
    // ── Climo Disc Golf ──
    {Manufacturer:"Climo Disc Golf",Model:"Streak",Speed:7,Glide:5,Turn:0,Fade:1},
    {Manufacturer:"Climo Disc Golf",Model:"Champ",Speed:2,Glide:3,Turn:0,Fade:0},
    {Manufacturer:"Climo Disc Golf",Model:"Osprey",Speed:10,Glide:6,Turn:-3,Fade:1},
    {Manufacturer:"Climo Disc Golf",Model:"Belleair",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Climo Disc Golf",Model:"Skyway",Speed:11,Glide:4,Turn:-1,Fade:3},
    // ── Thought Space Athletics ──
    {Manufacturer:"Thought Space Athletics",Model:"Crux",Speed:5,Glide:4,Turn:0,Fade:2},
    {Manufacturer:"Thought Space Athletics",Model:"Nuance",Speed:7,Glide:5,Turn:-2,Fade:1},
    {Manufacturer:"Thought Space Athletics",Model:"Construct",Speed:10,Glide:6,Turn:-1,Fade:2},
    {Manufacturer:"Thought Space Athletics",Model:"Coalesce",Speed:9,Glide:5,Turn:0,Fade:3},
    {Manufacturer:"Thought Space Athletics",Model:"Synapse",Speed:12,Glide:5,Turn:-1.5,Fade:3},
];

// ── PLAYER PROFILE ICONS & COLOURS ──
const PLAYER_ICONS = ['🥏','🎯','🦅','🌲','🔥','⚡','🏔','🌊','🦁','👾'];
const PLAYER_COLOURS = [
    { name: 'Orange', hex: '#f97316' },
    { name: 'Cyan',   hex: '#22d3ee' },
    { name: 'Emerald',hex: '#10b981' },
    { name: 'Violet', hex: '#8b5cf6' },
    { name: 'Rose',   hex: '#f43f5e' },
    { name: 'Amber',  hex: '#f59e0b' },
    { name: 'Sky',    hex: '#38bdf8' },
    { name: 'Lime',   hex: '#84cc16' },
    { name: 'Pink',   hex: '#ec4899' },
    { name: 'Slate',  hex: '#94a3b8' },
];

// ── COMMUNITY DATA TRACKING ──
// Tracks disc add events for trending/heatmap — written to DB, read later when we have volume
const recordDiscEvent = async (supabase, discName, brand, speed, turn, fade, userId) => {
    try {
        await supabase.from('disc_events').insert({
            disc_name: discName,
            brand,
            speed: parseFloat(speed),
            turn: parseFloat(turn),
            fade: parseFloat(fade),
            user_id: userId,
            event_type: 'add',
        });
    } catch (_) { /* non-critical */ }
};

export default function App() {
    const [session, setSession] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [authMessage, setAuthMessage] = useState('');
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'profile_setup'
    const [signupUserId, setSignupUserId] = useState(null); // temp userId after email signup
    const [authUsername, setAuthUsername] = useState('');
    const [authPdga, setAuthPdga] = useState('');
    const [authIcon, setAuthIcon] = useState('🥏');
    const [authColour, setAuthColour] = useState('#f97316');
    const [myProfile, setMyProfile] = useState(null); // { username, pdga_number, icon, colour }
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [heatmapData, setHeatmapData] = useState(null);
    const [settings, setSettings] = useState({ unit: 'ft', maxPower: 350, bhPower: 350, fhPower: 250, country: 'New Zealand', handedness: 'right', skillLevel: 'intermediate', throwStyle: 'both' });
    // windConfig: { type: 'calm'|'headwind'|'tailwind'|'crosswind', speed: number (mph or km/h in display), direction: 'ltr'|'rtl' }
    const [windConfig, setWindConfig] = useState({ type: 'calm', speed: 0, direction: 'ltr' });
    const [showWindPanel, setShowWindPanel] = useState(false);
    const [showCoach, setShowCoach] = useState(false);
    const [activeBagId, setActiveBagId] = useState('');
    const [bags, setBags] = useState([]);
    const [discs, setDiscs] = useState([]);
    const [view, setView] = useState('active');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chartMode, setChartMode] = useState('path');
    const [throwView, setThrowView] = useState('bh'); // 'bh' | 'fh' — which arm speed to use for chart
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
    const [showTutorial, setShowTutorial] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [showVerifyDisc, setShowVerifyDisc] = useState(null); // holds community disc to verify
    const [verifyName, setVerifyName] = useState('');
    const [verifyBrand, setVerifyBrand] = useState('');
    const [verifySpeed, setVerifySpeed] = useState(0);
    const [verifyGlide, setVerifyGlide] = useState(0);
    const [verifyTurn, setVerifyTurn] = useState(0);
    const [verifyFade, setVerifyFade] = useState(0);
    const [verifyCorrecting, setVerifyCorrecting] = useState(false);

    // Card Mates
    const [showCardMates, setShowCardMates] = useState(false);
    const [cardMates, setCardMates] = useState([]);
    const [cardMateSearch, setCardMateSearch] = useState('');
    const [cardMateSearchResult, setCardMateSearchResult] = useState(null); // { found: bool, user }
    const [cardMateSearchLoading, setCardMateSearchLoading] = useState(false);
    const [viewingMate, setViewingMate] = useState(null); // { userId, email, bags, discs }
    const [viewingMateBagId, setViewingMateBagId] = useState('');
    const [mateBagLoading, setMateBagLoading] = useState(false);

    // Settings tabs + account editing
    const [settingsTab, setSettingsTab] = useState('bag'); // 'bag' | 'account'
    const [accountEdit, setAccountEdit] = useState({ username: '', pdga_number: '', email: '' });
    const [accountSaving, setAccountSaving] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');

    // Wear slider — local state for smooth dragging, synced to DB on release
    const [localWear, setLocalWear] = useState({});
    const [favSubView, setFavSubView] = useState('all'); // 'all' | 'aces'
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        if (authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
            if (error) alert(error.message);
        } else if (authMode === 'signup') {
            // Step 1: create the auth account
            const { data, error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
            if (error) { alert(error.message); setAuthLoading(false); return; }
            // Move to profile setup step — store userId for profile creation
            setSignupUserId(data?.user?.id || null);
            setAuthMode('profile_setup');
        }
        setAuthLoading(false);
    };

    const handleProfileSetup = async (e) => {
        e.preventDefault();
        if (!authUsername.trim()) { alert('Please enter a username.'); return; }
        setAuthLoading(true);
        const userId = signupUserId || session?.user?.id;
        const { data: existing } = await supabase.from('profiles').select('id').eq('username', authUsername.trim().toLowerCase()).single();
        if (existing) { alert('That username is already taken — please choose another.'); setAuthLoading(false); return; }
        const { error } = await supabase.from('profiles').upsert({
            user_id: userId,
            username: authUsername.trim().toLowerCase(),
            pdga_number: authPdga.trim() || null,
            email: authEmail.trim().toLowerCase(),
            icon: authIcon,
            colour: authColour,
        });
        if (error) { alert('Error saving profile: ' + error.message); setAuthLoading(false); return; }
        setMyProfile({ username: authUsername.trim().toLowerCase(), pdga_number: authPdga.trim() || null, icon: authIcon, colour: authColour });
        setAuthMessage('Profile created! Check your email to confirm your account.');
        setAuthMode('login');
        setAuthLoading(false);
    };

    useEffect(() => {
        if (!session?.user) return;
        const loadData = async () => {
            let { data: set } = await supabase.from('settings').select('*').eq('user_id', session.user.id).single();
            if (set) setSettings({ unit: set.unit || 'ft', maxPower: set.max_power || 350, bhPower: set.bh_power || set.max_power || 350, fhPower: set.fh_power || 250, country: set.country || 'New Zealand', handedness: set.handedness || 'right', skillLevel: set.skill_level || 'intermediate', throwStyle: set.throw_style || 'both' });
            else await supabase.from('settings').insert({ user_id: session.user.id });

            const { data: b } = await supabase.from('bags').select('*');
            if (b?.length) { setBags(b); setActiveBagId(b[0].id); }
            else {
                const { data: nb } = await supabase.from('bags').insert({ user_id: session.user.id, name: 'Main Bag' }).select().single();
                setBags([nb]); setActiveBagId(nb.id);
            }
            const { data: d } = await supabase.from('discs').select('*');
            if (d) setDiscs(d);

            // Show tutorial for new users (no discs yet)
            const isNewUser = !set || (!d || d.length === 0);
            const tutorialSeen = localStorage.getItem(`tutorial_seen_${session.user.id}`);
            if (isNewUser && !tutorialSeen) {
                setShowTutorial(true);
                setTutorialStep(0);
            }

            const { data: cs, error: csError } = await supabase.from('community_suggestions').select('*');
            if (csError) console.error('Failed to load community suggestions:', csError);
            else if (cs) setCommunitySuggestions(cs);

            // Load saved card mates
            const { data: cm } = await supabase.from('card_mates').select('*').eq('user_id', session.user.id);
            if (cm) setCardMates(cm);

            // Load own profile
            const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).single();
            if (profile) {
                setMyProfile(profile);
                if (profile.icon) setAuthIcon(profile.icon);
                if (profile.colour) setAuthColour(profile.colour);
            } else {
                // Existing user with no profile — prompt setup
                setAuthEmail(session.user.email || '');
                setAuthMode('profile_setup');
                setSignupUserId(session.user.id);
            }
        };
        loadData();
    }, [session]);

    const saveSettings = async (newS) => {
        setSettings(newS);
        await supabase.from('settings').update({
            unit: newS.unit,
            max_power: newS.maxPower,
            bh_power: newS.bhPower,
            fh_power: newS.fhPower,
            country: newS.country,
            handedness: newS.handedness,
            skill_level: newS.skillLevel,
            throw_style: newS.throwStyle,
        }).eq('user_id', session.user.id);
    };

    // --- CARD MATES ---
    const searchCardMate = async (query) => {
        setCardMateSearchLoading(true);
        setCardMateSearchResult(null);
        const q = query.trim().toLowerCase();
        try {
            // Search by username OR pdga_number OR email
            const { data: byUsername } = await supabase.from('profiles').select('*').eq('username', q).single();
            if (byUsername) {
                setCardMateSearchResult({ found: true, userId: byUsername.user_id, email: byUsername.email, username: byUsername.username, pdga: byUsername.pdga_number, country: byUsername.country, icon: byUsername.icon, colour: byUsername.colour });
                setCardMateSearchLoading(false); return;
            }
            const { data: byPdga } = await supabase.from('profiles').select('*').eq('pdga_number', q).single();
            if (byPdga) {
                setCardMateSearchResult({ found: true, userId: byPdga.user_id, email: byPdga.email, username: byPdga.username, pdga: byPdga.pdga_number, country: byPdga.country, icon: byPdga.icon, colour: byPdga.colour });
                setCardMateSearchLoading(false); return;
            }
            const { data: byEmail } = await supabase.from('profiles').select('*').eq('email', q).single();
            if (byEmail) {
                setCardMateSearchResult({ found: true, userId: byEmail.user_id, email: byEmail.email, username: byEmail.username, pdga: byEmail.pdga_number, country: byEmail.country, icon: byEmail.icon, colour: byEmail.colour });
                setCardMateSearchLoading(false); return;
            }
            // Check not searching yourself
            setCardMateSearchResult({ found: false });
        } catch {
            setCardMateSearchResult({ found: false });
        }
        setCardMateSearchLoading(false);
    };

    const addCardMate = async (mateUserId, mateEmail, mateUsername, matePdga, mateIcon, mateColour) => {
        const alreadySaved = cardMates.some(cm => cm.mate_user_id === mateUserId);
        if (alreadySaved) return;
        const { data } = await supabase.from('card_mates').insert({
            user_id: session.user.id,
            mate_user_id: mateUserId,
            mate_email: mateEmail,
            mate_username: mateUsername || null,
            mate_pdga: matePdga || null,
            mate_icon: mateIcon || '🥏',
            mate_colour: mateColour || '#22d3ee',
        }).select().single();
        if (data) setCardMates(prev => [...prev, data]);
    };

    const removeCardMate = async (id) => {
        await supabase.from('card_mates').delete().eq('id', id);
        setCardMates(prev => prev.filter(cm => cm.id !== id));
        if (viewingMate?.id === id) setViewingMate(null);
    };

    const loadMateBag = async (mateUserId, mateEmail, mateId) => {
        setMateBagLoading(true);
        setViewingMate(null);
        // Only fetch bags the mate has made public
        const { data: mateBags } = await supabase
            .from('bags').select('*')
            .eq('user_id', mateUserId)
            .eq('is_public', true);
        const bagIds = (mateBags || []).map(b => b.id);
        let mateDiscs = [];
        if (bagIds.length > 0) {
            const { data: d } = await supabase
                .from('discs').select('*')
                .in('bag_id', bagIds)
                .eq('status', 'active')
                .eq('is_idea', false);
            mateDiscs = d || [];
        }
        const firstBagId = mateBags?.[0]?.id || '';
        setViewingMate({ id: mateId, userId: mateUserId, email: mateEmail, bags: mateBags || [], discs: mateDiscs });
        setViewingMateBagId(firstBagId);
        setMateBagLoading(false);
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
                const communityPayload = { model: discObj.name, brand: discObj.brand || '', speed: parseFloat(discObj.speed), glide: parseFloat(discObj.glide), turn: parseFloat(discObj.turn), fade: parseFloat(discObj.fade), added_by: session.user.id, verified: false };
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
        else if (data) {
            setDiscs([...discs, data]);
            // Record community event (non-blocking)
            recordDiscEvent(supabase, discObj.name, discObj.brand, discObj.speed, discObj.turn, discObj.fade, session.user.id);
        }
    };

    const updateDiscInDB = async (u) => {
        // Auto-favourite any disc that has at least one ace
        const updated = (u.aces > 0) ? { ...u, favorite: true } : u;
        setDiscs(discs.map(d => d.id === updated.id ? updated : d));
        const p = { ...updated }; delete p.id; delete p.user_id; delete p.created_at;
        await supabase.from('discs').update(p).eq('id', updated.id);
    };

    const deleteDiscInDB = async (id) => {
        setDiscs(discs.filter(d => d.id !== id));
        await supabase.from('discs').delete().eq('id', id);
    };

    // --- WEAR / BEAT-IN PHYSICS ---
    const getStats = (d, windOverride) => {
        const w = parseFloat(d.wear) || 0;
        const baseTurn = parseFloat(d.turn);
        const baseFade = parseFloat(d.fade);
        const baseSpeed = parseFloat(d.speed);
        const overstability = baseFade + Math.max(0, baseTurn);
        const maxTurnShift = Math.max(0, Math.min(1.5, overstability * 0.5));
        let turn = Math.max(-5, baseTurn - (w * maxTurnShift));
        const maxFadeReduction = baseFade * 0.65;
        let fade = Math.max(0, baseFade - (w * maxFadeReduction));

        // ── WIND PHYSICS ENGINE ──
        // Convert display speed to mph for internal calculations
        const wc = windOverride || windConfig;
        const rawSpeed = wc.speed || 0;
        // If unit is metric the user enters km/h, convert to mph for physics
        const windMph = settings.unit === 'm' ? rawSpeed * 0.621371 : rawSpeed;

        if (wc.type !== 'calm' && windMph > 0) {
            // Stability class: OS (stability>=2), ST (-1<stability<2), US (stability<=-1)
            const stability = baseTurn + baseFade;
            const isOS = stability >= 2;
            const isST = stability > -1 && stability < 2;
            const isUS = stability <= -1;
            // Speed class: putter(<=3), mid(4-6), fairway(7-8), driver(9+)
            const isPutter = baseSpeed <= 3;
            const isMid = baseSpeed >= 4 && baseSpeed <= 6;
            const isFairway = baseSpeed >= 7 && baseSpeed <= 8;
            const isDriver = baseSpeed >= 9;

            // Escalation factor — how much the wind shifts things
            // 5-10mph = subtle, 10-20mph = 1 stability class shift, 20-30mph = 2 class shifts
            const escalation = windMph <= 10
                ? windMph / 10 * 0.6          // subtle
                : windMph <= 20
                    ? 0.6 + (windMph - 10) / 10 * 0.8   // moderate
                    : windMph <= 30
                        ? 1.4 + (windMph - 20) / 10 * 0.8   // strong
                        : 2.2 + (windMph - 30) / 10 * 0.4;  // extreme

            if (wc.type === 'headwind') {
                // Headwind: increases effective airspeed → more turn, delayed then stronger fade
                // OS: turn minimal, fade slight increase
                // ST: noticeable drift, fade reduced
                // US: early flip, ballooning, almost no fade
                const turnIncrease = isOS ? escalation * 0.3
                    : isST ? escalation * 0.7
                    : escalation * 1.3; // US flips hard
                const fadeChange = isOS ? escalation * 0.2
                    : isST ? -escalation * 0.15
                    : -escalation * 0.5; // US loses fade
                // Drivers amplified vs putters (more speed = more effect)
                const discMult = isPutter ? 0.6 : isMid ? 0.8 : isFairway ? 1.0 : 1.3;
                turn = Math.max(-5, turn - turnIncrease * discMult);
                fade = Math.max(0, Math.min(6, fade + fadeChange * discMult));
                // Distance: headwind reduces carry but lifts early
                // Handled in dist calc below

            } else if (wc.type === 'tailwind') {
                // Tailwind: reduces effective airspeed → disc acts more overstable, less glide, earlier fade
                // OS: drops fast, fade early, very short
                // ST: reduced glide, moderate fade — reliable
                // US: best option, controlled flip, max distance in tailwind
                const turnDecrease = isOS ? escalation * 0.8
                    : isST ? escalation * 0.3
                    : escalation * 0.1; // US still gets slight flip
                const fadeIncrease = isOS ? escalation * 0.6
                    : isST ? escalation * 0.2
                    : -escalation * 0.1; // US fade reduces slightly
                const discMult = isPutter ? 0.6 : isMid ? 0.8 : isFairway ? 1.0 : 1.2;
                turn = Math.min(3, turn + turnDecrease * discMult);
                fade = Math.max(0, Math.min(6, fade + fadeIncrease * discMult));

            } else if (wc.type === 'crosswind') {
                // Left-to-right: lifts left wing → increases turn, weakens fade, carries right
                // Right-to-left: pushes top plate → reduces turn, increases fade, forces left
                if (wc.direction === 'ltr') {
                    // LtR: OS holds, ST drifts right, US turns hard
                    const turnIncrease = isOS ? escalation * 0.2 : isST ? escalation * 0.5 : escalation * 1.1;
                    const fadeDecrease = isOS ? 0 : isST ? escalation * 0.2 : escalation * 0.4;
                    const discMult = isPutter ? 0.5 : isMid ? 0.7 : isFairway ? 0.9 : 1.1;
                    turn = Math.max(-5, turn - turnIncrease * discMult);
                    fade = Math.max(0, fade - fadeDecrease * discMult);
                } else {
                    // RtL: OS dumps hard, ST reliable strong finish, US flies surprisingly straight
                    const turnDecrease = isOS ? escalation * 0.5 : isST ? escalation * 0.1 : -escalation * 0.2;
                    const fadeIncrease = isOS ? escalation * 0.8 : isST ? escalation * 0.4 : -escalation * 0.1;
                    const discMult = isPutter ? 0.5 : isMid ? 0.7 : isFairway ? 0.9 : 1.1;
                    turn = Math.min(3, turn + turnDecrease * discMult);
                    fade = Math.max(0, Math.min(6, fade + fadeIncrease * discMult));
                }
            }
        }

        // Use real throw data if available, otherwise scale from arm speed
        // throwView selects BH or FH arm power for chart display
        const armPower = throwView === 'fh' ? (settings.fhPower || settings.bhPower || settings.maxPower) : (settings.bhPower || settings.maxPower);
        const distBoost = w < 0.7 ? 1 + (w * 0.05) : 1 + (0.035 - (w - 0.7) * 0.1);
        // Wind affects distance: headwind reduces, tailwind adds (capped)
        const windDistMult = wc.type === 'headwind' ? Math.max(0.65, 1 - (windMph / 100))
            : wc.type === 'tailwind' ? Math.min(1.15, 1 + (windMph / 200))
            : 1;
        const calcDist = armPower * (0.4 + (baseSpeed / 12 * 0.6)) * distBoost * windDistMult;
        const dist = d.max_dist && parseFloat(d.max_dist) > 0
            ? parseFloat(d.max_dist) * windDistMult
            : calcDist;

        return { turn, fade, stability: turn + fade, dist };
    };

    const calculatePath = (d) => {
        const s = getStats(d);
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const p = i / 100;
            // BH RH and FH LH curve the same way; FH mirrors BH (opposite hand effect)
            const isRH = settings.handedness === 'right';
            const isBH = throwView === 'bh';
            // Mirror when: FH+RH or BH+LH (one flip = mirror, two flips = same)
            const handMult = (isRH === isBH) ? 1 : -1;
            const x = handMult * ((Math.sin(p * Math.PI * 0.75) * (s.turn * -10)) + (Math.pow(p, 2.5) * (s.fade * -8))) * Math.pow(p, 1.8);
            points.push({ x, y: settings.unit === 'm' ? p * s.dist * 0.3048 : p * s.dist });
        }
        return points;
    };

    // --- BAG EFFICIENCY SCORE ---
    const bagScore = useMemo(() => {
        const active = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
        if (active.length === 0) return null;
        const stabBucket = (t, f) => { const s = parseFloat(t) + parseFloat(f); return s >= 2 ? 'OS' : s <= -1 ? 'US' : 'ST'; };
        const slotKey = (sp, t, f) => {
            const s = parseFloat(sp), b = stabBucket(t, f);
            if (s <= 3) return `putter_${b}`; if (s <= 6) return `mid_${b}`; if (s <= 8) return `fairway_${b}`; return `distance_${b}`;
        };
        const SLOTS_12 = ['putter_ST','putter_OS','putter_US','mid_ST','mid_OS','mid_US','fairway_ST','fairway_OS','fairway_US','distance_ST','distance_OS','distance_US'];
        const filled = new Set(active.map(d => slotKey(d.speed, d.turn, d.fade)));
        const coverageScore = Math.round((filled.size / 12) * 40); // 40pts max

        // Overlap penalty — discs in same slot
        const slotCounts = {};
        active.forEach(d => { const k = slotKey(d.speed, d.turn, d.fade); slotCounts[k] = (slotCounts[k] || 0) + 1; });
        const overlapPenalty = Object.values(slotCounts).reduce((acc, c) => acc + Math.max(0, c - 1) * 5, 0);

        // Speed spread (want coverage from low to high)
        const speeds = active.map(d => parseFloat(d.speed));
        const hasLow = speeds.some(s => s <= 3);
        const hasMid = speeds.some(s => s >= 4 && s <= 8);
        const hasHigh = speeds.some(s => s >= 9);
        const spreadScore = (hasLow ? 10 : 0) + (hasMid ? 15 : 0) + (hasHigh ? 15 : 0); // 40pts max

        // Ideal size bonus (10-18 discs is ideal)
        const sizeScore = active.length >= 6 && active.length <= 20 ? 20 : active.length < 6 ? Math.round(active.length / 6 * 20) : 15;

        const total = Math.max(0, Math.min(100, coverageScore + spreadScore + sizeScore - overlapPenalty));
        const grade = total >= 90 ? 'S' : total >= 75 ? 'A' : total >= 60 ? 'B' : total >= 45 ? 'C' : 'D';
        const color = total >= 90 ? 'text-emerald-400' : total >= 75 ? 'text-green-400' : total >= 60 ? 'text-yellow-400' : total >= 45 ? 'text-orange-400' : 'text-red-400';
        const filledSlots = filled.size;
        const overlaps = Object.values(slotCounts).filter(c => c > 1).length;
        return { total, grade, color, filledSlots, overlaps, coverageScore, spreadScore, sizeScore, overlapPenalty };
    }, [discs, activeBagId]);

    const gapAnalysis = useMemo(() => {
        const active = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
        if (active.length === 0) {
            // Show ALL slots as suggestions when bag is empty
            const ALL_DISCS_EMPTY = [...FACTORY_DB.map(d => ({ Model:d.Model, Manufacturer:d.Manufacturer, Speed:d.Speed, Glide:d.Glide, Turn:d.Turn, Fade:d.Fade, source:'factory' })),
                ...communitySuggestions.map(d => ({ Model:d.model, Manufacturer:d.brand, Speed:d.speed, Glide:d.glide, Turn:d.turn, Fade:d.fade, source:'community' }))];
            const stabBucketE = (turn, fade) => { const s=parseFloat(turn)+parseFloat(fade); return s>=2?'OS':s<=-1?'US':'ST'; };
            const SLOT_FILTER_E = {
                putter_ST:d=>d.Speed<=3&&stabBucketE(d.Turn,d.Fade)==='ST',
                putter_OS:d=>d.Speed<=3&&stabBucketE(d.Turn,d.Fade)==='OS',
                putter_US:d=>d.Speed<=3&&stabBucketE(d.Turn,d.Fade)==='US',
                mid_ST:d=>d.Speed>=4&&d.Speed<=6&&stabBucketE(d.Turn,d.Fade)==='ST',
                mid_OS:d=>d.Speed>=4&&d.Speed<=6&&stabBucketE(d.Turn,d.Fade)==='OS',
                mid_US:d=>d.Speed>=4&&d.Speed<=6&&stabBucketE(d.Turn,d.Fade)==='US',
                fairway_ST:d=>d.Speed>=7&&d.Speed<=8&&stabBucketE(d.Turn,d.Fade)==='ST',
                fairway_OS:d=>d.Speed>=7&&d.Speed<=8&&stabBucketE(d.Turn,d.Fade)==='OS',
                fairway_US:d=>d.Speed>=7&&d.Speed<=8&&stabBucketE(d.Turn,d.Fade)==='US',
                distance_ST:d=>d.Speed>=9&&stabBucketE(d.Turn,d.Fade)==='ST',
                distance_OS:d=>d.Speed>=9&&stabBucketE(d.Turn,d.Fade)==='OS',
                distance_US:d=>d.Speed>=9&&stabBucketE(d.Turn,d.Fade)==='US',
            };
            const ALL_SLOTS_E = [
                {key:'putter_ST', label:'Straight Putter', priority:1},
                {key:'putter_OS', label:'Overstable Putter', priority:2},
                {key:'putter_US', label:'Understable Putter', priority:5},
                {key:'mid_ST', label:'Straight Midrange', priority:1},
                {key:'mid_OS', label:'Overstable Midrange', priority:2},
                {key:'mid_US', label:'Understable Midrange', priority:3},
                {key:'fairway_ST', label:'Straight Fairway Driver', priority:2},
                {key:'fairway_OS', label:'Overstable Fairway Driver', priority:3},
                {key:'fairway_US', label:'Understable Fairway Driver', priority:3},
                {key:'distance_ST', label:'Straight Distance Driver', priority:3},
                {key:'distance_OS', label:'Overstable Distance Driver', priority:2},
                {key:'distance_US', label:'Understable Distance Driver', priority:4},
            ];
            const allGaps = ALL_SLOTS_E.map(s=>({...s, suggestions:ALL_DISCS_EMPTY.filter(SLOT_FILTER_E[s.key]).slice(0,4)}));
            return { gaps: allGaps, allFilled: false, text: 'Bag is Empty — Build Your Bag', filter: null };
        }

        const ALL_DISCS = [...FACTORY_DB.map(d => ({ Model:d.Model, Manufacturer:d.Manufacturer, Speed:d.Speed, Glide:d.Glide, Turn:d.Turn, Fade:d.Fade, source:'factory' })),
            ...communitySuggestions.map(d => ({ Model:d.model, Manufacturer:d.brand, Speed:d.speed, Glide:d.glide, Turn:d.turn, Fade:d.fade, source:'community' }))];

        const stabBucket = (turn, fade) => { const s=parseFloat(turn)+parseFloat(fade); return s>=2?'OS':s<=-1?'US':'ST'; };
        const slotKey = (speed, turn, fade) => {
            const sp=parseFloat(speed), b=stabBucket(turn,fade);
            if(sp<=3) return `putter_${b}`; if(sp<=6) return `mid_${b}`; if(sp<=8) return `fairway_${b}`; return `distance_${b}`;
        };
        const filled = new Set(active.map(d => slotKey(d.speed, d.turn, d.fade)));

        const SLOTS = [
            {key:'putter_ST', label:'Straight Putter', priority:1},
            {key:'putter_OS', label:'Overstable Putter', priority:2},
            {key:'putter_US', label:'Understable Putter', priority:5},
            {key:'mid_ST', label:'Straight Midrange', priority:1},
            {key:'mid_OS', label:'Overstable Midrange', priority:2},
            {key:'mid_US', label:'Understable Midrange', priority:3},
            {key:'fairway_ST', label:'Straight Fairway Driver', priority:2},
            {key:'fairway_OS', label:'Overstable Fairway Driver', priority:3},
            {key:'fairway_US', label:'Understable Fairway Driver', priority:3},
            {key:'distance_ST', label:'Straight Distance Driver', priority:3},
            {key:'distance_OS', label:'Overstable Distance Driver', priority:2},
            {key:'distance_US', label:'Understable Distance Driver', priority:4},
        ];
        const SLOT_FILTER = {
            putter_ST:d=>d.Speed<=3&&stabBucket(d.Turn,d.Fade)==='ST',
            putter_OS:d=>d.Speed<=3&&stabBucket(d.Turn,d.Fade)==='OS',
            putter_US:d=>d.Speed<=3&&stabBucket(d.Turn,d.Fade)==='US',
            mid_ST:d=>d.Speed>=4&&d.Speed<=6&&stabBucket(d.Turn,d.Fade)==='ST',
            mid_OS:d=>d.Speed>=4&&d.Speed<=6&&stabBucket(d.Turn,d.Fade)==='OS',
            mid_US:d=>d.Speed>=4&&d.Speed<=6&&stabBucket(d.Turn,d.Fade)==='US',
            fairway_ST:d=>d.Speed>=7&&d.Speed<=8&&stabBucket(d.Turn,d.Fade)==='ST',
            fairway_OS:d=>d.Speed>=7&&d.Speed<=8&&stabBucket(d.Turn,d.Fade)==='OS',
            fairway_US:d=>d.Speed>=7&&d.Speed<=8&&stabBucket(d.Turn,d.Fade)==='US',
            distance_ST:d=>d.Speed>=9&&stabBucket(d.Turn,d.Fade)==='ST',
            distance_OS:d=>d.Speed>=9&&stabBucket(d.Turn,d.Fade)==='OS',
            distance_US:d=>d.Speed>=9&&stabBucket(d.Turn,d.Fade)==='US',
        };

        const gaps = SLOTS.filter(s=>!filled.has(s.key)).sort((a,b)=>a.priority-b.priority)
            .map(s=>({...s, suggestions:ALL_DISCS.filter(SLOT_FILTER[s.key]).slice(0,4)}));

        return {
            gaps, allFilled: gaps.length===0,
            text: gaps.length===0 ? '✓ Bag Optimised' : `Gap: ${gaps[0]?.label}`,
            filter: gaps[0] ? SLOT_FILTER[gaps[0].key] : null,
        };
    }, [discs, activeBagId, communitySuggestions]);

    // --- SHARED CHART CONFIG BUILDER ---
    // forExport=true → draws disc name pill-labels on canvas (no overlap, larger text)
    const buildChartConfig = (filtered, mode, forExport = false) => {

        const exportLabelPlugin = {
            id: 'exportLabels',
            afterDatasetsDraw(chart) {
                if (!forExport) return;
                const ctx = chart.ctx;
                const W = chart.width; const H = chart.height;
                const positions = [];

                chart.data.datasets.forEach((ds, i) => {
                    if (!ds.data?.length) return;
                    const meta = chart.getDatasetMeta(i);
                    if (meta.hidden) return;
                    let px, py;
                    if (mode === 'path') {
                        const idx = Math.floor(meta.data.length * 0.65);
                        const pt = meta.data[Math.min(idx, meta.data.length-1)];
                        px = pt?.x; py = pt?.y;
                    } else {
                        const pt = meta.data[0];
                        px = pt?.x; py = pt?.y;
                        if (px != null) px += 16;
                    }
                    if (px == null || py == null) return;
                    px = Math.max(50, Math.min(W-50, px));
                    py = Math.max(20, Math.min(H-20, py));
                    positions.push({ label: ds.label, color: ds.borderColor, px, py });
                });

                // Iterative box-overlap repulsion (12 passes)
                const FS = 14; const PH = FS + 10;
                const estW = (l) => l.length * FS * 0.58 + 16;
                for (let iter = 0; iter < 12; iter++) {
                    for (let a = 0; a < positions.length; a++) {
                        for (let b = a+1; b < positions.length; b++) {
                            const pa = positions[a], pb = positions[b];
                            const overX = (estW(pa.label)+estW(pb.label))/2 - Math.abs(pa.px-pb.px);
                            const overY = PH+4 - Math.abs(pa.py-pb.py);
                            if (overX > 0 && overY > 0) {
                                const py2 = overY/2+1, px2 = overX/4;
                                if (pa.py <= pb.py) { pa.py -= py2; pb.py += py2; } else { pa.py += py2; pb.py -= py2; }
                                if (pa.px <= pb.px) { pa.px -= px2; pb.px += px2; } else { pa.px += px2; pb.px -= px2; }
                            }
                        }
                        positions[a].px = Math.max(50, Math.min(W-50, positions[a].px));
                        positions[a].py = Math.max(20, Math.min(H-20, positions[a].py));
                    }
                }

                positions.forEach(({ label, color, px, py }) => {
                    ctx.save();
                    ctx.font = `bold ${FS}px system-ui,sans-serif`;
                    const tw = ctx.measureText(label).width;
                    const bw=tw+14, bh=PH, br=6, bx=px-bw/2, by=py-bh/2;
                    ctx.fillStyle='rgba(11,15,26,0.85)';
                    ctx.beginPath(); ctx.roundRect(bx,by,bw,bh,br); ctx.fill();
                    ctx.fillStyle=color||'#f97316';
                    ctx.beginPath(); ctx.roundRect(bx,by,3,bh,[br,0,0,br]); ctx.fill();
                    ctx.fillStyle='#ffffff'; ctx.textAlign='center'; ctx.textBaseline='middle';
                    ctx.shadowColor='rgba(0,0,0,0.8)'; ctx.shadowBlur=3;
                    ctx.fillText(label, px, py+1);
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
                    borderColor: d.color, backgroundColor: d.color,
                    showLine: mode === 'path',
                    pointRadius: mode === 'path' ? 0 : 9,
                    pointStyle: 'circle',
                    borderDash: d.is_idea ? [5,5] : [],
                    borderWidth: mode === 'path' ? 1.5 : 2,
                    tension: 0.4,
                    cubicInterpolationMode: 'monotone',
                }))
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    x: { min: mode==='path'?-100:-6, max: mode==='path'?100:6, reverse: mode!=='path', grid:{color:'#1e293b'} },
                    y: {
                        min: 0,
                        max: mode==='path'?(settings.unit==='m'?180:550):14,
                        grid:{color:'#1e293b'},
                        ticks: mode==='path'?{}:{stepSize:1,callback:v=>v}
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor:'#0f172a', borderColor:'#1e293b', borderWidth:1, padding:12,
                        callbacks: {
                            title: (items) => items[0]?.dataset?.label||'',
                            label: (item) => {
                                const disc = filtered.find(d => d.name===item.dataset.label);
                                if (!disc) return '';
                                const plastic=disc.plastic||'Premium', weight=disc.weight?disc.weight+'g':'';
                                return `${plastic}${weight?'  •  '+weight:''}`;
                            },
                            labelColor: (item) => ({ borderColor:item.dataset.borderColor, backgroundColor:item.dataset.backgroundColor, borderRadius:4 }),
                        },
                        titleFont:{family:'system-ui',weight:'bold',size:13},
                        bodyFont:{family:'system-ui',size:11},
                        titleColor:'#f1f5f9', bodyColor:'#94a3b8',
                        displayColors:true, boxWidth:10, boxHeight:10,
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
            if (view === 'favorites') {
                if (!d.favorite) return false;
                if (favSubView === 'aces') return d.aces > 0;
                return true;
            }
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
    }, [discs, activeBagId, view, session, settings, chartMode, favSubView, windConfig, throwView]);

    // --- AUTH RENDER ---
    if (!session || authMode === 'profile_setup') return (
        <div className="min-h-[100dvh] w-full bg-[#0b0f1a] flex flex-col lg:flex-row">

            {/* ── LEFT PANEL — branding (desktop only) ── */}
            <div className="hidden lg:flex w-[45%] shrink-0 flex-col items-center justify-center p-16 bg-gradient-to-br from-slate-900 via-[#0b0f1a] to-slate-900 border-r border-slate-800 relative overflow-hidden">
                {/* subtle disc rings background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    {[320,240,160,80].map(s => <div key={s} style={{width:s,height:s}} className="absolute rounded-full border-2 border-orange-500" />)}
                </div>
                <img src={LOGO_URL} alt="BaggedUp" className="w-52 h-52 object-contain mb-8 relative z-10" />
                <h1 className="text-4xl font-black italic uppercase text-white tracking-tight text-center relative z-10">
                    Bagged<span className="text-orange-500">Up</span>
                </h1>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-3 text-center relative z-10">
                    Your disc golf bag, tracked.
                </p>
                <div className="mt-12 space-y-3 relative z-10 w-full max-w-xs">
                    {[
                        { icon: '📊', text: 'Live flight path charts' },
                        { icon: '🎯', text: 'Bag gap analysis & suggestions' },
                        { icon: '🤝', text: 'Card Mates — view friends\' bags' },
                        { icon: '🥏', text: 'Round tracker & graveyard' },
                    ].map(f => (
                        <div key={f.text} className="flex items-center gap-3 text-slate-400">
                            <span className="text-lg">{f.icon}</span>
                            <span className="font-bold text-sm">{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── RIGHT PANEL — forms ── */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 overflow-y-auto">

                {/* Mobile logo — only shows on small screens */}
                <div className="lg:hidden flex flex-col items-center mb-6 shrink-0">
                    <img src={LOGO_URL} alt="BaggedUp" className="w-20 h-20 object-contain" />
                    <h1 className="text-2xl font-black italic uppercase text-white mt-2 tracking-tight">
                        Bagged<span className="text-orange-500">Up</span>
                    </h1>
                </div>

                <div className="w-full max-w-sm lg:max-w-md">

                    {/* Step indicator for signup flow */}
                    {(authMode === 'signup' || authMode === 'profile_setup') && (
                        <div className="flex items-center gap-2 mb-6">
                            <div className={`flex items-center gap-2 flex-1 ${authMode === 'signup' ? 'opacity-100' : 'opacity-40'}`}>
                                <div className={`w-7 h-7 rounded-full text-[11px] font-black flex items-center justify-center shrink-0 ${authMode === 'signup' ? 'bg-orange-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                    {authMode === 'profile_setup' ? '✓' : '1'}
                                </div>
                                <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">Account</span>
                            </div>
                            <div className="h-px flex-1 bg-slate-700" />
                            <div className={`flex items-center gap-2 flex-1 justify-end ${authMode === 'profile_setup' ? 'opacity-100' : 'opacity-30'}`}>
                                <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">Profile</span>
                                <div className={`w-7 h-7 rounded-full text-[11px] font-black flex items-center justify-center shrink-0 ${authMode === 'profile_setup' ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-500'}`}>2</div>
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <div className="mb-6">
                        <h2 className="text-2xl lg:text-3xl font-black italic uppercase text-white">
                            {authMode === 'login' && 'Welcome Back'}
                            {authMode === 'signup' && 'Create Account'}
                            {authMode === 'profile_setup' && 'Your Player Profile'}
                        </h2>
                        <p className="text-slate-500 font-bold text-xs uppercase mt-1">
                            {authMode === 'login' && 'Sign in to your bag'}
                            {authMode === 'signup' && 'Step 1 of 2 — account details'}
                            {authMode === 'profile_setup' && 'Step 2 of 2 — how others find you'}
                        </p>
                    </div>

                    {authMessage && (
                        <div className="p-4 mb-4 bg-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold uppercase">
                            {authMessage}
                        </div>
                    )}

                    {/* ── LOGIN ── */}
                    {authMode === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-3">
                            <input
                                type="email" placeholder="Email address"
                                value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                                className="w-full bg-slate-900 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500 transition placeholder-slate-600"
                            />
                            <input
                                type="password" placeholder="Password"
                                value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                                className="w-full bg-slate-900 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500 transition placeholder-slate-600"
                            />
                            <button type="submit" disabled={authLoading}
                                className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black uppercase text-white shadow-xl disabled:opacity-50 transition mt-1">
                                {authLoading ? 'Signing in…' : 'Log In'}
                            </button>
                            <div className="flex justify-between items-center pt-1">
                                <button type="button" onClick={async () => {
                                    if (!authEmail) { alert('Enter your email above first.'); return; }
                                    const { error } = await supabase.auth.resetPasswordForEmail(authEmail, { redirectTo: window.location.origin });
                                    if (error) alert(error.message);
                                    else setAuthMessage('Password reset email sent!');
                                }} className="text-slate-500 hover:text-orange-400 font-bold uppercase text-xs transition">
                                    Forgot Password?
                                </button>
                                <button type="button" onClick={() => { setAuthMode('signup'); setAuthMessage(''); }}
                                    className="text-orange-500 hover:text-orange-400 font-bold uppercase text-xs transition">
                                    Create Account →
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ── SIGNUP STEP 1 ── */}
                    {authMode === 'signup' && (
                        <form onSubmit={handleLogin} className="space-y-3">
                            <input
                                type="email" placeholder="Email address"
                                value={authEmail} onChange={e => setAuthEmail(e.target.value)} required
                                className="w-full bg-slate-900 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500 transition placeholder-slate-600"
                            />
                            <input
                                type="password" placeholder="Password (min 6 characters)"
                                value={authPassword} onChange={e => setAuthPassword(e.target.value)} required
                                className="w-full bg-slate-900 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500 transition placeholder-slate-600"
                            />
                            <button type="submit" disabled={authLoading}
                                className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black uppercase text-white shadow-xl disabled:opacity-50 transition">
                                {authLoading ? 'Creating Account…' : 'Next →'}
                            </button>
                            <button type="button" onClick={() => { setAuthMode('login'); setAuthMessage(''); }}
                                className="w-full text-slate-500 hover:text-slate-300 font-bold uppercase text-xs py-2 transition">
                                ← Back to Login
                            </button>
                        </form>
                    )}

                    {/* ── SIGNUP STEP 2 — username + PDGA ── */}
                    {authMode === 'profile_setup' && (
                        <form onSubmit={handleProfileSetup} className="space-y-4">

                            {/* Username */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    Username <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black text-sm pointer-events-none">@</span>
                                    <input
                                        type="text"
                                        placeholder="discgolfking"
                                        value={authUsername}
                                        onChange={e => setAuthUsername(e.target.value.replace(/[^a-z0-9_]/g, '').toLowerCase())}
                                        required
                                        className="w-full bg-slate-900 pl-8 pr-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-orange-500 transition placeholder-slate-600"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-600 font-bold">Lowercase letters, numbers and _ only. Other players search you by this.</p>
                            </div>

                            {/* PDGA */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    PDGA Number <span className="text-slate-600 normal-case font-bold">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 12345"
                                    value={authPdga}
                                    onChange={e => setAuthPdga(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full bg-slate-900 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none border border-slate-800 focus:border-cyan-500 transition placeholder-slate-600"
                                />
                            </div>

                            {/* Player Icon */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Your Icon</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {PLAYER_ICONS.map(icon => (
                                        <button key={icon} type="button"
                                            onClick={() => setAuthIcon(icon)}
                                            className={`py-3 text-2xl rounded-2xl border-2 transition ${authIcon === icon ? 'border-orange-500 bg-orange-500/20' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}>
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Player Colour */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Your Colour</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {PLAYER_COLOURS.map(c => (
                                        <button key={c.hex} type="button"
                                            onClick={() => setAuthColour(c.hex)}
                                            className={`py-3 rounded-2xl border-2 transition text-[9px] font-black uppercase ${authColour === c.hex ? 'border-white scale-105' : 'border-transparent hover:border-slate-500'}`}
                                            style={{ backgroundColor: c.hex + '33', borderColor: authColour === c.hex ? c.hex : undefined }}>
                                            <div className="w-5 h-5 rounded-full mx-auto mb-1" style={{ backgroundColor: c.hex }} />
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" disabled={authLoading}
                                className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black uppercase text-white shadow-xl disabled:opacity-50 transition">
                                {authLoading ? 'Saving…' : '🚀 Create Profile & Get Started'}
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );

    // --- FILTERED DISCS (used in both layouts) ---
    const filteredDiscs = discs.filter(d => {
        if (view === 'graveyard') return d.status === 'lost';
        if (view === 'favorites') {
            if (!d.favorite) return false;
            if (favSubView === 'aces') return d.aces > 0;
            return true;
        }
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
                                <h4 className="font-black text-sm uppercase italic leading-none mb-1 truncate">
                                    {d.name}
                                    {d.aces > 0 && (
                                        <span className="ml-2 inline-flex gap-0.5">
                                            {Array.from({length: Math.min(d.aces, 5)}).map((_, i) => (
                                                <span key={i} className="text-yellow-400" title={`${d.aces} ace${d.aces !== 1 ? 's' : ''}`}>🏆</span>
                                            ))}
                                            {d.aces > 5 && <span className="text-yellow-400 text-[10px] font-black">×{d.aces}</span>}
                                        </span>
                                    )}
                                </h4>
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
                input[type="range"] { -webkit-appearance: none; background: linear-gradient(to right, #f97316, #fb923c); height: 8px; border-radius: 10px; outline: none; cursor: pointer; }
                input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #f97316; border: 3px solid #fff; box-shadow: 0 0 8px rgba(249,115,22,0.7); cursor: pointer; }
                input[type="range"]::-moz-range-thumb { height: 24px; width: 24px; border-radius: 50%; background: #f97316; border: 3px solid #fff; box-shadow: 0 0 8px rgba(249,115,22,0.7); cursor: pointer; }
            `}</style>

            {/* =====================================================
                DESKTOP SIDEBAR (lg+)
            ===================================================== */}
            <div className="hidden lg:flex w-52 h-full bg-slate-900 border-r border-slate-800 px-3 py-4 flex-col gap-1 shrink-0 overflow-y-auto">
                {/* Logo + username compact */}
                <div className="flex items-center gap-2 px-2 pb-3 border-b border-slate-800 mb-1">
                    <img src={LOGO_URL} alt="BaggedUp Logo" className="h-8 w-8 object-contain shrink-0" />
                    <div className="min-w-0">
                        <div className="font-black uppercase text-white text-[10px] tracking-wide leading-tight">Bagged<span className="text-orange-500">Up</span></div>
                        {myProfile?.username && <div className="text-[9px] font-bold text-slate-500 truncate">@{myProfile.username}</div>}
                    </div>
                </div>
                {[
                    { id: 'active', label: 'My Bag', icon: '🎒' },
                    { id: 'storage', label: 'Storage', icon: '📦' },
                    { id: 'favorites', label: 'Favourites', icon: '⭐' },
                    { id: 'graveyard', label: 'Graveyard', icon: '🪦' }
                ].map(item => (
                    <button key={item.id} onClick={() => setView(item.id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] transition ${view === item.id ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <span className="text-base">{item.icon}</span> {item.label}
                    </button>
                ))}
                <div className="border-t border-slate-800 my-1" />
                <button onClick={() => setShowExport(true)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] text-purple-400 hover:bg-slate-800 transition">
                    <span className="text-base">📤</span> Export
                </button>
                <button onClick={() => { setRoundBagId(activeBagId); setRoundChecked({}); setLostComment({}); setShowPlayRound(true); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] text-emerald-400 hover:bg-slate-800 transition">
                    <span className="text-base">🥏</span> Play Round
                </button>
                <button onClick={() => setShowCardMates(true)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] transition ${showCardMates ? 'bg-cyan-600 text-white' : 'text-cyan-400 hover:bg-slate-800'}`}>
                    <span className="text-base">🤝</span> Card Mates
                    {cardMates.length > 0 && <span className="ml-auto bg-cyan-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">{cardMates.length}</span>}
                </button>
                <button onClick={() => setShowHeatmap(true)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] text-violet-400 hover:bg-slate-800 transition">
                    <span className="text-base">🔥</span> Heatmap
                </button>
                <div className="mt-auto border-t border-slate-800 pt-1">
                    <button onClick={() => { setSettingsTab('bag'); setAccountEdit({ username: myProfile?.username || '', pdga_number: myProfile?.pdga_number || '', email: session?.user?.email || '' }); setAccountMessage(''); setShowSettings(true); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] text-slate-500 hover:text-slate-300 hover:bg-slate-800 w-full transition">
                        <span className="text-base">⚙️</span> Settings
                    </button>
                    <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-black uppercase text-[10px] text-red-500 hover:bg-red-900/20 w-full transition">
                        <span className="text-base">✕</span> Log Out
                    </button>
                    <div className="text-[8px] font-bold text-slate-700 uppercase text-center pt-1">{APP_VERSION}</div>
                </div>
            </div>

            {/* =====================================================
                MOBILE SIDEBAR OVERLAY
            ===================================================== */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-[100] flex">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-72 h-full bg-slate-900 border-r border-slate-800 p-8 flex flex-col gap-4 overflow-y-auto">
                        <img src={LOGO_URL} alt="BaggedUp Logo" className="h-20 w-20 object-contain shrink-0" />
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
                        <button onClick={() => { setShowHeatmap(true); setSidebarOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs text-violet-400 hover:bg-slate-800 transition"><span className="text-xl">🔥</span> Mold Heatmap</button>
                        <button onClick={() => { setShowCardMates(true); setSidebarOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-xs text-cyan-400 hover:bg-slate-800 transition">
                            <span className="text-xl">🤝</span> Card Mates
                            {cardMates.length > 0 && <span className="ml-2 bg-cyan-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{cardMates.length}</span>}
                        </button>
                        <button onClick={() => { setSettingsTab('bag'); setAccountEdit({ username: myProfile?.username || '', pdga_number: myProfile?.pdga_number || '', email: session?.user?.email || '' }); setAccountMessage(''); setShowSettings(true); setSidebarOpen(false); }} className="flex items-center gap-4 p-4 text-slate-500 font-black uppercase text-xs hover:text-slate-300">⚙️ Settings</button>
                        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-4 p-4 text-red-500 font-black uppercase text-xs hover:text-red-400">✕ Log Out</button>
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
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { setSettingsTab('bag'); setAccountEdit({ username: myProfile?.username || '', pdga_number: myProfile?.pdga_number || '', email: session?.user?.email || '' }); setAccountMessage(''); setShowSettings(true); }}
                            className="lg:hidden w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition flex items-center justify-center text-sm"
                        >⚙️</button>
                        <button onClick={() => setShowSearch(true)} className="bg-orange-600 w-10 h-10 rounded-full font-black text-xl flex items-center justify-center shadow-lg">+</button>
                    </div>
                </header>

                {/* =====================================================
                    MOBILE LAYOUT (below lg): stacked — chart then inventory
                ===================================================== */}
                <main className="lg:hidden flex-1 overflow-y-auto">
                    {!gapAnalysis.allFilled && view === 'active' && (
                        <div className="px-4 pt-4">
                            <button onClick={() => setSuggestionPool(gapAnalysis.gaps)} className="w-full bg-blue-500/10 border border-blue-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-blue-400 animate-pulse">
                                {gapAnalysis.text === 'Bag is Empty — Build Your Bag' ? '🎒 Bag Empty — View All 12 Slot Suggestions' : `${gapAnalysis.gaps.length} gap${gapAnalysis.gaps.length!==1?'s':''} — ${gapAnalysis.text} — View All`}
                            </button>
                        </div>
                    )}
                    {gapAnalysis.allFilled && view === 'active' && (
                        <div className="px-4 pt-4">
                            <div className="w-full bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-emerald-400 text-center">✓ Bag Optimised — All 12 slots filled</div>
                        </div>
                    )}
                    {/* WIND PANEL — mobile */}
                    {view === 'active' && (
                        <div className="px-4 pt-3">
                            {/* Collapsed bar */}
                            <button
                                onClick={() => setShowWindPanel(p => !p)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border transition ${windConfig.type === 'calm' ? 'bg-slate-900/60 border-slate-800 text-slate-500' : 'bg-blue-900/20 border-blue-500/40 text-blue-300'}`}
                            >
                                <span className="text-[10px] font-black uppercase">
                                    {windConfig.type === 'calm' ? '😌 Calm — No Wind' :
                                     windConfig.type === 'headwind' ? `💨 Headwind ${windConfig.speed}${settings.unit === 'm' ? 'km/h' : 'mph'}` :
                                     windConfig.type === 'tailwind' ? `🌬 Tailwind ${windConfig.speed}${settings.unit === 'm' ? 'km/h' : 'mph'}` :
                                     windConfig.direction === 'ltr' ? `↔ Crosswind L→R ${windConfig.speed}${settings.unit === 'm' ? 'km/h' : 'mph'}` :
                                     `↔ Crosswind R→L ${windConfig.speed}${settings.unit === 'm' ? 'km/h' : 'mph'}`}
                                </span>
                                <span className="text-[9px] font-black uppercase text-slate-500">{showWindPanel ? '▲' : '🌬 Set Wind'}</span>
                            </button>
                            {showWindPanel && (
                                <div className="mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                                    {/* Type row */}
                                    <div className="grid grid-cols-4 gap-1.5">
                                        {[['calm','😌','Calm'],['headwind','💨','Head'],['tailwind','🌬','Tail'],['crosswind','↔','Cross']].map(([t,e,l]) => (
                                            <button key={t} onClick={() => setWindConfig(wc => ({ ...wc, type: t, speed: t === 'calm' ? 0 : (wc.speed || 10) }))}
                                                className={`py-2 rounded-xl text-[9px] font-black uppercase transition ${windConfig.type === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                {e}<br/>{l}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Speed input — only when not calm */}
                                    {windConfig.type !== 'calm' && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[9px] font-black uppercase text-slate-500">
                                                <span>Wind Speed</span>
                                                <span className="text-blue-400">{windConfig.speed} {settings.unit === 'm' ? 'km/h' : 'mph'}</span>
                                            </div>
                                            <input type="range" min="1" max={settings.unit === 'm' ? 80 : 50} value={windConfig.speed || 10}
                                                onChange={e => setWindConfig(wc => ({ ...wc, speed: Number(e.target.value) }))}
                                                className="w-full" />
                                            <div className="flex justify-between text-[8px] font-bold text-slate-700 uppercase">
                                                <span>Gentle</span>
                                                <span>{settings.unit === 'm' ? '16-32km/h' : '10-20mph'} = 1 class shift</span>
                                                <span>Extreme</span>
                                            </div>
                                        </div>
                                    )}
                                    {/* Crosswind direction */}
                                    {windConfig.type === 'crosswind' && (
                                        <div className="flex gap-2">
                                            <button onClick={() => setWindConfig(wc => ({ ...wc, direction: 'ltr' }))}
                                                className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition ${windConfig.direction === 'ltr' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                ← Left to Right
                                            </button>
                                            <button onClick={() => setWindConfig(wc => ({ ...wc, direction: 'rtl' }))}
                                                className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition ${windConfig.direction === 'rtl' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                Right to Left →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}


                    {/* BAG SCORE STRIP — mobile */}
                    {bagScore && view === 'active' && (
                        <div className="px-4 pt-2">
                            <button onClick={() => setShowCoach(true)} className="w-full flex items-center gap-3 bg-slate-900/60 border border-slate-800 hover:border-orange-500/40 rounded-2xl px-4 py-2.5 transition">
                                <div className={`text-2xl font-black italic ${bagScore.color}`}>{bagScore.grade}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all ${bagScore.total >= 75 ? 'bg-emerald-500' : bagScore.total >= 50 ? 'bg-yellow-500' : 'bg-orange-500'}`} style={{ width: `${bagScore.total}%` }} />
                                        </div>
                                        <span className={`text-xs font-black ${bagScore.color}`}>{bagScore.total}/100</span>
                                    </div>
                                    <div className="text-[9px] font-bold text-slate-600 uppercase mt-0.5">{bagScore.filledSlots}/12 slots • {bagScore.overlaps > 0 ? `${bagScore.overlaps} overlap${bagScore.overlaps > 1 ? 's' : ''}` : 'No overlaps'} — Tap for Smart Bag Coach 🧠</div>
                                </div>
                            </button>
                        </div>
                    )}

                    <section className="p-4">
                        <div className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800 p-4 shadow-2xl">
                            <div className="flex gap-2 mb-4 max-w-xs mx-auto w-full">
                                <div className="flex bg-slate-800/50 p-1 rounded-2xl flex-1">
                                    <button onClick={() => setChartMode('path')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition ${chartMode === 'path' ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>Path</button>
                                    <button onClick={() => setChartMode('matrix')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition ${chartMode === 'matrix' ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>Stability</button>
                                </div>
                                {chartMode === 'path' && (
                                    <div className="flex bg-slate-800/50 p-1 rounded-2xl">
                                        <button onClick={() => setThrowView('bh')} className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase transition ${throwView === 'bh' ? 'bg-cyan-600 text-white' : 'text-slate-500'}`}>↩BH</button>
                                        <button onClick={() => setThrowView('fh')} className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase transition ${throwView === 'fh' ? 'bg-cyan-600 text-white' : 'text-slate-500'}`}>↪FH</button>
                                    </div>
                                )}
                            </div>
                            <div className="h-[400px] w-full"><canvas id="mainChart"></canvas></div>
                        </div>
                    </section>
                    <section className="px-4 pb-24">
                        <div className="flex items-center justify-between px-2 mb-4">
                            <h2 className="italic text-[10px] font-black uppercase text-slate-500 tracking-widest">{view} Inventory</h2>
                            {view === 'favorites' && (
                                <div className="flex bg-slate-800/60 p-0.5 rounded-xl gap-0.5">
                                    <button onClick={() => setFavSubView('all')} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition ${favSubView === 'all' ? 'bg-yellow-500 text-black' : 'text-slate-500'}`}>All</button>
                                    <button onClick={() => setFavSubView('aces')} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition ${favSubView === 'aces' ? 'bg-yellow-500 text-black' : 'text-slate-500'}`}>🏆 Aces</button>
                                </div>
                            )}
                        </div>
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
                        {!gapAnalysis.allFilled && view === 'active' && (
                            <button onClick={() => setSuggestionPool(gapAnalysis.gaps)} className="shrink-0 w-full bg-blue-500/10 border border-blue-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-blue-400 animate-pulse">
                                {gapAnalysis.text === 'Bag is Empty — Build Your Bag' ? '🎒 Bag Empty — View All 12 Slot Suggestions' : `${gapAnalysis.gaps.length} gap${gapAnalysis.gaps.length!==1?'s':''} detected — ${gapAnalysis.text} — View All Suggestions`}
                            </button>
                        )}
                        {gapAnalysis.allFilled && view === 'active' && (
                            <div className="shrink-0 w-full bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-xl text-[10px] font-black uppercase text-emerald-400 text-center">✓ Bag Optimised — All 12 disc slots covered</div>
                        )}

                        {/* WIND CONTROL + SCORE — desktop */}
                        {view === 'active' && (
                            <div className="shrink-0 flex gap-3 items-center flex-wrap">
                                {/* Wind type buttons */}
                                <div className="flex gap-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-1">
                                    {[['calm','😌','Calm'],['headwind','💨','Headwind'],['tailwind','🌬','Tailwind'],['crosswind','↔','Crosswind']].map(([t,e,l]) => (
                                        <button key={t} onClick={() => setWindConfig(wc => ({ ...wc, type: t, speed: t === 'calm' ? 0 : (wc.speed || 10) }))}
                                            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition whitespace-nowrap ${windConfig.type === t ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-400'}`}>
                                            {e} {l}
                                        </button>
                                    ))}
                                </div>
                                {/* Speed input */}
                                {windConfig.type !== 'calm' && (
                                    <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-2xl px-3 py-1.5">
                                        <span className="text-[9px] font-black uppercase text-slate-500">Speed</span>
                                        <input type="number" min="1" max={settings.unit === 'm' ? 80 : 50}
                                            value={windConfig.speed || 10}
                                            onChange={e => setWindConfig(wc => ({ ...wc, speed: Math.max(1, Number(e.target.value)) }))}
                                            className="w-12 bg-transparent text-blue-400 font-black text-sm text-center outline-none" />
                                        <span className="text-[9px] font-black text-blue-400">{settings.unit === 'm' ? 'km/h' : 'mph'}</span>
                                    </div>
                                )}
                                {/* Crosswind direction */}
                                {windConfig.type === 'crosswind' && (
                                    <div className="flex gap-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-1">
                                        <button onClick={() => setWindConfig(wc => ({ ...wc, direction: 'ltr' }))}
                                            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition ${windConfig.direction === 'ltr' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-400'}`}>
                                            ← L to R
                                        </button>
                                        <button onClick={() => setWindConfig(wc => ({ ...wc, direction: 'rtl' }))}
                                            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition ${windConfig.direction === 'rtl' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-400'}`}>
                                            R to L →
                                        </button>
                                    </div>
                                )}
                                {bagScore && (
                                    <button onClick={() => setShowCoach(true)} className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 hover:border-orange-500/40 rounded-2xl px-4 py-2 transition shrink-0 ml-auto">
                                        <span className={`text-xl font-black italic ${bagScore.color}`}>{bagScore.grade}</span>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${bagScore.total >= 75 ? 'bg-emerald-500' : bagScore.total >= 50 ? 'bg-yellow-500' : 'bg-orange-500'}`} style={{ width: `${bagScore.total}%` }} />
                                                </div>
                                                <span className={`text-xs font-black ${bagScore.color}`}>{bagScore.total}</span>
                                            </div>
                                            <div className="text-[8px] font-bold text-slate-600 uppercase">Smart Bag Coach 🧠</div>
                                        </div>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Two charts side by side, filling all remaining vertical space */}
                        <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">

                            {/* Flight Path Chart */}
                            <div className="bg-slate-900/40 rounded-[2rem] border border-slate-800 p-5 flex flex-col min-h-0 overflow-hidden">
                                <div className="flex items-center justify-between mb-3 shrink-0">
                                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">✈ Flight Path</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-slate-600 uppercase">
                                            {throwView === 'bh'
                                                ? `${settings.unit === 'm' ? Math.round((settings.bhPower || 350) * 0.3048) : (settings.bhPower || 350)}${settings.unit}`
                                                : `${settings.unit === 'm' ? Math.round((settings.fhPower || 250) * 0.3048) : (settings.fhPower || 250)}${settings.unit}`}
                                        </span>
                                        <div className="flex bg-slate-800 p-0.5 rounded-xl">
                                            <button onClick={() => setThrowView('bh')} className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition ${throwView === 'bh' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>↩ BH</button>
                                            <button onClick={() => setThrowView('fh')} className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition ${throwView === 'fh' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>↪ FH</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    <canvas id="desktopPathChart" className="absolute inset-0 w-full h-full"></canvas>
                                </div>
                            </div>

                            {/* Stability Matrix Chart */}
                            <div className="bg-slate-900/40 rounded-[2rem] border border-slate-800 p-5 flex flex-col min-h-0 overflow-hidden">
                                <div className="flex items-center justify-between mb-3 shrink-0">
                                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">◎ Stability Matrix</div>
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    <canvas id="desktopStabChart" className="absolute inset-0 w-full h-full"></canvas>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: Inventory panel — fixed width, full height, scrollable */}
                    <div className="w-[380px] shrink-0 h-full border-l border-slate-800 bg-slate-950/50 flex flex-col">
                        <div className="px-5 py-4 border-b border-slate-800 shrink-0 flex items-center justify-between">
                            <span className="italic text-[10px] font-black uppercase text-slate-500 tracking-widest">{view} Inventory</span>
                            {view === 'favorites' && (
                                <div className="flex bg-slate-800/60 p-0.5 rounded-xl gap-0.5">
                                    <button onClick={() => setFavSubView('all')} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition ${favSubView === 'all' ? 'bg-yellow-500 text-black' : 'text-slate-500'}`}>All</button>
                                    <button onClick={() => setFavSubView('aces')} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition ${favSubView === 'aces' ? 'bg-yellow-500 text-black' : 'text-slate-500'}`}>🏆 Aces</button>
                                </div>
                            )}
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
                        {communitySuggestions.filter(d => d.model.toLowerCase().includes(dbQuery.toLowerCase())).map(d => {
                            const isMyDisc = d.added_by === session?.user?.id;
                            return (
                            <div key={d.id}
                                onClick={() => {
                                    if (!isMyDisc && !d.verified) {
                                        // Another user added this — prompt to verify
                                        setVerifyName(d.model);
                                        setVerifyBrand(d.brand);
                                        setVerifySpeed(d.speed);
                                        setVerifyGlide(d.glide);
                                        setVerifyTurn(d.turn);
                                        setVerifyFade(d.fade);
                                        setVerifyCorrecting(false);
                                        setShowVerifyDisc({ ...d, _fromSearch: true });
                                        setShowSearch(false);
                                    } else {
                                        // My own disc, or already verified — just add it
                                        addDiscToDB({ name: d.model, brand: d.brand, speed: d.speed, glide: d.glide, turn: d.turn, fade: d.fade, wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: true });
                                        setShowSearch(false);
                                    }
                                }}
                                className={`p-6 rounded-2xl border flex justify-between items-center cursor-pointer hover:border-emerald-500 transition ${d.verified ? 'bg-slate-900 border-slate-800' : 'bg-emerald-900/20 border-emerald-600/30'}`}>
                                <div>
                                    <div className={`font-black uppercase italic text-lg ${d.verified ? 'text-white' : 'text-emerald-400'}`}>{d.model}</div>
                                    <div className={`text-[10px] font-bold uppercase ${d.verified ? 'text-slate-500' : 'text-emerald-600'}`}>
                                        {d.brand} • {d.speed}/{d.glide}/{d.turn}/{d.fade}
                                        {d.verified ? ' • ✓ Verified' : ' • Community — Tap to Verify & Add'}
                                    </div>
                                </div>
                                <div className={`font-black text-xl ${d.verified ? 'text-orange-500' : 'text-emerald-500'}`}>+</div>
                            </div>
                            );
                        })}
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

            {/* GAP ANALYSIS MODAL */}
            {suggestionPool && (
                <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl flex flex-col">
                    <div className="flex justify-between items-center mb-4 shrink-0">
                        <div>
                            <h2 className="text-2xl font-black italic text-blue-400 uppercase">🎯 Bag Gap Analysis</h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">
                                {suggestionPool.length === 0 ? 'All 12 slots covered!' : `${suggestionPool.length} of 12 slots missing`}
                            </p>
                        </div>
                        <button onClick={() => setSuggestionPool(null)} className="text-2xl text-slate-500 hover:text-white">✕</button>
                    </div>
                    <div className="shrink-0 mb-4">
                        {[{label:'Putter',slots:['putter_ST','putter_OS','putter_US']},{label:'Midrange',slots:['mid_ST','mid_OS','mid_US']},{label:'Fairway',slots:['fairway_ST','fairway_OS','fairway_US']},{label:'Distance',slots:['distance_ST','distance_OS','distance_US']}].map(row => {
                            const missingKeys = new Set(suggestionPool.map(g => g.key));
                            return (
                                <div key={row.label} className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[9px] font-black uppercase text-slate-500 w-14 shrink-0">{row.label}</span>
                                    {['ST','OS','US'].map((stab,i) => {
                                        const key=row.slots[i]; const isMissing=missingKeys.has(key);
                                        return <div key={stab} className={`flex-1 py-1 rounded-lg text-center text-[8px] font-black uppercase ${isMissing?'bg-red-900/40 border border-red-600/40 text-red-400':'bg-emerald-900/30 border border-emerald-600/30 text-emerald-400'}`}>{isMissing?'✗':'✓'} {stab}</div>;
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex-grow overflow-y-auto space-y-5 pb-10 max-w-2xl w-full mx-auto">
                        {suggestionPool.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">🏆</div>
                                <p className="text-emerald-400 font-black uppercase text-lg">Perfect Bag!</p>
                                <p className="text-slate-500 text-xs font-bold uppercase mt-2">All 12 disc categories are covered</p>
                            </div>
                        ) : suggestionPool.map(gap => (
                            <div key={gap.key} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                    <span className="font-black uppercase text-sm text-white">{gap.label}</span>
                                    <span className="ml-auto text-[9px] font-bold text-slate-600 uppercase">Priority {gap.priority===1?'🔴 High':gap.priority<=3?'🟡 Med':'⚪ Low'}</span>
                                </div>
                                {gap.suggestions?.length > 0 ? (
                                    <div className="space-y-2">
                                        {gap.suggestions.map((d,i) => (
                                            <div key={`${d.Model}-${i}`}
                                                onClick={() => { addDiscToDB({name:d.Model,brand:d.Manufacturer,speed:d.Speed,glide:d.Glide,turn:d.Turn,fade:d.Fade,wear:0,bag_id:activeBagId,status:'active',color:`hsl(${Math.random()*360},70%,60%)`,max_dist:0,aces:0,is_idea:true}); setSuggestionPool(null); }}
                                                className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition ${d.source==='community'?'bg-emerald-900/10 border-emerald-700/30 hover:border-emerald-500':'bg-slate-800/60 border-slate-700/40 hover:border-blue-500'}`}>
                                                <div>
                                                    <span className={`font-black uppercase text-sm ${d.source==='community'?'text-emerald-400':'text-white'}`}>{d.Model}</span>
                                                    <span className="text-slate-500 text-[10px] font-bold uppercase ml-2">{d.Manufacturer}</span>
                                                    {d.source==='community'&&<span className="ml-2 text-[8px] font-black uppercase text-emerald-600 bg-emerald-900/30 px-1.5 py-0.5 rounded">Community</span>}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400">{d.Speed}/{d.Glide}/{d.Turn}/{d.Fade}</span>
                                                    <span className="text-blue-400 font-black text-lg">+</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : <p className="text-slate-600 text-[10px] font-bold uppercase">No suggestions in database — add via the + button</p>}
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
                        <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-1">
                                <span>My Actual Max Distance</span>
                                <span className="text-orange-500">{(settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)).toFixed(0)}{settings.unit}</span>
                            </div>
                            <input name="d" type="range" min={settings.unit === 'm' ? 15 : 50} max={settings.unit === 'm' ? 198 : 650} step="1" defaultValue={settings.unit === 'm' ? (editing.max_dist || getStats(editing).dist) * 0.3048 : (editing.max_dist || getStats(editing).dist)} className="w-full" />
                            <p className="text-[9px] text-slate-600 font-bold">Set your real throw distance for this disc — overrides the calculated estimate. This personalises your flight chart.</p>
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
                <div className="fixed inset-0 z-[200] bg-black/95 p-4 lg:p-8 backdrop-blur-xl flex items-start lg:items-center justify-center overflow-y-auto">
                    <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 w-full max-w-2xl my-auto flex flex-col max-h-[90vh]">

                        {/* Header + tabs — sticky */}
                        <div className="px-8 pt-8 pb-0 shrink-0">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black italic uppercase text-orange-500">Settings</h2>
                                <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-white text-xl transition">✕</button>
                            </div>
                            <div className="flex bg-slate-800 p-1 rounded-2xl gap-1">
                                <button
                                    onClick={() => setSettingsTab('bag')}
                                    className={`flex-1 py-2.5 rounded-xl font-black uppercase text-xs transition ${settingsTab === 'bag' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                                >⚙️ Bag Settings</button>
                                <button
                                    onClick={() => setSettingsTab('account')}
                                    className={`flex-1 py-2.5 rounded-xl font-black uppercase text-xs transition ${settingsTab === 'account' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                                >👤 My Account</button>
                            </div>
                        </div>

                        <div className="p-8 space-y-5 overflow-y-auto flex-1">

                            {/* ── BAG SETTINGS TAB ── */}
                            {settingsTab === 'bag' && (<>
                                <div className="flex flex-col gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Home Territory</span>
                                    <input value={settings.country || ''} onChange={(e) => setSettings({ ...settings, country: e.target.value })} className="bg-transparent font-black text-white uppercase outline-none" />
                                </div>
                                <button onClick={() => setSettings({ ...settings, unit: settings.unit === 'ft' ? 'm' : 'ft' })}
                                    className="w-full bg-slate-800 p-5 rounded-2xl font-black text-xs uppercase flex justify-between">
                                    <span>Unit System</span><span className="text-blue-500">{settings.unit === 'ft' ? 'Feet' : 'Meters'}</span>
                                </button>

                                {/* Handedness + Skill Level — 2 col */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-800 p-3 rounded-2xl space-y-2">
                                        <div className="text-[9px] font-black uppercase text-slate-500">Throwing Hand</div>
                                        <div className="flex gap-1">
                                            {['right','left'].map(h => (
                                                <button key={h} onClick={() => setSettings({...settings, handedness: h})}
                                                    className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition ${settings.handedness === h ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                                    {h === 'right' ? '✋ RH' : '🤚 LH'}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-[8px] text-slate-600 font-bold">Flips the flight chart curve</p>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-2xl space-y-2">
                                        <div className="text-[9px] font-black uppercase text-slate-500">Skill Level</div>
                                        <div className="grid grid-cols-2 gap-1">
                                            {[['beginner','🌱 Beg'],['intermediate','⚡ Int'],['advanced','🔥 Adv'],['pro','🏆 Pro']].map(([s,l]) => (
                                                <button key={s} onClick={() => setSettings({...settings, skillLevel: s})}
                                                    className={`py-1.5 rounded-xl text-[8px] font-black uppercase transition ${settings.skillLevel === s ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                                    {l}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-[8px] text-slate-600 font-bold">Used by Smart Bag Coach</p>
                                    </div>
                                </div>

                                {/* Throw Style */}
                                <div className="bg-slate-800 p-3 rounded-2xl space-y-2">
                                    <div className="text-[9px] font-black uppercase text-slate-500">Throw Style</div>
                                    <div className="grid grid-cols-4 gap-1">
                                        {[['both','↕ Both'],['backhand','↩ BH'],['forehand','↪ FH'],['roller','🌀 Roll']].map(([s,l]) => (
                                            <button key={s} onClick={() => setSettings({...settings, throwStyle: s})}
                                                className={`py-2 rounded-xl text-[8px] font-black uppercase transition ${settings.throwStyle === s ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[8px] text-slate-600 font-bold">Used by Smart Bag Coach for disc suggestions</p>
                                </div>

                                {/* BH and FH arm speed sliders */}
                                {[
                                    { key: 'bhPower', label: '↩ Backhand Max', color: 'text-orange-500' },
                                    { key: 'fhPower', label: '↪ Forehand Max', color: 'text-cyan-400' },
                                ].map(({ key, label, color }) => {
                                    const val = settings.unit === 'm' ? Math.round((settings[key] || 300) * 0.3048) : (settings[key] || 300);
                                    return (
                                        <div key={key} className="bg-slate-800 p-4 rounded-2xl space-y-3">
                                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                                <span>{label}</span>
                                                <span className={color}>{val}{settings.unit}</span>
                                            </div>
                                            <input type="range"
                                                min={settings.unit === 'm' ? 30 : 100}
                                                max={settings.unit === 'm' ? 183 : 600}
                                                step={settings.unit === 'm' ? 1 : 5}
                                                value={val}
                                                onChange={(e) => { const v = Number(e.target.value); const inFeet = settings.unit === 'm' ? Math.round(v / 0.3048) : v; setSettings({...settings, [key]: inFeet, maxPower: key === 'bhPower' ? inFeet : settings.maxPower}); }}
                                                className="w-full" />
                                        </div>
                                    );
                                })}
                                <button onClick={() => { saveSettings(settings); setShowSettings(false); }}
                                    className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black uppercase text-white shadow-xl transition">
                                    Save & Close
                                </button>
                                <button onClick={() => { setShowSettings(false); setTutorialStep(0); setShowTutorial(true); }}
                                    className="w-full bg-blue-600/20 border border-blue-500/30 py-3 rounded-2xl font-black uppercase text-blue-400 text-xs hover:bg-blue-600/30 transition">
                                    📖 View Tutorial
                                </button>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[10px] font-black uppercase text-slate-500">Your Bags</h3>
                                        <span className="text-[9px] font-bold text-slate-600 uppercase">👁 = Visible to Card Mates</span>
                                    </div>
                                    <div className="space-y-2">
                                        {bags.map(bag => (
                                            <div key={bag.id} className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-2xl gap-3">
                                                <span className={`text-sm font-black uppercase flex-1 truncate ${bag.id === activeBagId ? 'text-orange-500' : 'text-slate-300'}`}>{bag.name}</span>
                                                {/* Public toggle */}
                                                <button
                                                    onClick={async () => {
                                                        const newVal = !bag.is_public;
                                                        setBags(prev => prev.map(b => b.id === bag.id ? { ...b, is_public: newVal } : b));
                                                        await supabase.from('bags').update({ is_public: newVal }).eq('id', bag.id);
                                                    }}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition shrink-0 ${bag.is_public ? 'bg-cyan-600/30 border border-cyan-500/40 text-cyan-400' : 'bg-slate-700 border border-slate-600 text-slate-500'}`}
                                                >
                                                    {bag.is_public ? '👁 Public' : '🔒 Private'}
                                                </button>
                                                {bags.length > 1 && <button onClick={() => deleteBag(bag.id)} className="text-red-500 hover:text-red-400 transition text-xs font-black shrink-0">✕</button>}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-700 uppercase">Public bags are visible to your Card Mates. Private bags are only visible to you.</p>
                                </div>
                                <button onClick={() => { const n = prompt("New Bag Name:"); if (n) createBag(n); setShowSettings(false); }}
                                    className="w-full py-4 text-xs font-black uppercase text-slate-500 hover:text-slate-300 transition">
                                    + Create New Bag
                                </button>
                            </>)}

                            {/* ── MY ACCOUNT TAB ── */}
                            {settingsTab === 'account' && (<>

                                {accountMessage && (
                                    <div className={`p-3 rounded-2xl text-xs font-black uppercase text-center ${accountMessage.startsWith('✓') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {accountMessage}
                                    </div>
                                )}

                                {/* Profile card */}
                                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-2" style={{ backgroundColor: (authColour || '#f97316') + '22', borderColor: authColour || '#f97316' }}>{authIcon || '🥏'}</div>
                                    <div className="min-w-0">
                                        <div className="font-black uppercase text-white text-base truncate">
                                            {myProfile?.username ? `@${myProfile.username}` : 'No username set'}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{session?.user?.email}</div>
                                        {myProfile?.pdga_number && (
                                            <div className="text-[10px] font-bold text-cyan-400 uppercase mt-0.5">PDGA #{myProfile.pdga_number}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Username */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black text-sm pointer-events-none">@</span>
                                        <input
                                            type="text"
                                            value={accountEdit.username}
                                            onChange={e => setAccountEdit({ ...accountEdit, username: e.target.value.replace(/[^a-z0-9_]/g, '').toLowerCase() })}
                                            placeholder="your username"
                                            className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500 pl-8 pr-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none transition placeholder-slate-600"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-600 font-bold">Lowercase letters, numbers and _ only.</p>
                                </div>

                                {/* PDGA */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest">PDGA Number <span className="normal-case font-bold text-slate-600">(optional)</span></label>
                                    <input
                                        type="text"
                                        value={accountEdit.pdga_number}
                                        onChange={e => setAccountEdit({ ...accountEdit, pdga_number: e.target.value.replace(/[^0-9]/g, '') })}
                                        placeholder="e.g. 12345"
                                        className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none transition placeholder-slate-600"
                                    />
                                </div>

                                {/* Email (read-only display + change email) */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        value={accountEdit.email}
                                        onChange={e => setAccountEdit({ ...accountEdit, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500 px-5 py-4 rounded-2xl text-white font-bold text-[16px] outline-none transition placeholder-slate-600"
                                    />
                                    <p className="text-[10px] text-slate-600 font-bold">Changing email will send a confirmation to the new address.</p>
                                </div>

                                {/* Save button */}
                                <button
                                    disabled={accountSaving}
                                    onClick={async () => {
                                        setAccountSaving(true);
                                        setAccountMessage('');
                                        try {
                                            // Check username unique (if changed)
                                            if (accountEdit.username !== myProfile?.username) {
                                                const { data: taken } = await supabase.from('profiles').select('id').eq('username', accountEdit.username).single();
                                                if (taken) { setAccountMessage('That username is already taken.'); setAccountSaving(false); return; }
                                            }
                                            // Update profile table
                                            const { error: profErr } = await supabase.from('profiles').update({
                                                username: accountEdit.username.trim().toLowerCase(),
                                                pdga_number: accountEdit.pdga_number.trim() || null,
                                                email: accountEdit.email.trim().toLowerCase(),
                                                icon: authIcon,
                                                colour: authColour,
                                            }).eq('user_id', session.user.id);
                                            if (profErr) throw profErr;
                                            // Update auth email if changed
                                            if (accountEdit.email.trim().toLowerCase() !== session.user.email) {
                                                const { error: emailErr } = await supabase.auth.updateUser({ email: accountEdit.email.trim() });
                                                if (emailErr) throw emailErr;
                                            }
                                            setMyProfile(prev => ({ ...prev, username: accountEdit.username.trim().toLowerCase(), pdga_number: accountEdit.pdga_number.trim() || null, icon: authIcon, colour: authColour }));
                                            setAccountMessage('✓ Profile updated successfully!');
                                        } catch (err) {
                                            setAccountMessage('Error: ' + (err.message || 'Could not save changes.'));
                                        }
                                        setAccountSaving(false);
                                    }}
                                    className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black uppercase text-white shadow-xl disabled:opacity-50 transition"
                                >
                                    {accountSaving ? 'Saving…' : 'Save Changes'}
                                </button>

                                {/* Player Icon */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest">Player Icon</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {PLAYER_ICONS.map(icon => (
                                            <button key={icon} type="button"
                                                onClick={() => setAuthIcon(icon)}
                                                className={`py-3 text-2xl rounded-2xl border-2 transition ${authIcon === icon ? 'border-orange-500 bg-orange-500/20' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}>
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Player Colour */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest">Player Colour</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {PLAYER_COLOURS.map(c => (
                                            <button key={c.hex} type="button"
                                                onClick={() => setAuthColour(c.hex)}
                                                className={`py-3 rounded-2xl border-2 transition text-[9px] font-black uppercase`}
                                                style={{ backgroundColor: c.hex + '22', borderColor: authColour === c.hex ? c.hex : '#334155' }}>
                                                <div className="w-5 h-5 rounded-full mx-auto mb-1" style={{ backgroundColor: c.hex }} />
                                                {c.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Danger zone */}
                                <div className="border-t border-slate-800 pt-4">
                                    <p className="text-[10px] font-black uppercase text-slate-600 mb-3">Danger Zone</p>
                                    <button
                                        onClick={() => { if (confirm('Are you sure you want to sign out?')) supabase.auth.signOut(); }}
                                        className="w-full py-3 bg-red-900/20 border border-red-500/20 rounded-2xl font-black uppercase text-xs text-red-400 hover:bg-red-900/40 transition"
                                    >Sign Out</button>
                                </div>

                            </>)}
                        </div>
                    </div>
                </div>
            )}


        {/* =====================================================
            EXPORT BAG MODAL
        ===================================================== */}
        {showExport && (() => {
            const exportDiscs = discs.filter(d => d.bag_id === activeBagId && d.status === 'active');
            const activeBag = bags.find(b => b.id === activeBagId);

            const runExport = async (format) => {
                setExportLoading(true);
                try {
                    const [{ jsPDF }] = await Promise.all([
                        import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').catch(() => window),
                    ]);
                    const JSPDF = window.jspdf?.jsPDF || jsPDF;

                    const loadLogoB64 = async () => {
                        try {
                            const res = await fetch('/baggedup.logo.png');
                            const blob = await res.blob();
                            return await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
                        } catch { return null; }
                    };

                    if (format === 'pdf') {
                        const doc = new JSPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                        const W = 210; const H = 297;
                        const dark = [11,15,26]; const orange = [249,115,22]; const slate = [30,41,59];
                        const logoB64 = await loadLogoB64();

                        // Page 1: Summary
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
                            // Parse colour robustly — handle both #hex and hsl()
                            let cr=249, cg=115, cb=22;
                            try {
                                const hex=d.color||'#f97316';
                                if (hex.startsWith('#') && hex.length >= 7) {
                                    cr=parseInt(hex.slice(1,3),16)||249; cg=parseInt(hex.slice(3,5),16)||115; cb=parseInt(hex.slice(5,7),16)||22;
                                } else {
                                    const tmp=document.createElement('canvas'); tmp.width=1; tmp.height=1;
                                    const tctx=tmp.getContext('2d'); tctx.fillStyle=hex; tctx.fillRect(0,0,1,1);
                                    const px=tctx.getImageData(0,0,1,1).data; cr=px[0]; cg=px[1]; cb=px[2];
                                }
                            } catch(e) {}
                            doc.setFillColor(cr,cg,cb); doc.rect(13,y-5,3,10,'F');
                            doc.setFontSize(8); doc.setFont('helvetica','bold'); doc.setTextColor(255,255,255);
                            // Disc name + ace indicator (PDF-safe text)
                            const aceStr = d.aces > 0 ? (' [ACE' + (d.aces > 1 ? ' x'+d.aces : '') + ']') : '';
                            doc.text(((d.name||'').slice(0,14) + aceStr).slice(0,24), cols[0]+2, y);
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
                        doc.text('* Orange = beat-in wear effect   ★ = ace', 13, H-12);
                        doc.text('baggedup.vercel.app', W/2, H-6, {align:'center'});

                        // Pages 2 & 3: Charts rendered off-screen at live aspect ratio
                        const getLiveAspect = (id) => { const el=document.getElementById(id); return el&&el.offsetHeight>0?el.offsetWidth/el.offsetHeight:1.6; };
                        const pathAspect=getLiveAspect('desktopPathChart')||getLiveAspect('mainChart')||1.6;
                        const stabAspect=getLiveAspect('desktopStabChart')||getLiveAspect('mainChart')||1.3;
                        const renderChart=(mode,width,height)=>new Promise(resolve=>{
                            const off=document.createElement('canvas'); off.width=width; off.height=height;
                            off.style.cssText='position:absolute;left:-9999px;top:0'; document.body.appendChild(off);
                            const cfg=buildChartConfig(exportDiscs,mode,true); cfg.options.animation=false; cfg.options.responsive=false; cfg.options.maintainAspectRatio=false;
                            const ch=new Chart(off.getContext('2d'),cfg);
                            requestAnimationFrame(()=>requestAnimationFrame(()=>{ const url=off.toDataURL('image/png'); ch.destroy(); document.body.removeChild(off); resolve(url); }));
                        });

                        const pdfCW=W-26;
                        const pdfPathH=Math.min(240,pdfCW/pathAspect); const pdfPathW=pdfPathH*pathAspect;
                        const pathImg=await renderChart('path',1400,Math.round(1400/pathAspect));
                        doc.addPage(); doc.setFillColor(...dark); doc.rect(0,0,W,H,'F');
                        doc.setTextColor(...orange); doc.setFontSize(16); doc.setFont('helvetica','bold'); doc.text('Flight Paths',13,16);
                        doc.setTextColor(148,163,184); doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.text(activeBag?.name||'My Bag',13,23);
                        doc.addImage(pathImg,'PNG',(W-pdfPathW)/2,28,pdfPathW,pdfPathH);
                        doc.setTextColor(71,85,105); doc.setFontSize(7); doc.text('baggedup.vercel.app',W/2,H-6,{align:'center'});

                        const pdfStabH=Math.min(240,pdfCW/stabAspect); const pdfStabW=pdfStabH*stabAspect;
                        const stabImg=await renderChart('matrix',1400,Math.round(1400/stabAspect));
                        doc.addPage(); doc.setFillColor(...dark); doc.rect(0,0,W,H,'F');
                        doc.setTextColor(...orange); doc.setFontSize(16); doc.setFont('helvetica','bold'); doc.text('Stability Matrix',13,16);
                        doc.setTextColor(148,163,184); doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.text('Speed vs Stability (Turn + Fade)',13,23);
                        doc.addImage(stabImg,'PNG',(W-pdfStabW)/2,28,pdfStabW,pdfStabH);
                        doc.setTextColor(71,85,105); doc.setFontSize(7); doc.text('baggedup.vercel.app',W/2,H-6,{align:'center'});

                        doc.save(`BaggedUp-${(activeBag?.name||'bag').replace(/\s+/g,'-')}.pdf`);

                    } else if (format === 'png-story' || format === 'png-post') {
                        // ── Off-screen chart renderer (uses live aspect ratio) ──
                        const getLiveAspect = (id) => {
                            const el = document.getElementById(id);
                            return el && el.offsetHeight > 0 ? el.offsetWidth / el.offsetHeight : 1.6;
                        };
                        const pathAspect = getLiveAspect('desktopPathChart') || getLiveAspect('mainChart') || 1.6;
                        const stabAspect = getLiveAspect('desktopStabChart') || getLiveAspect('mainChart') || 1.3;

                        const renderChart = (mode, width, height) => new Promise(resolve => {
                            const off = document.createElement('canvas');
                            off.width = width; off.height = height;
                            off.style.cssText = 'position:absolute;left:-9999px;top:0';
                            document.body.appendChild(off);
                            const cfg = buildChartConfig(exportDiscs, mode, true);
                            cfg.options.animation = false;
                            cfg.options.responsive = false;
                            cfg.options.maintainAspectRatio = false;
                            const ch = new Chart(off.getContext('2d'), cfg);
                            requestAnimationFrame(() => requestAnimationFrame(() => {
                                const url = off.toDataURL('image/png');
                                ch.destroy(); document.body.removeChild(off);
                                resolve(url);
                            }));
                        });

                        const loadLogoImg = () => new Promise(r => {
                            const img = new Image(); img.crossOrigin = 'anonymous';
                            img.onload = () => r(img); img.onerror = () => r(null);
                            img.src = '/baggedup.logo.png?' + Date.now();
                        });

                        const isStory = format === 'png-story';
                        const CW = 1080; const CH = isStory ? 1920 : 1350;
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

                        // New centred header: logo → bag name → tagline
                        const HEADER_H = isStory ? 320 : 260;
                        const FOOTER_H = isStory ? 80 : 70;

                        function drawHeader(ctx, title, subtitle) {
                            const logoSz = isStory ? 160 : 130;
                            const logoY = isStory ? 40 : 30;
                            // Logo centred
                            if (logoImg) {
                                ctx.drawImage(logoImg, (CW-logoSz)/2, logoY, logoSz, logoSz);
                            } else {
                                ctx.fillStyle='#f97316'; rrPath(ctx,(CW-logoSz)/2,logoY,logoSz,logoSz,20); ctx.fill();
                                ctx.fillStyle='#fff'; ctx.font=`bold ${isStory?28:22}px system-ui`; ctx.textAlign='center';
                                ctx.fillText('BAGGED',CW/2,logoY+logoSz*0.45); ctx.fillText('UP',CW/2,logoY+logoSz*0.72);
                            }
                            // Bag name / title
                            const titleY = logoY + logoSz + (isStory ? 36 : 28);
                            ctx.fillStyle='#f97316'; ctx.font=`900 ${isStory?64:52}px system-ui,sans-serif`; ctx.textAlign='center';
                            ctx.fillText(title.toUpperCase(), CW/2, titleY);
                            // Subtitle
                            const subY = titleY + (isStory ? 44 : 36);
                            ctx.fillStyle='#64748b'; ctx.font=`bold ${isStory?26:22}px system-ui,sans-serif`; ctx.textAlign='center';
                            ctx.fillText('YOUR DISC GOLF BAG, TRACKED.', CW/2, subY);
                            // Byline
                            const byY = subY + (isStory ? 32 : 26);
                            ctx.fillStyle='#f97316'; ctx.font=`bold ${isStory?22:18}px system-ui,sans-serif`; ctx.textAlign='center';
                            ctx.fillText('by BaggedUp', CW/2, byY);
                            // Separator line
                            const lineY = byY + (isStory ? 28 : 22);
                            ctx.strokeStyle='#1e293b'; ctx.lineWidth=2;
                            ctx.beginPath(); ctx.moveTo(PAD,lineY); ctx.lineTo(CW-PAD,lineY); ctx.stroke();
                            return lineY + 16;
                        }

                        function drawFooter(ctx) {
                            // Bigger, brighter URL
                            ctx.fillStyle='#64748b'; ctx.font=`bold ${isStory?32:28}px system-ui,sans-serif`;
                            ctx.textAlign='center'; ctx.fillText('baggedup.vercel.app', CW/2, CH - (isStory?32:24));
                        }

                        function mkC() { const c=document.createElement('canvas'); c.width=CW; c.height=CH; return c; }

                        // ── Slide 1: Disc Overview ──
                        const s1=mkC(); const c1=s1.getContext('2d');
                        c1.fillStyle='#0b0f1a'; c1.fillRect(0,0,CW,CH);
                        const top1=drawHeader(c1, activeBag?.name||'My Bag', '');
                        const avail1=CH-top1-FOOTER_H;
                        const rh=Math.min(90,Math.floor(avail1/Math.max(exportDiscs.length,1)));
                        let ry=top1+4;
                        exportDiscs.forEach(d => {
                            c1.fillStyle='#0f172a'; rrPath(c1,PAD,ry,CW-PAD*2,rh-8,14); c1.fill();
                            // Colour bar - use disc colour directly (canvas handles hsl natively)
                            c1.fillStyle=d.color||'#f97316'; rrPath(c1,PAD,ry,12,rh-8,4); c1.fill();
                            const fs=Math.min(28,rh*0.34);
                            c1.fillStyle='#fff'; c1.font=`bold ${fs}px system-ui,sans-serif`; c1.textAlign='left';
                            c1.fillText(d.name.toUpperCase(), PAD+26, ry+(rh-8)*0.44);
                            if (d.aces > 0) {
                                const nameWidth = c1.measureText(d.name.toUpperCase()).width;
                                const tX = PAD+26+nameWidth+10, tY = ry+(rh-8)*0.44;
                                const tSz = Math.min(fs*0.85, 24);
                                c1.font = `${tSz}px serif`;
                                for (let i=0; i<Math.min(d.aces,4); i++) c1.fillText('🏆', tX+i*(tSz+3), tY);
                                if (d.aces>4) { c1.fillStyle='#fbbf24'; c1.font=`bold ${Math.min(14,rh*0.16)}px system-ui`; c1.fillText(`×${d.aces}`, tX+4*(tSz+3), tY); c1.fillStyle='#fff'; }
                            }
                            c1.fillStyle='#64748b'; c1.font=`bold ${Math.min(17,rh*0.2)}px system-ui,sans-serif`; c1.textAlign='left';
                            c1.fillText(`${d.brand} • ${d.plastic||'Premium'}`, PAD+26, ry+(rh-8)*0.72);
                            const bw=70,bh=rh-18,gx=8,sx=CW-PAD-(bw+gx)*4;
                            [d.speed,d.glide,d.turn,d.fade].forEach((v,i)=>{
                                const bx=sx+i*(bw+gx);
                                c1.fillStyle='#1e293b'; rrPath(c1,bx,ry+5,bw,bh,10); c1.fill();
                                c1.fillStyle='#475569'; c1.font='bold 12px system-ui,sans-serif'; c1.textAlign='center';
                                c1.fillText(['S','G','T','F'][i],bx+bw/2,ry+20);
                                c1.fillStyle='#fff'; c1.font=`bold ${Math.min(22,rh*0.26)}px system-ui,sans-serif`;
                                c1.fillText(String(v),bx+bw/2,ry+bh*0.72+5);
                            });
                            ry+=rh;
                        });
                        drawFooter(c1);

                        // ── Slide 2: Flight Paths ──
                        const cpxW=CW-PAD*2;
                        const s2=mkC(); const c2=s2.getContext('2d');
                        c2.fillStyle='#0b0f1a'; c2.fillRect(0,0,CW,CH);
                        const top2=drawHeader(c2,'Flight Paths','');
                        const avail2=CH-top2-FOOTER_H;
                        // Render chart to fill the available space at correct aspect ratio
                        const chartW2=cpxW, chartH2=Math.round(avail2*0.96);
                        const pathUrl=await renderChart('path',chartW2,chartH2);
                        const pImg=new Image(); pImg.src=pathUrl; await new Promise(r=>{pImg.onload=r;});
                        c2.drawImage(pImg, PAD, top2, chartW2, chartH2);
                        drawFooter(c2);

                        // ── Slide 3: Stability Matrix ──
                        const s3=mkC(); const c3=s3.getContext('2d');
                        c3.fillStyle='#0b0f1a'; c3.fillRect(0,0,CW,CH);
                        const top3=drawHeader(c3,'Stability Matrix','');
                        const avail3=CH-top3-FOOTER_H;
                        const chartH3=Math.round(avail3*0.96);
                        const stabUrl=await renderChart('matrix',cpxW,chartH3);
                        const sImg=new Image(); sImg.src=stabUrl; await new Promise(r=>{sImg.onload=r;});
                        c3.drawImage(sImg, PAD, top3, cpxW, chartH3);
                        drawFooter(c3);

                        const base=`BaggedUp-${(activeBag?.name||'bag').replace(/\s+/g,'-')}`;
                        const slides=[{canvas:s1,suffix:'overview'},{canvas:s2,suffix:'flight-paths'},{canvas:s3,suffix:'stability'}];

                        if (isStory && navigator.share && navigator.canShare) {
                            const files=await Promise.all(slides.map(sl=>new Promise(res=>sl.canvas.toBlob(blob=>res(new File([blob],`${base}-${sl.suffix}.png`,{type:'image/png'}))))));
                            if (navigator.canShare({files})) {
                                try { await navigator.share({files,title:`My ${activeBag?.name} — BaggedUp`}); setExportLoading(false); return; }
                                catch(e) {}
                            }
                        }
                        for (const sl of slides) {
                            await new Promise(res=>sl.canvas.toBlob(blob=>{
                                const a=document.createElement('a'); a.download=`${base}-${sl.suffix}.png`;
                                a.href=URL.createObjectURL(blob); a.click(); setTimeout(res,500);
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

                        {/* Social PNG Export */}
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
                                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">Instagram → + → Story/Post → select image.</p>
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

        {/* =====================================================
            COMMUNITY DISC VERIFICATION MODAL
        ===================================================== */}
        {showVerifyDisc && (() => {
            const disc = showVerifyDisc;

            const handleConfirm = async () => {
                const { error } = await supabase.from('community_suggestions')
                    .update({ model: verifyName, brand: verifyBrand, speed: parseFloat(verifySpeed), glide: parseFloat(verifyGlide), turn: parseFloat(verifyTurn), fade: parseFloat(verifyFade), verified: true })
                    .eq('id', disc.id);
                if (!error) {
                    setCommunitySuggestions(prev => prev.map(cs => cs.id === disc.id
                        ? { ...cs, model: verifyName, brand: verifyBrand, speed: parseFloat(verifySpeed), glide: parseFloat(verifyGlide), turn: parseFloat(verifyTurn), fade: parseFloat(verifyFade), verified: true }
                        : cs));
                }
                // Add to bag as a REAL disc (is_idea: false) since user verified it
                await addDiscToDB({ name: verifyName, brand: verifyBrand, speed: parseFloat(verifySpeed), glide: parseFloat(verifyGlide), turn: parseFloat(verifyTurn), fade: parseFloat(verifyFade), wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: false });
                setShowVerifyDisc(null);
            };

            const handleCorrect = async () => {
                await supabase.from('community_suggestions')
                    .update({ model: verifyName, brand: verifyBrand, speed: parseFloat(verifySpeed), glide: parseFloat(verifyGlide), turn: parseFloat(verifyTurn), fade: parseFloat(verifyFade) })
                    .eq('id', disc.id);
                setCommunitySuggestions(prev => prev.map(cs => cs.id === disc.id
                    ? { ...cs, model: verifyName, brand: verifyBrand, speed: parseFloat(verifySpeed), glide: parseFloat(verifyGlide), turn: parseFloat(verifyTurn), fade: parseFloat(verifyFade) }
                    : cs));
                // Add to bag as real disc — they corrected and confirmed it
                await addDiscToDB({ name: verifyName, brand: verifyBrand, speed: parseFloat(verifySpeed), glide: parseFloat(verifyGlide), turn: parseFloat(verifyTurn), fade: parseFloat(verifyFade), wear: 0, bag_id: activeBagId, status: 'active', color: `hsl(${Math.random() * 360},70%,60%)`, max_dist: 0, aces: 0, is_idea: false });
                setShowVerifyDisc(null);
            };

            return (
                <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto">
                    <div className="bg-slate-900 border border-emerald-600/40 rounded-[2.5rem] w-full max-w-lg p-8 space-y-6 my-auto">
                        <div className="text-center">
                            <div className="text-4xl mb-3">🔍</div>
                            <h2 className="text-2xl font-black italic uppercase text-emerald-400">Verify This Disc</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Another pilot added this disc. Please confirm the details are correct to help verify it for everyone!</p>
                        </div>

                        {verifyCorrecting ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div><p className="text-[9px] font-black text-slate-500 uppercase mb-1">Disc Model</p><input value={verifyName} onChange={e=>setVerifyName(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl font-bold uppercase text-white text-[16px] outline-none border border-slate-700 focus:border-emerald-500"/></div>
                                    <div><p className="text-[9px] font-black text-slate-500 uppercase mb-1">Manufacturer</p><input value={verifyBrand} onChange={e=>setVerifyBrand(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl font-bold uppercase text-white text-[16px] outline-none border border-slate-700 focus:border-emerald-500"/></div>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    {[['Speed',verifySpeed,setVerifySpeed,1,13],['Glide',verifyGlide,setVerifyGlide,1,7],['Turn',verifyTurn,setVerifyTurn,-5,3],['Fade',verifyFade,setVerifyFade,0,4]].map(([label,val,setter,min,max])=>(
                                        <div key={label}><p className="text-[8px] font-black text-slate-500 uppercase mb-1">{label}</p><input type="text" inputMode="decimal" value={val} onChange={e=>{const v=parseFloat(e.target.value);if(!isNaN(v))setter(Math.max(min,Math.min(max,v)));else setter(e.target.value);}} className="w-full bg-slate-800 p-3 rounded-xl font-black text-center text-white text-[16px] outline-none"/></div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={()=>setVerifyCorrecting(false)} className="flex-1 py-3 bg-slate-800 rounded-2xl font-black uppercase text-xs text-slate-400">← Back</button>
                                    <button onClick={handleCorrect} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black uppercase text-xs text-white">Submit Correction & Add</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-slate-800/60 rounded-2xl p-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-black uppercase italic text-xl text-white">{verifyName}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{verifyBrand}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            {[['S',verifySpeed],['G',verifyGlide],['T',verifyTurn],['F',verifyFade]].map(([l,v])=>(
                                                <div key={l} className="bg-slate-700 px-2.5 py-1.5 rounded-lg text-center">
                                                    <div className="text-[7px] font-black text-slate-500 uppercase">{l}</div>
                                                    <div className="text-sm font-black text-white">{v}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-[10px] font-bold text-slate-500 uppercase">Are these flight numbers correct?</p>
                                <div className="flex gap-3">
                                    <button onClick={()=>setShowVerifyDisc(null)} className="py-3 px-4 bg-slate-800 rounded-2xl font-black uppercase text-xs text-slate-400">Cancel</button>
                                    <button onClick={()=>setVerifyCorrecting(true)} className="flex-1 py-3 bg-red-600/20 border border-red-500/30 rounded-2xl font-black uppercase text-xs text-red-400 hover:bg-red-600/30 transition">✗ Wrong Info</button>
                                    <button onClick={handleConfirm} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black uppercase text-xs text-white shadow-lg transition">✓ Confirm & Add</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        })()}

        {/* =====================================================
            TUTORIAL MODAL
        ===================================================== */}
        {showTutorial && (() => {
            const STEPS = [
                {
                    icon: '🎒',
                    title: 'Welcome to BaggedUp!',
                    color: 'text-orange-500',
                    tag: null,
                    body: 'Your complete disc golf bag tracker and coach. Add your discs, visualise flights, simulate wind, analyse your bag gaps and get smart coaching — all in one place.',
                    tip: null,
                },
                {
                    icon: '➕',
                    title: 'Adding Discs',
                    color: 'text-orange-500',
                    tag: '+ Button — Top Right',
                    body: "Tap the orange + to search thousands of disc moulds. Tap any disc to add it as a wishlist idea first. Once you own it, hit ✓ Bought to mark it active. Can't find yours? Add it to the global community directory.",
                    tip: 'Community discs show in green — tap to verify the numbers and help everyone.',
                },
                {
                    icon: '📊',
                    title: 'Flight Charts',
                    color: 'text-blue-400',
                    tag: 'Main Screen',
                    body: 'Two live charts update as you build your bag. Flight Path shows how each disc curves. Toggle ↩ BH / ↪ FH on the chart to switch between your backhand and forehand arm speeds. Stability Matrix shows speed vs stability across your whole bag.',
                    tip: 'Wear affects the chart too — drag the Fresh → Beat slider on any disc to see how beat-in plastic flies.',
                },
                {
                    icon: '💨',
                    title: 'Wind Simulator',
                    color: 'text-blue-400',
                    tag: 'Above the Charts',
                    body: 'Select Headwind, Tailwind or Crosswind and dial in the exact speed in mph or km/h. The flight paths update in real time — overstable discs tighten up in headwinds, understable discs balloon. Crosswind direction (L→R or R→L) matters too.',
                    tip: 'At 20+ mph headwind, a straight disc flies like an understable one. Use this to plan your shot selection on windy days.',
                },
                {
                    icon: '🧠',
                    title: 'Smart Bag Coach',
                    color: 'text-orange-500',
                    tag: 'Bag Score — Tap It',
                    body: 'Your bag gets a score from 0–100 (grade S to D) based on slot coverage, speed spread and bag size. Tap the score bar to open the Coach — it shows overlapping discs, speed gaps, arm speed mismatches and missing slots with suggestions.',
                    tip: 'Set your Backhand and Forehand max distance in Settings — the Coach uses them to flag discs that may be too fast for your arm.',
                },
                {
                    icon: '🔥',
                    title: 'Mold Slot Heatmap',
                    color: 'text-violet-400',
                    tag: '🔥 Heatmap — Sidebar',
                    body: 'A visual grid showing all 12 speed × stability combinations. Orange cells = covered, dark = missing. Each cell lists your discs including plastic and wear. Overlapping slots are highlighted yellow.',
                    tip: 'Community insights will appear here as more players join — showing trending moulds and what similar players carry.',
                },
                {
                    icon: '⚙️',
                    title: 'Settings & Profile',
                    color: 'text-purple-400',
                    tag: '⚙️ Settings — Sidebar',
                    body: 'Set your unit (ft/m), backhand and forehand max distance, throwing hand (flips the flight chart left/right), skill level and throw style (BH/FH/Roller — personalises bag coaching). In My Account, choose your player icon and colour — visible to Card Mates.',
                    tip: 'Bags can be set Public or Private — public bags are visible to your Card Mates.',
                },
                {
                    icon: '🤝',
                    title: 'Card Mates',
                    color: 'text-cyan-400',
                    tag: '🤝 Card Mates — Sidebar',
                    body: "Search any player by username, PDGA number or email to view their public bag. Save them as Card Mates to quickly check what they're throwing before a round. Their icon and colour show on their profile.",
                    tip: 'Make your bags public in Settings to let your crew view them.',
                },
                {
                    icon: '🥏',
                    title: 'Play a Round',
                    color: 'text-emerald-400',
                    tag: '🥏 Play Round — Sidebar',
                    body: 'Before heading out, open Play Round for a checklist of your full bag. When you get back, tick every disc you still have. Unticked discs move to the Graveyard with a note about where you lost them.',
                    tip: null,
                },
                {
                    icon: '📤',
                    title: 'Export & Share',
                    color: 'text-purple-400',
                    tag: '📤 Export — Sidebar',
                    body: 'Export your bag as a PDF or image with all disc specs, flight numbers, wear stats and charts at full resolution. Perfect for sharing with your crew or printing for the course.',
                    tip: 'The export renders both Flight Path and Stability Matrix charts.',
                },
            ];
            const step = STEPS[tutorialStep];
            const isLast = tutorialStep === STEPS.length - 1;

            return (
                <div className="fixed inset-0 z-[400] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden">
                        {/* Coloured top bar */}
                        <div className={`h-1 w-full ${step.color.replace('text-','bg-')}`} />

                        <div className="p-8 space-y-5">
                            {/* Progress bar */}
                            <div className="flex gap-1 justify-center">
                                {STEPS.map((_, i) => (
                                    <div key={i} onClick={() => setTutorialStep(i)} className={`h-1 rounded-full transition-all cursor-pointer ${i === tutorialStep ? 'w-8 bg-orange-500' : i < tutorialStep ? 'flex-1 bg-orange-500/40' : 'flex-1 bg-slate-700'}`} />
                                ))}
                            </div>

                            {/* Step counter */}
                            <div className="text-center">
                                <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">{tutorialStep + 1} of {STEPS.length}</span>
                            </div>

                            {/* Icon + title */}
                            <div className="text-center space-y-2">
                                <div className="text-5xl">{step.icon}</div>
                                <h2 className={`text-xl font-black italic uppercase ${step.color}`}>{step.title}</h2>
                                {step.tag && (
                                    <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">📍 {step.tag}</span>
                                    </div>
                                )}
                            </div>

                            {/* Body */}
                            <p className="text-slate-300 font-bold text-sm leading-relaxed text-center">{step.body}</p>

                            {/* Tip */}
                            {step.tip && (
                                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-4 py-3">
                                    <p className="text-orange-400 text-[11px] font-bold leading-relaxed">💡 {step.tip}</p>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex gap-3 pt-1">
                                {tutorialStep > 0 && (
                                    <button onClick={() => setTutorialStep(s => s - 1)} className="py-3 px-5 bg-slate-800 rounded-2xl font-black uppercase text-xs text-slate-400 hover:bg-slate-700 transition">← Back</button>
                                )}
                                <button
                                    onClick={() => {
                                        if (isLast) {
                                            localStorage.setItem(`tutorial_seen_${session.user.id}`, 'true');
                                            setShowTutorial(false);
                                        } else {
                                            setTutorialStep(s => s + 1);
                                        }
                                    }}
                                    className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 rounded-2xl font-black uppercase text-xs text-white shadow-lg transition"
                                >
                                    {isLast ? '🚀 Let\'s Go!' : 'Next →'}
                                </button>
                            </div>
                            {!isLast && (
                                <button onClick={() => { localStorage.setItem(`tutorial_seen_${session.user.id}`, 'true'); setShowTutorial(false); }} className="w-full text-center text-[10px] font-bold text-slate-700 uppercase hover:text-slate-500 transition">Skip Tour</button>
                            )}
                        </div>
                    </div>
                </div>
            );
        })()}

        {/* =====================================================
            CARD MATES MODAL
        ===================================================== */}
        {showCardMates && (
            <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
                <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 my-auto">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black italic text-cyan-400 uppercase">🤝 Card Mates</h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Search players by email, check their bag, save them as mates</p>
                        </div>
                        <button onClick={() => { setShowCardMates(false); setViewingMate(null); setCardMateSearchResult(null); setCardMateSearch(''); }} className="text-2xl text-slate-500 hover:text-white">✕</button>
                    </div>

                    {/* Search bar */}
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search by username, PDGA number or email..."
                            value={cardMateSearch}
                            onChange={e => { setCardMateSearch(e.target.value); setCardMateSearchResult(null); }}
                            onKeyDown={e => e.key === 'Enter' && cardMateSearch && searchCardMate(cardMateSearch)}
                            className="flex-1 bg-slate-900 border border-slate-700 text-white font-bold text-sm px-5 py-4 rounded-2xl outline-none focus:border-cyan-500 placeholder-slate-600"
                        />
                        <button
                            onClick={() => cardMateSearch && searchCardMate(cardMateSearch)}
                            disabled={cardMateSearchLoading}
                            className="bg-cyan-600 hover:bg-cyan-500 px-6 py-4 rounded-2xl font-black uppercase text-xs text-white transition disabled:opacity-50"
                        >
                            {cardMateSearchLoading ? '...' : 'Search'}
                        </button>
                    </div>

                    {/* Search result */}
                    {cardMateSearchResult && (
                        <div className={`rounded-2xl border p-5 ${cardMateSearchResult.found ? 'bg-cyan-900/20 border-cyan-600/40' : 'bg-red-900/20 border-red-600/30'}`}>
                            {cardMateSearchResult.found ? (
                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-cyan-900/50 border border-cyan-600/40 flex items-center justify-center text-2xl shrink-0">🎯</div>
                                        <div>
                                            <div className="font-black uppercase text-white text-base">
                                                {cardMateSearchResult.username ? `@${cardMateSearchResult.username}` : cardMateSearchResult.email}
                                            </div>
                                            {cardMateSearchResult.pdga && (
                                                <div className="text-[10px] font-bold text-cyan-400 uppercase">PDGA #{cardMateSearchResult.pdga}</div>
                                            )}
                                            {cardMateSearchResult.country && (
                                                <div className="text-[10px] font-bold text-slate-500 uppercase">📍 {cardMateSearchResult.country}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => loadMateBag(cardMateSearchResult.userId, cardMateSearchResult.username || cardMateSearchResult.email, null)}
                                            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-black uppercase text-xs text-white transition"
                                        >👀 View Bag</button>
                                        {cardMateSearchResult.userId === session?.user?.id ? (
                                            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-black uppercase text-xs text-slate-500">That's you!</span>
                                        ) : !cardMates.some(cm => cm.mate_user_id === cardMateSearchResult.userId) ? (
                                            <button
                                                onClick={() => addCardMate(cardMateSearchResult.userId, cardMateSearchResult.email, cardMateSearchResult.username, cardMateSearchResult.pdga, cardMateSearchResult.icon, cardMateSearchResult.colour)}
                                                className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl font-black uppercase text-xs text-white transition"
                                            >+ Add Mate</button>
                                        ) : (
                                            <span className="bg-emerald-900/30 border border-emerald-600/30 px-4 py-2 rounded-xl font-black uppercase text-xs text-emerald-400">✓ Saved</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-400 font-black uppercase text-xs text-center">No player found — try their username, PDGA number or email</p>
                            )}
                        </div>
                    )}

                    {/* Loading state */}
                    {mateBagLoading && (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
                            <div className="text-3xl mb-3 animate-pulse">🎒</div>
                            <p className="text-slate-500 font-black uppercase text-xs">Loading bag…</p>
                        </div>
                    )}

                    {/* Viewing a mate's bag */}
                    {!mateBagLoading && viewingMate && (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                                <div>
                                    <p className="font-black uppercase text-white text-sm">🎒 {viewingMate.email}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                                        {viewingMate.bags.length > 0
                                            ? `${viewingMate.bags.length} public bag${viewingMate.bags.length !== 1 ? 's' : ''}`
                                            : 'No public bags'}
                                    </p>
                                </div>
                                <button onClick={() => setViewingMate(null)} className="text-slate-500 hover:text-white text-xl font-black transition">✕</button>
                            </div>

                            {viewingMate.bags.length === 0 ? (
                                <div className="p-10 text-center">
                                    <div className="text-4xl mb-3">🔒</div>
                                    <p className="text-slate-500 font-black uppercase text-xs">This player hasn't made any bags public yet</p>
                                </div>
                            ) : (<>
                                {/* Bag tabs */}
                                {viewingMate.bags.length > 1 && (
                                    <div className="flex gap-1.5 px-4 pt-4 overflow-x-auto pb-0 scrollbar-hide">
                                        {viewingMate.bags.map(b => (
                                            <button
                                                key={b.id}
                                                onClick={() => setViewingMateBagId(b.id)}
                                                className={`shrink-0 px-4 py-2 rounded-xl font-black uppercase text-xs transition whitespace-nowrap ${viewingMateBagId === b.id ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                            >
                                                {b.name}
                                                <span className="ml-1.5 opacity-60 font-bold text-[9px]">
                                                    {viewingMate.discs.filter(d => d.bag_id === b.id).length}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Disc list */}
                                <div className="max-h-96 overflow-y-auto p-4 space-y-2">
                                    {viewingMate.discs.filter(d => d.bag_id === viewingMateBagId).length === 0 ? (
                                        <p className="text-center text-slate-600 font-bold uppercase text-xs py-8">No discs in this bag</p>
                                    ) : viewingMate.discs.filter(d => d.bag_id === viewingMateBagId).map(d => (
                                        <div key={d.id} className="flex items-center gap-3 bg-slate-800/60 rounded-2xl px-4 py-3 relative overflow-hidden">
                                            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl" style={{ backgroundColor: d.color || '#f97316' }} />
                                            <div className="pl-2 flex-1 min-w-0">
                                                <div className="font-black uppercase italic text-sm text-white truncate">{d.name}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase">{d.brand}{d.plastic ? ` • ${d.plastic}` : ''}</div>
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                {[['S',d.speed],['G',d.glide],['T',d.turn],['F',d.fade]].map(([l,v]) => (
                                                    <div key={l} className="bg-slate-700 px-1.5 py-1 rounded-lg text-center min-w-[26px]">
                                                        <div className="text-[6px] font-black text-slate-500 uppercase">{l}</div>
                                                        <div className="text-[10px] font-black text-white">{v}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>)}
                        </div>
                    )}

                    {/* Saved card mates list */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">
                            Saved Mates {cardMates.length > 0 && `(${cardMates.length})`}
                        </h3>
                        {cardMates.length === 0 ? (
                            <div className="text-center py-10 bg-slate-900/50 rounded-3xl border border-slate-800">
                                <div className="text-4xl mb-3">🤝</div>
                                <p className="text-slate-600 font-bold uppercase text-xs">No card mates yet</p>
                                <p className="text-slate-700 font-bold uppercase text-[10px] mt-1">Search a player by email above</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {cardMates.map(cm => (
                                    <div key={cm.id} className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
                                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 border" style={{ backgroundColor: (cm.mate_colour || "#22d3ee") + "22", borderColor: cm.mate_colour || "#22d3ee" }}>{cm.mate_icon || "🥏"}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black uppercase text-white text-sm truncate">
                                                {cm.mate_username ? `@${cm.mate_username}` : cm.mate_email}
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                {cm.mate_pdga && <span className="text-[9px] font-black uppercase text-cyan-400 bg-cyan-900/30 px-1.5 py-0.5 rounded-full">PDGA #{cm.mate_pdga}</span>}
                                                {cm.mate_username && <span className="text-[9px] font-bold text-slate-600 uppercase truncate">{cm.mate_email}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => loadMateBag(cm.mate_user_id, cm.mate_username || cm.mate_email, cm.id)}
                                                className="bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded-xl font-black uppercase text-[10px] transition"
                                            >👀 View</button>
                                            <button
                                                onClick={() => removeCardMate(cm.id)}
                                                className="bg-red-600/10 hover:bg-red-600/30 border border-red-500/20 text-red-400 px-3 py-2 rounded-xl font-black uppercase text-[10px] transition"
                                            >Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        )}

        {/* =====================================================
            SMART BAG COACH MODAL
        ===================================================== */}
        {showCoach && (() => {
            const active = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
            const stabBucket = (t, f) => { const s = parseFloat(t) + parseFloat(f); return s >= 2 ? 'OS' : s <= -1 ? 'US' : 'ST'; };
            const slotKey = (sp, t, f) => { const s = parseFloat(sp), b = stabBucket(t, f); if (s <= 3) return `putter_${b}`; if (s <= 6) return `mid_${b}`; if (s <= 8) return `fairway_${b}`; return `distance_${b}`; };

            // Overlaps
            const slotMap = {};
            active.forEach(d => { const k = slotKey(d.speed, d.turn, d.fade); if (!slotMap[k]) slotMap[k] = []; slotMap[k].push(d); });
            const overlaps = Object.entries(slotMap).filter(([,v]) => v.length > 1);

            // Missing slots
            const ALL_SLOTS = ['putter_ST','putter_OS','putter_US','mid_ST','mid_OS','mid_US','fairway_ST','fairway_OS','fairway_US','distance_ST','distance_OS','distance_US'];
            const SLOT_LABELS = { putter_ST:'Straight Putter', putter_OS:'Overstable Putter', putter_US:'Understable Putter', mid_ST:'Straight Mid', mid_OS:'Overstable Mid', mid_US:'Understable Mid', fairway_ST:'Straight Fairway', fairway_OS:'Overstable Fairway', fairway_US:'Understable Fairway', distance_ST:'Straight Distance', distance_OS:'Overstable Distance', distance_US:'Understable Distance' };
            const missingSlots = ALL_SLOTS.filter(s => !slotMap[s]);

            // Speed gap detection
            const speeds = active.map(d => parseFloat(d.speed)).sort((a,b) => a-b);
            const speedGaps = [];
            for (let i = 0; i < speeds.length - 1; i++) { if (speeds[i+1] - speeds[i] >= 4) speedGaps.push({ from: speeds[i], to: speeds[i+1] }); }

            // Arm speed — tiered recommendation (not cliff-edge)
            const bh = settings.bhPower || settings.maxPower;
            const bhFt = settings.unit === 'm' ? Math.round(bh * 0.3048) : bh;
            // Comfortable max: ~1ft of distance per 30ft of arm = speed 10 at 300ft, speed 12 at 360ft, etc.
            // Give 2 extra speeds of headroom before warning
            const comfortSpeed = Math.round(bhFt / 28); // slightly generous
            const hardMax = Math.round(bhFt / 24);       // still usable but pushing it
            // Only flag discs > hardMax — not just "too fast by a bit"
            const tooFast = active.filter(d => parseFloat(d.speed) > hardMax);

            const skillTips = {
                beginner: 'Focus on discs speed 1-7. High-speed drivers are harder to control and will actually fly shorter for beginners.',
                intermediate: 'Build your bag around speed 5-10 discs. A reliable fairway driver in each stability category is your foundation.',
                advanced: 'You can now benefit from speed 9-12 drivers. Prioritise filling overstable slots for windy conditions.',
                pro: 'Optimise for shot shape diversity. Make sure every stability and speed range is covered.',
            };

            const getWindTip = () => {
                const { type, speed, direction } = windConfig;
                const unit = settings.unit === 'm' ? 'km/h' : 'mph';
                const isStrong = settings.unit === 'm' ? speed >= 32 : speed >= 20;
                const isModerate = settings.unit === 'm' ? speed >= 16 : speed >= 10;
                if (type === 'calm') return null;
                if (type === 'headwind') return isStrong
                    ? `${speed}${unit} headwind: disc stability effectively shifts 2 classes. US drivers become rollers. Throw OS discs only. Throw lower and harder.`
                    : isModerate
                    ? `${speed}${unit} headwind: stability shifts ~1 class. US discs flip aggressively. OS discs become your most reliable tools.`
                    : `${speed}${unit} headwind: subtle effect. OS discs hold straighter, understable discs drift further right than normal.`;
                if (type === 'tailwind') return isStrong
                    ? `${speed}${unit} tailwind: disc sees less airspeed — everything acts more overstable. US discs become your distance weapons. OS discs dump early.`
                    : isModerate
                    ? `${speed}${unit} tailwind: reduced glide on OS discs. US discs carry further with controlled flip. ST discs are reliable all-rounders.`
                    : `${speed}${unit} tailwind: mild overstability boost. Slightly less distance on OS, slightly more on US.`;
                if (type === 'crosswind') return direction === 'ltr'
                    ? `${speed}${unit} crosswind left→right: lifts left wing — adds turn, weakens fade. OS holds straight, ST drifts right, US can ride wind 30-50ft offline.`
                    : `${speed}${unit} crosswind right→left: pushes top plate — reduces turn, increases fade. OS dumps hard left, ST reliable with strong finish, US flies surprisingly straight.`;
                return null;
            };
            const windTipText = getWindTip();

            return (
                <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl overflow-y-auto p-4 lg:p-6">
                    <div className="w-full max-w-2xl mx-auto space-y-4 my-auto py-6">

                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-black italic uppercase text-orange-500">🧠 Smart Bag Coach</h2>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{settings.skillLevel} • {settings.handedness}-handed • {settings.throwStyle} throws</p>
                            </div>
                            <button onClick={() => setShowCoach(false)} className="text-slate-500 hover:text-white text-2xl">✕</button>
                        </div>

                        {/* Score card */}
                        {bagScore && (
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                                <div className="flex items-center gap-5">
                                    <div className={`text-6xl font-black italic ${bagScore.color}`}>{bagScore.grade}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all ${bagScore.total >= 75 ? 'bg-emerald-500' : bagScore.total >= 50 ? 'bg-yellow-500' : 'bg-orange-500'}`} style={{ width: `${bagScore.total}%` }} />
                                            </div>
                                            <span className={`text-xl font-black ${bagScore.color}`}>{bagScore.total}/100</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div className="bg-slate-800 rounded-xl p-2"><div className="text-[8px] font-black text-slate-500 uppercase">Coverage</div><div className="text-sm font-black text-white">{bagScore.coverageScore}/40</div></div>
                                            <div className="bg-slate-800 rounded-xl p-2"><div className="text-[8px] font-black text-slate-500 uppercase">Spread</div><div className="text-sm font-black text-white">{bagScore.spreadScore}/40</div></div>
                                            <div className="bg-slate-800 rounded-xl p-2"><div className="text-[8px] font-black text-slate-500 uppercase">Size</div><div className="text-sm font-black text-white">{bagScore.sizeScore}/20</div></div>
                                        </div>
                                        {bagScore.overlapPenalty > 0 && <div className="text-[9px] font-bold text-red-400 uppercase mt-2">−{bagScore.overlapPenalty} overlap penalty</div>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Wind tip */}
                        {windConfig.type !== 'calm' && windConfig.speed > 0 && (
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl px-5 py-4">
                                <p className="text-[10px] font-black uppercase text-blue-400 mb-1">💨 Wind Tip</p>
                                <p className="text-sm font-bold text-blue-300">{windTipText}</p>
                            </div>
                        )}

                        {/* Skill tip */}
                        <div className="bg-orange-900/20 border border-orange-500/30 rounded-2xl px-5 py-4">
                            <p className="text-[10px] font-black uppercase text-orange-400 mb-1">⚡ {settings.skillLevel} Tip</p>
                            <p className="text-sm font-bold text-orange-200">{skillTips[settings.skillLevel] || skillTips.intermediate}</p>
                        </div>

                        {/* Arm speed advisory */}
                        {tooFast.length > 0 && (
                            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl px-5 py-4">
                                <p className="text-[10px] font-black uppercase text-red-400 mb-2">⚠️ Arm Speed Advisory</p>
                                <p className="text-sm font-bold text-red-300 mb-1">
                                    Your backhand ({settings.unit === 'm' ? Math.round(bh * 0.3048) : bh}{settings.unit}) is most effective up to speed {comfortSpeed}.
                                    The discs below (speed {hardMax}+) may not reach full potential:
                                </p>
                                <p className="text-[10px] font-bold text-red-400 mb-3">Tip: A worn-in version of a high-speed disc can fly better at lower arm speeds.</p>
                                <div className="space-y-1.5">
                                    {tooFast.map(d => {
                                        const wear = parseFloat(d.wear) || 0;
                                        const wearLabel = wear >= 0.7 ? 'Well Worn' : wear >= 0.4 ? 'Beat In' : wear >= 0.1 ? 'Slight Wear' : 'New';
                                        return (
                                            <div key={d.id} className="flex items-center gap-2 text-[11px] font-bold text-red-300">
                                                <span style={{color: d.color}}>●</span>
                                                <span>{d.name}</span>
                                                <span className="text-red-500">Spd {d.speed}</span>
                                                {d.plastic && <span className="text-slate-500 text-[9px] uppercase">{d.plastic}</span>}
                                                <span className={`text-[9px] uppercase ml-auto ${wear >= 0.4 ? 'text-emerald-400' : 'text-slate-600'}`}>{wearLabel}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Overlapping discs */}
                        {overlaps.length > 0 && (
                            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl px-5 py-4">
                                <p className="text-[10px] font-black uppercase text-yellow-400 mb-2">🔁 Redundant Discs</p>
                                <p className="text-sm font-bold text-yellow-300 mb-2">Multiple discs covering the same flight role. Consider which to keep based on wear and plastic:</p>
                                {overlaps.map(([slot, discsInSlot]) => {
                                    // Group by name — same mold in different plastics is fine, list differently
                                    const byName = {};
                                    discsInSlot.forEach(d => { if (!byName[d.name]) byName[d.name] = []; byName[d.name].push(d); });
                                    const isExact = Object.keys(byName).length < discsInSlot.length;
                                    return (
                                        <div key={slot} className="mb-3">
                                            <div className="text-[9px] font-black uppercase text-yellow-500 mb-2">{SLOT_LABELS[slot]}</div>
                                            <div className="space-y-1.5">
                                                {discsInSlot.map(d => {
                                                    const wear = parseFloat(d.wear) || 0;
                                                    const wearLabel = wear >= 0.7 ? '🟢 Well Worn' : wear >= 0.4 ? '🟡 Beat In' : wear >= 0.1 ? '🟠 Slight Wear' : '⚪ New';
                                                    return (
                                                        <div key={d.id} className="flex items-center gap-2 bg-slate-900/60 rounded-xl px-3 py-2">
                                                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color || '#f97316' }} />
                                                            <span className="font-black uppercase text-white text-[11px] flex-1">{d.name}</span>
                                                            {d.plastic && <span className="text-[9px] font-bold text-slate-400 uppercase">{d.plastic}</span>}
                                                            <span className="text-[9px] font-bold">{wearLabel}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {isExact && <p className="text-[9px] font-bold text-yellow-600 mt-1.5">Same mould — different plastics/wear levels can be intentional. Consider keeping your most worn for utility throws.</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Speed gaps */}
                        {speedGaps.length > 0 && (
                            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl px-5 py-4">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-2">📉 Speed Gaps Detected</p>
                                {speedGaps.map((g, i) => (
                                    <p key={i} className="text-sm font-bold text-slate-300">Gap between speed {g.from} and {g.to} — consider adding a disc in this range</p>
                                ))}
                            </div>
                        )}

                        {/* Missing priority slots */}
                        {missingSlots.length > 0 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
                                <p className="text-[10px] font-black uppercase text-slate-500 mb-3">Missing Slots ({missingSlots.length})</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {missingSlots.map(slot => {
                                        const suggestions = [...FACTORY_DB.map(d => ({ Model:d.Model, Manufacturer:d.Manufacturer, Speed:d.Speed, Turn:d.Turn, Fade:d.Fade }))].filter(d => {
                                            const b = stabBucket(d.Turn, d.Fade);
                                            const sp = parseFloat(d.Speed);
                                            if (slot.startsWith('putter') && sp > 3) return false;
                                            if (slot.startsWith('mid') && (sp < 4 || sp > 6)) return false;
                                            if (slot.startsWith('fairway') && (sp < 7 || sp > 8)) return false;
                                            if (slot.startsWith('distance') && sp < 9) return false;
                                            return slot.endsWith(b);
                                        }).filter(d => d.Speed <= hardMax).slice(0, 2);
                                        return (
                                            <div key={slot} className="bg-slate-800 rounded-2xl p-3">
                                                <div className="text-[9px] font-black uppercase text-slate-500 mb-1">{SLOT_LABELS[slot]}</div>
                                                {suggestions.map(s => (
                                                    <div key={s.Model} className="text-[11px] font-bold text-white">{s.Model} <span className="text-slate-500">{s.Manufacturer}</span></div>
                                                ))}
                                                {suggestions.length === 0 && <div className="text-[10px] text-slate-600 font-bold">Build arm speed first</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button onClick={() => setShowCoach(false)} className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black uppercase text-xs text-slate-400 transition">Close</button>
                    </div>
                </div>
            );
        })()}


        {/* =====================================================
            MOLD SLOT HEATMAP MODAL
        ===================================================== */}
        {showHeatmap && (() => {
            const active = discs.filter(d => d.bag_id === activeBagId && d.status === 'active' && !d.is_idea);
            const stabBucket = (t, f) => { const s = parseFloat(t) + parseFloat(f); return s >= 2 ? 'OS' : s <= -1 ? 'US' : 'ST'; };

            // Build a 14×3 grid: speeds 1-14 on X, OS/ST/US on Y
            const grid = {};
            ['OS', 'ST', 'US'].forEach(stab => {
                for (let sp = 1; sp <= 14; sp++) {
                    grid[`${sp}_${stab}`] = [];
                }
            });

            active.forEach(d => {
                const sp = Math.round(parseFloat(d.speed));
                const stab = stabBucket(d.turn, d.fade);
                const key = `${sp}_${stab}`;
                if (grid[key]) grid[key].push(d);
            });

            const maxCount = Math.max(1, ...Object.values(grid).map(v => v.length));

            const SPEED_GROUPS = [
                { label: 'Putters', range: [1,3], color: 'text-blue-400' },
                { label: 'Mids', range: [4,6], color: 'text-emerald-400' },
                { label: 'Fairways', range: [7,8], color: 'text-yellow-400' },
                { label: 'Drivers', range: [9,14], color: 'text-red-400' },
            ];

            return (
                <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl overflow-y-auto p-4 lg:p-6">
                    <div className="w-full max-w-3xl mx-auto py-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-black italic uppercase text-violet-400">🔥 Mold Slot Heatmap</h2>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">See which speed/stability combinations you're covering — and where the gaps are</p>
                            </div>
                            <button onClick={() => setShowHeatmap(false)} className="text-slate-500 hover:text-white text-2xl">✕</button>
                        </div>

                        {/* Heatmap grid */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 overflow-x-auto">
                            {/* Y axis labels */}
                            <div className="flex gap-1 mb-2 pl-12">
                                {SPEED_GROUPS.map(g => (
                                    <div key={g.label} className="flex gap-1" style={{ flex: g.range[1] - g.range[0] + 1 }}>
                                        <div className={`flex-1 text-center text-[8px] font-black uppercase ${g.color} border-b border-slate-700 pb-1`}>{g.label}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Speed numbers */}
                            <div className="flex gap-1 mb-1 pl-12">
                                {Array.from({ length: 14 }, (_, i) => i + 1).map(sp => (
                                    <div key={sp} className="flex-1 text-center text-[8px] font-black text-slate-600">{sp}</div>
                                ))}
                            </div>
                            {/* Rows */}
                            {['OS', 'ST', 'US'].map(stab => (
                                <div key={stab} className="flex gap-1 mb-1 items-center">
                                    <div className="w-12 shrink-0 text-[9px] font-black uppercase text-slate-400 text-right pr-2">
                                        {stab === 'OS' ? '🔵 OS' : stab === 'ST' ? '⚪ ST' : '🔴 US'}
                                    </div>
                                    {Array.from({ length: 14 }, (_, i) => i + 1).map(sp => {
                                        const cell = grid[`${sp}_${stab}`] || [];
                                        const intensity = cell.length / maxCount;
                                        const bg = cell.length === 0
                                            ? 'bg-slate-800 border-slate-700'
                                            : intensity >= 1 ? 'bg-orange-500 border-orange-400'
                                            : intensity >= 0.5 ? 'bg-orange-500/60 border-orange-500/40'
                                            : 'bg-orange-500/30 border-orange-500/20';
                                        return (
                                            <div key={sp} title={cell.map(d => d.name).join(', ')}
                                                className={`flex-1 aspect-square rounded-lg border ${bg} flex items-center justify-center transition`}>
                                                {cell.length > 0 && (
                                                    <span className="text-[9px] font-black text-white">{cell.length}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" /><span className="text-[10px] font-bold text-slate-500 uppercase">Empty slot</span></div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500/30 border border-orange-500/20" /><span className="text-[10px] font-bold text-slate-500 uppercase">1 disc</span></div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500" /><span className="text-[10px] font-bold text-slate-500 uppercase">Multiple discs</span></div>
                        </div>

                        {/* Per-cell disc list */}
                        {active.length > 0 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
                                <p className="text-[10px] font-black uppercase text-slate-500">Your Bag — by Slot</p>
                                {['OS','ST','US'].map(stab => (
                                    <div key={stab}>
                                        <div className="text-[9px] font-black uppercase text-slate-600 mb-2">
                                            {stab === 'OS' ? '🔵 Overstable' : stab === 'ST' ? '⚪ Straight' : '🔴 Understable'}
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                            {SPEED_GROUPS.map(g => {
                                                const discsInGroup = active.filter(d => {
                                                    const sp = Math.round(parseFloat(d.speed));
                                                    return sp >= g.range[0] && sp <= g.range[1] && stabBucket(d.turn, d.fade) === stab;
                                                });
                                                return (
                                                    <div key={g.label} className={`rounded-2xl p-3 ${discsInGroup.length > 1 ? 'bg-yellow-900/20 border border-yellow-500/20' : discsInGroup.length === 1 ? 'bg-slate-800' : 'bg-slate-900 border border-slate-800 opacity-40'}`}>
                                                        <div className={`text-[8px] font-black uppercase mb-1.5 ${g.color}`}>{g.label} {stab}</div>
                                                        {discsInGroup.length === 0
                                                            ? <div className="text-[9px] font-bold text-slate-600">Empty</div>
                                                            : discsInGroup.map(d => (
                                                                <div key={d.id} className="flex items-center gap-1.5 mb-0.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color || '#f97316' }} />
                                                                    <span className="text-[10px] font-bold text-white truncate">{d.name}</span>
                                                                    {d.plastic && <span className="text-[8px] text-slate-500 uppercase shrink-0">{d.plastic}</span>}
                                                                </div>
                                                            ))}
                                                        {discsInGroup.length > 1 && <div className="text-[8px] text-yellow-400 font-bold mt-1">⚠ Overlap</div>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Community data note */}
                        <div className="bg-violet-900/20 border border-violet-500/20 rounded-2xl px-5 py-4">
                            <p className="text-[10px] font-black uppercase text-violet-400 mb-1">📊 Community Insights — Coming Soon</p>
                            <p className="text-sm font-bold text-violet-300">As more players use BaggedUp, this heatmap will show community data — which speed/stability combinations are most popular, what discs players like you are bagging, and trending moulds this month.</p>
                        </div>

                        <button onClick={() => setShowHeatmap(false)} className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black uppercase text-xs text-slate-400 transition">Close</button>
                    </div>
                </div>
            );
        })()}


        </div>
    );
}
