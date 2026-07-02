import { zodResolver } from '@hookform/resolvers/zod'
import {
  BracesIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  Loader2Icon,
  MailIcon,
  RotateCcwIcon,
  SendIcon,
} from 'lucide-react'
import type * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  concepts,
  discriminatedUnionCode,
  formSchemaCode,
  hookFormCode,
  roleLabels,
  workflowNotes,
} from './react-hook-form-zod.data'

const workspaceInviteSchema = z.object({
  fullName: z.string().trim().min(2, 'Use at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  role: z.enum(['owner', 'admin', 'member'], {
    error: "Choose the teammate's role.",
  }),
  seats: z.coerce
    .number()
    .int('Seats must be a whole number.')
    .min(1, 'Invite at least 1 person.')
    .max(25, 'Keep one invite batch to 25 people.'),
  password: z
    .string()
    .min(8, 'Use at least 8 characters.')
    .regex(/[A-Z]/, 'Add one uppercase letter.')
    .regex(/[0-9]/, 'Add one number.'),
  notes: z
    .string()
    .trim()
    .max(160, 'Keep notes under 160 characters.')
    .optional(),
  acceptTerms: z.boolean().refine(Boolean, 'Confirm the workspace policy.'),
})

const contactSchema = z.discriminatedUnion('contactPreference', [
  z.object({
    contactPreference: z.literal('email'),
    email: z.string().trim().email('Enter a valid email.'),
    phone: z.string().optional(),
  }),
  z.object({
    contactPreference: z.literal('phone'),
    phone: z.string().trim().min(10, 'Enter at least 10 digits.'),
    email: z.string().optional(),
  }),
])

type WorkspaceInviteInput = z.input<typeof workspaceInviteSchema>
type WorkspaceInviteValues = z.output<typeof workspaceInviteSchema>
type ContactValues = z.infer<typeof contactSchema>

const inviteDefaults: WorkspaceInviteInput = {
  fullName: '',
  email: '',
  role: 'member',
  seats: 3,
  password: '',
  notes: '',
  acceptTerms: false,
}

const contactDefaults: ContactValues = {
  contactPreference: 'email',
  email: '',
  phone: '',
}

