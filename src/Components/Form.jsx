import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';




function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Item name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Item name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Quantity name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
           
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Unit Price</Form.Label>
          <Form.Control type="text" placeholder="Unit Price" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Date of Submission</Form.Label>
          <Form.Control type="Date" placeholder="Date of Submission" required />
          <Form.Control.Feedback type="invalid">
          Date of Submission
          </Form.Control.Feedback>
        </Form.Group>
     
      </Row>
      
      <Button type="submit">Submit form</Button>
    </Form>
    </div>
  );
}

export default FormExample;