import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import FormContainer from '../components/FormContainer'


const ShippingScreen = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const submitHandler = () => {
        e.preventDefault();
        console.log('subimt');
    }

  return (
    <FormContainer>
        <h1>Expediere</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="my-2">
                <Form.Label>Adresă: </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Adaugă adresa'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="my-2">
                <Form.Label>Oraș: </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Adaugă orașul'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode" className="my-2">
                <Form.Label>Cod poștal:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Adaugă codul poștal'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="my-2">
                <Form.Label>Cod poștal:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Adaugă codul poștal'
                    value={country}
                    required
                    onChange={(e) => setcountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
