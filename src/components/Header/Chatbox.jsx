"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronDown, EllipsisVertical, Image, Minus, SendHorizontal, X } from "lucide-react";

 
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMessages } from "../chat/chat-config";
import Loading from "../Loading";

const ChatBox = ({conversation ,onClose }) => {
const {currentUser}=useAuth()
const scrollRef = useRef();
  const [minimize, setMinimize] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };
 
  // fetch the messagea

  const getMessagesCallback = useCallback((chatId) => getMessages(chatId), []);
   const {
     isLoading: messageLoading,
     isError: messageIsError,
     data: chats,
     error: messageError,
     refetch: refetchMessage,
   } = useQuery({
     queryKey: ["message", conversation?.id],
     queryFn: () => getMessagesCallback(conversation?.id),
     keepPreviousData: true,
   });
    useEffect(() => {
      // Scroll to the bottom whenever chats are updated
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [chats]);
 const fullName = `${conversation?.receiver?.personalProfile?.firstName} ${conversation?.receiver?.personalProfile?.lastName}`;
  return (
    <Card className="     w-[200px] md:[250px] lg:w-[360px]  rounded-t-md rounded-b-none dark:border dark:border-default-200 dark:border-t-0">
      <CardHeader
        className={cn(
          "bg-primary_color  rounded-t-md flex-row items-center py-2",
          {
            "mb-0": minimize,
          }
        )}
      >
        <div className="flex-1 flex  items-center gap-3">
          <div className="relative inline-block">
            <Avatar className="h-9 w-9 ring-1 ring-secondary">
              <AvatarImage
                src={
                  conversation?.receiver?.businessProfile?.profileThumb ||
                  conversation?.receiver?.personalProfile?.profileThumb
                }
              />
              <AvatarFallback>
                {conversation.receiver?.businessProfile?.businessName.slice(
                  0,
                  2
                )||fullName.slice(0,2)}
              </AvatarFallback>
            </Avatar>
            <Badge
              color="success"
              className=" h-2 w-2  p-0  items-center justify-center absolute ltr:left-[calc(100%-8px)] rtl:right-[calc(100%-8px)] top-[calc(100%-8px)]"
            ></Badge>
          </div>
          <div className="text-base font-medium text-primary-foreground relative truncate w-[50px] md:w-fit">
            {conversation.receiver?.businessProfile?.businessName || fullName}
            <ChevronDown className="h-3.5 w-3.5 text-primary-foreground absolute rtl:-left-4 ltr:-right-4 top-1" />
          </div>
        </div>

        {/* <Phone icon="heroicons:phone" className="w-5 h-5" /> */}

        {/* <VideoIcon icon="heroicons:video-camera" className="w-5 h-5" /> */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            size="icon"
            onClick={() => setMinimize(!minimize)}
          >
            <Minus icon="heroicons:minus" className="w-5 h-5 text-white" />
          </button>
          <button type="button" size="icon" onClick={onClose}>
            <X icon="heroicons:x-mark" className="w-5 h-5 text-white" />
          </button>
        </div>
      </CardHeader>
      <CardContent
        className={cn("px-0", {
          hidden: minimize,
        })}
      >
        {/* chat list */}
        <div className="h-[300px] ">
          <ScrollArea ref={scrollRef} className="h-full overflow-y-auto">
            {messageLoading && <Loading />}
            {/* left */}
            {chats?.length > 0 &&
              chats.map((chat) =>
                chat?.receiverUser !== currentUser?.username ? (
                  <div key={chat.id} className="block md:px-6 px-4">
                    <div className="flex gap-x-2 items-start group mb-4">
                      <div className="flex-none self-end -translate-y-5">
                        <div className="h-8 w-8 rounded-full">
                          <Image
                            src={
                              conversation?.receiver?.businessProfile
                                ?.profileThumb
                            }
                            alt="/images/avatar/avatar-1.jpg"
                            className="block w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <div className="whitespace-pre-wrap break-all relative z-[1]">
                              <div className="bg-default-200 text-sm py-2 px-3 rounded-2xl flex-1">
                                {chat.content}
                              </div>
                            </div>
                            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                              <span
                                className="w-7 h-7 rounded-full bg-default-100 flex items-center justify-center"
                                type="button"
                                id="radix-:r1a:"
                                aria-haspopup="menu"
                                aria-expanded="false"
                                data-state="closed"
                              >
                                <EllipsisVertical className="w-4 h-4 text-default-900" />
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-default-500">
                            {moment(chat?.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={chat.id} className="block md:px-6 px-4">
                    <div className="flex gap-x-2 items-start justify-end group w-full mb-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                            <span
                              className="w-7 h-7 rounded-full bg-default-100 flex items-center justify-center"
                              type="button"
                              id="radix-:r1a:"
                              aria-haspopup="menu"
                              aria-expanded="false"
                              data-state="closed"
                            >
                              <EllipsisVertical className="w-4 h-4 text-default-900" />
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap break-all">
                            <div className="bg-primary/70 text-primary-foreground text-sm py-2 px-3 rounded-2xl flex-1">
                              {chat.content}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-end text-default-500">
                          {moment(chat?.createdAt).fromNow()}
                        </span>
                      </div>
                      <div className="flex-none self-end -translate-y-5">
                        <div className="h-8 w-8 rounded-full">
                          <Image
                            src={
                              conversation?.receiver?.businessProfile
                                ?.profileThumb
                            }
                            alt="/images/avatar/avatar-2.jpg"
                            className="block w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            {/* right */}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter
        className={cn("px-0", {
          hidden: minimize,
        })}
      >
        <div
          className="w-full flex items-end gap-4 lg:px-4"
          style={{
            boxSizing: "border-box",
          }}
        >
          <div className="flex-1">
            <form>
              <div className="flex  gap-1 relative">
                <textarea
                  value={message}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  className="bg-default-200 outline-none border hover:border-primary rounded-xl break-words px-3 flex-1 h-10 pt-2 p-1 "
                  style={{
                    minHeight: "40px",
                    maxHeight: "70px",
                    overflowY: "auto",
                    resize: "none",
                  }}
                />

                <Button
                  type="button"
                  className="rounded-full bg-default-100 hover:bg-default-100 h-[42px] w-[42px] p-0 self-end"
                >
                  <SendHorizontal className="w-5 h-8 text-primary rtl:rotate-180" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
