
import { useState } from "react";
import "./index.css";

const movies = [
  { title: "Interstellar", genre: "Sci-Fi · Adventure", year: "2014", rating: "8.7", emoji: "🌌", color: "space" },
  { title: "Inception", genre: "Action · Thriller", year: "2010", rating: "8.8", emoji: "🏙️", color: "dream" },
  { title: "Dune: Part Two", genre: "Sci-Fi · Adventure", year: "2024", rating: "8.5", emoji: "🏜️", color: "dune" },
  { title: "The Batman", genre: "Crime · Action", year: "2022", rating: "7.8", emoji: "🦇", color: "batman" },
  { title: "La La Land", genre: "Romance · Musical", year: "2016", rating: "8.0", emoji: "🌆", color: "city" },
  { title: "The Martian", genre: "Sci-Fi · Drama", year: "2015", rating: "8.0", emoji: "🚀", color: "mars" },
];

function App() {
  const [search, setSearch] = useState("");

    const [message, setMessage] = useState("");
  const [signinLoading, setSigninLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
  Boolean(localStorage.getItem("token"))
);
const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setMessage("You have logged out.");
};

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">
          i<span>Movies</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
        </nav>

        <div className="auth-buttons">
          <a className="login-button"
   href="#login">
  {isLoggedIn ? "Welcome!" : "Sign in"}
</a>
          <a className="signup-button"
          href="#signup">Sign up</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</p>
            <h1>Stories worth<br />watching.</h1>
            <p className="hero-description">
              Discover unforgettable movies, explore new worlds,
              and find your next big-screen experience.
            </p>
            <a className="primary-button" href="#movies">
              Explore movies <span>↗</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="planet">✦</div>
            <div className="hero-caption">EVERY FRAME TELLS A STORY</div>
          </div>
        </section>

        <section className="movies-section" id="movies">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PICK YOUR NEXT ADVENTURE</p>
              <h2>Featured <span>movies</span></h2>
            </div>
            <input
              className="search-input"
              type="search"
              placeholder="Search movies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search movies"
            />
          </div>

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <article className="movie-card" key={movie.title}>
                <div className={`poster ${movie.color}`}>
                  <span className="poster-emoji">{movie.emoji}</span>
                  <span className="rating">★ {movie.rating}</span>
                  <span className="poster-year">{movie.year}</span>
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>
                  <button
                    className="book-button"
                    onClick={() => alert(`Showtimes for ${movie.title} will be available in a later step.`)}
                  >
                    View showtimes <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <p className="empty-state">No movies found. Try another title.</p>
          )}
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">MORE THAN JUST MOVIES</p>
          <h2>Your next favourite story is waiting.</h2>
          <p>Explore films, discover adventures, and make movie nights memorable.</p>
        </section>

        
      </main>

      <footer><section className="login-section" id="login">
  <h2>Welcome to <span>iMovies</span></h2>
  <p>Sign in or create an account to continue.</p>

  <div className="auth-forms">
    
    
<form
  onSubmit={async (event) => {
    event.preventDefault();
    setMessage("");
    setSigninLoading(true);

    const form = event.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    try {
      const response = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Sign in failed.");
      } else {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setMessage("Signed in successfully!");
      }
    } catch {
      setMessage("Cannot connect to the server. Check that it is running.");
    } finally {
      setSigninLoading(false);
    }
  }}
>
  <h3>Sign in</h3>
  {message && <p>{message}</p>}
  <input
    name="email"
    type="email"
    placeholder="Email address"
    required
  />
  <input
    name="password"
    type="password"
    placeholder="Password"
    required
  />
  <button type="submit" disabled={signinLoading}>
    {signinLoading ? "Signing in..." : "Sign in"}
  </button>
</form>



<form
  id="signup"
  onSubmit={async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Sign up failed.");
        return;
      }

      alert("Account created successfully! You can now sign in.");
      form.reset();
    } catch (error) {
      alert("Cannot connect to the server. Please check the backend.");
      console.error(error);
    }
  }}
>
  <h3>Create an account</h3>

  <input
    name="name"
    type="text"
    placeholder="Your name"
    required
  />

  <input
    name="email"
    type="email"
    placeholder="Email address"
    required
  />

  <input
    name="password"
    type="password"
    placeholder="Create a password (minimum 8 characters)"
    minLength={8}
    required
  />

  <button type="submit">Sign up</button>
</form>



    
  </div>
</section>
        <a className="logo" href="#home">i<span>Movies</span></a>
        <p>Made for people who love stories.</p>
        <p>© 2026 iMovies · Student project</p>
      </footer>
    </div>
  );
}

export default App;


