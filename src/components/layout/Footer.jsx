import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-border py-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Scholar<span className="gradient-text">Stream</span>
                        </h3>
                        <p className="text-text-muted max-w-xs">
                            Empowering students worldwide to achieve their academic dreams through accessible scholarship opportunities.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-semibold mb-4">Platform</h4>
                        <ul className="flex flex-col gap-2 text-text-muted">
                            <li><a href="#" className="hover:text-primary transition-colors">Browse Scholarships</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Universities</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="flex flex-col gap-2 text-text-muted">
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Scholarship Guide</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="flex flex-col gap-2 text-text-muted">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 text-text-muted text-sm">
                    <p>© 2025 ScholarStream. All rights reserved.</p>
                    <p>Empowering students to reach their future. Crafted by <span className="font-semibold text-primary">Mahmud</span>.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
