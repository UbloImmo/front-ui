import { fn } from "@storybook/test";
import { isArray, objectFromEntries } from "@ubloimmo/front-util";
import { useMemo, useState } from "react";
import { z } from "zod";

import { Form } from "./Form.component";
import { Button } from "../Button";
import { Callout } from "../Callout";
import { DialogProvider, useDialog } from "../Dialog";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { Tooltip } from "../Tooltip";
import { isFormField } from "./Form.utils";

import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout, GridItem, GridLayout } from "@layouts";
import { clamp, useMergedProps, useStatic } from "@utils";

import type {
  FormProps,
  FormData,
  FormContent,
  CustomFormInputProps,
} from "./Form.types";
import type { Meta, StoryObj } from "@storybook/react";

const addressSchema = z.object({
  number: z.number().nullish(),
  street: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  coordinates: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullish(),
});

type Address = z.infer<typeof addressSchema>;

const addressData: FormData<Address> = {
  number: 1,
  street: "Main Street",
  city: "New York",
  zipCode: "12345",
  country: "US",
  coordinates: {
    latitude: 40.7128,
    longitude: -74.006,
  },
};

const addressFormProps: FormProps<Address> = {
  schema: addressSchema,
  query: addressData,
  onSubmit: fn(),
  title: "Address",
  icon: "GeoAlt",
  content: [
    {
      type: "text",
      source: "street",
      label: "Street",
    },
    {
      type: "number",
      source: "number",
      label: "Street number",
    },
    "divider",
    {
      kind: "text",
      content: "A simple text field",
      size: "m",
      weight: "bold",
      color: "primary-dark",
      italic: true,
    },
    {
      type: "text",
      source: "zipCode",
      label: "Zip code",
    },
    {
      type: "text",
      source: "city",
      label: "City",
    },
    {
      type: "select",
      source: "country",
      label: "Country",
      options: [
        {
          label: "France",
          value: "FR",
        },
        {
          label: "Italy",
          value: "IT",
        },
        {
          label: "Germany",
          value: "DE",
        },
        {
          label: "United States of America",
          value: "US",
        },
      ],
      layout: {
        size: 2,
      },
    },
  ],
};

const componentSource = componentSourceFactory<FormProps<object>>(
  "Form",
  {
    title: "Form",
  },
  Form.defaultProps
);

const meta = {
  component: Form,
  title: "Components/Form/Stories",
  decorators: [
    (Story) => (
      <DialogProvider portalRoot="#dialog-root">
        <Story />
      </DialogProvider>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: addressFormProps as FormProps<object>,
  parameters: {
    docs: componentSource([addressFormProps as FormProps<object>]),
  },
};

const identitySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  numberOfChildren: z.number().nullish(),
  contact: z
    .object({
      email: z.string().email(),
      phone: z.string(),
    })
    .nullish(),
  professionalInfo: z
    .object({
      role: z.string().nullish(),
    })
    .nullish(),
  isCitizen: z.boolean(),
  maritalStatus: z.enum(["single", "married", "widowed", "divorced"]),
  icon: z.enum(["Square", "Triangle", "Circle"]),
});

type Identity = z.output<typeof identitySchema>;

const formData: FormData<Identity> = {
  firstName: "John",
  lastName: "Doe",
  contact: {
    email: "k6bqg@example.com",
    phone: "+33 6 00 00 00 00",
  },
  icon: "Square",
};

