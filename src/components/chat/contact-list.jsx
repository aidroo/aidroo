"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import moment from "moment";

const ContactList = ({ contact, openChat, selectedChatId }) => {
 
  const { id, status, unreadmessage,   } =
    contact;
 

const fullName =
  contact?.receiver?.personalProfile?.firstName +
  " " +
  contact?.receiver?.personalProfile?.lastName ;
  return (
    <button
      className={cn(
        " gap-4 py-2 lg:py-2.5 px-3 border-l-2 border-transparent   hover:bg-default-200 cursor-pointer flex ",
        {
          "lg:border-primary/70 lg:bg-default-200 ": id === selectedChatId,
        }
      )}
      onClick={() => openChat(contact)}
    >
      <div className="flex-1 flex  gap-3 ">
        <div className="relative inline-block ">
          <Avatar>
            <AvatarImage
              src={contact?.receiver?.businessProfile?.profileThumb}
            />
            <AvatarFallback className="uppercase">
              {contact?.receiver?.businessProfile?.businessName.slice(0, 2) ||
                fullName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Badge
            className=" h-2 w-2  p-0 ring-1 ring-border ring-offset-[1px]   items-center justify-center absolute
             left-[calc(100%-8px)] top-[calc(100%-10px)]"
            color={status === "online" ? "success" : "secondary"}
          ></Badge>
        </div>
        <div className="block  ">
          <div className="truncate max-w-[120px]">
            <span className=" text-gray-900 font-xs flex justify-start tracking-tighter">
              {contact?.receiver?.businessProfile?.businessName || fullName}
            </span>
          </div>
          <div className="truncate  max-w-[120px]">
            <span className=" text-xs flex justify-start  text-default-600 ">
              {contact?.messages[0]?.content}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-none  flex-col items-end  gap-2  lg:flex">
        <span className="text-xs text-default-600 text-end lowercase">
          {contact?.messages[0]?.createdAt
            ? moment(contact.messages[0].createdAt).fromNow()
            : "No date available"}
        </span>
        <span
          className={cn(
            "h-[14px] w-[14px] flex items-center justify-center bg-default-400 rounded-full text-primary-foreground text-[10px] font-medium",
            {
              "bg-primary/70": unreadmessage > 0,
            }
          )}
        >
          {unreadmessage === 0 ? (
            <Icon icon="uil:check" className="text-sm" />
          ) : (
            unreadmessage
          )}
        </span>
      </div>
    </button>
  );
};

export default ContactList;
