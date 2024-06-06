"use client";

import { EditTransactionSheet } from "@/components/sheets/edit-Transaction-Sheet";
import { NewTransactionSheet } from "@/components/sheets/new-Transaction-Sheet";
import { EditScheduleSheet } from "@/components/sheets/edit-Schedule-Sheet";
import { EditCategorySheet } from "@/components/sheets/edit-Category-Sheet";
import { NewCategorySheet } from "@/components/sheets/new-Category-Sheet";
import { EditAccountSheet } from "@/components/sheets/edit-Account-Sheet";
import { NewScheduleSheet } from "@/components/sheets/new-Schedule-Sheet";
import { NewAccountSheet } from "@/components/sheets/new-Account-Sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
      <EditTransactionSheet />

      <NewScheduleSheet />
      <EditScheduleSheet />
    </>
  );
};
