# WEBPOT Full Website Replica Blueprint

This markdown contains everything needed to recreate the website in this workspace, excluding image files only.

## Skill Usage
- No listed skill was applicable (`skill-creator` and `skill-installer` are unrelated to website extraction).

## Included Scope
- Main public website
- Orders/plan page
- Shared frontend CSS/JS
- PHP form handlers + API endpoints
- Dashboard subsite (`webpot- dashboard/user dashboard`)
- Backup stylesheet present in repo (`style_backup.css`)

## Excluded Files
- Image assets (`*.png`) as requested
- Non-website docs and notes (`Flow.md`, `TODO.md`, `database_setup.md`)

## Folder Structure To Recreate
```text
WEBPOT/
|-- index.html
|-- orders.html
|-- style.css
|-- style_backup.css
|-- script.js
|-- config.php
|-- contact_form.php
|-- order_form.php
|-- api/submit_contact.php
|-- api/submit_order.php
|-- webpot- dashboard/user dashboard/index.html
|-- webpot- dashboard/user dashboard/orders.html
|-- webpot- dashboard/user dashboard/settings.html
|-- webpot- dashboard/user dashboard/legal.html
|-- webpot- dashboard/user dashboard/style.css
|-- webpot- dashboard/user dashboard/script.js
|-- webpot-logo-black.png   (add manually)
|-- webpot-logo-white.png   (add manually)
|-- webpot- dashboard/user dashboard/webpot-logo-black.png   (add manually)
|-- webpot- dashboard/user dashboard/webpot-logo-white.png   (add manually)
```

## Runtime Dependencies
- Google Fonts (`Poppins`)
- Font Awesome 6.5.1 CDN
- AOS 2.3.4 CDN (main site)
- PHP 8+ with PDO MySQL driver for form submission APIs

## Database Tables (required by API endpoints)
```sql
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    business VARCHAR(255),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    plan VARCHAR(100),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Complete Source

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Webpot – Advanced Webpot Solution</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

</head>

<body>
  <div id="loader"></div>
  <!-- Theme Toggle Button will be injected by JS -->
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="nav-container">
      <div class="logo">
        <img src="webpot-logo-black.png" alt="Webpot Logo">
        <span>Webpot</span>
      </div>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#solutions">Solutions</a>
        <a href="#contact">Contact</a>
        <a href="orders.html" class="btn-nav" data-tooltip="View our pricing plans">Get Started</a>
      </nav>
      <button id="theme-toggle" aria-label="Toggle theme" class="theme-toggle-btn" data-tooltip="Toggle dark/light mode">
        🌙
      </button>
    </div>
  </header>
  <div class="nav-blur-overlay"></div>
  <div class="page-content">
    <!-- HERO -->
    <section class="hero reveal" id="home">
      <h1>Advanced Webpot Solutions</h1>
      <p>
        We design and deliver modern, high-performance websites
        tailored for businesses at reasonable prices.
      </p>

      <div class="hero-buttons">
        <a href="#solutions" class="btn-primary">View Solutions</a>
        <a href="#contact" class="btn-outline">Contact Us</a>
      </div>
    </section>



    <!-- ABOUT -->
      <section class="about reveal" id="about">
        <div class="about-wrapper">
          <div class="about-text">
            <h2>About Webpot</h2>
            <p>
              Webpot is a professional web design solution focused on building
              visually appealing, responsive, and performance-driven websites
              for businesses of all sizes.
            </p>
            <p>
              We believe premium websites should be accessible. Our goal is to
              provide modern designs, clean code, and scalable solutions at
              transparent and reasonable pricing for every client.
            </p>
          </div>

          <div class="about-highlight">
            <h3>Why Choose Webpot</h3>
            <ul>
              <li>✔ Modern & clean UI/UX</li>
              <li>✔ Affordable pricing</li>
              <li>✔ Fully responsive design</li>
              <li>✔ Long-term support</li>
            </ul>
          </div>
        </div>
      </section>
      <!-- PROCESS / INTEGRATION -->
      <section class="process reveal" id="process">
        <div class="process-container">

          <h2>Our Process</h2>
          <p class="section-subtitle">
            A simple, proven workflow that turns ideas into
            powerful digital experiences.
          </p>

          <div class="process-grid">

            <!-- Design -->
            <div class="process-box">
              <div class="process-icon">
                <i class="fas fa-palette"></i>
              </div>
              <h3>Design</h3>
              <p>
                We research, plan, and design user-focused
                interfaces that align perfectly with your brand.
              </p>
            </div>

            <!-- Create -->
            <div class="process-box">
              <div class="process-icon">
                <i class="fas fa-code"></i>
              </div>
              <h3>Create</h3>
              <p>
                We build scalable, high-performance solutions
                using clean code and modern technologies.
              </p>
            </div>

            <!-- Engage -->
            <div class="process-box">
              <div class="process-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>Engage</h3>
              <p>
                We launch, optimize, and help you engage
                users through impactful digital experiences.
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- WHAT WE PROVIDE -->
      <section class="services reveal" id="services">
        <div class="services-container">

          <h2>What We Provide 💼</h2>

          <p class="section-subtitle">
            We offer complete digital solutions — from modern websites
            to high-end Discord servers — built professionally on your behalf.
          </p>

          <div class="services-grid">

            <!-- Web Services -->
            <div class="service-card">
              <h3>Professional Web Services 🌐</h3>
              <p>
                We design and manage modern, high-performance websites
                tailored specifically for your business or personal brand.
              </p>
              <ul>
                <li>✔ Website design & development</li>
                <li>✔ Content creation & page management</li>
                <li>✔ Responsive & SEO-friendly layouts</li>
                <li>✔ Ongoing updates & maintenance</li>
                <li>✔ Built and managed on your behalf</li>
              </ul>
            </div>

            <!-- Discord Services -->
            <div class="service-card featured">
              <h3>Discord Server Creation 🎮</h3>
              <p>
                We create fully structured, secure, and scalable Discord servers
                — from zero to high-end — tailored exactly to your community needs.
              </p>
              <ul>
                <li>✔ Server setup from scratch</li>
                <li>✔ Roles, permissions & channels</li>
                <li>✔ Bots, automation & security</li>
                <li>✔ Community & business-ready setup</li>
                <li>✔ Growth-focused server architecture</li>
              </ul>
            </div>

          </div>

        </div>
      </section>


      <!-- PLANS OVERVIEW -->
      <section class="plans-overview reveal" id="solutions">
        <div class="plans-container">

          <h2>Choose the Right Plan for Your Business 💼</h2>
          <p class="section-subtitle">
            Flexible website solutions designed to match your business stage
            and growth goals.
          </p>

          <div class="plans-grid">

            <!-- STARTER -->
            <div class="plan-card">
              <h3>Starter 🚀</h3>
              <span class="plan-tag">Perfect for small business owners</span>

              <ul>
                <li>✔ Landing Page</li>
                <li>✔ Responsive Website (Desktop)</li>
                <li>✔ Basic SEO</li>
                <li>✔ Normal Support (12 hrs)</li>
                <li>✔ Delivery in 7 Days</li>
              </ul>
            </div>

            <!-- BASIC -->
            <div class="plan-card featured">
              <span class="badge">Most Popular ⭐</span>
              <h3>Basic 📈</h3>
              <span class="plan-tag">Best for growing businesses</span>

              <ul>
                <li>✔ Up to 5 Pages</li>
                <li>✔ Modern Responsive Design</li>
                <li>✔ Advanced SEO</li>
                <li>✔ Innovative Form Integration</li>
                <li>✔ Priority Support (18 hrs/day)</li>
                <li>✔ Delivery in 10 Days</li>
              </ul>
            </div>

            <!-- PREMIUM -->
            <div class="plan-card">
              <h3>Premium 👑</h3>
              <span class="plan-tag">For enterprise & large businesses</span>

              <ul>
                <li>✔ Pages as per Requirement</li>
                <li>✔ Custom Design & Animations</li>
                <li>✔ Full SEO Optimization</li>
                <li>✔ E-Commerce / Blog Integration</li>
                <li>✔ Dedicated Support (24/7)</li>
                <li>✔ Delivery in 15 Days</li>
              </ul>
            </div>
            <div class="plans-view-more">
              <a href="#pricing" class="btn-primary btn-view-more">
                View More Plans →
              </a>
            </div>

          </div>
        </div>
      </section>
      <!-- FAQ SECTION -->
      <section class="faq reveal" id="faq">
        <div class="faq-container">

          <h2>Frequently Asked Questions ❓</h2>
          <p class="section-subtitle">
            Clear answers to common questions before you get started.
          </p>

          <div class="faq-list">

            <!-- MOST POPULAR -->
            <div class="faq-item popular">
              <button class="faq-question">
                ⭐ How long does a website take?
                <span class="faq-toggle">+</span>
              </button>
              <div class="faq-answer">
                <p>
                  The delivery timeline depends on the selected plan.
                  Starter websites usually take 7 days, while advanced
                  or enterprise solutions may take up to 15 days.
                </p>
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                Do you provide hosting?
                <span class="faq-toggle">+</span>
              </button>
              <div class="faq-answer">
                <p>
                  We help you choose the best hosting provider and assist
                  with setup, but hosting costs are handled separately
                  based on your requirements.
                </p>
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                Can you redesign an existing website?
                <span class="faq-toggle">+</span>
              </button>
              <div class="faq-answer">
                <p>
                  Yes. We redesign and modernize existing websites with
                  improved UI/UX, performance, responsiveness, and SEO
                  while aligning with your business goals.
                </p>
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                Do you offer Discord moderation?
                <span class="faq-toggle">+</span>
              </button>
              <div class="faq-answer">
                <p>
                  Yes. We provide Discord server setup, roles, bots,
                  security configuration, and optional moderation
                  support depending on your needs.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      <section class="contact-section reveal" id="contact">
        <div class="contact-container">
          <h2>Contact Webpot</h2>
          <p class="section-subtitle">
            Get in touch with us for professional and affordable web solutions.
          </p>

          <div class="contact-grid">
            <div class="contact-card">
              <h4>Email 📧</h4>
              <p>info@webpot.co.in</p>
            </div>

            <div class="contact-card">
              <h4>Phone 📞</h4>
              <p>+91 9408191506</p>
            </div>

            <div class="contact-card">
              <h4>Location 📍</h4>
              <p>
                201, Aagan Residency,<br>
                Chanod Colony, Vapi
              </p>
            </div>
          </div>
          <div class="quick-form">
            <h3>Quick Form</h3>
            <p class="quick-form-subtitle">
              Share your requirement and we will get back to you shortly.
            </p>
            <form class="quick-form-grid" action="contact_form.php" method="post">
              <input type="text" name="name" placeholder="Your Name" required>
              <input type="email" name="email" placeholder="Your Email" required>
              <input type="tel" name="phone" placeholder="Phone Number" required>
              <input type="text" name="business" placeholder="Business / Brand">
              <textarea name="message" rows="4" placeholder="Tell us about your project"></textarea>
              <button type="submit" class="btn-primary">Send Request</button>
            </form>
            <p class="quick-form-note">
              Or email us directly at <a href="mailto:info@webpot.co.in">info@webpot.co.in</a>
            </p>
          </div>
        </div>
      </section>
      <!-- ADVANCED FOOTER -->
      <footer class="footer-dark">
        <div class="footer-dark-container">

          <!-- BRAND -->
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="webpot-logo-white.png" alt="Webpot Logo">
              <span>Webpot</span>
            </div>

            <p>
              Advanced web & digital solutions crafted to help
              businesses grow, engage, and scale online.
            </p>

            <div class="footer-socials">
              <a href="https://www.instagram.com/offical.webpot/" target="_blank" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/919408191506" target="_blank" aria-label="WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <!-- QUICK LINKS -->
          <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">› Home</a></li>
              <li><a href="#about">› About</a></li>
              <li><a href="#services">› Services</a></li>
              <li><a href="#solutions">› Solutions</a></li>
              <li><a href="#contact">› Contact</a></li>
            </ul>
          </div>

          <!-- SERVICES -->
          <div class="footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>› Web Development</li>
              <li>› Discord Server Setup</li>
              <li>› UI / UX Design</li>
              <li>› SEO Optimization</li>

            </ul>
          </div>

          <!-- CONTACT -->
          <div class="footer-contact">
            <h4>Contact Us</h4>

          <p>
    📍 
    <a 
      href="https://maps.app.goo.gl/1Te5pJnbPiemVQZW6"
      target="_blank"
      rel="noopener"
      class="footer-link"
    >
      Vapi, Gujarat, India
    </a>
  </p>

            <p>
              📞 <a href="tel:+919408191506">+91 9408191506</a>
            </p>

            <p>
              📧 <a href="mailto:info@webpot.co.in">
                info@webpot.co.in
              </a>
            </p>
          </div>

        </div>

        <!-- BOTTOM BAR -->
        <div class="footer-bottom-dark">
          <p>© 2026 Webpot. All rights reserved.</p>

          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>
      <!-- FLOATING ACTION BUTTON -->
      <div class="fab-container" id="fab-container">
        <button class="fab-toggle" id="fab-toggle" aria-label="Contact options">
          📞
        </button>
        <div class="fab-menu">
          <div class="fab-item">
            <span class="fab-label">Contact Us</span>
            <a href="#contact" class="fab-btn" title="Go to contact form">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
          <div class="fab-item">
            <span class="fab-label">Get Started</span>
            <a href="orders.html" class="fab-btn" title="View our plans">
              <i class="fas fa-rocket"></i>
            </a>
          </div>
          <div class="fab-item">
            <span class="fab-label">WhatsApp</span>
            <a href="https://wa.me/919999999999" class="fab-btn" target="_blank" title="Chat on WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
      <script src="script.js"></script>
  </div>
</body>

</html>

```

