/**
 * Sistema de datilologia LILAS.
 * Alfabeto manual da Libras (A–Z). J e Z incluem o movimento da letra.
 * Não interpreta sinais lexicais — só soletração e idle.
 */
(function () {
  const GOLD = "#c4a36a";
  const GOLD_DEEP = "#9a7a45";
  const NAIL = "#e8d5a8";

  const REST = {
    wrist: 0,
    lift: 0,
    slide: 0,
    thumb: { splay: 42, a: 18, b: 12 },
    index: { splay: -14, a: 8, b: 6, c: 4 },
    middle: { splay: -2, a: 10, b: 8, c: 6 },
    ring: { splay: 10, a: 12, b: 10, c: 8 },
    pinky: { splay: 20, a: 14, b: 10, c: 8 },
  };

  const FOLD = { a: 158, b: 132, c: 88 };
  const FIST = { a: 168, b: 145, c: 95 };

  function folded(splay, extra) {
    return { splay, a: FOLD.a + (extra || 0), b: FOLD.b, c: FOLD.c };
  }

  function straight(splay) {
    return { splay, a: 4, b: 2, c: 2 };
  }

  const POSES = {
    A: {
      thumb: { splay: 8, a: 8, b: 6 },
      index: folded(-12),
      middle: folded(-2),
      ring: folded(8),
      pinky: folded(16),
    },
    B: {
      thumb: { splay: 6, a: 72, b: 50 },
      index: straight(-10),
      middle: straight(-2),
      ring: straight(8),
      pinky: straight(16),
    },
    C: {
      thumb: { splay: 58, a: 28, b: 22 },
      index: { splay: -12, a: 32, b: 28, c: 18 },
      middle: { splay: -2, a: 34, b: 30, c: 18 },
      ring: { splay: 8, a: 34, b: 30, c: 18 },
      pinky: { splay: 18, a: 32, b: 28, c: 16 },
    },
    D: {
      thumb: { splay: 36, a: 40, b: 28 },
      index: straight(-8),
      middle: folded(0, 4),
      ring: folded(10, 4),
      pinky: folded(18, 4),
    },
    E: {
      thumb: { splay: 20, a: 50, b: 40 },
      index: { splay: -10, a: 70, b: 80, c: 40 },
      middle: { splay: -2, a: 72, b: 82, c: 40 },
      ring: { splay: 8, a: 72, b: 82, c: 40 },
      pinky: { splay: 16, a: 70, b: 80, c: 38 },
    },
    F: {
      thumb: { splay: 38, a: 42, b: 30 },
      index: { splay: -6, a: 55, b: 70, c: 40 },
      middle: straight(-2),
      ring: straight(8),
      pinky: straight(18),
    },
    G: {
      wrist: -78,
      thumb: { splay: 48, a: 10, b: 8 },
      index: straight(-6),
      middle: folded(2),
      ring: folded(10),
      pinky: folded(18),
    },
    H: {
      wrist: -78,
      thumb: { splay: 16, a: 50, b: 36 },
      index: straight(-8),
      middle: straight(2),
      ring: folded(12),
      pinky: folded(18),
    },
    I: {
      thumb: { splay: 10, a: 62, b: 48 },
      index: folded(-12),
      middle: folded(-2),
      ring: folded(8),
      pinky: straight(22),
    },
    J: {
      thumb: { splay: 10, a: 62, b: 48 },
      index: folded(-12),
      middle: folded(-2),
      ring: folded(8),
      pinky: straight(22),
    },
    K: {
      thumb: { splay: 28, a: 20, b: 10 },
      index: straight(-12),
      middle: { splay: 8, a: 18, b: 8, c: 4 },
      ring: folded(12),
      pinky: folded(20),
    },
    L: {
      thumb: { splay: 8, a: 6, b: 4 },
      index: straight(-8),
      middle: folded(0),
      ring: folded(10),
      pinky: folded(18),
    },
    M: {
      thumb: { splay: 4, a: 20, b: 16 },
      index: { splay: -8, a: 88, b: 20, c: 10 },
      middle: { splay: 0, a: 88, b: 20, c: 10 },
      ring: { splay: 8, a: 88, b: 20, c: 10 },
      pinky: folded(18),
    },
    N: {
      thumb: { splay: 6, a: 22, b: 16 },
      index: { splay: -8, a: 88, b: 20, c: 10 },
      middle: { splay: 2, a: 88, b: 20, c: 10 },
      ring: folded(12),
      pinky: folded(18),
    },
    O: {
      thumb: { splay: 48, a: 38, b: 28 },
      index: { splay: -8, a: 48, b: 50, c: 30 },
      middle: { splay: 0, a: 50, b: 52, c: 30 },
      ring: { splay: 8, a: 50, b: 52, c: 30 },
      pinky: { splay: 16, a: 48, b: 48, c: 28 },
    },
    P: {
      wrist: 18,
      lift: 8,
      thumb: { splay: 30, a: 22, b: 12 },
      index: { splay: -8, a: 20, b: 8, c: 4 },
      middle: { splay: 10, a: 48, b: 20, c: 8 },
      ring: folded(14),
      pinky: folded(20),
    },
    Q: {
      wrist: 70,
      thumb: { splay: 50, a: 12, b: 8 },
      index: straight(-6),
      middle: folded(2),
      ring: folded(10),
      pinky: folded(18),
    },
    R: {
      thumb: { splay: 12, a: 58, b: 40 },
      index: { splay: 6, a: 4, b: 2, c: 2 },
      middle: { splay: -10, a: 4, b: 2, c: 2 },
      ring: folded(10),
      pinky: folded(18),
    },
    S: {
      thumb: { splay: 22, a: 36, b: 20 },
      index: { splay: -12, ...FIST },
      middle: { splay: -2, ...FIST },
      ring: { splay: 8, ...FIST },
      pinky: { splay: 16, ...FIST },
    },
    T: {
      thumb: { splay: 18, a: 8, b: 4 },
      index: { splay: -6, a: 70, b: 90, c: 50 },
      middle: folded(2),
      ring: folded(10),
      pinky: folded(18),
    },
    U: {
      thumb: { splay: 10, a: 60, b: 42 },
      index: straight(-6),
      middle: straight(4),
      ring: folded(12),
      pinky: folded(18),
    },
    V: {
      thumb: { splay: 10, a: 60, b: 42 },
      index: straight(-16),
      middle: straight(12),
      ring: folded(12),
      pinky: folded(18),
    },
    W: {
      thumb: { splay: 8, a: 62, b: 44 },
      index: straight(-16),
      middle: straight(0),
      ring: straight(16),
      pinky: folded(20),
    },
    X: {
      thumb: { splay: 14, a: 58, b: 40 },
      index: { splay: -8, a: 28, b: 78, c: 40 },
      middle: folded(0),
      ring: folded(10),
      pinky: folded(18),
    },
    Y: {
      thumb: { splay: 8, a: 8, b: 4 },
      index: folded(-12),
      middle: folded(-2),
      ring: folded(8),
      pinky: straight(26),
    },
    Z: {
      thumb: { splay: 12, a: 58, b: 40 },
      index: straight(-8),
      middle: folded(0),
      ring: folded(10),
      pinky: folded(18),
    },
  };

  function mergePose(letter) {
    const pose = POSES[letter] || POSES.L;
    return {
      wrist: pose.wrist || 0,
      lift: pose.lift || 0,
      slide: pose.slide || 0,
      thumb: { ...REST.thumb, ...pose.thumb },
      index: { ...REST.index, ...pose.index },
      middle: { ...REST.middle, ...pose.middle },
      ring: { ...REST.ring, ...pose.ring },
      pinky: { ...REST.pinky, ...pose.pinky },
    };
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpFinger(a, b, t) {
    const out = {};
    Object.keys(b).forEach((key) => {
      out[key] = lerp(a[key] ?? b[key], b[key], t);
    });
    return out;
  }

  function lerpPose(a, b, t) {
    return {
      wrist: lerp(a.wrist, b.wrist, t),
      lift: lerp(a.lift, b.lift, t),
      slide: lerp(a.slide, b.slide, t),
      thumb: lerpFinger(a.thumb, b.thumb, t),
      index: lerpFinger(a.index, b.index, t),
      middle: lerpFinger(a.middle, b.middle, t),
      ring: lerpFinger(a.ring, b.ring, t),
      pinky: lerpFinger(a.pinky, b.pinky, t),
    };
  }

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function bone(w, h) {
    return `<rect class="lh-bone" x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="${w / 2}" />`;
  }

  function chain(name, segments, nail) {
    let inner = "";
    for (let i = segments.length - 1; i >= 0; i -= 1) {
      const [key, w, h] = segments[i];
      const tip = i === segments.length - 1
        ? `<ellipse class="lh-nail" cx="0" cy="${-h + nail}" rx="${w * 0.28}" ry="${w * 0.32}" />`
        : "";
      inner = `<g data-joint="${key}" data-len="${h}">${bone(w, h)}${tip}${inner}</g>`;
    }
    return `<g class="lh-${name}" data-finger="${name}">${inner}</g>`;
  }

  function svgMarkup() {
    return `
      <svg class="lh-svg" viewBox="0 0 240 300" aria-hidden="true">
        <g class="lh-root">
          <g class="lh-wrist">
            <rect class="lh-forearm" x="104" y="210" width="36" height="72" rx="18" />
            <g class="lh-palm">
              <path d="M92 154c4-20 16-34 38-36 26-2 46 12 52 32 5 18 3 36-8 50-8 12-22 18-40 18H104c-12 0-16-10-15-24 1-12 1-26 3-40z" />
              <ellipse class="lh-pad" cx="128" cy="186" rx="20" ry="15" />
              ${chain("thumb", [["a", 24, 44], ["b", 20, 34]], 9)}
              ${chain("index", [["a", 17, 48], ["b", 15, 36], ["c", 13, 28]], 7)}
              ${chain("middle", [["a", 18, 52], ["b", 16, 38], ["c", 14, 30]], 7)}
              ${chain("ring", [["a", 16, 46], ["b", 14, 34], ["c", 13, 26]], 6)}
              ${chain("pinky", [["a", 14, 38], ["b", 13, 28], ["c", 11, 22]], 5)}
            </g>
          </g>
        </g>
      </svg>
    `;
  }

  const ANCHORS = {
    thumb: { x: 90, y: 176, base: -88 },
    index: { x: 106, y: 148, base: 0 },
    middle: { x: 128, y: 142, base: 0 },
    ring: { x: 148, y: 148, base: 0 },
    pinky: { x: 166, y: 158, base: 0 },
  };

  function applyFinger(root, name, pose) {
    const group = root.querySelector(`.lh-${name}`);
    if (!group) return;
    const anchor = ANCHORS[name];
    group.setAttribute(
      "transform",
      `translate(${anchor.x} ${anchor.y}) rotate(${anchor.base + pose.splay})`
    );

    let lift = 0;
    group.querySelectorAll("[data-joint]").forEach((node) => {
      const key = node.dataset.joint;
      const len = Number(node.dataset.len || 0);
      node.setAttribute("transform", `translate(0 ${-lift}) rotate(${pose[key] || 0})`);
      lift = len;
    });
  }

  function applyPose(root, pose) {
    const wrist = root.querySelector(".lh-wrist");
    if (wrist) {
      wrist.setAttribute(
        "transform",
        `translate(${pose.slide} ${-pose.lift}) rotate(${pose.wrist} 120 250)`
      );
    }
    applyFinger(root, "thumb", pose.thumb);
    applyFinger(root, "index", pose.index);
    applyFinger(root, "middle", pose.middle);
    applyFinger(root, "ring", pose.ring);
    applyFinger(root, "pinky", pose.pinky);
  }

  function prefersReduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function normalizeWord(word) {
    return String(word || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z]/g, "");
  }

  function createHand(mount) {
    const reduced = prefersReduced();
    mount.innerHTML = `
      <div class="lh-glow" aria-hidden="true"></div>
      ${svgMarkup()}
      <p class="lh-letter" data-hand-letter aria-live="polite"> </p>
      <ol class="lh-chips" data-hand-chips hidden></ol>
    `;

    const svg = mount.querySelector(".lh-svg");
    const letterEl = mount.querySelector("[data-hand-letter]");
    const chipsEl = mount.querySelector("[data-hand-chips]");
    let current = { ...REST };
    let letter = "";
    let idleOn = false;
    let raf = 0;
    let token = 0;
    let idleT = 0;

    applyPose(svg, current);

    function setLetterLabel(next) {
      letter = next;
      if (letterEl) letterEl.textContent = next || "";
      if (chipsEl) {
        chipsEl.querySelectorAll("[data-chip]").forEach((chip) => {
          chip.classList.toggle("is-on", chip.dataset.chip === next);
        });
      }
    }

    function paint(pose) {
      current = pose;
      applyPose(svg, pose);
    }

    function tickIdle(now) {
      if (!idleOn) return;
      idleT = now;
      const wave = Math.sin(now / 700);
      const breathe = mergePose(letter || "L");
      const live = lerpPose(breathe, {
        ...breathe,
        lift: 5,
        wrist: breathe.wrist + 2.4,
        index: { ...breathe.index, a: breathe.index.a + 3 },
        thumb: { ...breathe.thumb, splay: breathe.thumb.splay + 2 },
      }, (wave + 1) / 2);
      paint(live);
      raf = requestAnimationFrame(tickIdle);
    }

    function idle() {
      idleOn = !reduced;
      cancelAnimationFrame(raf);
      if (reduced) {
        paint(mergePose(letter || "L"));
        return;
      }
      raf = requestAnimationFrame(tickIdle);
    }

    function stopIdle() {
      idleOn = false;
      cancelAnimationFrame(raf);
    }

    function transitionTo(nextLetter, duration) {
      stopIdle();
      const from = current;
      const to = mergePose(nextLetter);
      setLetterLabel(nextLetter);
      if (reduced) {
        paint(to);
        return Promise.resolve();
      }

      const my = ++token;
      const start = performance.now();
      return new Promise((resolve) => {
        function step(now) {
          if (my !== token) return resolve();
          const t = Math.min(1, (now - start) / duration);
          paint(lerpPose(from, to, ease(t)));
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    }

    function wait(ms) {
      if (reduced) return Promise.resolve();
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function trace(nextLetter) {
      if (reduced) return;
      const base = mergePose(nextLetter);
      const frames =
        nextLetter === "J"
          ? [
              { ...base, wrist: 18, slide: 6 },
              { ...base, wrist: 42, slide: 16, lift: 4 },
              { ...base, wrist: 8, slide: 10, lift: -2 },
            ]
          : [
              { ...base, slide: 14 },
              { ...base, slide: -4, lift: -10 },
              { ...base, slide: 16, lift: -16 },
            ];

      for (const frame of frames) {
        const from = current;
        const my = ++token;
        const start = performance.now();
        await new Promise((resolve) => {
          function step(now) {
            if (my !== token) return resolve();
            const t = Math.min(1, (now - start) / 160);
            paint(lerpPose(from, frame, ease(t)));
            if (t < 1) requestAnimationFrame(step);
            else resolve();
          }
          requestAnimationFrame(step);
        });
      }
      await transitionTo(nextLetter, 180);
    }

    async function show(nextLetter) {
      const key = normalizeWord(nextLetter).slice(0, 1) || "L";
      await transitionTo(key, 320);
      if (key === "J" || key === "Z") await trace(key);
    }

    function prepareChips(word) {
      if (!chipsEl) return;
      const letters = normalizeWord(word);
      if (!letters) {
        chipsEl.hidden = true;
        chipsEl.innerHTML = "";
        return;
      }
      chipsEl.hidden = false;
      chipsEl.innerHTML = letters
        .split("")
        .map((ch, i) => `<li data-chip="${ch}" data-i="${i}">${ch}</li>`)
        .join("");
    }

    async function spell(word, options) {
      const letters = normalizeWord(word);
      const hold = (options && options.hold) || 420;
      const move = (options && options.move) || 280;
      const onLetter = options && options.onLetter;
      if (options && options.chips === false) {
        if (chipsEl) {
          chipsEl.hidden = true;
          chipsEl.innerHTML = "";
        }
      } else {
        prepareChips(letters);
      }
      if (!letters) return;

      if (reduced) {
        await show(letters[letters.length - 1] === "S" && letters === "LILAS" ? "L" : letters[letters.length - 1]);
        if (chipsEl) chipsEl.querySelectorAll("[data-chip]").forEach((c) => c.classList.add("is-on"));
        return;
      }

      for (let i = 0; i < letters.length; i += 1) {
        const ch = letters[i];
        await transitionTo(ch, i === 0 ? 360 : move);
        if (chipsEl) {
          chipsEl.querySelectorAll("[data-chip]").forEach((chip, idx) => {
            chip.classList.toggle("is-done", idx <= i);
            chip.classList.toggle("is-on", idx === i);
          });
        }
        if (typeof onLetter === "function") onLetter(i, ch);
        if (ch === "J" || ch === "Z") await trace(ch);
        await wait(hold);
      }
    }

    function destroy() {
      token += 1;
      stopIdle();
      mount.innerHTML = "";
    }

    return {
      show,
      spell,
      idle,
      prepareChips,
      destroy,
      get letter() {
        return letter;
      },
    };
  }

  const instances = new Map();

  window.LilasHand = {
    mount(el) {
      if (!el) return null;
      if (instances.has(el)) instances.get(el).destroy();
      const hand = createHand(el);
      instances.set(el, hand);
      return hand;
    },
    poses: Object.keys(POSES),
  };
})();