const identityFormProps: FormProps<Identity> = {
  query: () => formData,
  schema: identitySchema,
  title: "Identity",
  onSubmit: fn(),
  badge: {
    label: "Verified",
    color: "success",
  },
  readonly: false,
  defaultValues: {
    firstName: "John",
    lastName: "Doe",
    icon: "Square",
  },
  content: [
    {
      type: "text",
      source: "firstName",
      label: "First name",
      errorText: "Test",
      tooltip: {
        content: "Je suis un tooltip",
      },
    },
    {
      type: "text",
      source: "lastName",
      label: "Last name",
      errorText: "Ceci est une erreur",
    },
    {
      type: "text",
      source: "professionalInfo.role",
      label: "Job title",
    },
    {
      type: "date",
      source: "dateOfBirth",
      label: "Date of birth",
      placeholder: "Date of birth",
    },
    "divider",
    {
      type: "combobox",
      source: "isCitizen",
      label: "Citizenship",
      options: [
        {
          label: "Citizen",
          value: true,
        },
        {
          label: "Foreigner",
          value: false,
        },
      ],
      columns: 2,
      layout: {
        size: 2,
      },
    },
    "divider",
    {
      label: "Marital status",
      source: "maritalStatus",
      type: "select",
      options: [
        {
          label: "Married",
          value: "married",
        },
        {
          label: "Single",
          value: "single",
        },
        {
          label: "Divorced",
          value: "divorced",
        },
        {
          label: "Widow",
          value: "widowed",
        },
      ],
    },
    {
      label: "Number of children",
      source: "numberOfChildren",
      type: "number",
    },
    {
      label: "Contact info",
    },
    {
      type: "email",
      source: "contact.email",
      label: "Email address",
    },
    {
      type: "phone",
      source: "contact.phone",
      label: "Phone number",
    },
    {
      type: "icon-picker",
      source: "icon",
      label: "Pick an icon",
      icons: ["Square", "Triangle", "Circle"],
    },
  ],
};

type FormStoryProps = Omit<
  FormProps<object>,
  "schema" | "query" | "defaultValues" | "content"
>;

export const Contents = (props: FormStoryProps) => {
  return (
    <GridLayout columns={2} gap={"s-8"}>
      <GridItem fill>
        <Form {...props} {...addressFormProps} />
      </GridItem>
      <GridItem fill>
        <Form {...props} {...identityFormProps} />
      </GridItem>
    </GridLayout>
  );
};
Contents.parameters = {
  docs: componentSource([
    addressFormProps as FormProps<object>,
    identityFormProps as FormProps<object>,
  ]),
};

export const EditStates = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(addressFormProps, props);

  return (
    <GridLayout columns={2} gap={"s-8"}>
      <GridItem fill>
        <Form {...mergedProps} />
      </GridItem>
      <GridItem fill>
        <Form {...mergedProps} readonly />
      </GridItem>
      <GridItem fill>
        <Form {...mergedProps} defaultEditing />
      </GridItem>
      <GridItem fill>
        <Form {...mergedProps} disabled defaultEditing />
      </GridItem>
    </GridLayout>
  );
};
EditStates.parameters = {
  docs: componentSource([
    addressFormProps as FormProps<object>,
    { ...addressFormProps, readonly: true } as FormProps<object>,
    { ...addressFormProps, defaultEditing: true } as FormProps<object>,
    {
      ...addressFormProps,
      disabled: true,
      defaultEditing: true,
    } as FormProps<object>,
  ]),
};

export const Validation = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(addressFormProps, props);

  return (
    <GridLayout columns={2} gap={"s-8"}>
      <GridItem fill>
        <Form {...mergedProps} />
      </GridItem>
      <GridItem fill>
        <Form {...mergedProps} query={undefined} />
      </GridItem>
    </GridLayout>
  );
};
Validation.parameters = {
  docs: componentSource([
    addressFormProps as FormProps<object>,
    { ...addressFormProps, query: undefined } as FormProps<object>,
  ]),
};

export const Debug = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(identityFormProps, props);

  return <Form {...mergedProps} debug />;
};
Debug.parameters = {
  docs: componentSource([
    { ...(identityFormProps as FormProps<object>), debug: true },
  ]),
};

const customContentProps: FormProps<object> = {
  title: "Form with custom content",
  content: [
    {
      kind: "content",
      content: <Callout>I am a callout</Callout>,
    },
    () => (
      <Heading color="success-base" size="h4">
        And I am a heading
      </Heading>
    ),
  ],
};

export const CustomContent = () => {
  return <Form {...customContentProps} />;
};
CustomContent.parameters = {
  docs: componentSource([customContentProps]),
};

