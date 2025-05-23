import React, { useState } from 'react';
import { supabase } from '../client/supabaseClient';

const NavComponent = ({ userData, setUserData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
  };

  const username = userData?.user_metadata?.username || userData?.email;

  return (
    <nav
      className="flex flex-col justify-between"
      style={{
        backgroundColor: '#4CAF50', // primary 60% - dark green
        color: '#424242', // dark text (mostly for dropdown)
        width: '220px',
        height: '100vh',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <div
          className="text-2xl font-bold mb-10"
          style={{ color: '#FFF176' }} // secondary 30% - yellow
        >
          CampusBite
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            backgroundColor: '#FFF176', // secondary yellow
            color: '#424242', // dark text
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          {username}
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%', // dropdown moves *up* above button
              left: 0,
              marginBottom: '0.5rem',
              width: '100%',
              backgroundColor: '#F5F5F5', // light background
              color: '#424242', // dark text
              borderRadius: '0.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: '600',
                color: '#F44336', // accent red
                borderRadius: '0.5rem',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F44336';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F44336';
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavComponent;
