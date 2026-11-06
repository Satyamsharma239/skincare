import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { QUIZ_QUESTIONS } from "../data/skinQuizData";
import { X, ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, ShoppingBag, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export const SkinQuizModal = () => {
  const { isQuizOpen, setIsQuizOpen, products, settings, addToCart } = useStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (!isQuizOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const isLastQuestion = currentStepIndex === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (!isLastQuestion) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setShowResult(true);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const selectedTypeOption = answers[1];
  const selectedConcernOption = answers[2];
  const selectedLifestyleOption = answers[3];

  const recommendedSkinType = selectedTypeOption?.suggestedType || "Balanced Skin";
  const recommendedConcern = selectedConcernOption?.concern || "Barrier Health & Radiance";

  const matchingProductIds = selectedConcernOption?.productIds || ["prod-1", "prod-2"];
  const matchedProducts = products.filter((p) => matchingProductIds.includes(p.id));

  if (matchedProducts.length < 2) {
    const fallback = products.find((p) => p.id === "prod-1" || p.id === "prod-2");
    if (fallback && !matchedProducts.some((p) => p.id === fallback.id)) {
      matchedProducts.push(fallback);
    }
  }

  const routinePrice = matchedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddRoutineToBag = () => {
    matchedProducts.forEach((p) => addToCart(p, 1));
    setIsQuizOpen(false);
  };

  const handleOrderQuizWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const productList = matchedProducts
      .map((p, idx) => `${idx + 1}. *${p.name}* (${settings.currency}${p.price})`)
      .join("\n");

    const msg = [
      `🌿 *MY PERSONALIZED SKINCARE DIAGNOSTIC* 🌿`,
      `*Store:* ${settings.storeName}`,
      ``,
      `👤 *Diagnostic Assessment:*`,
      `• *Skin Profile:* ${recommendedSkinType}`,
      `• *Primary Concern:* ${recommendedConcern}`,
      `• *Daily Exposure:* ${selectedLifestyleOption?.label || "Urban Climate"}`,
      ``,
      `✨ *Prescribed Regimen:*`,
      productList,
      ``,
      `💰 *Total:* ${settings.currency}${routinePrice}`,
      ``,
      `Please confirm these formulations are right for my barrier and help me place my order. Thank you!`
    ].join("\n");

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
    setIsQuizOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsQuizOpen(false)}>
      <div 
        className="modal-content"
        style={{ maxWidth: "580px", padding: "2.25rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Diagnostic Assessment
          </div>
          <button 
            onClick={() => setIsQuizOpen(false)}
            style={{ 
              borderRadius: "50%", 
              width: "32px", 
              height: "32px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              backgroundColor: "var(--bg-secondary)",
              cursor: "pointer" 
            }}
          >
            <X size={16} />
          </button>
        </div>

        {!showResult ? (
          <div>
            {/* Progress indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.25rem" }}>
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  style={{
                    flexGrow: 1,
                    height: "3px",
                    borderRadius: "2px",
                    backgroundColor: idx <= currentStepIndex ? "var(--text-primary)" : "var(--border-light)",
                    transition: "all 0.3s ease"
                  }}
                />
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
              STEP 0{currentStepIndex + 1} OF 0{QUIZ_QUESTIONS.length}
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 400, fontFamily: "var(--font-serif)", lineHeight: 1.3, marginBottom: "0.4rem" }}>
              {currentQuestion.title}
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              {currentQuestion.subtitle}
            </p>

            {/* Options List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.5rem" }}>
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id]?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQuestion.id, opt)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.95rem 1.25rem",
                      borderRadius: "var(--radius-sm)",
                      border: isSelected ? "1px solid var(--text-primary)" : "1px solid var(--border-medium)",
                      backgroundColor: isSelected ? "#F3EFE9" : "#fff",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: isSelected ? 500 : 400, color: "var(--text-primary)" }}>
                        {opt.label}
                      </div>
                      {opt.hint && (
                        <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          {opt.hint}
                        </div>
                      )}
                    </div>
                    {isSelected && <CheckCircle2 size={16} color="var(--text-primary)" />}
                  </button>
                );
              })}
            </div>

            {currentStepIndex > 0 && (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                <ArrowLeft size={13} />
                <span>Previous question</span>
              </button>
            )}
          </div>
        ) : (
          /* Results Screen */
          <div>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ 
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--accent-clay)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.4rem"
              }}>
                Diagnostic Evaluation
              </div>
              <h3 style={{ fontSize: "1.45rem", fontFamily: "var(--font-serif)", fontWeight: 400, marginBottom: "0.3rem" }}>
                Your Prescribed Regimen
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                Profile: <strong>{recommendedSkinType}</strong> • Target: <strong>{recommendedConcern}</strong>
              </p>
            </div>

            {/* Prescribed Products */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {matchedProducts.map((p, idx) => (
                <div 
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)"
                  }}
                >
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    style={{ width: "52px", height: "52px", borderRadius: "var(--radius-xs)", objectFit: "cover" }} 
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>
                      STEP 0{idx + 1} • {p.step}
                    </div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {p.keyActives}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    {settings.currency}{p.price}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0", borderTop: "1px solid var(--border-light)", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Total Regimen:</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {settings.currency}{routinePrice}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <button
                onClick={handleOrderQuizWhatsApp}
                className="btn btn-whatsapp"
                style={{ width: "100%", padding: "0.85rem" }}
              >
                <MessageCircle size={17} />
                <span>Order Prescribed Regimen on WhatsApp</span>
              </button>

              <button
                onClick={handleAddRoutineToBag}
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.85rem" }}
              >
                <ShoppingBag size={16} />
                <span>Add Prescribed Regimen to Cart</span>
              </button>

              <button
                onClick={handleReset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  marginTop: "0.25rem"
                }}
              >
                <RotateCcw size={13} />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
