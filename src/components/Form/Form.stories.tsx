import { fn } from "storybook/test";
import {
  isArray,
  isNull,
  Nullable,
  objectFromEntries,
} from "@ubloimmo/front-util";
import { useCallback, useMemo, useRef, useState } from "react";
import { z } from "zod";

import { Form } from "./Form.component";
import { Button } from "../Button";
import { Callout } from "../Callout";
import { DialogProvider, useDialog } from "../Dialog";
import { FeatureSwitch } from "../FeatureSwitch";
import { Heading } from "../Heading";
import { Icon, type IconName } from "../Icon";
import { Input, NumberInput } from "../Input";
import { isFormField } from "./Form.utils";
import { Hypertext } from "../Hypertext";
import { Modal } from "../Modal";
import { useFormContext } from "./Form.context";

import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout, GridItem, GridLayout } from "@layouts";
import {
  clamp,
  createDelayedResponse,
  delay,
  useMergedProps,
  useStatic,
} from "@utils";

import type {
  FormProps,
  FormData,
  FormContent,
  CustomFormInputProps,
  FormTableProps,
  FormTableTryDeletingRowFn,
  FormTableTryDeletingRowParams,
} from "./Form.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
  active: z.boolean().nullish(),
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
      testId: "street-input",
      overrideTestId: true,
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
  title: "Components/Forms/Form/Stories",
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
      <Input
        testId="custom-input-test-id"
        overrideTestId
        type="text"
        {...props}
      />
    </FlexRowLayout>
  );
};

const featureSwitchOptions = [
  {
    label: "Option 1",
    value: true,
  },
  {
    label: "Option 2",
    value: false,
  },
];

const customInputFeatureSwitch = ({
  value,
  onChange,
  disabled,
}: CustomFormInputProps<boolean>) => (
  <FeatureSwitch
    onChange={onChange}
    value={value}
    disabled={disabled}
    variant="select"
    options={featureSwitchOptions}
  />
);

const customAddressContents: FormContent<Address>[] = [
  {
    kind: "custom-field",
    source: "street",
    label: "Custom Fist name input",
    assistiveText: "This input was rendered using a custom field",
    CustomInput,
  },
  {
    kind: "custom-field",
    source: "active",
    label: "",
    CustomInput: customInputFeatureSwitch,
  },
  {
    kind: "feature-switch",
    source: "active",
    label: "Feature switch",
    variant: "switch",
  },
  ...(addressFormProps.content ?? []).slice(1),
];

export const CustomFields = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(addressFormProps, props);
  return (
    <Form
      {...mergedProps}
      content={customAddressContents}
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
        title="Form in a modal with a longer title"
        asModal={{ reference: formModalRef, size: "s" }}
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
      identitySchema
        .pick({
          firstName: true,
          lastName: true,
          professionalInfo: true,
          dateOfBirth: true,
          numberOfChildren: true,
        })
        .extend({
          selected: z.boolean().nullish(),
          tags: z.array(z.string()).nullish(),
        })
    )
    .max(5),
});

type IdentityTable = z.input<typeof identityTableSchema>;

const onSubmitTable = async (data: IdentityTable) => {
  await delay(1000);
  fn()(data);
  return data;
};

