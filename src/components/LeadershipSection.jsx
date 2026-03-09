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
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-16 text-4xl font-extrabold text-gray-900">
          University Leadership
        </h2>
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-5">
          {leaders.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative p-6 transition-all duration-500 bg-white shadow-lg rounded-3xl hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Circular Image with gradient ring */}
              <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
                <img
                  src={l.img}
                  alt={l.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">{l.name}</h3>
              <p className="mb-2 text-sm text-gray-500">{l.role}</p>

              {/* Message overlay on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex items-center justify-center p-4 text-sm text-center text-white transition-opacity duration-300 bg-indigo-600 opacity-0 bg-opacity-90 rounded-3xl hover:opacity-100"
              >
                {l.message}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}