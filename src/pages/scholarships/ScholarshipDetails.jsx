import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Book, Globe, ShieldCheck, Share2, Heart, Clock, FileText } from 'lucide-react';
import { scholarshipsAPI, reviewsAPI } from '../../services/api';

const ScholarshipDetails = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schRes = await scholarshipsAPI.getById(id);
                setScholarship(schRes.data);

                try {
                    const reviewRes = await reviewsAPI.getScholarshipReviews(id);
                    setReviews(reviewRes.data);
                } catch (e) {
                    console.log("No reviews or error fetching reviews");
                    setReviews([]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch scholarship details", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
    );

    if (!scholarship) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl font-bold text-text-main mb-2">Scholarship Not Found</h2>
            <Link to="/scholarships" className="btn btn-primary">Browse Scholarships</Link>
        </div>
    );

    const display = {
        title: scholarship.scholarshipName,
        university: scholarship.universityName,
        location: `${scholarship.universityCity}, ${scholarship.universityCountry}`,
        value: `$${scholarship.applicationFees} Fees / ${scholarship.degree}`,
        deadline: scholarship.applicationDeadline,
        image: scholarship.image,
        description: scholarship.description || "A prestigious scholarship opportunity waiting for the right candidate.",
        eligibility: scholarship.eligibility || ["International students", "High GPA", "English Proficiency"],
        documents: scholarship.documents || ["Transcripts", "CV/Resume", "Recommendation Letters"],
    };

    return (
        <div className="bg-bg-body min-h-screen pb-12">
            {/* Banner Section */}
            <div className="relative h-[300px] md:h-[400px] w-full bg-gray-900 flex items-end pb-8 md:pb-12 text-white overflow-hidden group">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url("${display.image}")` }}
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl md:text-5xl font-bold text-primary shrink-0 animate-in zoom-in duration-300 border-4 border-white">
                            {display.university.charAt(0)}
                        </div>
                        <div className="flex-1 animate-in slide-in-from-bottom-5 duration-500 delay-75">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">
                                    {scholarship.scholarshipCategory}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight text-shadow-sm">{display.title}</h1>
                            <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base font-medium text-gray-200">
                                <span className="flex items-center gap-1.5"><MapPin size={18} className="text-primary-light" /> {display.location}</span>
                                <span className="flex items-center gap-1.5"><Globe size={18} className="text-primary-light" /> International</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Main Content Column */}
                <div className="w-full lg:w-2/3 space-y-8 animate-in slide-in-from-bottom-10 duration-700 delay-150">

                    {/* Description Card */}
                    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                            About this Scholarship
                        </h3>
                        <p className="text-text-muted leading-relaxed text-base md:text-lg mb-8">
                            {display.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main">
                                    <ShieldCheck size={22} className="text-primary" /> Eligibility Criteria
                                </h3>
                                <ul className="space-y-3">
                                    {display.eligibility.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-text-muted text-sm md:text-base">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main">
                                    <FileText size={22} className="text-secondary" /> Required Documents
                                </h3>
                                <ul className="space-y-3">
                                    {display.documents.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-text-muted text-sm md:text-base">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-text-main">Student Reviews</h2>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-text-muted">{reviews.length} Reviews</span>
                        </div>

                        {reviews.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-text-main mb-1">No Reviews Yet</h3>
                                <p className="text-text-muted">Be the first student to review this scholarship.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review._id} className="p-5 md:p-6 bg-gray-50/80 rounded-xl border border-border hover:border-gray-300 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white shadow-sm">
                                                {review.userImage ? (
                                                    <img src={review.userImage} alt={review.userName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary-focus text-white flex items-center justify-center font-bold text-lg">
                                                        {review.userName?.charAt(0) || 'U'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                                                    <div>
                                                        <h4 className="font-bold text-text-main truncate">{review.userName}</h4>
                                                        <p className="text-xs text-text-muted">
                                                            {new Date(review.reviewDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon key={i} filled={i < review.ratingPoint} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-text-main/80 text-sm md:text-base leading-relaxed break-words">"{review.reviewComment}"</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="w-full lg:w-1/3 relative">
                    <div className="sticky top-24 lg:animate-in lg:slide-in-from-right-5 lg:duration-700 lg:delay-300">
                        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-lg shadow-gray-100/50">
                            <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                                <div className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-1">Scholarship Value</div>
                                <div className="text-3xl font-extrabold text-primary">{display.value}</div>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-4 items-center group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Calendar size={22} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-text-muted uppercase">Deadline</div>
                                        <div className="font-bold text-text-main text-lg">{new Date(display.deadline).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center group">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                        <DollarSign size={22} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-text-muted uppercase">Application Fee</div>
                                        <div className="font-bold text-text-main text-lg">${scholarship.applicationFees}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center group">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                                        <Book size={22} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-text-muted uppercase">Degree Level</div>
                                        <div className="font-bold text-text-main text-lg">{scholarship.degree}</div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to={`/checkout/${id}`}
                                className="block w-full py-4 rounded-xl bg-primary text-white font-bold text-center text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all mb-4 flex items-center justify-center gap-2 group"
                            >
                                Apply Now
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-text-main font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                    <Heart size={20} className="text-gray-400" /> Save
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-text-main font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                    <Share2 size={20} className="text-gray-400" /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for stars
const StarIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke={filled ? "#fbbf24" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default ScholarshipDetails;
