import { motion } from "framer-motion";

export default function CampusSafety() {
return (
<section className="px-6 py-24 bg-indigo-50">
<div className="max-w-5xl mx-auto text-center">
<motion.h2
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:0.5}}
className="mb-8 text-3xl font-bold"
>
Campus Safety Commitment
</motion.h2>
<p className="mb-10 text-gray-700">
We are committed to providing a safe, secure, and transparent environment for every student. Our smart escalation system ensures every issue is addressed promptly.
</p>
<div className="grid gap-6 md:grid-cols-3">
{[
  {icon:"🛡️",title:"Secure Reporting"},
  {icon:"⏱️",title:"Timely Resolution"},
  {icon:"📊",title:"Transparent Tracking"}
].map((item,i)=>(
  <motion.div
    key={i}
    initial={{opacity:0,y:20}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    transition={{duration:0.5,delay:i*0.1}}
    className="p-6 bg-white shadow-lg rounded-2xl"
  >
    <div className="mb-4 text-4xl">{item.icon}</div>
    <h3 className="text-lg font-semibold">{item.title}</h3>
  </motion.div>
))}
</div>
</div>
</section>
)
}