import { motion } from "framer-motion";

export default function LeadershipSection() {

  const leaders = [
    {name:"Dr. Umesh Gautam",role:"Chancellor",img:"/umesh.jpg",message:"Welcome to Invertis University, where excellence meets innovation."},
    {name:"Mr. Parth Gautam",role:"Pro Chancellor",img:"/parth.webp",message:"Our mission is to empower students with knowledge and ethics."},
    {name:"Prof. Y.D.S. Arya",role:"Vice Chancellor",img:"/yds.webp",message:"We focus on creating a safe and transparent campus environment."},
    {name:"Mr. Amritansh Mishra",role:"Chief Proctor",img:"/amrit.webp",message:"Ensuring campus discipline and student safety is our priority."},
    {name:"Dr. R.K. Shukla",role:"Dean Engineering & Technology",img:"/rk.webp",message:"We are here to support students in academics and well-being."}
  ];

  return (
    <section className="px-6 py-24 bg-gradient-to-b from-indigo-50 via-white to-purple-50">

      <div className="mx-auto text-center max-w-7xl">

        {/* Title */}
        <motion.h2
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="mb-16 text-4xl font-extrabold text-gray-900"
        >
          University Leadership
        </motion.h2>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-5">

          {leaders.map((l,i)=>(
            <motion.div
              key={i}
              initial={{opacity:0,y:40}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.6,delay:i*0.1}}
              viewport={{once:true}}
              className="relative overflow-hidden transition-all duration-500 border shadow-xl group rounded-3xl backdrop-blur-lg bg-white/60 hover:-translate-y-3 hover:shadow-2xl"
            >

              {/* Gradient border effect */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 group-hover:opacity-20"/>

              <div className="relative p-6">

                {/* Image */}
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden transition-all duration-500 rounded-full ring-4 ring-indigo-200 group-hover:ring-purple-400">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {l.name}
                </h3>

                {/* Role */}
                <p className="mb-3 text-sm text-gray-500">
                  {l.role}
                </p>

                {/* Message */}
                <motion.p
                  initial={{opacity:0,y:10}}
                  whileHover={{opacity:1,y:0}}
                  className="text-sm text-gray-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  {l.message}
                </motion.p>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}