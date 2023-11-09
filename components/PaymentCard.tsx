"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardTitle, CardContent, Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";

const paymentSchema = z.object({
  id: z.string().min(10, {
    message: "Payment ID must be at least 10 characters.",
  }),
  date: z.string().min(10, {
    message: "Date must be at least 10 characters.",
  }),
  cost: z.string(),
  status: z.string(),
});

type Payment = {
  id: string;
  date: string;
  cost: number;
  status: string;
};

type PaymentCardProps = {
  payments?: Payment[];
};

export function PaymentCard({ payments }: PaymentCardProps) {
  const defaultValues = {
    id: "",
    date: "",
    cost: 10000,
    status: "pending",
  };

  const [pays, setPays] = useState<Payment[]>(payments || []);

  const register = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data:any) => {
    console.log(data);
    const newPayment = {
      id: data.id,
      date: data.date,
      cost: data.cost,
      status: data.status,
    };
    setPays([...pays, newPayment]);
  
  };

  return (
    <Card className="dark:bg-[20-14.3-4.1] mt-7">
      <CardHeader>
        <CardTitle className="text-black dark:text-white">Make Payment</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...register}>
          <form onSubmit={register.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={register.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment ID</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="PAYMENT-XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={register.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={register.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Cost" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Pay</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}