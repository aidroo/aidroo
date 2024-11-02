/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCallback, useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import Blank from "./blank";
import ContactList from "./contact-list";
import MessageFooter from "./message-footer";
import MessageHeader from "./message-header";

import {
  deleteMessage,
  getContacts,
  getMessages,
  getProfile,
  sendMessage,
} from "./chat-config";
import Messages from "./messages";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, isObjectNotEmpty } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ContactInfo from "./contact-info";
import SearchMessages from "./contact-info/search-messages";
import EmptyMessage from "./empty-message";
import ForwardMessage from "./forward-message";



import { useAuth } from "@/hooks/useAuth";
import Pusher from "pusher-js";
import Loader from "./loader";
import MyProfileHeader from "./my-profile-header";
import PinnedMessages from "./pin-messages";
const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
const [messages, setMessages] = useState([]);
  const [showContactSidebar, setShowContactSidebar] = useState(false);

  const [showInfo, setShowInfo] = useState(false);
  const queryClient = useQueryClient();
  // Memoize getMessages using useCallback
  const getMessagesCallback = useCallback(
    (senderUser, receiverUser) => getMessages(senderUser, receiverUser),
    []
  );
  // reply state
  const [replay, setReply] = useState(false);
  const [replayData, setReplyData] = useState({});

  // search state
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const [pinnedMessages, setPinnedMessages] = useState([]);
  // Forward State
  const [isForward, setIsForward] = useState(false);
  const { currentUser } = useAuth();
  const fullName2 =
    selectedChat?.receiver?.personalProfile?.firstName +
    " " +
    selectedChat?.receiver?.personalProfile?.lastName;

  const messageHeaderProfileData = {
    name:
      selectedChat?.bussinessName ||
      selectedChat?.firstName + selectedChat?.lastName ||
      selectedChat?.receiver?.businessProfile?.businessName ||
      fullName2,

    profileThumb:
      selectedChat?.profileThumb ||
      selectedChat?.receiver?.businessProfile?.profileThumb ||
      selectedChat?.receiver?.personalProfile?.profileThumb,
    reciverUsername: selectedChat?.username || selectedChat?.receiverUser,
  };

  const {
    isLoading,
    // isError,
    data: contacts,
    // error,
    // refetch: refetchContact,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: () =>
      getContacts({
        senderUser: currentUser?.username,
        receiverUser: selectedChat?.username || selectedChat?.receiverUser,
      }),
    keepPreviousData: true,
  });

  const {
    isLoading: messageLoading,
    isError: messageIsError,
    data: chats,
    // error: messageError,
    // refetch: refetchMessage,
  } = useQuery({
    queryKey: ["message", selectedChat?.id],
    queryFn: () =>
      getMessagesCallback(
        currentUser?.username,
        messageHeaderProfileData?.reciverUsername
      ),
    keepPreviousData: true,
  });

  const {
    // isLoading: profileLoading,
    // isError: profileIsError,
    data: profileData,
    // error: profileError,
    // refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    keepPreviousData: true,
  });
  const messageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });

  const onDelete = (selectedChat, index) => {
    console.log("selectedId",selectedChat)
    const obj = { selectedChat, index };
    deleteMutation.mutate(obj);

    // Remove the deleted message from pinnedMessages if it exists
    const updatedPinnedMessages = pinnedMessages.filter(
      (msg) => msg.selectedChat !== selectedChat && msg.index !== index
    );

    setPinnedMessages(updatedPinnedMessages);
  };

  const openChat = (chatId) => {
    setSelectedChat(chatId);
    setReply(false);
    if (showContactSidebar) {
      setShowContactSidebar(false);
    }
  };
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleSendMessage = (message) => {
    if (!selectedChat || !message) return;

    const newMessage = {
      senderUser: currentUser?.username,
      receiverUser: messageHeaderProfileData?.reciverUsername,
      conversationId: selectedChat.id,
      content: message,

      replayTo: isObjectNotEmpty(replayData),
    };

    messageMutation.mutate(newMessage);
    console.log(message, "ami msg");
  };
  const chatHeightRef = useRef(null);

  // replay message
  const handleReply = (data, contact) => {
    const newObj = {
      message: data,
      contact,
    };
    setReply(true);
    setReplyData(newObj);
  };

  // Initialize Pusher
  useEffect(() => {
    // if (!currentUser?.username || !selectedChat?.username) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
    });

    const channel = pusher.subscribe(`chat`);
    const messageHandler = (data) => {
 
     
      if (data.senderUser === currentUser.username) return; // Ignore own messages
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    channel.bind("message-received", messageHandler);

    return () => {
      channel.unbind("message-received", messageHandler);
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [selectedChat, currentUser]);
 
  // Update local messages state when chats data is fetched
  useEffect(() => {
    if (chats) {
      setMessages(chats);
    }
  }, [chats]);

  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [handleSendMessage, contacts]);
  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [pinnedMessages]);

  // handle search bar
 
  const handleSetIsOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };
  // handle pin note

  const handlePinMessage = (note) => {
    const updatedPinnedMessages = [...pinnedMessages];

    const existingIndex = updatedPinnedMessages.findIndex(
      (msg) => msg.note === note.note
    );

    if (existingIndex !== -1) {
      updatedPinnedMessages.splice(existingIndex, 1); // Remove the message
      //setIsPinned(false);
    } else {
      updatedPinnedMessages.push(note); // Add the message
      // setIsPinned(true);
    }

    setPinnedMessages(updatedPinnedMessages);
  };

  const handleUnpinMessage = (pinnedMessage) => {
    // Create a copy of the current pinned messages array
    const updatedPinnedMessages = [...pinnedMessages];

    // Find the index of the message to unpin in the updatedPinnedMessages array
    const index = updatedPinnedMessages.findIndex(
      (msg) =>
        msg.note === pinnedMessage.note && msg.avatar === pinnedMessage.avatar
    );

    if (index !== -1) {
      // If the message is found in the array, remove it (unpin)
      updatedPinnedMessages.splice(index, 1);
      // Update the state with the updated pinned messages array
      setPinnedMessages(updatedPinnedMessages);
    }
  };

  // Forward handle
  const handleForward = () => {
    setIsForward(!isForward);
  };

  // console.log(
  //   "selectedChat",
  //   selectedChat
  // );

  const isLg = useMediaQuery("(max-width: 1024px)");
  return (
    <div className="flex gap-5 lg:-mt-2  h-[70vh]  mt-10  relative rtl:space-x-reverse mx-2 ">
      {isLg && showContactSidebar && (
        <div
          className=" bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
          onClick={() => setShowContactSidebar(false)}
        ></div>
      )}
      {isLg && showInfo && (
        <div
          className=" bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0  rounded-md"
          onClick={() => setShowInfo(false)}
        ></div>
      )}
      <div
        className={cn("transition-all duration-150 flex-none  ", {
          "absolute h-full top-0 md:w-[260px] w-[330px] z-[999]": isLg,
          "flex-none min-w-[260px]": !isLg,
          "left-0": isLg && showContactSidebar,
          "-left-full": isLg && !showContactSidebar,
        })}
      >
        <Card className="h-full pb-0 px-2">
          <CardHeader className="pb-2    border-b mb-4  ">
            <MyProfileHeader
              profile={profileData}
              setSelectedChat={setSelectedChat}
              setShowContactSidebar={setShowContactSidebar}
            />
          </CardHeader>
          <CardContent className="pt-0 px-0   lg:h-[calc(100%-180px)] h-[calc(100%-70px)]   ">
            <ScrollArea className="h-full">
              {isLoading ? (
                <Loader />
              ) : (
                contacts?.data?.map((contact) => (
                  <ContactList
                    key={contact.id}
                    contact={contact}
                    selectedChat={selectedChat}
                    openChat={openChat}
                  />
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {/* chat sidebar  end*/}
      {/* chat messages start */}
      {selectedChat ? (
        <div className="flex-1 ">
          <div className=" flex space-x-5 h-full rtl:space-x-reverse">
            <div className="flex-1">
              <Card className="h-full flex flex-col ">
                <CardHeader className="flex-none mb-0 border-b bg-slate-100">
                  <MessageHeader
                    showInfo={showInfo}
                    handleShowInfo={handleShowInfo}
                    profile={messageHeaderProfileData}
                    mblChatHandler={() =>
                      setShowContactSidebar(!showContactSidebar)
                    }
                  />
                </CardHeader>
                {isOpenSearch && (
                  <SearchMessages
                    handleSetIsOpenSearch={handleSetIsOpenSearch}
                  />
                )}

                <CardContent className=" !p-0 relative flex-1 overflow-y-auto">
                  <div
                    className="h-full py-4 p-6 overflow-y-auto no-scrollbar"
                    ref={chatHeightRef}
                  >
                    {messageLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {messageIsError ? (
                          <EmptyMessage />
                        ) : (
                          messages?.map((message, i) => (
                            <Messages
                              key={`message-list-${i}`}
                              message={message}
                              contact={chats?.contact}
                              profile={profileData}
                              onDelete={onDelete}
                              index={i}
                              selectedChat={selectedChat}
                              handleReply={handleReply}
                              replayData={replayData}
                              handleForward={handleForward}
                              handlePinMessage={handlePinMessage}
                              pinnedMessages={pinnedMessages}
                            />
                          ))
                        )}
                      </>
                    )}
                    <PinnedMessages
                      pinnedMessages={pinnedMessages}
                      handleUnpinMessage={handleUnpinMessage}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-none flex-col px-0 py-4 border-t border-border">
                  <MessageFooter
                    handleSendMessage={handleSendMessage}
                    replay={replay}
                    setReply={setReply}
                    replayData={replayData}
                  />
                </CardFooter>
              </Card>
            </div>

            {showInfo && (
              <ContactInfo
                handleSetIsOpenSearch={handleSetIsOpenSearch}
                handleShowInfo={handleShowInfo}
                contact={selectedChat}
              />
            )}
          </div>
        </div>
      ) : (
        <Blank mblChatHandler={() => setShowContactSidebar(true)} />
      )}
      <ForwardMessage
        open={isForward}
        contact={"s"}
        setIsOpen={setIsForward}
        contacts={contacts}
      />
    </div>
  );
};

export default ChatPage;
