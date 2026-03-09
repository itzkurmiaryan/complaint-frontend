import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeadershipSection from "../components/LeadershipSection";
import CampusIssueMap from "../components/CampusIssueMap";
import CampusSafety from "../components/CampusSafety";

export default function Home() {

const features = [
{icon:"🛡️",title:"Safe Reporting",desc:"Students can report issues securely and anonymously."},
{icon:"📡",title:"Real-time Tracking",desc:"Track complaint progress instantly."},
{icon:"⚡",title:"Smart Escalation",desc:"Issues escalate automatically if unresolved."},
{icon:"🏆",title:"Leaderboard",desc:"Students earn points for participation."}
];

const stats = [
{value:"1,254+",label:"Issues Resolved"},
{value:"3,482+",label:"Active Students"},
{value:"128+",label:"Ragging Reports Handled"}
];

return (

<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-purple-50">

<Navbar/>

{/* Background blobs */}

<div className="absolute bg-purple-400 rounded-full top-20 left-10 w-72 h-72 blur-3xl opacity-30 animate-pulse"></div>
<div className="absolute bg-indigo-400 rounded-full bottom-20 right-10 w-72 h-72 blur-3xl opacity-30 animate-pulse"></div>


{/* HERO */}

<section className="relative min-h-screen overflow-hidden">

<video
autoPlay
loop
muted
className="absolute object-cover w-full h-full"
>
<source src="/invertis-campus.mp4" type="video/mp4"/>
</video>

<div className="absolute inset-0 bg-black/70"></div>

<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white md:px-6">

<motion.h1
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-3xl font-extrabold md:text-6xl"
>

CampusCare

<span className="block text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text">

Complaint System for Invertis

</span>

</motion.h1>

<p className="max-w-xl mt-4 text-base text-gray-200 md:text-lg">
Report campus issues, track complaints, and improve university life.
</p>

<div className="flex flex-col gap-4 mt-8 sm:flex-row">

<Link
to="/complaint"
className="px-6 py-3 text-white transition rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105"
>
Report Issue
</Link>

<Link
to="/dashboard"
className="px-6 py-3 transition border border-white rounded-xl hover:bg-white/20"
>
Explore Dashboard
</Link>

</div>

</div>

</section>


{/* FEATURES */}

<section className="px-4 py-20 md:px-6">

<div className="mx-auto text-center max-w-7xl">

<h2 className="mb-12 text-2xl font-bold md:text-3xl">
Platform Features
</h2>

<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

{features.map((f,i)=>(

<motion.div
key={i}
whileHover={{scale:1.05}}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:0.6,delay:i*0.1}}
className="p-6 transition bg-white shadow-xl rounded-3xl hover:shadow-2xl"
>

<div className="mb-3 text-3xl">{f.icon}</div>

<h3 className="mb-2 text-lg font-semibold">{f.title}</h3>

<p className="text-gray-600">{f.desc}</p>

</motion.div>

))}

</div>

</div>

</section>


{/* HOW IT WORKS */}

<section className="px-4 py-20 bg-white md:px-6">

<div className="max-w-6xl mx-auto text-center">

<h2 className="mb-12 text-2xl font-bold md:text-3xl">
How CampusCare Works
</h2>

<div className="grid grid-cols-1 gap-8 md:grid-cols-3">

{[
{icon:"📝",title:"Submit Complaint",desc:"Students report issues or ragging incidents."},
{icon:"📡",title:"Track Progress",desc:"Students monitor complaint progress in real time."},
{icon:"✅",title:"Resolution",desc:"Admins resolve issues with transparency."}
].map((item,i)=>(

<motion.div
key={i}
whileHover={{scale:1.05}}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.2}}
className="p-8 transition shadow-xl rounded-3xl bg-gray-50 hover:shadow-2xl"
>

<div className="mb-3 text-3xl">{item.icon}</div>

<h3 className="mb-2 text-lg font-semibold">{item.title}</h3>

<p className="text-gray-600">{item.desc}</p>

</motion.div>

))}

</div>

</div>

</section>


{/* STATS */}

<section className="px-4 py-20 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:px-6">

<div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto text-center md:grid-cols-3">

{stats.map((s,i)=>(

<motion.div
key={i}
initial={{opacity:0,scale:0.8}}
whileInView={{opacity:1,scale:1}}
viewport={{once:true}}
transition={{duration:0.5,delay:i*0.2}}
>

<h3 className="text-4xl font-bold md:text-5xl">{s.value}</h3>

<p className="mt-2 text-lg opacity-90">{s.label}</p>

</motion.div>

))}

</div>

</section>


{/* INVERTIS SECTION */}

<section className="px-4 py-20 md:px-6">

<div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-2">

<motion.img
initial={{opacity:0,x:-40}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
src="/invertis.png"
alt="Invertis University"
className="w-full shadow-2xl rounded-3xl"
/>

<motion.div
initial={{opacity:0,x:40}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
>

<h2 className="mb-4 text-2xl font-bold md:text-3xl">
About Invertis University
</h2>

<p className="text-gray-600">
Invertis University focuses on providing a safe and transparent campus environment.
CampusCare helps students report infrastructure issues and ragging incidents while ensuring accountability.
</p>

</motion.div>

</div>

</section>


{/* PARALLAX */}

<section
className="relative h-[300px] md:h-[400px] bg-fixed bg-center bg-cover"
style={{backgroundImage:"url('/invertis-campus.jpeg')"}}
>

<div className="flex items-center justify-center h-full bg-black/60">

<h2 className="text-2xl font-bold text-white md:text-4xl">
Making Campus Life Better
</h2>

</div>

</section>


{/* CAMPUS VIDEO */}

<section className="px-4 py-20 bg-gray-50 md:px-6">

<div className="max-w-5xl mx-auto text-center">

<h2 className="mb-8 text-2xl font-bold md:text-3xl">
Explore Our Campus
</h2>

<div className="overflow-hidden shadow-2xl rounded-3xl">

<video controls className="w-full">
<source src="/invertis-tour.mp4" type="video/mp4"/>
</video>

</div>

</div>

</section>


<LeadershipSection />
<CampusIssueMap />
<CampusSafety />


{/* CTA */}

<section className="px-4 py-20 md:px-6">

<div className="max-w-3xl p-8 mx-auto text-center bg-white shadow-2xl rounded-3xl">

<h2 className="text-2xl font-bold md:text-3xl">
Make Your Campus Better
</h2>

<p className="mt-3 text-gray-600">
Report issues and help improve campus life.
</p>

<Link
to="/complaint"
className="inline-block px-6 py-3 mt-6 text-white rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105"
>
Submit Complaint
</Link>

</div>

</section>

</div>
);
}