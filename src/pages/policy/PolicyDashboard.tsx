import React, { useEffect, useState } from "react";
import {
  getPolicies,
  deletePolicy,
} from "../../api/policyApi";
import { Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Policy {
  id: number;
  policyNumber: string;
  policyType: string;
  sumAssured: string;
  premium: string;
  startDate: string;
  endDate: string;
  status: string;
  user: { firstName: string; lastName: string; email: string; mobile: string };
  insurer: { firstName: string; lastName: string; email: string; mobile: string };
}

const PolicyDashboard: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const fetchPolicies = async () => {
    const res = await getPolicies(search, statusFilter);
    setPolicies(res.data.data.policies);
  };

  useEffect(() => {
    fetchPolicies();
  }, [search, statusFilter]);

  const handleDelete = async (id: number) => {
    await deletePolicy(id);
    fetchPolicies();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Policy Management</h3>
        <Button variant="primary" onClick={() => navigate("/policies/create")}>
          + ADD POLICY
        </Button>
      </div>

      {/* 🔍 Search & Filter */}
      <div className="d-flex mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Search by Policy Number or User Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </Form.Select>
      </div>

      {/* 📋 Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Policy No</th>
            <th>Type</th>
            <th>Sum Assured</th>
            <th>Premium</th>
            <th>Status</th>
            <th>User</th>
            <th>Insurer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.id}>
              <td>{p.policyNumber}</td>
              <td>{p.policyType}</td>
              <td>{p.sumAssured}</td>
              <td>{p.premium}</td>
              <td>{p.status}</td>
              <td>
                {p.user?.firstName} {p.user?.lastName} <br />
                {p.user?.email} <br />
                {p.user?.mobile}
              </td>
              <td>
                {p.insurer?.firstName} {p.insurer?.lastName} <br />
                {p.insurer?.email} <br />
                {p.insurer?.mobile}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/policies/edit/${p.id}`)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑️ Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PolicyDashboard;
