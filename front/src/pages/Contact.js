import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/pages/Contact.css';

const Contact = (props) => {

    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const response = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if (response.data.error === false) {
            setFormData(initialForm)
        }
    }


    return (
        <div id="contacto" className="contacto">
            <div>

                <form onSubmit={handleSubmit}>
                    <input name="nombre" type="text" class="feedback-input" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                    <input name="email" type="text" class="feedback-input" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input name="telefono" type="text" class="feedback-input" placeholder="Telefono" value={formData.telefono} onChange={handleChange} />
                    <textarea name="mensaje" class="feedback-input" placeholder="Comentario" value={formData.mensaje} onChange={handleChange}></textarea>
                    <input type="submit" value="Contactar" />
                </form>
                {sending ? <p>Enviando...</p> : null}
                {msg ? <p>{msg}</p> : null}
            </div>

            <div className="datos">
                <h1>Otros Medios</h1>
                <p>También puede contactarse con nosotros usando los siguientes medios</p>
                <ul>
                    <li>Telefono: <span>45678905</span></li>
                    <li>Email: <span>contacto@gmail.com</span></li>
                    <li>Facebook: <span>CoffeeTime</span></li>
                    <li>Twitter: <span>@CoffeeTime</span></li>
                    <li>Instagram: <span>Coffee_Time</span></li>
                </ul>
            </div>

        </div>
    )
}

export default Contact