### `orders.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orders - Webpot</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</head>
<body class="orders-page">
  <div id="loader"></div>
  <!-- Theme Toggle Button will be injected by JS -->
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="nav-container">
      <div class="logo">
        <img src="webpot-logo-black.png" alt="Webpot Logo">
        <span>Webpot</span>
      </div>
      <nav>
        <a href="index.html#home">Home</a>
        <a href="index.html#about">About</a>
        <a href="index.html#services">Services</a>
        <a href="index.html#solutions">Solutions</a>
        <a href="index.html#contact">Contact</a>
      </nav>
      <button id="theme-toggle" aria-label="Toggle theme" class="theme-toggle-btn" data-tooltip="Toggle dark/light mode">
        🌙
      </button>
    </div>
  </header>
  <div class="nav-blur-overlay"></div>
  <div class="page-content">

  <!-- SOLUTIONS -->
  <section class="solutions reveal" id="solutions">
    <h2>Website Solutions & Pricing 💡</h2>

    <p class="section-subtitle">
      Choose a complete website solution designed to match your goals and budget.
    </p>

    <div class="solutions-grid">

      <div class="solution-card" data-plan="starter" data-price="4999">
        <h3>Starter Website 🚀</h3>
        <p class="solution-price">₹4,999</p>
        <ul>
          <li>✔ Single Page Website</li>
          <li>✔ Responsive Design</li>
          <li>✔ Clean Layout</li>
          <li>✔ Basic SEO</li>
          <li>✔ Email Support</li>
        </ul>
        <div class="card-actions">
          <a href="#" class="btn-glass">View Template</a>
        </div>
      </div>

      <div class="solution-card featured" data-plan="business" data-price="9999">
        <h3>Business Website 🏢</h3>
        <p class="solution-price">₹9,999</p>
        <ul>
          <li>✔ Up to 5 Pages</li>
          <li>✔ Custom UI/UX</li>
          <li>✔ Contact Forms</li>
          <li>✔ SEO Optimization</li>
          <li>✔ Priority Support</li>
        </ul>
        <div class="card-actions">
          <a href="#" class="btn-glass">View Template</a>
        </div>
      </div>

      <div class="solution-card" data-plan="premium" data-price="19999">
        <h3>Premium Web Solution 👑</h3>
        <p class="solution-price">₹19,999</p>
        <ul>
          <li>✔ Unlimited Pages</li>
          <li>✔ Advanced Animations</li>
          <li>✔ High Performance</li>
          <li>✔ Admin Dashboard</li>
          <li>✔ Lifetime Support</li>
        </ul>
        <div class="card-actions">
          <a href="#" class="btn-glass">View Template</a>
        </div>
      </div>

    </div>
    <div class="solutions-view-more">
      <a href="#order-form" class="btn-primary btn-view-more">
        View More ↓
      </a>
    </div>
  </section>
  <section class="order-form-section reveal" id="order-form">
    <div class="order-form-container">
      <h2>Quick Order Form</h2>
      <p class="section-subtitle">
        Share your requirement and we will reach you at the earliest.
      </p>
      <form class="quick-form-grid" action="order_form.php" method="post">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <input type="tel" name="phone" placeholder="Phone Number" required>
        <input type="text" name="company" placeholder="Business / Brand">
        <input type="text" name="plan" placeholder="Plan (Starter / Business / Premium)">
        <textarea name="message" rows="4" placeholder="Project details and timeline"></textarea>
        <button type="submit" class="btn-primary">Submit Order</button>
      </form>
      <p class="quick-form-note">
        Or email us directly at <a href="mailto:info@webpot.co.in">info@webpot.co.in</a>
      </p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer-dark">
    <div class="footer-dark-container">

      <!-- BRAND -->
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="webpot-logo-white.png" alt="Webpot Logo">
          <span>Webpot</span>
        </div>

        <p>
          Advanced web & digital solutions crafted to help
          businesses grow, engage, and scale online.
        </p>

        <div class="footer-socials">
          <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/919408191506" target="_blank" aria-label="WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a href="https://github.com/" target="_blank" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <!-- QUICK LINKS -->
      <div class="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html#home">› Home</a></li>
          <li><a href="index.html#about">› About</a></li>
          <li><a href="index.html#services">› Services</a></li>
          <li><a href="index.html#solutions">› Solutions</a></li>
          <li><a href="index.html#contact">› Contact</a></li>
        </ul>
      </div>

      <!-- SERVICES -->
      <div class="footer-links">
        <h4>Our Services</h4>
        <ul>
          <li> Web Development</li>
          <li> Discord Server Setup</li>
          <li> UI / UX Design</li>
          <li> SEO Optimization</li>
        </ul>
      </div>

      <!-- CONTACT -->
      <div class="footer-contact">
        <h4>Contact Us</h4>

        <p>
          📍 201, Aagan Residency,<br>
          Chanod Colony, Vapi
        </p>

        <p>
          📞 <a href="tel:+919408191506">+91 9408191506</a>
        </p>

        <p>
          📧 <a href="mailto:info@webpot.co.in">
            info@webpot.co.in
          </a>
        </p>
      </div>

    </div>

    <!-- BOTTOM BAR -->
    <div class="footer-bottom-dark">
      <p>&copy; 2026 Webpot. All rights reserved.</p>

      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
      </div>
    </div>
  </footer>
  <!-- FLOATING ACTION BUTTON -->
  <div class="fab-container" id="fab-container">
    <button class="fab-toggle" id="fab-toggle" aria-label="Contact options">
      📞
    </button>
    <div class="fab-menu">
      <div class="fab-item">
        <span class="fab-label">Contact Us</span>
        <a href="index.html#contact" class="fab-btn" title="Contact form">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
      <div class="fab-item">
        <span class="fab-label">Back Home</span>
        <a href="index.html" class="fab-btn" title="Back to home">
          <i class="fas fa-home"></i>
        </a>
      </div>
      <div class="fab-item">
        <span class="fab-label">WhatsApp</span>
        <a href="https://wa.me/919999999999" class="fab-btn" target="_blank" title="Chat on WhatsApp">
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  </div>
  </div> <!-- end page-content -->

  <script src="script.js"></script>
</body>
</html>

```

### `style.css`
```css
/* ================= CSS VARIABLES - THEME SYSTEM ================= */
:root {
  --bg-main: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #e2e8f0;

  --text-main: #0f172a;
  --text-muted: #475569;
  --text-light: #64748b;

  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-dark: #1e1b4b;
  --accent-light: #c7d2fe;

  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  --border-color: rgba(15, 23, 42, 0.1);
  --border-light: rgba(15, 23, 42, 0.08);

  --shadow-light: rgba(0, 0, 0, 0.06);
  --shadow-dark: rgba(0, 0, 0, 0.14);
  --shadow-glass: rgba(255, 255, 255, 0.25);
  --shadow-glass-dark: rgba(0, 0, 0, 0.15);

  --nav-height: 80px;
  --nav-bg: rgba(255, 255, 255, 0.1);
  --nav-bg-scrolled: rgba(255, 255, 255, 0.15);

  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

body.dark-mode {
  --bg-main: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;

  --text-main: #f1f5f9;
  --text-muted: #cbd5f5;
  --text-light: #94a3b8;

  --border-color: rgba(255, 255, 255, 0.12);
  --border-light: rgba(255, 255, 255, 0.08);

  --shadow-light: rgba(0, 0, 0, 0.35);
  --shadow-dark: rgba(0, 0, 0, 0.55);

  --nav-bg: rgba(15, 23, 42, 0.7);
  --nav-bg-scrolled: rgba(15, 23, 42, 0.9);
}

/* ================= RESET ================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

/* ================= BODY ================= */
body {
  font-family: 'Poppins', sans-serif;
  background: var(--bg-main);
  color: var(--text-main);
  overflow-x: hidden;
  padding-top: var(--nav-height);
  opacity: 0;
  animation: pageReveal 0.6s ease forwards;
  transition: background 0.4s ease, color 0.4s ease;
}

@keyframes pageReveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ================= SCROLLBAR ================= */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: 8px;
}

/* ================= NAVBAR (LOCKED & SAFE) ================= */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  z-index: 9999;

  background: var(--nav-bg);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border-color);

  display: flex;
  align-items: center;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar.scrolled {
  background: var(--nav-bg-scrolled);
  box-shadow: 0 6px 22px var(--shadow-light);
}

.nav-container {
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 42px;
}

.logo span {
  font-size: 1.2rem;
  font-weight: 600;
}

nav {
  display: flex;
  align-items: center;
  gap: 22px;
}

nav a {
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--accent-primary);
}

.btn-nav {
  padding: 8px 22px;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-dark));
  color: #fff;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.btn-nav:hover {
  transform: scale(1.05);
}

/* ================= THEME TOGGLE ================= */
.theme-toggle-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: linear-gradient(135deg, var(--accent-primary), var(--accent-dark));
  color: #fff;
  font-size: 1.1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.theme-toggle-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 18px var(--shadow-dark);
}

/* ================= HERO (CORRECT MATH) ================= */
.hero {
  min-height: calc(100vh - var(--nav-height));
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--bg-main),
    var(--bg-secondary),
    var(--bg-main)
  );
  background-size: 400% 400%;
  animation: gradientShift 16s ease infinite;
  z-index: 0;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero h1,
.hero p,
.hero-buttons {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 3rem;
}

.hero p {
  max-width: 650px;
  margin: 20px auto;
  color: var(--text-muted);
}

/* ================= BUTTONS ================= */
.btn-primary,
.btn-outline,
.btn-outline-light,
.btn-glass {
  padding: 13px 32px;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-dark));
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.btn-outline {
  border: 2px solid var(--accent-light);
  color: var(--accent-light);
  background: transparent;
}

.btn-outline:hover {
  background: var(--accent-light);
  color: #fff;
}

/* ================= SECTIONS ================= */
section {
  padding: 100px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ================= ABOUT SECTION ================= */
.about {
  background: var(--bg-secondary);
}

.about-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 24px;
  color: var(--text-main);
}

.about-text p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.about-highlight {
  background: var(--bg-main);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px var(--shadow-light);
}

.about-highlight h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--accent-primary);
}

.about-highlight ul {
  list-style: none;
}

.about-highlight li {
  padding: 12px 0;
  font-size: 1rem;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-light);
}

.about-highlight li:last-child {
  border-bottom: none;
}

/* ================= PROCESS SECTION ================= */
.process {
  background: var(--bg-main);
}

.process-container {
  max-width: 1200px;
  margin: 0 auto;
}

.process-container h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-main);
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.process-box {
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.process-box:hover {
  transform: translateY(-8px);
  border-color: var(--accent-primary);
  box-shadow: 0 15px 35px var(--shadow-dark);
}

.process-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.process-box h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: var(--text-main);
}

.process-box p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* ================= SERVICES SECTION ================= */
.services {
  background: var(--bg-secondary);
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

.services-container h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-main);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-top: 60px;
}

