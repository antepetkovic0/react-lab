import {
  CheckCircle2Icon,
  FileCode2Icon,
  ShieldCheckIcon,
  SplitIcon,
} from 'lucide-react'

export const concepts = [
  {
    title: 'Schema first',
    icon: ShieldCheckIcon,
    description:
      'Write the valid shape once in Zod, then let the resolver turn parse results into React Hook Form field errors.',
  },
  {
    title: 'Types follow validation',
    icon: FileCode2Icon,
    description:
      'Infer FormValues from the schema so submit handlers and UI code stay aligned with validation rules.',
  },
  {
    title: 'Accessible feedback',
    icon: CheckCircle2Icon,
    description:
      'Connect each input to a focused error message with aria-invalid and aria-describedby.',
  },
  {
    title: 'Conditional shapes',
    icon: SplitIcon,
    description:
      'Use a discriminated union when one field decides which other fields are required.',
  },
]

export const workflowNotes = [
  'useForm owns field registration, touched state, dirty state, validation timing, and submit state.',
  'zodResolver(schema) is the adapter that maps Zod issues into formState.errors.',
  "mode: 'onChange' updates isValid while the learner edits; submit-only validation is often quieter in production.",
  'Discriminated unions work best when the discriminator is a real form field such as contactPreference or accountType.',
]

export const formSchemaCode = `const workspaceInviteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Use at least 2 characters."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),
  role: z.enum(["owner", "admin", "member"], {
    error: "Choose the teammate's role.",
  }),
  seats: z.coerce
    .number()
    .int("Seats must be a whole number.")
    .min(1, "Invite at least 1 person.")
    .max(25, "Keep one invite batch to 25 people."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Z]/, "Add one uppercase letter.")
    .regex(/[0-9]/, "Add one number."),
  notes: z
    .string()
    .trim()
    .max(160, "Keep notes under 160 characters.")
    .optional(),
  acceptTerms: z
    .boolean()
    .refine(Boolean, "Confirm the workspace policy."),
});

type WorkspaceInviteValues = z.infer<typeof workspaceInviteSchema>;`

export const hookFormCode = `const form = useForm<WorkspaceInviteValues>({
  resolver: zodResolver(workspaceInviteSchema),
  mode: "onChange",
  defaultValues: {
    fullName: "",
    email: "",
    role: "member",
    seats: 3,
    password: "",
    notes: "",
    acceptTerms: false,
  },
});

async function onSubmit(values: WorkspaceInviteValues) {
  await saveInvite(values);
}`

export const fieldErrorCode = `<Input
  aria-describedby={errors.email ? "email-error" : undefined}
  aria-invalid={Boolean(errors.email)}
  placeholder="teammate@example.com"
  {...register("email")}
/>

{errors.email ? (
  <p className="text-sm text-destructive" id="email-error">
    {errors.email.message}
  </p>
) : null}`

export const discriminatedUnionCode = `const contactSchema = z.discriminatedUnion("contactPreference", [
  z.object({
    contactPreference: z.literal("email"),
    email: z.string().trim().email("Enter a valid email."),
    phone: z.string().optional(),
  }),
  z.object({
    contactPreference: z.literal("phone"),
    phone: z.string().trim().min(10, "Enter at least 10 digits."),
    email: z.string().optional(),
  }),
]);

type ContactValues = z.infer<typeof contactSchema>;

// The selected contactPreference chooses which object shape is valid.
// No extra if/else validation is needed in onSubmit.`

export const roleLabels = {
  owner: 'Owner',
  admin: 'Admin',
  member: 'Member',
} as const
