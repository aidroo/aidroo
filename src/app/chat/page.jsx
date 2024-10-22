import UserChats from "./_components/Chatbody";
import LeftSidebar from "./_components/LeftSidebar";
import LeftSidebarMenu from "./_components/LeftSidebarMenu";
import "./_components/tailwind.css";
export default function page() {
  return (
  
      <div className="flex max-w-7xl mx-auto">
        <LeftSidebarMenu />
        {/* <Switicher /> */}
        <LeftSidebar />
        <UserChats />
      </div>
     
  );
}
