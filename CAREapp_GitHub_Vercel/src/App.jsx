import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CheckCircle, AlertCircle, Calendar, Book, Smile, Activity, Phone, TrendingUp } from "lucide-react";
import { incrementVisit, trackEvent, getStats } from "./analytics";

/* CAREApp with local analytics + admin debug panel
   Note: This file is a functional version of your app with Framer Motion
*/

const CAREApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProcedure, setSelectedProcedure] = useState("rhinoplasty");
  const [daysPostOp, setDaysPostOp] = useState(5);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [analytics, setAnalytics] = useState({ visits: 0, events: [] });
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    incrementVisit();
    setAnalytics(getStats());
    trackEvent('page_view', { page: activeTab });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAnalytics(getStats());
  }, [activeTab, showSymptomChecker, daysPostOp, selectedProcedure]);

  const procedures = {
    rhinoplasty: { name: "Rhinoplasty", milestones: [ { day: 1, title: "Surgery Day", status: "complete", description: "Rest, ice, elevation." }, { day: 3, title: "Peak Swelling", status: "complete", description: "Swelling and bruising peak." }, { day: 7, title: "Cast Removal", status: "current", description: "First follow-up." } ] },
    breastAugmentation: { name: "Breast Augmentation", milestones: [ { day: 1, title: "Surgery Day", status: "complete", description: "Surgical bra worn." }, { day: 7, title: "First Follow-up", status: "current", description: "Sutures may be removed." } ] },
    liposuction: { name: "Liposuction", milestones: [ { day: 1, title: "Surgery Day", status: "complete", description: "Compression garment." }, { day: 7, title: "Bruising Peak", status: "current", description: "Bruising most visible." } ] }
  };

  const currentMilestones = procedures[selectedProcedure].milestones;
  const updateMilestoneStatus = (milestone) => {
    if (milestone.day < daysPostOp) return "complete";
    if (milestone.day === daysPostOp) return "current";
    return "upcoming";
  };

  const pageVariant = { hidden: { opacity: 0, y: 8 }, enter: { opacity: 1, y: 0, transition: { duration: 0.28 } }, exit: { opacity: 0, y: -8, transition: { duration: 0.18 } } };
  const cardVariant = { hidden: { opacity: 0, y: 8, scale: 0.995 }, enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } } };

  const goToTab = (tab) => { setActiveTab(tab); trackEvent('tab_change', { tab }); };

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className="pb-20">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div key="home" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Welcome Back! 👋</h1>
                <p className="text-purple-100">Day {daysPostOp} of your recovery journey</p>
              </div>

              <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-2"><Calendar className="w-5 h-5 text-purple-600" /></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">Today's Focus</h3>
                    {currentMilestones.filter(m=>updateMilestoneStatus(m)==="current").map((milestone, idx)=>(
                      <div key={idx}><p className="text-purple-600 font-medium">{milestone.title}</p><p className="text-gray-600 text-sm mt-1">{milestone.description}</p></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "timeline" && (
            <motion.div key="timeline" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recovery Timeline</h2>
              <select value={selectedProcedure} onChange={(e)=>{ setSelectedProcedure(e.target.value); trackEvent('procedure_change', { procedure: e.target.value }); }} className="mt-4 w-full p-3 border border-gray-300 rounded-lg">
                <option value="rhinoplasty">Rhinoplasty</option>
                <option value="breastAugmentation">Breast Augmentation</option>
                <option value="liposuction">Liposuction</option>
              </select>

              <div className="space-y-4 mt-4">
                {currentMilestones.map((m, idx)=>(
                  <motion.div key={idx} variants={cardVariant} className="bg-white rounded-xl shadow p-5">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"><Calendar className="w-6 h-6 text-gray-400" /></div>
                      <div className="flex-1"><h3 className="font-semibold text-gray-800">{m.title}</h3><p className="text-gray-600 text-sm">Day {m.day}</p></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div key="education" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Education Center</h2>
              <div className="grid gap-4">
                <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5">Sample educational card</motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "psychology" && (
            <motion.div key="psychology" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Psychological Support</h2>
              <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5">Mood check-in area</motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showSymptomChecker && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-bold">Symptom Checker</h2><button onClick={()=>setShowSymptomChecker(false)}>✕</button></div>
            <p className="text-gray-600 text-sm mb-6">Monitor warning signs.</p>
            <button onClick={()=>trackEvent('call_surgeon')} className="w-full bg-red-600 text-white py-3 rounded-lg">Call Surgeon Now</button>
          </motion.div>
        </motion.div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button onClick={()=>goToTab("home")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab==="home" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}><Heart className="w-5 h-5 mb-1" /><span className="text-xs">Home</span></button>
          <button onClick={()=>goToTab("timeline")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab==="timeline" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}><TrendingUp className="w-5 h-5 mb-1" /><span className="text-xs">Timeline</span></button>
          <button onClick={()=>goToTab("education")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab==="education" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}><Book className="w-5 h-5 mb-1" /><span className="text-xs">Learn</span></button>
          <button onClick={()=>goToTab("psychology")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab==="psychology" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}><Smile className="w-5 h-5 mb-1" /><span className="text-xs">Support</span></button>
        </div>
      </div>

      <div className="fixed top-4 right-4">
        <button onClick={()=>setShowAdmin(v=>!v)} className="p-2 rounded-lg bg-gray-100">Admin</button>
      </div>

      {showAdmin && (
        <div className="fixed top-16 right-4 w-80 max-h-[70vh] overflow-auto bg-white border rounded-lg shadow-lg p-4 z-50">
          <h3 className="font-semibold mb-2">Local Analytics</h3>
          <pre className="text-xs">{JSON.stringify(getStats(), null, 2)}</pre>
          <div className="mt-3 flex space-x-2">
            <button onClick={()=>{ localStorage.clear(); setAnalytics(getStats()); }} className="flex-1 text-sm bg-red-100 text-red-700 py-2 rounded-lg">Clear</button>
            <button onClick={()=>setAnalytics(getStats())} className="flex-1 text-sm bg-gray-100 py-2 rounded-lg">Refresh</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CAREApp;
