import notificationIcon from "@/asserts/jsonfile/notificationnew.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import Link from "next/link";
import { notifications } from "./data";
 

const NotificationMessage = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-[#1e56ad]   rounded-sm cursor-pointer w-12 p-1">
          <Lottie
            animationData={notificationIcon}
            autoPlay={false} // Do not autoplay, control via ref
            // Control loop based on prop
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" z-[999] mx-4 lg:w-[412px] p-0"
      >
        <DropdownMenuLabel
          // style={{ backgroundImage: `url(${shortImage.src})` }}
          className="w-full h-full bg-primary_color bg-cover bg-no-repeat p-4 flex items-center"
        >
          <span className="text-base font-semibold text-white flex-1">
            Notification
          </span>
          <span className="text-xs font-medium text-white flex-0 cursor-pointer hover:underline hover:decoration-default-100 dark:decoration-default-900">
            Mark all as read{" "}
          </span>
        </DropdownMenuLabel>
        <div className="h-[300px] xl:h-[350px]">
          <ScrollArea className="h-full">
            {notifications.map((item, index) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                className="flex gap-9 py-2 px-4 cursor-pointer dark:hover:bg-background"
              >
                <div className="flex-1 flex items-center gap-2">
                  <Avatar className="h-10 w-10 rounded">
                    <AvatarImage src={item.avatar.src} />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-default-900 mb-[2px] whitespace-nowrap">
                      {item.fullName}
                    </div>
                    <div className="text-xs text-default-900 truncate max-w-[100px] lg:max-w-[185px]">
                      {" "}
                      {item.message}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "text-xs font-medium text-default-900 whitespace-nowrap",
                    {
                      "text-default-600": !item.unreadmessage,
                    }
                  )}
                >
                  {item.date}
                </div>
                <div
                  className={cn("w-2 h-2 rounded-full mr-2", {
                    "bg-primary": !item.unreadmessage,
                  })}
                ></div>
              </DropdownMenuItem>
            ))}
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
  );
};

export default NotificationMessage;
