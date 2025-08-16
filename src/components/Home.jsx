
import React from "react";
import "../styles/home.css";

function Home({ user }) {
  if (user) {
    // Logged-in version of home
    return (
      <div className="home-container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome back, {user.name}!</h1>
            <p className="welcome-subtitle">Monitor your team's engagement and sentiment with real-time insights.</p>
          </div>
          <div className="user-avatar">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Engagement Dashboard</h3>
            <p>Monitor team sentiment, weekly trends, and burnout warnings from Slack channels</p>
            <a href="/engagement" className="card-button">View Dashboard</a>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">📈</div>
            <h3>Weekly Trends</h3>
            <p>Track daily mood aggregation and identify patterns in team engagement</p>
            <a href="/engagement" className="card-button">View Trends</a>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">⚠️</div>
            <h3>Burnout Alerts</h3>
            <p>Get proactive warnings about team burnout and engagement issues</p>
            <a href="/engagement" className="card-button">Check Alerts</a>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Profile</h3>
            <p>View and manage your account settings</p>
            <a href="/profile" className="card-button">View Profile</a>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Monitoring</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Real-time</div>
            <div className="stat-label">Insights</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Actionable</div>
            <div className="stat-label">Data</div>
          </div>
        </div>
      </div>
    );
  }

  // Public version of home
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Employee Engagement Pulse</span>
          </h1>
          <p className="hero-subtitle">
            Monitor your team's engagement and sentiment with real-time insights from Slack channels. 
            Get actionable team-level insights to boost morale and prevent burnout.
          </p>
          <div className="hero-buttons">
            <a href="/login" className="btn-primary">Get Started</a>
            <a href="#features" className="btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">📊</div>
            <span>Sentiment Analysis</span>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">📈</div>
            <span>Weekly Trends</span>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">⚠️</div>
            <span>Burnout Alerts</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Powerful Engagement Insights</h2>
          <p className="section-subtitle">Everything you need to monitor and improve team engagement</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Slack Channel Monitoring</h3>
              <p>Monitor user-defined Slack channels including threads and reactions to capture comprehensive team sentiment and engagement patterns.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI Sentiment Analysis</h3>
              <p>Advanced text and emoji sentiment analysis on every message to understand team mood and engagement levels in real-time.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Weekly Trend Analytics</h3>
              <p>Aggregate daily mood data into weekly trends with visual charts and insights to track long-term engagement patterns.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Burnout Warning System</h3>
              <p>Proactive alerts and warnings when team engagement drops or burnout indicators are detected, helping you intervene early.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Actionable Insights</h3>
              <p>Generate team-level insights and recommendations for managers to improve engagement, boost morale, and prevent burnout.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Enterprise-grade security with secure authentication and complete privacy controls to protect your team's communication data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Boost Team Engagement?</h2>
          <p>Join managers who are already improving team morale with data-driven insights</p>
          <a href="/login" className="btn-primary-large">Sign Up Now</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
