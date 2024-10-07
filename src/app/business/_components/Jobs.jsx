import IconImage from "@/components/IconImage/IconImage";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { font14, font16 } from "@/constant";
import {
  brifcaseIcon,
  categories,
  locationIcon,
  moneyBag,
  schedule,
} from "@/exportImage";
import { shortenString } from "@/lib/utils";
import Image from "next/image";
export default function Jobs() {
  let str = ` I had a seamless experience with Panacea.professionals do not understand our process.  Lorem ipsum dolor sit amet consecteturadipisicing elit. Amet, explicabo! Lorem ipsum dolor, sit amet consectetur `;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 items-center cursor-pointer text-primary_color ">
          <Image
            src={brifcaseIcon}
            className="w-6"
            alt="bordercategoriesIcon"
            
          />
          <h1 className="text-sm">Job feed</h1>
        </div>
      </DialogTrigger>

      <DialogContent className=" w-fit   overflow-hidden overflow-y-auto ">
        <ScrollArea className="w-full whitespace-nowrap rounded-md ">
          <div className="flex w-max space-x-4 p-4">
            {[1, 2, 3, 4, 5, 6].map((artwork) => (
              <div
                className="w-[330px]  overflow-hidden  p-3 border rounded-md "
                key={artwork}
              >
                <div>
                  <h1 className={`${font16}text-primary_color text-wrap`}>
                    Looking for Sales Manager
                  </h1>

                  <p className="text-xs text-wrap">{shortenString(str, 250)}</p>
                  <div className=" mt-2">
                    <div>
                      <div className="flex items-center text-sm gap-4">
                        <IconImage src={moneyBag} size={32} />
                        <div>
                          <h1 className="text-sm">1624 $</h1>
                          <p className={`text-gray-600  ${font14} `}>
                            Price is{" "}
                            <span className="text-primary_color">
                              Negotiable
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm gap-4">
                        <IconImage src={categories} size={32} />
                        <h1 className="text-sm">Appliance Service</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm gap-4">
                        <IconImage src={schedule} size={32} />
                        <h1 className="text-sm">10--09-2024</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm gap-4">
                        <IconImage src={locationIcon} size={32} />
                        <h1 className="text-sm">Az 2031 ,Ariziba ,Usa</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <PaginationComponent className=" text-sm" />
      </DialogContent>
    </Dialog>
  );
}
