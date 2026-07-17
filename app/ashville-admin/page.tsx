"use client";

import { useState } from "react";
import { Lock, Search, Users, Phone, Mail, ChevronRight, ChevronLeft, RefreshCw, CheckCircle2, Image as ImageIcon, Upload, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Applicant = {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  gradeApplyingFor: string;
  previousSchool: string;
  status: 'pending' | 'admitted';
  createdAt: string;
};

const MEDIA_SECTIONS = [
  { id: 'global-logo', label: 'School Logo', default: '/images/1.png', category: 'Global' },
  { id: 'home-hero', label: 'Hero Slideshow', default: '/images/1.png', defaultImages: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png', '/images/5.png', '/images/6.png'], category: 'Homepage', isMultiple: true },
  { id: 'home-feature-1', label: 'Feature: Creche', default: '/images/1.png', category: 'Homepage' },
  { id: 'home-feature-2', label: 'Feature: Robotics', default: '/images/2.png', category: 'Homepage' },
  { id: 'home-feature-3', label: 'Feature: Curriculum', default: '/images/3.png', category: 'Homepage' },
  { id: 'home-feature-4', label: 'Feature: Library', default: '/images/4.png', category: 'Homepage' },
  { id: 'home-about-1', label: 'About: Montessori', default: '/images/home_about.png', category: 'Homepage' },
  { id: 'home-about-2', label: 'About: Students', default: '/images/8.png', category: 'Homepage' },
  { id: 'home-about-3', label: 'About: Classroom', default: '/images/7.png', category: 'Homepage' },
  { id: 'home-about-4', label: 'About: Group', default: '/images/12.png', category: 'Homepage' },
  { id: 'home-coding', label: 'Coding & Robotics', default: '/images/5.png', category: 'Homepage' },
  { id: 'home-gallery-slide', label: 'Gallery Slideshow', default: '/images/1.png', defaultImages: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png', '/images/5.png', '/images/6.png', '/images/8.png', '/images/12.png'], category: 'Homepage', isMultiple: true },
  { id: 'about-hero', label: 'Hero Slideshow', default: '/images/home_about.png', defaultImages: ['/images/home_about.png'], category: 'About', isMultiple: true },
  { id: 'about-mission', label: 'Mission Image', default: '/images/home_about.png', category: 'About' },
  { id: 'about-story', label: 'Our Story', default: '/images/9.png', category: 'About' },
  { id: 'programs-hero', label: 'Hero Slideshow', default: '/images/1.png', defaultImages: ['/images/1.png'], category: 'Programs', isMultiple: true },
  { id: 'programs-coding', label: 'Coding Banner', default: '/images/5.png', category: 'Programs' },
  { id: 'admissions-hero', label: 'Hero Slideshow', default: '/images/1.png', defaultImages: ['/images/1.png'], category: 'Admissions', isMultiple: true },
  { id: 'gallery-hero', label: 'Hero Slideshow', default: '/images/1.png', defaultImages: ['/images/1.png'], category: 'Gallery', isMultiple: true },
  { id: 'gallery-main', label: 'Main Gallery', default: '/images/1.png', defaultImages: [], category: 'Gallery', isMultiple: true },
  { id: 'contact-hero', label: 'Hero Slideshow', default: '/images/1.png', defaultImages: ['/images/1.png'], category: 'Contact', isMultiple: true },
  { id: 'contact-map', label: 'Map Image', default: '/images/6.png', category: 'Contact' },
];

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'applicants' | 'media'>('applicants');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRefreshed, setShowRefreshed] = useState(false);
  
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [mediaOverrides, setMediaOverrides] = useState<Record<string, { imageUrl: string, images?: string[] }>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaCategory, setMediaCategory] = useState('Homepage');
  const [previewIndices, setPreviewIndices] = useState<Record<string, number>>({});
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const appRes = await fetch('/api/admin/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const appResult = await appRes.json();

      if (appRes.ok && appResult.success) {
        setApplicants(appResult.data);
        setIsAuthenticated(true);
        fetchMedia();
      } else {
        setError(appResult.error || "Invalid password");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('action', 'list');
      
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        const map: Record<string, { imageUrl: string, images: string[] }> = {};
        result.data.forEach((item: any) => {
          map[item.sectionId] = { imageUrl: item.imageUrl, images: item.images || [] };
        });
        setMediaOverrides(map);
      }
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  const handleUpload = async (sectionId: string, files: FileList | File[], isMultiple: boolean = false) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('action', 'upload');
      formData.append('sectionId', sectionId);
      
      Array.from(files).forEach(file => {
        formData.append('file', file);
      });
      
      if (isMultiple) formData.append('isMultiple', 'true');

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setMediaOverrides(prev => ({ 
          ...prev, 
          [sectionId]: { imageUrl: result.data.imageUrl, images: result.data.images || [] } 
        }));
      } else {
        alert(result.error || "Failed to upload image(s)");
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async (sectionId: string, imageUrl: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('action', 'remove_image');
      formData.append('sectionId', sectionId);
      formData.append('imageUrl', imageUrl);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setMediaOverrides(prev => ({ 
          ...prev, 
          [sectionId]: { imageUrl: result.data.imageUrl, images: result.data.images || [] } 
        }));
      }
    } catch (err) {
      console.error("Remove image error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRevert = async (sectionId: string) => {
    if (!confirm("Revert to the original static image? This will delete the custom upload.")) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('action', 'delete');
      formData.append('sectionId', sectionId);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setMediaOverrides(prev => {
          const next = { ...prev };
          delete next[sectionId];
          return next;
        });
      }
    } catch (err) {
      console.error("Revert error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (!confirm("Are you sure you want to admit this student? An SMS will be sent to the parent immediately.")) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setApplicants(prev => prev.map(app => 
          app._id === id ? { ...app, status: 'admitted' } : app
        ));
        setShowRefreshed(true);
        setTimeout(() => setShowRefreshed(false), 2000);
      } else {
        alert(result.error || "Failed to approve");
      }
    } catch (err) {
      console.error("Failed to approve", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/applicants?t=' + Date.now(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setApplicants(result.data);
        setShowRefreshed(true);
        setTimeout(() => setShowRefreshed(false), 2000);
      }
      fetchMedia();
    } catch (err) {
      console.error("Failed to refresh", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplicants = applicants.filter(app => 
    `${app.studentFirstName} ${app.studentLastName} ${app.parentName} ${app.parentPhone}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplicants = filteredApplicants.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Admin Portal</h1>
          <p className="text-slate-500 mb-8 font-medium">Enter your secure password to access management tools.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-center focus:outline-none focus:ring-2 focus:ring-primary font-bold tracking-widest" />
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              {loading ? "Verifying..." : "Access Portal"} <ChevronRight size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-primary text-white pt-10 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">Ashville Management</h1>
              <p className="text-white/70 font-medium text-lg">School Administration Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
               <AnimatePresence>
                 {showRefreshed && (
                   <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-green-500/20 text-green-300 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-green-500/30">
                     Data Refreshed!
                   </motion.span>
                 )}
               </AnimatePresence>
               <button onClick={refreshData} className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-xl transition-colors relative group">
                 <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
               </button>
            </div>
          </div>

          <div className="flex bg-white/10 p-1 rounded-2xl backdrop-blur-md w-full max-w-md">
            <button onClick={() => setActiveTab('applicants')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'applicants' ? 'bg-white text-primary shadow-lg' : 'text-white/70 hover:text-white'}`}>
              <Users size={18} /> Admissions
            </button>
            <button onClick={() => setActiveTab('media')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'media' ? 'bg-white text-primary shadow-lg' : 'text-white/70 hover:text-white'}`}>
              <ImageIcon size={18} /> Media Manager
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        {activeTab === 'applicants' ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Users size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Applications</p>
                  <h3 className="text-4xl font-bold text-primary">{applicants.length}</h3>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-6 md:col-span-2">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                  <Search size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Search Database</p>
                  <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by student, parent name, or phone..." className="w-full bg-transparent border-none focus:outline-none font-medium text-lg text-primary placeholder-slate-300" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Grade</th>
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Parent Details</th>
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplicants.length === 0 ? (
                      <tr><td colSpan={4} className="p-12 text-center text-slate-500 font-medium">No applications found.</td></tr>
                    ) : (
                      paginatedApplicants.map((app) => (
                        <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6">
                            <div className="font-bold text-primary text-lg mb-1">{app.studentFirstName} {app.studentLastName}</div>
                            <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{app.gender}</span>
                              <span>DOB: {new Date(app.dateOfBirth).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="font-bold text-primary mb-1">{app.gradeApplyingFor}</div>
                          </td>
                          <td className="p-6">
                            <div className="font-bold text-primary mb-1">{app.parentName}</div>
                            <div className="text-sm font-medium text-slate-500 flex flex-col gap-1">
                              <a href={`tel:${app.parentPhone}`} className="flex items-center gap-1 hover:text-primary transition-colors"><Phone size={14} /> {app.parentPhone}</a>
                              {app.parentEmail && <a href={`mailto:${app.parentEmail}`} className="flex items-center gap-1 hover:text-primary transition-colors"><Mail size={14} /> {app.parentEmail}</a>}
                            </div>
                          </td>
                          <td className="p-6 text-right">
                            {app.status === 'admitted' ? (
                              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-green-100">
                                <CheckCircle2 size={14} /> Admitted
                              </div>
                            ) : (
                              <button onClick={() => handleApprove(app._id)} disabled={loading} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Admit</button>
                            )}
                            <div className="mt-2 text-[10px] text-slate-400 font-medium">{new Date(app.createdAt).toLocaleDateString()}</div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm font-medium text-slate-500">Showing <span className="text-primary font-bold">{startIndex + 1}</span> to <span className="text-primary font-bold">{Math.min(startIndex + itemsPerPage, filteredApplicants.length)}</span> of <span className="text-primary font-bold">{filteredApplicants.length}</span> applicants</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-primary disabled:opacity-40">Previous</button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-primary disabled:opacity-40">Next</button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-10 pb-20">
            <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-[2rem] backdrop-blur-md">
              {['Global', 'Homepage', 'About', 'Programs', 'Admissions', 'Gallery', 'Contact'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMediaCategory(cat)}
                  className={`px-8 py-3 rounded-full font-bold transition-all text-sm ${
                    mediaCategory === cat 
                      ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,98,72,0.4)]' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <h3 className="text-3xl font-heading font-bold text-white border-l-4 border-primary pl-6 capitalize">
                  {mediaCategory} <span className="text-white/40 text-lg font-medium ml-2">Media Slots</span>
                </h3>
                <div className="flex-1 h-[2px] bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MEDIA_SECTIONS.filter(s => s.category === mediaCategory).map((section) => {
                  const override = mediaOverrides[section.id];
                  const isOverridden = !!override;
                  const isMultiple = (section as any).isMultiple;
                  
                  const overrideImages = override?.images || [];
                  const images = overrideImages.length > 0 ? overrideImages : ((section as any).defaultImages || []);
                  
                  const currentPreviewIndex = previewIndices[section.id] || 0;
                  const validIndex = currentPreviewIndex < images.length ? currentPreviewIndex : 0;
                  
                  const currentSrc = (isMultiple && images.length > 0) ? images[validIndex] : (override?.imageUrl || section.default);

                  const handleNextPreview = (e: React.MouseEvent) => {
                    e.preventDefault();
                    if (images.length <= 1) return;
                    setPreviewIndices(prev => ({ ...prev, [section.id]: (validIndex + 1) % images.length }));
                  };

                  const handlePrevPreview = (e: React.MouseEvent) => {
                    e.preventDefault();
                    if (images.length <= 1) return;
                    setPreviewIndices(prev => ({ ...prev, [section.id]: (validIndex - 1 + images.length) % images.length }));
                  };

                  return (
                    <div key={section.id} className={`bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col group ${isMultiple ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                      <div className={`relative ${isMultiple ? 'h-64' : 'h-48'} bg-slate-900 overflow-hidden`}>
                        <Image src={currentSrc} alt={section.label} fill className="object-cover opacity-60 transition-all duration-500" />
                        
                        {isMultiple && images.length > 1 && (
                          <>
                            <button onClick={handlePrevPreview} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors z-20 backdrop-blur-md">
                              <ChevronLeft size={24} />
                            </button>
                            <button onClick={handleNextPreview} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors z-20 backdrop-blur-md">
                              <ChevronRight size={24} />
                            </button>
                          </>
                        )}

                        {isMultiple && images.length > 0 && (
                          <div className={`absolute top-4 right-4 ${isOverridden ? 'bg-primary text-white' : 'bg-slate-800 text-white'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20`}>
                            {isOverridden ? 'Custom' : 'Default'} ({validIndex + 1}/{images.length})
                          </div>
                        )}
                        {!isMultiple && isOverridden && (
                          <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg z-20">
                            Custom
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 pointer-events-none z-10">
                           <div>
                             <h4 className="text-xl font-heading font-bold text-white mb-1">{section.label}</h4>
                             <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">ID: {section.id}</p>
                           </div>
                        </div>
                      </div>

                      <div className="p-8 flex flex-col flex-1">
                        {isMultiple && overrideImages.length > 0 && (
                          <div className="mb-8">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Slideshow Gallery</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                              {overrideImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group/img ring-1 ring-slate-100">
                                  <Image src={img} alt={`Slide ${idx + 1}`} fill className="object-cover" />
                                  <button 
                                    onClick={() => handleRemoveImage(section.id, img)}
                                    className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                          <label className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-4 rounded-2xl font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 active:scale-95">
                            <Upload size={18} /> {isMultiple ? 'Add New Slides' : 'Replace Image'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              multiple={isMultiple}
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) handleUpload(section.id, files, isMultiple);
                              }} 
                            />
                          </label>
                          {isOverridden && (
                            <button 
                              onClick={() => handleRevert(section.id)} 
                              className="px-6 py-4 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm font-bold text-sm gap-2"
                            >
                              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                              {isMultiple ? 'Clear All & Reset' : 'Revert'}
                            </button>
                          )}
                        </div>
                        {isMultiple && overrideImages.length === 0 && (
                          <p className="mt-4 text-xs text-slate-400 italic">No custom slides uploaded. Showing the default school background.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
