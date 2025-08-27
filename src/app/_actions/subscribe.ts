"use server";

import prisma from "@/lib/prisma";
import { CustomerStatus } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { z } from "zod";

const SubscribeSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "" }),
});

export const subscribeAction = async (_: any, formData: FormData) => {
  try {
    const { data, success, error } = SubscribeSchema.safeParse({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
    });

    if (!success) {
      return { success: false, message: error.message };
    }

    const subscriber = await prisma.customer.findFirst({
      where: { email: data.email },
    });

    if (subscriber) {
      return { success: false, message: "You are already subscribed!" };
    }

    const newCustomer = await prisma.customer.create({
      data: { ...data, status: CustomerStatus.SUBSCRIBER },
    });

    return {
      success: true,
      customer: newCustomer,
      message: "Customer subscribed successfully",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { success: false, message: error.message };
    }
    if (error instanceof PrismaClientValidationError) {
      return { success: false, message: error.message };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong! " };
  }
};
