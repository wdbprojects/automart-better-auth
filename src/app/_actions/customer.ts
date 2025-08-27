"use server";

import prisma from "@/lib/prisma";
import {
  CreateCustomerSchema,
  CreateCustomerType,
} from "../schemas/customer-schema";

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { data, success, error } = CreateCustomerSchema.safeParse(props);
    if (!success) {
      console.log({ error: error });
      return { success: false, message: "Invalid data" };
    }
    if (data.terms !== "true") {
      return {
        success: false,
        message: "You must accept the terms and conditions",
      };
    }
    const { date, terms, slug, ...rest } = data;

    await prisma.customer.create({
      data: {
        ...rest,
        bookingDate: date,
        termsAccepted: terms === "true",
        classified: { connect: { slug: slug } },
      },
    });
    return { success: true, data: data, message: "Reservation Successful" };
  } catch (err) {
    console.log({ error: err });
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Something went wrong ⛔️" };
  }
};
