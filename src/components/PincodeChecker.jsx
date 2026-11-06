import React, { useState } from "react";
import { lookupPincode } from "../data/pincodeData";
import { Truck, CheckCircle2, MapPin, AlertCircle, ArrowRight } from "lucide-react";

export const PincodeChecker = ({ onPincodeValidated }) => {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleCheck = (val) => {
    const clean = val.replace(/[^0-9]/g, "");
    setPincode(clean);
    
    if (clean.length === 6) {
      const res = lookupPincode(clean);
      setResult(res);
      setSearched(true);
      if (res && onPincodeValidated) {
        onPincodeValidated(res);
      }
    } else {
      setResult(null);
      setSearched(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "var(--bg-secondary)",
      borderRadius: "var(--radius-sm)",
      padding: "0.85rem 1rem",
      border: "1px solid var(--border-light)",
      margin: "1rem 0"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "0.45rem" }}>
        <Truck size={14} color="var(--accent-forest)" />
        <span>Pincode Delivery & COD Verification</span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit PIN (e.g. 560038)"
          value={pincode}
          onChange={(e) => handleCheck(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "0.45rem 0.75rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-medium)",
            fontSize: "0.84rem",
            outline: "none",
            backgroundColor: "#fff"
          }}
        />
        <button
          type="button"
          onClick={() => handleCheck(pincode)}
          className="btn btn-secondary btn-sm"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem" }}
        >
          Verify
        </button>
      </div>

      {/* Real-time Logistics Result Card */}
      {searched && result && (
        <div style={{
          marginTop: "0.65rem",
          paddingTop: "0.65rem",
          borderTop: "1px dashed var(--border-medium)",
          fontSize: "0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          color: "var(--text-primary)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#166534", fontWeight: 700 }}>
            <CheckCircle2 size={14} />
            <span>Serviceable: {result.city}, {result.state}</span>
          </div>

          <div style={{ color: "var(--text-secondary)", fontSize: "0.76rem" }}>
            Estimated Dispatch Delivery: <strong>{result.estimatedDays}</strong> via {result.courier}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.74rem", marginTop: "2px" }}>
            <span style={{ color: "var(--accent-forest)", fontWeight: 600 }}>● Cash on Delivery Available</span>
            <span style={{ color: "var(--accent-forest)", fontWeight: 600 }}>● Instant UPI QR Verified</span>
          </div>
        </div>
      )}

      {searched && !result && pincode.length === 6 && (
        <div style={{ marginTop: "0.5rem", fontSize: "0.76rem", color: "#DC2626", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <AlertCircle size={13} />
          <span>Invalid PIN format. Please check the 6-digit postal code.</span>
        </div>
      )}
    </div>
  );
};
