import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, options, isOpen, onToggle, selectedValues = [], onChange }) => (
    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
        <div
            onClick={onToggle}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}
        >
            <h4 style={{ fontWeight: '600', fontSize: '0.95rem' }}>{title}</h4>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {options.map((opt, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
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

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside style={{ width: '280px', flexShrink: 0 }} className="filters-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={20} /> Filters
                </h3>
                <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }} onClick={onReset}>
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

            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '1rem' }}>Fees Funding</h4>
                <select
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white' }}
                    value={filters.funding}
                    onChange={(e) => onFilterChange('funding', e.target.value)}
                >
                    <option value="Any">Any Funding Type</option>
                    <option value="Full Ride">Full Ride</option>
                    <option value="Full Tuition">Full Tuition</option>
                    <option value="Partial Funding">Partial Funding</option>
                </select>
            </div>
        </aside>
    );
};

export default Filters;
