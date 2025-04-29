import React, { useState, useEffect } from 'react';
import './App.css';

const wordSuggestions = [
  "serendipity", "ephemeral", "quintessential", "eloquence", 
  "luminous", "resonance", "ethereal", "solitude", "petrichor",
  "aurora", "sonorous", "limerence", "epiphany", "halcyon", 
  "effervescent", "sonder", "opulence", "ineffable"
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordSuggestions.length);
  return wordSuggestions[randomIndex];
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionWord, setSuggestionWord] = useState(getRandomWord());
  const [isFocused, setIsFocused] = useState(false);

  // Change suggestion word every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionWord(getRandomWord());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Vedant</h1>
        <h2 className="tagline">Find the perfect word</h2>
        <p className="suggestion">Try "<span className="suggestion-word">{suggestionWord}</span>" or any word...</p>
      </header>

      <div className="search-container">
        <h3 className="search-label">Search</h3>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter a word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input ${isFocused ? 'focused' : ''}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button type="submit" className="search-button">
            <span className="search-icon">🔍</span>
            <span className="search-text">Search</span>
          </button>
        </form>
      </div>

      <div className="divider"></div>

      <div className="empty-state">
        <h3>Start exploring words</h3>
        <p>Type any word in the search box above to find its definition, pronunciation, and examples.</p>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Vedant Dictionary. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;