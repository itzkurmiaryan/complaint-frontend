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

{/* Animated Background Blobs */}

<div className="absolute bg-purple-400 rounded-full top-20 left-10 w-72 h-72 blur-3xl opacity-30 animate-pulse"></div>
<div className="absolute bg-indigo-400 rounded-full bottom-20 right-10 w-72 h-72 blur-3xl opacity-30 animate-pulse"></div>


{/* HERO VIDEO */}

<section className="relative h-screen overflow-hidden">

<video
autoPlay
loop
muted
className="absolute top-0 left-0 object-cover w-full h-full"
>
<source src="/invertis-campus.mp4" type="video/mp4"/>
</video>

<div className="absolute inset-0 bg-black/70"></div>

<div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">

<motion.h1
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-5xl font-extrabold md:text-6xl"
>

CampusCare

<span className="block text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text animate-pulse">

Complaint System for Invertis

</span>

</motion.h1>

<p className="max-w-xl mt-6 text-lg text-gray-200">
Report campus issues, track complaints, and improve university life.
</p>

<div className="flex gap-6 mt-10">

<Link
to="/complaint"
className="px-8 py-3 text-white transition rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-110 hover:shadow-xl"
>
Report Issue
</Link>

<Link
to="/dashboard"
className="px-8 py-3 transition border border-white rounded-xl hover:bg-white/20 hover:scale-110"
>
Explore Dashboard
</Link>

</div>

</div>

</section>


{/* FEATURES */}

<section className="px-6 py-24">

<div className="mx-auto text-center max-w-7xl">

<h2 className="mb-16 text-3xl font-bold">
Platform Features
</h2>

<div className="grid gap-10 md:grid-cols-4">

{features.map((f,i)=>(

<motion.div
key={i}
whileHover={{scale:1.08}}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:0.6,delay:i*0.1}}
className="p-8 transition bg-white shadow-xl rounded-3xl hover:shadow-2xl backdrop-blur-lg"
>

<div className="mb-4 text-4xl">{f.icon}</div>

<h3 className="mb-2 text-lg font-semibold">{f.title}</h3>

<p className="text-gray-600">{f.desc}</p>

</motion.div>

))}

</div>

</div>

</section>


{/* HOW IT WORKS */}

<section className="px-6 py-24 bg-white">

<div className="max-w-6xl mx-auto text-center">

<h2 className="mb-16 text-3xl font-bold">
How CampusCare Works
</h2>

<div className="grid gap-10 md:grid-cols-3">

{[
{icon:"📝",title:"Submit Complaint",desc:"Students report issues or ragging incidents."},
{icon:"📡",title:"Track Progress",desc:"Students monitor complaint progress in real time."},
{icon:"✅",title:"Resolution",desc:"Admins resolve issues with transparency."}
].map((item,i)=>(

<motion.div
key={i}
whileHover={{scale:1.06}}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.2}}
className="p-10 transition shadow-xl rounded-3xl bg-gray-50 hover:shadow-2xl"
>

<div className="mb-4 text-4xl">{item.icon}</div>

<h3 className="mb-2 text-xl font-semibold">{item.title}</h3>

<p className="text-gray-600">{item.desc}</p>

</motion.div>

))}

</div>

</div>

</section>


{/* STATS */}

<section className="px-6 py-24 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

<div className="grid max-w-6xl gap-12 mx-auto text-center md:grid-cols-3">

{stats.map((s,i)=>(

<motion.div
key={i}
initial={{opacity:0,scale:0.8}}
whileInView={{opacity:1,scale:1}}
viewport={{once:true}}
transition={{duration:0.5,delay:i*0.2}}
>

<h3 className="text-5xl font-bold">{s.value}</h3>

<p className="mt-2 text-lg opacity-90">{s.label}</p>

</motion.div>

))}

</div>

</section>


{/* INVERTIS SECTION */}

<section className="px-6 py-24">

<div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">

<motion.img
initial={{opacity:0,x:-40}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
src="/invertis.png"
alt="Invertis University"
className="shadow-2xl rounded-3xl"
/>

<motion.div
initial={{opacity:0,x:40}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
>

<h2 className="mb-6 text-3xl font-bold">
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
className="relative h-[400px] bg-fixed bg-center bg-cover"
style={{backgroundImage:"url('/invertis-campus.png')"}}
>

<div className="flex items-center justify-center h-full bg-black/60">

<h2 className="text-4xl font-bold text-white">
Making Campus Life Better
</h2>

</div>

</section>


{/* CAMPUS VIDEO */}

<section className="px-6 py-24 bg-gray-50">

<div className="max-w-5xl mx-auto text-center">

<h2 className="mb-10 text-3xl font-bold">
Explore Our Campus
</h2>

<div className="overflow-hidden shadow-2xl rounded-3xl">

<video controls className="w-full">
<source src="/invertis-tour.mp4" type="video/mp4"/>
</video>

</div>

</div>

</section>


{/* Add sections before CTA */}
<LeadershipSection />
<CampusIssueMap />
<CampusSafety />


{/* CTA */}

<section className="px-6 py-24">

<div className="max-w-3xl p-12 mx-auto text-center bg-white shadow-2xl rounded-3xl hover:shadow-3xl">

<h2 className="text-3xl font-bold">
Make Your Campus Better
</h2>

<p className="mt-4 text-gray-600">
Report issues and help improve campus life.
</p>

<Link
to="/complaint"
className="inline-block px-8 py-3 mt-8 text-white rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-110"
>
Submit Complaint
</Link>

</div>

</section>




</div>
);
}