"use client";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";

export default function Certificate() {
  const generatePDF = () => {
    const doc = new jsPDF({
        orientation: "landscape",
    });

    doc.setFillColor(11, 15, 19);
    doc.rect(0, 0, 300, 210, "F");

    doc.setLineWidth(2);
    doc.setDrawColor(0, 225, 255);
    doc.rect(10, 10, 277, 190);

    doc.setTextColor(255, 255, 255);
    doc.setFont("courier", "bold");
    
    doc.setFontSize(40);
    doc.text("CERTIFICATE OF VISIT", 148, 50, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("courier", "normal");
    doc.text("This certifies that", 148, 70, { align: "center" });

    doc.setFontSize(30);
    doc.setTextColor(0, 225, 255);
    doc.text("ANONYMOUS USER", 148, 90, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("Has successfully navigated the portfolio of Muaaz Lattif.", 148, 110, { align: "center" });
    doc.text("Access granted to Super Mode.", 148, 120, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 190);
    doc.text("ID: MUA-PORT-V1", 250, 190);

    doc.save("muaaz-certificate.pdf");
  };

  return (
    <div className="text-center mt-12 p-8 border border-white/10 rounded-xl bg-surface/30">
      <h3 className="text-xl font-bold text-white mb-2">Claim Your Token</h3>
      <p className="text-muted-foreground mb-4">Generate a proof of visit.</p>
      <Button onClick={generatePDF} variant="outline" className="border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-white">
        <FaDownload className="mr-2 h-4 w-4" /> Download Certificate
      </Button>
    </div>
  );
}