"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionComponent({ content }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{content.title} </AccordionTrigger>
        <AccordionContent>{content.description}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
