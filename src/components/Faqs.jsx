import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const Faqs = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Have questions? We've got answers. Here's what you need to know
            about using GKMIT-INSIDE.
          </p>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4"
            defaultValue="item-1"
          >
            <AccordionItem
              value="item-1"
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 font-medium text-left hover:no-underline">
                I registered, but why can't I log in?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 text-base text-gray-700">
                <p>
                  Based on your app's flow (`auth-dfd-level-2.png`), all new
                  accounts must be approved by an administrator. After you
                  register, your account is in a "Pending" state. Once an admin
                  approves it, you will be able to log in.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 font-medium text-left hover:no-underline">
                I created a post. Why isn't it on the feed?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 text-base text-gray-700">
                <p>
                  To ensure all content is professional, your app's post
                  management flow requires all submissions to be reviewed. Your
                  post is "Pending" and will appear on the main feed as soon as
                  an administrator approves it.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 3: Styled as a card */}
            <AccordionItem
              value="item-3"
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 font-medium text-left hover:no-underline">
                How do I sign up for an account?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 text-base text-gray-700">
                <p>
                  Click the "login" button on the landing page. We recommend
                  using your official company email address. This will send an
                  approval request to the site administrators.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 font-medium text-left hover:no-underline">
                What is the 'Admin' role?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 text-base text-gray-700">
                <p>
                  'Admin' have special permissions, including approving new user
                  accounts and reviewing pending posts before they are
                  published.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
