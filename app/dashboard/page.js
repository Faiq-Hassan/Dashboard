'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <Image src="/imusician-logo.svg" alt="iMusician" width={40} height={40} />
        </div>
        
        <div className={styles.sidebarIcons}>
          <Link href="#">
            <div className={styles.cartIcon}>
              <span>🛒</span>
            </div>
          </Link>
          <Link href="#">
            <div className={styles.notificationIcon}>
              <span>🔔</span>
            </div>
          </Link>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <div className={styles.navIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" fill="white"/>
                <rect x="4" y="14" width="6" height="6" rx="1" fill="white"/>
                <rect x="14" y="4" width="6" height="6" rx="1" fill="white"/>
                <rect x="14" y="14" width="6" height="6" rx="1" fill="white"/>
              </svg>
            </div>
            <span>Dashboard</span>
          </Link>
          
          <Link href="#" className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15" stroke="#A0A0A0" strokeWidth="2"/>
                <path d="M12 15V21" stroke="#A0A0A0" strokeWidth="2"/>
                <path d="M8 21H16" stroke="#A0A0A0" strokeWidth="2"/>
              </svg>
            </div>
            <span>Library</span>
          </Link>
          
          <Link href="#" className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="#A0A0A0" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="#A0A0A0" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="#A0A0A0" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="#A0A0A0" strokeWidth="2"/>
              </svg>
            </div>
            <span>Products</span>
          </Link>
          
          <Link href="#" className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21H3V3H21V21Z" stroke="#A0A0A0" strokeWidth="2"/>
                <path d="M3 16L8 11L13 16L21 8" stroke="#A0A0A0" strokeWidth="2"/>
              </svg>
            </div>
            <span>Analytics</span>
          </Link>
          
          <Link href="#" className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#A0A0A0" strokeWidth="2"/>
                <path d="M12 6V12H16" stroke="#A0A0A0" strokeWidth="2"/>
              </svg>
            </div>
            <span>Revenue</span>
          </Link>
          
          <Link href="#" className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="5" stroke="#A0A0A0" strokeWidth="2"/>
                <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="#A0A0A0" strokeWidth="2"/>
              </svg>
            </div>
            <span>Account</span>
            <div className={styles.badge}>0</div>
          </Link>
        </nav>
        
        <Link href="#" className={styles.helpItem}>
          <div className={styles.helpIcon}>?</div>
          <span>Need help?</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* GET STARTED Section - completely redone with simpler structure */}
        <div style={{
          padding: '20px 0',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'white',
            marginBottom: '20px',
          }}>GET STARTED</h2>
        
          {/* Cards Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            width: '100%',
          }}>
            {/* Upload Music Card */}
            <div style={{
              backgroundColor: '#242424',
              borderRadius: '15px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'pointer',
              border: '2px solid transparent',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => console.log('Upload Music clicked')}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '2px solid #7AFC90';
              e.currentTarget.querySelector('button').style.backgroundColor = '#7AFC90';
              e.currentTarget.querySelector('button').style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '2px solid transparent';
              e.currentTarget.querySelector('button').style.backgroundColor = '#333';
              e.currentTarget.querySelector('button').style.color = 'white';
            }}>
              <div style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#7AFC90' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15" stroke="#7AFC90" strokeWidth="2"/>
                  <path d="M12 15V21" stroke="#7AFC90" strokeWidth="2"/>
                  <path d="M8 21H16" stroke="#7AFC90" strokeWidth="2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '10px' }}>UPLOAD MUSIC</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '20px' }}>Pay once, online forever</p>
              <button style={{ 
                width: '100%',
                padding: '12px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>Start my release</button>
            </div>
            
            {/* Instant Mastering Card */}
            <div style={{
              backgroundColor: '#242424',
              borderRadius: '15px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'pointer',
              border: '2px solid transparent',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => console.log('Instant Mastering clicked')}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '2px solid #7AFC90';
              e.currentTarget.querySelector('button').style.backgroundColor = '#7AFC90';
              e.currentTarget.querySelector('button').style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '2px solid transparent';
              e.currentTarget.querySelector('button').style.backgroundColor = '#333';
              e.currentTarget.querySelector('button').style.color = 'white';
            }}>
              <div style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#7AFC90' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="4" height="16" rx="1" stroke="#7AFC90" strokeWidth="2"/>
                  <rect x="10" y="8" width="4" height="12" rx="1" stroke="#7AFC90" strokeWidth="2"/>
                  <rect x="16" y="6" width="4" height="14" rx="1" stroke="#7AFC90" strokeWidth="2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '10px' }}>INSTANT MASTERING</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '20px' }}>Pay once per track</p>
              <button style={{ 
                width: '100%',
                padding: '12px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>Master my track</button>
            </div>
            
            {/* Brand & Release Promo Card */}
            <div style={{
              backgroundColor: '#242424',
              borderRadius: '15px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'pointer',
              border: '2px solid transparent',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => console.log('Brand & Release Promo clicked')}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '2px solid #7AFC90';
              e.currentTarget.querySelector('button').style.backgroundColor = '#7AFC90';
              e.currentTarget.querySelector('button').style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '2px solid transparent';
              e.currentTarget.querySelector('button').style.backgroundColor = '#333';
              e.currentTarget.querySelector('button').style.color = 'white';
            }}>
              <div style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#7AFC90' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="#7AFC90" strokeWidth="2"/>
                  <path d="M8 12H16" stroke="#7AFC90" strokeWidth="2"/>
                  <path d="M12 8V16" stroke="#7AFC90" strokeWidth="2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '10px' }}>BRAND & RELEASE PROMO</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '20px' }}>Create a web presence in minutes</p>
              <button style={{ 
                width: '100%',
                padding: '12px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>Explore Artist Hub</button>
            </div>
          </div>
        </div>

        {/* ACTIVITY Section */}
        <div className={styles.activitySection}>
          <h2>ACTIVITY</h2>
          
          <div className={styles.activityGrid}>
            {/* Current Plan */}
            <div className={styles.activityCard}>
              <div className={styles.activityHeader}>
                <h3>Current plan</h3>
                <button className={styles.manageButton}>Manage</button>
              </div>
              <div className={styles.planDetails}>
                <h4>STARTER</h4>
                <p>New artists</p>
              </div>
            </div>
            
            {/* Refer Artists */}
            <div className={styles.activityCard}>
              <div className={styles.activityHeader}>
                <h3>Refer artists and earn</h3>
                <button className={styles.learnButton}>Learn more</button>
              </div>
              <p className={styles.referText}>
                Invite fellow musicians, and you'll both get rewarded!
              </p>
            </div>
            
            {/* Credits */}
            <div className={styles.activityCard}>
              <div className={styles.activityHeader}>
                <h3>Your credits</h3>
              </div>
              <div className={styles.creditsInfo}>
                <div className={styles.creditRow}>
                  <span>Cash credit</span>
                  <span className={styles.creditAmount}>USD 0.00</span>
                </div>
                <div className={styles.creditRow}>
                  <span>Promo credit</span>
                  <span className={styles.creditAmount}>USD 0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Section */}
        <div className={styles.distributionSection}>
          <div className={styles.distReleaseSection}>
            <h3>Distribution in progress</h3>
            <div className={styles.releaseItem}>
              <div className={styles.releaseIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14H5C4.44772 14 4 13.5523 4 13V5C4 4.44772 4.44772 4 5 4H15C15.5523 4 16 4.44772 16 5V13C16 13.5523 15.5523 14 15 14H13" stroke="white" strokeWidth="1.5"/>
                  <path d="M10 12V17" stroke="white" strokeWidth="1.5"/>
                  <path d="M7 17H13" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className={styles.releaseInfo}>
                <h4>Release title not set</h4>
                <p>Single</p>
              </div>
            </div>
            
            <div className={styles.releaseDetails}>
              <h4>RELEASE DETAILS</h4>
              <p>Complete form and proceed to distribution</p>
              <button className={styles.resumeButton}>Resume</button>
            </div>
          </div>
          
          <div className={styles.streamsSection}>
            <h3>Streams</h3>
            <div className={styles.streamGraph}>
              <div className={styles.graph}>
                <div className={styles.graphLine}></div>
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className={styles.newsSection}>
          <h2>NEWS</h2>
          
          <div className={styles.newsCards}>
            <div className={styles.newsCard}>
              <div className={styles.newsImageContainer}>
                <div className={styles.newsImage}></div>
              </div>
              <h3>Get Featured on Musician's Social Media!</h3>
              <p>We're always on the lookout for Musician artists to spotlight on our social media channels. Got something exciting?</p>
              <button className={styles.submitButton}>Submit here</button>
            </div>
            
            <div className={styles.newsCard}>
              <div className={styles.newsImageContainer}>
                <div className={styles.newsImage}></div>
              </div>
              <h3>Submit Your Tracks To Our Playlists!</h3>
              <p>Did you know we have our own playlists? They have many followers and our curation team is all submissions. Send us your track now and get featured</p>
              <button className={styles.submitButton}>Send your track now</button>
            </div>
            
            <div className={styles.newsCard}>
              <div className={styles.newsImageContainer}>
                <div className={styles.newsImage}></div>
              </div>
              <h3>Your New Artist Page, Made Just for You</h3>
              <p>A sleek new design, custom color options, and a URL that's easy for fans to remember—because your brand deserves a space as unique as your sound.</p>
              <button className={styles.submitButton}>Try it now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}