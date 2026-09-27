import sys

# Script to apply Premium Birthday Experience Redesign to Page 6 CSS (Warm Ivory Luxury Paper + Deep Burgundy Typography)

NEW_P6_CSS = r"""/* ============================================================
   PAGE 6 — OUR UNFORGETTABLE WORDS (REFINED WARM IVORY LUXURY PAPER)
   ============================================================ */
#page6 {
  background: radial-gradient(circle at 50% 30%, #1A0509 0%, #0D0204 60%, #030105 100%);
  overflow-x: hidden;
  overflow-y: auto;
}

.p6-content {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 50px 20px 70px 20px;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

/* Page 6 Opening Container */
.p6-opening-container {
  text-align: center;
  width: 100%;
  margin-top: 36px;
  margin-bottom: 28px;
}

.p6-main-title {
  font-family: var(--font-title, 'Cinzel', serif);
  font-size: clamp(24px, 4vw, 38px);
  font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #FAF6EE 0%, #F0E1C2 55%, #D8B878 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.p6-open-line {
  font-family: var(--font-main, sans-serif);
  font-size: clamp(15px, 2.2vw, 20px);
  color: #C8B89A;
  font-style: italic;
  margin: 8px 0;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.p6-open-line.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-open-highlight {
  color: #F5EBDD;
  font-weight: 600;
  font-style: normal;
}

.p6-open-btn-wrap {
  margin-top: 32px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1s ease, transform 1s ease;
}

.p6-open-btn-wrap.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-btn-start {
  padding: 14px 40px;
  font-size: 15px;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(90, 23, 40, 0.45);
}

.p6-btn-start:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 14px 38px rgba(90, 23, 40, 0.60);
}

/* Main Memory Stage Container */
.p6-stage {
  width: 100%;
  max-width: 680px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Individual Memory Cards (Refined Warm Ivory Luxury Paper) */
.p6-memory-card {
  position: relative;
  width: 100%;
  background: rgba(245, 235, 221, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(216, 184, 120, 0.40);
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow:
    0 16px 45px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.70);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  opacity: 0;
  transform: translateY(22px) scale(0.97);
  transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Subtle Champagne light sweep across memory card */
.p6-memory-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.35),
    transparent
  );
  border-radius: 16px;
  pointer-events: none;
  transition: none;
}

.p6-memory-card.active::before {
  animation: memorySweep 1.5s ease 0.3s forwards;
}

@keyframes memorySweep {
  0%   { left: -100%; }
  100% { left: 150%; }
}

.p6-memory-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.p6-m1, .p6-m2, .p6-m3 {
  width: 100%;
}

.p6-mem-tag {
  font-family: var(--font-main, sans-serif);
  font-size: 11px;
  letter-spacing: 3px;
  color: #3D0B1B;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(216, 184, 120, 0.25);
  border: 1px solid rgba(216, 184, 120, 0.45);
  border-radius: 4px;
  padding: 4px 14px;
  margin-bottom: 16px;
  display: inline-block;
}

.p6-mem-intro {
  font-family: var(--font-main, sans-serif);
  font-size: clamp(17px, 2.3vw, 21px);
  color: #3D0B1B;
  font-style: italic;
  font-weight: 600;
  margin-bottom: 22px;
}

.p6-mem-subintro {
  font-size: clamp(15px, 2vw, 18px);
  color: #5C1929;
  font-style: italic;
  font-weight: 500;
  margin-top: -12px;
  margin-bottom: 22px;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.p6-mem-subintro.visible {
  opacity: 1;
}

/* Chat Box Structure */
.p6-chat-box {
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 22px;
}

.p6-chat-row {
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.p6-chat-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-chat-row.p6-you {
  align-items: flex-start;
  text-align: left;
}

.p6-chat-row.p6-ali {
  align-items: flex-end;
  text-align: right;
}

.p6-chat-author {
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 700;
  color: #5C1929;
  margin-bottom: 4px;
  padding: 0 6px;
}

.p6-chat-bubble {
  padding: 14px 22px;
  border-radius: 18px;
  font-size: clamp(15px, 2vw, 17.5px);
  line-height: 1.55;
  max-width: 85%;
  word-wrap: break-word;
}

.p6-you .p6-chat-bubble {
  background: rgba(61, 11, 27, 0.08);
  color: #3D0B1B;
  border: 1px solid rgba(216, 184, 120, 0.40);
  border-bottom-left-radius: 4px;
  font-weight: 500;
}

.p6-ali .p6-chat-bubble {
  background: linear-gradient(135deg, #4A1222 0%, #2A050E 100%);
  color: #FAF6EE;
  border: 1px solid rgba(216, 184, 120, 0.45);
  border-bottom-right-radius: 4px;
  box-shadow: 0 8px 22px rgba(74, 18, 34, 0.30);
  font-weight: 500;
}

/* Spotlight Quote Feature (Memory 02) */
.p6-ali-spotlight-quote {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 15px 0 25px 0;
  padding: 20px;
  background: rgba(245, 235, 221, 0.90);
  border-radius: 16px;
  border: 1px solid rgba(216, 184, 120, 0.45);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 1s ease, transform 1s ease;
}

.p6-ali-spotlight-quote.active {
  opacity: 1;
  transform: scale(1);
}

.p6-quote-light-sweep {
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.40) 50%, transparent 100%);
  transform: skewX(-25deg);
  transition: left 1.4s ease-in-out;
}

.p6-quote-light-sweep.active {
  left: 150%;
}

.p6-quote-bubble {
  font-size: clamp(16px, 2.2vw, 19.5px) !important;
  font-weight: 500;
  line-height: 1.6 !important;
  color: #FAF6EE !important;
  background: linear-gradient(135deg, #4A1222 0%, #2A050E 100%) !important;
  box-shadow: 0 10px 28px rgba(74, 18, 34, 0.35) !important;
}

.p6-ali-featured {
  width: 100%;
  justify-content: center;
}

/* Problem Solved Flow Chips */
.p6-solution-flow {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 22px;
}

.p6-status-chip {
  font-family: var(--font-main, sans-serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  padding: 7px 18px;
  border-radius: 30px;
  opacity: 0;
  transform: translateY(10px) scale(0.9);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.p6-status-chip.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.p6-chip-detected {
  background: rgba(185, 28, 28, 0.12);
  color: #8C1C1C;
  border: 1px solid rgba(185, 28, 28, 0.35);
}

.p6-chip-activated {
  background: rgba(216, 184, 120, 0.20);
  color: #3D0B1B;
  border: 1px solid rgba(216, 184, 120, 0.50);
}

.p6-chip-solved {
  background: rgba(16, 185, 120, 0.15);
  color: #065F46;
  border: 1px solid rgba(16, 185, 120, 0.40);
  box-shadow: 0 0 14px rgba(16, 185, 120, 0.20);
}

/* Memory 03: Diamond Quote Display */
.p6-diamond-quote-box {
  position: relative;
  padding: 28px 36px;
  margin: 18px 0 26px 0;
  background: rgba(245, 235, 221, 0.90);
  border: 1px solid rgba(216, 184, 120, 0.45);
  border-radius: 16px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.p6-diamond-quote-box.active {
  opacity: 1;
  transform: scale(1);
}

.p6-diamond-text {
  font-family: var(--font-title, 'Cinzel', serif);
  font-size: clamp(20px, 3.5vw, 30px);
  font-weight: 800;
  letter-spacing: 1px;
  color: #3D0B1B;
  background: none;
  -webkit-text-fill-color: initial;
  margin: 0;
  line-height: 1.4;
}

.p6-diamond-sparkle {
  position: absolute;
  font-size: 16px;
  color: #8C6A28;
  opacity: 0.85;
  animation: p6SparklePulse 2s ease-in-out infinite alternate;
}

.sp-top-left { top: 10px; left: 15px; }
.sp-top-right { top: 10px; right: 15px; }
.sp-bottom-left { bottom: 10px; left: 15px; }
.sp-bottom-right { bottom: 10px; right: 15px; }

@keyframes p6SparklePulse {
  0% { transform: scale(0.8); opacity: 0.4; }
  100% { transform: scale(1.2); opacity: 1; }
}

/* Reflection Blocks */
.p6-reflection-block, .p6-m3-reflection-wrap {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 22px;
}

.p6-reflection-1, .p6-reflection-2,
.p6-m3-line-1, .p6-m3-line-2, .p6-m3-line-3, .p6-m3-line-4 {
  font-family: var(--font-main, sans-serif);
  font-size: clamp(14.5px, 1.9vw, 18px);
  color: #3D0B1B;
  font-style: italic;
  margin: 6px 0;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1s ease, transform 1s ease;
}

.p6-reflection-1.visible, .p6-reflection-2.visible,
.p6-m3-line-1.visible, .p6-m3-line-2.visible, .p6-m3-line-3.visible, .p6-m3-line-4.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-reflection-2, .p6-m3-line-4 {
  color: #2A050E;
  font-weight: 700;
}

/* Final Page 6 Reflection (Symbols Trio & Closing) */
.p6-final-reflection {
  width: 100%;
  max-width: 680px;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.p6-final-reflection.active {
  opacity: 1;
  transform: translateY(0);
}

.p6-symbols-trio {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 26px;
}

.p6-sym-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(245, 235, 221, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(216, 184, 120, 0.40);
  border-radius: 14px;
  padding: 14px 22px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.30);
  opacity: 0;
  transform: translateY(15px) scale(0.9);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.p6-sym-item.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.p6-sym-icon {
  font-size: 26px;
  margin-bottom: 4px;
}

.p6-sym-label {
  font-family: var(--font-title, 'Cinzel', serif);
  font-size: 11px;
  letter-spacing: 2px;
  color: #3D0B1B;
  font-weight: 700;
}

.p6-final-words {
  margin-bottom: 26px;
}

.p6-final-line-1, .p6-final-line-2 {
  font-family: var(--font-main, sans-serif);
  font-size: clamp(15px, 2vw, 19px);
  color: #C8B89A;
  font-style: italic;
  margin: 8px 0;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1s ease, transform 1s ease;
}

.p6-final-line-1.visible, .p6-final-line-2.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-final-line-2 {
  color: #FAF6EE;
  font-weight: 600;
  font-style: normal;
}

.p6-continue-wrap {
  margin-top: 8px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 1s ease, transform 1s ease;
}

.p6-continue-wrap.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-btn-p7 {
  padding: 15px 40px;
  font-size: clamp(14px, 1.8vw, 16px);
  letter-spacing: 1.5px;
  box-shadow: 0 12px 35px rgba(90, 23, 40, 0.50);
}

.p6-btn-p7:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 16px 45px rgba(90, 23, 40, 0.65);
}

.p6-btn-p7.glowing {
  box-shadow: 0 0 40px rgba(216, 184, 120, 0.60), 0 12px 35px rgba(90, 23, 40, 0.50);
  border-color: #D8B878;
  transform: scale(1.03);
}

/* Action Wrap & Next Button for Memory Cards */
.p6-action-wrap {
  margin-top: 26px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  z-index: 10;
}

.p6-action-wrap.visible {
  opacity: 1;
  transform: translateY(0);
}

.p6-btn-next {
  padding: 13px 36px;
  font-size: 14px;
  letter-spacing: 1.5px;
  box-shadow: 0 8px 24px rgba(90, 23, 40, 0.40);
}

.p6-btn-next:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 12px 30px rgba(90, 23, 40, 0.55);
}

/* Visual Glow Elements */
.p6-bg-glow-cone {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 100%; height: 250px;
  background: radial-gradient(ellipse at top, rgba(216, 184, 120, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.p6-spotlight-glow-center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(216, 184, 120, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

/* Mobile Responsiveness for Page 6 */
@media (max-width: 768px) {
  .p6-memory-card {
    padding: 28px 18px;
  }
  .p6-symbols-trio {
    gap: 10px;
  }
  .p6-sym-item {
    padding: 10px 14px;
  }
}
"""

with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

s6 = css_content.find("/* ============================================================\n   PAGE 6")
e6 = css_content.find("/* ============================================================\n   PAGE 7")
if e6 == -1:
    e6 = css_content.find("PAGE 7")
    e6 = css_content.rfind("/*", 0, e6)

print(f"Replacing Page 6 CSS range: {s6} to {e6}")

new_css = css_content[:s6] + NEW_P6_CSS + "\n\n" + css_content[e6:]

with open("style.css", "w", encoding="utf-8") as f:
    f.write(new_css)

print("Applied Premium Birthday Experience Redesign to Page 6 CSS successfully!")
