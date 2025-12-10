import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { scholarshipsAPI } from '../../services/api';
import ScholarshipCard from '../../components/scholarship/ScholarshipCard';
import Filters from '../../components/scholarship/Filters';



const AllScholarships = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);

    // Filter State
    const [filters, setFilters] = useState({
        country: [],
        degree: [],
        category: [],
        funding: 'Any'
    });
    const [sortBy, setSortBy] = useState('recommended');

    // Reset Filters
    const resetFilters = () => {
        setFilters({
            country: [],
            degree: [],
            category: [],
            funding: 'Any'
        });
        setSearchTerm('');
        setSearchParams({});
    };

    // Handle Filter Changes
    const handleFilterChange = (type, value) => {
        if (type === 'funding') {
            setFilters(prev => ({ ...prev, funding: value }));
        } else {
            setFilters(prev => {
                const current = prev[type];
                const updated = current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value];
                return { ...prev, [type]: updated };
            });
        }
    };

    // Sync local state with URL param if it changes externally (e.g. from Hero)
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    // Handle Search Submit
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchParams({ q: searchTerm });
        }
    };

    // State for Scholarships and Pagination
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9;

    // Fetch Scholarships
    useEffect(() => {
        const fetchScholarships = async () => {
            setLoading(true);
            try {
                // Prepare filters for API
                // Map frontend filter state to backend query params
                // filters.country is array, backend expects 'universityCountry' (single string or regex?)
                // My api.js implementation for getAll spreads the category/country objects. I should fix api.js or fix call here.
                // Let's pass clean params.

                const params = {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchTerm,
                    // If multiple countries, backend might need adjustment or we just pick first/comma-separate. 
                    // Current mock backend regex expects single value or we can update backend to use $in.
                    // For now, let's just pass `universityCountry` if one selected.
                    universityCountry: filters.country.length > 0 ? filters.country[0] : '',
                    scholarshipCategory: filters.category.length > 0 ? filters.category[0] : '',
                    // degree: filters.degree... backend supports 'degree' in search regex OR we add degree filter support.
                    // Let's rely on search for degree for now as per backend logic, or assume backend 'search' handles tags.
                };

                const res = await scholarshipsAPI.getAll(params);

                setScholarships(res.data.scholarships);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error("Failed to fetch scholarships", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search if needed, but for now direct call
        const timeoutId = setTimeout(() => {
            fetchScholarships();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [currentPage, searchTerm, filters]); // Re-fetch when these change

    // Sort scholarships based on sortBy state
    const sortedScholarships = [...scholarships].sort((a, b) => {
        switch (sortBy) {
            case 'deadline':
                return new Date(a.applicationDeadline || a.deadline || '9999') - new Date(b.applicationDeadline || b.deadline || '9999');
            case 'value-high':
                return (b.tuitionFees || 0) - (a.tuitionFees || 0);
            case 'value-low':
                return (a.tuitionFees || 0) - (b.tuitionFees || 0);
            default:
                return 0; // recommended - keep original order
        }
    });

    // Sync local search term with URL query
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    // Update handlers to just update state, which triggers useEffect
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>

            {/* Top Bar with Search */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Browse Scholarships</h1>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: '300px' }}>
                        <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.85rem' }} />
                        <input
                            type="text"
                            placeholder="Search scholarships..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                borderRadius: '10px',
                                border: '2px solid #e2e8f0',
                                fontSize: '0.95rem',
                                outline: 'none',
                                background: 'white',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                                transition: 'all 0.2s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#8b5cf6';
                                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.12)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ padding: '0.6rem 0.75rem', borderRadius: '10px', border: '2px solid #e2e8f0', background: 'white', fontSize: '0.9rem', cursor: 'pointer' }}
                        >
                            <option value="recommended">Recommended</option>
                            <option value="deadline">Deadline (Soonest)</option>
                            <option value="value-high">Value (High to Low)</option>
                            <option value="value-low">Value (Low to High)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Sidebar */}
                <Filters filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />

                {/* Grid */}
                <div style={{ flex: 1 }}>
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>
                    ) : scholarships.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            {sortedScholarships.map(sch => (
                                <ScholarshipCard key={sch._id} scholarship={sch} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: '#f8fafc', borderRadius: '16px' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>No scholarships found for "{searchTerm}"</p>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}

                    {/* Pagination - Hide if no results */}
                    {!loading && scholarships.length > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
                            <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1} style={{ opacity: currentPage === 1 ? 0.5 : 1 }}><ChevronLeft size={20} /></button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                <button
                                    key={pageNum}
                                    className={pageNum === currentPage ? "btn btn-primary" : "btn btn-ghost"}
                                    onClick={() => setCurrentPage(pageNum)}
                                    style={{ width: '40px', height: '40px', padding: 0 }}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}><ChevronRight size={20} /></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllScholarships;
