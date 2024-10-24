import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";

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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList"
        );
        
        if (response.data && Array.isArray(response.data.data)) {
          setCountries(response.data.data); 
        } else {
          setCountries([]); 
        }
      } catch (error) {
        console.error("Error fetching countries list", error);
        setCountries([]); 
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${selectedCountry}`
          );
          if (response.data && Array.isArray(response.data.data)) {
            setStates(response.data.data); 
          } else {
            setStates([]); 
          }
        } catch (error) {
          console.error("Error fetching states list", error);
          setStates([]); 
        }
      };
      fetchStates();
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-State?stateId=${selectedState}`
          );
          if (response.data && response.data.data && Array.isArray(response.data.data.cityList)) {
            setCities(response.data.data.cityList); 
          } else {
            setCities([]); 
          }
        } catch (error) {
          console.error("Error fetching cities list", error);
          setCities([]); 
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedState]);

  return (
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
    <Form  noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control required type="text" placeholder="Supplier Name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Company Name</Form.Label>
          <Form.Control required type="text" placeholder="Company Name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries && countries.length > 0 && countries.map((country) => (
              <option key={country.countryId} value={country.countryId}>
                {country.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a country.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomState">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            required
          >
            <option value="">Select State</option>
            {states && states.length > 0 && states.map((state) => (
              <option key={state.stateId} value={state.stateId}>
                {state.stateName}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            required
          >
            <option value="">Select City</option>
            {cities && cities.length > 0 && cities.map((city) => (
              <option key={city.cityId} value={city.cityId}>
                {city.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Submit form</Button>
    </Form>
    </div>
  );
}

export default FormExample;
