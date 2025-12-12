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
        <div className="container px-6 py-8 pb-16">

            {/* Top Bar with Search & Sort */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search scholarships..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                className="input w-full pl-12 pr-4 h-12 rounded-full shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-600"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <span className="text-sm font-medium text-text-muted whitespace-nowrap">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="select select-bordered w-full md:w-[200px] bg-white font-normal"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="deadline">Deadline (Soonest)</option>
                            <option value="value-high">Value (High to Low)</option>
                            <option value="value-low">Value (Low to High)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col-reverse lg:flex-row gap-8">
                {/* Sidebar */}
                <Filters filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />

                {/* Scholarship Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="h-96 rounded-2xl bg-gray-100 animate-pulse"></div>
                            ))}
                        </div>
                    ) : scholarships.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-bold text-text-main mb-2">No scholarships found</h3>
                            <p className="text-text-muted">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {scholarships.map((scholarship) => (
                                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && scholarships.length > 0 && (
                        <div className="flex justify-center mt-12 gap-2">
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                <button
                                    key={pageNum}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${pageNum === currentPage
                                            ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllScholarships;
