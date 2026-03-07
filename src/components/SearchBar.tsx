import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative w-full z-20 -mt-24 px-6 md:px-12 flex justify-center">
      <div className="glass w-full max-w-5xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row shadow-2xl gap-6 items-center border border-white/10 bg-[#1A1A1A]/40">
        
        {/* Fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {['Location', 'Property Type', 'Price Range', 'Bedrooms'].map((label, idx) => (
            <div key={idx} className="flex flex-col group">
              <label className="font-authentic text-xs text-secondary uppercase tracking-widest mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                {label}
              </label>
              <select className="bg-transparent border-b border-white/20 pb-2 text-white font-authentic text-lg focus:outline-none focus:border-accent appearance-none rounded-none cursor-pointer">
                <option value="" className="bg-primary">Any {label}</option>
                <option value="1" className="bg-primary">Option 1</option>
                <option value="2" className="bg-primary">Option 2</option>
              </select>
            </div>
          ))}
        </div>

        {/* Search Button */}
        <button className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 px-8 py-4 bg-accent hover:bg-white text-primary rounded flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 active:scale-95 group">
          <Search size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bricolage font-bold tracking-wider uppercase">Search</span>
        </button>
      </div>
    </div>
  );
}
