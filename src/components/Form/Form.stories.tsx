import { z } from "zod";

import { Form } from "./Form.component";

import { componentSourceFactory } from "@docs/docs.utils";
import { GridItem, GridLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { FormDataProps, FormProps, FormData } from "./Form.types";
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
  country: "USA",
  coordinates: {
    latitude: 40.7128,
    longitude: -74.006,
  },
};

const addressFormProps: FormProps<Address> = {
  schema: addressSchema,
  query: addressData,
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
      type: "text",
      source: "zipCode",
      label: "Zip code",
    },
    {
      type: "text",
      source: "city",
      label: "City",
      layout: {
        readonly: true,
      },
    },
    {
      type: "text",
      source: "country",
      label: "Country",
      layout: {
        size: 2,
      },
    },
  ],
};

const componentSource = componentSourceFactory<FormDataProps<object>>(
  "Form",
  {
    // TODO
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
  age: z.number().nullish(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
  }),
  professionalInfo: z
    .object({
      role: z.string().nullish(),
    })
    .nullish(),
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
      layout: {
        size: 2,
      },
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
  const mergedProps = useMergedProps(addressFormProps, props);

  return (
    <GridLayout columns={1} gap={"s-8"}>
      <GridItem fill>
        <Form {...mergedProps} />
      </GridItem>
      <GridItem fill>
        <Form {...mergedProps} debug />
      </GridItem>
    </GridLayout>
  );
};
