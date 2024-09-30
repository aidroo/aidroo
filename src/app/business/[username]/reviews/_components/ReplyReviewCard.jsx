import IconImage from "@/components/IconImage/IconImage";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import { font14 } from "@/constant";
import { profileImage } from "@/exportImage";
import replayIcon from "@/public/icons/replyreview.svg";

export default function ReplyReviewCard({ reply }) {
  const fulName =
    reply?.user?.personalProfile?.firstName +
    " " +
    reply?.user?.personalProfile?.lastName;
  return (
    <div className="flex items-center my-2 pr-1">
      <IconImage src={replayIcon} size={32} className="-ml-11 " />
      <div className="p-2 w-full border rounded-sm">
        <div className="  flex flex-col        rounded-md ">
          <div className="flex gap-4 items-start   py-2 px-2 ">
            <div>
              <IconImage
                src={
                  reply?.user?.personalProfile?.profileThumb ||
                  reply?.user?.businessProfile?.profileThumb ||
                  profileImage
                }
                size={60}
                className="rounded-full ring-1  "
                alt="profile pic"
              />
            </div>
            <div className=" w-full -mt-1">
              <div className=" flex     items-start ">
                <TitleNameAndVerified
                  title={reply?.user?.businessProfile?.businessName || fulName}
                  verified={reply?.user?.businessProfile?.verified}
                  personalVerified={reply?.user?.personalProfile?.verified}
                />
                {/* <p className="w-full text-gray-500 text-sm">
                  {moment(new Date(reply.createdAt)).fromNow()}
                </p> */}
              </div>

              <p className={`${font14} text-gray-500`}>
                {reply?.user?.addresses?.city} {reply?.user?.addresses?.country}{" "}
              </p>
            </div>
          </div>

          <p className="ml-[84px] text-gray-500 -mt-8">{reply?.content}</p>
        </div>
      </div>
    </div>
  );
}