const CustomInput = (props: CustomFormInputProps<string>) => {
  return (
    <FlexRowLayout gap="s-1" align="center" fill>
      <Icon name="Gear" />
      <Input type="text" {...props} />
    </FlexRowLayout>
  );
};

const customIdentityContents: FormContent<Address>[] = [
  {
    kind: "custom-field",
    source: "street",
    label: "Custom Fist name input",
    assistiveText: "This input was rendered using a custom field",
    CustomInput,
  },
  ...(addressFormProps.content ?? []).slice(1),
];

export const CustomFields = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(addressFormProps, props);
  return (
    <Form
      {...mergedProps}
      content={customIdentityContents}
      title="Form with custom field"
    />
  );
};

const formModalRef = "FORM_MODAL_REF";
export const AsModal = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(addressFormProps, props);
  const { open, close } = useDialog(formModalRef);
  return (
    <>
      <Form
        {...mergedProps}
        title="Form in a modal"
        asModal={{ reference: formModalRef }}
        defaultEditing="force"
        onSubmit={close}
      />
      <Button onClick={open} label="Open form in modal" />
    </>
  );
};
AsModal.parameters = {
  docs: componentSource([
    {
      ...addressFormProps,
      title: "Form in a modal",
      asModal: { reference: formModalRef },
      onCancelled: () => {},
      onSubmit: () => {},
      defaultEditing: true,
    },
  ]),
};

const identityTableSchema = z.object({
  profiles: z
    .array(
      identitySchema.pick({
        firstName: true,
        lastName: true,
        professionalInfo: true,
        dateOfBirth: true,
      })
    )
    .min(2)
    .max(5),
  bankAccounts: z
    .array(
      z.object({
        name: z.string(),
        primary: z
          .boolean()
          .nullish()
          .transform(() => undefined),
      })
    )
    .nullish(),
});

type IdentityTable = z.input<typeof identityTableSchema>;

const tableFormProps: FormProps<IdentityTable> = {
  title: "Form with table",
  schema: identityTableSchema,
  onSubmit: fn(),
  defaultValues: {
    profiles: [
      {
        firstName: "John",
        lastName: "Doe",
      },
      {
        dateOfBirth: "1990-01-01",
      },
    ],
  },
  content: [
    {
      kind: "table",
      source: "profiles",
      label:
        "Renseignez le(s) propriétaire(s) du lot dans le tableau ci-dessous",
      assistiveText: "assistive text",
      deletable: true,
      swappable: true,
      EmptyCard: () => {
        return <span>Empty card</span>;
      },
      layout: {
        size: 2,
      },
      footer: {
        kind: "button",
        label: "Add row",
        newRow: () => {
          return {
            lastName: String(Math.round(Math.random() * 100)),
            professionalInfo: {
              role: "Tester",
            },
          };
        },
      },
      columns: [
        {
          type: "text",
          source: "firstName",
          label: "First name",
          errorText: "Test",
          tooltip: {
            content: "Je suis un tooltip",
          },
        },
        {
          type: "text",
          source: "lastName",
          label: "Last name",
          errorText: "Ceci est une erreur",
        },
        {
          type: "select",
          source: "professionalInfo.role",
          label: "Job title",
          options: [
            {
              label: "Developer",
              value: "dev",
            },
            {
              label: "UX Designer",
              value: "designer_ux",
            },
            {
              label: "UI Designer",
              value: "designer_ui",
            },
            {
              label: "UX/ UI Designer",
              value: "designer_ux_ui",
            },
          ],
        },
        {
          type: "date",
          source: "dateOfBirth",
          label: "Date of birth",
          placeholder: "Date of birth",
        },
      ],
    },
    "divider",
    {
      kind: "table",
      source: "bankAccounts",
      label: "Bank accounts",
      swappable: true,
      deletable: true,
      columns: [
        {
          type: "text",
          source: "name",
          label: "Account name",
          layout: {
            readonly: true,
          },
        },
        {
          kind: "custom-field",
          source: "primary",
          label: "",
          CustomInput: ({ rowIndex }: CustomFormInputProps<boolean>) => {
            if (rowIndex === 0)
              return (
                <FlexRowLayout align="center" justify="center">
                  <Tooltip content="Primary account">
                    <Icon name="StarFill" />
                  </Tooltip>
                </FlexRowLayout>
              );
            return null;
          },
        },
      ],
      footer: {
        kind: "select",
        searchable: true,
        controlIcon: "Search",
        options: [
          {
            label: "Credit agricole",
            value: {
              name: "Credit agricole",
            },
          },
          {
            label: "Bank of america",
            value: {
              name: "Bank of america",
            },
          },
        ],
      },
    },
  ],
};

