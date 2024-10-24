import Form from 'react-bootstrap/Form';

function CheckInlineExample() {
  return (
    <Form>
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="item"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="supplier"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
        
        </div>
      ))}
    </Form>
  );
}

export default CheckInlineExample;