function ReactHookFormZodPage() {
  const [submittedInvite, setSubmittedInvite] =
    useState<WorkspaceInviteValues | null>(null)
  const [submittedContact, setSubmittedContact] =
    useState<ContactValues | null>(null)

  const inviteForm = useForm<
    WorkspaceInviteInput,
    unknown,
    WorkspaceInviteValues
  >({
    defaultValues: inviteDefaults,
    mode: 'onChange',
    resolver: zodResolver(workspaceInviteSchema),
  })
  const contactForm = useForm<ContactValues>({
    defaultValues: contactDefaults,
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
  })

  const inviteErrors = inviteForm.formState.errors
  const contactErrors = contactForm.formState.errors
  const contactPreference = contactForm.watch('contactPreference')

  async function handleInviteSubmit(values: WorkspaceInviteValues) {
    await wait(700)
    setSubmittedInvite(values)
  }

  async function handleContactSubmit(values: ContactValues) {
    await wait(400)
    setSubmittedContact(values)
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              React Hook Form + Zod
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Forms & Validation
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Build a performant form with registered fields, a Zod resolver,
            inferred TypeScript values, accessible errors, and a submit flow
            that reflects real form state.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {concepts.map((concept) => {
          const Icon = concept.icon

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={concept.title}
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h2 className="text-sm font-semibold">{concept.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {concept.description}
              </p>
            </article>
          )
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <Card className="gap-0 py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <ClipboardCheckIcon className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Example: Workspace Invite
              </span>
            </div>
            <Badge variant="outline">zodResolver</Badge>
          </div>
          <CardContent className="space-y-4 p-4">
            <form
              className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]"
              onSubmit={inviteForm.handleSubmit(handleInviteSubmit)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  error={inviteErrors.fullName?.message}
                  id="full-name"
                  label="Full name"
                >
                  <Input
                    aria-describedby={
                      inviteErrors.fullName ? 'full-name-error' : undefined
                    }
                    aria-invalid={Boolean(inviteErrors.fullName)}
                    id="full-name"
                    placeholder="Ada Lovelace"
                    {...inviteForm.register('fullName')}
                  />
                </FormField>

                <FormField
                  error={inviteErrors.email?.message}
                  id="email"
                  label="Email"
                >
                  <Input
                    aria-describedby={
                      inviteErrors.email ? 'email-error' : undefined
                    }
                    aria-invalid={Boolean(inviteErrors.email)}
                    id="email"
                    placeholder="ada@example.com"
                    type="email"
                    {...inviteForm.register('email')}
                  />
                </FormField>

                <FormField
                  error={inviteErrors.role?.message}
                  id="role"
                  label="Role"
                >
                  <select
                    aria-describedby={
                      inviteErrors.role ? 'role-error' : undefined
                    }
                    aria-invalid={Boolean(inviteErrors.role)}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                    id="role"
                    {...inviteForm.register('role')}
                  >
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField
                  error={inviteErrors.seats?.message}
                  id="seats"
                  label="Seats"
                >
                  <Input
                    aria-describedby={
                      inviteErrors.seats ? 'seats-error' : undefined
                    }
                    aria-invalid={Boolean(inviteErrors.seats)}
                    id="seats"
                    min={1}
                    type="number"
                    {...inviteForm.register('seats')}
                  />
                </FormField>

                <FormField
                  className="sm:col-span-2"
                  error={inviteErrors.password?.message}
                  id="password"
                  label="Temporary password"
                >
                  <Input
                    aria-describedby={
                      inviteErrors.password ? 'password-error' : undefined
                    }
                    aria-invalid={Boolean(inviteErrors.password)}
                    id="password"
                    placeholder="At least 8 chars, 1 uppercase, 1 number"
                    type="password"
                    {...inviteForm.register('password')}
                  />
                </FormField>

                <FormField
                  className="sm:col-span-2"
                  error={inviteErrors.notes?.message}
                  id="notes"
                  label="Invite note"
                >
                  <Textarea
                    aria-describedby={
                      inviteErrors.notes ? 'notes-error' : undefined
                    }
                    aria-invalid={Boolean(inviteErrors.notes)}
                    id="notes"
                    placeholder="Optional context for this teammate"
                    {...inviteForm.register('notes')}
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-2 rounded-lg border bg-muted/20 p-3 text-sm">
                    <input
                      aria-describedby={
                        inviteErrors.acceptTerms
                          ? 'accept-terms-error'
                          : undefined
                      }
                      aria-invalid={Boolean(inviteErrors.acceptTerms)}
                      className="mt-1 accent-primary"
                      type="checkbox"
                      {...inviteForm.register('acceptTerms')}
                    />
                    <span>
                      <span className="font-medium">
                        Confirm workspace policy
                      </span>
                      <span className="block text-xs leading-5 text-muted-foreground">
                        Required by the schema before the invite can submit.
                      </span>
                    </span>
                  </label>
                  <FieldError
                    id="accept-terms-error"
                    message={inviteErrors.acceptTerms?.message}
                  />
                </div>

                <div className="flex flex-wrap gap-2 sm:col-span-2">
                  <Button
                    disabled={inviteForm.formState.isSubmitting}
                    type="submit"
                  >
                    {inviteForm.formState.isSubmitting ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      <SendIcon />
                    )}
                    Send invite
                  </Button>
                  <Button
                    onClick={() => {
                      inviteForm.reset(inviteDefaults)
                      setSubmittedInvite(null)
                    }}
                    type="button"
                    variant="outline"
                  >
                    <RotateCcwIcon />
                    Reset
                  </Button>
                </div>
              </div>

              <FormStatePanel
                dirty={inviteForm.formState.isDirty}
                errors={Object.keys(inviteErrors).length}
                isValid={inviteForm.formState.isValid}
                submitCount={inviteForm.formState.submitCount}
                submittedValue={submittedInvite}
              />
            </form>

            <div className="min-w-0 border-t pt-4">
              <div className="mb-2 flex items-center gap-2">
                <BracesIcon className="size-4 text-primary" />
                <h2 className="text-sm font-semibold">workspaceInviteSchema</h2>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{formSchemaCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BracesIcon className="size-4 text-primary" />
                Integration Steps
              </CardTitle>
              <CardDescription>
                The wiring that makes the form type-safe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {workflowNotes.map((note) => (
                  <li className="flex gap-2" key={note}>
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <CodePanel code={hookFormCode} title="useForm + resolver" />
        </aside>
      </div>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="gap-0 py-0 xl:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <MailIcon className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Advanced: Discriminated Union
              </span>
            </div>
            <Badge variant="outline">conditional shape</Badge>
          </div>
          <CardContent className="grid gap-4 p-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="space-y-4">
              <form
                className="space-y-4"
                onSubmit={contactForm.handleSubmit(handleContactSubmit)}
              >
                <fieldset className="grid gap-2">
                  <legend className="text-sm font-medium">
                    Preferred contact method
                  </legend>
                  <label className="flex items-center gap-2 rounded-lg border bg-muted/20 p-3 text-sm">
                    <input
                      className="accent-primary"
                      type="radio"
                      value="email"
                      {...contactForm.register('contactPreference')}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border bg-muted/20 p-3 text-sm">
                    <input
                      className="accent-primary"
                      type="radio"
                      value="phone"
                      {...contactForm.register('contactPreference')}
                    />
                    Phone
                  </label>
                </fieldset>

                {contactPreference === 'email' ? (
                  <FormField
                    error={contactErrors.email?.message}
                    id="contact-email"
                    label="Email"
                  >
                    <Input
                      aria-describedby={
                        contactErrors.email ? 'contact-email-error' : undefined
                      }
                      aria-invalid={Boolean(contactErrors.email)}
                      id="contact-email"
                      placeholder="you@example.com"
                      {...contactForm.register('email')}
                    />
                  </FormField>
                ) : (
                  <FormField
                    error={contactErrors.phone?.message}
                    id="contact-phone"
                    label="Phone"
                  >
                    <Input
                      aria-describedby={
                        contactErrors.phone ? 'contact-phone-error' : undefined
                      }
                      aria-invalid={Boolean(contactErrors.phone)}
                      id="contact-phone"
                      placeholder="385 91 123 4567"
                      {...contactForm.register('phone')}
                    />
                  </FormField>
                )}

                <Button
                  className="w-full"
                  disabled={contactForm.formState.isSubmitting}
                  type="submit"
                >
                  {contactForm.formState.isSubmitting ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <CheckCircle2Icon />
                  )}
                  Validate contact
                </Button>
              </form>

              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Parsed union branch
                </p>
                <pre className="mt-2 max-h-40 overflow-auto text-xs leading-6">
                  <code>
                    {submittedContact
                      ? JSON.stringify(submittedContact, null, 2)
                      : 'Submit a valid contact preference.'}
                  </code>
                </pre>
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <BracesIcon className="size-4 text-primary" />
                <h2 className="text-sm font-semibold">
                  Discriminated union schema
                </h2>
              </div>
              <pre className="max-h-[28rem] overflow-auto rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{discriminatedUnionCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

type FormFieldProps = {
  children: React.ReactNode
  className?: string
  error?: string
  id: string
  label: string
}

function FormField({ children, className, error, id, label }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1">{children}</div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null
  }

  return (
    <p className="mt-1 text-xs font-medium text-destructive" id={id}>
      {message}
    </p>
  )
}

type FormStatePanelProps = {
  dirty: boolean
  errors: number
  isValid: boolean
  submitCount: number
  submittedValue: WorkspaceInviteValues | null
}

function FormStatePanel({
  dirty,
  errors,
  isValid,
  submitCount,
  submittedValue,
}: FormStatePanelProps) {
  return (
    <div className="space-y-3 rounded-lg border bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Live form state</h2>
        <Badge variant={isValid ? 'default' : 'outline'}>
          {isValid ? 'valid' : 'needs input'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <StateTile label="Dirty" value={dirty ? 'yes' : 'no'} />
        <StateTile label="Errors" value={String(errors)} />
        <StateTile label="Submits" value={String(submitCount)} />
        <StateTile label="Schema" value="Zod" />
      </div>

      <div className="rounded-md border bg-background p-3">
        <p className="text-xs font-medium text-muted-foreground">
          Parsed submit value
        </p>
        <pre className="mt-2 max-h-72 overflow-auto text-xs leading-6">
          <code>
            {submittedValue
              ? JSON.stringify(submittedValue, null, 2)
              : 'Submit a valid invite to see typed values.'}
          </code>
        </pre>
      </div>
    </div>
  )
}

function StateTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background p-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}

function CodePanel({
  className,
  code,
  title,
}: {
  className?: string
  code: string
  title: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BracesIcon className="size-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export { ReactHookFormZodPage }
