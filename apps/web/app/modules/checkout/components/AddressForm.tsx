"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Heading, Stack, Text } from "@react-shop/design-system";

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  street1: z.string().min(1, "Address is required"),
  street2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().default("US"),
  phone: z.string().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  title: string;
  onSubmit: (data: AddressFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <Text size="sm" color="error" className="mt-1">{error}</Text>}
    </div>
  );
}

export function AddressForm({
  title,
  onSubmit,
  isLoading,
  submitLabel = "Continue",
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: "US" },
  });

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";

  return (
    <div>
      <Heading as="h3" size="lg" className="mb-4">
        {title}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack className="gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName?.message}>
              <input {...register("firstName")} className={inputClass} />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
              <input {...register("lastName")} className={inputClass} />
            </Field>
          </div>

          <Field label="Address" error={errors.street1?.message}>
            <input {...register("street1")} placeholder="Street address" className={inputClass} />
          </Field>

          <Field label="Apartment, suite, etc. (optional)">
            <input {...register("street2")} placeholder="Apt, suite, unit" className={inputClass} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="City" error={errors.city?.message}>
              <input {...register("city")} className={inputClass} />
            </Field>
            <Field label="State" error={errors.state?.message}>
              <input {...register("state")} className={inputClass} />
            </Field>
            <Field label="Zip Code" error={errors.zipCode?.message}>
              <input {...register("zipCode")} className={inputClass} />
            </Field>
          </div>

          <Field label="Phone (optional)">
            <input {...register("phone")} type="tel" className={inputClass} />
          </Field>

          <Button type="submit" variant="solid" size="lg" fullWidth disabled={isLoading}>
            {isLoading ? "Saving..." : submitLabel}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
