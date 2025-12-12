import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, options, isOpen, onToggle, selectedValues = [], onChange }) => (
    <div className="border-b border-border pb-6 mb-6">
        <div
            onClick={onToggle}
            className="flex justify-between items-center cursor-pointer mb-4 group"
        >
            <h4 className="font-semibold text-base group-hover:text-primary transition-colors">{title}</h4>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isOpen && (
            <div className="flex flex-col gap-3">
                {options.map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2 text-sm text-text-muted cursor-pointer hover:text-text-main transition-color">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm rounded"
                            checked={selectedValues.includes(opt)}
                            onChange={() => onChange(opt)}
                        />
                        {opt}
                    </label>
                ))}
            </div>
        )}
    </div>
);

const Filters = ({ filters, onFilterChange, onReset }) => {
    const [openSections, setOpenSections] = useState({
        country: true,
        degree: true,
        category: true,
        fees: true,
    });
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const FilterContent = () => (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Filter size={20} /> Filters
                </h3>
                <button className="btn btn-ghost btn-xs text-error" onClick={onReset}>
                    Reset
                </button>
            </div>

            <FilterSection
                title="Country"
                isOpen={openSections.country}
                onToggle={() => toggleSection('country')}
                options={['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France']}
                selectedValues={filters.country}
                onChange={(val) => onFilterChange('country', val)}
            />

            <FilterSection
                title="Degree Level"
                isOpen={openSections.degree}
                onToggle={() => toggleSection('degree')}
                options={['Undergraduate', 'Masters', 'PhD', 'Research', 'Short Courses']}
                selectedValues={filters.degree}
                onChange={(val) => onFilterChange('degree', val)}
            />

            <FilterSection
                title="Category"
                isOpen={openSections.category}
                onToggle={() => toggleSection('category')}
                options={['Engineering', 'Business', 'Arts', 'Medicine', 'Computer Science']}
                selectedValues={filters.category}
                onChange={(val) => onFilterChange('category', val)}
            />

            <div className="mb-6">
                <h4 className="font-semibold text-base mb-4">Fees Funding</h4>
                <select
                    className="select select-bordered w-full"
                    value={filters.funding}
                    onChange={(e) => onFilterChange('funding', e.target.value)}
                >
                    <option value="Any">Any Funding Type</option>
                    <option value="Full Ride">Full Ride</option>
                    <option value="Full Tuition">Full Tuition</option>
                    <option value="Partial Funding">Partial Funding</option>
                </select>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-72 shrink-0 filters-sidebar bg-white p-6 rounded-2xl border border-border h-fit sticky top-24">
                <FilterContent />
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <button className="btn btn-outline w-full" onClick={() => setIsMobileOpen(true)}>
                    <Filter size={18} /> Filter Results
                </button>
            </div>

            {/* Mobile Filter Drawer/Modal */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
                    <div className="relative z-10 w-full max-w-[300px] bg-white h-full overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right duration-300">
                        <button className="absolute top-4 right-4 p-2 text-text-muted" onClick={() => setIsMobileOpen(false)}>
                            <X size={24} />
                        </button>
                        <div className="pt-8">
                            <FilterContent />
                            <button className="btn btn-primary w-full mt-4" onClick={() => setIsMobileOpen(false)}>Show Results</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Filters;
