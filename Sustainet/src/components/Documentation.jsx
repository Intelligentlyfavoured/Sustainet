import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";

const DOCUMENTS_API = "https://your-api-endpoint.com/documents";

const Documentation = () => {
  const [documents, setDocuments] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(DOCUMENTS_API);
      const data = await response.json();
      setDocuments(data);
      
      const pendingDocs = data.filter((doc) => doc.status === "Pending").length;
      setNotifications(pendingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);

      // Dummy Data for Testing
      const dummyDocs = [
        {
          id: "DOC-001",
          name: "Invoice #001",
          type: "Invoice",
          status: "Pending",
          owner: "John Doe",
          created_at: "2025-02-08",
          progressPath: ["Submitted", "Review", "Finance"],
          rejectionStage: null,
          rejectionComment: null,
        },
        {
          id: "DOC-002",
          name: "Contract #A1",
          type: "Contract",
          status: "Approved",
          owner: "Jane Smith",
          created_at: "2025-02-07",
          progressPath: ["Submitted", "Review", "Finance", "Approval"],
          rejectionStage: null,
          rejectionComment: null,
        },
        {
          id: "DOC-003",
          name: "Report Q1",
          type: "Report",
          status: "Rejected",
          owner: "Mike Brown",
          created_at: "2025-02-06",
          progressPath: ["Submitted", "Review"],
          rejectionStage: "Finance",
          rejectionComment: "Insufficient budget allocation",
        },
      ];
      setDocuments(dummyDocs);
      setNotifications(dummyDocs.filter((doc) => doc.status === "Pending").length);
    }
  };

  const openModal = (doc) => setSelectedDocument(doc);
  const closeModal = () => setSelectedDocument(null);

  const filteredDocuments = documents.filter((doc) =>
    Object.values(doc).some((value) =>
      value?.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="reviewer-container">
      <Sidebar />
      <div className="reviewer-content">
        <h2>Post-Payment Documentation</h2>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Filter documents..."
            onChange={(e) => setFilterText(e.target.value)}
            className="filter-input"
          />
          <div className="notification-icon">
            <FaBell title="Notifications" size="1.5rem" />
            <span className="notif-count">{notifications}</span>
          </div>
        </div>

        <div className="document-table">
          <table>
            <thead>
              <tr>
                <th>Document ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length === 0 ? (
                <tr><td colSpan="7">No matching documents found</td></tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.id}</td>
                    <td>{doc.name}</td>
                    <td>{doc.type}</td>
                    <td>
                      <span className={`status-badge ${doc.status.toLowerCase()}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td>{doc.owner}</td>
                    <td>{doc.created_at}</td>
                    <td>
                      <button className="preview-btn" onClick={() => openModal(doc)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedDocument && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>X</button>
              <h3>Document Details</h3>
              <p><strong>ID:</strong> {selectedDocument.id}</p>
              <p><strong>Name:</strong> {selectedDocument.name}</p>
              <p><strong>Type:</strong> {selectedDocument.type}</p>
              <p><strong>Status:</strong> {selectedDocument.status}</p>
              <p><strong>Owner:</strong> {selectedDocument.owner}</p>
              <p><strong>Created At:</strong> {selectedDocument.created_at}</p>

              {/* Tracking Progress */}
              <h4>Processing Path</h4>
              <ul className="progress-path">
                {selectedDocument.progressPath.map((stage, index) => (
                  <li key={index} className="passed-stage">
                    ✅ {stage}
                  </li>
                ))}
              </ul>

              {/* Rejection Details */}
              {selectedDocument.status === "Rejected" && (
                <>
                  <h4>Rejection Details</h4>
                  <p><strong>Rejected At:</strong> {selectedDocument.rejectionStage}</p>
                  <p><strong>Reason:</strong> {selectedDocument.rejectionComment}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentation;