import { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../../api/userApi";
import { addDoctor } from "../../api/doctorApi";
import { useAuth } from "../../context/AuthContext";

const AddDoctor = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    mobile:"",
    password:"",
    specialization:"",
    department:"",
    designation:"junior",
    registrationNumber:""
  });

  const handleChange = (e:any) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    try{

      const userRes = await registerUser({
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        mobile:formData.mobile,
        password:formData.password,
        roleId:3,
        hospitalId:user?.hospitalId
      });

      const userId = userRes.data.data.id;

      await addDoctor({
        userId,
        specialization:formData.specialization,
        department:formData.department,
        designation:formData.designation as "junior" | "senior" | "consultant",
        registrationNumber:formData.registrationNumber
      });

      toast.success("Doctor added successfully");

      navigate("/doctor");

    }catch(error:any){

      const msg =
        error?.response?.data?.message ||
        "Something went wrong";

      toast.error(msg);

    }

  };

  return (

    <div className="container mt-4">

      <Card className="shadow-sm p-4 border-0">

        <h3 className="mb-4">Add New Doctor</h3>

        <Form onSubmit={handleSubmit}>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" required onChange={handleChange}/>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" required onChange={handleChange}/>
              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required onChange={handleChange}/>
          </Form.Group>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control name="mobile" required onChange={handleChange}/>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required onChange={handleChange}/>
              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control name="specialization" required onChange={handleChange}/>
          </Form.Group>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control name="department" required onChange={handleChange}/>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>

                <Form.Select name="designation" onChange={handleChange}>

                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="consultant">Consultant</option>

                </Form.Select>

              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control name="registrationNumber" required onChange={handleChange}/>
          </Form.Group>

          <div className="d-flex gap-2 mt-3">

            <Button type="submit" variant="primary">Save Doctor</Button>

            <Button
              variant="outline-secondary"
              onClick={()=>navigate("/doctor")}
            >
              Cancel
            </Button>

          </div>

        </Form>

      </Card>

      <ToastContainer position="top-right" autoClose={3000}/>

    </div>

  );

};

export default AddDoctor;