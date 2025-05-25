"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Headphones, BookOpen, Zap, TrendingUp, Globe, Sparkles } from "lucide-react"
import { useLandingMotion } from "@/hooks/useLandingMotion"

const features = [
  {
    icon: Headphones,
    title: "Cinematic Audio",
    description: "Immersive Ethiopian soundscapes enhance your learning journey",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "True Stories",
    description: "Unbiased historical narratives from the cradle of humanity",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Real-time Feedback",
    description: "Instant typing corrections with intelligent mistake detection",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Detailed analytics and gamified learning achievements",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Globe,
    title: "Bilingual Support",
    description: "Master typing in both English and Amharic languages",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "Cultural Immersion",
    description: "Connect with Ethiopia's rich heritage through every keystroke",
    gradient: "from-rose-500 to-pink-500",
  },
]

export function FeatureCards() {
  const { refs, inView, variants } = useLandingMotion()

  return (
    <section ref={refs.featuresRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView.featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
            Why Choose Mela-Typing?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect fusion of cultural education and modern technology
          </p>
        </motion.div>

        <motion.div
          variants={variants.staggerContainer}
          initial="hidden"
          animate={inView.featuresInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={variants.scaleIn} whileHover="hover" className="group">
              <motion.div variants={variants.hoverLift}>
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>

                    {/* Decorative Ethiopian Pattern */}
                    <motion.div
                      className="w-12 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
