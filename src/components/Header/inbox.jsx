"use client";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

import { getContacts } from "@/app/chat/chat-config";
import messageIconjson from "@/asserts/jsonfile/messageicon4.json";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import ChatBox from "./Chatbox";

const Inbox = () => {
  const { currentUser } = useAuth();
  const [openChats, setOpenChats] = useState([]);

  const handleOpenChatBox = (chat) => {
    if (!openChats.find((c) => c.id === chat.id)) {
      setOpenChats((prevChats) => [...prevChats, chat]);
    }
  };

  const handleCloseChatBox = (chatId) => {
    setOpenChats((prevChats) => prevChats.filter((c) => c.id !== chatId));
  };

  const {
    isLoading,
    isError,
    data: contacts,
    error,
    refetch: refetchContact,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts({ senderUser: currentUser?.username }),
    keepPreviousData: true,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-[#1e56ad] w-11 rounded-sm cursor-pointer">
            <Lottie
              animationData={messageIconjson}
              autoPlay={false}
              className="w-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-[999] mx-4 lg:w-[412px] p-0"
        >
          <DropdownMenuLabel className="w-full h-full bg-primary_color bg-cover bg-no-repeat p-4 flex items-center">
            <span className="text-base font-semibold text-white flex-1">
              Message
            </span>
          </DropdownMenuLabel>
          <div className="min-h-32 max-h-[350px] xl:h-[420px]">
            <ScrollArea className="h-full">
              {contacts?.data?.length > 0 ? (
                contacts.data.map((contact, index) => {
                  const fullName = `${contact?.receiver?.personalProfile?.firstName} ${contact?.receiver?.personalProfile?.lastName}`;
                  return (
                    <DropdownMenuItem
                      key={`inbox-${index}`}
                      className="flex gap-9 py-2 px-4 cursor-pointer dark:hover:bg-background rounded-none"
                      onClick={() => handleOpenChatBox(contact)}
                    >
                      <div className="flex-1 flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              contact.receiver?.businessProfile?.profileThumb
                            }
                          />
                          <AvatarFallback>
                            {contact.receiver?.businessProfile?.businessName.slice(
                              0,
                              2
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-default-900 mb-[2px] whitespace-nowrap">
                            {contact.receiver?.businessProfile?.businessName ||
                              fullName}
                          </div>
                          <div className="text-xs text-default-900 truncate max-w-[100px] lg:max-w-[185px]">
                            {contact.messages[0]?.content || contact.about}
                          </div>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "text-xs font-medium text-default-900 whitespace-nowrap",
                          {
                            "text-gray-500":
                              !contact.messages[0]?.redreadStatus,
                          }
                        )}
                      >
                        {contact?.messages[0]?.createdAt
                          ? moment(contact.messages[0]?.createdAt).fromNow()
                          : "No date available"}
                      </div>
                      <div
                        className={cn("w-2 h-2 rounded-full mr-2", {
                          "bg-primary_color":
                            !contact.messages[0]?.redreadStatus,
                        })}
                      ></div>
                    </DropdownMenuItem>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full text-default-600">
                  No conversations available
                </div>
              )}
            </ScrollArea>
          </div>
          <DropdownMenuSeparator />
          <div className="m-4 mt-5">
            <Button asChild type="text" className="w-full bg-primary_color">
              <Link href="/dashboard">View All</Link>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="fixed z-[9999] bottom-4    w-full   max-w-7xl    flex rounded-t-md rounded-b-none   justify-end gap-4   right-0 lg:right-[1%]  ">
        {openChats.map((chat) => (
          <ChatBox
            key={chat.id}
            conversation={chat}
            onClose={() => handleCloseChatBox(chat.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Inbox;
