// "use client";

// import { Button } from "@/components/ui/button";
// import { Rocket, Calendar } from "lucide-react";
// import { motion } from "framer-motion";

// export default function CTASection() {
//   const steps = [
//     {
//       number: "1",
//       title: "Connect Your Life",
//       description: "Link your calendars, accounts, files, and password managers securely"
//     },
//     {
//       number: "2",
//       title: "Customize Your Space",
//       description: "Set up your hubs and boards to match your lifestyle and priorities"
//     },
//     {
//       number: "3",
//       title: "Stay Organized",
//       description: "Enjoy intelligent insights and seamless organization across all your devices"
//     }
//   ];

//   return (
//     <section id="pricing" style={{
//       paddingTop: '6rem',
//       paddingBottom: '6rem',
//       background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//       color: 'white',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       <div style={{
//         position: 'absolute',
//         inset: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.1)'
//       }}></div>
//       <div style={{
//         maxWidth: '80rem',
//         margin: '0 auto',
//         padding: '0 1rem',
//         position: 'relative'
//       }}>
//         <motion.div
//           style={{ textAlign: 'center', marginBottom: '4rem' }}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 style={{
//             fontSize: '2.25rem',
//             fontWeight: 'bold',
//             marginBottom: '1rem'
//           }}>Ready to Get Organized?</h2>
//           <p style={{
//             fontSize: '1.25rem',
//             color: '#dbeafe',
//             maxWidth: '32rem',
//             margin: '0 auto'
//           }}>
//             Start your journey to a more organized digital life. Connect your accounts, set up your hubs, and customize your boards.
//           </p>
//         </motion.div>

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gap: '2rem',
//           marginBottom: '3rem'
//         }} className="md:grid-cols-3">
//           {steps.map((step, index) => (
//             <motion.div
//               key={step.number}
//               style={{ textAlign: 'center' }}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div style={{
//                 width: '4rem',
//                 height: '4rem',
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                 backdropFilter: 'blur(4px)',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 auto 1rem auto'
//               }}>
//                 <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{step.number}</span>
//               </div>
//               <h3 style={{
//                 fontSize: '1.25rem',
//                 fontWeight: '600',
//                 marginBottom: '0.5rem'
//               }}>{step.title}</h3>
//               <p style={{ color: '#dbeafe' }}>{step.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           style={{ textAlign: 'center' }}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }} className="sm:flex-row">
//             <Button style={{
//               backgroundColor: 'white',
//               color: '#3b82f6',
//               padding: '1rem 2rem',
//               borderRadius: '0.75rem',
//               fontSize: '1.125rem',
//               fontWeight: '600',
//               border: 'none',
//               cursor: 'pointer',
//               transition: 'all 0.3s',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
//               e.target.style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.boxShadow = 'none';
//               e.target.style.transform = 'scale(1)';
//             }}
//             >
//               <Rocket style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} />
//               Start Free Trial
//             </Button>
//             <Button
//               variant="outline"
//               style={{
//                 border: '2px solid white',
//                 color: 'black',
//                 padding: '1rem 2rem',
//                 borderRadius: '0.75rem',
//                 fontSize: '1.125rem',
//                 fontWeight: '600',
//                 backgroundColor: 'transparent',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = 'transparent';
//               }}
//             >
//               <Calendar style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} />
//               Book Demo
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


const A = () => {
  return <div>A</div>

}
export default A;