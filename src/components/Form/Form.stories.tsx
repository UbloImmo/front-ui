import { fn } from "@storybook/test";
import { z } from "zod";

import { Form } from "./Form.component";

import { componentSourceFactory } from "@docs/docs.utils";
import { GridItem, GridLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { FormProps, FormData } from "./Form.types";
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
  parameters: {
    docs: componentSource([addressFormProps as FormProps<object>]),
  },
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
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
  }),
  professionalInfo: z
    .object({
      role: z.string().nullish(),
    })
    .nullish(),
  isCitizen: z.boolean(),
  maritalStatus: z.enum(["single", "married", "widowed", "divorced"]),
});

type Identity = z.output<typeof identitySchema>;

const formData: FormData<Identity> = {
  firstName: "John",
  lastName: "Doe",
  contact: {
    email: "k6bqg@example.com",
    phone: "+33 6 00 00 00 00",
  },
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
  },
  content: [
    {
      type: "text",
      source: "firstName",
      label: "First name",
      errorText: "Test",
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
