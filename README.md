# ScanLedger

**ScanLedger** is a blockchain-based receipt scanning and expense tracking system designed to automate financial record-keeping, improve transparency, and reduce administrative overhead for organizations such as NGOs, small businesses, and logistics-heavy teams.

---

## Table of Contents
- [Problem](#problem)  
- [Solution](#solution)  
- [Key Features](#key-features)  
- [Architecture](#architecture)  
- [Blockchain Integration](#blockchain-integration)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Future Work](#future-work)  

---

## Problem

Organizations often rely on manual processes to record and manage financial expenses:

- Receipt data is entered manually, which is time-consuming and error-prone  
- Lost or damaged receipts make audits difficult  
- Poor visibility into spending patterns slows decision-making  
- Compliance and accountability risks arise, especially for NGOs and donor-funded organizations  

These challenges create unnecessary administrative headaches and reduce operational efficiency.

---

## Solution

ScanLedger automates receipt management and expense tracking:

- **Receipt scanning:** Capture receipts using a phone camera or file upload  
- **Automated data extraction:** Extract key details like date, vendor, total, and line items via OCR  
- **Immutable record-keeping:** Anchor confirmed receipts on the Cardano blockchain for audit-proof traceability  
- **Admin dashboards:** Visualize expenditures, timelines, and trends  
- **Privacy-conscious:** Sensitive data is encrypted before being stored on-chain  

This eliminates tedious manual entry, reduces errors, and provides a trustworthy, tamper-resistant financial record.

---

## Key Features

- Receipt capture via camera or upload  
- OCR-based data extraction (vendor, amount, date, items)  
- Admin confirmation workflow for accuracy  
- Immutable blockchain proof of each confirmed receipt  
- Expense dashboards with summaries and timelines  
- Future-proof record management for audits and reporting  

---

## Architecture

**High-Level Flow:**

1. **Receipt Capture:** Users upload or capture receipts via frontend (Next.js).  
2. **OCR & Parsing:** Backend (FastAPI) extracts structured data from images.  
3. **Admin Confirmation:** Users validate extracted data before submission.  
4. **Hash Generation:** Receipt image + confirmed data is hashed (SHA-256).  
5. **Blockchain Anchoring:** Hash and metadata (encrypted) are stored as Cardano transaction metadata.  
6. **Dashboard & Audit:** Users view and verify receipts; auditors can verify integrity using blockchain transaction IDs.  

**Data Lifecycle:**

- **Raw Upload → OCR Extraction → Admin Confirmation → Hashing → Blockchain Anchoring → Dashboard / Verification**

---

## Blockchain Integration

ScanLedger leverages **Cardano** to provide immutable proof of receipts:

- Only **cryptographic hashes** and encrypted metadata are stored on-chain  
- Blockchain acts as a permanent, tamper-proof audit trail  
- Receipt IDs map directly to blockchain transaction IDs  
- Admins and auditors can verify receipt integrity independently using blockchain data  
- Sensitive data (vendor, amount, admin info) is encrypted to ensure privacy  

This ensures accountability and transparency without storing sensitive information publicly.

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Backend:** FastAPI (Python), REST API, async processing  
- **Database:** PostgreSQL  
- **Cache:** Redis  
- **OCR:** Tesseract OCR (Python)  
- **Storage:** Local filesystem or MinIO/S3  
- **Blockchain:** Cardano (metadata anchoring), Blockfrost API  
- **Containerization:** Docker & Docker Compose  

---

## Getting Started

### Prerequisites

- Docker & Docker Compose  
- Node.js & npm  
- Python 3.11+  
- Git & SSH access to repo  

### Run Locally

```bash
# Clone repo
git clone git@github.com-bmwangi:bmwangi-dev/ScanLedger.git
cd ScanLedger

# Build and start containers
docker-compose up --build

# Backend API available at http://localhost:8000
# Frontend available at http://localhost:3000
