/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import Notfound from "../Notfound";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { getProfile } from "./chat-config";

const MyProfileHeader = ({ setSelectedChat, setShowContactSidebar }) => {
  const { currentUser } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const {
    data: contacts,
    // isLoading,
    // isError,
    // refetch: refetchContact,
  } = useQuery({
    queryKey: ["searchText", searchText],
    queryFn: () => getProfile(searchText),
    enabled: !!searchText, // Only fetch when there is search text
    keepPreviousData: true,
  });
 
  const handleSelectedChatItem = (contact) => {
    setSelectedChat(contact);
    setIsOpen(false);
    setShowContactSidebar(false)
    setSearchText("");
  };
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching contacts</div>;

  return (
    <>
      <div className="flex mx-0 justify-between pb-2 mb-2">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.profile?.profileThumb} alt="" />
            <AvatarFallback>
              {currentUser?.profile?.businessName?.slice(0, 2) ||
                currentUser?.profile?.fullName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="block">
            <div className="text-sm font-medium text-default-900">
              <span className="relative before:h-1.5 before:w-1.5 before:rounded-full before:bg-success before:absolute before:top-1.5 before:-right-3">
                {currentUser?.profile?.businessName ||
                  currentUser?.profile?.fullName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <button
          className=" w-full py-2 flex items-center gap-2 border border-default-200 mb-2 lg:items-center px-2 focus-within:border-blue-500 focus-within:text-primary_color"
          onClick={() => setIsOpen(true)} // Open the dialog on click
        >
          <Search size={16} className="text-slate-400" />

          <p className="text-sm text-gray-400">Search username</p>
          {/* <Input
            type="text"
            placeholder="Search by name"
            className="border-0 focus-visible:outline-none focus-visible:ring-0"
            value={searchText}
            onFocus={() => setIsOpen(true)} // Open the dialog on input focus
            onChange={handleChange}
          /> */}
        </button>

        <DialogContent className="w-[380px] lg:top-96 left-1/2 z-[1000] ">
          <DialogHeader>
            <DialogTitle>Create conversation</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              id="username"
              className="col-span-3"
              placeholder="Enter username"
              value={searchText}
              onChange={handleChange}
            />
          </div>

          {contacts && (
            <ScrollArea className="h-64">
              {contacts?.contacts?.length > 0 &&
                contacts?.contacts
                  .filter(
                    (contact) => contact.username !== currentUser?.username
                  ) // Filter out current user's profile
                  .map((contact, i) => {
                    const fullName =
                      contact?.firstName + " " + contact?.lastName;

                    return (
                      <div
                        className="flex-1 flex gap-3 bg-slate-100 p-2 rounded-md"
                        key={i}
                        onClick={() => handleSelectedChatItem(contact)}
                      >
                        <div className="relative inline-block">
                          <Avatar>
                            <AvatarImage src={contact?.profileThumb || ""} />
                            <AvatarFallback className="uppercase">
                              {contact?.businessName?.slice(0, 2) ||
                                fullName.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <Badge
                            className="h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]"
                            color={
                              contact?.status === "online"
                                ? "success"
                                : "secondary"
                            }
                          />
                        </div>
                        <div className="block">
                          <div className="truncate max-w-[120px]">
                            <span className="text-gray-900 font-medium flex justify-start">
                              {contact?.businessName || fullName}
                            </span>
                          </div>
                          <div className="truncate max-w-[120px]">
                            <span className="text-xs text-default-600">
                              {contact?.latestMessage}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </ScrollArea>
          )}
          {!contacts && (
            <Notfound/>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyProfileHeader;
