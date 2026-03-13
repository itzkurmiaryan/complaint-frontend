import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import CountUp from "react-countup";
import { ShieldCheck, MapPin, Sparkles, Trophy } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeadershipSection from "../components/LeadershipSection";
import CampusIssueMap from "../components/CampusIssueMap";
import CampusSafety from "../components/CampusSafety";
import CampusVideo from "../components/CampusVideo";

export default function Home() {

const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

const smoothX = useSpring(mouseX,{stiffness:80})
const smoothY = useSpring(mouseY,{stiffness:80})

function moveCursor(e){
mouseX.set(e.clientX-80)
mouseY.set(e.clientY-80)
}

const features=[
{
icon:<ShieldCheck size={30}/>,
title:"Safe Reporting",
desc:"Students can report issues anonymously and securely."
},
{
icon:<MapPin size={30}/>,
title:"Real-time Tracking",
desc:"Track complaint progress instantly."
},
{
icon:<Sparkles size={30}/>,
title:"Smart Escalation",
desc:"Issues escalate automatically if unresolved."
},
{
icon:<Trophy size={30}/>,
title:"Student Leaderboard",
desc:"Students earn points for improving campus."
}
]

const stats=[
{value:254,label:"Issues Resolved"},
{value:1202,label:"Active Students"},
{value:25,label:"Ragging Reports"}
]

const steps=[
{
title:"Submit Complaint",
desc:"Student reports an issue through CampusCare with location and category.",
icon:"1"
},
{
title:"Smart Routing",
desc:"System automatically sends complaint to the correct department.",
icon:"2"
},
{
title:"Track Progress",
desc:"Students track status updates in real time on dashboard.",
icon:"3"
},
{
title:"Issue Resolved",
desc:"Admin resolves complaint and system notifies the student.",
icon:"4"
}
]

return(

<div
onMouseMove={moveCursor}
className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-purple-50"
>

<Navbar/>

{/* Cursor Glow */}

<motion.div
style={{x:smoothX,y:smoothY}}
className="fixed w-40 h-40 bg-purple-500 rounded-full pointer-events-none blur-3xl opacity-20"
/>

{/* Animated Background */}

<div className="absolute bg-purple-400 rounded-full top-10 left-10 w-80 h-80 blur-3xl opacity-30 animate-pulse"></div>
<div className="absolute bg-indigo-400 rounded-full bottom-10 right-10 w-80 h-80 blur-3xl opacity-30 animate-pulse"></div>

{/* HERO */}

<section className="relative min-h-screen">

<img
src="/invertis-campus.jpeg"
className="absolute object-cover w-full h-full opacity-40"
/>

<video
autoPlay
loop
muted
className="absolute object-cover w-full h-full"
>
<source src="/invertis-campus.mp4" type="video/mp4"/>
</video>

<div className="absolute inset-0 bg-black/70"></div>

<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">

<motion.h1
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-4xl font-extrabold md:text-6xl"
>

CampusCare

<span className="block text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text">

Complaint System for Invertis

</span>

</motion.h1>

<p className="max-w-xl mt-6 text-gray-200">

Report campus issues and improve university life.

</p>

<div className="flex flex-col gap-4 mt-10 sm:flex-row">

<motion.div whileHover={{scale:1.1}} whileTap={{scale:0.95}}>

<Link
to="/complaint"
className="py-3 font-semibold text-white shadow-xl px-7 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
>

Report Issue

</Link>

</motion.div>

<motion.div whileHover={{scale:1.1}}>

<Link
to="/dashboard"
className="py-3 font-semibold border border-white px-7 rounded-xl hover:bg-white/20"
>

Explore Dashboard

</Link>

</motion.div>

</div>

</div>

</section>

{/* FEATURES */}

<section className="px-6 py-24">

<div className="mx-auto max-w-7xl">

<h2 className="mb-16 text-3xl font-bold text-center">

Platform Features

</h2>

<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

{features.map((f,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
whileHover={{scale:1.07,y:-8}}
viewport={{once:true}}
transition={{delay:i*0.1}}
className="p-8 text-center transition rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-[0_20px_60px_rgba(79,70,229,0.4)]"
>

<div className="flex justify-center mb-4 text-indigo-600">

{f.icon}

</div>

<h3 className="mb-2 text-lg font-semibold">

{f.title}

</h3>

<p className="text-gray-600">

{f.desc}

</p>

</motion.div>

))}

</div>

</div>

</section>

{/* HOW CAMPUS CARE WORKS */}

<section className="relative px-6 py-28 bg-gradient-to-b from-white via-indigo-50 to-purple-50">

<div className="mx-auto max-w-7xl">

<motion.h2
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
className="mb-20 text-4xl font-bold text-center"
>

How Invertis CampusCare Works

</motion.h2>

<div className="relative grid gap-12 md:grid-cols-4">

{/* Animated line */}

<div className="absolute top-14 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hidden md:block"></div>

{steps.map((step,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.15}}
whileHover={{scale:1.07,y:-10}}
className="relative p-8 text-center transition shadow-xl rounded-3xl bg-white/70 backdrop-blur-xl hover:shadow-[0_20px_70px_rgba(99,102,241,0.4)]"
>

{/* step circle */}

<div className="flex items-center justify-center mx-auto mb-6 text-xl font-bold text-white rounded-full shadow-lg w-14 h-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

{step.icon}

</div>

<h3 className="mb-3 text-lg font-semibold">

{step.title}

</h3>

<p className="text-sm leading-relaxed text-gray-600">

{step.desc}

</p>

</motion.div>

))}

