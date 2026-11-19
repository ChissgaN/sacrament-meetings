'use client';

import { useActionState, type ReactNode } from 'react';
import Link from 'next/link';
import { MEETING_TYPE_LABELS } from '@/lib/meeting-display';
import {
  MEETING_TYPES,
  meetingToFormValues,
  type MeetingFormField,
  type MeetingFormState,
  type MeetingFormValues,
} from '@/lib/meeting-form';
import type { SacramentMeeting } from '@/lib/types';

type MeetingFormAction = (
  state: MeetingFormState,
  formData: FormData,
) => Promise<MeetingFormState>;

interface MeetingFormProps {
  action: MeetingFormAction;
  meeting?: SacramentMeeting;
  submitLabel: string;
  cancelHref: string;
}

const initialState: MeetingFormState = { message: null, errors: {}, values: null };

const inputClasses =
  'w-full rounded-md border border-muted bg-surface px-3 py-2 aria-[invalid=true]:border-red-700';

/** Error container below each field. aria-live announces new errors. */
function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ))}
    </div>
  );
}

interface FieldProps {
  id: MeetingFormField;
  label: string;
  errors?: string[];
  hint?: string;
  children: (describedBy: string, invalid: boolean) => ReactNode;
}

function Field({ id, label, errors, hint, children }: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, `${id}-error`].filter(Boolean).join(' ');
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children(describedBy, Boolean(errors?.length))}
      <FieldErrors id={id} errors={errors} />
    </div>
  );
}

function HymnFields({
  hymn,
  legend,
  values,
  errors,
}: {
  hymn: 'opening' | 'sacrament' | 'closing';
  legend: string;
  values: MeetingFormValues;
  errors: MeetingFormState['errors'];
}) {
  const numberId = `${hymn}HymnNumber` as const;
  const titleId = `${hymn}HymnTitle` as const;

  return (
    <fieldset className="grid gap-3 sm:grid-cols-[8rem_1fr]">
      <legend className="mb-1 font-semibold">{legend}</legend>
      <Field id={numberId} label="Number" errors={errors[numberId]}>
        {(describedBy, invalid) => (
          <input
            id={numberId}
            name={numberId}
            type="number"
            inputMode="numeric"
            min={1}
            max={9999}
            defaultValue={values[numberId]}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputClasses}
          />
        )}
      </Field>
      <Field id={titleId} label="Title" errors={errors[titleId]}>
        {(describedBy, invalid) => (
          <input
            id={titleId}
            name={titleId}
            type="text"
            defaultValue={values[titleId]}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputClasses}
          />
        )}
      </Field>
    </fieldset>
  );
}

function TextField({
  id,
  label,
  values,
  errors,
  hint,
}: {
  id: MeetingFormField;
  label: string;
  values: MeetingFormValues;
  errors: MeetingFormState['errors'];
  hint?: string;
}) {
  return (
    <Field id={id} label={label} errors={errors[id]} hint={hint}>
      {(describedBy, invalid) => (
        <input
          id={id}
          name={id}
          type="text"
          defaultValue={values[id]}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={inputClasses}
        />
      )}
    </Field>
  );
}

function TextAreaField({
  id,
  label,
  values,
  errors,
  hint,
}: {
  id: MeetingFormField;
  label: string;
  values: MeetingFormValues;
  errors: MeetingFormState['errors'];
  hint: string;
}) {
  return (
    <Field id={id} label={label} errors={errors[id]} hint={hint}>
      {(describedBy, invalid) => (
        <textarea
          id={id}
          name={id}
          rows={4}
          defaultValue={values[id]}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={inputClasses}
        />
      )}
    </Field>
  );
}

const EMPTY_VALUES: MeetingFormValues = {
  date: '',
  meetingType: 'regular',
  presiding: '',
  conducting: '',
  announcements: '',
  openingHymnNumber: '',
  openingHymnTitle: '',
  openingPrayer: '',
  wardBusiness: '',
  stakeBusiness: '',
  sacramentHymnNumber: '',
  sacramentHymnTitle: '',
  speakers: '',
  closingHymnNumber: '',
  closingHymnTitle: '',
  closingPrayer: '',
};

export default function MeetingForm({ action, meeting, submitLabel, cancelHref }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const { errors } = state;
  // After a failed submit, React resets the form to these defaults, so they
  // must hold what the user typed rather than the original record.
  const values = state.values ?? (meeting ? meetingToFormValues(meeting) : EMPTY_VALUES);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="rounded-md bg-red-50 p-3 font-semibold text-red-800 ring-1 ring-red-200">
            {state.message}
          </p>
        )}
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <Field id="date" label="Date" errors={errors.date}>
          {(describedBy, invalid) => (
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={values.date}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClasses}
            />
          )}
        </Field>
        <Field id="meetingType" label="Meeting type" errors={errors.meetingType}>
          {(describedBy, invalid) => (
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={values.meetingType}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClasses}
            >
              {MEETING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {MEETING_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          )}
        </Field>
        <TextField id="presiding" label="Presiding" values={values} errors={errors} />
        <TextField id="conducting" label="Conducting" values={values} errors={errors} />
      </section>

      <p className="text-sm text-muted">
        Hymns and prayers are required for sacrament meetings and optional for stake and general
        conferences.
      </p>

      <TextAreaField
        id="announcements"
        label="Announcements"
        hint="One announcement per line."
        values={values}
        errors={errors}
      />

      <HymnFields hymn="opening" legend="Opening hymn" values={values} errors={errors} />
      <TextField id="openingPrayer" label="Opening prayer" values={values} errors={errors} />

      <TextAreaField
        id="wardBusiness"
        label="Ward business"
        hint="One item per line, for example: Sustain Sister Jane Doe as Primary teacher."
        values={values}
        errors={errors}
      />
      <div>
        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={values.stakeBusiness === 'on'}
            aria-describedby="stakeBusiness-error"
            className="size-5"
          />
          <label htmlFor="stakeBusiness" className="font-semibold">
            Stake business will be conducted
          </label>
        </div>
        <FieldErrors id="stakeBusiness" errors={errors.stakeBusiness} />
      </div>

      <HymnFields hymn="sacrament" legend="Sacrament hymn" values={values} errors={errors} />

      <TextAreaField
        id="speakers"
        label="Speakers and musical numbers"
        hint='One per line, in program order: "Name | Topic". For a musical number: "Performer | Piece | music".'
        values={values}
        errors={errors}
      />

      <HymnFields hymn="closing" legend="Closing hymn" values={values} errors={errors} />
      <TextField id="closingPrayer" label="Closing prayer" values={values} errors={errors} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-md bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
        <Link href={cancelHref} className="font-semibold text-primary underline underline-offset-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}
