import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
export function PartnerForm() {
  const [reviewed, setReviewed] = useState(false);
  return (
    <form
      className="partner-form"
      onSubmit={(event) => {
        event.preventDefault();
        setReviewed(true);
      }}
      onChange={() => setReviewed(false)}
    >
      <span className="eyebrow">HAGAMOS EQUIPO</span>
      <h3>Tu negocio puede ser parte.</h3>
      <p>Cuéntanos un poquito de tu panadería o pastelería.</p>
      <label htmlFor="business">Nombre del negocio</label>
      <input
        id="business"
        name="business"
        required
        minLength={2}
        maxLength={100}
        placeholder="¿Cómo se llama tu negocio?"
        autoComplete="organization"
      />
      <label htmlFor="contact">Correo de contacto</label>
      <input
        id="contact"
        name="contact"
        type="email"
        required
        maxLength={254}
        placeholder="hola@tunegocio.pe"
        autoComplete="email"
      />
      <label htmlFor="district">Zona de Ayacucho</label>
      <select id="district" name="district" required defaultValue="">
        <option value="" disabled>
          Selecciona una zona
        </option>
        <option>Huamanga</option>
        <option>San Juan Bautista</option>
        <option>Carmen Alto</option>
        <option>Jesús Nazareno</option>
        <option>Otra zona</option>
      </select>
      <p className="form-note">
        Formulario de demostración: tus datos no se envían ni se guardan.
      </p>
      <button className="button primary" type="submit">
        Validar mis datos <ArrowUpRight size={19} />
      </button>
      {reviewed && (
        <p role="status" className="form-status">
          <CheckCircle2 size={20} /> Datos válidos. No se enviaron; el registro
          de aliados aún no está habilitado.
        </p>
      )}
    </form>
  );
}
