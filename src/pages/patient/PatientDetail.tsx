import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Badge, Table, ListGroup, Spinner } from "react-bootstrap";
import { getPatientDetail } from "../../api/patientApi";
import { ArrowBack, History, LocalHospital, Receipt, Person } from "@mui/icons-material";
import { Button } from "@mui/material";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getPatientDetail(Number(id));
        setPatient(res.data.data);
      } catch (err) {
        console.error("Failed to fetch patient details", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;
  if (!patient) return <div className="text-center p-5"><h4>Patient not found.</h4></div>;

  return (
    <div className="p-4 bg-light min-vh-100">
      <Button startIcon={<ArrowBack />} onClick={() => navigate("/patient")} sx={{ mb: 3 }}>
        Back to List
      </Button>

      <Row>
        <Col lg={4}>
          <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
            <Card.Body className="text-center p-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px" }}>
                <Person sx={{ fontSize: 35 }} />
              </div>
              <h4 className="fw-bold">{patient.name}</h4>
              <p className="text-muted">Hospital ID: {patient.hospitalId}</p>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Badge bg="info">{patient.gender}</Badge>
                <Badge bg="dark">{patient.age} Years</Badge>
              </div>
              <ListGroup variant="flush" className="text-start">
                <ListGroup.Item><strong>Phone:</strong> {patient.phone}</ListGroup.Item>
                <ListGroup.Item><strong>Address:</strong> {patient.address}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Medical Records (mapped from patient.medical) */}
          <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
            <Card.Header className="bg-white fw-bold d-flex align-items-center text-danger pt-3 border-0">
              <LocalHospital className="me-2" /> Medical Diagnosis & Treatment
            </Card.Header>
            <Card.Body>
              {patient.medical?.map((m: any) => (
                <div key={m.id} className="mb-3 p-3 bg-light rounded">
                  <Row>
                    <Col md={6}><strong>Chief Complaint:</strong> {m.chiefComplaint}</Col>
                    <Col md={6}><strong>Diagnosis:</strong> {m.diagnosis}</Col>
                    <Col md={6}><strong>Medications:</strong> {m.medications || "N/A"}</Col>
                    <Col md={6}><strong>Room:</strong> {m.roomNumber || "N/A"}</Col>
                    <Col md={12} className="mt-2"><strong>Treatment Plan:</strong> {m.treatmentPlan || "Pending doctor update"}</Col>
                  </Row>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Billing (mapped from patient.amount) */}
          <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
            <Card.Header className="bg-white fw-bold d-flex align-items-center text-success pt-3 border-0">
              <Receipt className="me-2" /> Billing Information
            </Card.Header>
            <Card.Body>
              <Table borderless size="sm">
                <thead>
                  <tr className="text-muted small">
                    <th>Initial</th>
                    <th>Approval</th>
                    <th>Final</th>
                    <th>Received</th>
                    <th>Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.amount?.map((a: any) => (
                    <tr key={a.id} className="fw-bold">
                      <td>₹{a.initialAmount}</td>
                      <td>₹{a.approvalAmount || 0}</td>
                      <td>₹{a.finalAmount || 0}</td>
                      <td className="text-success">₹{a.receivedAmount || 0}</td>
                      <td className="text-danger">₹{a.discount || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* History */}
          <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <Card.Header className="bg-white fw-bold d-flex align-items-center pt-3 border-0">
              <History className="me-2 text-primary" /> Activity Log
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <tbody>
                  {patient.histories?.map((h: any) => (
                    <tr key={h.id}>
                      <td width="20%">{new Date(h.createdAt).toLocaleDateString()}</td>
                      <td width="20%"><Badge bg="warning">{h.status}</Badge></td>
                      <td>{h.note}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientDetail;