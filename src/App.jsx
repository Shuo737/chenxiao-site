import { useEffect, useState } from "react";
import titleImg from "./assets/imgs/titleImg.jpg";

function Header({ onNavigate }) {
  const menuItems = ["Home", "Products"];
  return (
    <header style={{ background: "#5f89c6", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0 }}>Yiwu Chenxiao Trading Firm</h1>
          <p style={{ margin: 0 }}>义乌市郴霄贸易商行</p>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item === "Home" ? "home" : "products");
              }}
              style={{ color: "#fff" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      style={{
        height: 500,
        backgroundImage: `url(${titleImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ color: "#000000ff", marginLeft: 100 }}>
        <h2 style={{ fontSize: 48 }}>Professional Trading</h2>
        <p style={{ fontSize: 30 }}>Reliable products & service</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#4f7cc0", color: "#fff", padding: 20, textAlign: "center" }}>
      <p>© 2026 Yiwu Chenxiao Trading Firm</p>
      <p>义乌市郴霄贸易商行</p>
    </footer>
  );
}

function HomeContent({ onNavigate }) {
  // Feature images: featureImg 1..4 in src/assets/imgs
  const imgModules = import.meta.glob("./assets/imgs/*", { eager: true });
  const featureLabels = ["Necklaces", "Rings", "Ear Rings", "Bracelets"];
  const featureItems = featureLabels.map((label, idx) => {
    const n = idx + 1;
    let found = null;
    for (const path in imgModules) {
      const fname = path.split("/").pop().split(".")[0].toLowerCase();
      const compact = fname.replace(/\s+/g, "");
      if (compact === `featureimg${n}` || fname.includes(`featureimg ${n}`) || fname.includes(`featureimg${n}`)) {
        found = imgModules[path].default;
        break;
      }
    }
    return { label, src: found || `https://picsum.photos/seed/feature-${n}/400/300` };
  });

  return (
    <>
      <section style={{ padding: 60, textAlign: "center" }}>
        <h2>Featured Products</h2>

        <div className="feature-grid">
          {featureItems.map((f) => (
            <div
              key={f.label}
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                minHeight: 240,
                maxWidth: 300,
                margin: "20px auto",
              }}
            >
              <img src={f.src} alt={f.label} style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }} />
              <p style={{ marginTop: "auto", marginBottom: 0, textAlign: "center" }}>{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 60, textAlign: "center", background: "#fff" }}>
        <h2>About Us</h2>
        <div style={{ maxWidth: 600, margin: "20px auto", textAlign: "left" }}>
          <div style={{ marginBottom: 20 }}>
            <h3>The Inspiration</h3>
            <p>
              We believe jewelry is an extension of the wearer's soul. At Yiwu Chenxiao Trading Firm, we were drawn to stainless steel for its unique strength and skin-friendly nature. Unlike silver, it doesn't tarnish; unlike copper, it isn't heavy. It represents a quiet confidence and a personality that refuses to change with the trends.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3>The Craftsmanship</h3>
            <p>
              Every piece from Yiwu Chenxiao undergoes a rigorous journey from sketch to finished product. We use premium 316L stainless steel, known for its hypoallergenic properties. Through precision craftsmanship and hand polishing, we create jewelry that requires no plating. We let the raw material speak for itself, ensuring every item is hypoallergenic, waterproof, and fade-resistant—giving you true "wear it anywhere" freedom.
            </p>
          </div>

          <div>
            <h3>Our Mission:</h3>
            <p>
              We are a team of designers who love the texture of metal. We want to break the cycle of "fast fashion." Here, you won't find high markups—only respect for the materials and the design. We aim to provide you with a "permanent" accessory that ages with you and records the moments of your life.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: 60, textAlign: "center" }}>
        <h2>Contact Us</h2>

        <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 30 }}>
          <div>
            <h4>Phone</h4>
            <p>+86 15115574116</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>524415460@qq.com</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductPage() {
  const sections = ["Necklaces", "Bracelets", "Rings", "Ear Rings", "Others"];
  const perSection = 12; // 5 sections * 12 = 60

  // eagerly load any local images placed in src/assets/imgs (Vite)
  const imgModules = import.meta.glob("./assets/imgs/*", { eager: true });
  const normalize = (s) => String(s).replace(/[^a-z0-9]/gi, "").toLowerCase();
  function findLocalImage(section, idx) {
    const normSection = normalize(section);
    const singular = normSection.endsWith("s") ? normSection.slice(0, -1) : normSection;
    const idxStr = String(idx);
    const idxPadded = String(idx).padStart(2, "0");

    for (const path in imgModules) {
      const fname = path.split("/").pop().split(".")[0];
      const nf = normalize(fname);
      const fnameRaw = fname.toLowerCase().trim();

      const candidates = [
        normSection + idxStr,
        normSection + idxPadded,
        singular + idxStr,
        singular + idxPadded,
      ];

      // also allow exact filenames with spaces, e.g. "ring 1" or "Ring 01"
      const candidatesRaw = [
        `${section.toLowerCase()} ${idxStr}`,
        `${section.toLowerCase()} ${idxPadded}`,
        `${singular} ${idxStr}`,
        `${singular} ${idxPadded}`,
      ];

      for (const cand of candidates) {
        if (nf === cand || nf.includes(cand)) return imgModules[path].default;
      }

      for (const cand of candidatesRaw) {
        if (fnameRaw === cand || fnameRaw.includes(cand)) return imgModules[path].default;
      }
    }

    return null;
  }

  // Build map of local images grouped by section (if any)
  const localMap = {};
  for (const path in imgModules) {
    const fname = path.split("/").pop().split(".")[0];
    const nf = normalize(fname);
    // try to extract a trailing number
    const numMatch = fname.match(/(\d+)/);
    const num = numMatch ? Number(numMatch[1]) : null;

    for (const section of sections) {
      const normSection = normalize(section);
      const singular = normSection.endsWith("s") ? normSection.slice(0, -1) : normSection;
      const fnameRaw = fname.toLowerCase().trim();

      // candidates that normalize without spaces
      const candidates = [normSection, singular];
      // candidates with a space (raw)
      const candidatesRaw = [section.toLowerCase(), singular];

      let matched = false;
      for (const cand of candidates) {
        if (nf.startsWith(cand)) matched = true;
      }
      for (const cand of candidatesRaw) {
        if (fnameRaw.startsWith(cand)) matched = true;
      }

      if (matched) {
        localMap[section] = localMap[section] || [];
        localMap[section].push({ url: imgModules[path].default, num });
        break;
      }
    }
  }

  // Create products: prefer local images for a section if any exist; otherwise create placeholders (picsum)
  const products = [];
  let nextId = 1;
  for (const section of sections) {
    const locals = localMap[section];
    if (locals && locals.length > 0) {
      // sort by number when available
      locals.sort((a, b) => (a.num || 0) - (b.num || 0));
      for (const item of locals) {
        products.push({ id: nextId++, section, num: item.num || nextId, name: `${section} ${item.num || ""}`, localUrl: item.url });
      }
    } else {
      for (let i = 0; i < perSection; i++) {
        const num = i + 1;
        products.push({ id: nextId++, section, num, name: `${section} ${num}` });
      }
    }
  }

  return (
    <section style={{ padding: 60, textAlign: "center" }}>
      <h2>Products</h2>

      {sections.map((sec) => {
        const items = products.filter((p) => p.section === sec);
        return (
          <div key={sec} style={{ marginTop: 40, textAlign: "center" }}>
            <h3 style={{ marginBottom: 12 }}>{sec}</h3>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {items.map((img) => {
                const src = img.localUrl || findLocalImage(img.section, img.num) || `https://picsum.photos/seed/product-${img.id}/400/300`;
                return (
                  <div
                    key={img.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #ddd",
                      padding: 8,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 240,
                    }}
                  >
                    <img src={src} alt={img.name} style={{ width: "100%", height: "auto", maxHeight: "200px", objectFit: "contain" }} />
                    <p style={{ marginTop: "auto", marginBottom: 0, textAlign: "center" }}>{img.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default function WebsiteApp() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    return hash === "products" ? "products" : "home";
  });

  useEffect(() => {
    function onHash() {
      const hash = window.location.hash.replace(/^#\/?/, "");
      setRoute(hash === "products" ? "products" : "home");
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function navigate(to) {
    if (to === "home") {
      window.location.hash = "#/";
    } else if (to === "products") {
      window.location.hash = "#/products";
    }
    setRoute(to);
  }

  return (
    <main style={{ background: "#efefef", minHeight: "100vh", color: "#333" }}>
      <Header onNavigate={navigate} />
      <Hero />

      {route === "home" ? <HomeContent onNavigate={navigate} /> : <ProductPage />}

      <Footer />
    </main>
  );
}