</div>

</div>

</section>

{/* STATS */}

<section className="px-6 py-24 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

<div className="grid max-w-6xl gap-10 mx-auto text-center md:grid-cols-3">

{stats.map((s,i)=>(

<motion.div
key={i}
initial={{opacity:0,scale:0.8}}
whileInView={{opacity:1,scale:1}}
viewport={{once:true}}
transition={{delay:i*0.2}}
>

<h3 className="text-5xl font-bold">

<CountUp end={s.value} duration={3}/>+

</h3>

<p className="mt-2 text-lg">

{s.label}

</p>

</motion.div>

))}

</div>

</section>

{/* CAMPUS GALLERY */}

<section className="px-6 py-24 bg-gray-50">

<h2 className="mb-16 text-3xl font-bold text-center">

Campus Gallery

</h2>

<div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">

{["/2.jpg","/invertis.png","/1.webp"].map((img,i)=>(

<motion.div
key={i}
whileHover={{scale:1.05}}
className="overflow-hidden shadow-xl rounded-3xl"
>

<img
src={img}
className="object-cover w-full h-[250px]"
/>

</motion.div>

))}

</div>

</section>

<CampusVideo/>

{/* PARALLAX CAMPUS */}

<section
className="relative h-[400px] bg-fixed bg-center bg-cover"
style={{backgroundImage:"url('/invertis-campus.jpeg')"}}
>

<div className="flex items-center justify-center h-full bg-black/60">

<h2 className="text-4xl font-bold text-white">

Experience Invertis Campus

</h2>

</div>

</section>

{/* EXTRA COMPONENTS */}

<LeadershipSection/>
<CampusIssueMap/>
<CampusSafety/>

{/* CTA */}

<section
className="relative py-24 bg-center bg-cover"
style={{backgroundImage:"url('/invertis-campus.jpeg')"}}
>

<div className="absolute inset-0 bg-black/70"></div>

<div className="relative max-w-3xl mx-auto text-center text-white">

<h2 className="text-3xl font-bold">

Make Your Campus Better

</h2>

<p className="mt-4">

Report issues and improve campus life.

</p>

<motion.div whileHover={{scale:1.08}}>

<Link
to="/complaint"
className="inline-block py-3 mt-6 font-semibold text-white px-7 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
>

Submit Complaint

</Link>

</motion.div>

</div>

</section>


</div>

)
}