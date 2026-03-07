import { motion } from 'framer-motion';
import { PixelCard } from './PixelCard';
import { ShieldCheck, Zap, Leaf } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Smart Automation",
    description: "Fully integrated IoT ecosystems that adapt to your morning routine and evening relaxation.",
    color: "default"
  },
  {
    icon: Leaf,
    title: "Eco Architecture",
    description: "Passive solar design and living walls that purify your air while reducing your footprint.",
    color: "default"
  },
  {
    icon: ShieldCheck,
    title: "Ultra Security",
    description: "Multi-layered biometric access and decentralized surveillance for absolute peace of mind.",
    color: "default"
  }
];

export function LuxuryFeatures() {
  return (
    <section className="py-24 bg-primary overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <PixelCard className="h-full rounded-2xl border border-white/5 bg-white/5 p-8 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="text-accent" size={32} />
                </div>
                <h3 className="font-getai text-2xl text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="font-clash text-secondary/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </PixelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
