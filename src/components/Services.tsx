import { Home, Key, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: <Home size={40} className="text-primary group-hover:text-accent transition-colors duration-500" />,
    title: 'Property Sales',
    text: 'Access an unparalleled network of buyers and off-market opportunities.',
  },
  {
    icon: <Key size={40} className="text-primary group-hover:text-accent transition-colors duration-500" />,
    title: 'Acquisitions',
    text: 'Expert guidance through complex negotiations and the purchase process.',
  },
  {
    icon: <ShieldCheck size={40} className="text-primary group-hover:text-accent transition-colors duration-500" />,
    title: 'Management',
    text: 'Comprehensive care for your luxury assets, ensuring total peace of mind.',
  },
];

export function Services() {
  return (
    <section className="py-24 bg-[#E8E6E1] text-primary relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-getai text-5xl md:text-6xl text-primary font-bold">Bespoke Services</h2>
          <p className="font-authentic text-lg text-primary/60 mt-4 max-w-2xl mx-auto">
            Our comprehensive approach ensures a seamless experience across all real estate transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="group bg-secondary p-12 hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 rounded-sm border border-black/5"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm">
                {service.icon}
              </div>
              <h3 className="font-getai text-3xl mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-authentic text-primary/70 leading-relaxed">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
