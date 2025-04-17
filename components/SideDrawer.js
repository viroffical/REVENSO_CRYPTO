import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTimes,
  faGaugeHigh,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { createClient } from '@supabase/supabase-js';
import { createClient as createSupabaseClient } from '../utils/supabase/client';

const SideDrawer = ({ isOpen, onClose, userProfile: propUserProfile }) => {
  const [localUserProfile, setLocalUserProfile] = useState(null);
  const router = useRouter();
  
  // Use the provided userProfile prop if available, otherwise get from localStorage
  useEffect(() => {
    if (propUserProfile) {
      setLocalUserProfile(propUserProfile);
    } else if (typeof window !== 'undefined') {
      try {
        const storedProfile = localStorage.getItem('revenso_user');
        if (storedProfile) {
          setLocalUserProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, [propUserProfile]);
  
  const handleLogout = async () => {
    try {
      // This will only run in the browser
      if (typeof window !== 'undefined') {
        // Clear local storage
        localStorage.removeItem('revenso_user');
        
        // Attempt to sign out from Supabase
        try {
          const supabase = createSupabaseClient();
          await supabase.auth.signOut();
        } catch (supabaseError) {
          console.error('Supabase signout error:', supabaseError);
          // Continue with logout flow even if Supabase signout fails
        }
        
        // Close drawer and redirect to login
        onClose();
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, we should still clear localStorage and redirect
      if (typeof window !== 'undefined') {
        localStorage.removeItem('revenso_user');
        onClose();
        router.push('/login');
      }
    }
  };
  
  const drawerVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 0.5,
      display: "block",
    },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };

  // Default profile if none provided
  // const profile = userProfile || {
  //   name: "Your Name",
  //   username: "@username",
  //   following: 196,
  //   followers: 1176,
  //   profileImgUrl:
  //     "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  // };

  return (
    <>
      {/* Overlay to close drawer when clicking outside */}
      <motion.div
        className="fixed inset-0 bg-black z-30"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={overlayVariants}
        onClick={onClose}
      />

      {/* Drawer sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-40 flex flex-col shadow-xl overflow-y-auto pb-24"
        style={{
          paddingBottom: "calc(72px + env(safe-area-inset-bottom, 8px))",
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-2 right-2 p-2 block md:hidden"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
        </button>

        {/* Profile section */}
        <div className="p-4 border-b border-gray-200">
          {localUserProfile ? (
            <div className="flex items-center mb-2">
              <img
                src={localUserProfile.image_url || localUserProfile.avatar}
                alt={localUserProfile.full_name || localUserProfile.name}
                className="w-12 h-12 rounded-full mr-3 object-cover border border-gray-200"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{localUserProfile.full_name || localUserProfile.name}</h3>
                <p className="text-sm text-gray-500">{localUserProfile.twitter || localUserProfile.username}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-16">
              <div className="animate-pulse w-full">
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-200 h-12 w-12 mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation menu */}
        <nav className="flex-1">
          <ul className="py-2">
            <li>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("setActiveTab", { detail: "profile" }),
                  );
                  onClose();
                }}
                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-700 w-5 h-5 mr-3"
                />
                <span className="font-medium">Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("setActiveTab", { detail: "dashboard" }),
                  );
                  onClose();
                }}
                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faGaugeHigh}
                  className="text-gray-700 w-5 h-5 mr-3"
                />
                <span className="font-medium">Dashboard</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer - with extra space to ensure visibility above bottom navigation */}
        <div className="p-4 pt-2 flex flex-col mt-auto">
          {/* Logout Button */}
          <button
            className="logout-button w-full mb-4"
            onClick={handleLogout}
          >
            <span className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-2"
              />
              Logout
            </span>
          </button>

          {/* Extra space to ensure visibility above bottom nav */}
          <div className="h-16"></div>
        </div>
      </motion.div>
    </>
  );
};

export default SideDrawer;
