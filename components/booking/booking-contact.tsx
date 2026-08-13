import type { ContactDetails, ContactErrors } from "@/components/booking/booking-types";

export function validateContact(contact: ContactDetails): ContactErrors {
  const errors: ContactErrors = {};

  if (contact.firstName.trim().length < 2) {
    errors.firstName = "Indiquez au moins 2 caractères.";
  }
  if (contact.lastName.trim().length < 2) {
    errors.lastName = "Indiquez au moins 2 caractères.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
    errors.email = "Saisissez une adresse e-mail valide.";
  }
  if (contact.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Saisissez un numéro comportant au moins 10 chiffres.";
  }

  return errors;
}

export function BookingContact({
  contact,
  errors,
  onChange,
}: {
  contact: ContactDetails;
  errors: ContactErrors;
  onChange: (field: keyof ContactDetails, value: string) => void;
}) {
  const fields: Array<{
    id: keyof Pick<ContactDetails, "firstName" | "lastName" | "email" | "phone">;
    label: string;
    type: string;
    autoComplete: string;
    placeholder: string;
  }> = [
    { id: "firstName", label: "Prénom", type: "text", autoComplete: "given-name", placeholder: "Votre prénom" },
    { id: "lastName", label: "Nom", type: "text", autoComplete: "family-name", placeholder: "Votre nom" },
    { id: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "vous@exemple.fr" },
    { id: "phone", label: "Téléphone", type: "tel", autoComplete: "tel", placeholder: "Votre numéro" },
  ];

  return (
    <div>
      <p className="eyebrow">Étape 05</p>
      <h2 className="display-title mt-5 text-4xl leading-[0.9] sm:text-6xl">Vos coordonnées.</h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-smoke/65">
        Ces informations restent uniquement dans cette page et ne sont ni enregistrées ni transmises.
      </p>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="field-label">{field.label}</label>
            <input
              id={field.id}
              type={field.type}
              value={contact[field.id]}
              onChange={(event) => onChange(field.id, event.target.value)}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.id])}
              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              className="field-input"
              required
            />
            {errors[field.id] && (
              <p id={`${field.id}-error`} className="field-error">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="note" className="field-label">Note pour le professionnel · optionnel</label>
        <textarea
          id="note"
          value={contact.note}
          onChange={(event) => onChange("note", event.target.value)}
          rows={4}
          maxLength={500}
          className="field-input min-h-28 resize-y"
          placeholder="Une précision sur votre coupe, votre barbe ou vos habitudes…"
        />
      </div>
    </div>
  );
}