export const Table = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(tableFormProps, props);
  return <Form {...mergedProps} />;
};
Table.parameters = {
  docs: componentSource([tableFormProps as FormStoryProps]),
};

const creatableFormProps: FormProps<object> = {
  title: "Creatable",
  defaultEditing: true,
  submitLabel: "create",
  cancelLabel: "giveUp",
  content: [
    {
      kind: "text",
      content: "Form content goes here...",
      align: "center",
      italic: true,
      color: "primary-base",
    },
  ],
};

export const CreatableForm = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(creatableFormProps, props);
  return <Form {...mergedProps} />;
};
CreatableForm.parameters = {
  docs: componentSource([creatableFormProps]),
};

export const Steps = () => {
  const { content, ...mergedProps } = tableFormProps;
  const steps = useStatic<FormContent<IdentityTable>[][]>(
    isArray(content)
      ? ([
          [...content].slice(0, 1),
          [...content].slice(2),
        ] as FormContent<Identity>[][])
      : []
  );
  const [stepIndex, setStepIndex] = useState<number>(0);
  const maxStep = useStatic(steps.length - 1);
  const title = useMemo<string>(
    (): string =>
      [mergedProps.title, "-", "Step", stepIndex + 1, "/", steps.length].join(
        " "
      ),
    [mergedProps.title, stepIndex, steps.length]
  );
  const currentStep = useMemo(() => steps[stepIndex], [steps, stepIndex]);
  const currentStepSchema = useMemo(
    () =>
      // @ts-expect-error This is not an intented use of the form, but still fun to play with nonetheless
      mergedProps.schema?.pick(
        objectFromEntries(
          currentStep.filter(isFormField).map(({ source }) => [source, true])
        )
      ),
    [currentStep, mergedProps.schema]
  );

  return (
    <Form
      {...mergedProps}
      title={title}
      schema={currentStepSchema}
      content={currentStep}
      onSubmit={() => setStepIndex(clamp(stepIndex + 1, 0, maxStep))}
      onCancelled={() => setStepIndex(clamp(stepIndex - 1, 0, maxStep))}
    />
  );
};
Steps.parameters = {
  docs: {
    source: {
      language: "tsx",
      code: `export const Steps = () => {
  const { content, ...mergedProps } = tableFormProps;
  const steps = useStatic<FormContent<IdentityTable>[][]>(
    isArray(content)
      ? ([
          [...content].slice(0, 3),
          [...content].slice(3),
        ] as FormContent<Identity>[][])
      : []
  );
  const [stepIndex, setStepIndex] = useState<number>(0);
  const maxStep = useStatic(steps.length - 1);
  const title = useMemo<string>(
    (): string => [mergedProps.title, "-", "Step", stepIndex + 1, "/", steps.length].join(" "),
    [mergedProps.title, stepIndex, steps.length]
  );
  const currentStep = useMemo(() => steps[stepIndex], [steps, stepIndex]);
  const currentStepSchema = useMemo(
    () =>
      // @ts-expect-error This is not an intented use of the form, but still fun to play with nonetheless
      mergedProps.schema?.pick(
        objectFromEntries(
          currentStep.filter(isFormField).map(({ source }) => [source, true])
        )
      ),
    [currentStep, mergedProps.schema]
  );

  return (
    <Form
      {...mergedProps}
      title={title}
      schema={currentStepSchema}
      content={currentStep}
      onSubmit={() => setStepIndex(clamp(stepIndex + 1, 0, maxStep))}
      onCancelled={() => setStepIndex(clamp(stepIndex - 1, 0, maxStep))}
    />
  );
}`,
    },
  },
};