const formTableProps: FormTableProps<IdentityTable> = {
  kind: "table",
  source: "profiles",
  label: "Renseignez le(s) propriétaire(s) du lot dans le tableau ci-dessous",
  deletable: true,
  swappable: true,
  selectable: {
    property: "selected",
    behavior: "default",
  },
  EmptyCard: () => {
    return <span>Empty card</span>;
  },
  layout: {
    size: 2,
  },
  disableRow: (row, index) => {
    return index > 0;
  },
  overrideRowModifiers: (row, index) => {
    if (index > 0)
      return {
        deletable: false,
        swappable: false,
      };
  },
  footer: {
    kind: "button",
    label: "Add row",
    newRow: () => {
      return {
        lastName: String(Math.round(Math.random() * 100)),
        firstName: String(Math.round(Math.random() * 100)),
        dateOfBirth: "1990-01-31",
        numberOfChildren: 0,
        professionalInfo: {
          role: "tester",
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
      layout: {
        fixedWidth: "120px",
      },
    },
    {
      type: "select",
      source: "professionalInfo.role",
      testId: "job-title-test-id",
      overrideTestId: true,
      searchable: true,
      label: "Job title",
      options: [
        {
          testId: "developer-test-id",
          overrideTestId: true,
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
        {
          label: "Tester",
          value: "tester",
        },
        {
          label:
            "A label that passes the column width and lets user see the whole text",
          value: "long_label",
        },
      ],
    },
    {
      type: "date",
      source: "dateOfBirth",
      label: "Date of birth",
      placeholder: "Date of birth",
    },
    {
      type: "number",
      source: "numberOfChildren",
      label: "Number of children",
      scale: 2,
    },
  ],
};

const commonTableFormProps: FormProps<IdentityTable> = {
  title: "Form with table",
  schema: identityTableSchema,
  onSubmit: onSubmitTable,
  defaultValues: {
    profiles: [
      {
        firstName: "John has a very very very long name",
        lastName: "Doe",
        dateOfBirth: "1990-01-31",
        numberOfChildren: 0,
        professionalInfo: {
          role: "tester",
        },
      },
    ],
  },
};

const tableFormProps: FormProps<IdentityTable> = {
  ...commonTableFormProps,
  content: [formTableProps],
};

export const Table = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(tableFormProps, props);
  return <Form {...mergedProps} />;
};
Table.parameters = {
  docs: componentSource([tableFormProps as FormStoryProps]),
};

export const TableTryDeletingRow = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(commonTableFormProps, props);
  const [modalOpen, setModalOpen] = useState(false);
  const rowToDeleteRef = useRef<FormTableTryDeletingRowParams<object>>();

  const tryDeletingRow = useCallback<
    FormTableTryDeletingRowFn<IdentityTable["profiles"][number]>
  >((rowToDelete) => {
    rowToDeleteRef.current = rowToDelete;
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!rowToDeleteRef.current) return;

    rowToDeleteRef.current.confirmDelete();
    closeModal();
  }, [closeModal]);

  const cancelDelete = useCallback(() => {
    if (!rowToDeleteRef.current) return;

    rowToDeleteRef.current.cancelDelete();
    closeModal();
  }, [closeModal]);

  const content = useMemo<FormContent<IdentityTable>[]>(() => {
    return [
      {
        ...formTableProps,
        tryDeletingRow,
      },
    ];
  }, [tryDeletingRow]);

  return (
    <>
      <Form
        {...mergedProps}
        title="Table with modal when deleting a row"
        content={content}
      />
      <Modal
        open={modalOpen}
        onClosed={closeModal}
        title={`Delete row at index ${rowToDeleteRef.current?.index ?? "unknown"} ?`}
        size="s"
      >
        <Button label="Confirm deletion" color="red" onClick={confirmDelete} />
        <Button label="Cancel" secondary onClick={cancelDelete} />
      </Modal>
    </>
  );
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

type UnitGroupData = {
  name: string;
  customReference: string;
  icon: IconName;
};

const unitGroupIcons: IconName[][] = [
  [
    "BuildingBlocks",
    "LayoutWtf",
    "ColumnsGap",
    "Grid",
    "Grid3X2Gap",
    "Buildings",
    "Building",
    "Houses",
    "House",
    "Layers",
    "Mailbox",
    "PinMap",
    "Geo",
  ],
  [
    "BuildingBlocksFill",
    "Shelves",
    "BorderOuter",
    "GridFill",
    "Grid3X2GapFill",
    "BuildingsFill",
    "BuildingFill",
    "HousesFill",
    "HouseFill",
    "LayersFill",
    "Mailbox2",
    "PinMapFill",
    "GeoFill",
  ],
];

const layout = {
  size: 2,
};

const unitGroupFormProps: FormProps<UnitGroupData> = {
  title: "Unit group",
  content: [
    {
      source: "name",
      label: `Nom du groupe`,
      type: "text",
      layout,
    },
    {
      source: "customReference",
      label: `Réference du groupe`,
      type: "text",
      assistiveText: `7 caracères`,
      layout,
    },
    {
      source: "icon",
      type: "icon-picker",
      label: `Icône`,
      icons: unitGroupIcons,
      layout,
    },
  ],
  query: () => ({
    icon: "Building",
  }),
};

export const UnitGroupExample = (props: FormStoryProps) => {
  const mergedProps = useMergedProps(unitGroupFormProps, props);

  return <Form {...mergedProps} />;
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
      code: `const Steps = () => {
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

const infoBannerFormProps: FormProps<object> = {
  title: "Form with banner information",
  content: [
    {
      kind: "text",
      content:
        "This form as contains information in place of a cancel button in its edit banner",
    },
  ],
  bannerInfo: (
    <>
      This information can contain any element, even&nbsp;
      <Hypertext href="#">hypertexts</Hypertext>. It can be a lengthy
      explanation of the form&apos;s purpose, instructions on how to fill it
      out, or any other relevant details.
    </>
  ),
  defaultEditing: true,
};

export const InfoBanner = () => {
  return <Form {...infoBannerFormProps} />;
};
InfoBanner.parameters = {
  docs: componentSource([infoBannerFormProps]),
};

const allFieldsSchema = z.object({
  text: z.string(),
  select: z.string(),
  date: z.string(),
  monthYear: z.string(),
  iconPicker: z.enum(["Square", "Triangle", "Circle"]),
  comboBox: z.string(),
  multiSelect: z.array(z.string()),
  phone: z.string(),
  password: z.string(),
  number: z.number(),
  currency: z.number().int(),
  email: z.string(),
  textarea: z.string(),
  search: z.string(),
  searchText: z.string(),
  energyScore: z.number(),
});

type AllFieldsData = z.input<typeof allFieldsSchema>;

const sharedOptions = [
  {
    label: "Option 1",
    value: "option1",
    icon: "CircleFill" as const,
    iconColor: "primary-base" as const,
  },
  {
    label: "Option 2",
    value: "option2",
    icon: "TriangleFill" as const,
    iconColor: "pending-dark" as const,
  },
  {
    label: "Option 3",
    value: "option3",
  },
];

const queryData: FormData<AllFieldsData> = {
  text: "Text",
  select: sharedOptions[0].value,
  date: "2024-01-31",
  iconPicker: "Square",
  comboBox: "option1",
  multiSelect: sharedOptions.slice(0, 2).map(({ value }) => value),
  phone: "06 06 06 06 06",
  password: "Password",
  number: 1237,
  currency: 100,
  email: "email@email.com",
  textarea:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  search: sharedOptions[0].value,
  searchText: "Search",
  energyScore: 12,
  monthYear: "2025-01",
};

const allFieldsIcons: IconName[] = ["Square", "Triangle", "Circle"];

const allFieldsFormProps: FormProps<AllFieldsData> = {
  title: "All fields",
  schema: allFieldsSchema,
  query: createDelayedResponse(queryData, 100),
  content: [
    {
      label: "Text",
      source: "text",
      type: "text",
    },
    {
      label: "Select",
      source: "select",
      type: "select",
      options: createDelayedResponse(sharedOptions, 200),
    },
    {
      label: "Date",
      type: "date",
      source: "date",
    },
    {
      label: "Month Year",
      type: "month-year",
      source: "monthYear",
    },
    {
      label: "Icon Picker",
      type: "icon-picker",
      source: "iconPicker",
      icons: allFieldsIcons,
    },
    {
      label: "Combo Box",
      type: "combobox",
      source: "comboBox",
      options: sharedOptions,
    },
    {
      label: "Multi select",
      type: "multi-select",
      source: "multiSelect",
      options: createDelayedResponse(sharedOptions, 100),
    },
    {
      label: "Phone",
      type: "phone",
      source: "phone",
    },
    {
      label: "Password",
      type: "password",
      source: "password",
    },
    {
      label: "Number",
      type: "number",
      source: "number",
      scale: 2,
      precision: 7,
    },
    {
      label: "Currency",
      type: "currency",
      source: "currency",
    },
    {
      label: "Email",
      type: "email",
      source: "email",
    },
    {
      label: "Search",
      type: "search",
      source: "search",
      results: createDelayedResponse(sharedOptions, 1000),
    },
    {
      label: "Search Text",
      type: "search-text",
      source: "searchText",
    },
    {
      label: "Textarea",
      type: "textarea",
      source: "textarea",
    },
    {
      label: "Energy Score",
      source: "energyScore",
      type: "energy-score",
      scoreType: "GES",
      unit: "kgCO₂/m²/an",
    },
  ],
  onSubmit: (...args) => {
    fn()(args);
  },
  debug: true,
};

export const AllFields = () => {
  return <Form {...allFieldsFormProps} />;
};
AllFields.parameters = {
  docs: componentSource([allFieldsFormProps as FormStoryProps]),
};

type BatchUpdateData = {
  number: number;
  derived: {
    double: number;
    triple: number;
    half: number;
  };
  flipFlop: boolean;
};

const BatchInput = ({
  onChange: _,
  value: __,
  ...props
}: CustomFormInputProps<number>) => {
  const { batchMutateFormData, data } = useFormContext<BatchUpdateData>();
  const onChange = (value: Nullable<number>) => {
    if (isNull(value)) {
      batchMutateFormData({
        number: null,
        "derived.double": null,
        "derived.triple": null,
        "derived.half": null,
        flipFlop: !data.flipFlop,
      });
      return;
    }
    batchMutateFormData({
      number: value,
      "derived.double": value * 2,
      "derived.triple": value * 3,
      "derived.half": value * 0.5,
      flipFlop: !data.flipFlop,
    });
  };
  return <NumberInput {...props} uncontrolled onChange={onChange} />;
};

const content: FormContent<BatchUpdateData>[] = [
  {
    label: "Combined input (batch",
    source: "number",
    CustomInput: BatchInput,
    layout: {
      size: 2,
    },
  },
  {
    label: "Number",
    type: "number",
    source: "number",
    layout: {
      readonly: true,
    },
  },
  {
    label: "Double",
    type: "number",
    source: "derived.double",
    layout: {
      readonly: true,
    },
  },
  {
    label: "Triple",
    type: "number",
    source: "derived.triple",
    layout: {
      readonly: true,
    },
  },
  {
    label: "Half",
    type: "number",
    source: "derived.half",
    layout: {
      readonly: true,
    },
  },
  {
    kind: "feature-switch",
    source: "flipFlop",
    variant: "switch",
    label: "Flip flop",
    disabled: true,
  },
];

export const BatchUpdate = () => {
  return <Form<BatchUpdateData> title="Batch update demo" content={content} />;
};