.service-card {
  background: var(--bg-main);
  border: 2px solid var(--border-light);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-dark));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px var(--shadow-dark);
  border-color: var(--accent-primary);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card.featured {
  border: 2px solid var(--accent-primary);
  background: linear-gradient(135deg, rgba(168, 178, 221, 0.1), rgba(0, 0, 0, 0.05));
}

.service-card h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: var(--text-main);
}

.service-card p {
  color: var(--text-muted);
  margin-bottom: 20px;
  line-height: 1.6;
}

.service-card ul {
  list-style: none;
}

.service-card li {
  padding: 8px 0;
  color: var(--text-main);
  font-size: 0.95rem;
}

/* ================= PLANS SECTION ================= */
.plans-overview {
  background: var(--bg-main);
}

.plans-container {
  max-width: 1200px;
  margin: 0 auto;
}

.plans-container h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-main);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
}

.plan-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 20px;
  padding: 35px;
  transition: all 0.3s ease;
  position: relative;
}

.plan-card.featured {
  border: 2px solid var(--accent-primary);
  transform: scale(1.05);
  box-shadow: 0 20px 50px var(--shadow-dark);
}

.plan-card:hover {
  transform: translateY(-8px);
}

.plan-card.featured:hover {
  transform: scale(1.05) translateY(-8px);
}

.badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-dark));
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.plan-card h3 {
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: var(--text-main);
}

.plan-tag {
  display: block;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.plan-card ul {
  list-style: none;
  margin-bottom: 24px;
}

.plan-card li {
  padding: 10px 0;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-light);
  font-size: 0.95rem;
}

.plan-card li:last-child {
  border-bottom: none;
}

.plans-view-more {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 20px;
}

.btn-view-more {
  padding: 14px 40px !important;
  font-size: 1rem;
}

/* ================= FAQ SECTION ================= */
.faq {
  background: var(--bg-secondary);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-container h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-main);
}

.faq-list {
  margin-top: 60px;
}

.faq-item {
  background: var(--bg-main);
  border: 2px solid var(--border-light);
  border-radius: 18px;
  margin-bottom: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.popular {
  border-color: var(--accent-primary);
  background: linear-gradient(135deg, rgba(168, 178, 221, 0.1), transparent);
}

.faq-question {
  width: 100%;
  padding: 22px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--text-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.faq-question:hover {
  color: var(--accent-primary);
}

.faq-toggle {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-toggle {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s ease;
}

.faq-item.active .faq-answer {
  max-height: 300px;
  opacity: 1;
  padding: 0 24px 20px;
}

.faq-answer p {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* ================= CONTACT SECTION ================= */
.contact-section {
  background: var(--bg-main);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-container h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-main);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 60px 0;
}

.contact-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent-primary);
  box-shadow: 0 15px 35px var(--shadow-dark);
}

.contact-card h4 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: var(--text-main);
}

.contact-card p {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

/* ================= QUICK FORM ================= */
.quick-form {
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 20px;
  padding: 50px 40px;
  margin-top: 60px;
}

.quick-form h3 {
  font-size: 1.6rem;
  margin-bottom: 8px;
  color: var(--text-main);
}

.quick-form-subtitle {
  color: var(--text-muted);
  margin-bottom: 30px;
  font-size: 0.95rem;
}

.quick-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.quick-form-grid input,
.quick-form-grid textarea {
  padding: 14px 18px;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.quick-form-grid input:focus,
.quick-form-grid textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(168, 178, 221, 0.1);
}

.quick-form-grid textarea {
  grid-column: 1 / -1;
  resize: vertical;
  min-height: 120px;
}

.quick-form-grid button {
  grid-column: 1 / -1;
}

.quick-form-note {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 20px;
}

.quick-form-note a {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.quick-form-note a:hover {
  text-decoration: underline;
}

/* ================= FOOTER ================= */
.footer-dark {
  background: linear-gradient(135deg, var(--accent-dark), var(--accent-primary));
  color: #fff;
  padding: 80px 20px 40px;
  margin-top: 80px;
  border-radius: 32px 32px 0 0;
}

.footer-dark-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 50px;
  margin-bottom: 40px;
}

.footer-brand h3,
.footer-links h4,
.footer-contact h4 {
  font-size: 1.1rem;
  margin-bottom: 16px;
  font-weight: 600;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 1.3rem;
  font-weight: 700;
}

.footer-logo img {
  height: 32px;
}

.footer-brand p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0.95;
}

.footer-socials {
  display: flex;
  gap: 14px;
}

.footer-socials a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
}

.footer-socials a:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-4px);
}

.footer-links ul,
.footer-contact {
  list-style: none;
}

.footer-links li,
.footer-contact p {
  padding: 6px 0;
  opacity: 0.95;
  font-size: 0.95rem;
  transition: opacity 0.3s ease;
}

.footer-links li:hover,
.footer-contact p:hover {
  opacity: 1;
}

.footer-links a,
.footer-contact a {
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-links a:hover,
.footer-contact a:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

.footer-bottom-dark {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-bottom-dark p {
  font-size: 0.9rem;
  opacity: 0.95;
}

.footer-bottom-links {
  display: flex;
  gap: 30px;
}

.footer-bottom-links a {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.footer-bottom-links a:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

/* ================= FLOATING ACTION BUTTON ================= */
.fab-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 5000;
}

.fab-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-dark));
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px var(--shadow-dark);
}

.fab-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px var(--shadow-dark);
}

.fab-menu {
  position: absolute;
  bottom: 80px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.fab-container.active .fab-menu {
  opacity: 1;
  visibility: visible;
}

.fab-item {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.fab-label {
  background: var(--bg-main);
  color: var(--text-main);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 12px var(--shadow-dark);
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.fab-container.active .fab-label {
  opacity: 1;
  transform: translateX(0);
}

.fab-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-dark));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-dark);
}

.fab-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 16px var(--shadow-dark);
}

/* ================= CARDS ================= */
.service-card,
.solution-card,
.plan-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.3s ease;
}

.service-card:hover,
.solution-card:hover,
.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 40px var(--shadow-dark);
}

/* ================= REVEAL ================= */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* ================= RESPONSIVE DESIGN ================= */
@media (max-width: 900px) {
  section {
    padding: 80px 20px;
  }

  .about-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .plan-card.featured {
    transform: scale(1);
  }

  .plan-card.featured:hover {
    transform: translateY(-8px);
  }

  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-dark-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .footer-bottom-dark {
    flex-direction: column;
    text-align: center;
  }

  nav {
    gap: 14px;
  }

  .hero h1 {
    font-size: 2.2rem;
  }

  .about-text h2,
  .services-container h2,
  .plans-container h2,
  .contact-container h2 {
    font-size: 2rem;
  }
}

