"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Search } from "lucide-react";

const MyProfileHeader = ( ) => {
const {currentUser} =useAuth()
 

  return (
    <>
      <div className="flex mx-0 justify-between   pb-2 mb-2 ">
        <div className="flex   gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.profile?.profileThumb} alt="" />
            <AvatarFallback>
              {currentUser?.profile?.businessName?.slice(0, 2) ||
                currentUser?.profile?.fullName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="block">
            <div className="text-sm font-medium text-default-900 ">
              <span className="relative before:h-1.5 before:w-1.5 before:rounded-full before:bg-success before:absolute before:top-1.5 before:-right-3">
                {currentUser?.profile?.businessName ||
                 currentUser?.profile?.fullName}
              </span>
            </div>
            {/* <span className="text-xs text-default-600">{currentUser?.bio}</span> */}
          </div>
        </div>
        {/* <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                color="secondary"
                size="icon"
                className="rounded-full bg-slate-300 hover:bg-primary_color"
              >
                <MdOutlineMoreHoriz size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[196px]"
              align="end"
              avoidCollisions
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary">
                Team
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary">
                Subscription
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
      {/* search */}
      <div className="hidden lg:flex border border-default-200  mb-2 lg:items-center px-2 focus-within:border-blue-500 focus-within:text-primary_color">
        <Search size={16} className="text-slate-400  " />
        <Input
          type="text"
          placeholder="Search by name"
          className="border-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      {/* actions */}
      {/* <div className="hidden lg:flex flex-wrap justify-between py-4 border-b border-default-200">
        <Button className="flex flex-col items-center px-0 bg-transparent hover:bg-transparent text-slate-400 hover:text-primary_color shadow-none">
          <span className="text-xl mb-1">
            <Icon icon="gala:chat" className="" />
          </span>
          <span className="text-xs text-slate-600">Chats</span>
        </Button>
        <Button className="flex flex-col items-center px-0 bg-transparent hover:bg-transparent text-slate-400 hover:text-primary_color shadow-none">
          <span className="text-xl mb-1">
            <Icon icon="material-symbols:group" />
          </span>
          <span className="text-xs text-slate-600">Groups</span>
        </Button>
        <Button className="flex flex-col items-center px-0 bg-transparent hover:bg-transparent text-slate-400 hover:text-primary_color shadow-none">
          <span className="text-xl mb-1">
            <Icon icon="ci:bell-ring" />
          </span>
          <span className="text-xs text-slate-600">Notification</span>
        </Button>
      </div> */}
    </>
  );
};

export default MyProfileHeader;