@media (max-width: 700px) {
  section {
    padding: 60px 15px;
  }

  .hero {
    min-height: calc(100vh - var(--nav-height));
    padding: 40px 15px;
  }

  .process-grid {
    grid-template-columns: 1fr;
  }

  .quick-form-grid {
    grid-template-columns: 1fr;
  }

  .fab-container {
    bottom: 20px;
    right: 20px;
  }

  .fab-toggle {
    width: 54px;
    height: 54px;
    font-size: 1.3rem;
  }

  .fab-btn {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 600px) {
  nav {
    gap: 10px;
    flex-wrap: wrap;
  }

  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: 0.95rem;
  }

  .about-text h2,
  .services-container h2,
  .plans-container h2,
  .contact-container h2,
  .faq-container h2 {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .process-box,
  .service-card,
  .plan-card,
  .contact-card,
  .quick-form {
    padding: 25px 20px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }

  .footer-dark-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom-links {
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-outline,
  .btn-outline-light,
  .btn-glass {
    padding: 11px 24px;
    font-size: 0.95rem;
  }

  .quick-form-grid input,
  .quick-form-grid textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .hero-buttons a {
    width: 100%;
    text-align: center;
  }
}

```

### `style_backup.css`
```css
/* ================= GLOBAL RESET ================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* ===============================
   PAGE LOAD FADE-IN
   =============================== */

body {
  animation: pageReveal 0.8s ease forwards;
}

@keyframes pageReveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* ================= ROOT & BODY ================= */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #ffffff;
  color: #0f172a;

  /* 🔥 IMPORTANT: THIS ENABLES SCROLL */
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: var(--nav-height);
  transition: background 0.4s, color 0.4s;
  opacity: 0;
  animation: pageReveal 0.8s ease forwards;
}

/* --- ADVANCED FRONTEND FEATURES (2026 UPGRADE) --- */
html {
  scroll-behavior: smooth;
}

body {
  background: #fff;
  color: #0f172a;
  transition: background 0.4s, color 0.4s;
}

.dark-mode {
  background: #0f172a;
  color: #f1f5f9;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  background: #e0e7ef;
}
::-webkit-scrollbar-thumb {
  background: #a8b2dd;
  border-radius: 8px;
}

/* Page fade-in */
body {
  animation: pageReveal 0.8s ease forwards;
  opacity: 0;
}

@keyframes pageReveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

.navbar {
  transition: transform 0.3s;
}
.navbar.hide {
  transform: translateY(-100%);
}
.navbar.shrink {
  padding: 4px 0;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.quick-form-grid input:focus,
.quick-form-grid textarea:focus {
  border: 1.5px solid #a8b2dd;
  box-shadow: 0 0 0 2px #a8b2dd33;
}

.btn-primary:active {
  transform: scale(0.97);
}
.btn-primary:hover {
  background: linear-gradient(135deg, #000, #a8b2dd);
}

.solution-card:hover, .plan-card:hover, .service-card:hover {
  box-shadow: 0 8px 32px #a8b2dd33;
  transform: translateY(-6px) scale(1.04) rotateY(4deg);
}

.faq-item {
  will-change: transform;
}
.faq-question {
  transition: color 0.2s;
}

/* Loader Bar */
#loader {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, #a8b2dd, #000, #a8b2dd);
  z-index: 9999;
  animation: loaderBar 1.2s linear infinite;
  display: none;
}
@keyframes loaderBar {
  0% { background-position: 0 0; }
  100% { background-position: 200% 0; }
}

/* ================= NAVBAR ================= */
.navbar {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.10);
  transition: background 0.3s, box-shadow 0.3s;
}

.navbar.scrolled {
  background: rgba(255,255,255,0.65);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.04);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.nav-container {
  max-width: 1200px;
  margin: auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  width: 42px;
  height: auto;
}

.logo span {
  font-weight: 600;
  font-size: 1.2rem;
}

nav a {
  margin-left: 25px;
  text-decoration: none;
  color: #020617;
  font-weight: 500;
}

.btn-nav {
  padding: 8px 20px;
  border-radius: 30px;
  background: linear-gradient(135deg, #a8b2dd, #000);
  color: #fff;
}
/* ===============================
   BACK TO WEBPOT LINK
   =============================== */
.back-to-webpot {
  margin-right: 28px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #000;
  opacity: 0.7;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.back-to-webpot:hover {
  opacity: 1;
  transform: translateX(-4px);
}


/* ================= HERO ================= */
.hero {
  min-height: 100vh; /* 🔥 NOT height */
  padding: 40px 20px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.hero h1 {
  font-size: 3.2rem;
}

.hero p {
  max-width: 650px;
  margin: 20px auto;
  color: #475569;
}

.hero-buttons {
  margin-top: 20px;
}

/* ================= BUTTONS ================= */
.btn-primary,
.btn-outline,
.btn-outline-light {
  padding: 13px 32px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #a8b2dd, #000);
  color: white;
}

.btn-outline {
  border: 2px solid #1e3a8a;
  color: #1e3a8a;
}

.btn-outline-light {
  border: 2px solid white;
  color: white;
}
/* ===============================
   VIEW MORE PLANS BUTTON
   =============================== */
.plans-view-more {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  grid-column: 1 / -1;
}

.btn-view-more {
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-view-more:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(168, 178, 221, 0.6);
}
/* ===============================
   VIEW MORE (ORDERS)
   =============================== */
.solutions-view-more {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / -1;
}

/* ================= SECTIONS ================= */
section {
  padding: 100px 20px;
}

/* ================= ABOUT ================= */
.about-wrapper {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 50px;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.about-text p {
  margin-bottom: 15px;
  line-height: 1.7;
  color: #475569;
}

.about-highlight {
  background: linear-gradient(135deg, #a8b2dd, #020617);
  color: white;
  padding: 40px;
  border-radius: 28px;
}

/* ================= SOLUTIONS ================= */
.solutions {
  text-align: center;
}

.section-subtitle {
  max-width: 600px;
  margin: 0 auto 60px;
  color: #475569;
}

.solutions-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.solution-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease;
}

.solution-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 40px rgba(15, 23, 42, 0.15);
}

.solution-card.featured {
  background: linear-gradient(135deg, #a8b2dd, #020617);
  color: white;
}

.solution-price {
  font-size: 2.2rem;
  margin: 15px 0;
}

.solution-card ul {
  list-style: none;
  text-align: left;
}

.solution-card li {
  margin-bottom: 10px;
  color: #475569;
}

.solution-card.featured li {
  color: #e5e7eb;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}
/* ================= PLANS OVERVIEW ================= */
.plans-overview {
  background: #ffffff;
  text-align: center;
}

.plans-container {
  max-width: 1200px;
  margin: auto;
}

.plans-grid {
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

/* PLAN CARD */
.plan-card {
  background: #ffffff;
  border-radius: 26px;
  padding: 45px 35px;
  border: 1px solid #e2e8f0;
  text-align: left;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 40px rgba(15, 23, 42, 0.12);
}

.plan-card h3 {
  font-size: 1.6rem;
  margin-bottom: 6px;
}

.plan-tag {
  display: block;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 25px;
}

/* LIST */
.plan-card ul {
  list-style: none;
  margin-bottom: 30px;
}

.plan-card li {
  margin-bottom: 12px;
  color: #334155;
}

/* ACTIONS */
.plan-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* GLASS BUTTON (reuse-friendly) */
.btn-glass {
  padding: 11px 26px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  color: #020617;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(15, 23, 42, 0.15);
  transition: all 0.3s ease;
}

.btn-glass:hover {
  background: rgba(168, 178, 221, 0.85);
  color: #ffffff;
}

/* PRIMARY ACTION */
.btn-glass.primary {
  background: rgba(30, 58, 138, 0.15);
}

/* FEATURED PLAN */
.plan-card.featured {
  background: linear-gradient(135deg, #a8b2dd, #020617);
  color: #ffffff;
  border: none;
}

.plan-card.featured li,
.plan-card.featured .plan-tag {
  color: #e5e7eb;
}

.plan-card.featured .btn-glass {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.25);
}

.plan-card.featured .btn-glass:hover {
  background: #1e3a8a;
}

/* BADGE */
.badge {
  position: absolute;
  top: -14px;
  right: 20px;
  background: #1e3a8a;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .plan-actions {
    flex-direction: column;
  }
}

/* ================= GLASS BUTTONS (SOLUTIONS) ================= */
.btn-glass {
  padding: 5px 10px;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 500;
  color: #020617;

  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid rgba(15, 23, 42, 0.15);

  transition: all 0.3s ease;
  display: inline-block;
}

/* Hover: dark blue glass */
.btn-glass:hover {
  background: rgba(30, 58, 138, 0.85);
  color: #ffffff;
  border-color: rgba(30, 58, 138, 0.85);
  transform: translateY(-2px);
}

/* ================= SERVICE BOXES ================= */
.service-boxes {
  max-width: 1200px;
  margin: 80px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-box {
  background: #ffffff;
  border-radius: 22px;
  padding: 45px 35px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 40px rgba(15, 23, 42, 0.12);
}

/* Icon box */
.service-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 25px;
  border-radius: 16px;
  background: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

/* Title */
.service-box h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #020617;
}

/* Description */
.service-box p {
  color: #475569;
  line-height: 1.7;
  margin-bottom: 25px;
}

/* Read more link */
.service-link {
  color: #0ea5e9;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.service-link:hover {
  transform: translateX(6px);
}
/* ================= PROCESS SECTION ================= */
.process {
  background: #ffffff;
  text-align: center;
}

.process-container {
  max-width: 1200px;
  margin: auto;
}

.process-grid {
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.process-box {
  background: #ffffff;
  border-radius: 22px;
  padding: 45px 35px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.process-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 40px rgba(15, 23, 42, 0.12);
}

/* Icon */
.process-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 25px;
  border-radius: 16px;
  background: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

/* Text */
.process-box h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #020617;
}

.process-box p {
  color: #475569;
  line-height: 1.7;
}

/* ================= FAQ (ANIMATED) ================= */
.faq {
  background: #ffffff;
  text-align: center;
}

.faq-container {
  max-width: 900px;
  margin: auto;
}

.faq-list {
  margin-top: 60px;
  text-align: left;
}

/* FAQ ITEM */
.faq-item {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  margin-bottom: 18px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-2px);
}

/* MOST POPULAR */
.faq-item.popular {
  border: 2px solid #1e3a8a;
  box-shadow: 0 15px 30px rgba(30, 58, 138, 0.2);
}

/* QUESTION BUTTON */
.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 22px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #020617;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

/* TOGGLE ICON */
.faq-toggle {
  font-size: 1.6rem;
  color: #1e3a8a;
  transition: transform 0.3s ease;
}

/* ANSWER (ANIMATED) */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  opacity: 0;
  padding: 0 24px;
}

.faq-answer p {
  padding-bottom: 22px;
  color: #475569;
  line-height: 1.7;
}

/* ACTIVE STATE */
.faq-item.active .faq-answer {
  max-height: 300px;
  opacity: 1;
}

.faq-item.active .faq-toggle {
  transform: rotate(45deg); /* + becomes × */
}



/* ================= SCROLL ANIMATION ================= */
.reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* ================= RESPONSIVE ================= */
@media (max-width: 900px) {
  .about-wrapper {
    grid-template-columns: 1fr;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: #ffffff;
  color: #0f172a;
  overflow-x: hidden;
}

/* ---------------- NAVBAR ---------------- */
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.nav-container {
  max-width: 1200px;
  margin: auto;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* ================= WHAT WE PROVIDE ================= */
.services {
  text-align: center;
  background: #ffffff;
}

.services-container {
  max-width: 1200px;
  margin: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.service-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  padding: 45px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 40px rgba(15, 23, 42, 0.12);
}

.service-card h3 {
  font-size: 1.6rem;
  margin-bottom: 15px;
}

.service-card p {
  color: #475569;
  margin-bottom: 25px;
  line-height: 1.7;
}

.service-card ul {
  list-style: none;
}

.service-card li {
  margin-bottom: 12px;
  color: #334155;
}

/* Featured (Discord) Card */
.service-card.featured {
  background: linear-gradient(135deg, #a8b2dd, #020617);
  color: white;
}

.service-card.featured p,
.service-card.featured li {
  color: #e5e7eb;
}

/* CONTACT SECTION */
.contact-section {
  background: #f8fafc;
  text-align: center;
}

.contact-container {
  max-width: 1200px;
  margin: auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.contact-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}
/* ================= QUICK FORM ================= */
.quick-form,
.order-form-section {
  margin-top: 50px;
  text-align: center;
}

.order-form-container {
  max-width: 1000px;
  margin: 0 auto;
}

.quick-form-subtitle {
  max-width: 640px;
  margin: 10px auto 25px;
  color: #475569;
}

.quick-form-grid {
  max-width: 860px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.quick-form-grid input,
.quick-form-grid textarea {
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  resize: vertical;
}

.quick-form-grid textarea,
.quick-form-grid button {
  grid-column: 1 / -1;
}

.quick-form-grid button {
  justify-self: center;
}

.quick-form-note {
  margin-top: 14px;
  color: #64748b;
}

.quick-form-note a {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 600;
}

.quick-form-note a:hover {
  text-decoration: underline;
}

/* ---------------- HERO ---------------- */
.hero {
  height: 100vh;
  text-align: center;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}



/* ================= DARK PROFESSIONAL FOOTER ================= */
.footer-dark {
  background: linear-gradient(135deg, #a8b2dd, #0f172a);
  color: #e5e7eb;
  padding: 90px 20px 0;
}

.footer-dark-container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  gap: 60px;
}

/* BRAND */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.footer-logo img {
  width: 42px;
}

.footer-logo span {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
}

.footer-brand p {
  color: #cbd5f5;
  line-height: 1.7;
  max-width: 360px;
}

/* SOCIALS */
.footer-socials {
  display: flex;
  gap: 14px;
  margin-top: 22px;
}

.footer-socials a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-socials a:hover {
  background: #1e3a8a;
  transform: translateY(-4px);
}

/* LINKS */
.footer-links h4,
.footer-contact h4 {
  font-size: 1.1rem;
  margin-bottom: 18px;
  color: #ffffff;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 14px;
}

.footer-links a {
  text-decoration: none;
  color: #cbd5f5;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
  transform: translateX(4px);
}

/* CONTACT */
.footer-contact p {
  color: #cbd5f5;
  margin-bottom: 14px;
  line-height: 1.6;
}

.footer-contact a {
  color: #cbd5f5;
  text-decoration: none;
}

.footer-contact a:hover {
  color: #ffffff;
}

/* BOTTOM BAR */
.footer-bottom-dark {
  margin-top: 70px;
  padding: 25px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.footer-bottom-dark p {
  color: #94a3b8;
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: 25px;
}

.footer-bottom-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-bottom-links a:hover {
  color: #ffffff;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .footer-dark-container {
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  .footer-bottom-dark {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 600px) {
  .footer-dark-container {
    grid-template-columns: 1fr;
  }
}

/* ================= NAV RESPONSIVE ================= */
nav {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

nav a {
  margin-left: 0;
}

@media (max-width: 900px) {
  .nav-container {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 700px) {
  .hero {
    padding-top: 150px;
  }
}

/* ================= ORDERS SCROLL ================= */
.orders-page .solutions-grid {
  gap: 24px;
}

@media (max-width: 900px) {
  .orders-page .solutions-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    padding-bottom: 10px;
  }

  .orders-page .solution-card {
    min-width: 260px;
    scroll-snap-align: start;
  }
}

/* ================= THEME TOGGLE BUTTON ================= */
.theme-toggle-btn {
  margin-left: 24px;
  padding: 8px 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a8b2dd 60%, #000 100%);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px #a8b2dd22;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  outline: none;
  border: 2px solid #a8b2dd;
}
.theme-toggle-btn:active {
  background: #e0e7ef;
  color: #0f172a;
  transform: scale(0.96);
}
.theme-toggle-btn.dark {
  background: linear-gradient(135deg, #000 60%, #a8b2dd 100%);
  color: #fff;
  border: 2px solid #000;
}
.theme-toggle-btn:hover {
  box-shadow: 0 4px 16px #a8b2dd44;
  transform: scale(1.07);
}

:root {
  --nav-height: 80px;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #fff;
  color: #0f172a;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: var(--nav-height);
  transition: background 0.4s, color 0.4s;
  opacity: 0;
  animation: pageReveal 0.8s ease forwards;
}

.dark-mode {
  background: #0f172a;
  color: #f1f5f9;
}

.navbar {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.10);
  transition: background 0.3s, box-shadow 0.3s;
}
body.dark-mode .navbar {
  background: rgba(15, 23, 42, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.nav-blur-overlay {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  width: 100%;
  height: 30px;
  z-index: 9998;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  pointer-events: none;
}

.page-content {
  position: relative;
  z-index: 1;
}

.hero {
  min-height: 100vh;
  padding: 40px 20px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

@keyframes pageReveal {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}





```

### `script.js`
```javascript
// ================= LOADER =================
const loader = document.createElement('div');
loader.id = 'loader';
document.body.prepend(loader);

window.addEventListener('DOMContentLoaded', () => {
  loader.style.display = 'block';
  setTimeout(() => loader.style.display = 'none', 900);

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});

// ================= THEME TOGGLE =================
const themeBtn = document.getElementById('theme-toggle');

function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

setTheme(localStorage.getItem('theme') === 'dark');

themeBtn?.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
});

// ================= REVEAL ON SCROLL =================
const revealObs = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll('.reveal, .solution-card, .plan-card, .service-card')
  .forEach(el => revealObs.observe(el));

// ================= 3D CARD HOVER =================
document
  .querySelectorAll('.solution-card, .plan-card, .service-card')
  .forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

// ================= FAQ =================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(f => {
      if (f !== item) f.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// ================= ICON HOVER =================
document.querySelectorAll('.footer-socials i').forEach(icon => {
  icon.addEventListener('mouseenter', () => icon.classList.add('fa-bounce'));
  icon.addEventListener('mouseleave', () => icon.classList.remove('fa-bounce'));
});

// ================= COUNTERS =================
document.querySelectorAll('.counter').forEach(el => {
  const target = +el.dataset.target;
  let curr = 0;
  const step = Math.ceil(target / 60);

  const update = () => {
    curr += step;
    if (curr >= target) {
      el.textContent = target;
    } else {
      el.textContent = curr;
      requestAnimationFrame(update);
    }
  };

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      update();
    }
  }).observe(el);
});

// ================= FAB =================
const fabContainer = document.getElementById('fab-container');
const fabToggle = document.getElementById('fab-toggle');

let fabOpen = false;

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) fabContainer?.classList.add('visible');
  else fabContainer?.classList.remove('visible');
});

fabToggle?.addEventListener('click', () => {
  fabOpen = !fabOpen;
  fabToggle.classList.toggle('open', fabOpen);
});

```

### `config.php`
```php
<?php
declare(strict_types=1);

/**
 * Production-safe PDO configuration for Webpot (Hostinger shared hosting).
 *
 * - Set your DB credentials in the constants below.
 * - This file must not output anything (no HTML, no sensitive errors).
 */

// ===== Database credentials (edit these) =====
const DB_HOST = 'localhost';
const DB_NAME = 'u122854996_webpot_db';
const DB_USER = 'YOUR_DB_USERNAME';
const DB_PASS = 'YOUR_DB_PASSWORD';

/**
 * Get a shared PDO instance.
 *
 * - Uses utf8mb4
 * - Enables exceptions
 * - Disables emulated prepares (better type handling + security)
 */
function get_pdo(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (Throwable $e) {
        // Log details server-side; never echo sensitive errors to the client.
        error_log('[webpot] DB connect failed: ' . $e->getMessage());
        throw new RuntimeException('Database connection failed.');
    }
}

/**
 * Send a JSON response and exit.
 */
function send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');

    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

```

### `contact_form.php`
```php
<?php
// Backward-compatible entrypoint for existing HTML forms.
// Proxies to the new JSON API endpoint.
require_once __DIR__ . '/api/submit_contact.php';

```

### `order_form.php`
```php
<?php
// Backward-compatible entrypoint for existing HTML forms.
// Proxies to the new JSON API endpoint.
require_once __DIR__ . '/api/submit_order.php';

```

### `api/submit_contact.php`
```php
<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';

// Only allow POST requests.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    send_json(405, ['success' => false, 'error' => 'Method not allowed.']);
}

/**
 * Accept both form-encoded POSTs and JSON POSTs.
 */
$data = $_POST;
if (!is_array($data) || $data === []) {
    $contentType = (string)($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '');
    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?? '', true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$business = trim((string)($data['business'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

// Validate required fields.
if ($name === '' || $email === '' || $phone === '') {
    send_json(400, ['success' => false, 'error' => 'Missing required fields: name, email, phone.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(400, ['success' => false, 'error' => 'Invalid email address.']);
}

// Optional fields: store NULL when empty.
$businessOrNull = ($business === '') ? null : $business;
$messageOrNull = ($message === '') ? null : $message;

try {
    $pdo = get_pdo();

    // Do NOT change schema; insert only into existing columns.
    $sql = 'INSERT INTO contact_submissions (name, email, phone, business, message)
            VALUES (:name, :email, :phone, :business, :message)';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':business' => $businessOrNull,
        ':message' => $messageOrNull,
    ]);

    send_json(200, ['success' => true]);
} catch (Throwable $e) {
    // Log details, return a generic error to the client.
    error_log('[webpot] submit_contact failed: ' . $e->getMessage());
    send_json(500, ['success' => false, 'error' => 'Server error. Please try again later.']);
}


```

### `api/submit_order.php`
```php
<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';

// Only allow POST requests.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    send_json(405, ['success' => false, 'error' => 'Method not allowed.']);
}

/**
 * Accept both form-encoded POSTs and JSON POSTs.
 */
$data = $_POST;
if (!is_array($data) || $data === []) {
    $contentType = (string)($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '');
    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?? '', true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$plan = trim((string)($data['plan'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

// Validate required fields.
if ($name === '' || $email === '' || $phone === '') {
    send_json(400, ['success' => false, 'error' => 'Missing required fields: name, email, phone.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(400, ['success' => false, 'error' => 'Invalid email address.']);
}

// Optional fields: store NULL when empty.
$companyOrNull = ($company === '') ? null : $company;
$planOrNull = ($plan === '') ? null : $plan;
$messageOrNull = ($message === '') ? null : $message;

try {
    $pdo = get_pdo();

    // Do NOT change schema; insert only into existing columns.
    $sql = 'INSERT INTO order_submissions (name, email, phone, company, plan, message)
            VALUES (:name, :email, :phone, :company, :plan, :message)';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':company' => $companyOrNull,
        ':plan' => $planOrNull,
        ':message' => $messageOrNull,
    ]);

    send_json(200, ['success' => true]);
} catch (Throwable $e) {
    // Log details, return a generic error to the client.
    error_log('[webpot] submit_order failed: ' . $e->getMessage());
    send_json(500, ['success' => false, 'error' => 'Server error. Please try again later.']);
}


```

### `webpot- dashboard/user dashboard/index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpot Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="" />
</head>

<body>

    <!-- GLASS NAVBAR -->
    <nav class="dashboard-navbar">
        <div class="nav-left">
            <img src="webpot-logo-black.png" alt="Webpot Logo" class="logo" />
            <span>Webpot</span>
        </div>

        <div class="nav-links">
            <a class="active">Dashboard</a>
            <a href="orders.html">Orders</a>
            <a href="settings.html">Settings</a>
            <a href="../index.html" class="back-to-webpot">
  ← Back to Webpot
</a>

        </div>
    </nav>

    <!-- MAIN -->
    <main class="dashboard-container">

        <!-- STATS -->
        <section class="stats-grid">
            <div class="stat-card" data-stat="total-orders">
                <h4>Total Orders</h4>
                <!-- PHP: {{ total_orders }} -->
                <p>5</p>
            </div>
            <div class="stat-card" data-stat="total-spends">
                <h4>Total Spends</h4>
                <!-- PHP: {{ total_spends }} -->
                <p>₹24,999</p>
            </div>
            <div class="stat-card" data-stat="total-referrals">
                <h4>Referrals</h4>
                <!-- PHP: {{ total_referrals }} -->
                <p>2</p>
            </div>
        </section>

        <!-- PROFILE -->
        <section class="profile-card">
            <h3>User Profile</h3>
            <div class="profile-grid">
                <div data-field="user-name"><strong>Name:</strong> <!-- PHP: {{ user_name }} --> Suprince Kakadiya </div>
                <div data-field="user-email"><strong>Email:</strong> <!-- PHP: {{ user_email }} --> Kakadiyasuprince@gmail.com</div>
                <div data-field="user-phone"><strong>Phone:</strong> <!-- PHP: {{ user_phone }} --> +91 9408191506</div>
                <div data-field="referral-code">
                    <strong>Referral Code:</strong>
                    <!-- PHP: {{ referral_code }} -->
                    <span class="ref-code">WEBPOT123</span>
                </div>
            </div>
        </section>

        <!-- ORDERS -->
        <section class="orders-card">
            <h3>Your Orders</h3>

            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Service</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr data-order-id="WP001" data-order-status="pending">
                        <td>#WP001</td>
                        <td>Starter Website</td>
                        <td>
                            <span class="status-badge pending">Pending</span>
                        </td>

                    </tr>

                    <tr data-order-id="WP002" data-order-status="processing">
                        <td>#WP002</td>
                        <td>Business Website</td>
                        <td><span class="status-badge processing">Processing</span></td>
                    </tr>
                </tbody>
            </table>
        </section>
        <!-- INVOICE & PAYMENTS -->
        <section class="dashboard-card">
            <h3>Invoices & Payments 💳</h3>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Service</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice</th>
                    </tr>
                </thead>

                <tbody>
                    <tr data-invoice-id="INV-001" data-invoice-status="paid">
                        <td>#INV-001</td>
                        <td>Starter Website</td>
                        <td>₹4,999</td>
                        <td><span class="pay-badge paid">Paid</span></td>
                        <td>
                            <a href="invoices/inv-001.pdf" class="btn-link">Download</a>
                        </td>
                    </tr>

                    <tr data-invoice-id="INV-002" data-invoice-status="due">
                        <td>#INV-002</td>
                        <td>Business Website</td>
                        <td>₹9,999</td>
                        <td><span class="pay-badge due">Due</span></td>
                        <td>
                            <a href="#" class="btn-link disabled">Pending</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <!-- ACCOUNT SECURITY -->
        
    </main>
    <!-- FOOTER (SAME AS MAIN PAGE) -->
    <footer class="footer-dark">
        <div class="footer-dark-container">

            <!-- BRAND -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="webpot-logo-black.png" alt="Webpot Logo">
                    <span>Webpot</span>
                </div>

                <p>
                    Advanced web & digital solutions crafted to help
                    businesses grow, engage, and scale online.
                </p>

                <div class="footer-socials">
                    <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://wa.me/919408191506" target="_blank" aria-label="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://github.com/" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <!-- QUICK LINKS -->
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../index.html#services">Services</a></li>
                    <li><a href="../index.html#solutions">Solutions</a></li>
                    <li><a href="../index.html#contact">Contact</a></li>
                </ul>
            </div>

            <!-- LEGAL -->
            <div class="footer-links">
                <h4>Legal</h4>
                <ul>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                </ul>
            </div>

            <!-- CONTACT -->
            <div class="footer-contact">
                <h4>Contact</h4>
                <form class="quick-form-grid" action="#" method="post" style="margin-bottom: 18px;">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <input type="tel" name="phone" placeholder="Phone Number" required>
                    <textarea name="message" rows="3" placeholder="Your message"></textarea>
                    <button type="submit" class="btn-primary">Send</button>
                </form>
                <p>
                    📞 <a href="tel:+919408191506">+91 9408191506</a>
                </p>
                <p>
                    📧 <a href="mailto:engagewebpot@gmail.com"> engagewebpot@gmail.com</a>
                </p>
                <p>📍 Vapi, Gujarat, India</p>
            </div>

        </div>

        <div class="footer-bottom-dark">
            <p>© 2026 Webpot. All rights reserved.</p>
        </div>
    </footer>


    <script src="script.js"></script>
</body>

</html>
```

### `webpot- dashboard/user dashboard/orders.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Orders | Webpot</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <nav class="navbar">
        <div class="nav-left">
            <img src="webpot-logo-black.png" alt="Webpot Logo" class="logo">
            <span>Webpot</span>
        </div>

        <div class="nav-right">
            <a href="index.html" class="nav-link">Dashboard</a>
            <a class="nav-link active">Orders</a>
            <a href="settings.html" class="nav-link">Settings</a>
            <a href="../index.html" class="back-link">← Back to Webpot</a>
        </div>
    </nav>
    <!-- MAIN -->
    <main class="main-content">

        <!-- HEADER -->
        <!-- ORDERS HEADER -->
        <section class="orders-header-glass">
            <div class="orders-header-top">
                <h1>Orders Management</h1>

                <a href="index.html" class="back-dashboard-btn">
                    ← Back to Dashboard
                </a>
            </div>

            <div class="orders-header-controls">
                <!-- FILTER -->
                <div class="control-group">
                    <label for="orderFilter">Filter by Status:</label>
                    <select id="orderFilter" class="order-filter">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <!-- SEARCH -->
                <div class="control-group">
                    <label for="orderSearch">Search:</label>
                    <input type="text" id="orderSearch" class="order-search"
                        placeholder="Search by order ID or service..." />
                </div>
            </div>
        </section>


        <!-- ORDERS TABLE -->
        <section class="table-wrapper">
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Service</th>
                        <th>Order Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Delivery</th>
                    </tr>
                </thead>

                <tbody>
                    <tr data-order-id="WP001" data-order-status="pending" data-order-amount="12000">
                        <td>#WP001</td>
                        <td>Starter Website</td>
                        <td>12 Aug 2026</td>
                        <td>₹12,000</td>
                        <td>
                            <span class="status-badge pending">Pending</span>
                        </td>
                        <td>7 Days</td>
                    </tr>

                    <tr data-order-id="WP002" data-order-status="processing" data-order-amount="18000">
                        <td>#WP002</td>
                        <td>Business Website</td>
                        <td>18 Aug 2026</td>
                        <td>₹18,000</td>
                        <td>
                            <span class="status-badge processing">Processing</span>
                        </td>
                        <td>10 Days</td>
                    </tr>

                    <tr data-order-id="WP003" data-order-status="delivered" data-order-amount="25000">
                        <td>#WP003</td>
                        <td>Premium Website</td>
                        <td>01 Sep 2026</td>
                        <td>₹25,000</td>
                        <td>
                            <span class="status-badge delivered">Delivered</span>
                        </td>
                        <td>Completed</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </main>
    <!-- ORDER SUMMARY STATS -->
    <section class="orders-summary">
        <div class="summary-box" data-summary="total-orders">
            <span>Total Orders</span>
            <strong id="sumTotal">0</strong>
        </div>

        <div class="summary-box pending" data-summary="pending-orders">
            <span>Pending</span>
            <strong id="sumPending">0</strong>
        </div>

        <div class="summary-box processing" data-summary="processing-orders">
            <span>Processing</span>
            <strong id="sumProcessing">0</strong>
        </div>

        <div class="summary-box delivered" data-summary="delivered-orders">
            <span>Delivered</span>
            <strong id="sumDelivered">0</strong>
        </div>

        <div class="summary-box revenue" data-summary="total-revenue">
            <span>Total Invested</span>
            <strong id="sumRevenue">₹0</strong>
        </div>
    </section>


    <!-- FOOTER (SAME AS MAIN SITE) -->
    <footer class="footer-dark">
        <div class="footer-dark-container">

            <!-- BRAND -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="webpot-logo-black.png" alt="Webpot Logo">
                    <span>Webpot</span>
                </div>

                <p>
                    Advanced web & digital solutions crafted to help
                    businesses grow, engage, and scale online.
                </p>

                <div class="footer-socials">
                    <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://wa.me/919408191506" target="_blank" aria-label="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://github.com/" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <!-- QUICK LINKS -->
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../index.html#services">Services</a></li>
                    <li><a href="../index.html#solutions">Solutions</a></li>
                    <li><a href="../index.html#contact">Contact</a></li>
                </ul>
            </div>

            <!-- LEGAL -->
            <div class="footer-links">
                <h4>Legal</h4>
                <ul>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                </ul>
            </div>

            <!-- CONTACT -->
            <div class="footer-contact">
                <h4>Contact</h4>
                <form class="quick-form-grid" action="#" method="post" style="margin-bottom: 18px;">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <input type="tel" name="phone" placeholder="Phone Number" required>
                    <textarea name="message" rows="3" placeholder="Your message"></textarea>
                    <button type="submit" class="btn-primary">Send</button>
                </form>
                <p>
                    📞 <a href="tel:+919408191506">+91 9408191506</a>
                </p>
                <p>
                    📧 <a href="mailto:engagewebpot@gmail.com"> engagewebpot@gmail.com</a>
                </p>
                <p>📍 Vapi, Gujarat, India</p>
            </div>

        </div>

        <div class="footer-bottom-dark">
            <p>© 2026 Webpot. All rights reserved.</p>
        </div>
    </footer>

</body>

</html>
```

### `webpot- dashboard/user dashboard/settings.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Settings | Webpot</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

    <!-- Dashboard / Settings Theme -->
    <link rel="stylesheet" href="style.css" />
</head>

<body>

    <!-- NAVBAR -->
    <nav class="dashboard-navbar">
        <div class="nav-left">
            <img src="webpot-logo-black.png" alt="Webpot Logo" class="logo" />
            <span>Webpot</span>
        </div>

        <div class="nav-links">
            <a href="index.html">Dashboard</a>
            <a href="orders.html">Orders</a>
            <a class="active">Settings</a>
            <a href="../mainpage.html" class="back-to-webpot">← Back to Webpot</a>
        </div>
    </nav>

    <!-- MAIN -->
    <main class="dashboard-container">

        <!-- PAGE HEADER -->

        <section class="dashboard-card">
            <h2>Account Settings ⚙️</h2>
            <p style="opacity:0.7;margin-top:8px;">
                Manage your account information and security preferences
            </p>
        </section>
        <!-- SETTINGS SLIDER -->
        <div class="settings-slider">
            <button class="slider-btn active" data-slide="account">
                Account Info
            </button>
            <button class="slider-btn" data-slide="legal">
                Legal Services
            </button>
        </div>
        <!-- ACCOUNT INFO SLIDE -->
        <div class="settings-slide active" id="account">

            <!-- PROFILE INFO -->
            <section class="dashboard-card">
                <h3>Profile Information 👤</h3>

                <form method="POST" action="update_profile.php" class="profile-form">
                    <div class="profile-grid">
                        <div>
                            <label>Full Name</label>
                            <input type="text" name="fullname" placeholder="Your full name" />
                        </div>

                        <div>
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="your@email.com" />
                        </div>

                        <div>
                            <label>Phone Number</label>
                            <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" />
                        </div>

                        <div>
                            <label>Referral Code</label>
                            <div class="ref-code">WEBPOT123</div>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="margin-top:20px;">
                        Save Changes
                    </button>
                </form>
            </section>

            <section class="dashboard-card">
                <h3>Account Security 🔐</h3>

                <!-- CHANGE PASSWORD -->
                <form method="POST" action="change_password.php" class="security-form">
                    <div class="security-block">
                        <h4>Change Password</h4>
                        <div class="security-grid">
                            <input type="password" name="current_password" placeholder="Current Password" required>
                            <input type="password" name="new_password" placeholder="New Password" required>
                            <input type="password" name="confirm_password" placeholder="Confirm New Password" required>
                        </div>
                        <button type="submit" class="btn-primary">Update Password</button>
                    </div>
                </form>

                <!-- ACTIVE SESSIONS -->
                <div class="security-block">
                    <h4>Active Sessions</h4>

                    <div class="session-item">
                        <span>Chrome • Windows • India</span>
                        <span class="session-active">Active</span>
                    </div>

                    <div class="session-item">
                        <span>Mobile • Android • India</span>
                        <span class="session-old">2 days ago</span>
                    </div>

                    <form method="POST" action="logout_all.php" style="display:inline;">
                        <button type="submit" class="btn-danger">Logout All Devices</button>
                    </form>
                </div>
            </section>
        </div>
        <!-- LEGAL SLIDE -->
        <div class="settings-slide" id="legal">
            <section class="dashboard-card">
                <h3>Legal Services 📜</h3>

                <p style="opacity:0.7;margin-bottom:24px;">
                    Review our policies and legal information.
                </p>

                <div class="legal-actions">
                    <a href="legal.html#terms" class="btn-primary">
                        View Terms of Service
                    </a>

                    <a href="legal.html#privacy" class="btn-primary">
                        View Privacy Policy
                    </a>
                </div>
            </section>
        </div>
    </main>
    <!-- FOOTER -->
    <footer class="footer-dark">
        <div class="footer-dark-container">

            <!-- BRAND -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="webpot-logo-black.png" alt="Webpot Logo">
                    <span>Webpot</span>
                </div>

                <p>
                    Advanced web & digital solutions crafted to help
                    businesses grow, engage, and scale online.
                </p>

                <div class="footer-socials">
                    <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://wa.me/919408191506" target="_blank" aria-label="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://github.com/" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <!-- QUICK LINKS -->
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../index.html#services">Services</a></li>
                    <li><a href="../index.html#solutions">Solutions</a></li>
                    <li><a href="../index.html#contact">Contact</a></li>

                </ul>
            </div>

            <!-- LEGAL -->
            <div class="footer-links">
                <h4>Legal</h4>
                <ul>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                </ul>
            </div>

            <!-- CONTACT -->
            <div class="footer-contact">
                <h4>Contact</h4>
                <p>
                    📞 <a href="tel:+919408191506">+91 9408191506</a>
                </p>
                <p>
                    📧 <a href="mailto:engagewebpot@gmail.com"> engagewebpot@gmail.com</a>
                </p>
                <p>📍 Vapi, Gujarat, India</p>
            </div>

        </div>

        <div class="footer-bottom-dark">
            <p>© 2026 Webpot. All rights reserved.</p>
        </div>
    </footer>
    <script>
  const sliderButtons = document.querySelectorAll(".slider-btn");
  const slides = document.querySelectorAll(".settings-slide");

  sliderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sliderButtons.forEach(b => b.classList.remove("active"));
      slides.forEach(s => s.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.slide).classList.add("active");
    });
  });
</script>


</body>

</html>
```

### `webpot- dashboard/user dashboard/legal.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legal | Webpot</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

    <!-- Legal CSS -->
    <link rel="stylesheet" href="style.css" />
</head>

<body>

    <!-- HEADER -->
    <header class="legal-header">
        <h1>Legal Information</h1>
        <p>Privacy Policy & Terms of Service</p>

        <a href="settings.html" class="back-btn">← Back to Settings</a>
    </header>

    <!-- TABS -->
    <section class="legal-tabs">
        <button class="legal-tab active" data-tab="terms">
            <i class="fas fa-file-contract"></i> Terms of Service
        </button>
        <button class="legal-tab" data-tab="privacy">
            <i class="fas fa-shield-alt"></i> Privacy Policy
        </button>
    </section>

    <!-- CONTENT -->
    <main class="legal-container">

        <!-- TERMS -->
        <article id="terms" class="legal-content active">
            <h2>Terms of Service</h2>
            <p class="updated">Last Updated: December 2025</p>

            <h3>1. Introduction</h3>
            <p>Welcome to Webpot. These Terms of Service ("Terms") govern your use of our website and the web
                development services provided by us. By accessing our website, purchasing a service plan (Starter,
                Basic, or Premium), or signing a contract with us, you agree to be bound by these Terms.</p>

            <h3>2. Services and Scope of Work</h3>
            <p>We provide web development services as described in our packages (Starter, Basic, Premium) or a custom
                proposal.</p>
            <p>"Company," "We," "Us," or "Our" refers to Webpot.</p>
            <p>"Client," "You," or "Your" refers to the entity or individual purchasing services from Webpot.</p>
            <p>"Project" refers to the web development work commissioned by the Client.</p>
            <p>"Deliverables" refers to the finished website, code, and design assets provided to the Client.</p>
            <ul>
                <li><strong>Scope:</strong> The specific deliverables (number of pages, SEO level, design style) are
                    strictly limited to the package selected by the Client.</li>
                <li><strong>Scope Creep:</strong> Any additional features, pages, or changes requested by the Client
                    outside the original agreement will incur additional charges.</li>
                <li><strong>Timelines:</strong> Delivery times (e.g., 7 days, 15 days) are estimates. These timelines
                    commence only after we receive all necessary content (images, text, credentials) from the Client.
                    Delays in Client feedback will result in delays in the final delivery.</li>
            </ul>

            <h3>3. Client Obligations</h3>
            <p>To ensure the successful completion of the Project, you agree to: provide accurate information, respond
                promptly to requests, and maintain communication with Webpot throughout the project lifecycle.</p>

            <h3>4. Payments and Refunds</h3>
            <p><strong>Pricing:</strong> All prices listed on the website are in Indian Rupees (INR) and are billed on a
                <strong>monthly recurring basis</strong> unless otherwise specified.
            </p>
            <p><strong>Payment Terms:</strong> A deposit (typically 50%) is required before work begins. The remaining
                balance is due upon project completion but prior to the final website handover/deployment.</p>
            <p><strong>Refund Policy:</strong></p>
            <ul>
                <li>If you cancel the project before work has begun, you are eligible for a full refund.</li>
                <li>If you cancel the project after work has begun, the initial deposit is non-refundable to cover our
                    time and resources.</li>
                <li>Once the website is deployed/live, no refunds will be issued.</li>
            </ul>

            <h3>5. Intellectual Property (IP) Rights</h3>
            <p><strong>Client Ownership:</strong> Upon full payment of all invoices, the Client is granted full
                ownership of the finished website code and design.</p>
            <p><strong>Webpot Rights:</strong> We reserve the right to reuse underlying code snippets, libraries, or
                frameworks used in the development process for other projects.</p>
            <p><strong>Portfolio:</strong> You grant Webpot the right to display the finished Project in our portfolio,
                website, and marketing materials as a demonstration of our work.</p>

            <h3>6. Third-Party Services</h3>
            <p><strong>Hosting & Domain:</strong> Unless explicitly stated in a custom contract, the Client is
                responsible for the purchase and renewal of domain names and web hosting.</p>
            <p><strong>Plugins/APIs:</strong> Costs for premium third-party themes, plugins, or APIs (e.g., payment
                gateways) are the responsibility of the Client.</p>

            <h3>7. Warranties and Liability</h3>
            <p><strong>No Guarantee:</strong> While we implement basic SEO and responsive design as per industry
                standards, we do not guarantee specific search engine rankings or sales numbers.</p>
            <p><strong>Limitation of Liability:</strong> Webpot shall not be liable for any indirect, incidental, or
                consequential damages, including loss of data, loss of profits, or downtime caused by third-party
                hosting providers or malicious attacks (hacking).</p>
            <h3>8. Termination</h3>
            <p>We reserve the right to terminate a project if the Client is unresponsive for more than 30 days, uses
                abusive language, or fails to make payments. In such cases, the deposit is forfeited.</p>
            <h3>9. Contact Information</h3>
            <p>If you have questions about these Terms, please contact us at:</p>
            <ul>
                <li><strong>Email:</strong> engagewebpot@gmail.com</li>
                <li><strong>Phone no.:</strong> +91 9408191506</li>
            </ul>
        </article>

        <!-- PRIVACY -->
        <article id="privacy" class="legal-content">
            <h2>Privacy Policy</h2>
            <p class="updated">Last Updated: December 2025</p>

            <h3>1. Introduction</h3>
            <p>Webpot ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and otherwise process information in connection with our website
                and services.</p>

            <h3>2. Information We Collect</h3>
            <p>We collect information in various ways:</p>
            <ul>
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and
                    password</li>
                <li><strong>Service Information:</strong> Details about your project requirements, timeline, and budget
                </li>
                <li><strong>Communication Data:</strong> Messages, feedback, and inquiries you send through our website
                </li>
                <li><strong>Technical Data:</strong> IP address, browser type, pages visited, and time spent on our
                    website</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience</li>
            </ul>

            <h3>3. How We Use Your Information</h3>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
                <li>To provide and improve our web development services</li>
                <li>To process your orders and payments</li>
                <li>To communicate with you about your projects and accounts</li>
                <li>To send you service announcements and updates</li>
                <li>To respond to your inquiries and customer support requests</li>
                <li>To analyze usage patterns and improve our website</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraudulent transactions and enhance security</li>
            </ul>

            <h3>4. Information Sharing</h3>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information:
                </p>
                <ul>
                    <li>With our development team to fulfill your service requirements</li>
                    <li>With payment processors to handle transactions (subject to their privacy policies)</li>
                    <li>When required by law or court order</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                </ul>

                <h3>5. Data Security</h3>
                <p>We implement industry-standard security measures to protect your personal information, including:</p>
                <ul>
                    <li>Encrypted passwords and sensitive data</li>
                    <li>Secure socket layer (SSL) encryption for data transmission</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication mechanisms</li>
                </ul>
                <p>However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute
                    security of your information.</p>

                <h3>6. User Rights</h3>
                <p>You may request access, correction, or deletion of your data.</p>
                <h3>7. Cookies and Tracking</h3>
                <p>Our website uses cookies to:</p>
                <ul>
                    <li>Remember your login credentials</li>
                    <li>Track your preferences</li>
                    <li>Analyze website performance</li>
                    <li>Provide personalized content</li>
                </ul>
                <p>You can control cookies through your browser settings. Disabling cookies may affect functionality of
                    our website.</p>

                <h3>8. Data Retention</h3>
                <p>We retain personal information for as long as necessary to provide our services and fulfill the
                    purposes outlined in this policy. You may request deletion of your account at any time by contacting
                    us.</p>
                <h3>9. International Data Transfers</h3>
                <p>Your information may be transferred, stored, and processed in India and other countries. By using our
                    services, you consent to such transfers.</p>
                <h3>10. Updates to Privacy Policy</h3>
                <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect
                    any changes. Your continued use of our website constitutes acceptance of the updated policy.</p>
                <h3>11. Contact Us</h3>
                <p>If you have questions about this Privacy Policy or our privacy practices, please contact us through
                    the contact form on our website or email us directly.</p>
                <ul>
                    <li><strong>Email:</strong> engagewebpot@gmail.com</li>
                    <li><strong>Phone no.:</strong> +91 9408191506</li>
                </ul>
                <h3>12. Additional Information</h3>
                <p><strong>Account Deletion:</strong> You may request complete deletion of your account and associated
                    data at any time. Please allow 30 days for processing.</p>
                <p><strong>Data Breach Notification:</strong> In the event of a data breach, we will notify affected
                    users without unreasonable delay as required by law.</p>
        </article>

    </main>

    <!-- FOOTER -->
    <footer class="legal-footer">
        <form class="quick-form-grid" action="#" method="post" style="margin-bottom: 18px;">
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="email" name="email" placeholder="Your Email" required>
            <input type="tel" name="phone" placeholder="Phone Number" required>
            <textarea name="message" rows="3" placeholder="Your message"></textarea>
            <button type="submit" class="btn-primary">Send</button>
        </form>
        <p>© 2026 Webpot. All rights reserved.</p>
    </footer>

    <!-- TAB SCRIPT -->
    <script>
        const tabs = document.querySelectorAll(".legal-tab");
        const contents = document.querySelectorAll(".legal-content");

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(c => c.classList.remove("active"));

                tab.classList.add("active");
                document.getElementById(tab.dataset.tab).classList.add("active");
            });
        });
    </script>

</body>

</html>
```

### `webpot- dashboard/user dashboard/style.css`
```css
/* ===============================
   WEBPOT DASHBOARD THEME
   Colors: #a8b2dd | #000
   =============================== */

:root {
  --primary: #a8b2dd;
  --primary-dark: #8f9ad1;
  --black: #000000;
  --bg: #f6f7fb;

  --glass: rgba(255, 255, 255, 0.65);
  --border: rgba(0, 0, 0, 0.08);
  --shadow: 0 25px 45px rgba(0, 0, 0, 0.08);
}

/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", system-ui, sans-serif;
}

body {
  background: linear-gradient(
    135deg,
    #f6f7fb,
    #eef0f8
  );
  color: var(--black);
  min-height: 100vh;
  animation: pageFade 0.6s ease;
}

/* ===============================
   NAVBAR (GLASS)
   =============================== */
.dashboard-navbar {
  position: sticky;
  top: 0;
  z-index: 50;

  background: var(--glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-bottom: 1px solid var(--border);
  padding: 16px 42px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  animation: slideDown 0.6s ease;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 1.1rem;
}

.logo {
  width: 38px;
}

.nav-links a {
  margin-left: 32px;
  text-decoration: none;
  color: var(--black);
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0%;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.active::after {
  width: 100%;
}

.nav-links a.active {
  color: var(--black);
}

/* ===============================
   MAIN CONTAINER
   =============================== */
.dashboard-container {
  max-width: 1200px;
  margin: 70px auto;
  padding: 0 22px;
}

/* ===============================
   STATS CARDS
   =============================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 28px;
}

.stat-card {
  background: var(--glass);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 32px;

  box-shadow: var(--shadow);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  animation: fadeUp 0.6s ease forwards;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 35px 60px rgba(0, 0, 0, 0.12);
}

.stat-card h4 {
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--black);
}

/* ===============================
   PROFILE & ORDERS CARDS
   =============================== */
.profile-card,
.orders-card {
  margin-top: 55px;
  background: var(--glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 26px;
  padding: 40px;

  box-shadow: var(--shadow);
  animation: fadeUp 0.7s ease forwards;
}

.profile-card h3,
.orders-card h3 {
  margin-bottom: 22px;
  font-size: 1.3rem;
}

/* PROFILE GRID */
.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  font-size: 0.95rem;
}

.ref-code {
  background: rgba(168, 178, 221, 0.35);
  color: var(--black);
  padding: 6px 14px;
  border-radius: 14px;
  font-weight: 600;
}
/* ===============================
   DASHBOARD CARD (REUSABLE)
   =============================== */
.dashboard-card {
  margin-top: 50px;
  background: var(--glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 26px;
  padding: 40px;
  box-shadow: var(--shadow);
  animation: fadeUp 0.7s ease forwards;
}

/* ===============================
   INVOICE TABLE
   =============================== */
.invoice-table {
  width: 100%;
  margin-top: 25px;
  border-collapse: collapse;
}

.invoice-table th,
.invoice-table td {
  padding: 14px;
  border-bottom: 1px solid var(--border);
  font-size: 0.95rem;
}

.invoice-table th {
  text-align: left;
  font-size: 0.85rem;
  color: #333;
}

/* PAYMENT STATUS */
.pay-badge {
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.pay-badge.paid {
  background: rgba(168, 178, 221, 0.8);
}

.pay-badge.due {
  background: rgba(0, 0, 0, 0.1);
}

/* DOWNLOAD BUTTON */
.btn-link {
  text-decoration: none;
  font-weight: 600;
  color: #000;
  border-bottom: 2px solid var(--primary);
}

.btn-link.disabled {
  pointer-events: none;
  opacity: 0.4;
}
/* ===============================
   SECURITY SETTINGS
   =============================== */

.security-block {
  margin-top: 35px;
}

.security-block h4 {
  margin-bottom: 18px;
  font-size: 1.05rem;
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 15px;
  margin-bottom: 18px;
}

.security-grid input {
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.8);
}

/* SESSION LIST */
.session-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
}

.session-active {
  color: green;
  font-weight: 600;
}

.session-old {
  color: #555;
}

/* BUTTONS */
.btn-primary {
  background: var(--primary);
  border: none;
  color: #000;
  padding: 10px 24px;
  border-radius: 22px;
  font-weight: 600;
  cursor: pointer;
}

.btn-danger {
  margin-top: 20px;
  background: #000;
  color: white;
  padding: 10px 22px;
  border-radius: 22px;
  border: none;
  cursor: pointer;
}


/* ===============================
   ORDERS TABLE
   =============================== */
.orders-table {
  width: 100%;
  margin-top: 22px;
  border-collapse: collapse;
}

.orders-table th {
  text-align: left;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  padding: 14px;
  color: #333;
}

.orders-table td {
  padding: 16px 14px;
  border-top: 1px solid var(--border);
  font-size: 0.95rem;
}

/* STATUS SELECT (GLASS) */
.status-select {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-select:hover {
  background: var(--primary);
}

/* ===============================
   ANIMATIONS
   =============================== */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ===============================
   RESPONSIVE
   =============================== */
@media (max-width: 768px) {
  .dashboard-navbar {
    padding: 14px 22px;
  }

  .nav-links a {
    margin-left: 18px;
  }

  .profile-card,
  .orders-card {
    padding: 30px;
  }
}
/* ================= DARK PROFESSIONAL FOOTER ================= */
.footer-dark {
  background: linear-gradient(135deg, #a8b2dd, #0f172a);
  color: #e5e7eb;
  padding: 90px 20px 0;
}

.footer-dark-container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  gap: 60px;
}

/* BRAND */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.footer-logo img {
  width: 42px;
}

.footer-logo span {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
}

.footer-brand p {
  color: #cbd5f5;
  line-height: 1.7;
  max-width: 360px;
}

/* SOCIALS */
.footer-socials {
  display: flex;
  gap: 14px;
  margin-top: 22px;
}

.footer-socials a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-socials a:hover {
  background: #1e3a8a;
  transform: translateY(-4px);
}

/* LINKS */
.footer-links h4,
.footer-contact h4 {
  font-size: 1.1rem;
  margin-bottom: 18px;
  color: #ffffff;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 14px;
}

.footer-links a {
  text-decoration: none;
  color: #cbd5f5;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
  transform: translateX(4px);
}

/* CONTACT */
.footer-contact p {
  color: #cbd5f5;
  margin-bottom: 14px;
  line-height: 1.6;
}

.footer-contact a {
  color: #cbd5f5;
  text-decoration: none;
}

.footer-contact a:hover {
  color: #ffffff;
}

/* BOTTOM BAR */
.footer-bottom-dark {
  margin-top: 70px;
  padding: 25px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.footer-bottom-dark p {
  color: #94a3b8;
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: 25px;
}

.footer-bottom-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-bottom-links a:hover {
  color: #ffffff;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .footer-dark-container {
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  .footer-bottom-dark {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 600px) {
  .footer-dark-container {
    grid-template-columns: 1fr;
  }
}

/* =====================================
   WEBPOT ORDERS PAGE – GLASS THEME
   Colors: #a8b2dd | #000
   ===================================== */

/* RESET */
body {
  background: linear-gradient(135deg, #f6f7fb, #eef0f8);
  color: var(--black);
  animation: pageFade 0.6s ease;
}

/* ================= NAVBAR ================= */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;

  background: var(--glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-bottom: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  animation: slideDown 0.6s ease;
}

.nav-link {
  color: var(--black);
  opacity: 0.75;
  transition: opacity 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  opacity: 1;
}

/* ================= LAYOUT ================= */
.main-container {
  display: flex;
  min-height: calc(100vh - 70px);
}

/* ================= SIDEBAR ================= */
.sidebar {
  width: 260px;
  background: var(--glass);
  backdrop-filter: blur(16px);
  border-right: 1px solid var(--border);
  padding-top: 30px;
}

.menu-item {
  padding: 14px 26px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: center;
  font-weight: 500;
  opacity: 0.75;
  transition: background 0.3s ease, opacity 0.3s ease;
}

.menu-item:hover,
.menu-item.active {
  background: rgba(168, 178, 221, 0.25);
  opacity: 1;
}

/* ================= MAIN CONTENT ================= */
.main-content {
  flex: 1;
  padding: 50px;
  animation: fadeUp 0.7s ease;
}

/* ================= HEADER ================= */
.orders-page-header {
  background: var(--glass-strong);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 26px;
  padding: 30px 35px;
  box-shadow: var(--shadow);
  margin-bottom: 40px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  text-decoration: none;
  font-size: 0.9rem;
  color: var(--black);
  opacity: 0.7;
}

.back-link:hover {
  opacity: 1;
}

/* ================= FILTERS ================= */
.filters-section {
  display: flex;
  gap: 30px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.filter-select,
.search-input {
  padding: 10px 14px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.85);
}

/* ================= TABLE ================= */
.table-wrapper {
  background: var(--glass);
  backdrop-filter: blur(16px);
  border-radius: 26px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow-x: auto;
  animation: fadeUp 0.8s ease;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th {
  text-align: left;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 18px;
  color: #333;
}

.orders-table td {
  padding: 18px;
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
}

/* ================= STATUS BADGES ================= */
.status-badge {
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(168, 178, 221, 0.4);
}

.status-badge.pending {
  background: rgba(168, 178, 221, 0.3);
}

.status-badge.processing {
  background: rgba(168, 178, 221, 0.5);
}

.status-badge.shipped {
  background: rgba(168, 178, 221, 0.65);
}

.status-badge.delivered {
  background: rgba(168, 178, 221, 0.85);
}

.status-badge.cancelled {
  background: rgba(0, 0, 0, 0.15);
}

/* ================= STATS ================= */
.summary-stats {
  margin-top: 50px;
}

.stat-box {
  background: var(--glass);
  backdrop-filter: blur(16px);
  border-radius: 22px;
  border: 1px solid var(--border);
  padding: 30px;
  box-shadow: var(--shadow);
  animation: fadeUp 0.9s ease;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
}

/* ================= MODAL ================= */
.modal {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
}

.modal-content {
  background: var(--glass-strong);
  border-radius: 26px;
  padding: 40px;
  animation: scaleIn 0.4s ease;
}

/* ================= FOOTER ================= */
.dashboard-footer {
  margin-top: 60px;
  text-align: center;
  opacity: 0.6;
}

/* ================= ANIMATIONS ================= */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ================= RESPONSIVE ================= */
@media (max-width: 900px) {
  .sidebar {
    display: none;
  }

  .main-content {
    padding: 30px;
  }
}
/* ===============================
   NAVBAR (ORDERS PAGE)
   =============================== */

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 40px;

  background: var(--glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-bottom: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);

  animation: slideDown 0.6s ease;
}

/* LEFT (LOGO + NAME) */
.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 1.05rem;
}

.nav-left .logo {
  width: 36px;
}

/* RIGHT LINKS */
.nav-right {
  display: flex;
  align-items: center;
  gap: 28px;
}

/* NAV LINKS */
.nav-link {
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--black);
  opacity: 0.7;
  position: relative;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  opacity: 1;
}

/* ACTIVE LINK */
.nav-link.active {
  opacity: 1;
  font-weight: 600;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}

/* BACK TO WEBPOT */
.back-link {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--black);
  opacity: 0.6;
  margin-left: 20px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.back-link:hover {
  opacity: 1;
  transform: translateX(-4px);
}
/* ===============================
   ORDERS PAGE HEADER (GLASS)
   =============================== */

.orders-header-glass {
  margin-bottom: 40px;
  padding: 40px 45px;

  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 35px 70px rgba(0, 0, 0, 0.12);

  animation: fadeUp 0.7s ease;
}

/* TOP ROW */
.orders-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.orders-header-top h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
}

/* BACK BUTTON */
.back-dashboard-btn {
  text-decoration: none;
  padding: 10px 22px;
  border-radius: 22px;

  background: rgba(168, 178, 221, 0.35);
  color: #000;
  font-weight: 500;
  font-size: 0.9rem;

  transition: background 0.3s ease, transform 0.3s ease;
}

.back-dashboard-btn:hover {
  background: rgba(168, 178, 221, 0.55);
  transform: translateX(-4px);
}

/* CONTROLS */
.orders-header-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

/* CONTROL GROUP */
.control-group label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: #000;
}

/* FILTER + SEARCH INPUTS */
.order-filter,
.order-search {
  width: 100%;
  padding: 12px 16px;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.12);

  background: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;

  transition: box-shadow 0.3s ease, border 0.3s ease;
}

.order-filter:focus,
.order-search:focus {
  outline: none;
  border-color: #a8b2dd;
  box-shadow: 0 0 0 4px rgba(168, 178, 221, 0.35);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .orders-header-controls {
    grid-template-columns: 1fr;
  }

  .orders-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}
/* ===============================
   ORDER SUMMARY BOXES
   =============================== */

.orders-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 45px;
  animation: fadeUp 0.7s ease;
}

/* BASE BOX */
.summary-box {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 30px;

  text-align: center;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);

  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.summary-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 35px 60px rgba(0, 0, 0, 0.14);
}

.summary-box span {
  display: block;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 12px;
}

.summary-box strong {
  font-size: 2.4rem;
  font-weight: 700;
  color: #000;
}

/* STATUS COLORS (SOFT & ON-BRAND) */
.summary-box.pending strong {
  color: #f59e0b; /* amber */
}

.summary-box.processing strong {
  color: #3b82f6; /* blue */
}

.summary-box.delivered strong {
  color: #10b981; /* green */
}

.summary-box.revenue strong {
  color: #000;
}
/* Large screens (desktops & wide monitors) */
@media (min-width: 1200px) {
  .orders-summary {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Tablets */
@media (max-width: 1024px) {
  .orders-summary {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .summary-box strong {
    font-size: 2rem;
  }
}

/* Small tablets & large mobiles */
@media (max-width: 768px) {
  .orders-summary {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .summary-box {
    padding: 24px;
  }

  .summary-box strong {
    font-size: 1.9rem;
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  .orders-summary {
    grid-template-columns: 1fr;
  }

  .summary-box {
    padding: 22px;
  }

  .summary-box span {
    font-size: 0.85rem;
  }

  .summary-box strong {
    font-size: 1.8rem;
  }
}
@media (max-width: 768px) {
  .orders-header-glass {
    padding: 30px 25px;
  }

  .orders-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .orders-header-top h1 {
    font-size: 1.8rem;
  }

  .orders-header-controls {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .orders-header-top h1 {
    font-size: 1.6rem;
  }

  .back-dashboard-btn {
    align-self: flex-start;
  }
}@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    padding: 14px 20px;
    gap: 12px;
  }

  .nav-right {
    flex-wrap: wrap;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .nav-left span {
    font-size: 0.95rem;
  }

  .nav-link,
  .back-link {
    font-size: 0.85rem;
  }
}
@media (max-width: 768px) {
  .profile-card {
    padding: 30px;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 26px;
  }

  .stat-card p {
    font-size: 1.9rem;
  }
}
@media (max-width: 768px) {
  .dashboard-navbar {
    flex-wrap: wrap;
    padding: 14px 20px;
    gap: 12px;
  }

  .nav-left span {
    font-size: 1rem;
  }

  .nav-links {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .nav-links a {
    margin-left: 0;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .nav-links a {
    font-size: 0.85rem;
  }
}
/* ===============================
   SETTINGS PAGE – WEBPOT THEME
   =============================== */

.dashboard-card {
  margin-top: 35px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 26px;
  padding: 40px;

  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  animation: fadeUp 0.6s ease;
}

/* HEADINGS */
.dashboard-card h2,
.dashboard-card h3 {
  color: #000;
  margin-bottom: 16px;
}

.dashboard-card p {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ===============================
   PROFILE GRID
   =============================== */

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.profile-grid label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  opacity: 0.7;
}

.profile-grid input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  transition: box-shadow 0.3s ease, border 0.3s ease;
}

.profile-grid input:focus {
  outline: none;
  border-color: #a8b2dd;
  box-shadow: 0 0 0 4px rgba(168, 178, 221, 0.35);
}

/* REFERRAL CODE */
.ref-code {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 16px;
  background: rgba(168, 178, 221, 0.35);
  font-weight: 600;
  color: #000;
}

/* ===============================
   SECURITY SECTION
   =============================== */

.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
  margin: 18px 0 22px;
}

.security-grid input {
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}

/* ===============================
   BUTTONS
   =============================== */

.btn-primary {
  background: #a8b2dd;
  color: #000;
  padding: 12px 26px;
  border-radius: 24px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(168, 178, 221, 0.6);
}

.btn-danger {
  background: #000;
  color: #fff;
  padding: 12px 26px;
  border-radius: 24px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.btn-danger:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

/* ===============================
   RESPONSIVE
   =============================== */

@media (max-width: 768px) {
  .dashboard-card {
    padding: 30px;
  }

  .profile-grid,
  .security-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-card {
    padding: 24px;
  }

  .btn-primary,
  .btn-danger {
    width: 100%;
  }
}

/* LEGAL PAGE STYLES */

/* HEADER */
.legal-header {
  text-align: center;
  padding: 60px 20px 40px;
}

.legal-header h1 {
  font-size: 2.4rem;
}

.legal-header p {
  opacity: 0.7;
  margin-top: 8px;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  padding: 10px 22px;
  border-radius: 22px;
  background: rgba(168,178,221,0.35);
  color: #000;
}

/* TABS */
.legal-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.legal-tab {
  border: none;
  background: var(--glass);
  backdrop-filter: blur(14px);
  padding: 12px 24px;
  border-radius: 22px;
  cursor: pointer;
  font-weight: 600;
}

.legal-tab.active {
  background: rgba(168,178,221,0.6);
}

/* CONTENT */
.legal-container {
  max-width: 900px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.legal-content {
  display: none;
  background: var(--glass);
  backdrop-filter: blur(18px);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 40px;
}

.legal-content.active {
  display: block;
}

.legal-content h2 {
  margin-bottom: 10px;
}

.updated {
  opacity: 0.6;
  margin-bottom: 25px;
}

.legal-content h3 {
  margin-top: 25px;
}

.legal-content p {
  line-height: 1.7;
  opacity: 0.9;
}


/* FOOTER */
.legal-footer {
  text-align: center;
  padding: 30px;
  opacity: 0.6;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .legal-content {
    padding: 28px;
  }

  .legal-header h1 {
    font-size: 1.9rem;
  }
}
/* ===============================
   SETTINGS SLIDER (GLASS)
   =============================== */

.settings-slider {
  display: inline-flex;
  gap: 8px;
  padding: 8px;
  margin: 35px 0 20px;

  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.slider-btn {
  padding: 10px 22px;
  border-radius: 22px;
  border: none;
  background: transparent;
  font-weight: 600;
  cursor: pointer;
  color: #000;
  opacity: 0.6;
  transition: all 0.35s ease;
}

.slider-btn.active {
  background: rgba(168, 178, 221, 0.6);
  opacity: 1;
}

/* SLIDES */
.settings-slide {
  display: none;
  animation: slideFade 0.45s ease;
}

.settings-slide.active {
  display: block;
}

/* LEGAL BUTTON GROUP */
.legal-actions {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

/* ANIMATION */
@keyframes slideFade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .settings-slider {
    width: 100%;
    justify-content: center;
  }

  .slider-btn {
    flex: 1;
    text-align: center;
  }

  .legal-actions {
    flex-direction: column;
  }
}

```

### `webpot- dashboard/user dashboard/script.js`
```javascript
// Status select event listener - Guard against missing elements
const statusSelects = document.querySelectorAll(".status-select");
if (statusSelects.length > 0) {
  statusSelects.forEach(select => {
    select.addEventListener("change", () => {
      alert("Order status updated to: " + select.value);
    });
  });
}
```

